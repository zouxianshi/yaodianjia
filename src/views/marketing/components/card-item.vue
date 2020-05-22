<template>
  <el-card class="activity-card" shadow="hover">
    <el-image class="image" fit="fill" :src="item.img" @click="handleJump(item, 'list')" />
    <div class="activity-bottom">
      <div class="activity-header">
        <div class="title">{{ item.lable }}</div>
        <div v-if="item.desc===''" style="height:25px">{{ item.desc || '' }}</div>
        <el-tooltip v-if="item.desc!==''" class="item" effect="dark" :content="item.desc" placement="top-start">
          <div class="sub-title">{{ item.desc || '' }}</div>
        </el-tooltip>
      </div>
      <div class="action">
        <el-button
          type="text"
          icon="el-icon-takeaway-box"
          class="button"
          @click="handleJump(item, 'list')"
        >{{ item.lable }}列表</el-button>
        <el-divider direction="vertical" />
        <el-button
          type="text"
          icon="el-icon-document-add"
          class="button"
          @click="handleJump(item)"
        >{{ item.createText || '新建活动' }}</el-button>
      </div>
    </div>
    <!-- 右上角的事件 -->
    <el-image v-if="item.extra" class="share" :src="item.extra" alt @click="onShare(item.value)" />
    <preview-dialog ref="previewDialog" />
  </el-card>
</template>

<script>
import previewDialog from '../activity/reduce-gift/_source/preview-dialog'
export default {
  components: {
    previewDialog
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleJump(itemUrl, jumpType) {
      console.log('1111111---handleJump', itemUrl)
      // 跳转列表
      if (jumpType === 'list') {
        this.$router.push(itemUrl.listUrl)
      } else {
        // 跳转新增页面，并清除之前得缓存数据；
        this.$store.dispatch('tagsView/delCachedView', {
          name: itemUrl.name
        })
        setTimeout(() => {
          this.$router.push(itemUrl.linkUrl)
        }, 0)
      }
    },
    onShare(type) {
      console.log('我是分享页面---------')
      this.$refs.previewDialog.open(type)
    }
  }
}
</script>

<style lang="scss">
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.activity-card {
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;
  .el-card__body {
    padding: 0;
  }
  .image {
    width: 100%;
    display: block;
    // height: 183px;
  }
  .activity-bottom {
    padding: 14px;
    padding-bottom: 6px;
    .activity-header {
      .title {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
      }
      .sub-title {
        color: rgba(0, 0, 0, 0.65);
        font-size: 10px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    .action {
      // @extend .text-overflow-1;
      white-space: nowrap;
    }
  }
  .share {
    position: absolute;
    padding: 5px;
    box-sizing: content-box;
    right: 0;
    top: 0;
    width: 35px;
    height: 35px;
  }
}
</style>
