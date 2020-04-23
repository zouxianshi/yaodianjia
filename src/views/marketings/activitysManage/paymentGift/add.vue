<template>
  <div class="add">
    <div v-loading="pageLoading" class="payment-gift-rules" element-loading-text="加载中">
      <h4>活动信息</h4>
      <el-form ref="form" :rules="rules" :model="form" label-width="100px" :disabled="disabled">
        <el-form-item label="活动名称：" prop="name">
          <el-input v-model="form.name" maxlength="30" placeholder="请输入活动名称" clearable />
        </el-form-item>
        <el-form-item label="活动时间：" prop="huodongshijian">
          <el-date-picker
            v-model="form.huodongshijian"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item label="活动说明：" prop="desc">
          <el-input
            v-model="form.desc"
            type="textarea"
            maxlength="200"
            placeholder="请输入活动说明"
            clearable
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="payment-gift-rules">
      <h4>活动规则</h4>
      <el-form ref="form" label-width="100px" class="demo-form-inline" :rules="rules" :model="form" :disabled="disabled">
        <el-form-item label="活动范围：">
          <el-radio-group v-model="form.range">
            <el-radio label="0">线上商城</el-radio>
            <el-radio label="1">线下门店</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="活动门店：" prop="store">
          <el-radio-group v-model="form.store">
            <el-radio label="0">全部门店</el-radio>
            <el-radio label="1">指定门店
              <span v-if="form.store==='1'&&!disabled" @click="selectStore">选择门店</span>
            </el-radio>
          </el-radio-group>
          <mSelectedStore v-show="form.store==='1'&&selectedStores.length>0" ref="selectedStoreView" @onDel="onGetSelectStore" />
        </el-form-item>
        <el-form-item label="适用商品：" prop="product">
          <el-radio-group v-model="form.product">
            <el-radio label="0">全部商品</el-radio>
            <el-radio label="1">指定商品
              <span v-if="form.product==='1'&&!disabled" @click="selectProduct">选择商品</span>
            </el-radio>
          </el-radio-group>
          <mSelectedProduct v-show="form.product==='1'&&selectedProducts.length>0" ref="selectedProductView" @onDel="onGetSelectProduct" />
        </el-form-item>
        <el-form-item label="消费金额：" prop="amount">
          <span class="amTips">
            购满金额
            <el-input v-model.number="form.amount" size="mini" style="width:80px" /> 元，可参与活动
          </span>
        </el-form-item>
      </el-form>
    </div>
    <div class="payment-gift-rules">
      <h4>权益设置</h4>
      <el-form ref="form" label-width="100px" class="demo-form-inline" :rules="rules" :model="form" :disabled="disabled">
        <el-form-item label="选择权益：" prop="coupon">
          <el-radio-group v-model="form.coupon">
            <el-radio label="0">送优惠券
              <span class="zkTips">最多可选二十张</span>
              <div v-if="form.coupon==='0'&&!disabled" class="from-clickable" @click="selectStore">选择优惠券</div>
            </el-radio>
            <mSelectedCoupon v-show="form.store==='1'&&selectedCoupons.length>0" ref="selectedCouponView" @onDel="onGetSelectCoupon" />
            <el-radio label="1">抽奖活动
              <span class="zkTips">只能选择一个</span>
              <div v-if="form.coupon==='1'&&!disabled" class="from-clickable" @click="selectActivity">选择活动</div>
            </el-radio>
          </el-radio-group>
          <mSelectedActivity v-show="form.coupon==='1'&&selectedActivity.length>0" ref="selectedActivityView" @onDel="onGetSelectActivity" />
        </el-form-item>
        <el-form-item label="参与次数">
          <el-radio-group v-model="form.range">
            <el-radio label="0">不限次数
              <span class="zkTips">用户每次消费达到条件后即送</span>
            </el-radio>
            <el-radio label="1"><span class="amTips">
              每人限制参与
              <el-input v-model.number="form.amount" size="mini" style="width:80px" /> 次
            </span><span class="zkTips">用户达到条件后可获得权益的总次数</span></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="发放时间：" prop="fafangshijian">
          <el-radio-group v-model="form.fafangshijian">
            <el-radio label="0">支付后发放</el-radio>
            <el-radio label="1">订单完成时发放</el-radio>
          </el-radio-group>
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
    <mPopSelectStore ref="selectStore" @onSelect="onGetSelectStore" />
    <mPopSelectActivity ref="selectActivity" @onSelect="onGetSelectActivity" />
    <mPopSelectProduct ref="selectProduct" @onSelect="onGetSelectProduct" />
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import mPopSelectStore from '@/components/Marketings/popSelectStore'
import mPopSelectActivity from '@/components/Marketings/popSelectActivity'
import mPopSelectProduct from '@/components/Marketings/popSelectProduct'
import mSelectedStore from '../../_source/SelectedStore'
import mSelectedCoupon from '../../_source/SelectedCoupon'
import mSelectedActivity from '../../_source/SelectedActivity'
import mSelectedProduct from '../../_source/SelectedProduct'
export default {
  name: 'PaymentGiftAdd',
  components: {
    mPopSelectStore, mSelectedStore, mPopSelectProduct, mSelectedProduct, mPopSelectActivity, mSelectedActivity, mSelectedCoupon
  },
  data() {
    const amount_limit = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (value !== '' && reg.test(value)) {
        callback(new Error('购满金额必须是数字且不得小于0'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    return {
      disabled: false,
      saveLoading: false, // 保存loading
      pageLoading: false, // 页面加载loading
      pageStatus: 1, // 1.新增 2.编辑 3.查看(特殊：编辑时，未开始到开始)
      form: {
        huodongshijian: [], // 活动时间
        name: '', // 活动名称
        desc: '', // 活动说明
        range: '0', // 活动范围
        amount: 0, // 金额
        store: '0', // 门店
        product: '0', // 指定商品
        fafangshijian: '0', // 发放时间
        coupon: '0' // 优惠券
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        huodongshijian: [
          { required: true, message: '请选择活动时间', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '请输入活动说明', trigger: 'blur' }],
        store: [{ required: true, message: '请选择活动门店', trigger: 'blur' }],
        amount: [
          { required: true, validator: amount_limit, trigger: 'blur' }
        ],
        coupon: [
          { required: true, message: '请选择优惠券', trigger: 'blur' }
        ],
        product: [
          { required: true, message: '请选择指定商品', trigger: 'blur' }
        ],
        fafangshijian: [
          { required: true, message: '请选择发放时间', trigger: 'blur' }
        ]
      },
      selectedActivity: [],
      selectedStores: [], // 已选的门店集合
      selectedProducts: [],
      selectedCoupons: []
    }
  },
  computed: {
    // ...mapGetters(['merCode', 'name', 'token']),
    // headers() {
    //   return { Authorization: this.token, merCode: this.merCode }
    // }
  },
  created() {
    const id = this.$route.query.id
    const op = this.$route.query.op
    let pageTitle = '支付有礼'
    if (id) {
      if (op === '1') {
        this.pageStatus = 3
        pageTitle = pageTitle + '详情'
        this.disabled = true
      } else {
        this.pageStatus = 2
        pageTitle = pageTitle + '编辑'
      }

      this._getDetailData()
    } else {
      pageTitle = pageTitle + '新增'
    }
    this.$route.meta.title = pageTitle
    document.title = pageTitle
  },
  methods: {
    // 选择门店
    selectStore() {
      this.$refs.selectStore.show(this.selectedStores)
    },
    selectActivity() {
      this.$refs.selectActivity.show(this.selectedActivity)
    },
    // 选择商品
    selectProduct() {
      this.$refs.selectProduct.show(this.selectedProducts)
    },
    goToSetting() {
      this.$router.push('/distribution/store-reservation-setting')
    },
    submitData() {
      console.log(this.form)
      console.log(this.selectedStores)
    },
    onGetSelectStore(selectedStores) {
      this.selectedStores = selectedStores
      this.$refs.selectedStoreView.show(selectedStores)
      console.log('选择的门店：' + JSON.stringify(selectedStores))
    },
    onGetSelectActivity(selectedActivity) {
      this.selectedActivity = selectedActivity
      this.$refs.selectedActivityView.show(selectedActivity)
      console.log('选择的活动：' + JSON.stringify(selectedActivity))
    },
    onGetSelectCoupon(selectedCoupons) {
      this.selectedCoupons = selectedCoupons
      this.$refs.selectedCouponView.show(selectedCoupons)
      console.log('选择的优惠券：' + JSON.stringify(selectedCoupons))
    },
    onGetSelectProduct(selectedProducts) {
      this.selectedProducts = selectedProducts
      this.$refs.selectedProductView.show(selectedProducts)
      console.log('选择的商品：' + JSON.stringify(selectedProducts))
    },
    updateActivityStatus(activity) {
      console.log('activity', activity)
      if (activity.status && activity.timeStatus === -1) { // 未开始
        console.log('活动未开始！')
      } else if (activity.status && activity.timeStatus === 1) { // 进行中
        this.pageStatus = 3
        this.disabled = true
        this.$message.warning('活动已开始！')
      } else if (activity.status || activity.timeStatus === 0) { // 已结束
        this.pageStatus = 3
        this.disabled = true
        this.$message('活动已结束！')
      }
    },
    _getDetailData() {
      this.form = {
        huodongshijian: ['2011-11-11 22:22:22', '2011-11-15 22:22:22'], // 活动时间
        name: 'ddd', // 活动名称
        desc: 'dd', // 活动说明
        range: '0', // 活动范围
        amount: 100, // 金额
        store: '1', // 门店
        product: '1', // 指定商品
        fafangshijian: '1', // 发放时间
        tuihuiquanyi: '1', // 退回权益
        coupon: true // 优惠券
      }
      // this.pageLoading = true
      // const params = {
      //   id: this.dataid
      // }
      // console.log('params detail', params)
      // getActivityDetail(params).then(res => {
      //   if (res.code === '10000') {
      //     // / this.xForm = ''
      //     const data = res.data
      //     this.tableForm.selectedGoods = data.items.map((item) => {
      //       return {
      //         activityId: item.activityId,
      //         discount: '' + item.discount,
      //         id: item.id,
      //         limitAmount: '' + item.limitAmount,
      //         productManufacture: item.productManufacture,
      //         productName: item.productName,
      //         productSpecId: item.productSpecId,
      //         productSpecName: item.productSpecName,
      //         stockAmount: (item.stockAmount || '') + ''
      //       }
      //     })
      //     console.log('this.xForm', this.xForm)
      //     this.xForm = Object.assign(data, {
      //       'dateRange': [res.data.startTime, res.data.endTime]
      //     })
      //     this.selectedStore = data.stores.map(v => {
      //       const store = {
      //         id: v.storeId,
      //         stName: v.storeName
      //       }
      //       return store
      //     })
      //     console.log('this.selectedStore', this.selectedStore)
      //     // 编辑状态时，更新页面当前状态
      // if (this.pageStatus === 2) {
      //   this.updateActivityStatus(data)
      // }
      // }
      //   this.pageLoading = false
      // }).catch(err => {
      //   this.pageLoading = false
      //   console.log('err', err)
      // })
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
  .from-clickable{
    padding: 15px 0 0 24px;
  }
}
</style>
