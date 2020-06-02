<template>
  <div class="win-record-modal app-container">
    <el-form :model="activeBase" label-width="100">
      <el-form-item style="margin-bottom: 0;" label="活动类型：">
        {{ activeBase.activityTemplateCode === "TA003" ? '大转盘' : activeBase.activityTemplateCode === "TA004" ? '刮刮乐' : '' }}
      </el-form-item>
      <el-form-item style="margin-bottom: 0;" label="活动名称：">
        {{ activeBase.activityDetailName }}
      </el-form-item>
      <el-form-item style="margin-bottom: 0;" label="活动时间：">
        {{ formatDate(activeBase.beginTime) }} ~ {{ formatDate(activeBase.endTime) }}
      </el-form-item>
    </el-form>
    <el-table :data="tableData" style="height:calc(100vh - 350px); width: 100%" :loading="loading">
      <el-table-column plabel="奖品类型">
        <template slot-scope="scope">
          {{ fomart(scope.row.prizeType) }}
        </template>
      </el-table-column>
      <el-table-column prop="prizeName" label="奖品名称" />
      <el-table-column prop="userId" label="中奖人" />
      <el-table-column prop="prizeTime" label="中奖时间" />
      <el-table-column prop="hxTime" label="核销时间" />
    </el-table>
    <div class="page-info">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
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
import { queryWinningList } from '@/api/winning-use'
import { ActivityDetail } from '@/api/coupon'
import { formatDate } from '@/utils/timer'
export default {
  data() {
    return {
      loading: false,
      activeBase: {
        beginTime: new Date(),
        endTime: new Date()
      },
      tableData: [],
      searchParams: {
        activityId: this.$route.query.acid | 0
      },
      pageInfo: {
        pageSize: 10,
        currentPage: 1
      },
      totalCount: 0
    }
  },
  created() {
    ActivityDetail({ id: Number(this.$route.query.acid) }).then(res => {
      if (res.data) {
        this.activeBase = res.data
      }
    })
    this.getList()
  },
  methods: {
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.getList()
    },
    getList() {
      const params = Object.assign({}, this.pageInfo, this.searchParams)
      params.activityId = Number(params.activityId)
      this.loading = true
      this.tableData = []
      queryWinningList(params).then(res => {
        this.loading = false
        if (res.data) {
          this.totalCount = res.data.totalCount
          this.tableData = res.data.data
        } else {
          this.tableData = []
        }
      })
    },
    fomart(val) {
      return val === 1 ? '实物' : val === 2 ? '优惠券' : '积分'
    },
    formatDate(val) {
      return formatDate(val)
    }
  }
}
</script>
<style lang="scss">
.win-record-modal{
  .page-info{
    text-align: right;
    margin-top: 10px;
    width: 100%;
  }
}
</style>
