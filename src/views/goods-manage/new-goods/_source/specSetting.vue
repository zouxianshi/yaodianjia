<template>
  <div class="spec-setting-model">
    <el-form>
      <el-form-item label="规格设置：">
        <m-spec-select v-if="isSpec" :spec-select="specSelect" @on-spec-hide="onSpecHide" />
      </el-form-item>
    </el-form>
    <el-form v-if="cpdIsSpec">
      <el-form-item label="规格信息：">
        <div>
          <!--规格列表-->
          <m-spec-info v-if="isSpec && specListData.length" :spec-select="specSelect" :spec-list="specListData" />
          <!--添加规格-->
          <m-spec-create v-if="!isDisabled" ref="specCreate" :spec-select="specSelect" :spec-list="specListData" />
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import mSpecSelect from './specSelect'
import mSpecInfo from './specInfo'
import mSpecCreate from './specCreate'
import { getSpecsKey } from '@/api/new-goods'
import { handlerSaveSpecList } from './utils'

export default {
  name: 'SpecSetting',
  data() {
    return {
      isSpec: false,
      specSelect: [],
      specListData: []
    }
  },
  provide() {
    return {
      isDisabled: this.isDisabled
    }
  },
  props: {
    isDisabled: {
      type: Boolean,
      default: false
    },
    specList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onSpecHide(specVal) {
      this.specListData = _.map(_.cloneDeep(this.specListData), v => _.omit(v, [specVal]))
      this.$refs['specCreate'].delSpecData(specVal)
    },
    getSpecData() {
      this.isSpec = false
      getSpecsKey().then((res) => {
        const { specListData } = this
        const specs = _(specListData).map('valueList').filter().flatMap().value()
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
    },
    $verification() {
      const specCreateInstance = this.$refs['specCreate']

      if (!specCreateInstance) {
        return false
      }
      // specListData
      const createData = specCreateInstance.$verification()
      const { specListData, specSelect } = this

      if (_.isObject(createData)) {
        return handlerSaveSpecList([...specListData, ...createData], specSelect)
      } else {
        return false
      }
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.specListData = this.specList
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
  computed: {
    cpdIsSpec() {
      return _.some(this.specSelect, ['selected', true])
    }
  },
  components: { mSpecSelect, mSpecInfo, mSpecCreate }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-setting-model {

  }
</style>
