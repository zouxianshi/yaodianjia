<template>
  <el-card class="activity-card" shadow="hover">
    <el-image class="image" fit="fill" :src="item.img" @click="handleJump(item, 'list')" />
    <div class="activity-bottom">
      <div class="activity-header">
        <div class="title">
          {{ item.lable }}
          <el-switch v-model="isClose" style="float: right" @change="updataActive" />
        </div>
        <div v-if="item.desc===''" style="height:48px">{{ item.desc || '' }}</div>
        <el-tooltip v-if="item.desc!==''" class="item" effect="dark" :content="item.desc" placement="top-start">
          <div class="sub-title">{{ item.desc || '' }}</div>
        </el-tooltip>
      </div>
      <div class="action">
        <el-button size="mini" type="primary" @click="handleJump(item.linkUrl)">礼包设置</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { birthdayOperate, queryBirthday } from '@/api/birthday'
export default {
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      isClose: false
    }
  },
  created() {
    const params = {
      pageSize: 100,
      currentPage: 1
    }
    queryBirthday().then(res => {
      if (res.code === '10000' && !!res.data) {
        console.log(res.data.status)
        this.isClose = res.data.status ? true: false
      }
    })
  },
  methods: {
    handleJump(itemUrl) {
      this.$router.push(itemUrl)
    },
    updataActive(e) {
      const params = {
        status: e ? 1 : 0,
        merCode: this.$store.state.user.merCode
      }
      this.$confirm('改变生日礼包状态?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        birthdayOperate(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
          } else {
            this.$message({
              message: '操作失败！',
              type: 'error'
            })
            this.isClose = !e
          }
        }).catch(() => {
          this.isClose = !e
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作！'
        })
        this.isClose = !e        
      })
      
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
        height: 48px;
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
      height: 36px;
      line-height: 36px;
      .el-button{
        width: 100%;
      }
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
