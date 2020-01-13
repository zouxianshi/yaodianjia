<template>
  <div class="app-container">
    <div :model="detailsData" class="order-list">
      <div class="wrapper">
        <div class="item">
          <div class="item-left">
            订单号：{{ detailsData.serialNumber }}
            <template v-if="detailsData.prescriptionSheetMark==='1'">（{{ detailsData.prescriptionSheetMark | orderType }}）</template>
          </div>
          <div class="item-right"><el-button type="primary" size="mini">补推到ERP</el-button></div>
        </div>
        <div class="item">
          <div class="item-left">
            <div class="color-red item-text">
              <template v-if="detailsData.prescriptionSheetMark === '1'">
                <template v-if="detailsData.prescriptionStatus===0||detailsData.prescriptionStatus===1">
                  <template v-if="detailsData.orderStatus===6">
                    <template v-if="detailsData.deliveryType===2">
                      <span>待提货</span>
                    </template>
                    <template v-else>
                      <span>已发货</span>
                    </template>
                  </template>
                  <template v-else>
                    {{ detailsData.orderStatus | orderStatus }}
                  </template>
                  <span class="f16">（处方待审批）</span>
                </template>
                <template v-if="detailsData.prescriptionStatus===3">
                  <template v-if="detailsData.orderStatus===6">
                    <template v-if="detailsData.deliveryType===2">
                      <span>待提货</span>
                    </template>
                    <template v-else>
                      <span>已发货</span>
                    </template>
                  </template>
                  <template v-else>
                    {{ detailsData.orderStatus | orderStatus }}
                  </template>
                  <span>（审批未通过）</span>
                </template>
              </template>
              <template v-if="detailsData.prescriptionSheetMark === '0'||detailsData.prescriptionStatus===2">
                <template v-if="detailsData.orderStatus===6">
                  <template v-if="detailsData.deliveryType===2">
                    <span>待提货</span>
                  </template>
                  <template v-else>
                    <span>已发货</span>
                  </template>
                </template>
                <template v-else>
                  {{ detailsData.orderStatus | orderStatus }}
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
          <div class="con">账号：<template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.member_phone }}</template><template v-else>无</template></div>
          <div class="con">会员卡：<template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.card_number }}</template><template v-else>无</template></div>
          <div class="con">姓名：<template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.member_name }}</template><template v-else>无</template></div>
          <div class="con">身份证号：<template v-if="detailsData.memberInfoVo">{{ detailsData.memberInfoVo.idcard }}</template><template v-else>无</template></div>
        </div>
        <div class="info-item">
          <template v-if="detailsData.deliveryType===2">
            <div class="title">提货信息</div>
            <div class="con">提货门店：<template v-if="detailsData.storeResDTO">{{ detailsData.storeResDTO.stName }}</template><template v-else>无</template></div>
            <div class="con">
              <div class="lh18">提货地址：<template v-if="detailsData.storeResDTO">{{ detailsData.storeResDTO.address }}</template><template v-else>无</template></div>
            </div>
            <div class="con">联系电话：<template v-if="detailsData.storeResDTO">{{ detailsData.storeResDTO.mobile }}</template><template v-else>无</template></div>
            <div class="con">发票：{{ detailsData.isInvoice ? '需要':'不需要' }}</div>
            <div class="con">备注：{{ detailsData.orderRemark ? detailsData.orderRemark :'无' }}</div>
          </template>
          <template v-else>
            <div class="title">收货人信息</div>
            <div class="con">姓名：<template v-if="detailsData.orderDeliveryAddress">{{ detailsData.orderDeliveryAddress.receiver }}</template><template v-else>无</template></div>
            <div class="con">电话：<template v-if="detailsData.orderDeliveryAddress">{{ detailsData.orderDeliveryAddress.receiverMobile }}</template><template v-else>无</template></div>
            <div class="con">
              <div class="lh18">地址：<template v-if="detailsData.orderDeliveryAddress">{{ detailsData.orderDeliveryAddress.fullDetaiAddress }}</template><template v-else>无</template></div>
            </div>
            <div class="con">发票：{{ detailsData.isInvoice ? '需要':'不需要' }}</div>
            <div class="con">备注：{{ detailsData.orderRemark ? detailsData.orderRemark :'无' }}</div>
          </template>
        </div>
        <div class="info-item">
          <div class="title">订单信息</div>
          <div class="con">下单时间：{{ detailsData.orderTime }}</div>
          <!-- <div class="con">下单门店：{{ detailsData.storeName }}</div> -->
          <div class="con">发货门店：<template v-if="detailsData.storeResDTO && detailsData.storeResDTO.stName"><span>{{ detailsData.storeResDTO.stName }}</span></template></div>
          <div class="con">收货方式：
            <template v-if="detailsData.deliveryType===0">快递配送</template>
            <template v-if="detailsData.deliveryType===1">门店员工配送</template>
            <template v-if="detailsData.deliveryType===2">门店自提</template>
            <!-- {{ detailsData.deliveryType ?'门店员工配送':'快递配送' }} -->
          </div>
          <div class="con">订单来源：微商城</div>
          <div class="con">订单类型：{{ detailsData.prescriptionSheetMark | orderType }}</div>
          <div v-if="detailsData.orderStatus!==6" class="con">配送方式：{{ detailsData.deliveryType ?'门店员工配送':'快递配送' }}</div>
        </div>
        <div class="info-item">
          <div class="title">付款信息</div>
          <div class="con">付款方式：{{ detailsData.payMode ? '货到付款':'在线支付' }}</div>
          <div class="con">商品总额：￥{{ detailsData.totalOrderAmount }}</div>
          <div class="con">运费：￥{{ detailsData.actualFreightAmount }}</div>
          <div class="con">优惠：￥{{ detailsData.couponDeduction }}</div>
          <div class="con">应付总额：￥{{ detailsData.totalActualOrderAmount }}</div>
        </div>
        <div class="info-item">
          <div class="title">操作人信息</div>
          <div class="con">推广员：	无</div>
          <!-- <div class="con">退款操作人：	<template v-if="detailsData.returnList">{{ detailsData.returnList.modifyName }}</template><template v-else><span>无</span></template></div>
          <div class="con">退款申请时间：<template v-if="detailsData.returnList">{{ detailsData.returnList.createTime }}</template><template v-else><span>无</span></template></div>
          <div class="con">退款处理时间：<template v-if="detailsData.returnList">{{ detailsData.returnList.modifyTime }}</template><template v-else><span>无</span></template></div> -->
        </div>
      </div>

      <!-- 物流信息 --发货物流-->
      <template v-if="detailsData.recordList && (detailsData.orderStatus===6 ||detailsData.orderStatus===8||detailsData.orderStatus===12||detailsData.orderStatus===30)">
        <div v-for="(item,indexSend) in detailsData.recordList" :key="item.id" class="info">
          <div class="info-item info-left">
            <div class="title">配送信息{{ indexSend+1 }}</div>
            <div class="con">配送方式：{{ detailsData.deliveryType ?'门店员工配送':'快递配送' }}</div>
            <div class="con">快递公司：{{ item.companyName }}</div>
            <div class="con">快递单号：{{ item.number }}</div>
          </div>
          <div class="info-item info-right">
            <div class="title">物流信息</div>
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
                >
                  {{ logistical.timestamp }}{{ logistical.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
          </div>
        </div>
      </template>

      <!-- 处方申请单 -->
      <template v-if="detailsData.prescriptionSheetMark==='1'&&detailsData.prescriptionApproval">
        <div class="info">
          <div class="info-item info-left">
            <div class="title">处方申请单</div>
            <div class="con">用药人：<template v-if="detailsData.prescriptionApproval.userName">{{ detailsData.prescriptionApproval.userName }}</template></div>
            <div class="con">性别：
              <template v-if=" handlerAnalyzeIDCard(detailsData.prescriptionApproval.cerNo).sex==='1'">
                男
              </template>
              <template v-else>女</template>
            </div>
            <div class="con">年龄：{{ handlerAnalyzeIDCard(detailsData.prescriptionApproval.cerNo).age }} 岁</div>
            <div class="con">过敏史：{{ detailsData.prescriptionApproval.allergyHistory ? '有':'无' }}</div>
            <div class="con">身份证：{{ detailsData.prescriptionApproval.cerNo }}</div>
          </div>
          <div class="info-item info-right">
            <div class="block prescriptionA_img">
              <div
                v-if="detailsData.prescriptionApproval.image && detailsData.prescriptionApproval.image!==''"
              >
                <span v-for="(picItem,picPrescIndex) in detailsData.prescriptionApproval.image" :key="picPrescIndex" class="x-image__preview marginRight20">
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

      <!-- 退款原因 -->
      <template v-if="detailsData.returnList && (detailsData.orderStatus===8||detailsData.orderStatus===10||detailsData.orderStatus===30)">
        <div v-for="(item,indexReturn) in detailsData.returnList" :key="indexReturn" class="info">
          <div class="info-item info-left">
            <div class="con">退款原因：{{ item.refundReason }}</div>
            <div class="con">退款说明：{{ item.refundReturnDesc }}</div>
            <template v-if="item.modifyName"><div class="con">退款操作人：{{ item.modifyName }}</div></template>
            <template v-if="item.createTime"><div class="con">退款申请时间：{{ item.createTime }}</div></template>
            <template v-if="item.modifyTime"><div class="con">退款处理时间：{{ item.modifyTime }}</div></template>
          </div>
          <div class="info-item info-right">
            <div class="block prescriptionA_img">
              <div
                v-if="item.pictureVoucher && item.pictureVoucher!==''"
              >
                <span v-for="(picItem,picIndex) in item.pictureVoucher" :key="picIndex" class="x-image__preview marginRight20">
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

      <!-- 物流信息 --退货物流-->
      <template v-if="detailsData.retRecordList && (detailsData.orderStatus===8||detailsData.orderStatus===30)">
        <div v-for="(item,indexReturn) in detailsData.retRecordList" :key="indexReturn" class="info">
          <div class="info-item info-left">
            <div class="title">退货信息</div>
            <div class="con">配送方式：{{ detailsData.deliveryType ?'门店员工配送':'快递配送' }}</div>
            <div class="con">快递公司：{{ item.companyName }}</div>
            <div class="con">快递单号：{{ item.number }}</div>
          </div>
          <div class="info-item info-right">
            <div class="title">物流信息</div>
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
                >
                  {{ logistical.timestamp }}{{ logistical.content }}
                </el-timeline-item>
              </el-timeline>
            </div>
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
                <div class="header-cell">药店加优惠</div>
                <div class="header-cell">状态</div>
              </div>
              <div class="header-right">
                <div class="header-cell">运费（元）</div>
              </div>
            </div>

            <div class="detail-table-body">
              <div class="body-cell body-left">
                <div class="detail-list">
                  <div v-for="(item,detailsIndex) in detailsData.detailList" :key="detailsIndex" class="detail-item">
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
                        <div class="cell-text">￥{{ item.commodityPrice }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">{{ item.commodityNumber }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">￥{{ item.totalActualAmount }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">{{ item.couponAmount }}</div>
                      </div>
                      <div class="item-cell cell-con">
                        <div class="cell-text">
                          <template v-if="item.status===6">
                            <template v-if="detailsData.deliveryType===2">待提货</template>
                            <template v-else>已发货</template>
                          </template>
                          <template v-else>{{ item.status | orderStatus }}</template>
                          <div v-if="item.orderPackage && item.status!==8 && item.status!==10 && item.status!==20 && item.status!==30" class="marginTop20">
                            <span class="font12">快递单号</span><span class="font12">{{ item.orderPackage.packageNo }}</span>
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
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { getOrderDetail } from '@/api/order'
export default {
  filters: {
    orderType: function(value) { // 订单类型
      if (value === '0') {
        return '普通订单'
      }
      if (value === '1') {
        return '处方药'
      }
      // if (value === 'V') {
      //   return '积分订单'
      // }
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
    payment: function(value) { // 支付方式
      if (value === 0) {
        return '在线支付'
      }
      if (value === 1) {
        return '货到付款'
      }
    },
    deliveryType: function(value) { // 配送方式
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
      detailsData: {},
      dialogVisible: false,
      loading: false,
      selectloading: false,
      sendLogisticals: [
        // { // 发货物流信息
      //   content: '2019-10-14 07:24:31[淮北市]离开【淮北邮件处理中心】,下一站【淮北濉溪韩村支局】',
      //   timestamp: '2019-10-14 07:24:31',
      //   color: 'red'
      // }, {
      //   content: '2019-10-13 12:37:49[淮北市]到达【淮北邮件处理中心】',
      //   timestamp: '2019-10-13 12:37:49',
      //   size: 'large'
      // }, {
      //   content: '2019-10-10 14:05:59[合肥市]到达【合肥中心】',
      //   timestamp: '2019-10-10 14:05:59',
      //   size: 'large'
      // }, {
      //   content: '2019-10-10 12:56:13[合肥市]【邮政合肥市包裹业务局】已收件,揽投员:周磊,电话:15156693985',
      //   timestamp: '2019-10-10 12:56:13'
      // }],
      // refundLogisticals: [{ // 退货物流信息
      //   content: '2019-10-14 07:24:31[淮北市]离开【淮北邮件处理中心】,下一站【淮北濉溪韩村支局】',
      //   timestamp: '2019-10-14 07:24:31',
      //   color: 'red'
      // }, {
      //   content: '2019-10-13 12:37:49[淮北市]到达【淮北邮件处理中心】',
      //   timestamp: '2019-10-13 12:37:49',
      //   size: 'large'
      // }, {
      //   content: '2019-10-10 14:05:59[合肥市]到达【合肥中心】',
      //   timestamp: '2019-10-10 14:05:59',
      //   size: 'large'
      // }, {
      //   content: '2019-10-10 12:56:13[合肥市]【邮政合肥市包裹业务局】已收件,揽投员:周磊,电话:15156693985',
      //   timestamp: '2019-10-10 12:56:13'
      // }
      ],
      refundLogisticals: [], // 退货物流信息
      subLoading: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name'])
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
      getOrderDetail(dataParams).then(res => { // 获取商品详情
        // console.log('details', res.data)
        this.detailsData = res.data
        // console.log('this.detailsData.recordList:', this.detailsData.recordList)
        const recordListData = this.detailsData.recordList
        if (this.detailsData.recordList) { // 发货物流
          recordListData.forEach((item, index) => {
            const paramsSend = JSON.parse(item.data)
            this.sendLogisticals[index] = this.logisticsFormat(paramsSend)
          })
          // console.log('this.sendLogisticals:', this.sendLogisticals)
        }

        const retRecordListData = this.detailsData.retRecordList
        console.log('retRecordListData:', retRecordListData)

        if (this.detailsData.retRecordList) { // 退货物流
          retRecordListData.forEach((item, index) => {
            const paramsRefund = JSON.parse(item.data)
            console.log('paramsRefund:', paramsRefund)

            this.refundLogisticals[index] = this.logisticsFormat(paramsRefund)
          })
        }
        if (this.detailsData.returnList && this.detailsData.returnList.length > 0) { // 处理用逗号分隔的图片成数组
          for (let i = 0; i < this.detailsData.returnList.length; i++) {
            if (this.detailsData.returnList[i].pictureVoucher && this.detailsData.returnList[i].pictureVoucher !== '') {
              this.detailsData.returnList[i].pictureVoucher = this.picFormat(this.detailsData.returnList[i].pictureVoucher)
            }
          }
        }

        if (this.detailsData.prescriptionApproval && this.detailsData.prescriptionApproval.image !== '') { // 处理处方单逗号分隔的图片成数组
          this.detailsData.prescriptionApproval.image = this.picFormat(this.detailsData.prescriptionApproval.image)
        }
      })
    },
    picFormat(data) { // 格式化图片凭证  用逗号分隔的
      let pics = []
      pics = data // 图片凭证
      pics = pics.split(',')
      return pics
    },
    picFormatSemicolon(data) { // 格式化图片凭证 用分号分隔的
      let pics = []
      pics = data // 图片凭证
      pics = pics.split(';')
      return pics
    },
    logisticsFormat(data) { // 格式化物流信息
      // console.log('物流data:', data)
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
      return arr
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

      if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(IDCard))) {
        console.warn('into reg')
        msgObj.isValid = false
        return msgObj
      }

      const getCardInfos = (IDCard) => {
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
      if (cardInfos.yearBirth < 1900 || cardInfos.yearBirth > new Date().getFullYear() || cardInfos.monthBirth > 12 || cardInfos.dayBirth > 31) {
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
      if (monthNow < monthBirth || (monthNow === monthBirth && dayNow < dayBirth)) {
        age--
      }
      // 得到年龄
      msgObj.age = age

      // 返回解析信息对象
      return msgObj
    }

  }
}
</script>
<style lang="scss">
.store-goods-wrapper {
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

// 商品状态
.wrapper{
  width: 100%;
  border: 1px solid #dfe6ec;
  background:#fafafa;
  padding:20px;
  margin-bottom: 20px;
  .item{
    clear: both;
    vertical-align: middle;
    margin-bottom: 10px;
    height: 30px;
    .item-left{
      float: left;
      line-height: 32px;
      .item-text{
        font-size: 20px;
        font-weight: bold;
      }
    }
    .item-right{
      float:right;
    }
  }
}

//商品购买信息
.info{
  border: 1px solid #dfe6ec;
  padding: 10px 0;
  display: flex;
  color: #606266;
  margin-bottom: 20px;
  .info-item{
    padding:10px;
    width: 20%;
    border-right:1px dashed #dfe6ec;
    line-height: 28px;
    overflow: hidden;
    word-break: break-all;
    &:nth-last-child(1){
      border:none;
    }
    .title{
      line-height: 16px;
      font-size: 16px;
      border-left: #409eff 2px solid;
      padding-left: 10px;
      margin-bottom: 16px;
    }
    .con{
      font-size: 14px;
      .lh18{
        line-height: 18px;
      }
    }
  }
  .info-right{
    flex:1;
  }
}

.el-timeline-item__content {
     color:inherit
     }
.el-timeline li:first-child{ color:red!important;}

// 详情表格
.detail-table{
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  .detail-table-header{
    //width: 100%;
    background: #ebebeb;
    display: flex;
    justify-content:flex-start;
    align-items: center;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    color: #606266;
    // padding: 10px;
    .header-left{
      display:flex;
      width: 30vw;
      .header-cell{
        flex:1;
        text-align: center;
      }
    }
    .header-middle{
      display:flex;
      // width: 60vw;
      justify-content: space-between;
      .header-cell{
        flex:1 ;
        text-align: center;
        width: 8vw;
      }
    }
    .header-right{
      display:flex;
      width: 10vw;
      .header-cell{
        //width: 8vw;
        flex:1 ;
        text-align: center;
        padding:10px;
      }
    }
    .header-cell{
       flex:1 ;
       padding:10px;
    }
  }
  .detail-table-body{
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
    .body-left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .detail-list{
        border-right: 1px solid #dfe6ec;
        .detail-item{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .detail-item-left{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 30vw;
            border-right: 1px solid #dfe6ec;
            .item-cell{
              flex:1;
              text-align: center;
              width: 8vw;
              padding:10px;
              // border-right: 1px solid #ccc;
              border-bottom:1px solid #dfe6ec;
              height: 120px;
              .cell-text{
                text-align: left;
                word-break: break-all;
              }
            }
            .cell-con{
                display: flex;
                align-items: center;
                justify-content: center;
            }
          }
          .detail-item-middle{
            display: flex;
            justify-content: center;
            align-items: center;
            .item-cell{
              flex:1;
              text-align: center;
              width: 8vw;
              height: 120px;
              padding:10px;
              border-bottom:1px solid #dfe6ec;
              border-right: 1px solid #dfe6ec;
              &:nth-last-child(1){
                border-right: none;
              }
              .cell-text{
                text-align: center;
              }
            }
            .cell-con{
                display: flex;
                align-items: center;
                justify-content: center;
            }
          }
        }
      }
    }
    .body-cell{
      flex: 1;
      text-align: center;
    }
    .body-right{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #dfe6ec;
      .cell-text{
        flex:1;
      }
    }
  }
}
.marginRight20{margin-right: 20px}
.marginTop20{margin-top:20px}
.font12{font-size: 12px}
.prescriptionA_img {
  .el-image{
    width: 30%;
    max-height: 300px;
    // img{
    //   width: 100%;
    //   height: 100%;
    // }
  }
}
</style>
