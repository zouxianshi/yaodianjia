<template>
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
    <el-table-column label="操作" width="60">
      <template slot-scope="scope">
        <el-button type="text" @click="handleDel(scope.row, scope.$index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
// import noData from '@/components/NoData'
export default {
  // components: { noData },
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    giftIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // tableData: [],
      cols: [
        {
          prop: 'name',
          label: '赠品名称',
          width: '150'
        },
        {
          prop: 'leaveStock',
          label: '剩余库存'
        },
        {
          prop: 'limitCount',
          label: '每人限领'
        }
      ]
    }
  },
  methods: {
    dataFrom(data) {
      this.tableData = data
    },
    handleDel(item, index) {
      // this.tableData.splice(index, 1)
      this.$emit('del-item', item, index, this.giftIndex)
    }
  }
}
</script>
