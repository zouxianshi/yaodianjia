<template>
  <el-card class="activity-card" shadow="hover">
    <el-image class="image" fit="fill" :src="item.img" @click="handleJump(item, 'list')" />
    <div class="activity-bottom">
      <div class="activity-header">
        <div class="title">
          <span class="title-span">{{ item.titles }}</span>
          <el-switch
            v-model="closeOrOpen"
            style="vertical-algin: middle"
            active-color="#5677fc"
            inactive-color="#a7a5a6"
            @change="changeState"
          />
        </div>
        <div v-if="item.desc===''" style="height:48px">{{ item.desc || '' }}</div>
        <el-tooltip v-if="item.desc!==''" class="item" effect="dark" :content="item.desc" placement="top-start">
          <div class="sub-title">{{ item.desc || '' }}</div>
        </el-tooltip>
      </div>
      <div class="action">
        <el-button
          type="text"
          icon="el-icon-menu"
          class="button"
          @click="handleJump(item, 'list')"
        >{{ item.lable }}</el-button>
        <!--<el-divider direction="vertical" />-->

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
  data() {
    return {
      closeOrOpen: true
    }
  },
  watch: {
    item: {
      immediate: true,
      handler(v) {
        this.closeOrOpen = v.isclose
      },
      deep: true
    }
  },
  methods: {
    handleJump(itemUrl, jumpType) {
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
      this.$refs.previewDialog.open(type)
    },
    // 关闭、开启活动
    changeState() {
      let text = ''
      if (this.closeOrOpen) {
        text = '开启'
      } else {
        text = '关闭'
      }
      this.$confirm(`确定${text}签到奖励 ?`, '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$emit('changeStatus', this.closeOrOpen)
      }).catch(() => {
        this.closeOrOpen = !this.closeOrOpen
      })
    },
    // 开启活动失败时
    closeStatus(status) {
      this.closeOrOpen = !status
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
        font-size: 16px;text-align: center;line-height: 20px;margin: 10px 0;
        color: rgba(0, 0, 0, 0.85);
        .title-span{
          line-height: 20px;vertical-align: bottom;margin-right: 10px;height: 20px;
        }
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
    .action{
      display: flex;
      justify-content: space-between;
      align-items: center;
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
