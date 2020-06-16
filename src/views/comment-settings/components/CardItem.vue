<template>
  <el-card class="activity-card" shadow="hover">
    <el-image class="image" fit="cover" :src="img" />
    <div class="activity-bottom">
      <div class="activity-header">
        <div class="title">{{ lable }}</div>
        <div v-if="desc===''" style="height:25px">{{ desc || '' }}</div>
        <el-tooltip
          v-if="desc!==''"
          class="item"
          effect="dark"
          :content="desc"
          placement="top-start"
        >
          <div class="sub-title">{{ desc || '' }}</div>
        </el-tooltip>
      </div>
      <slot />
    </div>
  </el-card>
</template>

<script>
export default {
  components: {},
  props: {
    img: {
      type: String,
      default: ''
    },
    lable: {
      type: String,
      default: ''
    },
    desc: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isTurnOn: true
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

<style lang="scss">
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.activity-card {
  width: 250px;
  margin-bottom: 10px;
  position: relative;
  .el-card__body {
    padding: 0;
  }
  .image {
    width: 100%;
    display: block;
    height: 120px;
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
  }
}
</style>
