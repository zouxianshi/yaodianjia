<template>
  <div class="win-record-modal app-container">
    <el-form :model="activeBase" label-width="100">
      <el-form-item style="font-weight:bold" label="活动类型：" />
      <el-form-item style="font-weight:bold" label="活动名称：" />
      <el-form-item style="font-weight:bold" label="活动时间：" />
    </el-form>
    <el-table
      :data="tableData"
      style="width: 100%"
    >
      <el-table-column
        prop="date"
        label="日期"
        width="180"
      />
      <el-table-column
        prop="name"
        label="姓名"
        width="180"
      />
      <el-table-column
        prop="address"
        label="地址"
      />
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeBase: {

      },
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }]
    }
  }
}
</script>
