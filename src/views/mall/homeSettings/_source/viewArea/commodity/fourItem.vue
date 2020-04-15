<template>
  <div class="c-four-item-model">
    <m-icon-activity />
    <img class="cfim-photo" src="../img/va_nav_1.png" alt="" width="100" height="100">
    <div class="cfim-content">
      <div class="cfim-name">拜耳力度神维c泡疼片30片橙味增强抵抗力补充维生素c感冒vc</div>
      <div class="cfim-price">
        <span class="sp1">¥88</span>
        <span class="sp2">¥102</span>
      </div>
    </div>
    <div class="cfim-cart" />
  </div>
</template>
<script>
import mIconActivity from '../iconActivity'
export default {
  name: 'CFourItem',
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
  components: { mIconActivity }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  // 白色圆角块
  @mixin white-background-radius($radius: 4px,$padding: 8px, $bg: #fff) {
    background: $bg;
    border-radius: $radius;
    padding: $padding;
  }
  .c-four-item-model {
    width: 398px;
    height: 128px;
    margin-bottom: 10px;
    position: relative;
    @include white-background-radius;
    .cfim-photo {
      position: absolute;
      left: 14px;
      top: 14px;
    }
    .cfim-content {
      margin-left: 120px;
      margin-top: 6px;
      position: relative;
      height: 100px;
      .cfim-name {
        font-size: 14px;
        line-height: 20px;
      }
      .cfim-price {
        font-size: 14px;
        position: absolute;
        left: 0;
        bottom: 0;
        .sp1 {
          font-size: 16px;
          color: #fb342c;
        }
        .sp2 {
          color: #c3c6cf;
          text-decoration: line-through;
          margin-left: 8px;
        }
      }
    }
    .cfim-cart {
      width: 28px;
      height: 28px;
      background: url('../img/va_icos_cart.png') no-repeat;
      position: absolute;
      right: 12px;
      bottom: 10px;
    }
  }
</style>
