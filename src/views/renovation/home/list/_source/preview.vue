<template>
  <div class="preview-box">
    <el-form size="small">
      <el-form-item label="预览链接">
        <el-input v-model="previewInfo.url" placeholder="" />
      </el-form-item>
      <el-form-item label="二维码">
        <div id="qrCode" ref="qrCodeDiv" />
        <p>预览页面仅供样式查看，请勿对外开放</p>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'Perview',
  props: {
    previewInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  mounted() {
    this.createQrCode()
  },
  methods: {
    createQrCode() {
      this.qrCode = new QRCode(this.$refs.qrCodeDiv, {
        // text: this.link,
        width: 200,
        height: 200,
        colorDark: '#333333', // 二维码颜色
        colorLight: '#ffffff', // 二维码背景色
        correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
      })
    }
  }
}
</script>
