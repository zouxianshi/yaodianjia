<template>
  <div class="support-staff-comp">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="序号" width="180" />
      <el-table-column prop="isOnline" label="在线状态" width="180">
        <template slot-scope="scope">{{ scope.row.isOnline ? '在线' : '不在线' }}</template>
      </el-table-column>
      <el-table-column prop="name" label="客服名称" />
      <el-table-column prop="actions" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewHistoryMsg(scope.row)">查看消息记录</el-button>
          <el-button type="text" size="small" @click="delStaff(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagination"
      :current-page="currentPage"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
export default {
  name: 'SupportStaff',
  props: {
    tableData: {
      type: Array,
      default: null
    },
    total: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      currentPage: 1,
      curPageNo: 1,
      curPageSize: 10
    }
  },
  methods: {
    // 查看历史消息
    viewHistoryMsg(row) {
      console.log('row', row)
      this.$router.push({
        path: '/customerService/historyMsg',
        query: {
          id: '123'
        }
      })
      console.log('row', row)
    },
    // 删除客服
    delStaff(row) {
      console.log('del row', row)
      // 这里请求删除接口
      this.$message({
        message: '删除成功',
        type: 'success'
      })
    },
    // 单页条数选择
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.curPageSize = val
      this.$emit('size-change', {
        curPageNo: this.curPageNo,
        curPageSize: this.curPageSize
      })
    },
    // 页码改变
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.curPageNo = val
      this.$emit('pageno-change', {
        curPageNo: this.curPageNo,
        curPageSize: this.curPageSize
      })
    }
  }
}
</script>

<style>
.pagination {
  margin-top: 10px;
  text-align: right;
}
</style>
