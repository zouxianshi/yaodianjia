<template>
  <div class="spec-setting-model">
    <el-form>
      <el-form-item label="规格设置：">
        <m-spec-select v-if="isSpec" :spec-select="specSelect" @on-spec="onSpec" />
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
    onSpec({ key, selected, attributeName }) {
      const specListData = _.cloneDeep(this.specListData)
      if (!selected) {
        this.specListData = _.map(specListData, v => _.omit(v, [key]))
        this.$refs['specCreate'].delSpecData(key)
      } else {
        // flatten data
        const valueList = _(specListData).map('valueList').filter().flatMap().value()
        // filter no key value
        const vlData = _.filter(valueList, ['skuKeyName', attributeName])
        // key-value transformation
        const transfKey = vlData.reduce((p, c, currentIndex) => { return { ...p, [`${currentIndex}_index_${c.skuKeyId}_${c.skuKeyName}`]: c } }, {})

        this.specListData = _.map(this.specListData, (v, i) => {
          console.log(`${i}_${key}`)
          const k = transfKey[`${i}_${key}`]
          return {
            ...v,
            [key]: _.isEmpty(k) ? '' : k.skuValue
          }
        })
      }
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
            selected: _.size(res.data) === 1 ? true : skuKeyNameArr.includes(v.attributeName)
          }
        })

        this.isSpec = true
      })
    },
    $verification() {
      const specCreateInstance = this.$refs['specCreate']

      if (specCreateInstance === undefined) {
        this.$message({ message: '至少勾选一个规格项', type: 'warning' })
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
