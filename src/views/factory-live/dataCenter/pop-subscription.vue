<template>
  <div class="subscription-box">
    <el-dialog title="相关订阅" :visible.sync="dialogTableVisible" :append-to-body="true">
      <el-table v-loading="loading" :data="tabelData" height="400">
        <el-table-column type="index" width="80" />
        <el-table-column property="merName" label="商户名称" />
        <el-table-column property="totalOrderNum" label="下单量" />
        <el-table-column property="totalDealNum" label="成交量" />
        <el-table-column property="totalOrderAmount" label="成交金额（￥）" />
        <el-table-column property="totalBuyNum" label="购买人数" />
      </el-table>
      <div class="page-box">
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
      <div slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogTableVisible = false">关 闭</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { subscriptionList } from '@/api/factory-live'
export default {
  data() {
    return {
      liveId: null,
      tabelData: [],
      loading: false,
      dialogTableVisible: false,
      pageInfo: {
        pageSize: 10,
        currentPage: 1
      },
      totalCount: 0
    }
  },
  methods: {
    open(liveId) {
      this.liveId = liveId
      this.gettabelData(liveId)
      this.dialogTableVisible = true
    },
    gettabelData(id) {
      const params = {
        'currentPage': this.pageInfo.currentPage,
        'liveId': id,
        'pageSize': this.pageInfo.pageSize
      }
      this.loading = true
      subscriptionList(params).then(res => {
        this.loading = false
        console.log(res)
        this.tabelData = res.data.data ? res.data.data : []
        this.totalCount = res.data.totalCount
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.pageInfo.currentPage = 1
      this.gettabelData(this.liveId)
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.gettabelData(this.liveId)
    }
  }
}
</script>
<style lang="scss">
.subscription-box{
  .page-box{
    margin-top: 10px;
    text-align: right;
  }
}
</style>
