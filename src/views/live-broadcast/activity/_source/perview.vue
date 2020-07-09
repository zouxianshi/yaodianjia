<template>
  <div class="preview-model">
    <p class="pm-text">使用微信扫码，扫描二维码预览效果 </p>
    <div class="pm-qr-code">
      <div id="qrCode" ref="qrCodeDiv" />
    </div>
  </div>
</template>
<script>
import QRCode from 'qrcodejs2'
export default {
  name: 'Preview',
  data() {
    return {
      qrCode: null
    }
  },
  props: {
    link: {
      type: String,
      default: null
    }
  },
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
    this.qrCode = new QRCode(this.$refs.qrCodeDiv, {
      text: this.link,
      width: 200,
      height: 200,
      colorDark: '#333333', // 二维码颜色
      colorLight: '#ffffff', // 二维码背景色
      correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
    })
    console.log(this.qrCode)
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .preview-model {
    text-align: center;
    color: #777;
    .pm-text {
      margin-top: -10px;
    }
    .pm-link {
      font-size: 12px;
      color: #888;
    }
    .pm-qr-code {
      width: 200px;
      height: 200px;
      margin: 30px auto;
    }
    .pm-ok {
      margin:30px 0 20px 0;
    }
  }
</style>
