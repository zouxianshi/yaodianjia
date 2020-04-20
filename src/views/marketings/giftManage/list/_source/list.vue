<template>
  <div class="list">
    <div class="nav-condition">
      <el-form :inline="true" :model="searchParams" class="demo-form-inline">
        <el-form-item label="优惠券状态">
          <el-select v-model="searchParams.status" style="width:100px" placeholder="请选择" size="mini">
            <el-option label="全部" value="0" />
            <el-option label="未开始" value="1" />
            <el-option label="进行中" value="2" />
            <el-option label="已结束" value="3" />
            <el-option label="已删除" value="4" />
          </el-select>
        </el-form-item>
        <el-form-item label="优惠券名称" style="margin-left:10px">
          <el-input v-model="searchParams.name" style="width:150px" placeholder="请输入关键词" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-radio-group v-model="searchParams.type" style="vertical-algin:middle;height:29px" size="mini" @change="changeType">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">折扣券</el-radio-button>
            <el-radio-button label="2">满减券</el-radio-button>
            <el-radio-button label="3">礼品券</el-radio-button>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="list-tabel">
      <el-table
        :data="tableData"
        height="calc(100vh - 390px)"
        style="width: 100%;"
      >
        <el-table-column prop="cname" label="优惠券信息" />
        <el-table-column prop="name" label="使用场景" />
        <el-table-column prop="name" label="优惠内容" />
        <el-table-column prop="date" label="使用时间" />
        <el-table-column prop="name" label="适用门店" />
        <el-table-column prop="address" label="适用商品" />
        <el-table-column prop="name" label="已领取量" />
        <el-table-column prop="name" label="线下核销" />
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
        :total="1000"
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
        status: '0',
        name: '',
        type: '0'
      },
      pageInfo: {
        currentPage: 0,
        pageSize: 10
      },
      tableData: []
    }
  },
  methods: {
    searchData() {
      var searchParams = Object.assign({}, this.searchParams, this.pageInfo)
      console.log(searchParams)
      getCouponList(searchParams).then(res => {
        console.log(res)
        if (res.data && res.data.records) {
          this.tableData = res.data.records
        }
      })
    },
    // 切换类型
    changeType(e) {
      this.searchData()
    },
    handleSizeChange(e) {
      console.log(e)
    },
    handleCurrentChange(e) {
      console.log(e)
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
  height: calc(100vh - 390px);position:relative;padding-bottom:42px;
  .el-pagination{
    position: absolute;bottom: 0;right: 0;width: 100%;text-align: right;
  }
}
</style>
