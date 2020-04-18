<template>
  <div class="va-commodity-model">
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mFirstCommodity from './firstCommodity'
import mSecondCommodity from './secondCommodity'
import mThirdCommodity from './thirdCommodity'
import mFourCommodity from './fourCommodity'

export default {
  name: 'VaCommodity',
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
        case 'second':
          return mSecondCommodity
        case 'third':
          return mThirdCommodity
        case 'four':
          return mFourCommodity
        default:
          return mFirstCommodity
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-commodity-model {
    margin-bottom: -8px;
  }

</style>
