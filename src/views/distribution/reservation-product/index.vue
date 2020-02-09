<template>
  <div class="content_pick">
    <div class="nav-btn">
      <el-button type="primary" size="mini" @click="toAdd()">添加预约商品</el-button>
      <el-button type="primary" size="mini" @click="removeProduct()">批量下架</el-button>
    </div>
    <div class="tabel-content">
      <el-table
        :data="productList"
        border
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="45"
          align="center"
        />
        <el-table-column
          label="商品图片"
          align="center"
          width="102"
        >
          <template slot-scope="scope" style="text-align:center">
            <img class="goods-logo" :src="showImg(scope.row.imgUrl)" alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品信息" />
        <el-table-column prop="brandName" label="品牌" />
        <el-table-column prop="unit" label="规格" />
        <el-table-column prop="price" width="110" sortable label="标准价格" />
        <el-table-column prop="inventory" label="可预约总量" />
        <el-table-column prop="verificationNum" label="核销数量" />
        <el-table-column prop="reserveNum" label="预约数量" />
        <el-table-column
          label="预约规则"
        >
          <template v-if="scope.row.daysPerMember != 0 || scope.row.countPerMember != 0" slot-scope="scope">
            每人{{ scope.row.daysPerMember }}天内限购{{ scope.row.countPerMember }}{{ scope.row.unit }}。
          </template>
          <template v-else>
            暂无预约规则。
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          width="160"
        >
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="updataProduct(scope.row.id)">编辑</el-button>
            <el-button type="primary" size="mini" @click="changeProductStatus(scope.row.id,scope.row.status)">
              {{ scope.row.status ==1 ? '下架':'上架' }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="changePageSize"
        @current-change="changeIndex"
      />
    </div>
  </div>
</template>

<script>
import distributionService from '@/api/distributionService'
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
      ],
      productList: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      batchIds: []
    }
  },
  created() {
    this.getProductList()
  },
  methods: {
    // 分页切换
    changePageSize(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.currentPage = 1
      this.getProductList()
    },
    changeIndex(index) {
      this.pageInfo.currentPage = index
      this.getProductList()
    },
    getProductList() {
      var params = {
      }
      params.currentPage = this.pageInfo.currentPage
      params.pageSize = this.pageInfo.pageSize
      distributionService.getProductList(params).then(res => {
        console.log(res)
        if (res.data) {
          var result = res.data
          this.pageInfo.total = result.totalCount
          this.productList = result.data
        }
      })
    },
    toAdd() {
      this.$router.push('/distribution/add-product')
    },
    updataProduct(id) {
      this.$router.push(`/distribution/updata-product?id=${id}`)
    },
    changeProductStatus(ids, status) { // 上下架
      var params = {
        'ids': [
          ids
        ],
        'status': status === 1 ? '0' : '1'
      }
      distributionService._batchProduct(params).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getProductList()
      })
    },
    // 多选切换
    handleSelectionChange(val) {
      this.batchIds = []
      this.batchIds = val.map(item => item.id)
    },
    // 批量下架
    removeProduct() {
      if (this.batchIds.length === 0) {
        this.$message({
          message: '请至少选择一项！',
          type: 'message'
        })
        return
      }
      var params = {
        'ids': this.batchIds,
        'status': '0'
      }
      distributionService._batchProduct(params).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.getProductList()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.content_pick{
  padding: 10px 21px;overflow: auto;height: calc(100vh - 158px);
  .nav-btn{
    text-align: right;height: 50px;line-height: 50px
  }
  .goods-logo{
    width: 81px;height: 81px;
  }
  .page-box{
    height: 40px;line-height: 40px;margin-top: 21px;text-align: right
  }
}
</style>
