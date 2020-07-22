<template>
  <el-dialog
    title
    :visible.sync="dialogVisible"
    width="400px"
    :before-close="handleClose"
    :append-to-body="true"
  >
    <div class="start-live-content">
      <div class="pm-qr-code">
        <el-image  :src="imgCode" style="width:250px;height:250px" v-loading="loading" />
        <div style="margin-top:50px;font-weight:bold;text-align:center;font-size:16px">扫码开启直播</div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer" style="padding: 0 10px 10px">
      <el-button @click="dialogVisible = false" size="mini">关 闭</el-button>
    </span>
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
      qrCode: null,
      imgCode: ''
    }
  },
  methods: {
    openShare(merCode, id) {
      this.loading = true
      this.dialogVisible = true
      liveRequest.getLiveDetails({ liveId: id }).then(res => {
        // 获取分享二维码
        const params = {
          appletUrl: res.data.anchorAppletsUrl,
          liveId: id
        }
        getAppletsQrCode(params).then(res => {
          this.loading = false
          this.imgCode = `data:image/png;base64,${res.data}`
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
.start-live-content {
  .pm-qr-code{
    width:260px;margin: 0 auto;
  }
}
</style>