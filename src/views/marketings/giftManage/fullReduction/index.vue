<template>
  <div class="discount-index-model">
    <div class="content">
      <div class="discount-content-l">
        <mPhoneView :data="discountForm" :other-data="otherData" />
      </div>
      <div class="discount-content-r">
        <el-steps :active="active" simple>
          <el-step title="基本信息" />
          <el-step title="使用规则" />
        </el-steps>
        <el-form v-show="active===1" ref="form" :inline="false" :model="discountForm" label-width="100px" size="mini" label-position="left">
          <el-form-item label="优惠券类型：">
            <span>满减券</span>
          </el-form-item>
          <el-form-item label="优惠券名称：">
            <el-input v-model="discountForm.name" placeholder="请输入优惠券名称" maxlength="10" style="width:300px" />
          </el-form-item>
          <el-form-item label="优惠内容：">
            <el-input v-model="discountForm.detail" style="width:80px" /> 元
          </el-form-item>
          <el-form-item label="退货规则：">
            <el-radio-group v-model="discountForm.returnRules">
              <el-radio label="0">退货退回</el-radio>
              <el-radio label="1">退货后失效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="到期提醒：">
            <el-checkbox v-model="discountForm.isRemember" />
            到期前
            <el-input v-model="discountForm.rememberDay" size="mini" style="width:50px" />
            天微信提醒
          </el-form-item>
          <el-form-item label="使用须知：">
            <el-input
              v-model="discountForm.notice"
              type="textarea"
              style="width:300px"
              rows="5"
              placeholder="请输入使用须知"
            />
          </el-form-item>
        </el-form>
        <el-form v-show="active===2" ref="form2" :model="discountForm" label-width="100px" size="mini" label-position="left">
          <el-form-item label="使用场景：">
            <el-radio-group v-model="discountForm.scenes">
              <el-radio label="0">线上线下通用</el-radio>
              <el-radio label="1">微商城</el-radio>
              <el-radio label="2">线下门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用门槛：">
            <el-radio-group v-model="discountForm.threshold">
              <el-radio label="0">无门槛</el-radio>
              <el-radio label="1">订单满 <el-input v-model="discountForm.thresholdPrice" style="width:100px" /> 元</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用时间：">
            <el-radio-group v-model="discountForm.expiration" style="width:200px">
              <el-radio label="0">
                自领取起 <el-input v-model="otherData.expirationDay" style="width:40px" /> 天内有效
              </el-radio>
              <el-radio label="1">
                自领取起 <el-input v-model="otherData.notActive" style="width:40px" /> 天后生效，生效后 <el-input v-model="otherData.effective" style="width:40px" /> 天失效
              </el-radio>
              <el-radio label="2">
                <el-date-picker
                  v-model="otherData.expirationDate"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="生效日期"
                  end-placeholder="失效日期"
                />
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="适用门店：">
            <el-radio-group v-model="discountForm.store">
              <el-radio label="0">全部门店</el-radio>
              <el-radio label="1">指定门店&emsp; <span v-if="discountForm.store==='1'" @click="selectStore">选择门店</span></el-radio>
            </el-radio-group>
            <mSelectedStore v-show="selectedStore.length>0" ref="selectedStore" @onDel="_deleteItem" />
          </el-form-item>
          <el-form-item label="适用商品：">
            <el-radio-group v-model="discountForm.commodity">
              <el-radio label="0">全部商品</el-radio>
              <el-radio label="1">指定商品可用 <span v-if="discountForm.commodity==='1'" @click="selectCommodity">选择商品</span></el-radio>
              <el-radio label="2">指定商品不可用 <span v-if="discountForm.commodity==='2'" @click="selectCommodity">选择商品</span></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button v-if="active===1" size="mini" type="primary" @click="next">下一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="active = 1">上一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="_submit">确认</el-button>
      </div>
    </div>
    <mPopSelectStore ref="selectStore" @onSelect="getSelectedStore" />
    <mPopSelectProduct ref="selectCommodity" />
  </div>
</template>
<script>
import mPhoneView from '../_source/phoneView'
import mPopSelectStore from '@/components/Marketings/popSelectStore' // 选择门店
import mPopSelectProduct from '@/components/Marketings/popSelectProduct' // 选择商品
import mSelectedStore from '../../_source/SelectedStore' // 已选择门店列表
export default {
  name: 'DiscountIndex',
  components: {
    mPhoneView, mPopSelectStore, mPopSelectProduct, mSelectedStore
  },
  data() {
    return {
      active: 1,
      selectedStore: [],
      otherData: {
        expirationDay: '0', // 直接开始有效天数
        expirationDate: [
          new Date(), new Date()
        ], // 有效期(当选择开始、结束日期是)
        notActive: '0', // 等待生效天数
        effective: '0' // 有效天数
      },
      discountForm: {
        name: '', // 折扣名称
        detail: '', // 优惠金额
        returnRules: '0', // 退货规则
        isRemember: '', // 是否提醒
        rememberDay: '',
        notice: '', // 使用须知
        scenes: '0', // 使用场景
        threshold: '0', // 使用门槛
        thresholdPrice: '0', // 门槛金额
        expiration: '0', // 使用时间
        store: '0', // 适用门店
        commodity: '0' // 使用商品
      }
    }
  },
  methods: {
    next() {
      if (this.active++ > 1) this.active = 1
    },
    _submit() {
      console.log(this.discountForm)
    },
    // 选择门店
    selectStore() {
      this.$refs.selectStore.show(this.selectedStore)
    },
    // 选择商品
    selectCommodity() {
      this.$refs.selectCommodity.show([])
    },
    // 获取选择门店数据
    getSelectedStore(data) {
      this.selectedStore = data
      this.$refs.selectedStore.show(data)
    },
    // 删除已选择门店数据
    _deleteItem(data) {
      this.selectedStore = data
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
