<template>
  <div class="selected-product-view">
    <el-table ref="dataTable" :data="selectedProducts.slice((pageInfo.currentPage-1)*pageInfo.pageSize, pageInfo.currentPage*pageInfo.pageSize)" height="250">
      <el-table-column property="num" label="商品图片">
        <template slot-scope="scope">
          <img class="goods-logo" :src="showImg(scope.row.mainPic)" :preview-src-list="[showImg(scope.row.mainPic)]">
        </template>
      </el-table-column>
      <el-table-column property="erpCode" label="商品编码" />
      <el-table-column property="name" label="商品名称" />
      <el-table-column property="brandName" label="品牌" />
      <el-table-column property="packStandard" label="规格" />
      <el-table-column property="mprice" label="参考价" />
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :current-page="pageInfo.currentPage"
      :page-size="pageInfo.pageSize"
      layout="prev, pager, next"
      :total="selectedProducts.length"
      @current-change="handleSizeChange"
    />
    <div class="amTips">已选商品{{ selectedProducts.length }}个</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedProducts: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 5
      }
    }
  },
  methods: {
    show(selectedProducts) {
      this.selectedProducts = selectedProducts
    },
    // 删除已选商品
    handleDel(row) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectedProducts = this.selectedProducts.filter(item => item !== row)
        this.$emit('onDel', this.selectedProducts)
      })
    },
    // 分页
    handleSizeChange(e) {
      this.pageInfo.currentPage = e
    }
  }
}
</script>
<style lang="scss">
.selected-product-view {
  .goods-logo{
    width: 55px;
    height: 55px;
  }
  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }
  .amTips {
    color: #606266;
  }
}
</style>
