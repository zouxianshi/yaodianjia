<template>
  <div class="list">
    <div class="nav-condition">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item style="display:block">
          <el-radio-group v-model="searchParams.ctype" style="vertical-algin:middle;height:29px" size="small" @change="changeType">
            <el-radio-button :label="0">全部</el-radio-button>
            <el-radio-button :label="1">折扣券</el-radio-button>
            <el-radio-button :label="2">满减券</el-radio-button>
            <el-radio-button :label="3">礼品券</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="优惠券信息" style="margin-left:10px">
          <el-input v-model="searchParams.cname" style="width:160px" placeholder="请输入优惠券id/关键词" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
          <el-button type="primary" size="mini" @click="addData()">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-tabel">
      <el-table
        v-loading="loading"
        :data="tableData"
        height="calc(100vh - 360px)"
        style="width: 100%;"
        empty-text="您暂未创建任何优惠券"
      >
        <el-table-column label="优惠券信息">
          <template slot-scope="scope">
            <p>{{ scope.row.cname }}
              <el-tag v-if="scope.row.ctype === 1" size="mini" style="color:#fff" color="#52c41a">折</el-tag>
              <el-tag v-if="scope.row.ctype === 2" size="mini" style="color:#fff" color="#f5222d">满</el-tag>
              <el-tag v-if="scope.row.ctype === 3" size="mini" style="color:#fff" color="#faad14">礼</el-tag>
            </p>
            <p>ID：{{ scope.row.id }}</p>
          </template>
        </el-table-column>
        <el-table-column label="使用场景">
          <template slot-scope="scope">
            {{ scope.row.sceneRule === 1? '仅商城' : scope.row.sceneRule === 2? '仅门店' : '线上线下通用' }}
          </template>
        </el-table-column>
        <el-table-column prop="denomination" label="优惠内容">
          <template slot-scope="scope">
            <span v-if="scope.row.ctype === 1"><span v-if="scope.row.useRule">满{{ scope.row.useRule }}元</span>{{ scope.row.denomination }}折</span>
            <span v-if="scope.row.ctype === 2"><span v-if="scope.row.useRule">满{{ scope.row.useRule }}元</span>减{{ scope.row.denomination }}元</span>
            <span v-if="scope.row.ctype === 3">{{ scope.row.giftName }}</span>
          </template>
        </el-table-column>
        <el-table-column label="使用时间" width="180">
          <template slot-scope="scope">
            <span v-if="scope.row.timeRule === 1">领取后{{ scope.row.effectTime }}天内</span>
            <span v-if="scope.row.timeRule === 2">领取{{ scope.row.effectTime.split(',')[0] }}天后{{ scope.row.effectTime.split(',')[1] }}天内</span>
            <span v-if="scope.row.timeRule === 3">{{ scope.row.effectTime.split(',')[0] }} <br>到<br> {{ scope.row.effectTime.split(',')[1] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="适用门店" width="110">
          <template slot-scope="scope">
            {{ scope.row.shopRule === 1? '全部门店' : scope.row.shopRule === 2? '部分门店' : '部分门店' }}
          </template>
        </el-table-column>
        <el-table-column label="适用商品" width="110">
          <template slot-scope="scope">
            {{ scope.row.productRule === 1? '全部商品' : scope.row.productRule === 2? '部分商品可用' : '部分商品不可用' }}
          </template>
        </el-table-column>
        <el-table-column prop="totalCount" label="已领取量" width="110" />
        <el-table-column prop="onlineCount" label="线上核销" width="110" />
        <el-table-column prop="offlineCount" label="线下核销" width="110" />
        <el-table-column label="操作" width="120" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="_edit(scope.row)">编辑</el-button>
            <!-- <el-button type="text" size="mini" @click="deleteCoupons(scope.row.id)">删除</el-button> -->
          </template>
        </el-table-column>
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
    </div>
  </div>
</template>
<script>
import { getCouponList, deleteCoupon } from '@/api/coupon'
export default {
  data() {
    return {
      loading: false,
      searchParams: {
        cname: '',
        ctype: 0,
        busType: 0
      },
      totalCount: 0,
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      tableData: []
    }
  },
  created() {
    this.searchParams.ctype = this.$route.query.id || 0
    this.searchData()
  },
  methods: {
    addData() {
      if (Number(this.searchParams.ctype) === 1) {
        this.$router.push('/marketings/gift-manage/discount')
      } else if (Number(this.searchParams.ctype) === 2) {
        this.$router.push('/marketings/gift-manage/full-reduction')
      } else if (Number(this.searchParams.ctype) === 3) {
        this.$router.push('/marketings/gift-manage/gift')
      } else {
        this.$router.push('/marketing/gifts?type=coupons')
      }
    },
    searchData() {
      this.loading = true
      var searchParams = Object.assign({}, this.searchParams, this.pageInfo)
      getCouponList(searchParams).then(res => {
        console.log(res)
        if (res.data && res.data.records) {
          this.totalCount = res.data.total
          this.tableData = res.data.records
          this.loading = false
        }
      })
    },
    // 切换类型
    changeType(e) {
      this.searchData()
    },
    handleSizeChange(e) {
      this.pageInfo.pageSize = e
      this.searchData()
    },
    handleCurrentChange(e) {
      this.pageInfo.currentPage = e
      this.searchData()
    },
    // 编辑优惠券
    _edit(data) {
      if (data.ctype === 1) { // 折扣券
        this.$router.push('/marketings/gift-manage/discount?id=' + data.id)
      } else if (data.ctype === 2) { // 满减券
        this.$router.push('/marketings/gift-manage/full-reduction?id=' + data.id)
      } else {
        this.$router.push('/marketings/gift-manage/gift?id=' + data.id)
      }
    },
    // 删除优惠券
    deleteCoupons(ids) {
      deleteCoupon({ id: ids }).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '删除成功！',
            type: 'success'
          })
          this.searchData()
        } else {
          this.$message({
            message: '删除失败！',
            type: 'error'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.list{
  // height: calc(100vh - 325px);overflow: auto;
  .el-table thead th{
    height: 40px;
  }
}
.list-tabel{
  height: calc(100vh - 395);position:relative;padding-bottom:42px;
  .el-pagination{
    position: absolute;bottom: 0;right: 0;width: 100%;text-align: right;background-color: #fff;
  }
}
</style>
