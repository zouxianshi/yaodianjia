<template>
  <div class="app-container">
    <div class="store-goods-wrapper order-list">

      <section @keydown.enter="_loadList">
        <div
          class="search-form"
          style="margin-top:20px;margin-bottom:10px"
        >
          <div class="search-item">
            <span class="label-name">订单搜索</span>
            <el-select
              v-model="listQuery.orderSearchType"
              filterable
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="selectloading"
            >
              <el-option label="订单号" value="1" />
              <el-option label="收货人姓名" value="2" />
              <el-option label="收货人手机" value="3" />
              <el-option label="会员卡号" value="4" />
            </el-select>
          </div>
          <div class="search-item">
            <el-input
              v-model.trim="listQuery.searchValue"
              size="small"
              placeholder=""
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
                @change="chooseTimeRange"
              />
            </div>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input
              v-model.trim="listQuery.proName"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">订单类型</span>
            <el-select
              v-model="listQuery.orderType"
              filterable
              placeholder="订单类型"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="" />
              <el-option label="处方药" value="R" />
              <el-option label="正常订单" value="N" />
              <el-option label="虚拟商品订单" value="V" />
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
          </div> -->
          <div class="search-item">
            <span class="label-name">订单状态</span>
            <el-select
              v-model="listQuery.orderStatus"
              filterable
              placeholder="订单状态"
              @change="handleChangeOrderStatus"
            >
              <el-option label="全部" value="" />
              <el-option label="待付款" value="2" />
              <el-option label="待发货" value="4" />
              <el-option label="待提货" value="7" />
              <el-option label="已发货" value="6" />
              <el-option label="已完成" value="12" />
              <el-option label="待退款" value="10" />
              <!-- <el-option label="退货中" value="10" /> -->
              <el-option label="退货中" value="8" />  <!--待退货  == 退货中-->
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
              <el-option label="全部" value="" />
              <el-option label="普通快递" value="0" />
              <el-option label="配送上门" value="1" />
              <el-option label="门店自提" value="2" />
            </el-select>
          </div>
          <!-- <div class="search-item">
            <span class="label-name">配送方式</span>
            <el-select
              v-model="listQuery.distribution"
              filterable
              placeholder="配送方式"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="1" />
              <el-option label="快递配送" value="2" />
              <el-option label="门店员工配送" value="3" />
            </el-select>
          </div> -->
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
              <el-option v-for="(item,index) in storeList" :key="index" :label="item.stName" :value="item.id" />
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
              <!-- <el-option label="全部" value="" /> -->
              <el-option v-for="(item,indexEmp) in employeeData" :key="indexEmp" :label="item.empName" :value="item.id" />
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
              <el-option label="全部" value="" />
              <el-option label="在线支付" value="0" />
              <el-option label="货到付款" value="1" />
            </el-select>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:20px;margin-left:80px">
          <div class="search-item">
            <el-button type="primary" size="small" @click="listQuery.currentPage=1;_loadList()">查询</el-button>
            <el-button type="" size="small" @click="resetQuery">重置</el-button>
          </div>
        </div>
      </section>
      <div class="order_tab">
        <el-radio-group
          v-model="listQuery.orderStatus"
          size="small"
          @change="listQuery.currentPage = 1;_loadList()"
        >
          <el-radio-button label="">全部</el-radio-button>
          <el-radio-button label="2">待付款</el-radio-button>
          <el-radio-button label="4">
            待发货
            <template v-if="preSendNum>0">
              <span class="badge">{{ preSendNum }}</span>
            </template>
          </el-radio-button>
          <el-radio-button label="7">待提货</el-radio-button>
          <el-radio-button label="6">已发货</el-radio-button>
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
            <div class="header-cell">下单时间</div>
            <div class="header-cell">订单状态</div>
            <div class="header-cell">订单来源</div>
            <div class="header-cell">优惠金额</div>
            <div class="header-cell">实付金额</div>
          </div>
          <template v-if="tableData && tableData.length>0">
            <div v-for="(item,index) in tableData" :key="index" class="order-table-body">
              <div class="order-detail-header">
                <div class="header-left">
                  <div class="header-cell">
                    订单编号：
                  </div>
                  <div class="header-cell">
                    {{ item.serialNumber }}（{{ item.orderType | orderType }}）
                  </div>
                </div>
                <div class="header-right">
                  <div class="header-cell" @click="orderDetail(item.id,item.orderStatus)">
                    订单详情
                  </div>
                </div>
              </div>
              <div class="order-detail-body">
                <div class="body-cell cell-left">
                  <div v-if="item.detailList" class="goods-list">
                    <div v-for="(list,index2) in item.detailList" :key="index2" class="goods-item">
                      <div class="goods-img padding10">
                        <!-- <img src="" width="100" height="100"> -->
                        <div
                          v-if="list.mpic && list.mpic!==''"
                        >
                          <div class="x-image__preview">
                            <el-image
                              fit="scale-down"
                              :src="showImg(list.mpic)"
                              :preview-src-list="[showImg(list.mpic)]"
                            />
                          </div>
                        </div>
                        <div v-else style="line-height: 32px">暂无上传</div>
                      </div>
                      <div class="goods-info padding10">
                        <div class="goods-name" :title="list.commodityName">{{ list.commodityName }}</div>
                        <div class="goods-state">
                          <template v-if="list.status===6">
                            <template v-if="item.deliveryType===2">(待提货)</template>
                            <template v-else>(已发货)</template>
                          </template>
                          <template v-else>({{ list.status | orderStatus }})</template>
                        </div>
                        <div class="goods-number marginTop20">{{ list.commodityCode }}</div>
                      </div>
                      <div class="goods-info padding10">
                        <div class="goods-price">￥{{ list.commodityPrice }}</div>
                        <div class="goods-num">({{ list.commodityNumber }}件)</div>
                        <template v-if="item.orderStatus===10">
                          <div class="goods-remark marginTop10" @click="dialogRefundReasonVisible = true;lookRefundReason(list.orderId)">查看退款理由</div>
                        </template>
                        <template v-if="item.orderStatus===10 &&item.deliveryType!==2 && item.detailList.length>1">
                          <div class="order_btn" style="text-align:right">
                            <el-button type="warning" size="mini" @click="dialogPendingRefundVisible = true;rejectRefund(list.id,list.commodityName)">拒绝</el-button>
                            <el-button type="success" size="mini" @click="dialogPendingAgreeVisible = true;agreeRefund(list.id,list.totalActualAmount)">退款</el-button>
                          </div>
                        </template>
                        <template v-if="list.status===8 && item.detailList.length>1">
                          <div class="order_btn" style="text-align:right">
                            <div><el-button type="primary" size="small" @click="item.paymode===0?dialogConfirmReturnOnlVisible = true:dialogConfirmReturnVisible = true;agreeRefund(list.id,list.totalActualAmount)">收到退货</el-button></div>
                          </div>
                        </template>

                      </div>
                    </div>

                  </div>
                </div>
                <div class="body-cell cell-right padding10">
                  <div v-if="item.orderDeliveryAddress" class="cell-text">
                    <div>{{ item.orderDeliveryAddress.receiver }}</div>
                    <template v-if="item.orderDeliveryAddress.receiverMobile">
                      <div>{{ item.orderDeliveryAddress.receiverMobile | receiverMobile }}</div>
                    </template>
                  </div>
                </div>
                <div class="body-cell cell-right padding10">
                  <div class="cell-text">
                    <div>{{ item.orderTime }}</div>
                  </div>
                </div>
                <div class="body-cell cell-right padding10">
                  <div class="cell-text">
                    <template v-if="item.orderStatus===2">
                      <div>待付款</div>
                    </template>
                    <template v-if="item.orderStatus===4">
                      <div>待发货</div>
                      <template v-if="item.deliveryType!==2">
                        <!-- <div><el-button type="primary" size="mini" @click="dialogDeliveryVisible = true;immediateDelivery(item)">立即发货</el-button></div> -->
                        <div><el-button v-if="showSendBtn" type="primary" size="mini" @click="dialogDeliveryVisible = true;immediateDelivery(item)">立即发货</el-button></div>
                      </template>
                    </template>
                    <template v-if="item.orderStatus===6 && item.deliveryType===2">
                      <div>待提货</div>
                    <!-- <div><el-button type="primary" size="mini" @click="dialogPickUpVisible = true">确认提货</el-button></div> -->
                    </template>
                    <template v-if="item.orderStatus===6 && item.deliveryType!==2">
                      <div>已发货</div>
                    </template>
                    <template v-if="item.detailList">
                      <template v-if="item.orderStatus===10 && item.detailList.length===1">
                        <div>待退款</div>
                        <div class="order_btn">
                          <el-button type="warning" size="mini" @click="dialogPendingRefundVisible = true;rejectRefund(item.detailList[0].id,item.detailList[0].commodityName)">拒绝</el-button>
                          <el-button type="success" size="mini" @click="dialogPendingAgreeVisible = true;agreeRefund(item.detailList[0].id,item.detailList[0].totalActualAmount)">退款</el-button>
                        </div>
                      </template>
                    </template>
                    <template v-if="item.orderStatus===8 && item.detailList.length===1">
                      <div>待退货</div>
                      <div><el-button type="primary" size="mini" @click="dialogConfirmReturnVisible = true;agreeRefund(item.detailList[0].id,item.detailList[0].totalActualAmount)">收到退货</el-button></div>
                    </template>
                    <template v-if="item.orderStatus===30">
                      <div>退款完成</div>
                    </template>
                    <template v-if="item.orderStatus===20">
                      <div>已取消</div>
                    </template>
                    <template v-if="item.orderStatus===12">
                      <div>已完成</div>
                    </template>
                  </div>
                </div>
                <div class="body-cell cell-right padding10"><div class="cell-text">微商城</div></div>
                <div class="body-cell cell-right padding10"><div class="cell-text">￥{{ item.couponDeduction }}</div></div>
                <div class="body-cell cell-right padding10">
                  <div class="cell-text">
                    <div>￥{{ item.actuallyPaid }}</div>
                    <div>（含运费{{ item.actualFreightAmount }}元）</div>
                  </div>
                </div>
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

    <!-- 立即发货弹出框 -->
    <el-dialog title="请选择发货商品" :show-close="false" width="40%" :visible.sync="dialogDeliveryVisible" append-to-body>
      <el-table
        ref="multipleTable"
        border
        size="small"
        :data="unReceivedData"
        style="width: 100%;margin-top: 20px"
        max-height="256"
        @select-all="handleSelectAllChange"
        @select="handleSelect"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column align="center" label="商品图片" width="120">
          <template slot-scope="scope">
            <div
              v-if="scope.row.mpic && scope.row.mpic!==''"
              class="x-img-mini"
              style="width: 60px; height: 36px"
            >
              <div class="x-image__preview">
                <el-image
                  fit="scale-down"
                  :src="showImg(scope.row.mpic)"
                  :preview-src-list="[showImg(scope.row.mpic)]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂无上传</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名称" min-width="150">
          <template slot-scope="scope">
            <div>{{ scope.row.commodityName }}</div>
            <div>{{ scope.row.commodityCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="单价/数量" align="right" min-width="150">
          <template slot-scope="scope">
            <div>规格 {{ scope.row.skuValue }}</div>
            <div>￥{{ scope.row.commodityPrice }}({{ scope.row.commodityNumber }}件)</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-form :model="form">
        <el-form-item label="活动名称" label-width="200">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" label-width="200">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form> -->
      <el-form class="marginTop20">
        <el-form-item :model="orderId" label="订单号：" :label-width="labelWidth">
          <template>
            <div>{{ orderId }}</div>
          </template>
        </el-form-item>
        <!-- 普通发货 -->
        <template v-if="deliveryType===0">
          <el-form-item label="快递公司：" :label-width="labelWidth">
            <el-select v-model="expressQuery.expComCode" filterable placeholder="请输入关键词" @change="handleChangeExpress">
              <el-option v-for="(item,index_ec) in ExpressData" :key="index_ec" :label="item.expComName" :value="item.expComCode" />
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号：" :label-width="labelWidth">
            <el-input v-model="packageNo" autocomplete="off" style="width:200px;" placeholder="请输入快递单号" size="small" />
          </el-form-item>
        </template>
        <!-- 配送发货 -->
        <template v-if="deliveryType===1">
          <el-form-item label="配送员：" :label-width="labelWidth">
            <el-select
              v-model="deliveryStuffData.deliveryName"
              filterable
              placeholder="请输入关键词"
              @change="handleChangeDelivery"
            >
              <el-option v-for="(item,indexEmp2) in employeeData" :key="indexEmp2" :label="item.empName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item label="当前已选：" :label-width="labelWidth">
            <template>
              <div>{{ deliveryStuffData.deliveryName }} {{ deliveryStuffData.deliveryMobile }}</div>
            </template>
          </el-form-item>
          <template v-if="employeeUsual.length>0">
            <el-form-item label="常用配送员：" :label-width="labelWidth">
              <el-button v-for="(item,indexUsual) in employeeUsual" :key="indexUsual" type="" @click="setEmployeeData(item)">{{ item.deliveryUserName }}</el-button>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeliveryVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDeliveryVisible = false;orderSend()">确 定</el-button>
      </div>
    </el-dialog>

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
      <div class="dialog-title">拒绝订单{{ orderDetailId }}中{{ commodityName }}的退款吗？</div>
      <div> 拒绝退款后买家将不能再次发起申请，请确保与买家协商一致后再拒绝
        <!--<a href="">联系买家</a>--></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPendingRefundVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPendingRefundVisible = false;rejectRefundEnter(orderDetailId)">确 定</el-button>
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
          <el-input v-model="agreeRefundForm.actualRefundAmount" autocomplete="off" style="width:200px;" placeholder="请输入退款金额" size="small" />
        </el-form-item>
        <el-form-item label="最高退款金额:" :label-width="labelWidth">
          <div><span class="color-red">￥{{ payMoney }}</span> <span class="color-gray">(不可大于商品实付金额)</span></div>
        </el-form-item>
        <template v-if="isCheckPwd===0">
          <el-form-item label="请输入密码：" prop="pwd" :label-width="labelWidth" required>
            <el-input v-model="agreeRefundForm.pwd" type="password" autocomplete="off" style="width:200px;" placeholder="请输入密码" size="small" />
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPendingAgreeVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPendingAgreeVisible = false;agreeRefundEnter()">确 定</el-button>
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
    </el-dialog> -->

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
          <el-input v-model="agreeRefundForm.actualRefundAmount" autocomplete="off" style="width:200px;" value="" placeholder="请输入退款金额" size="small" />
        </el-form-item>
        <el-form-item label="最高退款金额" :label-width="labelWidth">
          <div><span class="color-red">￥{{ payMoney }}</span> <span class="color-gray">(不可大于商品实付金额)</span></div>
        </el-form-item>
        <template v-if="isCheckPwd===0">
          <el-form-item label="请输入密码：" :label-width="labelWidth">
            <el-input v-model="agreeRefundForm.pwd" autocomplete="off" style="width:200px;" placeholder="请输入密码" size="small" />
          </el-form-item>
        </template>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmReturnOnlVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirmReturnOnlVisible = false;agreeRefundEnter()">确 定</el-button>
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
        <el-form-item label="请输入密码：" :label-width="labelWidth">
          <el-input v-model="agreeRefundForm.pwd" autocomplete="off" style="width:200px;" placeholder="请输入密码" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmReturnVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirmReturnVisible = false;agreeRefundEnter()">确 定</el-button>
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
          <div><img v-for="(picItem,index3) in refundPic" :key="index3" src="" width="100" height="100"> </div>
        </el-form-item>
        <!-- <div class="float-right">
          <a href="">联系买家</a>
        </div> -->
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
import { mapGetters } from 'vuex'
// import { getTypeTree } from '@/api/group'
import { getMyStoreList } from '@/api/store-goods'
// import { getStoreList } from '@/api/depot'
import { checkNumberdouble } from '@/utils/validate'
import crypto from 'crypto'
import { getOrderList, getRefundReturn, employeeSearch, setRejectRefund, setAgreeRefund, getCountReceived, getUnReceiveData, getExpressCompany, setOrderSend, getEmployeeUsual, getCheckPwd } from '@/api/order'
export default {
  components: { Pagination },
  filters: {
    orderType: function(value) { // 订单类型
      if (value === 'N') {
        return '正常订单'
      }
      if (value === 'R') {
        return '处方药'
      }
      if (value === 'V') {
        return '虚拟商品订单'
      }
    },
    orderStatus: function(value) { // 订单状态
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
    receiverMobile: function(value) { // 手机号中间4位用*表示
      const reg = /^(\d{3})\d{4}(\d{4})$/
      return value.replace(reg, '$1****$2')
    }
  },
  mixins: [mixins],
  data() {
    const _checkRefundAmount = (rule, value, callback) => { // 退款金额验证
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
      pickerOptions: { // 时间控件相关
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            let end = new Date()
            let start = new Date()
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            const day = new Date().getDate()
            const hours = end.getHours()
            const minutes = end.getMinutes()
            const seconds = end.getSeconds()
            start = year + '-' + month + '-' + day + ' ' + '00:00:00'
            end = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
            picker.$emit('pick', [start, end])
          }
        }, {
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
        }, {
          text: '最近7天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
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
        // 'distribution': '', // 配送方式
        'empId': '', // 接单员工
        'endDate': '', // 下单结束时间
        'merCode': '',
        'orderSearchType': '', // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        // 'orderSource': '', // 订单来源 1.微商城
        'orderStatus': '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=待提货7) ===已发货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        'orderType': '', // 订单类型 1.微商城订单
        'payment': '', // 支付方式
        'proName': '', // 商品名称
        'receive': '', // 收货方式
        'searchValue': '', // 搜索内容
        'startDate': '', // 下单开始时间
        'isSuper': 0, // 是否是超级管理员
        'storeId': '' // 下单门店id
      },
      expressQuery: { // 快递公司搜索关键字
        'expComCode': '', // 快递公司编号
        'expComName': '' // 快递公司名称
      },
      storeList: [], // 门店
      employeeData: [], // 员工
      subLoading: false,
      editData: 0,
      type: 'price',
      isShow: false,
      dialogDeliveryVisible: false, // 立即发货
      dialogPendingRefundVisible: false, // 退款拒绝
      dialogPendingAgreeVisible: false, // 退款同意
      dialogPickUpVisible: false, // 确认提货
      dialogConfirmReturnVisible: false, // 确认退货--线下
      dialogConfirmReturnOnlVisible: false, // 确认退货--线上
      dialogRefundReasonVisible: false, // 查看退款理由
      labelWidth: '170px',
      labelWidth100: '100px',
      unReceivedData: [], // 待发货的商品列表
      mySelectList: [], // 选择的商品
      orderSendData: {}, // 立即发货的数据
      refundData: { // 退款理由
        refundReason: '无',
        refundReturnDesc: '无',
        pictureVoucher: ''
      },
      isCheckPwd: 0, // 是否需要再次输入密码
      ExpressData: [], // 物流公司列表
      deliveryType: 0, // 配送方式
      deliveryStuffData: {}, // 当前选择的配送员
      detailsList: [], // 订单明细id集合
      preSendNum: 0, // 待发货的数量
      packageNo: '', // 物流快递单号
      orderId: '', // 订单编号
      orderDetailId: '', // 订单明细id
      commodityName: '', // 商品名称
      refundPic: [], // 退款理由的图片凭证
      employeeUsual: [], // 常用配送员
      agreeRefundForm: { // 同意退款的数据
        actualRefundAmount: 0,
        pwd: ''
      },
      basicRules: {
        actualRefundAmount: [{ required: true, message: '请输入退款金额' },
          { validator: _checkRefundAmount, trigger: 'blur' }
        ],
        pwd: [{ required: true, message: '请输入密码' }]
      },
      highRefundMoney: 0, // 最高退款金额
      payMoney: 0 // 实际支付的价格
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'roles'])
  },
  created() {
    this.getList()
    this.getpreSendNum()
  },
  methods: {
    resetQuery() {
      let isSuper = 0
      if (this.roles.includes('admin')) {
        isSuper = 1
      } else {
        isSuper = 0
      }
      this.listQuery = {
        // 'distribution': '', // 配送方式
        'empId': '', // 接单员工
        'endDate': '', // 下单结束时间
        'merCode': this.merCode,
        'orderSearchType': '', // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        // 'orderSource': '', // 订单来源 1.微商城
        'orderStatus': '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=7.待提货) 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        'orderType': '', // 订单类型 1.微商城订单
        'payment': '', // 支付方式
        'proName': '', // 商品名称
        'receive': '', // 收货方式
        'searchValue': '', // 搜索内容
        'startDate': '', // 下单开始时间
        'isSuper': isSuper, // 是否是超级管理员
        'storeId': '' // 下单门店id
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
      employeeSearch({ merCode: this.merCode }).then(res => { // 获取门店员工
        if (res.data) {
          this.employeeData = res.data.data
        }
      })
    },
    checkPwd() {
      getCheckPwd().then(res => {
        // console.log('密码验证：', res)
        if (res) {
          this.isCheckPwd = res.data
        }
      })
    },
    _loadList() {
      this.loading = true
      let isSuper = 0
      if (this.roles.includes('admin')) {
        isSuper = 1
      } else {
        isSuper = 0
      }
      this.listQuery.isSuper = isSuper
      getOrderList(this.listQuery).then(res => {
        this.loading = false
        const { data, totalCount } = res.data
        if (data) {
          this.tableData = data
          this.total = totalCount
        } else {
          this.tableData = []
        }
      }).catch(() => {
        this.loading = false
      })
    },
    _loadStoreList(val = '') { // 加载门店数据
      return new Promise((resolve, reject) => {
        const loading = this.$loading({
          lock: true,
          text: '数据初始化中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        getMyStoreList({ pageSize: 10000, currentPage: 1, storeName: val, onlineStatus: 1, status: 1 }).then(res => {
          const { data } = res.data
          data.unshift({ id: '', stName: '全部' })
          this.storeList = data
          this.selectloading = false
          loading.close()
          resolve(data)
        }).catch((err) => {
          this.selectloading = false
          loading.close()
          reject(err)
        })
      })
    },
    getpreSendNum() { // 获取待发货商品数量
      let isSuper = 0
      if (this.roles.includes('admin')) {
        isSuper = 1
      } else {
        isSuper = 0
      }
      const datas = {
        merCode: this.merCode,
        isSuper: isSuper,
        storeId: this.listQuery.storeId
      }
      // console.log('获取待发货商品数量datas', datas)
      getCountReceived(datas).then(res => {
        if (res.data) {
          this.preSendNum = res.data
        }
      })
    },
    chooseTimeRange(date) { // 时间选择
      if (date && date.length !== 0) {
        this.listQuery.startDate = this.dateSelect[0]
        this.listQuery.endDate = this.dateSelect[1]
      }
    },
    orderDetail(id, state) { // 跳转订单详情
      this.$router.push({
        path: `/orders-manage/all-orders/details`,
        query: { id: id, state: state }
      })
    },
    remoteMethod(val) {
      this.selectloading = true
    },
    handleChangeStore(val) { // 门店选择改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleChangeEmpId(val) { // 接单员工选择改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleChangeCommodityType(val) { // 商品类型改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleChangeOrderStatus(val) { // 订单状态改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleChangeDelivery(val) { // 配送员改变时触发
      this.employeeData.forEach(item => {
        if (item.id === val) {
          this.deliveryStuffData.deliveryName = item.empName
          this.deliveryStuffData.deliveryMobile = item.mobile
        }
      })
    },
    handleChangeExpress(val) { // 快递公司选择改变时触发
      this.expressQuery.currentPage = 1
      // console.log('expressQuery-item:', val)
      this.expressQuery.expComCode = val
      this.ExpressCompany()
    },
    handleClose() {
      this.reset()
    },
    immediateDelivery(item) { // 立即发货弹出框
      // console.log('item:', item)
      this.deliveryType = item.deliveryType
      this.orderId = item.id
      getEmployeeUsual(this.merCode).then(res => { // 获取常用配送员
        if (res.data) {
          this.employeeUsual = res.data
        }
        // console.log('this.employeeUsual:', this.employeeUsual)
      })

      // 待发货商品数据
      getUnReceiveData({ merCode: this.merCode, orderId: item.id, currentPage: 1, pageSize: 20 }).then(res => {
        this.unReceivedData = res.data.data
      })
      this.mySelectList = [] // 打开时清空已选择的商品信息
      this.expressQuery.expComCode = ''// 弹出时清空已选快递公司
      this.packageNo = ''// 弹出时清空快递单号
      this.ExpressCompany() // 快递公司
    },
    setEmployeeData(item) { // 选择常用配送员
      // console.log('选择常用配送员:', item)
      if (item) {
        this.deliveryStuffData.deliveryName = item.deliveryUserName
        this.deliveryStuffData.deliveryMobile = item.deliveryUserPhone
      }
    },
    orderSend() { // 立即发货
      let detailsId = []

      if (this.mySelectList.length === 0) {
        this.dialogDeliveryVisible = true
        this.$message({
          message: '请选择要发货的商品',
          type: 'error'
        })
        return
      } else {
        const mySelectList = this.mySelectList
        detailsId = mySelectList.map(item => { return item.id })// 订单明细id集合
      }
      if (this.deliveryType === 0) {
        if (!this.expressQuery.expComCode) {
          this.dialogDeliveryVisible = true
          this.$message({
            message: '请选择快递公司',
            type: 'error'
          })
          return
        }
        if (!this.packageNo) {
          this.dialogDeliveryVisible = true
          this.$message({
            message: '请输入快递单号',
            type: 'error'
          })
          return
        }

        this.orderSendData = {
          // 'companyName': this.expressQuery.expComName,
          'companyNo': this.expressQuery.expComCode,
          'merCode': this.merCode,
          'modifyName': this.name,
          'orderId': this.orderId,
          'packageNo': this.packageNo,
          'deliveryType': this.deliveryType,
          'detailsList': detailsId
        }
      } else if (this.deliveryType === 1) {
        if (!this.deliveryStuffData.deliveryName) {
          this.dialogDeliveryVisible = true
          this.$message({
            message: '请选择配送员',
            type: 'error'
          })
          return
        }
        this.orderSendData = {
          // 'companyName': this.expressQuery.expComName,
          'companyNo': this.expressQuery.expComCode,
          'merCode': this.merCode,
          'modifyName': this.name,
          'orderId': this.orderId,
          'deliveryType': this.deliveryType,
          'detailsList': detailsId,
          'deliveryUserName': this.deliveryStuffData.deliveryName,
          'deliveryUserPhone': this.deliveryStuffData.deliveryMobile
        }
      }

      setOrderSend(this.orderSendData).then(res => { //
        this.$message({
          message: '发货成功',
          type: 'success'
        })
        this.getList()
      })
    },
    ExpressCompany() { // 获取快递公司
      getExpressCompany({ pageSize: 2000 }).then(res => {
        this.ExpressData = res.data.data
      })
    },
    lookRefundReason(orderId) { // 查看退款理由
      getRefundReturn(orderId).then(res => {
        if (res.data) {
          this.refundData = res.data
          let pics = []
          pics = this.refundData.pictureVoucher // 图片凭证
          pics = pics.split(',')

          this.refundPic = pics
        }
      })
    },
    rejectRefund(detailId, comName) { // 拒绝退款弹框
      this.orderDetailId = detailId
      this.commodityName = comName
    },
    rejectRefundEnter() { // 拒绝退款确定
      const dataParam = {
        merCode: this.merCode,
        orderDetailId: this.orderDetailId,
        userName: this.name
      }
      setRejectRefund(dataParam).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.$message({
            message: '设置成功',
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
    agreeRefund(detailId, money) { // 同意退款弹框
      // console.log('detailId:', detailId)
      this.orderDetailId = detailId
      this.payMoney = money
      this.agreeRefundForm.actualRefundAmount = 0
      this.agreeRefundForm.pwd = ''
      this.checkPwd() // 10分钟内不用再次输入密码
    },
    agreeRefundEnter() { // 同意退款确定
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
        pwd: this.agreeRefundForm.pwd
      }
      this.$refs['basic'].validate(valid => {
        if (valid) {
          if (this.agreeRefundForm.actualRefundAmount > this.payMoney) {
            this.dialogPendingAgreeVisible = true
            this.$message({
              message: '退款金额不可大于商品实付金额',
              type: 'error',
              duration: 5 * 1000
            })
            return false
          }
          setAgreeRefund(dataParam).then(res => {
            if (res.code === '10000') {
              this.loading = false
              this.$message({
                message: '设置成功',
                type: 'success',
                duration: 5 * 1000
              })
              this.getList()
            } else {
              this.dialogPendingAgreeVisible = true
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        } else {
          this.dialogPendingAgreeVisible = true
          this.$message({
            message: '存在必填字段未填写',
            type: 'error'
          })
          return
        }
      })
    },
    // 选取商品 表格选取（全选/反选），更新 mySelectList
    handleSelectAllChange(allList) {
      this.unReceivedData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.commodityId === item.commodityId
        })
        if (index > -1) {
          if (allList.length > 0) {
            // console.log('已存在' + item.commodityId + ':' + item.commodityName)
          } else {
            // 反选
            this.mySelectList.splice(index, 1)
          }
        } else {
          this.mySelectList.push(item)
        }
      })
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
    // 选取商品 表格选取（单选/取消），更新 mySelectList
    handleSelect(val, row) {
      const index = this.mySelectList.findIndex(mItem => { // 没有符合条件的返回-1
        return mItem.commodityId === row.commodityId
      })
      if (index > -1) {
        this.mySelectList.splice(index, 1)
      } else {
        this.mySelectList.push(row)
      }
    }
  }
}
</script>
<style lang="scss">
//订单详情
.order-table{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // height: 100vh;

  .order-table-header{
    background: #ebebeb;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid 1px #dfe6ec;

    .header-left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 30vw;
      .header-cell{
        flex: 1;
        text-align: center;
      }
    }
    .header-cell{
      color: #606266;
      font-size: 14px;
      flex: 1;
      text-align: center;
    }
  }
  .order-table-body{
    margin: 10px 0 0 0;
    border: solid 1px #dfe6ec;
    .order-detail-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px #dfe6ec;
      padding:10px;
      background:#f8f8f9;
      .header-left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .header-cell{
          color: #606266;
          font-size: 14px;

        }
      }
      .header-right{
        .header-cell{
          color: blue;
          font-size: 14px;
          cursor: pointer;
        }
      }
    }
    .order-detail-body{
      display: flex;
      justify-content: center;
      align-items: stretch;
      .body-cell{
        flex: 1;
        font-size: 14px;
        color: #606266;
        line-height: 22px;
        &:nth-last-child(1){
          border-right: none;
        }
        &.cell-left{
          border-right: 1px solid #dfe6ec
        }
        &.cell-right{
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          border-right: 1px solid #dfe6ec;
          .cell-text{
            text-align: center;
          }
        }
        .goods-list{
          width: 30vw;
          .goods-item{
            display: flex;
            // justify-content: flex-start;
            // align-items: center;
            border-bottom: solid 1px #dfe6ec;
            &:nth-last-child(1){
              border-bottom: none;
            }
            .goods-img{
              width: 100px;
              height: 100px;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .goods-info{
              flex: 1;
              justify-content: space-around;
              .goods-name{
                text-align: left;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                width: 200px;
              }
              .goods-state{
                color:red;
                text-align: left;
              }
              .goods-number{
                text-align: left;
              }
            }
            .goods-info{
              flex: 1;
              .goods-price{
                text-align: right;
              }
              .goods-num{
                text-align: right;
              }
              .goods-remark{
                text-align: right;
                color: green;
                align-items: flex-end;
                align-content:space-between;
                cursor: pointer;
              }
            }
          }
        }
      }
    }
  }
}
.store-goods-wrapper {
  .search-form {
    .search-item {
      .label-name {
        width: 60px;
      }
      .el-input {
        width: 180px;
      }
    }
  }
  .cascader{
      .el-input{
          width: 300px!important
      }
  }
  .choose-num{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .edit-tip{
    i{
      cursor: pointer;
      &:hover{
        color: #409eff
      }
    }
  }
}
.badge{
  background: red;
  color:#fff;
  position: absolute;
  top: 3px;
  border-radius: 50%;
  padding: 2px 4px;
  right: 10px;
}

.padding10{padding:10px;}
.marginTop10{ margin-top: 10px;}
.marginTop20{ margin-top: 20px;}

.order_dataTimepicker.el-date-range-picker{left:270px!important} //时间控件弹出框
.order_tab .el-radio-button--small .el-radio-button__inner{padding:12px 30px}

.order_btn button{
  width: 40px;
  text-align: center;
  padding-left:0;
  padding-right:0;
}
.color-red{color:red;}
.color-gray{color:#aaa;}
.float-right{float:right}
.el-dialog__body{line-height: 22px;}
.dialog-title{font-size: 16px; font-weight: bold;text-align: center;margin-bottom: 10px;}
.noneData{
  border:1px solid #dfe6ec;
  border-top: none;
  padding:30px;
  text-align: center;
  color: #606266
}
.order-list .el-input--small .el-input__inner {
    height: 36px;
    line-height: 36px;
}
</style>
<style scoped>
.el-date-range-picker{left:270px!important} /*时间控件弹出框*/
.el-radio-button--small .el-radio-button__inner{padding:12px 30px}
</style>
