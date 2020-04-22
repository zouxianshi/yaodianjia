<template>
  <div class="select-product-modal">
    <el-dialog
      :visible.sync="dialogTableVisible"
      :append-to-body="true"
    >
      <span slot="title">选择商品</span>
      <div class="nav-bar">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <!-- <el-form-item label="商品分组">
            <el-select v-model="searchParams.groupId" placeholder="请选择" size="mini" style="width:120px">
              <el-option label="全部" value="1" />
              <el-option label="未开始" value="2" />
            </el-select>
          </el-form-item> -->
          <!-- <el-form-item label="商品品牌" style="margin-left:10px;">
            <el-input v-model="searchParams.brand" placeholder="门店编码/门店名称" size="mini" style="width:120px" />
          </el-form-item> -->
          <el-form-item label="商品信息" style="margin-left:10px">
            <el-input v-model="searchParams.erpOrName" placeholder="门店编码/门店名称" size="mini" style="width:120px" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="dataTable"
        :data="gridData"
        height="300px"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectAuto"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="num" label="商品图片">
          <template slot-scope="scope">
            <img class="goods-logo" :src="showImg(scope.row.mainPic)" :preview-src-list="[showImg(scope.row.mainPic)]">
          </template>
        </el-table-column>
        <el-table-column property="erpCode" label="商品编码" />
        <el-table-column property="name" label="商品名称" />
        <el-table-column property="brandName" label="品牌" />
        <el-table-column property="packStandard" label="规格" />
        <el-table-column property="mprice" label="参考价" />
      </el-table>
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div class="has-selected">
        已选商品：
        <span v-for="(item ,index) in selectedArr" :key="index">
          <el-tag style="margin-right:10px" type="success">{{ item.name }}</el-tag>
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
import { queryGoods } from '@/api/common'
export default {
  data() {
    return {
      gridData: [],
      selectedArr: [], //  已选择商品所有信息
      hasSelectList: [], // 已选择商品id集合
      totalCount: 0,
      searchParams: {
        erpOrName: ''
        // brand: '',
        // groupId: null
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      dialogTableVisible: false
    }
  },
  methods: {
    show(product) {
      this.hasSelectList = []
      product.forEach(item => {
        this.hasSelectList.push(item.id)
      })
      this.queryGoodsData()
    },
    // 查询商品
    queryGoodsData() {
      var params = Object.assign({}, this.pageInfo, this.searchParams)
      queryGoods(params).then(res => {
        this.dialogTableVisible = true
        if (res.data && res.data.data) {
          this.gridData = res.data.data
          this.totalCount = res.data.totalCount
          this.$nextTick(() => {
            this.$refs.dataTable.clearSelection()
            this.gridData.forEach(row => {
              if (this.hasSelectList.indexOf(row.id) >= 0) {
                this.$refs.dataTable.toggleRowSelection(row, true)
              }
            })
          })
        }
      })
    },
    // 提交选中
    _submit() {
      this.dialogTableVisible = false
      this.$emit('onSelect', this.selectedArr)
    },
    searchData() {
      this.queryGoodsData()
    },
    // 分页
    handleSizeChange(e) {
      this.pageInfo.pageSize = e
      this.queryGoodsData()
    },
    handleCurrentChange(e) {
      this.pageInfo.currentPage = e
      this.queryGoodsData()
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
  .goods-logo{
    width: 55px;
    height: 55px;
  }
  padding-top: 10px;padding-bottom: 0;
  .el-pagination{
    text-align: right;margin-top: 15px;
  }
  .has-selected{
    margin-top: 10px;border-top: 2px solid #eee;padding: 20px 0 10px;line-height: 36px;
  }
  .el-table thead th{
    height: 40px;
  }
}
</style>
