<template>
  <el-card class="activity-card" shadow="hover">
    <el-image class="image" fit="fill" :src="item.img" />
    <div class="activity-bottom">
      <div class="activity-header">
        <div class="title">{{ item.lable }}</div>
        <div v-if="item.desc===''" style="height:25px">{{ item.desc || '' }}</div>
        <el-tooltip
          v-if="item.desc!==''"
          class="item"
          effect="dark"
          :content="item.desc"
          placement="top-start"
        >
          <div class="sub-title">{{ item.desc || '' }}</div>
        </el-tooltip>
      </div>
      <div class="action">
        <el-button
          type="text"
          icon="el-icon-setting"
          class="button"
          @click="handleJump(item)"
        >{{ item.createText }}</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
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
    }
  }
}
</script>

<style lang="scss" scoped>
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.activity-card {
  margin-bottom: 10px;
  position: relative;
  cursor: pointer;

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
        text-align: left;
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
      text-align: right;
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

<style lang="scss">
.activity-card {
  .el-card__body {
    padding: 0;
  }
}
</style>
