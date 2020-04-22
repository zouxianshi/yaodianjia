<template>
  <div class="preview-model">
    <p class="pm-text">使用微信扫码，扫描二维码预览效果 </p>
    <div class="pm-qr-code">
      <div id="qrCode" ref="qrCodeDiv" />
    </div>
    <p class="pm-link">链接：{{ link }}</p>
    <p class="pm-ok">
      <el-button type="primary" round @click="() => $emit('on-close')">知道了</el-button>
    </p>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import QRCode from 'qrcodejs2'
export default {
  name: 'Preview',
  data() {
    return {
      qrCode: null,
      link: ''
    }
  },
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
    const { dragGlobal: { id }, h5Base } = this
    this.link = `${h5Base}pages/home/preview?dimensionId=${id}`
    this.qrCode = new QRCode(this.$refs.qrCodeDiv, {
      text: this.link,
      width: 200,
      height: 200,
      colorDark: '#333333', // 二维码颜色
      colorLight: '#ffffff', // 二维码背景色
      correctLevel: QRCode.CorrectLevel.L// 容错率，L/M/H
    })
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    ...mapState('mall', ['dragGlobal'])
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
    .pm-qr-code {
      width: 200px;
      height: 200px;
      margin: 30px auto;
    }
    .pm-ok {
      margin-top: 30px;
    }
  }
</style>
