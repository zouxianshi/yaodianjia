<template>
  <div class="selected-tabel-modal">
    <el-table :data="data" size="mini">
      <el-table-column property="num" label="门店编码" width="150" />
      <el-table-column property="name" label="门店名称" />
      <el-table-column property="address" label="门店地址" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="deletes(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  methods: {
    deletes(e) {
      this.$emit('_deleteItem', e)
    }
  }
}
</script>
<style lang="scss">
.selected-tabel-modal{
  .el-table thead th{
    height: 40px;
  }
}
</style>
