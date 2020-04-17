<template>
  <div class="sa-commodity-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// comm-spec/_search
import mFirstCommodity from './firstCommodity'
import mSecondCommodity from './secondCommodity'
import mThirdCommodity from './thirdCommodity'
import mFourCommodity from './fourCommodity'
export default {
  name: 'SaCommodity',
  data() {
    return {
      assemblyName: '商品设置'
    }
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
      switch (this.item.type) {
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
  .sa-commodity-model {

  }
</style>
