<template>
  <div class="newcommer-modal app-container">
    <div class="nav-tool">
      <el-button type="primary" @click="$router.push('/activity/newcomer-create')">新增新人礼包活动</el-button>
    </div>
    <el-table
      height="calc(100vh - 300px)"
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="活动编号"
        width="180"
      />
      <el-table-column
        prop="name"
        label="活动开始时间"
      />
      <el-table-column prop="address" label="活动结束时间" />
      <el-table-column prop="address" label="时间状态" />
      <el-table-column prop="address" label="活动状态" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini">查看{{ scope.row.id }}</el-button>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini">失效 | 删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagegrid">
      <el-pagination
        :current-page="1"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
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
      ]
    }
  }
}
</script>
<style lang="scss">
.newcommer-modal{
  .nav-tool{
    margin-bottom: 20px;
  }
  .pagegrid{
    margin-top: 10px;text-align: right;
  }
}
</style>
