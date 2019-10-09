<template>
  <div class="app-container">
    <div class="search-form">
      <div class="search-item">
        <el-button type="primary" size="small" icon="el-icon-plus" @click="goPage('')">新建角色</el-button>
      </div>
    </div>
    <el-table
      v-loading="loading"
      :data="tableData"
      stripe
      style="width: 100%"
    >
      <el-table-column
        prop="roleName"
        align="left"
        show-overflow-tooltip
        label="角色名称"
      />
      <el-table-column
        prop="modifyTime"
        align="left"
        label="更新时间"
      />
      <el-table-column
        fixed="right"
        align="left"
        label="操作"
      >
        <template slot-scope="scope">
          <template v-if="scope.row.admin!==1&&scope.row.roleType!==3">
            <el-button type="" size="mini" @click="goPage(scope.row.id)">编辑</el-button>
            <!-- <el-button v-permission="$route.meta.delete" type="danger" size="mini" @click="handleDelete(scope.row)">删除</el-button> -->
          </template>
        </template>
      </el-table-column>
    </el-table>
    <!-- <pagination :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" /> -->
  </div>
</template>
<script>
// import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import { getRoles, deleteRole } from '@/api/role'
export default {
  // components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      keyword: '',
      total: 0,
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getRoles({
        currentPage: this.listQuery.page,
        pageSize: this.listQuery.limit,
        code: this.listQuery.code
      }).then(res => {
        this.loading = false
        this.tableData = res.data.data
        // this.total = res.data.totalCount
      })
    },
    handleDelete(row) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteRole(row.id).then(res => {
          this.$message({
            message: res.msg,
            type: 'success'
          })
          this.getList()
        })
      }).catch(() => {})
    },
    goPage(id) {
      this.$router.push({ path: '/author/role-edit', query: { id: id }})
    }
  }
}
</script>
<style lang="scss">
.app-container{
  margin-bottom: 30px;
}
</style>
