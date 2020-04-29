<template>
  <el-table :data="tableData" size="small" show-overflow-tooltip style="width: 100%">
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
    <!-- <el-table-column label="每人限领" width="100">
      <template slot-scope="scope">
        <span size="small" type="info">{{ scope.row.limitCount===0?'不限次数':scope.row.limitCount }}</span>
      </template>
    </el-table-column>-->
    <el-table-column label="操作" width="60">
      <template slot-scope="scope">
        <el-button type="text" :disabled="disabled" @click="handleDel(scope.row, scope.$index)">删除</el-button>
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    dataFrom(data) {
      this.tableData = Array.isArray(data) ? data : []
    },
    handleDel(item, index) {
      // this.tableData.splice(index, 1)
      this.$emit('del-item', item, index, this.giftIndex)
    }
  }
}
</script>
