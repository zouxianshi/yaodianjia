<template>
  <div class="subscription-box">
    <el-dialog title="相关订阅" :visible.sync="dialogTableVisible" :append-to-body="true">
      <el-table :data="tabelData" v-loading="loading">
        <el-table-column type="index" width="80">label="序号"></el-table-column>
        <el-table-column property="merName" label="商户名称"></el-table-column>
        <el-table-column property="totalOrderNum" label="下单量"></el-table-column>
        <el-table-column property="totalDealNum" label="成交量"></el-table-column>
        <el-table-column property="totalOrderAmount" label="成交金额（￥）"></el-table-column>
        <el-table-column property="totalBuyNum" label="购买人数"></el-table-column>
      </el-table>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogTableVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { subscriptionList } from '@/api/factory-live'
export default {
  data() {
    return {
      tabelData: [],
      loading: false,
      dialogTableVisible: false
    }
  },
  methods: {
    open(liveId) {
      this.gettabelData(liveId)
      this.dialogTableVisible = true
    },
    gettabelData(id) {
      const params = {
        id: id
      }
      this.loading = true
      subscriptionList(params).then(res => {
        this.loading = false
        console.log(res)
        // this.tabelData = res.data ? res.data : []
      })
    }
  }
}
</script>
<style lang="scss">
</style>
