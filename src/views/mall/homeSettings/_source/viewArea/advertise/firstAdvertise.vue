<template>
  <div class="va-first-advertise-model">
    <div class="t" />
    <m-banner width="400px" height="120px" :item-list="item.itemList" />
  </div>
</template>
<script>
import mBanner from './../../_source/banner'
export default {
  name: 'VaFirstAdvertise',
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
  components: { mBanner }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-first-advertise-model {
    padding: 0 10px;
    position: relative;
    .t {
      width: 420px;
      height: 180px;
      background: red;
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      opacity: 0;
    }
    .va-error-drag {

    }
  }
</style>
