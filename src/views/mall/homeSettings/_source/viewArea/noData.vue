<template>
  <div class="va-no-data-model">
    <div class="vndm-box">
      <p class="p-icon" />
      <p class="p-text">暂无组件数据<br>请拖拽组件模块构建主页！</p>
    </div>
  </div>
</template>
<script>
export default {
  name: 'VaNoData',
  data() {
    return {}
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
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-no-data-model {
    height: 180px;
    margin-left: -2px;
    margin-bottom: -20px;
    .vndm-box {
      width: 400px;
      background: #fff;
      margin: 0 auto;
      height: 160px;
      border: 2px dotted #409EFF;
      border-radius:4px;
      text-align: center;
      .p-text {
        color: #ccc;
        line-height: 21px;
        font-size: 13px;
        margin: 10px 0;
      }
      .p-icon {
        width: 73px;
        height: 48px;
        display: inline-block;
        background: url('./img/va_icos_no_data.png') no-repeat;
        opacity: .4;
        margin-top: 30px;
      }
    }
  }
</style>
