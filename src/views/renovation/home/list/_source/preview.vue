<template>
  <div class="preview-box">
    <el-form size="small" label-width="80px">
      <el-form-item label="预览链接">
        <input id="path" class="" hidden type="text">
        <div class="share-path">
          <p id="url" class="link-txt" v-text="link" />
          <span
            v-clipboard:error="onError"
            v-clipboard:copy="link"
            v-clipboard:success="onCopy"
            class="copy"
          >复制</span>
        </div>
      </el-form-item>
      <el-form-item label="二维码">
        <div id="qrCode" ref="qrCodeDiv" />
        <p>预览页面仅供样式查看，请勿对外投放</p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'Perview',
  props: {
    dimensionId: {
      type: String,
      default: null
    },
    isNew: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      link: ''
    }
  },
  mounted() {
    const { $store, dimensionId, isNew } = this
    this.link = `${this.h5Base}pages/home/preview?dimensionId=${dimensionId}&merCode=${$store.getters.merCode}&isNew=${isNew}`
    this.qrCode = new QRCode(this.$refs.qrCodeDiv, {
      text: this.link,
      width: 200,
      height: 200,
      colorDark: '#333333', // 二维码颜色
      colorLight: '#ffffff', // 二维码背景色
      correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
    })
  },
  methods: {
    onError() {
      this.$message.error('复制失败')
    },
    onCopy() {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.share-path{
  width:320px;
  height:40px;
  background:#F0F0F0;
  border-radius:4px;
  border:1px solid #E0E0E0;
  color: #909399;
  font-size: 14px;
  padding: 0 16px;
  display: flex;
  align-items: center;
  .link-txt{
    white-space: nowrap;
    text-overflow: ellipsis;
    display: inline-block;
    word-break: break-all;
    flex: 1;
    overflow: hidden;
  }
  .copy{
    color: #4F88FF;
    flex:  0 0 30px;
    cursor: pointer;
  }
}
</style>
