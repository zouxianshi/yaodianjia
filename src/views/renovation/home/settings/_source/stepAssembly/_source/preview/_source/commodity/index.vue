<template>
  <div class="commodity-index-model">
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mFirst from './first'
import mSecond from './second'
import mThird from './third'
import mFour from './four'
export default {
  name: 'CommodityIndex',
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
  computed: {
    mod() {
      switch (this.item.subType) {
        case 'first':
          return mFirst
        case 'second':
          return mSecond
        case 'third':
          return mThird
        case 'four':
          return mFour
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .commodity-index-model {
  }
</style>
