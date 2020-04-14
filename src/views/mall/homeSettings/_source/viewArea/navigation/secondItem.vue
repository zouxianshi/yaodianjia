<template>
  <div class="n-second-item-model">
    <img class="icon" src="./../img/va_nav_2.png" alt="">
    <p class="text">感冒-{{ item.a }}</p>
  </div>
</template>
<script>
export default {
  name: 'VaSecondItem',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
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
  .n-second-item-model {
    text-align: center;
    width: 55px;
    margin: 0 14px 16px 14px;
    .icon {
      width: 55px;
      height: 55px;
      display: block;
    }
    .text {
      font-size: 13px;
      color: #333;
      padding-top: 8px;
    }
  }
</style>
