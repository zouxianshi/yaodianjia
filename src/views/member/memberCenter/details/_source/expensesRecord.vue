<template>
  <div style="position:relative;width: 96%;margin: 20px auto 0;">
    <div class="expenses-record-model">
      <div class="list-owner">
        会员：张三
      </div>
      <div class="list-body">
        <el-table
          :data="tableData"
          border
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
    </div>
    <div class="return-btn"><el-button size="mini">返回列表</el-button></div>
  </div>
</template>
<script>
export default {
  name: 'ExpensesRecord',
  components: {},
  props: {},
  data() {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .expenses-record-model {
    background-color: #fff;height: calc(100vh - 300px);border-radius: 6px;
    .list-owner{
      text-align: right;height: 40px;line-height: 40px;padding: 0 32px;
    }
    .list-body{
      width: 96%;margin: 0 auto;
    }
  }
  .return-btn{
    position: fixed;z-index: 2000;bottom: 35px;transform: translateX(50px);
  }
</style>
