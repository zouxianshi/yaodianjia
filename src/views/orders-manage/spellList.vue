<template>
  <div class="app-container">
    <div>
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="订单搜索:">
          <el-row type="flex">
            <el-select v-model="form.name" class="mr20">
              <el-option label="拼团单号" value="groupCode" />
              <el-option label="团长姓名" value="userName" />
              <el-option label="团长手机号" value="userTel" />
              <el-option label="团长会员卡号" value="userId" />
            </el-select>
            <el-input v-model="form.value" style="width:180px" />
          </el-row>
        </el-form-item>
        <el-form-item label="开团时间:">
          <el-date-picker
            v-model="form.time"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="商品名称:">
          <el-input v-model="form.goodName" style="width:180px" placeholder="请输入商品名称" />
        </el-form-item>
        <el-row type="flex">
          <el-form-item label="拼团状态:">
            <el-select v-model="form.groupStatus" class="mr20" placeholder="请选择拼团状态">
              <el-option label="全部" :value="0" />
              <el-option label="待成团" :value="1" />
              <el-option label="已成团" :value="2" />
              <el-option label="拼团失败" :value="3" />
            </el-select>
          </el-form-item>
          <el-form-item label="所在门店:">
            <el-select v-model="form.merCode" class="mr20" placeholder="请选择所在门店">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-row>

        <el-form-item>
          <el-button type="primary" @click="submitForm('form')">查询</el-button>
          <el-button>重置查询条件</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="marginTop: 50px">
      <el-radio-group v-model="orderTabStatus">
        <el-radio-button :label="0">全部</el-radio-button>
        <el-radio-button :label="1">待成团</el-radio-button>
        <el-radio-button :label="2">已成团</el-radio-button>
        <el-radio-button :label="3">拼团失败</el-radio-button>
      </el-radio-group>
      <div class="table-box">
        <div class="order-table">
          <div class="order-table-header">
            <div class="header-left">
              <div class="header-cell">拼团商品</div>
              <div class="header-cell">拼团单号</div>
              <div class="header-cell">拼团单价</div>
            </div>
            <div class="header-cell">团长信息</div>
            <div class="header-cell">开团时间</div>
            <div class="header-cell">所在店铺</div>
            <div class="header-cell">成团情况</div>
            <div class="header-cell">实付总金额</div>
            <div class="header-cell">拼团状态</div>
          </div>
          <div class="order-table-body-box">
            <template v-if="tableData && tableData.length>0">
              <div v-for="(item,index) in tableData" :key="index" class="order-table-body">
                <div class="order-detail-header">
                  <div class="header-left">
                    <div class="header-cell">拼团单号：</div>
                    <div class="header-cell">{{ item.groupCode }}</div>
                  </div>
                  <!-- <div class="header-right">
                    <div class="header-cell">
                      <a
                        :href="`#/orders-manage/details?id=${item.id}`+`&state=${item.orderStatus}`"
                      >订单详情</a>
                    </div>
                  </div>-->
                </div>
                <div class="order-detail-body">
                  <div class="body-cell cell-left">
                    <div class="goods-list">
                      <div class="goods-img padding10">
                        <div class="x-image__preview">
                          <el-image
                            :src="showImg(item.imgUrl)"
                            :preview-src-list="[showImg(item.imgUrl)]"
                          />
                        </div>
                      </div>
                      <div class="goods-info padding10">
                        <div class="goods-name">蚌壳贴</div>
                        <div class="goods-number marginTop20">025555555</div>
                      </div>
                      <div class="goods-price padding10">￥{{ item.activityPrice }}</div>
                    </div>
                  </div>
                  <!-- 团长信息 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      <div>{{ item.userName }}</div>
                      <div>{{ item.userTel }}</div>
                      <!-- <template v-if="item.orderDeliveryAddress.receiverMobile">
                        <div>{{ item.orderDeliveryAddress.receiverMobile | receiverMobile }}</div>
                      </template>-->
                    </div>
                  </div>
                  <!-- 开团时间 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      <div v-text="showDate(item.startTime)" />
                    </div>
                  </div>
                  <!-- 所在店铺 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">{{ item.storeName }}</div>
                  </div>
                  <!-- 成团情况 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">{{ item.quantity }}</div>
                  </div>
                  <!-- 实付总金额 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      <!-- quantity购买份数(在待付款情况下是没有份数的) -->
                      <template>
                        <span v-text="`￥${computerPrice(item.activityPrice, item.quantity)}`" />
                      </template>
                    </div>
                  </div>
                  <!-- 拼团状态 -->
                  <div class="body-cell cell-right padding10">
                    <!-- 拼团状态(0待付款，1.待成团，2已成团，3拼团失败,4.手动成团,5拼团失败后已回收库存，6已发货) -->
                    <div class="cell-text">{{ item.groupStatus | orderType }}</div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <div class="noneData">暂无数据</div>
            </template>
          </div>
        </div>
      </div>

      <div class="table-footer">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dayjs from 'dayjs'
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import { tablist } from '@/api/spell-goods'
import { getAllStore } from '@/api/common'

export default {
  components: { Pagination },
  filters: {
    orderType: function(type) {
      let str = ''
      switch (type) {
        case 0:
          str = '待付款'
          break
        case 1:
          str = '待成团'
          break
        case 2:
          str = '已成团'
          break
        case 3:
          str = '拼团失败'
          break
        case 4:
          str = '手动成团'
          break
        case 5:
          str = '拼团失败后已回收库存'
          break
        case 6:
          str = '已发货'
          break
        default:
          str = ''
      }
      return str
    }
  },
  mixins: [mixins],
  data() {
    return {
      options: [
        {
          value: 1,
          label: '订单号'
        },
        {
          value: 2,
          label: '收货人姓名'
        },
        {
          value: 3,
          label: '收货人手机'
        },
        {
          value: 4,
          label: '会员卡号'
        }
      ],
      listQuery: {},
      form: {
        name: '',
        value: '',
        groupStatus: 0,
        goodName: ''
      },
      tableData: [],
      orderTabStatus: 0,
      allStore: [],
      total: 0
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'roles'])
  },
  created() {
    this.getList()
    this._loadAllStoreData()
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        console.log('error submit!!', valid, this.form)
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!', this.form)
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 获取列表
    getList() {
      tablist({
        merCode: this.merCode,
        status: 1
      }).then(res => {
        // 获取门店员工
        const { data, totalCount } = res.data
        if (data) {
          this.tableData = data
        } else {
          this.tableData = []
        }
        this.total = totalCount
      }).catch(() => {

      })
    },
    _loadAllStoreData() {
      // 加载所有门店
      getAllStore(this.merCode)
        .then(res => {
          this.allStore = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    formatTime(time, format) {
      return dayjs(time).format(format)
    },
    // 计算实付总金额
    computerPrice(activityPrice, addNum) {
      console.log('11111111-------------', activityPrice, addNum)
      return activityPrice * addNum
    },
    showDate(curTime) {
      return this.formatTime(curTime, 'YYYY-MM-DD HH:mm:ss')
    }
  }
}
</script>

<style lang="scss" scoped>
.mr20 {
  margin-right: 20px;
}
.padding10 {
  padding: 10px;
}

.marginTop10 {
  margin-top: 10px;
}
.marginTop20 {
  margin-top: 20px;
}
.order-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // height: 100vh;

  .order-table-header {
    height: 40px;
    background: #ebebeb;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid 1px #dfe6ec;

    .header-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 30vw;
      .header-cell {
        flex: 1;
        text-align: center;
      }
    }
    .header-cell {
      color: #606266;
      font-size: 14px;
      flex: 1;
      text-align: center;
    }
  }
  .order-table-body-box {
    // height: calc(100vh - 324px);
    overflow: auto;
  }
  .order-table-body {
    margin: 10px 0 0 0;
    border: solid 1px #dfe6ec;
    .order-detail-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px #dfe6ec;
      padding: 10px;
      background: #f8f8f9;
      .header-left {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .header-cell {
          color: #606266;
          font-size: 14px;
        }
      }
      .header-right {
        .header-cell {
          color: #147de8;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .order-detail-body {
      display: flex;
      justify-content: center;
      align-items: stretch;
      .body-cell {
        flex: 1;
        font-size: 14px;
        color: #606266;
        line-height: 22px;
        &:nth-last-child(1) {
          border-right: none;
        }
        &.cell-left {
          border-right: 1px solid #dfe6ec;
          display: flex;
          align-items: center;
        }
        &.cell-right {
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          border-right: 1px solid #dfe6ec;
          .cell-text {
            text-align: center;
          }
        }
        .goods-list {
          width: 30vw;
          display: flex;
          // justify-content: flex-start;
          // align-items: center;
          border-bottom: solid 1px #dfe6ec;
          &:nth-last-child(1) {
            border-bottom: none;
          }
          .goods-img {
            width: 100px;
            height: 100px;
            overflow: hidden;
          }
          .goods-info {
            display: flex;
            flex: 1;
            flex-direction: column;
            // align-content: space-between;
            justify-content: space-between;
            .goods-name {
              text-align: left;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              // width: 200px;
            }
            .goods-state {
              color: red;
              text-align: left;
            }
            .goods-number {
              text-align: left;
            }
          }
          .goods-price {
            display: flex;
            align-items: center;
            width: 100px;
            height: 100px;
          }
          // .goods-info {
          //   flex: 1;
          //   .goods-price {
          //     text-align: right;
          //   }
          //   .goods-num {
          //     text-align: right;
          //   }
          //   .goods-remark {
          //     text-align: right;
          //     color: green;
          //     align-items: flex-end;
          //     align-content: space-between;
          //     cursor: pointer;
          //   }
          // }
        }
      }
    }
  }
}
.noneData {
  border: 1px solid #dfe6ec;
  border-top: none;
  padding: 30px;
  text-align: center;
  color: #606266;
}
</style>
