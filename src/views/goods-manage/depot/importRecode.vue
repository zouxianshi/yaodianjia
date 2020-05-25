<template>
  <div class="app-container">
    <div class>
      <div class="search-item">
        <el-tag type="warning">只保留最新的50条数据</el-tag>
        <el-button type="primary" size="small" style="float:right" @click="listQuery.currentPage=1;getList()">刷 新</el-button>
      </div>
      <div class="table-box">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column prop="erpCode" align="left" min-width="120" label="导入时间" />
          <el-table-column prop="erpCode" align="left" min-width="120" label="完成时间" />
          <el-table-column prop="erpCode" align="left" min-width="120" label="进度" />
          <el-table-column prop="erpCode" align="left" min-width="120" label="成功条数" />
          <el-table-column prop="erpCode" align="left" min-width="120" label="失败条数" />
          <el-table-column prop="erpCode" align="left" min-width="120" label="下载导入结果">
            <template slot-scope="scope">
              <el-link type="primary" :href="batchEditUrl(scope.row)">下载导入结果</el-link>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import download from '@hydee/download'
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
// import { getImportList} from '@/api/depot'
import { mapGetters } from 'vuex'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      total: 0,
      listQuery: {
        currentPage: 1,
        pageSize: 20
      },
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      // this.loading = true
      // this.tableData = []
      // getImportList(this.listQuery)
      //   .then(res => {
      //     const { data, totalCount } = res.data
      //     if (data) {
      //       this.tableData = data
      //       this.total = totalCount
      //     }
      //     this.loading = false
      //   })
      //   .catch(() => {
      //     this.loading = false
      //   })
    },
    // 导出
    handleBatchExport() {
      // exportNotMatch(this.merCode)
      //   .then(res => {
      //     console.log('111111', res)
      //     download.blob(res, '未对码列表')
      //     this.$message({
      //       message: '数据导出成功',
      //       type: 'success'
      //     })
      //   })
      //   .catch(() => {})
    }
  }
}
</script>
<style lang="scss" scoped>
.product {
  color: #9999;
}
</style>
