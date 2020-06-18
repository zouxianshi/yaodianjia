<template>
  <div class="newcommer-modal app-container">
    <div class="nav-tool">
      <el-button type="primary" :disabled="tableData.length>=3" @click="$router.push('/activity/newcomer-create')">新增新人礼包活动</el-button>
    </div>
    <el-table v-loading="loading" height="calc(100vh - 300px)" :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="活动编号" width="180" />
      <el-table-column prop="beginTime" label="活动开始时间" />
      <el-table-column prop="endTime" label="活动结束时间" />
      <el-table-column label="时间状态" min-width="100" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state===1" size="small" type="success">进行中</el-tag>
          <el-tag v-if="scope.row.state===2" size="small" type="info">未开始</el-tag>
          <el-tag v-if="scope.row.state===3" size="small" type="danger">已结束</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="活动状态">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status===1" size="small">已生效</el-tag>
          <el-tag v-else size="small" type="info">已失效</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-button size="mini" @click="toDetail(scope.row, 'ck')">查看</el-button>
          <el-button v-if="scope.row.state===2" size="mini" @click="toDetail(scope.row, 'ed')">编辑</el-button>
          <el-button v-if="scope.row.status===1" size="mini" @click="setActivity(scope.row, 2)">失效</el-button>
          <el-button v-if="scope.row.status===0" size="mini" @click="setActivity(scope.row, 1)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagegrid">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="contTotal"
      />
    </div>
  </div>
</template>
<script>
import { normalActivityList, setNormalActivity } from '@/api/coupon'
export default {
  data() {
    return {
      tableData: [],
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        activityTemplateCode: 'TC005'
      },
      loading: false, // 列表加载中
      contTotal: 0
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查询活动列表
    getList() {
      const params = this.pageInfo
      this.loading = true
      normalActivityList(params).then(res => {
        this.loading = false
        if (res.code === '10000' && res.data) {
          this.tableData = res.data.records
          this.contTotal = res.data.total
        }
      }).catch(() => {
        this.loading = false
      })
    },
    // 失效或删除活动
    setActivity(rows, state = 2) {
      const params = {
        id: rows.id,
        state: state
      }
      const str = state === 1 ? '删除' : '失效'
      this.$confirm(`是否${str}此活动？`, '确认提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        setNormalActivity(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              type: 'success',
              message: res.msg
            })
          }
          this.getList()
        })
      }).catch(() => {
        this.$message('取消操作！')
      })
    },
    // 查看或编辑活动
    toDetail(rows, type) {
      this.$router.push(`/activity/newcomer-create?id=${rows.id}&type=${type}`)
    }
  }
}
</script>
<style lang="scss">
.newcommer-modal{
  .nav-tool{
    margin-bottom: 20px;
  }
  .pagegrid{
    margin-top: 10px;text-align: right;
  }
}
</style>
