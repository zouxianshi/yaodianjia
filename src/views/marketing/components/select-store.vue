<template>
  <div class="select-store">
    <el-form v-if="Array.isArray(tableData) && tableData.length" :inline="true" :model="formInline" class="form-inline">
      <el-form-item label="门店名称">
        <el-input v-model="formInline.name" size="mini" clearable placeholder="门店编码/门店名称" />
      </el-form-item>
      <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
      <el-form-item><div style="color: rgb(191, 191, 191)">(说明：该查询仅支持下列列表的数据查询)</div></el-form-item>
    </el-form>
    <el-table
      :data="cutData"
      show-overflow-tooltip
      style="width: 100%"
      max-height="500"
    >
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
      },
      formInline: {
        name: ''
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
      const { name } = this.formInline
      if (name) {
        this.cutData = this.tableData.filter(
          data =>
            data.stName
              .toLowerCase()
              .includes(this.formInline.name.toLowerCase()) ||
            data.stCode
              .toLowerCase()
              .includes(this.formInline.name.toLowerCase())
        )
        this.pager.total = this.cutData.length || 0
      } else {
        this.cutData = this.tableData.slice((current - 1) * size, size * current)
        this.pager.total = this.tableData.length || 0
      }
      // console.log(
      //   '1111111111',
      //   this.pager,
      //   this.tableData.slice((current - 1) * size, size)
      // )
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
    },
    onSubmit() {
      console.log('submit!')
      this.pager = {
        ...this.pager,
        current: 1
        // total: this.cutData.length
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
  .form-inline {
    margin-bottom: 20px;
  }
}
</style>
