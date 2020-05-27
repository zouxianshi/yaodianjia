<template>
  <div v-loading="pageLoading" class="add" element-loading-text="加载中">
    <div class="payment-gift-rules">
      <h4>活动信息</h4>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" :disabled="disabled">
        <el-form-item label="活动名称：" prop="activityDetailName">
          <el-input
            v-model="form.activityDetailName"
            placeholder="请输入活动名称"
            clearable
            maxlength="30"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="活动时间：" prop="beginEndTime">
          <el-date-picker
            v-model="beginEndTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd HH:mm:ss"
            :picker-options="isDisabled"
            :default-time="['00:00:00','23:59:59']"
            @change="dateChange"
          />
        </el-form-item>

        <el-form-item label="活动说明：" prop="activityNote">
          <el-input
            v-model="form.activityNote"
            type="textarea"
            maxlength="200"
            placeholder="请输入活动说明"
            clearable
            show-word-limit
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="payment-gift-rules">
      <h4>活动规则</h4>
      <el-form
        ref="form2"
        label-width="100px"
        class="demo-form-inline"
        :rules="rules"
        :model="form"
        :disabled="disabled"
      >
        <el-form-item label="活动场景：" prop="sceneRuleReal">
          <el-checkbox-group v-model="form.sceneRuleReal">
            <el-checkbox :label="1">线上商城</el-checkbox>
            <el-checkbox :label="2">线下门店</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="活动门店：" prop="shopRule">
          <el-radio-group v-model="form.shopRule" @change="$refs.form2.clearValidate('shopRule')">
            <el-radio :label="1">全部门店</el-radio>
            <el-radio :label="2">
              指定门店
              <span
                v-if="form.shopRule===2&&!disabled"
                @click="$refs.storeComponent.open()"
              >选择门店</span>
            </el-radio>
          </el-radio-group>
          <mSelectedStore
            v-show="form.shopRule===2&&selectedStores.length>0"
            ref="selectedStoreView"
            @onDel="onGetSelectStore"
          />
        </el-form-item>
        <el-form-item label="适用商品：" prop="productRule">
          <el-radio-group v-model="form.productRule" @change="$refs.form2.clearValidate('productRule')">
            <el-radio :label="1">全部商品</el-radio>
            <el-radio :label="2">
              指定商品
              <span
                v-if="form.productRule===2&&!disabled"
                @click="$refs.GoodsComponent.open()"
              >选择商品</span>
            </el-radio>
          </el-radio-group>
          <mSelectedProduct
            v-show="form.productRule===2&&selectedProducts.length>0"
            ref="selectedProductView"
            @onDel="onGetSelectProduct"
          />
        </el-form-item>
        <el-form-item label="消费金额：" prop="useRule">
          <span class="amTips">
            <el-tooltip class="item" effect="light" placement="top-start">
              <i class="el-icon-question" />
              <div slot="content" style="width:500px;line-height:24px">
                <p>如选择指定商品，用户需要在限制门店中购买指定商品且满足金额才能推送优惠券</p>
                <p>例子，指定门店01,02,03门店，指定商品ABC，消费金额88元，用户购买的订单中只要包含A/B/C任意一款商品，
                  并订单总金额满足>=88元，系统将触发支付有礼活动</p>
              </div>
            </el-tooltip>
            购满金额
            <el-input-number
              v-model="form.useRule"
              style="width: 80px"
              :controls="false"
              :precision="2"
              size="mini"
              :min="1"
              :max="100000"
              label="请输入购满金额"
            />元，可参与活动
          </span>
        </el-form-item>
      </el-form>
    </div>
    <div class="payment-gift-rules">
      <h4>权益设置</h4>
      <el-form
        ref="form3"
        label-width="100px"
        class="demo-form-inline"
        :rules="rules"
        :model="form"
        :disabled="disabled"
      >
        <el-form-item label="选择权益：" prop="giftType">
          <el-radio-group v-model="form.giftType" @change="$refs.form3.clearValidate('giftType')">
            <el-radio :label="1">
              送优惠券
              <span class="zkTips">最多可选20张</span>
              <div
                v-if="form.giftType===1&&!disabled"
                class="from-clickable"
                @click="selectCoupon"
              >选择优惠券</div>
            </el-radio>
            <mSelectedCoupon
              v-show="form.giftType===1&&selectedCoupons.length>0"
              ref="selectedCouponView"
              @onDel="onGetSelectCoupon"
            />
            <el-radio :label="2">
              抽奖活动
              <span class="zkTips">只能选择1个</span>
              <div
                v-if="form.giftType===2&&!disabled"
                class="from-clickable"
                @click="selectActivity"
              >选择活动</div>
            </el-radio>
          </el-radio-group>
          <mSelectedActivity
            v-show="form.giftType===2&&selectedActivity.length>0"
            ref="selectedActivityView"
            @onDel="onGetSelectActivity"
          />
        </el-form-item>
        <el-form-item label="参与次数：" prop="countRule" required>
          <el-tooltip class="item" effect="light" placement="top-start">
            <i class="el-icon-question" style="position: relative;top:-20px;color:#606266" />
            <div slot="content" style="width:500px;line-height:24px">
              <p>为活动的参与的限制次数，如用户多次满足条件将根据此限制来判断给用户推送几次活动权益</p>
              <p>如设置不限制，那么用户每次消费到达条件后即送对应的优惠券和抽奖机会</p>
              <p>如设置为限制次数，那么用户参与活动达到条件后可获得权益的总次数，抽奖次数活动以抽奖设置的次数为准</p>
              <p>例子：设置消费门槛满100元，活动次数设置为2，抽奖次数设置为3，那么用户可最多可参与2次活动，且每次活动可抽奖2次</p>
            </div>
          </el-tooltip>
          <el-radio-group v-model="countRuleReal">
            <el-radio :label="0">
              不限次数
              <span class="zkTips">用户每次消费达到条件后即送</span>
            </el-radio>
            <el-radio :label="1">
              <span class="amTips">
                每人限制参与
                <el-input-number
                  v-model="form.countRule"
                  style="width: 80px"
                  :controls="false"
                  :precision="0"
                  size="mini"
                  :min="1"
                  :max="100000"
                  label="请输入次数"
                />次
              </span>
              <span class="zkTips">用户达到条件后可获得权益的总次数</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发放时间：" prop="sendRule" required>
          <el-radio-group v-model="form.sendRule">
            <el-radio :label="1">支付后发放</el-radio>
          </el-radio-group>
          <div class="zfTips">在下单付款完成并满足条件后，优惠券直接发送至用户卡包，用户将收到一条微信消息提醒</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="submit-box">
      <template v-if="!disabled">
        <el-button size="small" @click="$router.go(-1)">取 消</el-button>
        <el-button type="primary" size="small" :loading="saveLoading" @click="submitData()">提 交</el-button>
      </template>
      <el-button v-if="disabled" type="primary" size="small" @click="$router.go(-1)">返 回</el-button>
    </div>
    <store-dialog ref="storeComponent" :list="selectedStores" @complete="onGetSelectStore" />
    <mPopSelectActivity ref="selectActivity" :beginendtime="beginEndTime" @onSelect="onGetSelectActivity" />
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :list="selectedProducts"
      :store-ids="[]"
      @on-change="onGetSelectProduct"
    />
    <checkCoupon ref="checkCoupons" :timevalue="beginEndTime" @confincheck="onGetSelectCoupon" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import {
  createActivity,
  ActivityDetail,
  updateActivity,
  normalActivityAddedCouponList,
  normalAddedActivityList
} from '@/api/coupon'
import storeDialog from '../../../marketing/components/store'
import storeGoods from '../../../marketing/components/store-gods'
import checkCoupon from '@/components/Marketings/checkCoupon'
import mPopSelectActivity from '@/components/Marketings/popSelectActivity'
import mSelectedStore from '../../_source/SelectedStore'
import mSelectedCoupon from '../../_source/SelectedCoupon'
import mSelectedActivity from '../../_source/SelectedActivity'
import mSelectedProduct from '../../_source/SelectedProduct'
import { throttle } from '@/utils/throttle'
export default {
  name: 'PaymentGiftAdd',
  components: {
    checkCoupon,
    mSelectedStore,
    mSelectedProduct,
    mPopSelectActivity,
    mSelectedActivity,
    mSelectedCoupon,
    storeDialog,
    storeGoods
  },
  data() {
    const productRule_limit = (rule, value, callback) => {
      if (this.form.productRule === 2 && this.selectedProducts.length === 0) {
        callback(new Error('请选择商品'))
      }
      callback()
    }
    const shopRule_limit = (rule, value, callback) => {
      if (this.form.shopRule === 2 && this.selectedStores.length === 0) {
        callback(new Error('请选择门店'))
      }
      callback()
    }
    const giftType_limit = (rule, value, callback) => {
      console.log(this.selectedCoupons)
      if (this.form.giftType === 1) {
        if (this.selectedCoupons.length === 0) {
          callback(new Error('请选择优惠券'))
        } else if (this.selectedCoupons.length > 20) {
          callback(new Error('优惠券最多不能超过20张'))
        }
      } else if (this.form.giftType === 2) {
        if (this.selectedActivity.length === 0) {
          callback(new Error('请选择活动'))
        } else if (this.selectedActivity.length > 1) {
          callback(new Error('活动只能选择一个'))
        }
      }
      callback()
    }
    const time_limit = (rule, value, callback) => {
      if (this.beginEndTime.length === 0) {
        callback(new Error('请选择活动时间'))
      }
      callback()
    }
    return {
      isDisabled: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().getTime() - 86400000)
        }
      },
      beginEndTime: [],
      countRuleReal: 0,
      disabled: false,
      saveLoading: false, // 保存loading
      pageLoading: false, // 页面加载loading
      pageStatus: 1, // 1.新增 2.编辑 3.查看(特殊：编辑时，未开始到开始)
      form: {
        sceneRuleReal: [1],
        activityDetailName: '',
        activityGiftReqDTO: [],
        activityNote: '',
        activityPayReqDTO: [],
        activityTemplateCode: 'TC002',
        activityType: 1,
        beginTime: '',
        endTime: '',
        bottomNote: '',
        countRule: 1,
        countType: 1,
        integralRule: 1,
        joinRule: 0,
        listCouponProduct: [],
        listCouponStore: [],
        merCode: '',
        productRule: 1,
        returnRule: 1,
        // sceneRule: 0,
        sendRule: 1,
        shopRule: 1,
        useRule: '',
        giftType: 1
      },
      rules: {
        activityDetailName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        beginEndTime: [
          { required: true, validator: time_limit, trigger: 'blur' }
        ],
        // activityNote: [
        //   { required: true, message: '请输入活动说明', trigger: 'blur' }
        // ],
        productRule: [
          { required: true, validator: productRule_limit, trigger: 'blur' }
        ],
        useRule: [
          { required: true, message: '请输入消费金额', trigger: 'blur' }
        ],
        sceneRuleReal: [
          {
            required: true,
            type: 'array',
            message: '请选择活动场景',
            trigger: 'change'
          }
        ],
        shopRule: [
          { required: true, validator: shopRule_limit, trigger: 'blur' }
        ],
        giftType: [
          { required: true, validator: giftType_limit, trigger: 'blur' }
        ]
      },
      selectedActivity: [],
      selectedStores: [], // 已选的门店集合
      selectedCoupons: [],
      selectedProducts: [],
      form1Validate: false,
      form2Validate: false,
      form3Validate: false,
      tempRoute: {},
      pageTitle: '支付有礼'
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {
    selectedStores(newVal) {
      this.$refs.form2.validate()
    },
    selectedProducts(newVal) {
      this.$refs.form2.validate()
    },
    selectedCoupons(newVal) {
      this.$refs.form3.validate()
    },
    selectedActivity(newVal) {
      this.$refs.form3.validate()
    }
  },
  created() {
    const id = this.$route.query.id
    const op = this.$route.query.op
    if (id) {
      if (op === '1') {
        this.pageStatus = 3
        this.pageTitle = this.pageTitle + '详情'
        this.disabled = true
      } else {
        this.pageStatus = 2
        this.pageTitle = this.pageTitle + '编辑'
      }
      this._getDetailData(id)
    } else {
      this.pageTitle = this.pageTitle + '新增'
    }
    this.$route.meta.title = this.pageTitle
    // document.title = pageTitle
    this.tempRoute = Object.assign({}, this.$route)
    this.setTagsViewTitle(this.pageTitle)
  },

  methods: {
    dateChange() {
      this.selectedCoupons = []
      this.$refs.selectedCouponView.showPage(
        this.selectedCoupons,
        this.pageStatus
      )
    },
    // 选择门店
    selectStore() {
      this.$refs.selectStore.show(this.selectedStores)
    },
    selectActivity() {
      this.$refs.selectActivity.show(this.selectedActivity)
    },
    selectCoupon() {
      if (this.beginEndTime.length > 0) {
        this.$refs.checkCoupons.handleGetlist()
        this.$refs.checkCoupons.defaultcheck(this.selectedCoupons)
      } else {
        this.$message.error('请先选择活动时间')
      }
    },
    setTagsViewTitle(title) {
      const route = Object.assign({}, this.tempRoute, { title: `${title}` })
      this.$store.dispatch('tagsView/updateVisitedView', route)
    },
    doSubmitForm() {
      this.form.merCode = this.merCode
      if (this.form.sceneRuleReal.length === 2) {
        this.form.sceneRule = 0
      } else {
        this.form.sceneRule = this.form.sceneRuleReal[0]
      }
      if (this.beginEndTime) {
        this.form.beginTime = this.beginEndTime[0]
          .replace(/T/g, ' ')
          .replace(/Z/g, '')
        this.form.endTime = this.beginEndTime[1]
          .replace(/T/g, ' ')
          .replace(/Z/g, '')
      }
      if (this.form.shopRule === 2) {
        this.form.listCouponStore = []
        this.selectedStores.forEach(store => {
          this.form.listCouponStore.push({
            ruleType: 2,
            storeCode: store.storeCode || store.stCode,
            storeId: store.storeId || store.id,
            storeName: store.storeName || store.stName
          })
        })
      }
      if (this.countRuleReal === 0) {
        this.form.countRule = 0
      }
      if (this.form.productRule === 2) {
        this.form.listCouponProduct = []
        this.selectedProducts.forEach(product => {
          this.form.listCouponProduct.push({
            proBrand: product.proBrand || product.brandName,
            proCode: product.proCode || product.erpCode,
            proId: product.proId || product.specId,
            proName: product.proName || product.name,
            proPrice: product.proPrice || product.mprice || product.price,
            proImg: product.proImg || product.picUrl,
            proSpec: product.specStr || product.proSpec,
            specId: product.specId,
            ruleType: 2
          })
        })
      }
      if (this.form.giftType === 1 && this.selectedCoupons.length > 0) {
        this.form.activityPayReqDTO = []
        this.selectedCoupons.forEach(coupon => {
          this.form.activityPayReqDTO.push({
            giftId: coupon.id,
            giftNum: coupon.giftNum,
            giftType: 1
          })
        })
      }
      if (this.form.giftType === 2 && this.selectedActivity.length > 0) {
        this.form.activityPayReqDTO = []
        this.selectedActivity.forEach(activity => {
          this.form.activityPayReqDTO.push({
            giftId: activity.id,
            giftType: 2
          })
        })
      }
      var params = {}
      params = JSON.parse(JSON.stringify(this.form))
      this.saveLoading = true
      if (this.pageStatus === 1) {
        console.log('createActivity', JSON.stringify(params))
        createActivity(params)
          .then(res => {
            this.saveLoading = false
            if (res.code === '10000') {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.replace(
                '/marketings/activity-manage/payment-gift/list'
              )
            }
          })
          .catch(_ => {
            this.saveLoading = false
          })
      } else {
        delete params['createName']
        delete params['createTime']
        delete params['giftType']
        delete params['isValid']
        delete params['status']
        delete params['updateName']
        delete params['updateTime']
        delete params['sceneRuleReal']
        delete params['listCouponStoreEntity']
        delete params['listCouponProductEntity']
        delete params['listActivityGiftEntity']
        delete params['listActivityPayEntity']
        updateActivity(params)
          .then(res => {
            this.saveLoading = false
            if (res.code === '10000') {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.replace(
                '/marketings/activity-manage/payment-gift/list'
              )
            }
          })
          .catch(_ => {
            this.saveLoading = false
          })
      }
    },

    submitData: throttle(function() {
      const p1 = new Promise((resolve, reject) => {
        this.$refs.form.validate(valid => {
          if (valid) resolve()
        })
      })
      const p2 = new Promise((resolve, reject) => {
        this.$refs.form2.validate(valid => {
          if (valid) resolve()
        })
      })
      const p3 = new Promise((resolve, reject) => {
        this.$refs.form3.validate(valid => {
          if (valid) resolve()
        })
      })
      Promise.all([p1, p2, p3]).then(() => {
        this.doSubmitForm()
      })
    }, 3000),
    onGetSelectStore(selectedStores) {
      selectedStores.map(item => {
        item.id = item.storeId || item.id
      })
      this.selectedStores = selectedStores
      this.$refs.selectedStoreView.showPage(selectedStores, this.pageStatus)
    },
    onGetSelectActivity(selectedActivity) {
      this.selectedActivity = selectedActivity
      this.$refs.selectedActivityView.showPage(
        selectedActivity,
        this.pageStatus
      )
    },
    onGetSelectCoupon(selectedCoupons) {
      this.selectedCoupons = selectedCoupons
      this.$refs.selectedCouponView.showPage(selectedCoupons, this.pageStatus)
    },
    onGetSelectProduct(selectedProducts) {
      console.log(selectedProducts)
      selectedProducts.map(item => {
        item.id = item.proId || item.id
        item.proImg = item.picUrl || item.proImg
        item.proSpec = item.specStr || item.proSpec
      })
      this.selectedProducts = selectedProducts
      this.$refs.selectedProductView.showPage(
        this.selectedProducts,
        this.pageStatus
      )
    },
    updateActivityStatus(activity) {
      console.log('activity', activity)
      if (activity.status && activity.timeStatus === -1) {
        // 未开始
      } else if (activity.status && activity.timeStatus === 1) {
        // 进行中
        this.pageStatus = 3
        this.disabled = true
        this.$message.warning('活动已开始！')
      } else if (activity.status || activity.timeStatus === 0) {
        // 已结束
        this.pageStatus = 3
        this.disabled = true
        this.$message('活动已结束！')
      }
    },
    _getDetailData(id) {
      this.pageLoading = true
      const params = {
        id: id
      }
      this.form.sceneRuleReal = [1, 2]
      console.log('params detail', JSON.stringify(params))
      ActivityDetail(params)
        .then(res => {
          if (res.code === '10000') {
            if (res.data.sceneRule === 0) {
              res.data.sceneRuleReal = [1, 2]
            } else {
              res.data.sceneRuleReal = []
              res.data.sceneRuleReal.push(res.data.sceneRule)
            }
            this.countRuleReal = res.data.countRule === 0 ? 0 : 1
            res.data['removedList'] = []
            res.data.listActivityPayEntity.forEach(item => {
              if (!res.data.giftType) {
                res.data.giftType = item.giftType
              }
              res.data['removedList'].push(item.id)
            })
            // this.form = _.cloneDeep(res.data)
            this.form = Object.assign({}, this.form, res.data)
            this.beginEndTime = [
              res.data.beginTime.replace(/T/g, ' ').replace(/Z/g, ''),
              res.data.endTime.replace(/T/g, ' ').replace(/Z/g, '')
            ]
            this.selectedStores = res.data.listCouponStoreEntity.map(item => {
              return {
                stCode: item.storeCode,
                storeId: item.storeId,
                stName: item.storeName,
                id: item.id,
                address: '',
                busId: item.busId,
                ruleType: item.ruleType
              }
            })
            this.onGetSelectStore(this.selectedStores)
            this.selectedProducts = res.data.listCouponProductEntity.map(
              item => {
                return {
                  busId: item.busId,
                  ruleType: item.ruleType,
                  id: item.id,
                  proId: item.proId,
                  proImg: item.proImg,
                  erpCode: item.proCode,
                  name: item.proName,
                  brandName: item.proBrand,
                  proSpec: item.proSpec,
                  specId: item.proId,
                  price: item.proPrice
                }
              }
            )
            this.onGetSelectProduct(this.selectedProducts)

            // 编辑状态时，更新页面当前状态
            // if (this.pageStatus === 2) {
            //   this.updateActivityStatus(data)
            // }
          }

          this.pageLoading = false
        })
        .catch(err => {
          this.pageLoading = false
          console.log('err', err)
        })
      this._getAddedCouponList(id)
      this._getAddedActivityList(id)
    },
    _getAddedCouponList(id) {
      const params = { currentPage: 1, id: id, pageSize: 9999 }
      console.log('normalActivityAddedCouponList', JSON.stringify(params))
      normalActivityAddedCouponList(params)
        .then(res => {
          if (res.code === '10000' && res.data.records.length > 0) {
            this.selectedCoupons = _.cloneDeep(res.data.records)
            this.onGetSelectCoupon(this.selectedCoupons)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    },
    _getAddedActivityList(id) {
      const params = { currentPage: 1, id: id, pageSize: 9999 }
      console.log('normalAddedActivityList', JSON.stringify(params))
      normalAddedActivityList(params)
        .then(res => {
          if (res.code === '10000' && res.data.records.length > 0) {
            this.selectedActivity = _.cloneDeep(res.data.records)
            this.onGetSelectActivity(this.selectedActivity)
            this.$refs[this.form].resetFields(this.form)
          }
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  padding: 10px 61px;
  height: calc(100vh - 158px);
  overflow-y: scroll;
  .payment-gift-info,
  .payment-gift-rules {
    // padding: 20px 0;
    form {
      padding-left: 15%;
      width: 90%;
      .inline-input {
        width: 80px;
      }
      .zkTips {
        color: #999;
        margin-left: 10px;
      }
      .zfTips {
        color: #999;
      }
      .amTips {
        color: #606266;
      }
      .el-radio-group {
        display: inline-block;
        line-height: inherit;
        /* vertical-align: text-top; */
        font-size: 0;
        width: 100px;
        margin-top: 3px;
      }
    }
    h4 {
      height: 30px;
      line-height: 30px;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 21px;
      border-bottom: 1px solid #eee;
      .rule-tips {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .tips {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 10px;
      line-height: 14px;
    }
  }
  // .payment-gift-rules {
  //   border-top: 1px solid #eee;
  //   border-bottom: 1px solid #eee;
  // }
  .submit-box {
    text-align: center;
    margin-top: 20px;
  }
  .set-store {
    margin-left: 20px;
  }
  .from-clickable {
    padding: 15px 0 0 24px;
  }
}
</style>
