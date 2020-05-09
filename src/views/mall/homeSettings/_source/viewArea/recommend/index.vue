<template>
  <div class="va-recommend-entry">
    <div class="vre-title">
      <m-title :item="{itemList:[{name:'为你推荐'}]}" />
    </div>
    <component :is="mod" :item="item" @on-update="_onUpdate" />
  </div>
</template>
<script>
import mTitle from '../title'
import { mapState, mapActions } from 'vuex'
import mFirstRecommend from './firstRecommend'
import mSecondRecommend from './secondRecommend'

export default {
  name: 'VaRecommend',
  data() {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    ...mapActions('mall', ['saveAssembly']),
    _onUpdate(searchParams) {
      const { item: { uuid }, dragGlobal: { id }} = this
      this.saveAssembly({ searchParams: { ...searchParams, dimensionId: id }, uuid }).then(() => {
        this.$message.success('组件保存成功')
      })
    }
  },
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
    ...mapState('mall', ['dragData', 'dragGlobal']),
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
