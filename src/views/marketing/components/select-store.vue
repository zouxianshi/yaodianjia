<template>
  <div>
    <el-table :data="tableData" size="small" show-overflow-tooltip style="width: 100%">
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
      cols: [
        {
          prop: 'stCode',
          label: '门店编码'
        },
        {
          prop: 'stName',
          label: '门店名称'
        }
      ]
    }
  },
  methods: {
    dataFrom(data) {
      this.tableData = Array.isArray(data) ? data : []
    },
    handleDel(item, index) {
      // this.tableData.splice(index, 1)
      this.$emit('del-item', item, index)
    }
  }
}
</script>
