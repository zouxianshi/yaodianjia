<template>
  <div class="goods-box">
    <el-dialog title="收货地址" :visible.sync="dialogTableVisible" :append-to-body="true">
      <el-table :data="goodsTabel" v-loading="loading" height="calc(100vh - 400px)">
        <el-table-column property="id" label="编号" width="100"></el-table-column>
        <el-table-column property="commodityPic" label="图片">
          <template slot-scope="scope">
            <el-image :src="showImg(scope.row.commodityPic)" style="width: 80px; height: 80px"></el-image>
          </template>
        </el-table-column>
        <el-table-column property="name" label="名称"></el-table-column>
        <el-table-column property="specName" label="规格"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
import liveRequest from '@/api/live'
export default {
  data() {
    return {
      goodsTabel: [],
      loading: false,
      dialogTableVisible: false
    }
  },
  methods: {
    open(id) {
      this.getGoods(id)
      this.dialogTableVisible = true
    },
    // 获取直播商品数据
    getGoods(id) {
      this.loading= true
      const params = {
        liveId: id
      }
      liveRequest.getLivegoods(params).then(res => {
        this.loading = false
        this.goodsTabel = res.data
      })
    },
  }
}
</script>
<style lang="scss">
</style>
