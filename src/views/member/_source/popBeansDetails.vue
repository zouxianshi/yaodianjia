<template>
  <div class="pop-beans-model">
    <el-dialog :visible.sync="dialogVisible" width="50%" :append-to-body="true" :before-close="closeDia">
      <div slot="title" class="dialog-title">健康豆明细</div>
      <div class="contents-body">
        <div class="nav-bar">
          <span>健康豆： 0</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              size="mini"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <el-table
          :data="tableData"
          :border="false"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="健康豆数量"
            width="100"
          />
          <el-table-column
            prop="name"
            label="来源"
            width="100"
          />
          <el-table-column
            prop="address"
            label="发生时间"
          />
          <el-table-column
            prop="address"
            label="备注"
          />
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }],
      value: '',
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
  methods: {
    closeDia(done) {
      done()
    },
    changeDia() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss" >
.dialog-title {
  font-size: 16px; font-weight:600;
}
.contents-body{
  margin: 10px auto;
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
  .nav-bar{
    margin-bottom: 10px;display: flex;justify-content: space-between;align-items: center;
  }
}
</style>
