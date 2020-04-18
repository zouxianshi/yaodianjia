<template>
  <div class="va-recommend-entry">
    <div class="vre-title">
      <m-title :item="{itemList:[{name:'为你推荐'}]}" />
    </div>
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mTitle from '../title'
import mFirstRecommend from './firstRecommend'
import mSecondRecommend from './secondRecommend'

export default {
  name: 'VaRecommend',
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
      return this.item.subType === 'first' ? mFirstRecommend : mSecondRecommend
    }
  },
  components: { mTitle }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-recommend-entry {
    margin-bottom: -8px;
    .vre-title {
      margin-bottom: 16px;
    }
  }
</style>
