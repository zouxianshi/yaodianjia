<template>
  <div class="select-store-modal">
    <el-dialog
      :visible.sync="dialogTableVisible"
      :append-to-body="true"
    >
      <span slot="title">选择门店</span>
      <div class="nav-bar">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="门店信息" style="margin-left:10px">
            <el-input v-model="searchParams.company" placeholder="门店编码/门店名称" size="mini" />
          </el-form-item>
          <el-form-item label="所属企业">
            <el-select v-model="searchParams.info" placeholder="请选择" size="mini">
              <el-option label="全部" value="0" />
              <el-option label="未开始" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="dataTable"
        :data="gridData"
        height="calc(100vh - 700px)"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectAuto"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="num" label="门店编码" width="150" />
        <el-table-column property="name" label="门店名称" />
        <el-table-column property="address" label="门店地址" />
      </el-table>
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div class="has-selected">
        已选门店：
        <span v-for="(item ,index) in selectedArr" :key="index">
          {{ item.name }}
        </span>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="_submit">确定</el-button>
        <el-button size="mini" @click="dialogTableVisible=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      gridData: [{
        num: '20000',
        name: '上海2店',
        address: '上海黄浦江'
      }, {
        num: '20001',
        name: '上海一店',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      selectedArr: [], //  已选择
      hasSelectList: [],
      searchParams: {
        info: '',
        company: ''
      },
      pageInfo: {
        currentPage: 0,
        pageSize: 100
      },
      dialogTableVisible: false
    }
  },
  methods: {
    show(store) {
      this.hasSelectList = []
      store.forEach(item => {
        this.hasSelectList.push(item.name)
      })
      this.dialogTableVisible = true
      this.$nextTick(() => {
        this.$refs.dataTable.clearSelection()
        this.gridData.forEach(row => {
          if (this.hasSelectList.indexOf(row.name) >= 0) {
            this.$refs.dataTable.toggleRowSelection(row, true)
          }
        })
      })
    },
    // 提交选中
    _submit() {
      this.dialogTableVisible = false
      this.$emit('onSelect', this.selectedArr)
    },
    searchData() {
      console.log(this.searchParams)
    },
    // 分页
    handleSizeChange(e) {
      console.log(e)
    },
    handleCurrentChange(e) {
      console.log(e)
    },
    // 单选
    select(e, rows) {
      this.selectedArr = e
      this.hasSelectList = []
      e.forEach(item => {
        this.hasSelectList.push(item.name)
      })
    },
    // 全选
    selectAll(e) {
      this.selectedArr = e
      this.hasSelectList = []
      e.forEach(item => {
        this.hasSelectList.push(item.name)
      })
    },
    // 预设选中
    selectAuto(e) {
      this.selectedArr = e
    }
  }
}
</script>
<style lang="scss">
.el-dialog__body{
  padding-top: 10px;padding-bottom: 0;
  .el-pagination{
    text-align: right;margin-top: 15px;
  }
  .has-selected{
    margin-top: 10px;border-top: 2px solid #eee;padding: 20px 0 10px;
  }
  .el-table thead th{
    height: 40px;
  }
}
</style>
