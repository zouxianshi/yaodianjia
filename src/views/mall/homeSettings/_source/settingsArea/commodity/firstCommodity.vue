<template>
  <m-sa-layout>
    <div slot="exhibition">
      <m-first-commodity :item="searchParams" />
    </div>
    <div slot="item">
      <el-button size="mini" style="width: 100%;margin-bottom: 16px;" icon="el-icon-edit-outline" @click="dialogVisible = true">选择商品</el-button>
      <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body size="700px" :visible.sync="dialogVisible">
        <div slot="title">
          选择商品
        </div>
        <m-goods-table v-if="dialogVisible" ref="gt" :item-list="searchParams.itemList" :sub-type="searchParams.subType" @on-update="_onUpdate" />
      </el-drawer>
    </div>
    <el-button slot="submit" type="primary" size="mini" :loading="loading" @click="onSubmit">保存商品设置</el-button>
  </m-sa-layout>
</template>
<script>
import mSaLayout from '../_source/saLayout'
import mGoodsTable from './../_source/goodsTable'
import mFirstCommodity from '../../viewArea/commodity/firstCommodity'
export default {
  name: 'FirstCommodity',
  data() {
    return {
      loading: false,
      dialogVisible: false,
      searchParams: {
        dimensionId: '',
        id: '',
        itemList: [],
        subType: 'first',
        title: '',
        type: 'commodity'
      }
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    onSubmit() {
      this.loading = true
      this.$emit('on-update', _.cloneDeep(this.searchParams), () => {
        setTimeout(() => {
          this.loading = false
        }, 800)
      })
    },
    _onUpdate(itemList) {
      this.searchParams.itemList = _.cloneDeep(itemList)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.searchParams = _.cloneDeep(this.item)
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
  components: { mSaLayout, mFirstCommodity, mGoodsTable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .first-commodity-model {

  }
</style>
