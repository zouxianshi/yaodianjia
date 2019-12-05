<template>
  <div class="msg-settings-container">
    <div class="app-container">
      <div class="table-header">
        <el-button class="add-btn" type="primary" size="mini" @click="addBtnClick">添加快捷回复</el-button>
      </div>
      <msg-table :table-data="tableData" />
    </div>
  </div>
</template>

<script>
import msgTable from './components/msgTable'

// 固定的消息
const fixedTableData = [
  {
    date: 1,
    name: 'offline',
    address: '当前客服不在线，请稍候',
    isOpen: true
  },
  {
    date: 2,
    name: 'firstTime',
    address: '欢迎光临海典线上商场',
    isOpen: true
  }
]

export default {
  name: 'MsgSetting',
  components: {
    msgTable
  },
  data() {
    return {
      activeName: 'first',
      tableData: [
        ...fixedTableData,
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
  },
  methods: {
    addBtnClick() {
      this.tableData = [
        ...this.tableData,
        {
          date: 1,
          name: 'offline',
          address: '当前客服不在线，请稍候',
          isOpen: true
        }
      ]
      this.$message({
        type: 'success',
        message: '添加成功'
      })
    },
    handleClick(tab, event) {
      console.log('tab', tab, 'event', event)
    }
  }
}
</script>

<style scoped lang="scss">
	.table-header {
		.add-btn {
      margin-bottom: 10px;
			float: right;
		}
	}
</style>
