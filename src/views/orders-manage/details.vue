<template>
  <div class="app-container">
    <div v-loading="detailLoading" :model="detailsData" class="order-list">
      <div class="wrapper">
        <div class="item">
          <div class="item-left">
            订单号：{{ detailsData.serialNumber }}
            <template
              v-if="detailsData.prescriptionSheetMark==='1'"
            >（{{ detailsData.prescriptionSheetMark | orderType }}）</template>
          </div>
          <div class="item-right">
            <el-button
              type="primary"
              size="mini"
              @click="handleSetPushErp(detailsData.serialNumber)"
            >补推到ERP</el-button>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
            <div class="color-red item-text">
              <!-- orderStatus：订单状态 2.待付款 4.待发货 6.待收货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成 -->
              <!-- prescriptionSheetMark：处方单标识 1 是处方单  0 是普通订单 -->
              <!-- deliveryType：物流类型 0普通快递1配送上门2门店自提 -->
              <!-- prescriptionStatus 需求单审批状态0审批（未提交小蜜)1审批中2审批通过3审批拒绝 -->
              <template
                v-if="detailsData.prescriptionSheetMark==='1' &&( detailsData.orderStatus !==2 || detailsData.orderStatus !==20)"
              >
                <template v-if="detailsData.orderStatus===6">
                  <template v-if="detailsData.deliveryType===2">
                    <span>待提货</span>
                  </template>
                  <template v-else>
                    <span>已发货</span>
                  </template>
                  <span
                    v-if="detailsData.prescriptionStatus!==1"
                    class="f16"
                    v-text="lianouStatus?`(${lianouStatus})`:''"
                  />
                  <span
                    v-if="detailsData.prescriptionStatus===1&&detailsData.medicalPrescriptionApplyDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.prescriptionType === 1"
                    class="f16"
                  >(医生已完成开方，待药师审核)</span>
                  <span
                    v-if="detailsData.prescriptionStatus===1&&detailsData.medicalPrescriptionApplyDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.prescriptionType === 2"
                    class="f16"
                  >(待审核)</span>
                </template>
                <template v-else-if="detailsData.orderStatus===4">
                  <span>{{ detailsData.orderStatus | orderStatus }}</span>
                  <span
                    v-if="detailsData.prescriptionStatus!==1"
                    class="f16"
                    v-text="lianouStatus?`(${lianouStatus})`:''"
                  />
                  <span
                    v-if="detailsData.prescriptionStatus===1&&detailsData.medicalPrescriptionApplyDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.prescriptionType === 1"
                    class="f16"
                  >(医生已完成开方，待药师审核)</span>
                  <span
                    v-if="detailsData.prescriptionStatus===1&&detailsData.medicalPrescriptionApplyDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO&&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.prescriptionType === 2"
                    class="f16"
                  >(待审核)</span>
                </template>
                <template v-else>
                  <span>{{ detailsData.orderStatus | orderStatus }}</span>
                  <span class="f16" v-text="lianouStatus?`(${lianouStatus})`:''" />
                </template>
              </template>
              <!-- 普通订单 -->
              <template v-else>
                <template v-if="detailsData.orderStatus===6">
                  <template v-if="detailsData.deliveryType===2">
                    <span>待提货</span>
                  </template>
                  <template v-else>
                    <span>已发货</span>
                  </template>
                </template>
                <template v-else>
                  <span>{{ detailsData.orderStatus | orderStatus }}</span>
                </template>
              </template>
            </div>
          </div>
          <div class="item-right">
            <el-tag type="success">{{ detailsData.payMode | payment }}</el-tag>
            <el-tag type="warning">{{ detailsData.deliveryType | deliveryType }}</el-tag>
          </div>
        </div>
      </div>

      <!-- 商品购买信息 -->
      <div class="info">
        <div class="info-item">
          <div class="title">购买人信息</div>
          <div class="con">
            账号：
            <template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.member_phone }}</template>
            <template v-else>无</template>
          </div>
          <div class="con">
            会员卡：
            <template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.card_number }}</template>
            <template v-else>无</template>
          </div>
          <div class="con">
            姓名：
            <template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.member_name }}</template>
            <template v-else>无</template>
          </div>
          <div class="con">
            身份证号：
            <template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.idcard }}</template>
            <template v-else>无</template>
          </div>
        </div>
        <div class="info-item">
          <template v-if="detailsData.deliveryType===2">
            <div class="title">提货信息</div>
            <div class="con">
              提货门店：
              <template v-if="detailsData.storeResDTO">{{ detailsData.storeResDTO.stName }}</template>
              <template v-else>无</template>
            </div>
            <div class="con">
              <div class="lh18">
                提货地址：
                <template v-if="detailsData.storeResDTO">{{ detailsData.storeResDTO.address }}</template>
                <template v-else>无</template>
              </div>
            </div>
            <div class="con">
              联系电话：
              <template v-if="detailsData.storeResDTO">{{ detailsData.storeResDTO.mobile }}</template>
              <template v-else>无</template>
            </div>
            <div class="con">发票：{{ detailsData.isInvoice ? '需要':'不需要' }}</div>
            <div class="con">备注：{{ detailsData.orderRemark ? detailsData.orderRemark :'无' }}</div>
          </template>
          <template v-else>
            <div class="title">收货人信息</div>
            <div class="con">
              姓名：
              <template
                v-if="detailsData.orderDeliveryAddress"
              >{{ detailsData.orderDeliveryAddress.receiver }}</template>
              <template v-else>无</template>
            </div>
            <div class="con">
              电话：
              <template
                v-if="detailsData.orderDeliveryAddress"
              >{{ detailsData.orderDeliveryAddress.receiverMobile }}</template>
              <template v-else>无</template>
            </div>
            <div class="con">
              <div class="lh18">
                地址：
                <template
                  v-if="detailsData.orderDeliveryAddress"
                >{{ detailsData.orderDeliveryAddress.fullDetaiAddress }}</template>
                <template v-else>无</template>
              </div>
            </div>
            <div class="con">发票：{{ detailsData.isInvoice ? '需要':'不需要' }}</div>
            <div class="con">备注：{{ detailsData.orderRemark ? detailsData.orderRemark :'无' }}</div>
          </template>
        </div>
        <div class="info-item">
          <div class="title">订单信息</div>
          <div class="con">下单时间：{{ detailsData.orderTime }}</div>
          <!-- <div class="con">下单门店：{{ detailsData.storeName }}</div> -->
          <div class="con">
            发货门店：
            <template v-if="detailsData.storeResDTO && detailsData.storeResDTO.stName">
              <span>{{ detailsData.storeResDTO.stName }}</span>
            </template>
          </div>
          <div class="con">
            收货方式：
            <template v-if="detailsData.deliveryType===0">普通快递</template>
            <template v-if="detailsData.deliveryType===1">配送上门</template>
            <template v-if="detailsData.deliveryType===2">门店自提</template>
            <!-- {{ detailsData.deliveryType ?'门店员工配送':'快递配送' }} -->
          </div>
          <div class="con">订单来源：微商城</div>
          <div class="con">
            订单类型：
            <span>
              <span v-if="detailsData.prescriptionSheetMark === '1'">处方药订单</span>
              <span v-else>{{ detailsData.orderType | orderType }}</span>
            </span>
          </div>
          <div v-if="detailsData.deliveryType!==2">
            <div
              v-if="detailsData.orderStatus!==6 && detailsData.deliveryType!==2"
              class="con"
            >配送方式：{{ detailsData.deliveryType ?'门店员工配送':'快递配送' }}</div>
          </div>
        </div>
        <div class="info-item">
          <div class="title">付款信息</div>
          <div class="con">付款方式：{{ detailsData.payMode ? '货到付款':'在线支付' }}</div>
          <div class="con">商品总额：￥{{ detailsData.totalOrderAmount }}</div>
          <div v-if="detailsData.orderType === 'I'" class="con">海贝总额：{{ detailsData.totalActualHb }}</div>
          <div class="con">运费：￥{{ detailsData.actualFreightAmount }}</div>
          <template
            v-if="detailsData.couponDeduction+detailsData.integralDeduction+detailsData.activityDiscountAmont+detailsData.otherDiscountAmont"
          >
            <div class="con">
              优惠：￥
              {{ (detailsData.couponDeduction*100+detailsData.integralDeduction*100+detailsData.activityDiscountAmont*100+detailsData.otherDiscountAmont*100)/100 }}
            </div>
          </template>

          <div class="con">应付总额：￥{{ detailsData.totalActualOrderAmount }}</div>
          <template v-if="detailsData.payMode===0">
            <div class="con">实付总额：￥{{ detailsData.actuallyPaid }}</div>
          </template>
          <template v-else>
            <div class="con">实付总额：以线下实收为准</div>
          </template>
        </div>
        <div class="info-item">
          <div class="title">操作人信息</div>
          <div class="con">推广员： 无</div>
          <!-- <div class="con">退款操作人：	<template v-if="detailsData.returnList">{{ detailsData.returnList.modifyName }}</template><template v-else><span>无</span></template></div>
          <div class="con">退款申请时间：<template v-if="detailsData.returnList">{{ detailsData.returnList.createTime }}</template><template v-else><span>无</span></template></div>
          <div class="con">退款处理时间：<template v-if="detailsData.returnList">{{ detailsData.returnList.modifyTime }}</template><template v-else><span>无</span></template></div>-->
        </div>
      </div>

      <!-- 物流信息 --发货物流-->
      <!-- <template v-if="detailsData.recordList && (detailsData.orderStatus===6 ||detailsData.orderStatus===8||detailsData.orderStatus===12||detailsData.orderStatus===30)"> -->
      <template v-if="detailsData.recordList">
        <div v-for="(item,indexSend) in detailsData.recordList" :key="item.id" class="info">
          <div class="info-item info-left">
            <div class="title">配送信息{{ indexSend+1 }}</div>
            <div class="con">配送方式：{{ detailsData.deliveryType ?'门店员工配送':'快递配送' }}</div>
            <div class="con">
              快递公司：
              <template v-if="item.companyName">{{ item.companyName }}</template>
              <template v-else>-</template>
            </div>
            <div class="con">快递单号：{{ item.number }}</div>
          </div>
          <div class="info-item info-right">
            <div class="title">物流信息</div>
            <template v-if="item.data&&item.data!=='[]'">
              <div class="block">
                <el-timeline>
                  <el-timeline-item
                    v-for="(logistical, indexS) in sendLogisticals[indexSend]"
                    :key="indexS"
                    :type="logistical.type"
                    :color="logistical.color"
                    :size="logistical.size"
                    :timestamp="logistical.timestamp"
                    :hide-timestamp="true"
                  >{{ logistical.timestamp }}{{ logistical.content }}</el-timeline-item>
                </el-timeline>
              </div>
            </template>
            <template v-else>暂未同步到物流信息</template>
          </div>
        </div>
      </template>

      <!-- 处方申请单 -->
      <template v-if="detailsData.prescriptionSheetMark==='1'">
        <div class="info">
          <div class="info-item info-left">
            <div class="title">处方申请单</div>
            <div class="con">
              <el-link type="primary" :underline="false">用药人：</el-link>
              {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.buyer }}
            </div>
            <div class="con">
              <el-link type="primary" :underline="false">身份证：</el-link>
              {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.idcard }}
            </div>
            <div class="con">
              <el-link type="primary" :underline="false">出生年月：</el-link>
              {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.birthday }}
            </div>
            <div class="con">
              <el-link type="primary" :underline="false">性别：</el-link>
              {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.buyerSex }}
            </div>
            <div class="con">
              <el-link type="primary" :underline="false">体重：</el-link>
              {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.weight }}
            </div>
            <div class="con">
              <el-link type="primary" :underline="false">手机号码：</el-link>
              {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.buyerMobile }}
            </div>
          </div>
          <!-- 疾病史相关 -->
          <div class="info-item info-right prescription">
            <div class="block prescriptionA_img">
              <div>
                <div class="con" style="display:flex">
                  <el-link type="primary" :underline="false" style="white-space: nowrap;">疾病史：</el-link>
                  <div
                    v-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.medicalHistory"
                    class="des"
                  >
                    <el-tooltip
                      class="item"
                      effect="dark"
                      :content="medicalHistoryStr"
                      placement="top-start"
                    >
                      <span v-text="medicalHistoryStr" />
                    </el-tooltip>
                  </div>
                  <div v-else>【无疾病史，无妊娠哺乳】</div>
                </div>
                <!-- 在处方单时是不展示的 -->
                <div>
                  <div class="con">
                    <el-link type="primary" :underline="false">疾病：</el-link>
                    <span
                      v-for="(item,index) in detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.medicalDiseaseList"
                      :key="index"
                      style="marginRight:4px"
                      v-text="item.diseaseName"
                    />
                  </div>
                  <div class="con" style="display:flex">
                    <el-link type="primary" style="flex: 0 0 5em" :underline="false">疾病症状：</el-link>
                    <span class="des">
                      <el-tooltip
                        :content="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.diseaseSymptoms "
                      >
                        <span>{{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.diseaseSymptoms }}</span>
                      </el-tooltip>
                    </span>
                  </div>
                  <div class="con">
                    <el-link type="primary" :underline="false">就诊凭证/处方：</el-link>
                    <!-- prescriptionType ===1就诊单  2是有处方单 -->

                    <div
                      v-if="detailsData.medicalPrescriptionApplyDTO &&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO && detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.prescriptionType === 1"
                      class="img-ary"
                    >
                      <span
                        v-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.pic2"
                        class="x-image__preview marginRight20"
                      >
                        <el-image
                          fit="scale-down"
                          style="width:100px;height:100px"
                          :src="showImg(detailsData.medicalPrescriptionApplyDTO.pic2)"
                          :preview-src-list="[showImg(detailsData.medicalPrescriptionApplyDTO.pic2)]"
                        />
                      </span>
                      <span
                        v-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.pic3"
                        class="x-image__preview marginRight20"
                      >
                        <el-image
                          fit="scale-down"
                          style="width:100px;height:100px"
                          :src="showImg(detailsData.medicalPrescriptionApplyDTO.pic3)"
                          :preview-src-list="[showImg(detailsData.medicalPrescriptionApplyDTO.pic3)]"
                        />
                      </span>
                      <span
                        v-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.pic4"
                        class="x-image__preview marginRight20"
                      >
                        <el-image
                          fit="scale-down"
                          style="width:100px;height:100px"
                          :src="showImg(detailsData.medicalPrescriptionApplyDTO.pic4)"
                          :preview-src-list="[showImg(detailsData.medicalPrescriptionApplyDTO.pic4)]"
                        />
                      </span>
                    </div>
                    <div
                      v-else-if="detailsData.medicalPrescriptionApplyDTO &&detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO&& detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.prescriptionType === 2"
                      class="img-ary"
                    >
                      <span
                        v-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.pic1"
                        class="x-image__preview marginRight20"
                      >
                        <el-image
                          fit="scale-down"
                          style="width:100px;height:100px"
                          :src="showImg(detailsData.medicalPrescriptionApplyDTO.pic1)"
                          :preview-src-list="[showImg(detailsData.medicalPrescriptionApplyDTO.pic1)]"
                        />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="info-item info-right prescription">
            <div class="block prescriptionA_img">
              <div>
                <div class="con" style="display: flex">
                  <el-link type="primary" style="flex: 0 0 5em" :underline="false">开方状态：</el-link>
                  <el-tooltip
                    class="des"
                    effect="dark"
                    :content="kaiFangStatus"
                    placement="top-start"
                  >
                    <span v-text="kaiFangStatus" />
                  </el-tooltip>
                </div>
                <div
                  v-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.pic1 && detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.prescriptionType === 1"
                  class="img-ary"
                >
                  <span class="x-image__preview marginRight20">
                    <el-image
                      fit="scale-down"
                      style="width:100px;height: 100px"
                      :src="showImg(detailsData.medicalPrescriptionApplyDTO.pic1)"
                      :preview-src-list="[showImg(detailsData.medicalPrescriptionApplyDTO.pic1)]"
                    />
                  </span>
                </div>
                <template>
                  <div class="con">
                    <el-link type="primary" :underline="false">审核状态：</el-link>
                    <!-- 0-未审核，1-已审核，2-已确认，3-已作废，4-已完成,5-待提交,6-待提交 -->
                    <span
                      v-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.status===0"
                    >待审核</span>
                    <span
                      v-else-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.status===1"
                    >已审核</span>
                    <span
                      v-else-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.status===2"
                    >已确定</span>
                    <span
                      v-else-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.status===3"
                    >已作废</span>
                    <span
                      v-else-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.status===4"
                    >已完成</span>
                    <span
                      v-else-if="detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.status===5"
                    >待提交</span>
                    <span v-else>预审核</span>
                  </div>
                  <div class="con">
                    <el-link type="primary" :underline="false">审方药师：</el-link>
                    {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.auditorName }}
                  </div>
                  <div class="con">
                    <el-link type="primary" :underline="false">处理时间：</el-link>
                    {{ detailsData.medicalPrescriptionApplyDTO && detailsData.medicalPrescriptionApplyDTO.auditTime }}
                  </div>
                </template>
              </div>
            </div>
          </div>
        </div>
      </template>

      <!-- 退款原因 -->
      <template v-if="detailsData.returnList">
        <div v-for="(item,indexReturn) in detailsData.returnList" :key="indexReturn" class="info">
          <div class="info-item info-left">
            <div class="con">商品名称：{{ item.commodityName }}</div>
            <div class="con">退款原因：{{ item.refundReason }}</div>
            <div class="con">退款说明：{{ item.refundReturnDesc }}</div>
            <template v-if="item.modifyName">
              <div class="con">退款操作人：{{ item.modifyName }}</div>
            </template>
            <template v-if="item.createTime">
              <div class="con">退款申请时间：{{ item.createTime }}</div>
            </template>
            <template v-if="!(item.status===0 || item.status===1)">
              <div class="con">退款处理时间：{{ item.modifyTime }}</div>
            </template>
          </div>
          <div class="info-item info-right">
            <div class="block prescriptionA_img">
              <div v-if="item.pictureVoucher && item.pictureVoucher!==''">
                <span
                  v-for="(picItem,picIndex) in item.pictureVoucher"
                  :key="picIndex"
                  class="x-image__preview marginRight20"
                >
                  <el-image
                    fit="scale-down"
                    :src="showImg(picItem)"
                    :preview-src-list="[showImg(picItem)]"
                  />
                </span>
              </div>
              <div v-else style="line-height: 32px">该用户未上传图片凭证</div>
            </div>
          </div>
        </div>
      </template>
      <!-- 特效药用药人信息 -->
      <template v-if="detailsData.medicalUserEntity">
        <div class="info">
          <div class="info-item line">
            <div class="title">用药人</div>
            <div class="line-content">
              <div class="con">姓名：{{ detailsData.medicalUserEntity.buyer }}</div>
              <div class="con">身份证：{{ detailsData.medicalUserEntity.idcard }}</div>
              <div class="con">手机号码：{{ detailsData.medicalUserEntity.buyerMobile }}</div>
            </div>
          </div>
        </div>
      </template>
      <!-- 物流信息 --退货物流-->
      <template v-if="detailsData.retRecordList">
        <div
          v-for="(item,indexReturn) in detailsData.retRecordList"
          :key="indexReturn"
          class="info"
        >
          <div class="info-item info-left">
            <div class="title">退货信息</div>
            <!-- <div class="con">配送方式：{{ detailsData.returnList[indexReturn].refundType ?'快递寄回':'送回门店' }}</div> -->
            <div class="con">
              快递公司：
              <template v-if="item.companyName">{{ item.companyName }}</template>
              <template v-else>-</template>
            </div>
            <div class="con">快递单号：{{ item.number }}</div>
          </div>
          <div class="info-item info-right">
            <div class="title">物流信息</div>
            <template v-if="item.data&&item.data!=='[]'">
              <div class="block">
                <el-timeline>
                  <el-timeline-item
                    v-for="(logistical, indexF) in refundLogisticals[indexReturn]"
                    :key="indexF"
                    :type="logistical.type"
                    :color="logistical.color"
                    :size="logistical.size"
                    :timestamp="logistical.timestamp"
                    :hide-timestamp="true"
                  >{{ logistical.timestamp }}{{ logistical.content }}</el-timeline-item>
                </el-timeline>
              </div>
            </template>
            <template v-else>暂未同步到物流信息</template>
          </div>
        </div>
      </template>

      <!-- 商品 -->
      <template v-if="detailsData.detailList&&detailsData.detailList.length>0">
        <div class="table-box">
          <div class="detail-table">
            <div class="detail-table-header">
              <div class="header-left">
                <div class="header-cell">商品名称</div>
                <div class="header-cell">&nbsp;</div>
                <div class="header-cell">商品编码</div>
              </div>
              <div class="header-middle">
                <div class="header-cell">单价（元）</div>
                <div class="header-cell">数量</div>
                <div class="header-cell">小计（元）</div>
                <div class="header-cell">海典健康微商城优惠</div>
                <div class="header-cell">状态</div>
              </div>
              <div class="header-right">
                <div class="header-cell">运费（元）</div>
              </div>
            </div>

            <div class="detail-table-body">
              <div class="body-cell body-left">
                <div class="detail-list">
                  <div
                    v-for="(item,detailsIndex) in detailsData.detailList"
                    :key="detailsIndex"
                    class="detail-item"
                  >
                    <div class="detail-item-left">
                      <div class="item-cell cell-con">
                        <div class="cell-text">
                          <div v-if="item.mpic && item.mpic!==''">
                            <div class="x-image__preview" style="width:80px;height:80px">
                              <el-image
                                fit="scale-down"
                                :src="showImg(item.mpic)"
                                :preview-src-list="[showImg(item.mpic)]"
                              />
                            </div>
                          </div>
                          <div v-else style="line-height: 32px">暂无上传</div>
                        </div>
                        <div
                          v-if="item.isPromotion === 1 && (item.pmtProductType === 'G' || item.pmtProductType === 'R')"
                          :class="{ 'goods-tag': true, 'gift': item.pmtProductType === 'G' }"
                        >{{ item.pmtProductType === 'G'? '赠品':'换购' }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">{{ item.commodityName }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">{{ item.commodityCode }}</div>
                      </div>
                    </div>
                    <div class="detail-item-middle">
                      <div class="item-cell cell-con">
                        <div class="cell-text">
                          <span v-if="detailsData.orderType === 'I'">{{ item.exchangeHb || 0 }}海贝 +</span>
                          <span>￥{{ item.commodityPrice }}</span>
                        </div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">{{ item.commodityNumber }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">
                          <span v-if="detailsData.orderType === 'I'">{{ item.totalHb }}海贝 +</span>
                          ￥{{ item.totalActualAmount }}
                        </div>
                      </div>
                      <div class="item-cell cell-con">
                        <div
                          v-if="item.isPromotion === 1"
                          class="cell-text"
                        >立减：{{ item.activityDiscountAmont }}</div>
                        <div class="cell-text">优惠：{{ item.couponAmount }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">
                          <template v-if="item.status===6">
                            <template v-if="detailsData.deliveryType===2">待提货</template>
                            <template v-else>已发货</template>
                          </template>
                          <template v-else>{{ item.status | orderStatus }}</template>
                          <div
                            v-if="item.orderPackage && item.status!==8 && item.status!==10 && item.status!==20 && item.status!==30"
                            class="express"
                          >
                            <span class="font12">快递单号:</span>
                            <span class="number">{{ item.orderPackage.packageNo }}</span>
                            <i
                              class="el-icon-copy-document copy"
                              @click="doCopy(item.orderPackage.packageNo)"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="body-cell body-right">
                <div class="cell-text">￥{{ detailsData.actualFreightAmount }}元</div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import Vue from 'vue'
import mixins from '@/utils/mixin'
import VueClipboard from 'vue-clipboard2'
import { mapGetters } from 'vuex'
import { getOrderDetail, setPushErp } from '@/api/order'
Vue.use(VueClipboard)
export default {
  filters: {
    orderType: function(value) {
      // 订单类型
      if (value === '0') {
        return '普通订单'
      }
      if (value === '1') {
        return '处方药订单'
      }
      if (value === 'R') {
        return '处方药订单'
      }
      if (value === 'N') {
        return '普通订单'
      }
      if (value === 'G') {
        return '拼团订单'
      }
      if (value === 'I') {
        return '海贝商城订单'
      }
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
    payment: function(value) {
      // 支付方式
      if (value === 0) {
        return '在线支付'
      }
      if (value === 1) {
        return '货到付款'
      }
    },
    deliveryType: function(value) {
      // 配送方式
      if (value === 0) {
        return '普通快递'
      }
      if (value === 1) {
        return '配送上门'
      }
      if (value === 2) {
        return '门店自提'
      }
    }
  },
  mixins: [mixins],
  data() {
    return {
      detailLoading: false, // 订单详情加载
      detailsData: {},
      dialogVisible: false,
      loading: false,
      selectloading: false,
      sendLogisticals: [],
      refundLogisticals: [], // 退货物流信息
      subLoading: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name']),
    medicalHistoryStr: function() {
      let str = ''
      if (
        this.detailsData.medicalPrescriptionApplyDTO &&
        this.detailsData.medicalPrescriptionApplyDTO.medicalHistory
      ) {
        str = `【过往病史(${this.detailsData.medicalPrescriptionApplyDTO
          .medicalHistory.pmy || '无'}),过敏史(${this.detailsData
          .medicalPrescriptionApplyDTO.medicalHistory.amh ||
          '无'}),家族病史(${this.detailsData.medicalPrescriptionApplyDTO
          .medicalHistory.fmhType || '无'}),肝功能(${
          this.detailsData.medicalPrescriptionApplyDTO.medicalHistory
            .liverType === 1
            ? '有'
            : '无'
        }),
                      肾功能(${
  this.detailsData.medicalPrescriptionApplyDTO
    .medicalHistory.renalType === 1
    ? '有'
    : '无'
}), 妊娠脯乳期(${
  this.detailsData.medicalPrescriptionApplyDTO.medicalHistory
    .nurseType === 1
    ? '有'
    : '无'
})】 `
      } else {
        str = ''
      }
      return str
    },
    lianouStatus: function() {
      let msg = ''
      switch (this.detailsData && this.detailsData.prescriptionStatus) {
        case 10:
          msg = '医生拒绝开方'
          break
        case 0:
          msg = '医生已开方，待药师审批'
          break
        case 1:
          if (
            this.detailsData.medicalPrescriptionApplyDTO &&
            this.detailsData.medicalPrescriptionApplyDTO
              .prescriptionApprovalDTO &&
            this.detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO
              .prescriptionType === 2
          ) {
            msg = '待审核'
          } else if (
            this.detailsData.medicalPrescriptionApplyDTO &&
            this.detailsData.medicalPrescriptionApplyDTO
              .prescriptionApprovalDTO &&
            this.detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO
              .prescriptionType === 1
          ) {
            msg = '医生已完成开方，待药师审核'
          }
          break
        case 2:
          msg = '审批通过'
          break
        case 3:
          msg = '审批拒绝'
          break
        case 6:
          msg = '等待医生接诊' // 莲藕待开方
          break
        case 7:
          msg = '等待医生接诊' // 莲藕待开方
          break
        case 8:
          msg = '莲藕已开方'
          break
        default:
          break
      }
      return msg || ''
    },
    kaiFangStatus: function() {
      let str = ''
      if (
        this.detailsData.medicalPrescriptionApplyDTO &&
        this.detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO &&
        this.detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO
          .approvalOpinion
      ) {
        str = `${this.lianouStatus},原因：${this.detailsData.medicalPrescriptionApplyDTO.prescriptionApprovalDTO.approvalOpinion}`
      } else {
        str = this.lianouStatus
      }
      return str
    }
  },
  created() {
    this.getDetail()
    // console.log('this.sendLogisticals：', this.sendLogisticals)
  },
  methods: {
    getDetail() {
      const dataParams = {
        merCode: this.merCode,
        orderId: this.$route.query.id,
        state: this.$route.query.state
      }
      this.detailLoading = true
      getOrderDetail(dataParams)
        .then(res => {
          // 获取商品详情
          // console.log('details', res.data)

          this.detailLoading = false
          this.detailsData = res.data

          if (this.detailsData.recordList) {
            // 发货物流
            const recordListData = this.detailsData.recordList
            recordListData.forEach((item, index) => {
              if (item.data && item.data !== '[]') {
                const paramsSend = JSON.parse(item.data)
                this.sendLogisticals[index] = this.logisticsFormat(paramsSend)
              }
            })
          }

          if (this.detailsData.retRecordList) {
            // 退货物流
            const retRecordListData = this.detailsData.retRecordList
            retRecordListData.forEach((item, index) => {
              if (item.data && item.data !== '[]') {
                const paramsRefund = JSON.parse(item.data)
                this.refundLogisticals[index] = this.logisticsFormat(
                  paramsRefund
                )
              }
            })
          }

          if (
            this.detailsData.returnList &&
            this.detailsData.returnList.length > 0
          ) {
            // 处理用逗号分隔的图片成数组
            for (let i = 0; i < this.detailsData.returnList.length; i++) {
              if (
                this.detailsData.returnList[i].pictureVoucher &&
                this.detailsData.returnList[i].pictureVoucher !== ''
              ) {
                this.detailsData.returnList[i].pictureVoucher = this.picFormat(
                  this.detailsData.returnList[i].pictureVoucher
                )
              }
            }
            // console.log('this.detailsData.returnList.pictureVoucher:', this.detailsData.returnList.pictureVoucher)
          }

          if (
            this.detailsData.prescriptionApproval &&
            this.detailsData.prescriptionApproval.image !== ''
          ) {
            // 处理处方单逗号分隔的图片成数组
            this.detailsData.prescriptionApproval.image = this.picFormat(
              this.detailsData.prescriptionApproval.image
            )
          }
        })
        .catch(() => {
          this.detailLoading = false
        })
    },
    picFormat(data) {
      // 格式化图片凭证  用逗号分隔的
      let pics = []
      pics = data // 图片凭证
      pics = pics.split(',')
      return pics
    },
    picFormatSemicolon(data) {
      // 格式化图片凭证 用分号分隔的
      let pics = []
      pics = data // 图片凭证
      pics = pics.split(';')
      return pics
    },
    logisticsFormat(data) {
      // 格式化物流信息
      // console.log('物流data:', data)
      // alert(data)
      const arr = []
      for (let i = 0; i < data.length; i++) {
        const object = {}
        object.content = data[i].context
        object.timestamp = data[i].ftime
        if (i === 0) {
          object.color = 'red'
        }
        arr[i] = object
      }
      // console.log('临时arr:', arr)
      // alert(arr)
      return arr
    },
    handleSetPushErp(orderId) {
      setPushErp(orderId)
        .then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '成功补推到ERP',
              type: 'success'
            })
          }
        })
        .catch(res => {
          this.$message({
            message: '补推到ERP失败',
            type: 'error'
          })
        })
    },
    /**
     * 分析身份证，计算年龄，性别
     * @param {string} identityCard 身份证号码
     */
    handlerAnalyzeIDCard(IDCard) {
      console.log('idcard', IDCard)

      /**
       * 解析完成的信息对象
       */
      const msgObj = {
        /**
         * 是否合法
         */
        isValid: true,
        /**
         * 性别 1-男 0-女
         */
        sex: '1',
        /**
         * 年龄 number
         */
        age: 0
      }

      if (!/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDCard)) {
        console.warn('into reg')
        msgObj.isValid = false
        return msgObj
      }

      const getCardInfos = IDCard => {
        const cardInfos = {
          yearBirth: '',
          monthBirth: '',
          dayBirth: ''
        }
        if (IDCard.length === 15) {
          cardInfos.yearBirth = `19${IDCard.substring(6, 8)}`
          cardInfos.monthBirth = IDCard.substring(8, 10)
          cardInfos.dayBirth = IDCard.substring(10, 12)
        } else {
          cardInfos.yearBirth = IDCard.substring(6, 10)
          cardInfos.monthBirth = IDCard.substring(10, 12)
          cardInfos.dayBirth = IDCard.substring(12, 14)
        }
        return cardInfos
      }

      // 获取用户身份证号码
      const userCard = IDCard

      // 获取性别
      if (parseInt(userCard.substr(userCard.length - 2, 1)) % 2 === 1) {
        msgObj.sex = '1'
      } else {
        msgObj.sex = '0'
      }
      // 获取出生年月日
      // userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14);
      const cardInfos = getCardInfos(userCard)
      if (
        cardInfos.yearBirth < 1900 ||
        cardInfos.yearBirth > new Date().getFullYear() ||
        cardInfos.monthBirth > 12 ||
        cardInfos.dayBirth > 31
      ) {
        // console.log('cardInfos.yearBirth < 1900', cardInfos.yearBirth < 1900)
        // console.log('cardInfos.yearBirth > new Date().getFullYear()', cardInfos.yearBirth > new Date().getFullYear())
        // console.log('cardInfos.monthBirth>12', cardInfos.monthBirth > 12)
        // console.log('cardInfos.dayBirth>31', cardInfos.dayBirth > 31)
        msgObj.isValid = false
      }
      const yearBirth = cardInfos.yearBirth
      const monthBirth = cardInfos.monthBirth
      const dayBirth = cardInfos.dayBirth
      // 获取当前年月日并计算年龄
      const myDate = new Date()
      const monthNow = myDate.getMonth() + 1
      const dayNow = myDate.getDay()
      let age = myDate.getFullYear() - yearBirth
      if (
        monthNow < monthBirth ||
        (monthNow === monthBirth && dayNow < dayBirth)
      ) {
        age--
      }
      // 得到年龄
      msgObj.age = age

      // 返回解析信息对象
      return msgObj
    },
    doCopy(row) {
      this.$copyText(row).then(
        e => {
          console.log(e)
          this.$message.success('复制成功')
        },
        e => {
          console.log(e)
          this.$message.warning('复制失败')
        }
      )
    }
  }
}
</script>
<style lang="scss" scoped>
// @import "../../scss/helpers/mixins";
.store-goods-wrapper {
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

// 商品状态
.wrapper {
  width: 100%;
  border: 1px solid #dfe6ec;
  background: #fafafa;
  padding: 20px;
  margin-bottom: 20px;
  .item {
    clear: both;
    vertical-align: middle;
    margin-bottom: 10px;
    height: 30px;
    .item-left {
      float: left;
      line-height: 32px;
      .item-text {
        font-size: 20px;
        font-weight: bold;
      }
    }
    .item-right {
      float: right;
    }
  }
}

//商品购买信息
.info {
  border: 1px solid #dfe6ec;
  padding: 10px 0;
  display: flex;
  color: #606266;
  margin-bottom: 20px;

  .info-item {
    padding: 10px 8px;
    width: 20%;
    border-right: 1px dashed #dfe6ec;
    line-height: 28px;
    overflow: hidden;
    word-break: break-all;
    .el-link--inner {
      cursor: default;
    }
    &:nth-last-child(1) {
      border: none;
    }
    &.line {
      width: 100%;
      .line-content {
        display: flex;
        flex-direction: row;
        .con {
          margin-right: 20px;
        }
      }
    }
    .title {
      line-height: 16px;
      font-size: 16px;
      border-left: #409eff 2px solid;
      padding-left: 10px;
      margin-bottom: 16px;
    }
    .con {
      font-size: 14px;
      .lh18 {
        line-height: 18px;
      }
      .des {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        word-break: break-all;
      }
    }
  }
  .info-right {
    flex: 1;
  }
}

.el-timeline-item__content {
  color: inherit;
}
.el-timeline li:first-child {
  color: red !important;
}

// 详情表格
.detail-table {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  .detail-table-header {
    //width: 100%;
    background: #ebebeb;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    color: #606266;
    // padding: 10px;
    .header-left {
      display: flex;
      width: 30vw;
      .header-cell {
        flex: 1;
        text-align: center;
      }
    }
    .header-middle {
      display: flex;
      // width: 60vw;
      justify-content: space-between;
      .header-cell {
        flex: 1;
        text-align: center;
        width: 8vw;
      }
    }
    .header-right {
      display: flex;
      width: 10vw;
      .header-cell {
        //width: 8vw;
        flex: 1;
        text-align: center;
        padding: 10px;
      }
    }
    .header-cell {
      flex: 1;
      padding: 10px;
    }
  }
  .detail-table-body {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding:10px;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    align-items: stretch;
    color: #606266;
    //margin-bottom:20px;
    .body-left {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .detail-list {
        border-right: 1px solid #dfe6ec;
        .detail-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .detail-item-left {
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 30vw;
            border-right: 1px solid #dfe6ec;
            .item-cell {
              flex: 1;
              text-align: center;
              width: 8vw;
              padding: 10px;
              // border-right: 1px solid #ccc;
              border-bottom: 1px solid #dfe6ec;
              height: 120px;
              position: relative;
              .cell-text {
                text-align: left;
                word-break: break-all;
                line-height: 24px;
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
            .cell-con {
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
          }
          .detail-item-middle {
            display: flex;
            justify-content: center;
            align-items: center;
            .item-cell {
              flex: 1;
              text-align: center;
              width: 8vw;
              height: 120px;
              padding: 10px;
              border-bottom: 1px solid #dfe6ec;
              border-right: 1px solid #dfe6ec;
              flex-direction: column;
              &:nth-last-child(1) {
                border-right: none;
              }
              .cell-text {
                text-align: center;
                line-height: 24px;
                width: 100%;
              }
              .express {
                display: flex;
                flex-direction: row;
                white-space: nowrap;
                font-size: 12px;
                align-items: center;
                .number {
                  flex: 1;
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                }
                .copy {
                  cursor: pointer;
                  color: #2d8cf0;
                }
              }
            }
            .cell-con {
              display: flex;
              align-items: center;
              justify-content: center;
            }
          }
        }
      }
    }
    .body-cell {
      flex: 1;
      text-align: center;
    }
    .body-right {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #dfe6ec;
      .cell-text {
        flex: 1;
      }
    }
  }
}
.marginRight20 {
  margin-right: 20px;
}
.marginTop20 {
  margin-top: 20px;
}
.font12 {
  font-size: 12px;
}
.prescriptionA_img {
  .el-image {
    width: 30%;
    max-height: 300px;
    // img{
    //   width: 100%;
    //   height: 100%;
    // }
  }
}
.color-red {
  color: red;
}
.prescription {
  padding-top: 42px !important;
  padding-left: 30px !important;
}
</style>
