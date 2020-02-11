<template>
  <div class="content-box">
    <div class="nav-toolbox">
      <el-input
        v-model="form.storeName"
        style="width:30%;margin-right:20px"
        placeholder="请输入门店名称或编号搜索"
        prefix-icon="el-icon-search"
      />
      <el-input
        v-model="form.city"
        style="width:30%;margin-right:20px"
        placeholder="请输入城市"
      />
      <el-button type="primary" plain @click="getStoreInventory()">查询</el-button>
      <el-button type="primary" plain>清空</el-button>
    </div>
    <p class="search-tips">您可以通过门店名称或编号查询门店，也可以选择门店所在城市查询多个门店</p>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="store_name" label="门店名称" />
      <el-table-column prop="store_code" label="门店编号" width="180" />
      <el-table-column label="最大可预约量">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.inventory"
            value="scope.row.inventory"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
          <el-button class="caozuo" type="primary" size="mini" @click="setStoreInventory(scope.row)">确定</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
        @size-change="changePageSize"
        @current-change="changeIndex"
      />
    </div>
  </div>
</template>

<script>
import distributionService from '@/api/distributionService'
export default {
  data() {
    return {
      form: {
        'city': '',
        'storeName': ''
      },
      tableData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  created() {
    this.getStoreInventory()
  },
  methods: {
    // 保存门店库存
    setStoreInventory(data) {
      var parmes = {}
      parmes = {
        'inventory': data.inventory,
        'productId': data.product_id,
        'storeCode': data.store_code,
        'storeId': data.store_id,
        'storeName': data.store_name
      }
      if (data.id) {
        parmes.id = data.id
      }
      distributionService.setStoreInventory(parmes).then(res => {
        console.log(res)
      })
    },
    // 获取门店商品库存
    getStoreInventory() {
      var parmes = {
        'city': this.form.city,
        'currentPage': this.pageInfo.currentPage,
        'pageSize': this.pageInfo.pageSize,
        'storeName': this.form.storeName
      }
      distributionService.getStoreInventory(parmes).then(res => {
        this.pageInfo.total = res.data.totalCount
        this.tableData = res.data.data
      })
    },
    // 分页切换
    changePageSize(pageSize) {
      this.pageInfo.pageSize = pageSize
      this.pageInfo.currentPage = 1
      this.getStoreInventory()
    },
    changeIndex(index) {
      this.pageInfo.currentPage = index
      this.getStoreInventory()
    }
  }
}
</script>

<style lang="scss" scoped>
.content-box{
    padding: 10px 21px;overflow: auto;height: calc(100vh - 158px);
    .nav-toolbox{
        height: 60px;line-height: 60px;
    }
    .search-tips{
        height:35px;padding-left: 2%;
        background:rgba(255,241,218,1);
        font-size:12px;
        color:rgba(177,113,7,1);
        line-height:35px;margin-bottom: 15px;
    }
    .page-box{
        height: 40px;line-height: 40px;margin-top: 21px;text-align: right
    }
}
</style>
