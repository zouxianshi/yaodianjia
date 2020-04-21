<template>
  <div class="list">
    <div class="nav-condition">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="优惠券名称" style="margin-left:10px">
          <el-input v-model="searchParams.cname" style="width:150px" placeholder="请输入关键词" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="searchParams.ctype" style="vertical-algin:middle;height:29px" size="mini" @change="changeType">
            <el-radio-button :label="0">全部</el-radio-button>
            <el-radio-button :label="1">折扣券</el-radio-button>
            <el-radio-button :label="2">满减券</el-radio-button>
            <el-radio-button :label="3">礼品券</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-tabel">
      <el-table
        :data="tableData"
        height="calc(100vh - 390px)"
        style="width: 100%;"
        empty-text="您暂未创建任何优惠券"
      >
        <el-table-column prop="cname" label="优惠券信息" />
        <el-table-column label="使用场景">
          <template slot-scope="scope">
            {{ scope.row.sceneRule === 1? '仅商城' : scope.row.sceneRule === 2? '仅线下' : '线上线下通用' }}
          </template>
        </el-table-column>
        <el-table-column prop="denomination" label="优惠内容" />
        <el-table-column label="使用时间" width="200">
          <template slot-scope="scope">
            {{ scope.row.effectTime.replace(',', ' - ') }}
          </template>
        </el-table-column>
        <el-table-column label="适用门店">
          <template slot-scope="scope">
            {{ scope.row.shopRule === 1? '全部门店' : scope.row.shopRule === 2? '部分门店可用' : '部分门店不可用' }}
          </template>
        </el-table-column>
        <el-table-column label="适用商品">
          <template slot-scope="scope">
            {{ scope.row.productRule === 1? '全部商品' : scope.row.productRule === 2? '部分商品可用' : '部分商品不可用' }}
          </template>
        </el-table-column>
        <el-table-column prop="totalCount" label="已领取量" />
        <el-table-column prop="onlineCount" label="线上核销" />
        <el-table-column prop="offlineCount" label="线下核销" />
        <el-table-column label="操作" width="80" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="_edit(scope.row)">编辑</el-button>
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
import { getCouponList } from '@/api/coupon'
export default {
  data() {
    return {
      searchParams: {
        cname: '',
        ctype: 0
      },
      totalCount: 0,
      pageInfo: {
        currentPage: 0,
        pageSize: 10
      },
      tableData: []
    }
  },
  created() {
    this.searchData()
  },
  methods: {
    searchData() {
      var searchParams = Object.assign({}, this.searchParams, this.pageInfo)
      console.log(searchParams)
      getCouponList(searchParams).then(res => {
        console.log(res)
        if (res.data && res.data.records) {
          this.totalCount = res.data.total
          this.tableData = res.data.records
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
      console.log(data)
    }
  }
}
</script>
<style lang="scss">
.list{
  height: calc(100vh - 325px);overflow: auto;
  .el-table thead th{
    height: 40px;
  }
}
.list-tabel{
  height: calc(100vh - 400px);position:relative;padding-bottom:42px;
  .el-pagination{
    position: absolute;bottom: 0;right: 0;width: 100%;text-align: right;
  }
}
</style>
