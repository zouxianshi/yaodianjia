<template>
  <div class="app-container">
    <div v-loading="loadingList" class="store-goods-wrapper order-list">
      <search-form ref="searchForm" @search="_loadList" @changeTab="changeTabName" />
      <div v-if="activeName === 'first'" class="order-table">
        <div class="order-table-header">
          <div class="header-left">
            <div class="header-cell">商品</div>
            <div class="header-cell">商品编号</div>
            <div class="header-cell">单价/数量</div>
          </div>
          <div class="header-cell">收货人</div>
          <div class="header-cell">下单时间</div>
          <div class="header-cell">订单状态</div>
          <div class="header-cell">订单来源</div>
          <div class="header-cell">所属门店</div>
          <div class="header-cell">优惠金额</div>
          <div class="header-cell">实付金额</div>
        </div>
        <div class="order-table-body-box">
          <template v-if="tableData && tableData.length>0">
            <div
              v-for="item in tableData"
              :key="item.returnQuestId || item.serialNumber "
              class="order-table-body"
            >
              <div class="order-detail-header">
                <div class="header-left">
                  <div class="header-cell">订单编号：</div>
                  <div class="header-cell" style="margin-right: 8px">
                    {{ item.serialNumber }}
                    <span v-if="item.orderType !== 'G'">
                      <span v-if="item.prescriptionSheetMark === '1'">(处方药订单)</span>
                      <span v-else>{{ item.orderType | orderType }}</span>
                    </span>
                  </div>
                  <template v-if="item.orderType === 'G'">
                    <div class="header-cell">拼团订单：</div>
                    <div class="header-cell">{{ item.groupCode }}</div>
                  </template>
                </div>
                <div class="header-right">
                  <div class="header-cell">
                    <el-link
                      v-if="item.orderType === 'G'"
                      :underline="false"
                      type="primary"
                      @click="listQuery.prescriptionSheetMark = ''; listQuery.orderSearchType = 5;listQuery.currentPage=1;listQuery.searchValue=item.groupCode;_loadList()"
                    >查看同团订单</el-link>
                    <a
                      :href="`#/orders-manage/details?id=${item.id}`+`&state=${item.orderStatus}`"
                    >订单详情</a>
                  </div>
                </div>
              </div>
              <div class="order-detail-body">
                <!-- 商品展示列 -->
                <div class="body-cell cell-left">
                  <div v-if="item.detailList" class="goods-list">
                    <div v-for="(list,index2) in item.detailList" :key="index2" class="goods-item">
                      <!-- 标签 -->
                      <!-- isPromotion是否促销活动0否1是 -->
                      <!-- pmtProductType 促销商品类型N.正品G.赠品R.换购商品 -->
                      <div
                        v-if="list.isPromotion === 1 && (list.pmtProductType === 'G' || list.pmtProductType === 'R')"
                        :class="{ 'goods-tag': true, 'gift': list.pmtProductType === 'G' }"
                      >{{ list.pmtProductType === 'G'? '赠品':'换购' }}</div>
                      <div class="goods-img padding10">
                        <div v-if="list.mpic && list.mpic!==''">
                          <div class="x-image__preview">
                            <el-image
                              :src="showImg(list.mpic)"
                              :preview-src-list="[showImg(list.mpic)]"
                            />
                          </div>
                        </div>
                        <div v-else style="line-height: 32px">暂无上传</div>
                      </div>
                      <div class="goods-info padding10">
                        <div class="goods-name" :title="list.commodityName">{{ list.commodityName }}</div>
                        <div
                          v-if="!(refundStatus.includes(listQuery.orderStatus))"
                          class="goods-state"
                        >
                          <template v-if="item.prescriptionSheetMark === '0'">
                            <template v-if="list.status===6">
                              <template v-if="item.deliveryType===2">(待提货)</template>
                              <template v-else>(已发货)</template>
                            </template>
                            <template v-else>({{ list.status | orderStatus }})</template>
                          </template>
                        </div>
                        <div class="goods-number marginTop20">{{ list.commodityCode }}</div>
                      </div>
                      <div class="goods-info padding10">
                        <div class="goods-price">
                          <span v-if="item.orderType === 'I'">{{ list.exchangeHb }}海贝 +</span>
                          <span>￥{{ list.commodityPrice }}</span>
                        </div>
                        <div class="goods-num">({{ list.commodityNumber }}件)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 收货人 -->
                <div class="body-cell cell-right padding10">
                  <div v-if="item.orderDeliveryAddress" class="cell-text">
                    <div>{{ item.orderDeliveryAddress.receiver }}</div>
                    <template v-if="item.orderDeliveryAddress.receiverMobile">
                      <div>{{ item.orderDeliveryAddress.receiverMobile | receiverMobile }}</div>
                    </template>
                  </div>
                </div>
                <template>
                  <!-- 下单时间 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      <div>{{ item.orderTime }}</div>
                    </div>
                  </div>
                  <!-- 订单状态 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      <!-- 当前状态为处方单且部位待付款，待收货等状态且需求单审核状态没通过 -->
                      <template
                        v-if="item.prescriptionSheetMark==='1' && perStatusShow(item.orderStatus) && item.prescriptionStatus !== 2"
                      >
                        <span v-text="orderStatusText(item)" />
                        <span v-if="item.prescriptionStatus!==1" v-text="lianouStatus(item)" />
                        <span v-if="item.prescriptionStatus===1">(待审批)</span>
                      </template>
                      <template v-else>
                        <template v-if="item.orderStatus===6">
                          <template v-if="item.deliveryType===2">待提货</template>
                          <template v-else>已发货</template>
                        </template>
                        <span v-else v-text="orderStatusText(item)" />
                      </template>

                      <!-- 立即发货出现时机，当前订单状态为代发货且配送方式不为自提；当为处方单时，必须要保证需求单审核状态为通过 -->
                      <template
                        v-if="item.orderStatus===4 && item.deliveryType!==2 && (item.prescriptionSheetMark === '0'|| (item.prescriptionSheetMark === '1'&& item.prescriptionStatus === 2 ))"
                      >
                        <div class="order_btn btn_normal" style="text-align:right">
                          <!-- 立即发货 -->
                          <dialog-delivery-order
                            v-auth:order.order-all.immediate-delivery
                            :employee-data="employeeData"
                            :p-item="item"
                            @sendOrder="sendOrder"
                          />
                        </div>
                      </template>
                    </div>
                  </div>
                  <!-- 订单来源 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">微商城</div>
                  </div>
                  <!-- 门店信息 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">{{ item.storeName }}</div>
                  </div>
                  <!-- 优惠金额 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      ￥
                      <template v-if="item.couponDeduction || item.activityDiscountAmont">
                        <span>{{ (item.couponDeduction || 0) + (item.activityDiscountAmont || 0) }}</span>
                        <!-- activityDiscountAmont -->
                      </template>
                      <template v-else>
                        <span>0</span>
                      </template>
                    </div>
                  </div>
                  <!-- 实付金额 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      <div>
                        ￥
                        <template v-if="item.actuallyPaid">
                          <span>{{ item.actuallyPaid }}</span>
                        </template>
                        <template v-else>
                          <span>0</span>
                        </template>
                      </div>
                      <div>
                        （含运费
                        <template v-if="item.actualFreightAmount">
                          <span>{{ item.actualFreightAmount }}</span>
                        </template>
                        <template v-else>
                          <span>0</span>
                        </template>元）
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="noneData">暂无数据</div>
          </template>
        </div>
      </div>
      <!-- 售后订单 -->
      <div v-if="activeName === 'second'" class="order-table">
        <div class="order-table-header">
          <div class="header-left">
            <div class="header-cell">商品</div>
            <div class="header-cell">商品编号</div>
            <div class="header-cell">单价/数量</div>
          </div>
          <div class="header-cell">收货人</div>
          <!-- 带退款/待退货 显示 -->
          <div v-if="['10', '8'].includes(listQuery.orderStatus)" class="header-cell">退款申请时间</div>
          <!-- 退款完成 显示-->
          <div v-if="['30'].includes(listQuery.orderStatus)" class="header-cell">退款完成时间</div>
          <!-- 带退款/待退货/退款完成 显示 -->
          <div class="header-cell">退款退货状态</div>
          <div class="header-cell">订单来源</div>
          <div class="header-cell">所属门店</div>
          <div class="header-cell">退款金额</div>
        </div>
        <div class="order-table-body-box">
          <template v-if="tableData && tableData.length>0">
            <div
              v-for="item in tableData"
              :key="item.returnQuestId || item.serialNumber "
              class="order-table-body"
            >
              <div class="order-detail-header">
                <div class="header-left">
                  <div class="header-cell">订单编号：</div>
                  <div class="header-cell" style="margin-right: 8px">
                    {{ item.serialNumber }}
                    <span
                      v-if="item.orderType !== 'G' && item.orderType !== 'I'"
                    >{{ item.orderType | orderType }}</span>
                    <span v-if="item.orderType === 'I'">(海贝商城订单)</span>
                  </div>
                  <template v-if="item.orderType === 'G'">
                    <div class="header-cell">拼团订单：</div>
                    <div class="header-cell">{{ item.groupCode }}</div>
                  </template>
                </div>
                <div class="header-right">
                  <div class="header-cell">
                    <!-- 查看退款申请单 -->
                    <dialog-refund-order
                      :id="item.returnQuestId"
                      :returnresp-dto="item.returnQuestRespDTO"
                      :order-type="item.orderType"
                    />
                  </div>
                </div>
              </div>
              <div class="order-detail-body">
                <!-- 商品展示列 -->
                <div class="body-cell cell-left">
                  <div v-if="item.detailList" class="goods-list">
                    <div v-for="(list,index2) in item.detailList" :key="index2" class="goods-item">
                      <div
                        v-if="list.isPromotion === 1 && (list.pmtProductType === 'G' || list.pmtProductType === 'R')"
                        :class="{ 'goods-tag': true, 'gift': list.pmtProductType === 'G' }"
                      >{{ list.pmtProductType === 'G'? '赠品':'换购' }}</div>
                      <div class="goods-img padding10">
                        <div v-if="list.mpic && list.mpic!==''">
                          <div class="x-image__preview">
                            <el-image
                              :src="showImg(list.mpic)"
                              :preview-src-list="[showImg(list.mpic)]"
                            />
                          </div>
                        </div>
                        <div v-else style="line-height: 32px">暂无上传</div>
                      </div>
                      <div class="goods-info padding10">
                        <div class="goods-name" :title="list.commodityName">{{ list.commodityName }}</div>
                        <div
                          v-if="!(refundStatus.includes(listQuery.orderStatus))"
                          class="goods-state"
                        >
                          <template v-if="item.prescriptionSheetMark === '0'">
                            <template v-if="list.status===6">
                              <template v-if="item.deliveryType===2">(待提货)</template>
                              <template v-else>(已发货)</template>
                            </template>
                            <template v-else>({{ list.status | orderStatus }})</template>
                          </template>
                        </div>
                        <div class="goods-number marginTop20">{{ list.commodityCode }}</div>
                      </div>
                      <div class="goods-info padding10">
                        <div class="goods-price">
                          <span v-if="item.orderType === 'I'">{{ list.exchangeHb }}海贝 +</span>
                          <span>￥{{ list.commodityPrice }}</span>
                        </div>
                        <div class="goods-num">({{ list.commodityNumber }}件)</div>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- 收货人 -->
                <div class="body-cell cell-right padding10">
                  <div v-if="item.orderDeliveryAddress" class="cell-text">
                    <div>{{ item.orderDeliveryAddress.receiver }}</div>
                    <template v-if="item.orderDeliveryAddress.receiverMobile">
                      <div>{{ item.orderDeliveryAddress.receiverMobile | receiverMobile }}</div>
                    </template>
                  </div>
                </div>
                <template>
                  <!-- 退款申请时间 -->
                  <div
                    v-if="['10', '8'].includes(listQuery.orderStatus)"
                    class="body-cell cell-right padding10"
                  >
                    <div class="cell-text">
                      <div>{{ item.returnQuestRespDTO && item.returnQuestRespDTO.createTime }}</div>
                    </div>
                  </div>
                  <!-- 退款完成时间 -->
                  <div
                    v-if="['30'].includes(listQuery.orderStatus)"
                    class="body-cell cell-right padding10"
                  >
                    <div class="cell-text">
                      <div>{{ item.returnQuestRespDTO && item.returnQuestRespDTO.modifyTime }}</div>
                    </div>
                  </div>
                  <!-- 退款退货状态 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">
                      <div>{{ item.returnQuestRespDTO && item.returnQuestRespDTO.status | returnType }}</div>
                    </div>
                  </div>
                  <!-- 订单来源 -->
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">微商城</div>
                  </div>
                  <div class="body-cell cell-right padding10">
                    <div class="cell-text">{{ item.storeName }}</div>
                  </div>
                  <!-- 退款金额 -->
                  <div class="body-cell cell-right padding10">
                    <div v-if="item.returnQuestRespDTO" class="cell-text">
                      <!-- refundAmount退款金额 -->
                      <div>
                        ￥
                        <span
                          v-if="item.returnQuestRespDTO.isReturnFreight === 1"
                        >{{ ((item.returnQuestRespDTO.refundAmount || 0)*100 + (item.returnQuestRespDTO.freightAmount ||0)*100) / 100 }}</span>
                        <span v-else>{{ item.returnQuestRespDTO.refundAmount || 0 }}</span>
                      </div>
                      <!-- actualRefundAmount退款金额 isReturnFreight是否退还运费 0.否 1.是 -->
                      <div
                        v-if="item.returnQuestRespDTO.isReturnFreight === 1"
                      >（含运费{{ item.returnQuestRespDTO.freightAmount || 0 }}元）</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </template>
          <template v-else>
            <div class="noneData">暂无数据</div>
          </template>
        </div>
      </div>
      <div class="table-footer">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="_loadList"
        />
      </div>
    </div>
  </div>
</template>
<script>
// import ps from '@/layout/psHandler'
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import dialogRefundOrder from './components/dialog-refundorder'
import dialogDeliveryOrder from './components/dialog-delivery'
import { mapGetters } from 'vuex'
import searchForm from './_source/searchForm'

import {
  getOrderList
} from '@/api/order'

export default {
  components: {
    Pagination,
    dialogRefundOrder,
    dialogDeliveryOrder,
    searchForm
  },
  filters: {
    orderType: function(value) {
      // 订单类型
      // if (value === '0') {
      //   return '(普通订单)'
      // }
      // if (value === '1') {
      //   return '(处方药订单)'
      // }
      if (value === 'R') {
        return '(处方药订单)'
      }
      if (value === 'N') {
        return '(普通订单)'
      }
      if (value === 'G') {
        return '(拼团订单)'
      }
      if (value === 'I') {
        return '(海贝商城订单)'
      }
      return ''
    },
    orderStatus: function(value) {
      // 订单状态
      if (value === 2) {
        return '待付款'
      }
      if (value === 4) {
        return '待发货'
      }
      if (value === 7) {
        return '待提货'
      }
      if (value === 6) {
        return '已发货'
      }
      if (value === 8) {
        return '待退货'
      }
      if (value === 10) {
        return '待退款'
      }
      if (value === 12) {
        return '已完成'
      }
      if (value === 20) {
        return '已取消'
      }
      if (value === 30) {
        return '退款完成'
      }
    },
    receiverMobile: function(value) {
      // 手机号中间4位用*表示
      const reg = /^(\d{3})\d{4}(\d{4})$/
      return value.replace(reg, '$1****$2')
    },
    returnType: function(value) {
      // 状态0待退货,1待退款，2退款完成 3驳回
      let text = '-'
      switch (value) {
        case 0:
          text = '待退货'
          break
        case 1:
          text = '待退款'
          break
        case 2:
          text = '退款完成'
          break
        case 3:
          text = '驳回'
          break
        default:
          break
      }
      return text
    }
  },
  mixins: [mixins],
  data() {
    return {
      showListLoading: true,
      tableData: [], // 订单列表数据
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      loading: false,
      listQuery: {
        currentPage: 1,
        // 'distribution': '', // 配送方式
        empId: '', // 接单员工
        endDate: '', // 下单结束时间
        merCode: '',
        orderSearchType: 1, // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        // 'orderSource': '', // 订单来源 1.微商城
        orderStatus: '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=待提货7) ===已发货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        // prescriptionSheetMark: '', // 订单类型 是不是处方单1、0
        payment: '', // 支付方式
        proName: '', // 商品名称
        receive: '', // 收货方式
        searchValue: '', // 搜索内容
        startDate: '', // 下单开始时间
        isSuper: 0, // 是否是超级管理员
        storeId: '' // 下单门店id
      },
      employeeData: [], // 员工
      type: 'price',
      loadingList: false, // 加载订单列表
      loadingCountReceived: false, // 加载待发货数量
      loadingSend: false, // 加载待发货商品
      loadingSendNow: false, // 加载立即发货
      refundStatus: ['10', '8', '30'], // 退款三子
      activeName: 'first'
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'roles']),
    approvalNums() {
      return this.approvalNum
    }
  },
  mounted() {
    // const that = this
    // that.$nextTick(() => {
    //   that.timer = setInterval(that.getApprovalNum, 60000)
    // })
    this.$refs.searchForm
      ._employeeSearch()
      .then(res => {
        this.employeeData = Array.isArray(res) ? res : []
      })
      .catch(() => {
        this.employeeData = []
      })
  },
  // destroyed() {
  //   clearInterval(this.timer)
  // },
  created() {
    if (sessionStorage.getItem('listQ')) {
      this.listQuery = JSON.parse(sessionStorage.getItem('listQ'))
    }
    this._loadList()
  },
  methods: {
    // 更改tab子组件传递给父组件的事件
    changeTabName(val) {
      console.log('0000000---changeTabName', val)
      this.activeName = val
    },
    orderStatusText(row) {
      let msg = ''
      switch (row.orderStatus) {
        case 4:
          msg = '待发货'
          break
        case 2:
          msg = '待付款'
          break
        case 6:
          msg = '待收货'
          break
        case 8:
          msg = '待退货'
          break
        case 10:
          msg = '待退款'
          break
        case 12:
          msg = '已完成'
          break
        case 20:
          msg = '已取消'
          break
        default:
          msg = '退款完成'
          break
      }
      return msg
    },
    lianouStatus(row) {
      let msg = ''
      switch (row.prescriptionStatus) {
        case 10:
          msg = '医生拒绝开方'
          break
        case 0:
          msg = '待审批'
          break
        case 1:
          msg = '待审批'
          break
        case 2:
          msg = '审批通过'
          break
        case 3:
          msg = '审批拒绝'
          break
        case 6:
          msg = '等待医生接诊'
          break
        case 7:
          msg = '等待医生接诊'
          break
        case 8:
          msg = '莲藕已开方'
          break
        default:
          break
      }
      return msg ? `(${msg})` : ''
    },
    perStatusShow(value) {
      // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=7.待提货) 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
      return [2, 6, 8, 10, 12, 20, 30].indexOf(value) === -1
    },
    // getList() {
    //   this._loadList()
    // },
    _loadList(origin, data) {
      console.log('_loadList----', origin, data)
      if (origin === 'searchForm') {
        this.listQuery = {
          ...data
        }
      }
      this.loadingList = true
      let isSuper = 0
      if (this.roles.includes('admin')) {
        isSuper = 1
      } else {
        isSuper = 0
      }
      this.listQuery.isSuper = isSuper
      // 特殊处理退款单的状态需要改为传递returnStatus  售后状态 0:待退货 1 待退款 2 退款完成
      console.log('_loadList_____', this.listQuery)
      const dataParam = Object.assign({}, this.listQuery)
      switch (this.listQuery.orderStatus) {
        case '10':
          dataParam.returnStatus = 1
          break
        case '8':
          dataParam.returnStatus = 0
          break
        case '30':
          dataParam.returnStatus = 2
          break
        default:
          break
      }
      getOrderList(dataParam)
        .then(res => {
          this.loadingList = false
          const { data, totalCount } = res.data
          if (data) {
            this.tableData = data
          } else {
            this.tableData = []
          }
          this.total = totalCount
        })
        .catch(() => {
          this.loadingList = false
        })
      this.showListLoading = false
    },
    sendOrder() {
      this._loadList()
      this.$refs.searchForm.getpreSendNum()
    }
  }
}
</script>
<style lang="scss">
.dialogRefundOrder {
  // background: red;
  .info-list {
    // padding: 0 24px;
    li {
      display: flex;
      flex-direction: row;
      line-height: 24px;
      font-size: 14px;
      margin-bottom: 12px;
      .item-lable {
        display: inline-block;
        flex: 0 0 6em;
        text-align: right;
      }
    }
  }
}
//订单详情
.order-table-body-box {
  height: calc(100vh - 324px);
  overflow: auto;
}
.order-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 10px;
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
    height: calc(100vh - 324px);
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
          .goods-item {
            display: flex;
            position: relative;
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
              // img{
              //   width: 100%;
              //   height: 100%;
              // }
            }
            .goods-info {
              flex: 1;
              justify-content: space-around;
              flex-direction: column;
              .goods-name {
                text-align: left;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                width: 200px;
              }
              .goods-state {
                color: red;
                text-align: left;
              }
              .goods-number {
                text-align: left;
              }
            }
            .goods-info {
              flex: 1;
              .goods-price {
                text-align: right;
              }
              .goods-num {
                text-align: right;
              }
              .goods-remark {
                text-align: right;
                color: green;
                align-items: flex-end;
                align-content: space-between;
                cursor: pointer;
              }
            }
            .goods-tag {
              position: absolute;
              top: 6px;
              left: 6px;
              z-index: 1;
              background-color: #fef0f0;
              border: 1px solid #f75a5a;
              color: #f75a5a;
              padding: 0 8px;
              font-size: 12px;
              line-height: 16px;
              border-radius: 4px;
              &.gift {
                background-color: #f75a5a;
                color: #fff;
              }
              // #f75a5a
            }
          }
        }
      }
    }
  }
}
// 马上去审批处方单
.message-tips {
  position: absolute;
  z-index: 200;
  right: 0;
  width: 500px;
  color: #f52a2a;
  height: 34px;
  line-height: 34px;
  padding: 0 20px;
  border: 1px solid #f52a2a;
  background-color: #f5c9c9;
  .sp-btn {
    float: right;
  }
}
.order-list {
  .search-form {
    .search-item {
      .label-name {
        width: 80px;
      }
      .el-input {
        width: 180px;
      }
    }
  }
  .cascader {
    .el-input {
      width: 300px !important;
    }
  }
  .choose-num {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .edit-tip {
    i {
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
}
.badge {
  background: red;
  color: #fff;
  position: absolute;
  top: 3px;
  border-radius: 50%;
  padding: 2px 4px;
  right: 10px;
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

.order_dataTimepicker.el-date-range-picker {
  left: 270px !important;
} //时间控件弹出框
.order_tab .el-radio-button--small .el-radio-button__inner {
  padding: 12px 30px;
}

.order_btn button {
  width: 40px;
  text-align: center;
  padding-left: 0;
  padding-right: 0;
}
.btn_normal button {
  width: inherit;
  font-size: 12px;
  padding-left: 8px;
  padding-right: 8px;
}
.color-red {
  color: red;
}
.color-gray {
  color: #aaa;
}
.float-right {
  float: right;
}
.el-dialog__body {
  line-height: 22px;
}
.dialog-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}
.noneData {
  border: 1px solid #dfe6ec;
  border-top: none;
  padding: 30px;
  text-align: center;
  color: #606266;
}
.order-list .el-input--small .el-input__inner {
  height: 36px;
  line-height: 36px;
}
.marginRight10 {
  margin-right: 10px;
}
.refund-box {
  .el-image {
    width: 100px;
    height: 100px;
  }
}
</style>
<style scoped>
.el-date-range-picker {
  left: 270px !important;
} /*时间控件弹出框*/
.el-radio-button--small .el-radio-button__inner {
  padding: 12px 30px;
}
.el-button--small.is-round {
  padding: 9px 30px;
}

/* .order-list .order-form .search-item .label-name{ width: 80px!important;} */
</style>
