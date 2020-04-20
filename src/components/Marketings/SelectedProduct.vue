<template>
  <div>
    <el-table ref="dataTable" :data="selectedProducts">
      <el-table-column property="num" label="商品图片" />
      <el-table-column property="name" label="商品编码" />
      <el-table-column property="name" label="商品名称" />
      <el-table-column property="name" label="品牌" />
      <el-table-column property="name" label="规格" />
      <el-table-column property="name" label="参考价" />
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="amTips">已选商品{{ selectedProducts.length }}个</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedProducts: []
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
    }
  }
}
</script>
<style lang="scss">
</style>
