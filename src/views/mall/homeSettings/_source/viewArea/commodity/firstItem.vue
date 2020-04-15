<template>
  <div class="c-first-item-model">
    <m-icon-activity />
    <img class="cfim-photo" src="../img/va_nav_1.png" alt="" width="140" height="140">
    <p class="cfim-name">拜耳力度伸维c泡腾片</p>
    <p class="cfim-price">
      <span class="p-1">¥188.00</span>
      <span class="p-2">¥120</span>
    </p>
    <p class="cfim-cart" />
  </div>
</template>
<script>
import mIconActivity from '../iconActivity'
export default {
  name: 'CFirstItem',
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
  .c-first-item-model {
    width: 193px;
    height: 259px;
    background: #fff;
    border-radius: 6px;
    float: left;
    position: relative;
    margin: 0 6px 10px 6px;
    &:nth-child(1) {
      margin-left: 10px;
    }
    .cfim-name,.cfim-price {
      padding:0 10px;
    }
    .cfim-photo {
      width: 140px;
      margin: 30px auto;
      display: block;
    }
    .cfim-name {
      font-size: 14px;
      color: #333;
    }
    .cfim-price {
      font-size: 14px;
      padding-top: 14px;
      .p-1 {
        color: #fb3f38;
      }
      .p-2 {
        font-size: 12px;
        color: #bdc1ca;
        text-decoration: line-through;
        padding-left: 12px;
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
