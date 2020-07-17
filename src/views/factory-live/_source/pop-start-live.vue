<template>
  <el-dialog
    title
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose"
    :append-to-body="true"
  >
    <div class="share-live-content">
      <div class="pm-qr-code">
        <div id="qrCode" ref="qrCodeDiv" style="height:260px" v-loading="loading" />
        <div style="margin-top:50px;font-weight:bold;text-align:center;font-size:16px">扫码开启直播</div>
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
      qrCode: null
    }
  },
  methods: {
    openShare(merCode, id) {
      this.loading = true
      this.dialogVisible = true
      liveRequest.getLiveDetails({ liveId: id }).then(res => {
        this.loading = false
        if (this.$refs.qrCodeDiv && this.$refs.qrCodeDiv.innerHTML !== '') {
          this.$refs.qrCodeDiv.innerHTML = ''
        }
        if (res.code === '10000' && res.data) {
          this.qrCode = new QRCode(this.$refs.qrCodeDiv, {
            text: res.data.pushStreamUrl,
            width: 260,
            height: 260,
            colorDark: '#333333', // 二维码颜色
            colorLight: '#ffffff', // 二维码背景色
            correctLevel: QRCode.CorrectLevel.L // 容错率，L/M/H
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
.share-live-content {
  .pm-qr-code{
    width:260px;margin: 0 auto;
  }
}
</style>