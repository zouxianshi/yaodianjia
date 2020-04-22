<template>
  <div class="va-advertise-model">
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mFirstAdvertise from './firstAdvertise'
import mSecondAdvertise from './secondAdvertise'
import mThirdAdvertise from './thirdAdvertise'
import mFourAdvertise from './fourAdvertise'
import mFiveAdvertise from './fiveAdvertise'

export default {
  name: 'VaAdvertise',
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
          return mSecondAdvertise
        case 'third':
          return mThirdAdvertise
        case 'four':
          return mFourAdvertise
        case 'five':
          return mFiveAdvertise
        default:
          return mFirstAdvertise
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-advertise-model {
    position: relative;
  }
</style>
