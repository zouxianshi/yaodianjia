<template>
  <div class="voucher-list-modal app-container">
    <el-table :data="tableData" height="calc(100vh - 300px)">
      <el-table-column prop="date" label="活动编码" />
      <el-table-column prop="name" label="发放人数" />
      <el-table-column prop="name" label="优惠券数量" />
      <el-table-column prop="name" label="发放时间" />
      <el-table-column prop="name" label="状态" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row.id)">查看</el-button>
          <el-button type="text">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-button type="text" style="float:left" @click="$router.push('/activity/member-voucher')">+ 发放优惠券</el-button>
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="100"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    detail(ids) {
      console.log(ids)
    },
    handleSizeChange(e) {

    },
    handleCurrentChange(e) {

    }
  }
}
</script>
<style lang="scss">
.voucher-list-modal{
  .pages{
    text-align: right;margin-top: 20px;
  }
}
</style>
