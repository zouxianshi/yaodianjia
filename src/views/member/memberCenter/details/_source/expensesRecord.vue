<template>
  <div class="expenses-models">
    <el-card class="box-card" :body-style="{padding:'0px'}">
      <div class="expenses-record-model">
        <div class="list-owner">
          会员：{{ user }}
        </div>
        <div class="list-body">
          <el-table :data="tableData" border style="width: 100% ;height: calc(100vh - 300px)" height="calc(100vh - 400px)">
            <el-table-column prop="orderTime" label="消费时间" width="170" align="center" />
            <el-table-column prop="detailList" label="商品清单" align="center">
              <template slot-scope="scope">
                <p v-for="(item, index) in scope.row.detailList" :key="index">
                  {{ item.commodityName }}
                </p>
              </template>
            </el-table-column>
            <el-table-column prop="detailList" label="单价" align="center">
              <template slot-scope="scope">
                <p v-for="(item, index) in scope.row.detailList" :key="index">
                  ￥{{ item.commodityPrice }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="数量" width="80" align="center">
              <template slot-scope="scope">
                <p v-for="(item, index) in scope.row.detailList" :key="index">
                  {{ item.commodityNumber }}
                </p>
              </template>
            </el-table-column>
            <el-table-column label="消费类型" align="center">
              <template>
                线上消费
              </template>
            </el-table-column>
            <el-table-column prop="storeName" label="消费渠道/门店" align="center" />
            <el-table-column prop="totalActualOrderAmount" label="消费金额" align="center" />
          </el-table>
        </div>
        <div v-if="showPage" class="pagination">
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
    <div class="return-btn"><el-button size="mini" @click="$router.push('/member/member-center/list')">返回列表</el-button></div>
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
    },
    showPage() {
      return this.pageInfo.totalCon > this.pageInfo.pageSize
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
        this.pageInfo.totalCon = res.data.totalCount
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
  .expenses-models{
    position:relative;width: 96%;margin: 20px auto 0;
    .return-btn{
      position: fixed;z-index: 2000;bottom: 35px;transform: translateX(50px);
    }
    .expenses-record-model {
      background-color: #fff;height: calc(100vh - 300px);border-radius: 6px;
      position: relative;overflow: auto;
      .box-card {
        margin-bottom: 20px;
      }
      .list-owner{
        text-align: right;height: 40px;line-height: 40px;margin-right: 2%;
      }
      .list-body{
       width:98%; margin: 0 auto;
      }
      .pagination{
        text-align: right;margin-top: 10px;
      }
      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 40px;
        font-weight: bold;
      }
    }
  }

</style>
