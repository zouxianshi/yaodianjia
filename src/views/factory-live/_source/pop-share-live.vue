<template>
  <el-dialog title="" :visible.sync="dialogVisible" width="800px" :before-close="handleClose" :append-to-body="true">
    <div class="share-live-content">
      <div class="content-left">
        <div class="pm-qr-code">
          <div id="qrCode" ref="qrCodeDiv" style="height:260px" v-loading="loading" />
          <div style="margin-top:50px;font-weight:bold;text-align:center;font-size:16px">扫码观看直播</div>
        </div>
      </div>
      <div class="content-right">
        <el-image style="height:200px;width:100%" :src="showImg(baseInfo.coverPicUrl)"></el-image>
        <el-form :model="baseInfo">
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
    <span slot="footer" class="dialog-footer" style="padding: 0 10px 10px">
      <el-button @click="dialogVisible = false" size="mini">关 闭</el-button>
    </span>
  </el-dialog>
</template>
<script>
import QRCode from 'qrcodejs2'
import liveRequest from '@/api/live'
export default {
  data() {
    return {
      dialogVisible: false,
      loading: false,
      baseInfo: {
        
      },
      qrCode: null
    }
  },
  methods: {
    openShare(merCode, id) {
      this.loading = true
      this.dialogVisible = true
      this.baseInfo = {}
      liveRequest.getLiveDetails({liveId: id}).then(res => {
        if (res.code === '10000' && res.data) {
          this.baseInfo = res.data
        }
      })
      if (this.$refs.qrCodeDiv && this.$refs.qrCodeDiv.innerHTML !== '') {
        this.$refs.qrCodeDiv.innerHTML = ''
      }
      liveRequest.getShareLivePage(merCode, id).then(res => {
        this.loading = false
        this.qrCode = new QRCode(this.$refs.qrCodeDiv, {
          text: res.data,
          width: 260,
          height: 260,
          colorDark: '#333333', // 二维码颜色
          colorLight: '#ffffff', // 二维码背景色
          correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
        })
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
  display: flex;
  .content-left{
    flex: 0 0 50%;
    .pm-qr-code {
      width: 260px;
      height: 260px;
      margin: 0 auto;
    }
  }
  .content-right{
    height: 450px; overflow: auto;
    flex: 0 0 50%;
  }
}
</style>
