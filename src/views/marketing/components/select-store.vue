<template>
  <div class="select-store">
    <el-table :data="cutData" size="small" show-overflow-tooltip style="width: 100%" max-height="500">
      <template v-for="col in cols">
        <el-table-column
          v-if="!col.render"
          :key="col.prop"
          :label="col.label"
          :show-overflow-tooltip="true"
          :prop="col.prop"
          :min-width="col.width"
        />
      </template>
      <el-table-column label="门店地址" :show-overflow-tooltip="true">
        <template
          slot-scope="scope"
        >{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}{{ scope.row.address }}</template>
      </el-table-column>
      <el-table-column label="操作" width="60">
        <template slot-scope="scope">
          <el-button type="text" :disabled="disabled" @click="handleDel(scope.row, scope.$index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <section class="c-footer">
      <el-pagination
        background
        :current-page="pager.current"
        :page-size="pager.size"
        :page-sizes="[10, 20, 30, 50]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </section>
  </div>
</template>
<script>
// import noData from '@/components/NoData'
export default {
  // components: { noData },
  props: {
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tableData: [],
      cutData: [],
      cols: [
        {
          prop: 'stCode',
          label: '门店编码'
        },
        {
          prop: 'stName',
          label: '门店名称'
        }
      ],
      pager: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    dataFrom(data) {
      this.tableData = Array.isArray(data) ? data : []
      this.pager = {
        ...this.pager,
        total: this.tableData.length
      }
      this.handleCutData()
    },
    handleDel(item, index) {
      // this.tableData.splice(index, 1)
      this.$emit('del-item', item, index)
    },
    // 获取数据源
    handleCutData() {
      const { current, size } = this.pager
      console.log(
        '1111111111',
        this.pager,
        this.tableData.slice((current - 1) * size, size)
      )
      this.cutData = this.tableData.slice((current - 1) * size, size * current)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager = {
        ...this.pager,
        size: val,
        current: 1
      }
      this.handleCutData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager = {
        ...this.pager,
        current: val
      }
      this.handleCutData()
    }
  }
}
</script>
<style lang="scss">
.select-store {
  .c-footer {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
