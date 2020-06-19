<template>
  <div class="tags-nav">
    <div class="close-con">
      <el-dropdown @command="handleTagsOption">
        <span class="el-dropdown-link">
          <i class="el-icon-circle-close" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="close-all">关闭所有</el-dropdown-item>
          <el-dropdown-item command="close-others">关闭其他</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div class="btn-con left-btn" @click="handleScroll(240)">
      <el-button type size="small" icon="el-icon-arrow-left" />
    </div>
    <div class="btn-con right-btn" @click="handleScroll(-240)">
      <el-button type size="small" icon="el-icon-arrow-right" />
    </div>
    <div
      ref="scrollOuter"
      class="scroll-outer"
      @DOMMouseScroll="handlescroll"
      @mousewheel="handlescroll"
    >
      <div ref="scrollBody" class="scroll-body" :style="{left: tagBodyLeft + 'px'}">
        <transition-group name="taglist-moving-animation">
          <router-link
            v-for="tag in visitedViews"
            ref="tagsPageOpened"
            :key="tag.path"
            :class="isActive(tag)?'active':''"
            :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
            tag="span"
            class="tags-view-item"
            @click.middle.native="closeSelectedTag(tag)"
            @contextmenu.prevent.native="openMenu(tag,$event)"
          >
            {{ tag.title }}
            <span class="el-icon-close" @click.prevent.stop="closeSelectedTag(tag)" />
          </router-link>
        </transition-group>
      </div>
    </div>
  </div>
</template>

<script>
import path from 'path'
export default {
  data() {
    return {
      visible: false,
      top: 0,
      left: 0,
      selectedTag: {},
      affixTags: [],
      tagBodyLeft: 0,
      outerPadding: 4,
      contextMenuLeft: 0,
      contextMenuTop: 0,
      promotionType: [
        { id: '11', label: '限时特惠' },
        { id: '12', label: '限时秒杀' },
        { id: '13', label: '拼团' },
        { id: '14', label: '满减满赠' },
        { id: '15', label: '加价购' }
      ]
    }
  },
  computed: {
    visitedViews() {
      const data = this.$store.state.tagsView.visitedViews
      const newData = []
      data.forEach((val, index, ary) => {
        newData.push(val)
      })
      return newData
    },
    routes() {
      return this.$store.state.permission.routes
    }
  },
  watch: {
    $route(newRouter, oldRouter) {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = (this.affixTags = this.filterAffixTags(this.routes))
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    handlescroll(e) {
      var type = e.type
      let delta = 0
      if (type === 'DOMMouseScroll' || type === 'mousewheel') {
        delta = e.wheelDelta ? e.wheelDelta : -(e.detail || 0) * 40
      }
      this.handleScroll(delta)
    },
    handleScroll(offset) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (offset > 0) {
        this.tagBodyLeft = Math.min(0, this.tagBodyLeft + offset)
      } else {
        if (outerWidth < bodyWidth) {
          if (this.tagBodyLeft < -(bodyWidth - outerWidth)) {
            this.tagBodyLeft = this.tagBodyLeft
          } else {
            this.tagBodyLeft = Math.max(
              this.tagBodyLeft + offset,
              outerWidth - bodyWidth
            )
          }
        } else {
          this.tagBodyLeft = 0
        }
      }
    },
    isActive(route) {
      return route.path === this.$route.path
    },
    addTags() {
      const { name, params, meta } = this.$route
      if (name) {
        // 兼容处理活动公用一个list更改tagView的问题
        let route = this.$route
        if (name === 'activityList') {
          const data = this.promotionType.filter(
            item => item.id === params.type
          )
          if (params.type) {
            route = {
              ...route,
              meta: {
                ...meta,
                title:
                  Array.isArray(data) && data.length
                    ? `${data[0].label}列表`
                    : '活动列表'
              }
            }
          }
        }
        this.$store.dispatch('tagsView/addView', route)
      }
      return false
    },
    moveToView(tag) {
      const outerWidth = this.$refs.scrollOuter.offsetWidth
      const bodyWidth = this.$refs.scrollBody.offsetWidth
      if (bodyWidth < outerWidth) {
        this.tagBodyLeft = 0
      } else if (tag.offsetLeft < -this.tagBodyLeft) {
        // 标签在可视区域左侧
        this.tagBodyLeft = -tag.offsetLeft + this.outerPadding
      } else if (
        tag.offsetLeft > -this.tagBodyLeft &&
        tag.offsetLeft + tag.offsetWidth < -this.tagBodyLeft + outerWidth
      ) {
        // 标签在可视区域
        this.tagBodyLeft = Math.min(
          0,
          outerWidth - tag.offsetWidth - tag.offsetLeft - this.outerPadding
        )
      } else {
        // 标签在可视区域右侧
        this.tagBodyLeft = -(
          tag.offsetLeft -
          (outerWidth - this.outerPadding - tag.offsetWidth)
        )
      }
    },
    moveToCurrentTag() {
      this.refsTag = this.$refs.tagsPageOpened
      this.$nextTick(() => {
        this.refsTag.forEach((item, index) => {
          if (item.to.path === this.$route.path) {
            const tag = this.refsTag[index].$el
            this.moveToView(tag)
            // when query is different then update
            if (item.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            return false
          }
        })
      })
    },
    handleTagsOption(type) {
      // 关闭操作
      if (type.includes('all')) {
        // 关闭所有，除了home
        this.closeAllTags(this.$route)
      } else if (type.includes('others')) {
        // 关闭除当前页和home页的其他页
        this.closeOthersTags()
      }
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      if (this.visitedViews.length === 1 && view.name === 'home') {
        return
      }
      if (view.name === 'GoodsEdit' && !sessionStorage.getItem('editIsQuery')) {
        const answer = window.confirm('你还有数据没有保存，是否确认退出')
        if (!answer) {
          return
        }
      }
      if (view.name === 'depotEdit' || view.name === 'applyRecordEdit' || view.name === 'editApply') {
        const answer = window.confirm('你还有数据没有保存，是否确认退出')
        if (!answer) {
          return
        }
      }
      this.$store
        .dispatch('tagsView/delView', view)
        .then(({ visitedViews }) => {
          if (this.isActive(view)) {
            this.toLastView(visitedViews, view)
          }
        })
    },
    closeOthersTags() {
      if (this.selectedTag.path) {
        this.$router.push(this.$route.path)
      }
      this.selectedTag = this.$route
      this.$store
        .dispatch('tagsView/delOthersViews', this.selectedTag)
        .then(() => {
          this.moveToCurrentTag()
        })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      console.log(visitedViews, view)
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView)
      } else {
        // now the default is to redirect to the home page if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'home') {
          // to reload home page
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      console.log(tag)
      const menuMinWidth = 105
      const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth - menuMinWidth // left boundary
      const left = e.clientX - offsetLeft + 15 // 15: margin right

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.top = e.clientY
      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.tags-nav {
  position: relative;
  height: 40px;
  width: 100%;
  overflow: hidden;
  background: #f0f0f0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  .close-con {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 32px;
    background: #fff;
    text-align: center;
    z-index: 10;
    span {
      height: 40px;
      line-height: 40px;
      font-size: 16px;
      display: inline-block;
    }
  }
  button {
    padding-left: 6px;
    padding-right: 6px;
    line-height: 14px;
    text-align: center;
    color: #515a6e;
    background-color: transparent;
    border-color: transparent;
  }
  .btn-con {
    position: absolute;
    top: 0px;
    height: 100%;
    background: #fff;
    padding-top: 3px;
    z-index: 10;
    &.left-btn {
      left: 0;
    }
    &.right-btn {
      right: 32px;
      border-right: 1px solid #f0f0f0;
    }
  }
  .scroll-outer {
    position: absolute;
    left: 28px;
    right: 61px;
    top: 0;
    bottom: 0;
    background: #fff;
    .scroll-body {
      height: calc(100% - 1px);
      display: inline-block;
      padding: 1px 4px 0;
      position: absolute;
      overflow: visible;
      white-space: nowrap;
      transition: left 0.3s ease;
      .ivu-tag-dot-inner {
        transition: background 0.2s ease;
      }
    }
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 32px;
      line-height: 32px;
      border: 1px solid #e8eaec;
      color: #515a6e;
      background: #fff;
      padding: 0 12px;
      font-size: 12px;
      margin: 2px 4px 2px 0;
      &::before {
        content: '';
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 8px;
        border-radius: 50%;
        background: #e8eaec;
        position: relative;
        top: 1px;
      }
      &.active {
        color: #2d8cf0;
        &::before {
          content: '';
          background: #2d8cf0;
        }
      }
    }
  }
  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;
      &:hover {
        background: #eee;
      }
    }
  }
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .scroll-body {
    height: calc(100% - 1px);
    display: inline-block;
    padding: 1px 4px 0;
    position: absolute;
    overflow: visible;
    white-space: nowrap;
    -webkit-transition: left 0.3s ease;
    transition: left 0.3s ease;
  }
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;
      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }
      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
