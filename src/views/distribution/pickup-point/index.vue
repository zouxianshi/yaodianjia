<template>
  <div class="content_pick">
    <div class="nav-btn">
      <el-button type="primary" size="mini">添加提货门店</el-button>
    </div>
    <div class="tabel-content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="date" label="日期" />
        <el-table-column prop="name" label="姓名" />
        <el-table-column prop="address" label="地址" />
        <el-table-column
          label="操作"
          align="center"
        >
          <template>
            <el-button type="primary" size="small">编辑</el-button>
            <el-button type="primary" size="small">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.content_pick{
  padding: 10px 21px;
  .nav-btn{
    text-align: right;height: 40px;line-height: 40px
  }
  .page-box{
    height: 40px;line-height: 40px;margin-top: 21px;text-align: right
  }
}
</style>
