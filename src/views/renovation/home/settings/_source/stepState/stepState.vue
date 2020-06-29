<template>
  <div class="step-state-model">
    <div class="ssm-box">
      <div class="ssm-icon">
        <i class="el-icon-success" />
      </div>
      <div class="ssm-text-1">操作成功</div>
      <div class="ssm-text-2">首页创建成功，已保存至首页列表</div>
      <div class="ssm-text-3"><span>5</span>秒后跳转至首页列表</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'StepState',
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
  .step-state-model {
    position: relative;
    height: calc(100vh - 320px);
    .ssm-box {
      text-align: center;
      width: 280px;
      height: 280px;
      position: absolute;
      left: 50%;
      top: 50%;
      margin-left: -140px;
      margin-top: -140px;
      .ssm-icon {
        >i {
          font-size: 66px;
          color: #1ABA77;
        }
      }
      .ssm-text-1 {
        font-size: 24px;
        color: #000000;
        margin-top: 20px;
      }
      .ssm-text-2 {
        font-size: 14px;
        color:rgba(0, 0, 0, 0.43);
        margin: 20px 0;
      }
      .ssm-text-3 {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        span {
          color: rgba(24, 144, 255, 1);
          margin-right: 4px;
        }
      }
    }

  }
</style>
