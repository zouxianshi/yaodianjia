<template>
  <div class="win-record-modal app-container">
    <el-form :model="activeBase" label-width="100" style="position: relative">
      <el-form-item style="margin-bottom: 0;" label="活动类型：">
        {{ activeBase.activityTemplateCode === "TA003" ? '大转盘' : activeBase.activityTemplateCode === "TA004" ? '刮刮乐' : '' }}
      </el-form-item>
      <el-form-item style="margin-bottom: 0;" label="活动名称：">
        {{ activeBase.activityDetailName }}
      </el-form-item>
      <el-form-item style="margin-bottom: 0;" label="活动时间：">
        {{ formatDate(activeBase.beginTime) }} ~ {{ formatDate(activeBase.endTime) }}
      </el-form-item>
      <div class="exportRecord">
        <el-button type="primary" size="mini" style="margin-right: 24px" @click="exportTabel">批量导出</el-button>
        <exportRecordTabel />
        <!-- <span class="tips">提示：批量导出功能最多一次导出50000条数据</span> -->
      </div>
    </el-form>
    <el-table :data="tableData" height="calc(100vh - 400px)" style="width: 100%" :loading="loading">
      <el-table-column plabel="奖品类型">
        <template slot-scope="scope">
          {{ fomart(scope.row.prizeType) }}
        </template>
      </el-table-column>
      <el-table-column prop="prizeName" label="奖品名称" />
      <el-table-column prop="memberCardId" label="中奖人" min-width="140" />
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
import { queryWinningList, exportPrizeList } from '@/api/winning-use'
import { ActivityDetail } from '@/api/coupon'
import { formatDate } from '@/utils/timer'
import exportRecordTabel from './_source/exportRecord'
export default {
  components: {
    exportRecordTabel
  },
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
      this.pageInfo.currentPage = 1
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
    },
    // 导出记录
    exportTabel() {
      const params = Object.assign({}, this.pageInfo, this.searchParams)
      params.pageSize = 50000
      exportPrizeList(params).then(res => {
        this.$alert(
          '中奖记录正在导出中，稍后请点击【查看导出记录】下载导出文件',
          '中奖记录导出',
          {
            confirmButtonText: '好的',
            center: true,
            roundButton: true,
            confirmButtonClass: 'hydee_alert_btn'
          }
        )
      })
    }
  }
}
</script>
<style lang="scss">
.win-record-modal{
  .page-info{
    text-align: right;
    width: 100%;
  }
  .exportRecord{
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .tips{
    color: #aaa; font-size: 14px;
  }
}
</style>
