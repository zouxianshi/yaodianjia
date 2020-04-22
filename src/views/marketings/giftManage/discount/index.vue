<template>
  <div class="discount-index-model">
    <div class="content">
      <div class="discount-content-l">
        <mPhoneView :data="discountForm" />
      </div>
      <div class="discount-content-r">
        <el-steps :active="active" simple>
          <el-step title="基本信息" />
          <el-step title="使用规则" />
        </el-steps>
        <el-form v-show="active===1" ref="form" :inline="false" :model="discountForm" label-width="100px" size="mini" label-position="left">
          <el-form-item label="优惠券类型：">
            <span>折扣券</span>
          </el-form-item>
          <el-form-item label="优惠券名称：">
            <el-input v-model="discountForm.cname" placeholder="请输入优惠券名称" maxlength="10" style="width:300px" />
          </el-form-item>
          <el-form-item label="优惠内容：">
            <el-input v-model="discountForm.denomination" :disabled="isUpdate" style="width:80px" /> 折
            <span class="zkTips">例：若折扣为8折，填8即可</span>
            <p style="margin-top:10px">
              <el-checkbox v-model="isSelectMax" :disabled="isUpdate" />
              最多优惠
              <el-input v-model="discountForm.maxPrice" :disabled="isUpdate" style="width:80px" /> 元
            </p>
          </el-form-item>
          <el-form-item label="退货规则：">
            <el-radio-group v-model="discountForm.returnRule" :disabled="isUpdate">
              <el-radio :label="1">退货退回</el-radio>
              <el-radio :label="2">退货后失效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="到期提醒：">
            <el-checkbox v-model="isRember" :disabled="isUpdate" />
            到期前
            <el-input v-model="discountForm.expireInfo" :disabled="isUpdate" size="mini" style="width:50px" />
            天微信提醒
          </el-form-item>
          <el-form-item label="使用须知：">
            <el-input
              v-model="discountForm.note"
              type="textarea"
              style="width:300px"
              rows="5"
              placeholder="请输入使用须知"
            />
          </el-form-item>
        </el-form>
        <el-form v-show="active===2" ref="form2" :model="discountForm" label-width="100px" size="mini" label-position="left">
          <el-form-item label="使用场景：">
            <el-radio-group v-model="discountForm.sceneRule" :disabled="isUpdate">
              <el-radio :label="3">线上线下通用</el-radio>
              <el-radio :label="1">微商城</el-radio>
              <el-radio :label="2">线下门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用门槛：">
            <el-radio-group v-model="useRuleLimit" :disabled="isUpdate">
              <el-radio :label="0">无门槛</el-radio>
              <el-radio :label="1">订单满 <el-input v-model="discountForm.useRule" :disabled="isUpdate" style="width:100px" /> 元</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用时间：">
            <el-radio-group v-model="discountForm.timeRule" style="width:200px" :disabled="isUpdate">
              <el-radio :label="1">
                自领取起 <el-input v-model="otherData.expirationDay" :disabled="isUpdate" style="width:60px" /> 天内有效
              </el-radio>
              <el-radio :label="2">
                自领取起 <el-input v-model="otherData.notActive" :disabled="isUpdate" style="width:60px" /> 天后生效，生效后 <el-input v-model="otherData.effective" :disabled="isUpdate" style="width:60px" /> 天失效
              </el-radio>
              <el-radio :label="3">
                <el-date-picker
                  v-model="otherData.expirationDate"
                  :disabled="isUpdate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="生效日期"
                  end-placeholder="失效日期"
                />
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="适用门店：">
            <el-radio-group v-model="discountForm.shopRule" :disabled="isUpdate">
              <el-radio :label="1">全部门店</el-radio>
              <el-radio :label="2">指定门店&emsp; <el-button v-if="discountForm.shopRule===2" type="text" :disabled="isUpdate" @click="selectStore">选择门店</el-button></el-radio>
            </el-radio-group>
            <mSelectedStore v-show="selectedStore.length>0" ref="selectedStore" @onDel="_deleteItem" />
          </el-form-item>
          <el-form-item label="适用商品：">
            <el-radio-group v-model="discountForm.productRule" :disabled="isUpdate" @change="changeProductRule">
              <el-radio :label="1">全部商品</el-radio>
              <el-radio :label="2">指定商品可用 <el-button v-if="discountForm.productRule===2" type="text" :disabled="isUpdate" @click="selectCommodity(1)">选择商品</el-button></el-radio>
              <el-radio :label="3">指定商品不可用 <el-button v-if="discountForm.productRule===3" type="text" :disabled="isUpdate" @click="selectCommodity(2)">选择商品</el-button></el-radio>
            </el-radio-group>
            <mSelectedProduct v-show="discountForm.productRule===2&&selectedProUse.length>0" ref="selectedProUse" @onDel="_deleteItemUse" />
            <mSelectedProduct v-show="discountForm.productRule===3&&selectedProNot.length>0" ref="selectedProNot" @onDel="_deleteItemNot" />
          </el-form-item>
        </el-form>
        <el-button v-if="active===1" size="mini" type="primary" @click="next">下一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="active = 1">上一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="_submit">确认</el-button>
      </div>
    </div>
    <mPopSelectStore ref="selectStore" @onSelect="getSelectedStore" />
    <mPopSelectProduct ref="selectCommodityUse" @onSelect="getSelectedProUse" />
    <mPopSelectProduct ref="selectCommodityNot" @onSelect="getSelectedProNot" />
  </div>
</template>
<script>
import mPhoneView from '../_source/phoneView'
import mPopSelectStore from '@/components/Marketings/popSelectStore'
import mPopSelectProduct from '@/components/Marketings/popSelectProduct'
import mSelectedStore from '../../_source/SelectedStore' // 已选择门店列表
import mSelectedProduct from '../../_source/SelectedProduct' // 已选择商品列表
import { getCouponDetail, addCoupon, updateCoupon } from '@/api/coupon'
import { formatDate } from '@/utils/timer'
export default {
  name: 'DiscountIndex',
  components: {
    mPhoneView, mPopSelectStore, mPopSelectProduct, mSelectedStore, mSelectedProduct
  },
  data() {
    return {
      isUpdate: false, // 判断是不是更新页面，来禁止编辑某些选项
      active: 1, // 当前操作步骤
      selectedStore: [],
      selectedProUse: [], // 指定可用商品
      selectedProNot: [], // 指定不可用商品
      otherData: {
        expirationDay: '0', // 直接开始有效天数
        expirationDate: [
          new Date(), new Date()
        ], // 有效期(当选择开始、结束日期是)
        notActive: '0', // 等待生效天数
        effective: '0' // 有效天数
      },
      isRember: '', // 是否到期提醒
      isSelectMax: '', // 是否输入最大优惠
      useRuleLimit: '0', // 使用门槛
      discountForm: {
        ctype: 1,
        cname: '', // 折扣名称
        denomination: '', // 优惠内容
        maxPrice: 0, // 最大优惠
        returnRule: 1, // 退货规则
        expireInfo: 0, // 到期提醒
        note: '', // 使用须知
        sceneRule: 3, // 使用场景
        useRule: 1, // 门槛金额
        shopRule: 0, // 适用门店
        productRule: 0, // 使用商品
        logo: 'www.baidu.com'
      }
    }
  },
  created() {
    if (this.$route.query.id) { // 编辑
      this.isUpdate = true
      var params = {
        id: this.$route.query.id
      }
      getCouponDetail(params).then(res => {
        if (res.data) {
          var datas = res.data
          this.discountForm = datas
          this.isRember = !!datas.expireInfo // 是否需要到期提醒
          this.isSelectMax = !!datas.maxPrice // 是否需要最大优惠
          this.useRuleLimit = datas.useRule === 0 ? 0 : 1 // 是否有使用门槛
          this.otherData = {
            expirationDay: '0', // 直接开始有效天数
            expirationDate: [
              new Date(), new Date()
            ], // 有效期(当选择开始、结束日期是)
            notActive: '0', // 等待生效天数
            effective: '0' // 有效天数
          }
          if (datas.timeRule === 1) {
            this.otherData.expirationDay = datas.effectTime
          } else if (datas.timeRule === 2) {
            var effectTimes = datas.effectTime.split(',')
            this.otherData.notActive = effectTimes[0]
            this.otherData.effective = effectTimes[1]
          } else {
            this.otherData.expirationDate = [...(datas.effectTime.split(','))]
          }
        }
      })
    }
  },
  methods: {
    // 切换商品限制规则
    changeProductRule() {
      this.selectedProUse = []
      this.selectedProNot = []
    },
    next() {
      if (this.active++ > 1) this.active = 1
    },
    _submit() {
      if (this.$route.query.id) {
        this.discountForm.expireInfo = Number(this.discountForm.expireInfo)
        updateCoupon(this.discountForm).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: res.msg,
              type: 'success'
            })
          }
          this.$router.push('/marketings/gift-manage/list')
        })
      } else { // 新增时处理数据
        var params = this.discountForm
        var _data = this.otherData
        if (params.timeRule === 1) {
          params.effectTime = _data.expirationDay
        } else if (params.timeRule === 2) {
          params.effectTime = _data.notActive + ',' + _data.effective
        } else {
          params.effectTime = formatDate(_data.expirationDate[0]) + ',' + formatDate(_data.expirationDate[1])
        }
        addCoupon(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            this.$router.push('/marketings/gift-manage/list')
          }
        })
      }
    },
    // 选择门店
    selectStore() {
      this.$refs.selectStore.show(this.selectedStore)
    },
    // 选择商品
    selectCommodity(type) {
      if (type === 1) { // 选择可使用商品
        this.$refs.selectCommodityUse.show(this.selectedProUse)
      } else { // 选择不可用商品
        this.$refs.selectCommodityNot.show(this.selectedProNot)
      }
    },
    // 获取选择门店数据
    getSelectedStore(data) {
      this.selectedStore = data
      this.$refs.selectedStore.show(data) // 已选择的列表显示
    },
    // 获取选择可用商品数据
    getSelectedProUse(data) {
      this.selectedProUse = data
      this.$refs.selectedProUse.show(data)
    },
    // 获取选择不可用商品数据
    getSelectedProNot(data) {
      this.selectedProNot = data
      this.$refs.selectedProNot.show(data)
    },
    // 删除已选择门店数据
    _deleteItem(data) {
      this.selectedStore = data
    },
    // 删除已选择可使用商品数据
    _deleteItemUse(data) {
      this.selectedProUse = data
    },
    // 删除已选择不可用商品数据
    _deleteItemNot(data) {
      this.selectedProNot = data
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.discount-index-model {
  padding: 20px;
  height: calc(100vh - 180px);
  overflow: auto;
  .content {
    display: flex;
    .discount-content-l {
      flex: 0 0 24%;
    }
    .discount-content-r {
      flex: 0 0 60%;
      padding-left: 5%;
      .el-form{
        .el-radio-group{
          display: inline-block;
          line-height: inherit;
          vertical-align: text-top;
          font-size: 0;
          width: 100px;
        }
      }
      .el-steps--simple{
        margin-bottom: 24px;
      }
      .zkTips{
        color: #bbb;margin-left: 24px;
      }
    }
  }
}
</style>
