<template>
  <div class="spec-setting-model">
    <el-form>
      <el-form-item label="规格设置：">
        <m-spec-select v-if="isSpec" :spec-select="specSelect" />
      </el-form-item>
    </el-form>
    <el-form>
      <el-form-item label="规格信息：">
        <m-spec-info v-if="isSpec" :spec-list="specList" :spec-select="specSelect" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mSpecSelect from './specSelect'
import mSpecInfo from './specInfo'
import { getSpecsKey } from '@/api/new-goods'

export default {
  name: 'SpecSetting',
  data() {
    return {
      isSpec: false,
      specSelect: []
    }
  },
  props: {
    specList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    getSpecData() {
      this.isSpec = true
      getSpecsKey().then((res) => {
        const { specList } = this
        const specs = _(specList).map('valueList').filter().flatMap().value()
        const skuKeyNameArr = _.map(specs, 'skuKeyName')

        // handler selected spec
        this.specSelect = _.map(res.data, v => {
          return {
            ...v,
            selected: skuKeyNameArr.includes(v.attributeName)
          }
        })

        this.isSpec = true
      })
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getSpecData()
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
  components: { mSpecSelect, mSpecInfo }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-setting-model {

  }
</style>
