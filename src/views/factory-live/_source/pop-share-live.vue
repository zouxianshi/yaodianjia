<template>
  <el-dialog title="" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" :append-to-body="true">
    <div class="share-live-content">
      <div class="content-left">
        <div class="pm-qr-code" v-loading="empCodeLoading">
          <img  :src="imgCode" style="width:250px;height:250px" />
          <div style="margin-top:50px;font-weight:bold;text-align:center;font-size:16px">扫码观看直播</div>
        </div>
      </div>
      <div class="content-right scrollbar" v-loading="loading">
        <el-image style="height:200px;width:100%" :src="showImg(baseInfo.coverPicUrl)"></el-image>
        <el-form :model="baseInfo" label-width="120" label-position="right">
          <el-form-item label="直播方：" style="margin-bottom: 10px">
            <span>{{baseInfo.merName}}</span>
          </el-form-item>
          <el-form-item label="直播主题：" style="margin-bottom: 10px">
            <span>{{baseInfo.activityNotice}}</span>
          </el-form-item>
          <el-form-item label="开播时间：" style="margin-bottom: 10px">
            <span>{{baseInfo.beginTime}}</span>
          </el-form-item>
          <el-form-item label="直播介绍：" style="margin-bottom: 0">
            <span>{{baseInfo.liveIntroduce}}</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <!-- <span slot="footer" class="dialog-footer" style="padding: 0 10px 10px">
      <el-button @click="dialogVisible = false" size="mini">关 闭</el-button>
    </span> -->
  </el-dialog>
</template>
<script>
import liveRequest from '@/api/live'
import { getAppletsQrCode } from '@/api/factory-live'
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      empCodeLoading: false,
      baseInfo: {
        
      },
      qrCode: null,
      imgCode: ''
    }
  },
  methods: {
    openShare(merCode, id) {
      this.loading = true
      this.empCodeLoading = true
      this.dialogVisible = true
      this.baseInfo = {}
      liveRequest.getLiveDetails({liveId: id}).then(res => {
        this.loading = false
        if (res.code === '10000' && res.data) {
          this.baseInfo = res.data
          // 获取分享二维码
          const params = {
            appletUrl: this.baseInfo.clientAppletsUrl,
            liveId: id
          }
          getAppletsQrCode(params).then(res => {
            this.empCodeLoading = false
            this.imgCode = `data:image/png;base64,${res.data}`
          })
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
      .then(_ => {
        done()
      })
      .catch(_ => {})
    }
  }
}
</script>
<style lang="scss">
.share-live-content{
  display: flex;border: 1px solid #eee;
  .content-left{
    flex: 0 0 45%;
    .pm-qr-code {
      width: 100%;text-align:center;
      margin: 0 auto;height: 450px;
      padding-top: 50px;
    }
  }
  .content-right{
    background-color: #6943DB;
    height: 450px; overflow: auto;padding:10px;color: #ffff;
    flex: 0 0 55%;
    .el-form-item__label{
      color: #fff;
    }
  }
}
</style>
