<template>
  <div class="voucher-list-modal app-container">
    <el-table :data="tableData" height="calc(100vh - 300px)">
      <el-table-column prop="remark" label="编码" />
      <el-table-column prop="sendNum" label="发放人数" />
      <el-table-column prop="couponNum" label="优惠券数量" />
      <el-table-column prop="createTime" label="发放时间" />
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          {{ scope.row.status === 1 ? '发放中' : '发放完成' }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="detail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-button
        type="text"
        style="float:left"
        @click="$router.push('/activity/member-voucher')"
      >+ 发放优惠券</el-button>
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
import { couponHistoryList } from '@/api/birthday'
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    detail(rows) {
      sessionStorage.setItem('conditionJson', rows.conditionJson)
      this.$router.push('/activity/member-voucher-detail?id=' + rows.id)
    },
    handleSizeChange(e) {
      this.pageInfo.currentPage = 1
      this.pageInfo.pageSize = e
      this.getData()
    },
    handleCurrentChange(e) {
      this.pageInfo.currentPage = e
      this.getData()
    },
    getData() {
      const params = Object.assign({}, this.pageInfo)
      couponHistoryList(params).then(res => {
        if (res.code === '10000' && res.data) {
          this.tableData = res.data.records
          this.totalCount = res.data.total
          console.log(this.totalCount)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.voucher-list-modal {
  .pages {
    text-align: right;
    margin-top: 20px;
  }
}
</style>
