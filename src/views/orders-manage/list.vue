<template>
  <div class="app-container">
    <div v-loading="loadingList" class="store-goods-wrapper order-list">
      <section @keydown.enter="_loadList">
        <div class="search-form order-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">订单搜索</span>
            <el-select
              v-model="listQuery.orderSearchType"
              filterable
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="selectloading"
              @change="searchSelectChange"
            >
              <el-option
                v-for="itemOp in options"
                :key="itemOp.value"
                :value="itemOp.value"
                :label="itemOp.label"
              />
            </el-select>
          </div>
          <div class="search-item">
            <el-input
              v-model.trim="listQuery.searchValue"
              size="small"
              placeholder
              @keyup.enter.native="listQuery.currentPage=1;_loadList()"
            />
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <div class="block">
              <span class="label-name">下单时间</span>
              <el-date-picker
                v-model="dateSelect"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                popper-class="order_dataTimepicker"
                :default-time="['00:00:00', '23:59:59']"
                @change="chooseTimeRange"
              />
            </div>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input v-model.trim="listQuery.proName" size="small" placeholder="商品名称" />
          </div>
          <div class="search-item">
            <span class="label-name">订单类型</span>
            <el-select
              v-model="listQuery.prescriptionSheetMark"
              filterable
              placeholder="订单类型"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value />
              <el-option label="处方药订单" value="1" />
              <el-option label="普通订单" value="0" />
              <!-- <el-option label="积分订单" value="V" /> -->
            </el-select>
          </div>
          <!-- <div class="search-item">
            <span class="label-name">订单来源</span>
            <el-select
              v-model="listQuery.orderSource"
              filterable
              placeholder="订单来源"
              @change="handleChangeCommodityType"
            >
              <el-option label="微商城" value="1" />
            </el-select>
          </div>-->
          <div class="search-item">
            <span class="label-name">订单状态</span>
            <el-select
              v-model="listQuery.orderStatus"
              filterable
              placeholder="订单状态"
              @change="handleChangeOrderStatus"
            >
              <el-option label="全部" value />
              <el-option label="待付款" value="2" />
              <el-option label="待发货" value="4" />
              <el-option label="已发货" value="6" />
              <el-option label="待提货" value="7" />
              <el-option label="已完成" value="12" />
              <el-option label="待退款" value="10" />
              <!-- <el-option label="退货中" value="10" /> -->
              <el-option label="退货中" value="8" />
              <!--待退货  == 退货中-->
              <el-option label="退款完成" value="30" />
              <el-option label="已取消" value="20" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">收货方式</span>
            <el-select
              v-model="listQuery.receive"
              filterable
              placeholder="收货方式"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value />
              <el-option label="普通快递" value="0" />
              <el-option label="配送上门" value="1" />
              <el-option label="门店自提" value="2" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">所在门店</span>
            <el-select
              v-model="listQuery.storeId"
              filterable
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="selectloading"
              @change="handleChangeStore"
            >
              <el-option label="全部" value />
              <el-option
                v-for="(item,index) in storeList"
                :key="index"
                :label="item.stName+'('+item.stCode+')'"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">接单员工</span>
            <el-select
              v-model="listQuery.empId"
              filterable
              placeholder="请输入关键词"
              @change="handleChangeEmpId"
            >
              <el-option label="全部" value />
              <el-option
                v-for="(item,indexEmp) in employeeData"
                :key="indexEmp"
                :label="item.empName+'('+item.empCode+')'"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">支付方式</span>
            <el-select
              v-model="listQuery.payment"
              filterable
              placeholder="支付方式"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value />
              <el-option label="在线支付" value="0" />
              <el-option label="货到付款" value="1" />
            </el-select>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:20px;margin-left:80px">
          <div class="search-item">
            <el-button type="primary" size="small" @click="listQuery.currentPage=1;_loadList()">查询</el-button>
            <el-button type size="small" @click="resetQuery">重置</el-button>
            <el-button type="primary" size="small" @click="exportFunc">
              导出
              <i class="el-icon-download el-icon--right" />
            </el-button>
            <export-table />
          </div>
        </div>
      </section>
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
          <!-- <el-radio-button label="8">待退货</el-radio-button> -->
          <el-radio-button label="10">待退款</el-radio-button>
          <el-radio-button label="8">退货中</el-radio-button>
          <el-radio-button label="30">退款完成</el-radio-button>
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
            <template v-if="refundStatus.includes(listQuery.orderStatus)">
              <!-- 带退款/退货中 显示 -->
              <div v-if="['10', '8'].includes(listQuery.orderStatus)" class="header-cell">退款申请时间</div>
              <!-- 退款完成 显示-->
              <div v-if="['30'].includes(listQuery.orderStatus)" class="header-cell">退款完成时间</div>
              <!-- 带退款/退货中/退款完成 显示 -->
              <div class="header-cell">退款退货状态</div>
              <div class="header-cell">订单来源</div>
              <div class="header-cell">退款金额</div>
            </template>
            <template v-else>
              <div class="header-cell">下单时间</div>
              <div class="header-cell">订单状态</div>
              <div class="header-cell">订单来源</div>
              <div class="header-cell">优惠金额</div>
              <div class="header-cell">实付金额</div>
            </template>
          </div>
          <div class="order-table-body-box">
            <template v-if="tableData && tableData.length>0">
              <div v-for="item in tableData" :key="item.returnQuestId || item.serialNumber " class="order-table-body">
                <div class="order-detail-header">
                  <div class="header-left">
                    <div class="header-cell">订单编号：</div>
                    <div
                      class="header-cell"
                    >{{ item.serialNumber }}（{{ item.prescriptionSheetMark | orderType }}）</div>
                  </div>
                  <div class="header-right">
                    <div v-if="refundStatus.includes(listQuery.orderStatus)" class="header-cell">
                      <!-- 查看退款申请单 -->
                      <dialog-refund-order
                        :id="item.returnQuestId"
                        :returnresp-dto="item.returnQuestRespDTO"
                      />
                    </div>
                    <div v-else class="header-cell">
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
                      <div
                        v-for="(list,index2) in item.detailList"
                        :key="index2"
                        class="goods-item"
                      >
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
                          <div
                            class="goods-name"
                            :title="list.commodityName"
                          >{{ list.commodityName }}</div>
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
                          <div class="goods-price">￥{{ list.commodityPrice }}</div>
                          <div class="goods-num">({{ list.commodityNumber }}件)</div>
                          <!-- <template v-if="!(refundStatus.includes(listQuery.orderStatus))">
                            <template v-if="list.status===8||list.status===10">
                              <div
                                class="goods-remark marginTop10"
                                @click="dialogRefundReasonVisible = true;lookRefundReason(list.id)"
                              >查看退款理由</div>
                            </template>
                            <template v-if="list.status===10 && item.payMode===0">
                              <div class="order_btn" style="text-align:right">
                                <el-button
                                  type="warning"
                                  size="mini"
                                  @click="dialogPendingRefundVisible = true;rejectRefund(item.id,list.id,list.commodityName)"
                                >拒绝</el-button>
                                <el-button
                                  type="success"
                                  size="mini"
                                  @click="dialogPendingAgreeVisible = true;agreeRefund(list.orderId,list.id,list.totalActualAmount,item.actualFreightAmount,list.status)"
                                >退款</el-button>
                              </div>
                            </template>
                            <template v-if="list.status===8">
                              <div class="order_btn btn_normal" style="text-align:right">
                                <div>
                                  <el-button
                                    type="primary"
                                    size="mini"
                                    @click="item.payMode===0?dialogConfirmReturnOnlVisible = true:dialogConfirmReturnVisible = true;agreeRefund(list.orderId,list.id,list.totalActualAmount,item.actualFreightAmount,list.status)"
                                  >收到退货</el-button>
                                </div>
                              </div>
                            </template>
                          </template>-->
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
                  <template v-if="refundStatus.includes(listQuery.orderStatus)">
                    <!-- 退款申请时间 -->
                    <div
                      v-if="['10', '8'].includes(listQuery.orderStatus)"
                      class="body-cell cell-right padding10"
                    >
                      <div class="cell-text">
                        <div>{{ item.orderTime }}</div>
                      </div>
                    </div>
                    <!-- 退款完成时间 -->
                    <div
                      v-if="['30'].includes(listQuery.orderStatus)"
                      class="body-cell cell-right padding10"
                    >
                      <div class="cell-text">
                        <div>{{ item.orderTime }}</div>
                      </div>
                    </div>
                    <!-- 退款退货状态 -->
                    <div class="body-cell cell-right padding10">
                      <div class="cell-text">
                        <div>{{ item.returnQuestRespDTO && item.returnQuestRespDTO.status | returnType }}</div>
                        <!-- <div class="order_btn">
                          <el-button
                            type="warning"
                            size="mini"
                            @click="dialogPendingRefundVisible = true;rejectRefund(item.id,list.id,list.commodityName)"
                          >拒绝</el-button>
                          <el-button
                            type="success"
                            size="mini"
                            @click="dialogPendingAgreeVisible = true;agreeRefund(list.orderId,list.id,list.totalActualAmount,item.actualFreightAmount,list.status)"
                          >退款</el-button>
                        </div>-->
                      </div>
                    </div>
                    <!-- 订单来源 -->
                    <div class="body-cell cell-right padding10">
                      <div class="cell-text">微商城</div>
                    </div>
                    <!-- 退款金额 -->
                    <div class="body-cell cell-right padding10">
                      <div v-if="item.returnQuestRespDTO" class="cell-text">
                        <!-- refundAmount退款金额 -->
                        <div>
                          ￥
                          <span v-if="item.returnQuestRespDTO.isReturnFreight === 1">{{ ((item.returnQuestRespDTO.refundAmount || 0)*100 + (item.returnQuestRespDTO.freightAmount ||0)*100) / 100 }}</span>
                          <span v-else>{{ item.returnQuestRespDTO.refundAmount || 0 }}</span>
                        </div>
                        <!-- actualRefundAmount退款金额 isReturnFreight是否退还运费 0.否 1.是 -->
                        <div v-if="item.returnQuestRespDTO.isReturnFreight === 1">
                          （含运费{{ item.returnQuestRespDTO.freightAmount || 0 }}元）
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
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
                            <dialog-delivery-order v-if="showSendBtn" :employee-data="employeeData" :p-item="item" @sendOrder="sendOrder" />
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
                        <template v-if="item.couponDeduction">
                          <span>{{ item.couponDeduction }}</span>
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

      <div class="table-footer">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="_loadList"
        />
      </div>
    </div>

    <!-- 待退款 拒绝-->
    <el-dialog
      title="提示"
      :visible.sync="dialogPendingRefundVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
      :data="orderDetailId"
    >
      <div class="dialog-title">拒绝订单{{ serialNum }}中{{ commodityName }}的退款吗？</div>
      <div>
        拒绝退款后买家将不能再次发起申请，请确保与买家协商一致后再拒绝
        <!--<a href="">联系买家</a>-->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPendingRefundVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogPendingRefundVisible = false;rejectRefundEnter(orderDetailId)"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 待退款 同意-->
    <el-dialog
      title="退款确认"
      :visible.sync="dialogPendingAgreeVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
      :data="agreeRefundForm"
    >
      <el-form ref="basic" :model="agreeRefundForm" class="marginTop20" :rules="basicRules">
        <el-form-item label="请输入退款金额：" prop="actualRefundAmount" :label-width="labelWidth" required>
          <el-input
            v-model="agreeRefundForm.actualRefundAmount"
            autocomplete="off"
            style="width:200px;"
            placeholder="请输入退款金额"
            size="small"
          />
        </el-form-item>
        <el-form-item label="最高退款金额:" :label-width="labelWidth">
          <div>
            <span class="color-red">￥{{ payMoney }}</span>
            <span class="color-gray">
              <template v-if="isLastRefund">(不可大于商品实付金额，当前订单未发货，运费将随最后一笔退款明细自动退回)</template>
              <template v-else>(不可大于商品实付金额)</template>
            </span>
          </div>
        </el-form-item>
        <template v-if="isCheckPwd===0">
          <el-form-item label="身份验证：" prop="pwd" :label-width="labelWidth" required>
            <el-input
              v-model="agreeRefundForm.pwd"
              type="password"
              autocomplete="off"
              style="width:200px;"
              placeholder="请输入登录密码"
              size="small"
            />
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPendingAgreeVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogPendingAgreeVisible = false;isRefundStatus='1';agreeRefundEnter()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 待提货 确认提货-->
    <!-- <el-dialog
      title="请输入提货码"
      :visible.sync="dialogPickUpVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
    >
      <el-form class="marginTop20">
        <el-input autocomplete="off" style="width:340px;margin-left:30px;" value="" placeholder="请输入提货码" size="small" />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPickUpVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPickUpVisible = false">确 定</el-button>
      </span>
    </el-dialog>-->

    <!-- 确认退货 收到退货---线上支付-->
    <el-dialog
      title="确认退货"
      :visible.sync="dialogConfirmReturnOnlVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
      :data="agreeRefundForm"
    >
      <div style="text-align:center;font-size:18px">确认收到退货吗？</div>
      <div class="color-gray marginTop20" style="text-align:center">同意退款后将退回该待退款订单中的货款</div>
      <el-form ref="basic" class="marginTop20" :model="agreeRefundForm">
        <el-form-item label="请输入退款金额：" :label-width="labelWidth">
          <el-input
            v-model="agreeRefundForm.actualRefundAmount"
            autocomplete="off"
            style="width:200px;"
            value
            placeholder="请输入退款金额"
            size="small"
          />
        </el-form-item>
        <el-form-item label="最高退款金额：" :label-width="labelWidth">
          <div>
            <span class="color-red">￥{{ payMoney }}</span>
            <span class="color-gray">(不可大于商品实付金额)</span>
          </div>
        </el-form-item>
        <template v-if="isLastRefund">
          <el-form-item label="是否退回运费：" :label-width="labelWidth">
            <template>
              <div class="con">
                <el-radio-group v-model="isReturnFreight">
                  <!--v-model="settingData.couponCost"-->
                  <el-radio name="radio_coupon" :label="0">否</el-radio>
                  <el-radio name="radio_coupon" :label="1">是</el-radio>
                </el-radio-group>
              </div>
            </template>
          </el-form-item>
        </template>
        <template v-if="isCheckPwd===0">
          <el-form-item label="身份验证：" :label-width="labelWidth">
            <el-input
              v-model="agreeRefundForm.pwd"
              type="password"
              autocomplete="off"
              style="width:200px;"
              placeholder="请输入登录密码"
              size="small"
            />
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmReturnOnlVisible = false;isReturnFreight=0">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogConfirmReturnOnlVisible = false;isRefundStatus='2';agreeRefundEnter()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 确认退货 收到退货--线下支付-->
    <el-dialog
      title="确认退货"
      :visible.sync="dialogConfirmReturnVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
      :data="agreeRefundForm"
    >
      <div style="text-align:center;font-size:18px">确认收到退货吗？</div>
      <div class="color-gray marginTop20" style="text-align:center">操作确认退货后，订单将显示退款完成状态</div>
      <el-form ref="basic" class="marginTop20" :model="agreeRefundForm">
        <el-form-item label="身份验证：" :label-width="labelWidth">
          <el-input
            v-model="agreeRefundForm.pwd"
            autocomplete="off"
            style="width:200px;"
            placeholder="请输入登录密码"
            size="small"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmReturnVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="dialogConfirmReturnVisible = false;isRefundStatus='3';agreeRefundEnter()"
        >确 定</el-button>
      </span>
    </el-dialog>

    <!-- 退款理由 -->
    <el-dialog
      title="退款理由"
      :visible.sync="dialogRefundReasonVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
      :data="refundData"
    >
      <el-form class="marginTop20">
        <el-form-item label="退款原因：" :label-width="labelWidth100">
          <div>{{ refundData.refundReason }}</div>
        </el-form-item>
        <el-form-item label="退款说明：" :label-width="labelWidth100">
          <div>{{ refundData.refundReturnDesc }}</div>
        </el-form-item>
        <el-form-item label="图片凭证：" :label-width="labelWidth100">
          <template v-if="refundPic!==[]">
            <div class="refund-box">
              <span v-for="(picItem,index3) in refundPic" :key="index3" class="marginRight10">
                <!-- <img :src="showImg(picItem)" :preview-src-list="[showImg(picItem)]" width="100" height="100"> -->
                <el-image
                  fit="scale-down"
                  :src="showImg(picItem)"
                  :preview-src-list="[showImg(picItem)]"
                  :label-width="labelWidth100"
                />
              </span>
            </div>
          </template>
          <template v-else>
            <div>未上传图片凭证</div>
          </template>
        </el-form-item>
        <!-- <div class="float-right">
          <a href="">联系买家</a>
        </div>-->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRefundReasonVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogRefundReasonVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import ps from '@/layout/psHandler'
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import dialogRefundOrder from './components/dialog-refundorder'
import dialogDeliveryOrder from './components/dialog-delivery'
import exportTable from './export-table'
import { mapGetters } from 'vuex'
// import { getTypeTree } from '@/api/group'
import { getMyStoreList } from '@/api/store-goods'
// import { getStoreList } from '@/api/depot'
import { checkNumberdouble } from '@/utils/validate'
import { throttle } from '@/utils/throttle'

import crypto from 'crypto'
import {
  getOrderList,
  getRefundReturn,
  employeeSearch,
  setRejectRefund,
  setAgreeRefund,
  getCountReceived,
  getCheckPwd,
  getRefundFreight
} from '@/api/order'
import { exportData } from '@/api/task'
export default {
  components: { Pagination, exportTable, dialogRefundOrder, dialogDeliveryOrder },
  filters: {
    orderType: function(value) {
      // 订单类型
      if (value === '0') {
        return '普通订单'
      }
      if (value === '1') {
        return '处方药订单'
      }
      // if (value === 'V') {
      //   return '积分订单'
      // }
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
        return '退货中'
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
    const _checkRefundAmount = (rule, value, callback) => {
      // 退款金额验证
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '') {
        if (!checkNumberdouble(value)) {
          callback(new Error('请输入最多2位小数的正数'))
        }
      }
      if (value < 0) {
        callback(new Error('最小值必须大于等于0'))
      }
      if (value > 99999) {
        callback(new Error('最大值不能超过99999'))
      }
      callback()
    }
    return {
      showListLoading: true,
      pickerOptions: {
        // 时间控件相关
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              let end = new Date()
              let start = new Date()
              const year = new Date().getFullYear()
              const month = new Date().getMonth() + 1
              const day = new Date().getDate()
              // const hours = end.getHours()
              // const minutes = end.getMinutes()
              // const seconds = end.getSeconds()
              // end = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
              start = year + '-' + month + '-' + day + ' ' + '00:00:00'
              end = year + '-' + month + '-' + day + ' ' + '23:59:59'

              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              let end = new Date()
              let start = new Date()
              const year = new Date().getFullYear()
              const month = new Date().getMonth() + 1
              const day = new Date().getDate() - 1
              start = year + '-' + month + '-' + day + ' ' + '00:00:00'
              end = year + '-' + month + '-' + day + ' ' + '23:59:59'
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
          // }, {
          //   text: '最近三个月',
          //   onClick(picker) {
          //     const end = new Date()
          //     const start = new Date()
          //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          //     picker.$emit('pick', [start, end])
          //   }
          // }
        ]
      },
      showSendBtn: ps.showSendGoodsBtn() || false, // 立即发货鉴权
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dateSelect: [], // 选择下单时间
      keyword: '',
      tableData: [], // 订单列表数据
      multipleSelection: [],
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      chooseStore: {},
      loading: false,
      selectloading: false,
      listQuery: {
        currentPage: 1,
        // 'distribution': '', // 配送方式
        empId: '', // 接单员工
        endDate: '', // 下单结束时间
        merCode: '',
        orderSearchType: 1, // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        // 'orderSource': '', // 订单来源 1.微商城
        orderStatus: '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=待提货7) ===已发货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        prescriptionSheetMark: '', // 订单类型 是不是处方单1、0
        payment: '', // 支付方式
        proName: '', // 商品名称
        receive: '', // 收货方式
        searchValue: '', // 搜索内容
        startDate: '', // 下单开始时间
        isSuper: 0, // 是否是超级管理员
        storeId: '' // 下单门店id
      },
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
      storeList: [], // 门店
      employeeData: [], // 员工
      subLoading: false,
      editData: 0,
      type: 'price',
      isShow: false,
      dialogPendingRefundVisible: false, // 退款拒绝
      dialogPendingAgreeVisible: false, // 退款同意
      dialogPickUpVisible: false, // 确认提货
      dialogConfirmReturnVisible: false, // 确认退货--线下
      dialogConfirmReturnOnlVisible: false, // 确认退货--线上
      dialogRefundReasonVisible: false, // 查看退款理由
      dialogRefundOrderVisible: false, // 查看退款单数据
      labelWidth: '170px',
      labelWidth100: '100px',
      refundData: {
        // 退款理由
        refundReason: '无',
        refundReturnDesc: '无',
        pictureVoucher: ''
      },
      isCheckPwd: 0, // 是否需要再次输入密码
      ExpressData: [], // 物流公司列表
      deliveryType: 0, // 配送方式
      deliveryStuffData: {
        deliveryUserId: '',
        deliveryName: '',
        deliveryMobile: ''
      }, // 当前选择的配送员
      detailsList: [], // 订单明细id集合
      preSendNum: 0, // 待发货的数量
      orderId: '', // 订单编号
      orderDetailId: '', // 订单明细id
      commodityName: '', // 商品名称
      refundPic: [], // 退款理由的图片凭证
      agreeRefundForm: {
        // 同意退款的数据
        actualRefundAmount: 0,
        pwd: ''
      },
      isLastRefund: 0, // 是否最后一笔退款明细
      isReturnFreight: 0, // 是否退回运费
      refundOrderId: '', // 同意退款的订单id
      basicRules: {
        actualRefundAmount: [
          { required: true, message: '请输入退款金额' },
          { validator: _checkRefundAmount, trigger: 'blur' }
        ],
        pwd: [{ required: true, message: '请输入登录密码' }]
      },
      highRefundMoney: 0, // 最高退款金额
      serialNum: '', // 主订单号
      payMoney: 0, // 实际支付的价格
      isRefundStatus: '0', // 待退款为false 退款退货为true
      loadingList: false, // 加载订单列表
      loadingCountReceived: false, // 加载待发货数量
      loadingSend: false, // 加载待发货商品
      loadingSendNow: false, // 加载立即发货
      refundStatus: ['10', '8', '30'] // 退款三子
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'roles'])
  },
  created() {
    if (sessionStorage.getItem('listQ')) {
      this.listQuery = JSON.parse(sessionStorage.getItem('listQ'))
    }
    this.getList()
    this.getpreSendNum()
  },
  methods: {
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
    resetQuery() {
      sessionStorage.removeItem('listQ')
      let isSuper = 0
      if (this.roles.includes('admin')) {
        isSuper = 1
      } else {
        isSuper = 0
      }
      this.listQuery = {
        currentPage: 1,
        // 'distribution': '', // 配送方式
        empId: '', // 接单员工
        endDate: '', // 下单结束时间
        merCode: this.merCode,
        orderSearchType: 1, // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        // 'orderSource': '', // 订单来源 1.微商城
        orderStatus: '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=7.待提货) 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        prescriptionSheetMark: '', // 订单类型 是不是处方单1、0
        payment: '', // 支付方式
        proName: '', // 商品名称
        receive: '', // 收货方式
        searchValue: '', // 搜索内容
        startDate: '', // 下单开始时间
        isSuper: isSuper, // 是否是超级管理员
        storeId: '' // 下单门店id
      }
      this.dateSelect = '' // 下单时间置空
      this.getList()
    },
    getList() {
      this._loadStoreList().then(res => {
        if (res) {
          this._loadList()
        }
      })
      employeeSearch({
        merCode: this.merCode,
        pageSize: 10000,
        status: 1
      }).then(res => {
        // 获取门店员工
        if (res.data) {
          this.employeeData = res.data.data
        }
      })
    },
    checkPwd() {
      getCheckPwd().then(res => {
        if (res) {
          this.isCheckPwd = res.data
        }
      })
    },
    _loadList() {
      this.loadingList = true
      let isSuper = 0
      if (this.roles.includes('admin')) {
        isSuper = 1
      } else {
        isSuper = 0
      }
      this.listQuery.isSuper = isSuper
      console.log('_loadList_____', this.listQuery)
      getOrderList(this.listQuery)
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
      this.getpreSendNum() // 获取待发货商品数量
    },
    _loadStoreList(val = '') {
      // 加载门店数据
      return new Promise((resolve, reject) => {
        const loading = this.$loading({
          lock: true,
          text: '数据初始化中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        getMyStoreList({
          pageSize: 10000,
          currentPage: 1,
          storeName: val,
          onlineStatus: 1,
          status: 1
        })
          .then(res => {
            const { data } = res.data
            // data.unshift({ id: '', stName: '全部' })
            this.storeList = data
            this.selectloading = false
            loading.close()
            resolve(data)
          })
          .catch(err => {
            this.selectloading = false
            loading.close()
            reject(err)
          })
      })
    },
    getpreSendNum() {
      // 获取待发货商品数量
      // let isSuper = 0
      // if (this.roles.includes('admin')) {
      //   isSuper = 1
      // } else {
      //   isSuper = 0
      // }
      // const datas = {
      //   merCode: this.merCode,
      //   isSuper: isSuper,
      //   storeId: this.listQuery.storeId
      // }
      // const datas = {
      //   'empId': this.listQuery.empId, // 接单员工
      //   'endDate': '', // 下单结束时间
      //   'merCode': this.merCode,
      //   'orderSearchType': '', // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
      //   // 'orderSource': '', // 订单来源 1.微商城
      //   'orderStatus': '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=7.待提货) 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
      //   'prescriptionSheetMark': '', // 订单类型 是不是处方单1、0
      //   'payment': '', // 支付方式
      //   'proName': '', // 商品名称
      //   'receive': '', // 收货方式
      //   'searchValue': '', // 搜索内容
      //   'startDate': '', // 下单开始时间
      //   'isSuper': isSuper, // 是否是超级管理员
      //   'storeId': this.listQuery.storeId // 下单门店id
      // }
      // console.log('获取待发货商品数量datas', datas)
      if (this.showListLoading) {
        this.loadingCountReceived = true
      }
      getCountReceived(this.listQuery).then(res => {
        this.loadingCountReceived = false
        if (res.data >= 0) {
          this.preSendNum = res.data
        }
      })
    },
    chooseTimeRange(date) {
      // 时间选择
      if (!date) {
        this.listQuery.startDate = ''
        this.listQuery.endDate = ''
      }
      if (date && date.length !== 0) {
        this.listQuery.startDate = this.dateSelect[0]
        this.listQuery.endDate = this.dateSelect[1]
      }
    },
    // orderDetail(id, state) { // 跳转订单详情
    //   sessionStorage.setItem('listQ', JSON.stringify(this.listQuery))
    //   this.$router.push({
    //     path: `/orders-manage/all-orders/details`,
    //     query: { id: id, state: state }
    //   })
    // },
    remoteMethod(val) {
      this.selectloading = true
    },
    handleChangeStore(val) {
      // 门店选择改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
      this.getpreSendNum() // 获取待发货商品数量
    },
    handleChangeEmpId(val) {
      // 接单员工选择改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
      this.getpreSendNum() // 获取待发货商品数量
    },
    handleChangeCommodityType(val) {
      // 商品类型改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleChangeOrderStatus(val) {
      // 订单状态改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleClose() {
      this.reset()
      this.getpreSendNum() // 获取待发货商品数量
    },
    lookRefundReason(orderId) {
      // 查看退款理由
      getRefundReturn(orderId).then(res => {
        if (res.data) {
          this.refundData = res.data
          let pics = []
          console.log('res.data-======', res.data)
          if (this.refundData.pictureVoucher) {
            pics = this.refundData.pictureVoucher // 图片凭证
            pics = pics.split(',')

            this.refundPic = pics
          } else {
            this.refundData.pictureVoucher = null
            this.refundPic = null
          }
        }
      })
    },
    rejectRefund(serialNum, detailId, comName) {
      // 拒绝退款弹框
      this.serialNum = serialNum
      this.orderDetailId = detailId
      this.commodityName = comName
    },
    rejectRefundEnter() {
      // 拒绝退款确定
      const dataParam = {
        merCode: this.merCode,
        orderDetailId: this.orderDetailId,
        userName: this.name
      }
      setRejectRefund(dataParam).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.$message({
            message: '拒绝退款成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.getList()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
      })
    },
    agreeRefund(orderId, detailId, money, freight, orderStatus) {
      // 同意退款弹框
      // console.log('paymode:', paymode)
      this.orderDetailId = detailId
      this.payMoney = money
      this.agreeRefundForm.actualRefundAmount = 0
      this.agreeRefundForm.pwd = ''
      this.refundOrderId = orderId
      this.checkPwd() // 10分钟内不用再次输入密码
      const params = {
        detailId: detailId,
        merCode: this.merCode,
        orderId: orderId
      }
      getRefundFreight(params).then(res => {
        // 验证明细退款是否是最后一笔退款明细
        if (res.data === 1) {
          this.isLastRefund = 1
          // this.payMoney = money + freight
          if (orderStatus === 10) {
            this.isReturnFreight = 1
          }
        } else {
          this.isLastRefund = 0
          // this.payMoney = money
          if (orderStatus === 10) {
            this.isReturnFreight = 0
          }
        }
      })
    },
    agreeRefundEnter() {
      // 同意退款确定
      if (this.agreeRefundForm.pwd !== '') {
        const md5 = crypto.createHash('md5')
        md5.update(this.agreeRefundForm.pwd)
        const md5Password = md5.digest('hex')
        this.agreeRefundForm.pwd = md5Password.toUpperCase()
      }
      const dataParam = {
        merCode: this.merCode,
        orderDetailId: this.orderDetailId,
        actualRefundAmount: this.agreeRefundForm.actualRefundAmount,
        pwd: this.agreeRefundForm.pwd,
        orderId: this.refundOrderId,
        isReturnFreight: this.isReturnFreight
      }

      this.$refs['basic'].validate(valid => {
        if (valid) {
          if (this.agreeRefundForm.actualRefundAmount > this.payMoney) {
            if (this.isRefundStatus === '1') {
              this.dialogPendingAgreeVisible = true
            } else if (this.isRefundStatus === '2') {
              this.dialogConfirmReturnOnlVisible = true
            } else if (this.isRefundStatus === '3') {
              this.dialogConfirmReturnVisible = true
            }
            this.$message({
              message: '退款金额不可大于商品实付金额',
              type: 'error',
              duration: 5 * 1000
            })
            return false
          }
          // if (this.agreeRefundForm.actualRefundAmount <= 0) {
          //   this.$message({
          //     message: '退款金额必须大于0',
          //     type: 'error',
          //     duration: 5 * 1000
          //   })
          //   return false
          // }
          setAgreeRefund(dataParam).then(res => {
            if (res.code === '10000') {
              this.loading = false
              this.$message({
                message: '退款成功',
                type: 'success',
                duration: 5 * 1000
              })
              this.isReturnFreight = 0 // 成功之后把是否退回运费置为否
              this.getList()
            } else {
              if (this.isRefundStatus === '1') {
                this.dialogPendingAgreeVisible = true
              } else if (this.isRefundStatus === '2') {
                this.dialogConfirmReturnOnlVisible = true
              } else if (this.isRefundStatus === '3') {
                this.dialogConfirmReturnVisible = true
              }
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        } else {
          if (this.isRefundStatus === '1') {
            this.dialogPendingAgreeVisible = true
          } else if (this.isRefundStatus === '2') {
            this.dialogConfirmReturnOnlVisible = true
          } else if (this.isRefundStatus === '3') {
            this.dialogConfirmReturnVisible = true
          }
          this.$message({
            message: '请填写密码验证身份',
            type: 'error'
          })
          return
        }
      })
    },
    searchSelectChange(data) {
      this.listQuery.searchValue = ''
    },
    reset() {
      this.pager = {
        current: 1,
        size: 10,
        total: 0
      }
      this.search = {
        keyWord: ''
      }
    },
    exportFunc: throttle(async function() {
      console.log('导出')
      exportData(this.listQuery)
        .then(res => {
          // if (res.type === 'application/json') {
          //   this.$message({
          //     message: '导出的记录为空',
          //     type: 'error'
          //   })
          // } else {
          //   download.blob(res, '所有订单')
          //   this.$message({
          //     message: '数据导出成功',
          //     type: 'success'
          //   })
          // }
          console.log('导出--------', res)
          if (res.code === '10000') {
            this.$alert(
              '订单列表正在导出中，稍后请点击【查看并导出记录】下载导出文件',
              '订单导出',
              {
                confirmButtonText: '好的',
                center: true,
                roundButton: true,
                confirmButtonClass: 'hydee_alert_btn'
              }
            )
          }
        })
        .catch(error => {
          console.log('导出错误-----------', error)
        })
    }, 3000),
    orderStatusChange(val) {
      console.log('val', val)
      this.listQuery.currentPage = 1
      this._loadList()
    },
    sendOrder(val) {
      console.log('1111111', val)
      this.getList()
      this.getpreSendNum() // 获取待发货商品数量
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
      .item-value {
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
          }
        }
      }
    }
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
