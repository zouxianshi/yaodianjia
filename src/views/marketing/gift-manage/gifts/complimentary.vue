<template>
  <div class="app-container">
    <a href="#/marketing/gifts/complimentary-create">
      <el-button class="btn btn-add" type="primary" size="small">新建赠品</el-button>
    </a>
    <section style="margin-top: 10px">
      <el-form :inline="true" size="small" :model="form" class="demo-form-inline">
        <el-form-item label="赠品名称">
          <el-input v-model="form.user" placeholder="赠品名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="table-box webkit-scroll" style="height: calc(100% - 180px);overflow: auto">
      <el-table :data="tableData" style="width: 100%; height: 100%">
        <template v-for="col in cols">
          <el-table-column
            v-if="!col.render"
            :key="col.prop"
            :formatter="formatter"
            :label="col.label"
            :show-overflow-tooltip="true"
            :prop="col.prop"
            :min-width="col.width"
          />
        </template>
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
import { getConflict } from '@/api/activity'
import noData from '@/components/NoData'
export default {
  components: {
    noData
  },
  data() {
    return {
      tableData: [],
      cols: [
        {
          prop: 'id',
          label: '赠品名称',
          width: '150'
        },
        {
          prop: 'activityType',
          label: '已发放',
          width: '80'
        },
        {
          prop: 'storeNum',
          label: '剩余库存'
        },
        {
          prop: 'name',
          label: '每人限领'
        }
      ],
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
      // const params = {
      //   currentPage: this.pager.current,
      //   pageSize: this.pager.size
      // }
      getConflict()
        .then(res => {
          this.tableData = []
          this.listLoading = false
        })
        .catch(e => {
          this.listLoading = false
        })
    },
    onSubmit() {

    }
  }
}
</script>

<style lang="scss">
.info-content {
  line-height: 30px;
  font-size: 14px;
}
</style>
