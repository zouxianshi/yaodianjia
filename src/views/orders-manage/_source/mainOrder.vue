<template>
  <div>
    <div class="order_tab">
      <el-radio-group v-model="listQuery.orderStatus" size="small" @change="orderStatusChange">
        <el-radio-button label>全部</el-radio-button>
        <el-radio-button label="2">待付款</el-radio-button>
        <el-radio-button v-loading="loadingCountReceived" label="4">
          待发货
          <template v-if="preSendNum>0">
            <span class="badge">{{ preSendNum }}</span>
          </template>
        </el-radio-button>
        <el-radio-button label="6">已发货</el-radio-button>
        <el-radio-button label="7">待提货</el-radio-button>
        <el-radio-button label="12">已完成</el-radio-button>
        <el-radio-button label="20">已取消</el-radio-button>
      </el-radio-group>
    </div>
    <div class="table-box">
      <div class="order-table">
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
    </div>
  </div>
</template>
<script>
export default {}
</script>
