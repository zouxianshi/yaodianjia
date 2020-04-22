<template>
  <div class="app-container">
    <a href="#/marketing/gifts/complimentary-edit">
      <el-button class="btn btn-add" type="primary" size="small">新建赠品</el-button>
    </a>
    <section style="margin-top: 10px">
      <el-form :inline="true" size="small" :model="form" class="demo-form-inline">
        <el-form-item label="赠品名称">
          <el-input v-model="form.name" clearable placeholder="赠品名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_getTableData">查询</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="table-box webkit-scroll" style="overflow: auto">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%; height: 100%">
        <el-table-column label="赠品名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总库存" width="100">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.stock?scope.row.stock:0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已发放" width="100">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.provideNum?scope.row.provideNum:0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余库存" width="100">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.leaveStock }}</span>
          </template>
        </el-table-column>
        <el-table-column label="每人限领" width="100">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.limitCount===0?'不限购':scope.row.limitCount }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button disabled type="text" @click="toLook(scope.row)">查看</el-button>
            <el-divider direction="vertical" />
            <el-button disabled type="text" @click="toEdit(scope.row)">增加库存</el-button>
            <el-divider direction="vertical" />
            <el-button disabled type="text" @click="toEdit(scope.row)">清空库存</el-button>
          </template>
        </el-table-column>
        <div slot="empty">
          <no-data />
        </div>
      </el-table>
    </section>
    <section class="c-footer">
      <el-pagination
        background
        :current-page="pager.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pager.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>

<script>
import { getActGiftList } from '@/api/activity'
import noData from '@/components/NoData'
export default {
  components: {
    noData
  },
  data() {
    return {
      tableData: [],
      pager: {
        current: 1,
        total: 0,
        size: 20
      },
      listLoading: false,
      form: {}
    }
  },
  created() {
    console.log('this.$route.params.id', this.$route.params.id)
    this.fetchData()
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this.updatePager({
        current: val
      })
      this._getTableData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.updatePager({
        size: val || 20
      })
      this._getTableData()
    },
    formatter(row, column, cellValue) {
      if (column.property === 'activityType') {
        return '满减满赠'
      } else {
        return cellValue
      }
    },
    fetchData() {
      this._getTableData()
    },
    // 获取列表数据
    _getTableData() {
      this.listLoading = true
      const params = {
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        name: this.form.name
      }
      getActGiftList(params)
        .then(res => {
          const { data } = res
          this.tableData = Array.isArray(data.data) ? data.data : []
          this.pager.current = data.currentPage
          this.pager.size = data.pageSize
          this.pager.total = data.totalCount
          this.listLoading = false
        })
        .catch(e => {
          this.listLoading = false
        })
    },
    toLook(row) {
      this.$router.push(
        `/marketing/gifts/complimentary-edit?id=${row.id}&_ck=1`
      )
    },
    toEdit(row) {
      this.$router.push(`/marketing/gifts/complimentary-edit?id=${row.id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.info-content {
  line-height: 30px;
  font-size: 14px;
}
.app-container {
  .el-table thead th {
    text-align: left;
  }
}
</style>
