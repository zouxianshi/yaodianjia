<template>
  <m-sa-layout>
    <div slot="exhibition">
      <m-third-commodity />
    </div>
    <div slot="item">
      <el-button size="mini" style="width: 100%;margin-bottom: 16px;" icon="el-icon-edit-outline" @click="dialogVisible = true">选择商品</el-button>
      <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body title="选择商品" size="700px" :visible.sync="dialogVisible" :with-header="false">
        <m-goods-table />
      </el-drawer>
    </div>
    <el-button slot="submit" type="primary" style="width: 100%" size="mini">保存商品设置3</el-button>
  </m-sa-layout>
</template>
<script>
import mSaLayout from '../_source/saLayout'
import mGoodsTable from './../_source/goodsTable'
import mThirdCommodity from '../../viewArea/commodity/thirdCommodity'
export default {
  name: 'ThirdCommodity',
  data() {
    return {
      dialogVisible: false
    }
  },
  props: {},
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
  computed: {},
  components: { mSaLayout, mGoodsTable, mThirdCommodity }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .third-commodity-model {

  }
</style>
