<template>
  <div style="position:relative;width: 96%;margin: 20px auto 0;">
    <el-card class="box-card" :body-style="{padding:'0px'}">
      <div class="expenses-record-model">
        <div class="list-owner">
          会员：{{ user }}
        </div>
        <div class="list-body">
          <el-table :data="tableData" border style="width: 100%">
            <el-table-column prop="payTime" label="消费时间" width="170" />
            <el-table-column prop="detailList" label="商品清单">
              <template slot-scope="scope">
                <p v-for="(item, index) in scope.row.detailList" :key="index">
                  {{ item.commodityName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="detailList" label="单价">
              <template slot-scope="scope">
                <p v-for="(item, index) in scope.row.detailList" :key="index">
                  ￥{{ item.commodityPrice }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="totalGoodsNumber" label="数量" width="80" />
            <el-table-column label="消费类型">
              <template>
                线上消费
              </template>
            </el-table-column>
            <el-table-column prop="storeName" label="消费渠道/门店" />
            <el-table-column prop="totalActualOrderAmount" label="消费金额" />
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :current-page="pageInfo.currentPage"
            :page-size="pageInfo.pageSize"
            :total="pageInfo.totalCon"
            @current-change="pageChange"
          />
        </div>
      </div>
    </el-card>
    <div class="return-btn"><el-button size="mini">返回列表</el-button></div>
  </div>
</template>
<script>
import { queryOrderInfo } from '@/api/memberService'
export default {
  name: 'ExpensesRecord',
  data() {
    return {
      tableData: [],
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        totalCon: 0
      }
    }
  },
  computed: {
    user() {
      return sessionStorage.getItem('mem_username')
    }
  },
  created() {
    this.queryOrder()
  },
  methods: {
    queryOrder() {
      var params = {
        'currentPage': this.pageInfo.currentPage,
        'memberId': this.$route.query.userId,
        'pageSize': this.pageInfo.pageSize
      }
      queryOrderInfo(params).then(res => {
        this.tableData = res.data.data
      })
    },
    pageChange(e) {
      this.pageInfo.currentPage = e
      this.queryOrder()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" >
  .expenses-record-model {
    background-color: #fff;height: calc(100vh - 300px);border-radius: 6px;
    position: relative;padding-bottom: 42px;
    .box-card {
      margin-bottom: 20px;
    }
    .list-owner{
      text-align: right;height: 40px;line-height: 40px;margin-right: 2%;
    }
    .list-body{
      width: 96%;margin: 0 auto;
    }
    .pagination{
      text-align: right;position: absolute;bottom: 10px;right: 1%;
    }
  }
  .return-btn{
    position: fixed;z-index: 2000;bottom: 35px;transform: translateX(50px);
  }
</style>
