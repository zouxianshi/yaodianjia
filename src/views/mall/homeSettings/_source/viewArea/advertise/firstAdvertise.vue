<template>
  <div class="va-first-advertise-model">
    <m-banner width="400px" :item-list="item.itemList" />
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
    .va-error-drag {

    }
  }
</style>
