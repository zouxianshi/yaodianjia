<template>
  <div class="first-item-model">
    <img class="icon" src="./../img/va_nav_1.png" alt="">
    <p class="text">感冒发烧-{{ i }}</p>
  </div>
</template>
<script>
export default {
  name: 'FirstItem',
  data() {
    return {}
  },
  props: {
    i: {
      type: Number,
      default: 0
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
  .first-item-model {
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
