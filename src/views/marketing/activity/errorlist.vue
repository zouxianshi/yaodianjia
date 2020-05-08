<template>
  <div class="app-container">
    <el-alert
      title="系统已为您成功创建活动，但您当前设置的活动中存在部分商品与其他活动冲突，或商品在部分门店已下架导致无法全部创建成功，请下载列表查看详情，并前往已创建的活动中查看最终创建结果。"
      type="warning"
      :closable="false"
    />
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
          <el-table-column
            v-else-if="col.prop==='schedule'"
            :key="col.prop"
            :label="col.label"
            :prop="col.prop"
          >
            <template slot-scope="scope">
              <el-tag v-if="scope.row.schedule===0" size="small" type="info">未开始</el-tag>
              <el-tag v-else-if="scope.row.schedule===1" size="small" type="success">进行中</el-tag>
              <el-tag v-else size="small" type="danger">已结束</el-tag>
            </template>
          </el-table-column>
        </template>
        <el-table-column label="下载" width="100">
          <template slot-scope="scope">
            <a
              v-if="!!scope.row.filePath && scope.row.status === 3"
              style="padding: 9px 15px;font-size: 12px;border-radius: 3px;background-color: #147de8;color: #fff"
              :href="configOrderOss(scope.row.filePath)"
              download
            >下载明细</a>
          </template>
        </el-table-column>
        <div slot="empty"><no-data /></div>
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
          label: '失败原因',
          width: '150'
        },
        {
          prop: 'activityType',
          label: '失败详情',
          width: '80'
        },
        {
          prop: 'storeNum',
          label: '门店数'
        },
        {
          prop: 'name',
          label: '商品数'
        },
        {
          prop: 'startTime',
          label: '活动开始时间',
          width: '120',
          align: 'center'
        },
        {
          prop: 'endTime',
          label: '活动结束时间',
          width: '120',
          align: 'center'
        }
      ],
      pager: {
        current: 1,
        total: 0,
        size: 20
      },
      listLoading: false
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
