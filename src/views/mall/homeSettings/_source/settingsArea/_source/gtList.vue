<template>
  <el-table :data="tableData" style="width: 100%" size="mini" class="scrollbar" height="calc(100vh - 512px)">
    <el-table-column label="选择" width="55">
      <template slot-scope="scope">
        <el-checkbox v-model="scope.row.select" :disabled="isDisabled" @change="v => onCheckbox(v, scope.row)" />
      </template>
    </el-table-column>
    <el-table-column label="商品图片" width="70">
      <template slot-scope="scope">
        <template v-if="scope.row.picUrl || scope.row.mainPic">
          <el-image style="width: 40px; height: 40px;display: block" fit="contain" :src="`${showImg(scope.row.picUrl || scope.row.mainPic)}?x-oss-process=style/w_80`" />
        </template>
        <template v-else>-</template>
      </template>
    </el-table-column>
    <el-table-column prop="erpCode" label="商品编码" show-overflow-tooltip />
    <el-table-column prop="name" label="商品名称" show-overflow-tooltip />
    <el-table-column prop="brandName" label="品牌" />
    <el-table-column prop="specStr" label="规格" show-overflow-tooltip />
    <el-table-column label="参考价" width="60">
      <template slot-scope="scope">
        <span style="color:#ff0000">¥{{ scope.row.price }}</span>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import { saIsId } from './utils'
export default {
  name: 'GtList',
  data() {
    return {
      activesData: [],
      tableData: []
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    itemList: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handlerActives() {
      this.tableData = _.map(this.tableData, v => { return { ...v, select: saIsId(this.activesData, v.specId) } })
    },
    handlerClose({ specId }, fn) {
      this.activesData = _.reject(this.activesData, ['specId', specId])
      this.handlerActives()
      fn(specId)
    },
    onCheckbox(e, item) {
      const { specId } = item
      const is = _.some(this.activesData, { specId: specId })
      item.select = !is
      if (is) {
        this.activesData = _.reject(this.activesData, ['specId', specId])
      } else {
        this.activesData.push(this.handlerItem(item))
      }
      this.$emit('on-selects', _.reject(this.activesData, ['specId', '']))
    },
    handlerItem(item) {
      const { specId, picUrl, price, mprice, name, storeId, storeName, merCode, commodityId, keyFeature } = item
      return {
        keyFeature,
        commodityId,
        specId,
        img: picUrl,
        price,
        url: `${this.h5Base}pages/details/index?productId=${specId}&storeId=${storeId}&storeName=${storeName}&merCode=${merCode}`,
        mprice,
        name,
        activityId: ''
      }
    },
    handlerActiveData() {
      return _.map(this.activesData, v => {
        return this.handlerItem(v)
      })
    }
  },
  watch: {
    'list': {
      deep: true,
      immediate: true,
      handler(list) {
        this.activesData = this.itemList
        this.tableData = _.map(list, v => {
          return { ...v, select: _.isEmpty(v.select) ? v.select : !!saIsId(this.activesData, v.specId) }
        })
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
  computed: {
    isDisabled() {
      return this.activesData.length > 20
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .gt-list-model {

  }
</style>
