<template>
  <div class="n-first-item-model">
    <img class="icon" src="./../img/va_nav_1.png" alt="">
    <p class="text">感冒发烧-{{ item.a }}</p>
  </div>
</template>
<script>
export default {
  name: 'VaFirstItem',
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
  .n-first-item-model {
    text-align: center;
    width: 73px;
    margin: 0 15px 18px 15px;
    .icon {
      width: 73px;
      height: 73px;
      display: block;
    }
    .text {
      font-size: 14px;
      color: #333;
      padding-top: 8px;
    }
  }
</style>
