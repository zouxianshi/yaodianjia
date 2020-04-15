<template>
  <div class="va-header-model">
    <div class="vhm-title-box">
      <div class="drag-area">
        <span class="sp1">标题栏</span>
        <div class="oper">
          <m-edit :item="{code:'mall-title'}" />
        </div>
      </div>
      <div class="title">
        <b>海典健康商城</b>
      </div>
    </div>
  </div>
</template>
<script>

import mEdit from './edit'
export default {
  name: 'VaHeader',
  components: { mEdit },
  props: {},
  data() {
    return {}
  },
  computed: {},
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
  methods: {},
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-header-model {
    width: 420px;
    height: 150px;
    background: url('./img/va_header.png') no-repeat;
    position: relative;
    z-index: 0;
    .vhm-title-box {
      width: 424px;
      height: 36px;
      line-height: 34px;
      position: absolute;
      left: -2px;
      top: 56px;
      text-align: center;
      border: 2px solid transparent;
      &:hover {
        border-color: #409EFF;
        .drag-area {
          display: block;
        }
      }
      .drag-area {
        width: 422px;
        height: 30px;
        line-height: 28px;
        background: #409EFF;
        position: absolute;
        left: -2px;
        top: -30px;
        display: none;
        text-align: center;
        border-radius:4px 0 0 0;
        .oper {
          position: absolute;
          right: -40px;
          top: 0;
          z-index: 2;
        }
        .sp1 {
          position: absolute;
          left: 10px;
          top: 3px;
          font-size: 13px;
          color: #fff;
        }
      }
      .title {
        font-size: 18px;
        color: #fff;
      }
    }
  }
</style>
