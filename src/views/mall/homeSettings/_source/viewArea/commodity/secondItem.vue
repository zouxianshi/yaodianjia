<template>
  <div class="c-second-item-model">
    <img class="csim-photo" src="../img/va_nav_1.png" alt="" width="100" height="100">
    <p class="csim-name">拜耳力度伸维</p>
    <p class="csim-price">
      <span class="p-1">¥188.00</span>
    </p>
  </div>
</template>
<script>
export default {
  name: 'CSecondItem',
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
  .c-second-item-model {
    width: 126px;
    height: 178px;
    float: left;
    background: #fff;
    border-radius: 6px;
    position: relative;
    margin: 0 5px;
    display: block;
    margin-bottom: 10px;
    &:nth-child(1) {
      margin-left: 11px;
    }
    .csim-name,.csim-price {
      padding:0 10px;
    }
    .csim-photo {
      margin: 14px auto 16px auto;
      display: block;
    }
    .csim-name {
      font-size: 14px;
      color: #333;
    }
    .csim-price {
      font-size: 14px;
      padding-top: 8px;
      .p-1 {
        color: #fb3f38;
      }
    }
  }

</style>
