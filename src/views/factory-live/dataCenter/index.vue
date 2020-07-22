<template>
  <div class="app-container">
    <div class="data-center-wrapper">
      <div class="live-total">
        <el-card class="box-card list-total">
          <div class="box-list">
            <p class="nums">{{ totaldata.totalCount ||0 }}</p>
            <p>总直播场数</p>
          </div>
          <div class="box-list">
            <p class="nums">{{ totaldata.totalDuration ||0 }}</p>
            <p>总直播时长</p>
          </div>
          <div class="box-list">
            <p class="nums">{{ totaldata.totalWatchNum ||0 }}</p>
            <p>累计观看人数</p>
          </div>
        </el-card>
        <el-card class="box-card">
          <div class="box-list">
            <p class="nums">
              {{ totaldata.totalOrderNum ||0 }}
              <span>&nbsp;笔</span>
            </p>
            <p>总成交订单</p>
          </div>
          <div class="box-list">
            <p class="nums">
              {{ totaldata.totalVisitOrderRate || 0 }}
              <span>&nbsp;%</span>
            </p>
            <p>总用户成交率</p>
          </div>
          <div class="box-list">
            <p class="nums">
              {{ totaldata.totalPayAmount || 0 }}
              <span>&nbsp;￥</span>
            </p>
            <p>总成交金额</p>
          </div>
          <el-tooltip class="item" effect="dark" content placement="top-start">
            <div slot="content">
              总成交订单：直播累计成功支付的订单笔数
              <br>总成交金额：直播中售卖商品成功支付的订单金额
              <br>总用户成交率：所有直播中用户支付订单/所有直播累计观看人数
            </div>
            <span style="color:#1890FF" class="el-icon-warning-outline" />
          </el-tooltip>
        </el-card>
      </div>
      <section class="table-box webkit-scroll">
        <el-table :data="tableData" style="width: 100% ;" height="calc(100vh - 390px)">
          <el-table-column label="序号" width="60" type="index" align="center" />
          <el-table-column prop="name" label="主题" min-width="180" align="center" />
          <el-table-column prop="duration" label="封面" min-width="100" align="center">
            <template slot-scope="scope">
              <img :src="showImg(scope.row.coverPicUrl)" style="width:100px;height:60px">
            </template>
          </el-table-column>
          <el-table-column label="开播时间" min-width="180" align="center">
            <template slot-scope="scope">
              <p>{{ scope.row.realBeginTime }}</p>
              <!-- <p>{{ scope.row.endTime }}</p> -->
            </template>
          </el-table-column>
          <el-table-column label="时长" min-width="180" align="center">
            <template slot-scope="scope">
              <p v-if="scope.row.duration">{{ scope.row.duration }}分钟</p>
            </template>
          </el-table-column>
          <el-table-column label="相关商品" min-width="180" align="center">
            <template slot-scope="scope">
              <el-button type="text" @click="getGoods(scope.row.id)">查看商品</el-button>
            </template>
          </el-table-column>
          <el-table-column label="商品数" min-width="180" align="center" prop="commodityNum">
          </el-table-column>
          <el-table-column label="订阅数" min-width="180" align="center" prop="subscriptionNum">
            <template slot-scope="scope">
              <el-button type="text" @click="getSubscription(scope.row.id)">
                {{scope.row.subscriptionNum}}
                <!-- <i class="el-icon-s-data" /> -->
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="观看人数" min-width="180" align="center" prop="visitNum"></el-table-column>
          <el-table-column label="操作" fixed="right" align="center" min-width="80">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="handleEdit(scope.row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </section>
      <!--  相关商品、相关订阅 -->
      <popGoods ref="goods" /> 
      <popSubscription ref="subscription" />
      <section class="c-footer">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
          style="margin:0;padding:0"
        />
      </section>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'
import liveRequest from '@/api/live'
import { factoryTotalData, factoryList } from '@/api/factory-live'
import popGoods from './pop-goods'
import popSubscription from './pop-subscription'
import config from '@/utils/config'
export default {
  components: { Pagination, popSubscription,  popGoods },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      listQuery: {
        currentPage: 1,
        pageSize: 10
      },
      totaldata: '',
      total: 0,
      goodsTabel: [], // 相关商品接口
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  created() {
    this.getList()
    this.getTotaldata()
  },
  methods: {
    async getList() {
      try {
        const { data } = await factoryList(this.listQuery)
        this.tableData = data.data
        this.total = data.totalCount
      } catch (error) {
        console.log(error)
      }
    },
    async getTotaldata() {
      try {
        const { data } = await factoryTotalData()
        console.log(data)
        this.totaldata = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取直播商品数据
    getGoods(id) {
      this.$refs.goods.open(id)
    },
    // 获取直播订阅数据
    getSubscription(id) {
      this.$refs.subscription.open(id)
    },
    handleEdit(row) {
      console.log(row)
      this.$router.push(`/live-manage/data-details?id=${row.id}`)
    }
  }
}
</script>
<style lang="scss">
.flex-between {
  display: flex;
  justify-content: space-between;
}
.live-total .el-card__body {
  @extend .flex-between;
}
</style>
<style lang="scss" scoped>
.data-center-wrapper {
  .flex-between {
    display: flex;
    justify-content: space-between;
  }
  .live-total {
    //   padding:0 30px;
    @extend .flex-between;
    .nums {
      margin-bottom: 10px;
    }
    .box-list {
      margin: 0 20px;
      text-align: center;
      p {
        &:first-child {
          font-size: 20px;
          font-weight: 600;
          span {
            font-size: 12px;
          }
        }
        &:last-child {
          color: #bebfc1;
          font-size: 14px;
        }
      }
    }
  }
  .c-footer{
    margin: 0;
  }
}
</style>