<template>
  <div class="spec-create-model">
    <div class="scm-box">
      <div v-for="(item,$index) in specData" :key="$index">
        <m-spec-form-item :key="$index" :ref="'specFormItem_' + $index" :item="item" :idx="$index" :spec-select="specSelectData">
          <div slot="header">
            <span>规格 {{ specList.length + $index + 1 }}</span>
            <i class="el-icon-delete" @click="onDelete($index)" />
          </div>
        </m-spec-form-item>
      </div>
    </div>
    <div class="scm-add" @click="onCreate"><span>+ 增加规格</span></div>
  </div>
</template>
<script>
import mSpecFormItem from './specFormItem'
import { handlerVfErpCode, handlerVfOwner } from './utils'

const itemParams = {
  picUrl: '',
  mprice: '',
  erpCode: '',
  barCode: '',
  owner: 0,
  limitType: 0,
  limitNum: '',
  limit: '',
  type: 2
}

export default {
  name: 'SpecCreate',
  data() {
    return {
      specData: [],
      specSelectData: []
    }
  },
  props: {
    specSelect: {
      type: Array,
      default: () => []
    },
    specList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    onDelete(idx) {
      this.specData = _.filter(this.specData, (v, i) => i !== idx)
    },
    onCreate() {
      this.specData.push(_.cloneDeep(itemParams))
    },
    delSpecData(specVal) {
      this.specData = _.map(this.specData, v => _.omit(v, [specVal]))
    },
    $verification() {
      const { specData } = this
      const createData = []
      let flag = true

      if (specData.length) {
        _.map(specData, (v, i) => {
          const itemParams = this.$refs[`specFormItem_${i}`][0].$verification()
          if (_.isObject(itemParams)) {
            createData.push(itemParams)
          } else {
            flag = false
          }
        })
      } else {
        flag = false
      }

      console.log(flag ? createData : false)
      console.log('-------------------------specCreate.vue')

      return flag ? createData : false
    },

    handlerSpecList(idx) {
      const { specList, specData } = this
      return {
        specList: _.reject(specList, ['selected', false]),
        specData: _.filter(specData, (v, i) => i !== idx)
      }
    },

    vfErpCode(erpCode, idx) {
      const { specList, specData } = this.handlerSpecList(idx)
      return handlerVfErpCode(specList, specData, erpCode)
    },

    vfOwner(key, keyVal, idx, owner) {
      const { specList, specData } = this.handlerSpecList(idx)
      return handlerVfOwner({
        data: [...specList, ...specData],
        key,
        keyVal,
        owner
      })
    }

  },
  watch: {
    'specSelect': {
      deep: true,
      immediate: true,
      handler(v) {
        this.specSelectData = v
      }
    }
  },
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
  computed: {},
  components: { mSpecFormItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-create-model {
    padding-left: 82px;
    padding-top: 8px;
    .scm-add {
      margin-top: -8px;
      span {
        font-size: 14px;
        color: #147de8;
        cursor: pointer;
      }
    }
  }
</style>
