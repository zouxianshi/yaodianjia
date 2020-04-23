<template>
  <div class="sa-commodity-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <component :is="mod" :item="item" @on-update="_onUpdate" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
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
  methods: {
    ...mapActions('mall', ['saveAssembly']),
    _onUpdate(searchParams, fn) {
      const { item: { uuid }, dragGlobal: { id }} = this
      this.saveAssembly({ searchParams: { ...searchParams, dimensionId: id }, uuid }).then(() => {
        fn()
        this.$message.success('组件保存成功')
      }).catch(() => {
        fn()
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    console.log(this.item)
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
    ...mapState('mall', ['dragGlobal']),
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
  .sa-commodity-model {

  }
</style>
