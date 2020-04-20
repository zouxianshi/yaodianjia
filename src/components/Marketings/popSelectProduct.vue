<template>
  <div class="select-product-modal">
    <el-dialog
      :visible.sync="dialogTableVisible"
      :append-to-body="true"
    >
      <span slot="title">选择商品</span>
      <div class="nav-bar">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="商品分组">
            <el-select v-model="searchParams.group" placeholder="请选择" size="mini" style="width:120px">
              <el-option label="全部" value="0" />
              <el-option label="未开始" value="1" />
            </el-select>
          </el-form-item>
          <el-form-item label="商品品牌" style="margin-left:10px;">
            <el-input v-model="searchParams.brand" placeholder="门店编码/门店名称" size="mini" style="width:120px" />
          </el-form-item>
          <el-form-item label="商品信息" style="margin-left:10px">
            <el-input v-model="searchParams.info" placeholder="门店编码/门店名称" size="mini" style="width:120px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="dataTable"
        :data="gridData"
        height="200px"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectAuto"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="num" label="商品图片" />
        <el-table-column property="name" label="商品编码" />
        <el-table-column property="name" label="商品名称" />
        <el-table-column property="name" label="品牌" />
        <el-table-column property="name" label="规格" />
        <el-table-column property="name" label="参考价" />
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
        已选商品：
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
        num: '20001',
        name: '上海一店',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        num: '20001',
        name: '上海一店',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      selectedArr: [], //  已选择门店所有信息
      hasSelectList: [], // 已选择门店name集合（以后会修改为主键）
      searchParams: {
        info: '',
        brand: '',
        group: ''
      },
      pageInfo: {
        currentPage: 0,
        pageSize: 100
      },
      dialogTableVisible: false
    }
  },
  methods: {
    show(product) {
      this.hasSelectList = []
      product.forEach(item => {
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
    },
    // 全选
    selectAll(e) {
      this.selectedArr = e
    },
    // 预设选中（下面tag标签）
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
