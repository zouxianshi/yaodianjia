<template>
  <div class>
    <div class="search-item">
      <el-tag type="warning">只保留最新的50条数据</el-tag>
      <el-button
        type="primary"
        size="small"
        style="float:right"
        @click="listQuery.currentPage=1;getList()"
      >刷 新</el-button>
    </div>
    <div class="table-box">
      <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
        <el-table-column prop="createTime" align="center" min-width="120" label="导入时间" />
        <el-table-column prop="modifyTime" align="center" min-width="120" label="完成时间">
          <template slot-scope="scope">
            <span v-if="scope.row.status===2">{{ scope.row.modifyTime }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" align="center" min-width="120" label="进度">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status===1" type="warning">进行中</el-tag>
            <el-tag v-if="scope.row.status===2" type="success">已完成</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="success" align="center" min-width="120" label="成功条数">
          <template slot-scope="scope">
            <span v-if="scope.row.status===2">{{ scope.row.success }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="error" align="center" min-width="120" label="失败条数">
          <template slot-scope="scope">
            <span v-if="scope.row.status===2">{{ scope.row.error }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="errorPath" align="center" min-width="120" label="下载导入结果">
          <template slot-scope="scope">
            <el-link
              v-if="scope.row.status===2"
              type="primary"
              :underline="false"
              :href="configOrderOss(scope.row.errorPath)"
            >下载导入结果</el-link>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
      </div>-->
    </div>
  </div>
</template>
<script>
// import download from '@hydee/download'
import mixins from '@/utils/mixin'
import { getImportRecode } from '@/api/depot'
import { mapGetters } from 'vuex'
export default {
  props: {
    type: {
      type: String,
      default: ''
    }
  },
  mixins: [mixins],
  data() {
    return {
      total: 50,
      listQuery: {
        currentPage: 1,
        pageSize: 50
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
      this.loading = true
      this.tableData = []
      this.listQuery.type = 'match'
      getImportRecode(this.listQuery)
        .then(res => {
          if (res.data) {
            this.tableData = res.data
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.product {
  color: #9999;
}
</style>
