<template>
  <div class="msg-table-comp">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="序号" width="180" />
      <el-table-column prop="name" label="消息类型" width="180" />
      <el-table-column prop="address" label="快捷消息" />
      <el-table-column prop="actions" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'MsgTable',
  props: {
    tableData: {
      type: Array,
      default: null
    }
  },
  data() {
    return {}
  },
  methods: {
    handleDel(rowData) {
      console.log('rowData', rowData)
    }
  }
}
</script>

<style>
</style>
