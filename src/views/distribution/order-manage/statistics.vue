<template>
  <div class="page-container">
    <div class="row">
      <div class="label">选择发货商品：</div>

      <el-select
        v-model="classify.name"
        placeholder="请选择"
        class="select"
        @change="classifyChange"
      >
        <el-option
          v-for="item in classifyList"
          :key="item.productId"
          :label="item.name"
          :value="{ name: item.name, productId: item.productId }"
        />
      </el-select>
      <!-- <el-button
        type="primary"
        size="small"
        @click.stop="queryOrder"
        style="margin-left:16px;"
        >匹配数据</el-button
      > -->
    </div>
    <div class="row">
      <el-input
        v-model="storeName"
        placeholder="请输入门店名称搜索"
        class="search"
      />
      <el-button
        v-loading="loading"
        type="primary"
        size="small"
        style="margin-left:16px;"
        @click.stop="_search"
      >查询</el-button>
      <el-button
        size="small"
        style="margin-left:16px;"
        @click.stop="clearSearch"
      >清空</el-button>
    </div>
    <div class="row">
      <el-table v-loading="loading" :data="tableList">
        <el-table-column prop="storeName" label="门店" />
        <el-table-column prop="orderCount" label="订单总量" />
        <el-table-column prop="productAllCount" label="商品总量" />
      </el-table>
    </div>
    <div class="pagination-container row">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import DistributionService from '@/api/distributionService'
export default {
  data() {
    return {
      classify: { name: '', productId: null },
      classifyList: [],
      storeName: '',
      loading: false,
      currentPage: 1,
      pageSize: 10,
      tableList: [],
      totalCount: 0
    }
  },
  mounted() {
    this.queryGoodsClassify()
  },
  methods: {
    async queryGoodsClassify() {
      const { data } = await DistributionService._getProductList()
      this.classifyList = data
    },
    classifyChange(e) {
      this.classify = e
    },
    handleSizeChange(e) {
      this.pageSize = e
      this.currentPage = 1
      this._search()
    },
    handleCurrentChange(e) {
      this.currentPage = e
      this._search()
    },
    async _search() {
      if (!this.classify.productId) return
      const param = {
        productId: this.classify.productId,
        storeName: this.storeName,
        currentPage: this.currentPage,
        pageSize: this.pageSize
      }
      const { data } = await DistributionService.productStatistics(param)
      this.tableList = data.data
      this.totalCount = data.totalCount
    },
    clearSearch() {
      this.storeName = ''
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  width: 80%;
  margin: 0 auto;
  height: calc(100vh - 160px);
  overflow-y: scroll;
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    margin-top: 20px;
    .label {
      width: 120px;
      font-size: 14px;
      color: #000;
    }
    .select {
      width: 332px;
    }
    .search {
      margin-left: 120px;
      width: 332px;
    }
  }
  .pagination-container {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
