<template>
  <div class="selected-store-view">
    <el-table ref="dataTable" :data="selectedStores">
      <el-table-column property="stCode" label="门店编码" width="100" />
      <el-table-column property="stName" label="门店名称" width="100" />
      <el-table-column property="address" label="门店地址" />
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      selectedStores: []
    }
  },
  methods: {
    show(selectedStores) {
      this.selectedStores = selectedStores
    },
    // 删除已选门店
    handleDel(row) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.selectedStores = this.selectedStores.filter(item => item !== row)
        this.$emit('onDel', this.selectedStores)
      })
    }

  }
}
</script>
<style lang="scss">
.selected-store-view {
  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }
  .amTips {
    color: #606266;
  }
}
</style>
