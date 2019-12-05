<template>
  <div class="msg-table-comp">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="date" label="序号" width="180" />
      <el-table-column prop="name" label="在线状态" width="180" />
      <el-table-column prop="address" label="客服名称" />
      <el-table-column prop="actions" label="操作">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="viewHistoryMsg(scope.row)">查看消息记录</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'CharactorTable',
  props: {
    tableData: {
      type: Array,
      default: null
    }
  },
  methods: {
    viewHistoryMsg(row) {
      console.log('row', row)
    }
  }
}
</script>

<style>
</style>
