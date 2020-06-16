<template>
  <div class="newcommer-create-modal app-container">
    <div class="params-items">
      <div class="title">参与对象</div>
      <p style="margin-bottom: 20px;text-indent:2rem">新注册微商城的会员</p>
    </div>
    <div class="params-items">
      <div class="title">活动时间</div>
      <el-date-picker
        v-model="activeTimer"
        style="margin-left:2rem"
        size="mini"
        type="datetimerange"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :default-time="['12:00:00']"
      />
    </div>
    <div class="params-items">
      <div class="title">礼包内容</div>
      <el-form label-position="top" style="margin-left: 2rem" size="mini">
        <el-form-item>
          <el-checkbox v-model="hasCoupon">优惠券</el-checkbox>
          <el-button type="primary" style="margin-left: 24px" @click="selectCoupon">选择优惠券</el-button>
          <mSelectedCoupon
            v-show="selectedCoupons.length>0"
            ref="selectedCouponView"
            style="margin-top: 24px"
            @onDel="onGetSelectCoupon"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="hasHb">赠送海贝</el-checkbox>
          <el-input-number v-model="hbNum" style="margin-left: 9px; width:92px" :precision="0" :max="100000" :min="0" :controls="false" />
          海贝
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="hasActive">相关活动</el-checkbox>
          <el-button type="primary" style="margin-left: 24px">选择活动</el-button>
          <mSelectedCoupon
            v-show="selectedCoupons.length>0"
            ref="selectedCouponView"
            style="margin-top: 24px"
            @onDel="onGetSelectCoupon"
          />
        </el-form-item>
      </el-form>
      <div style="margin-top: 50px;text-align: center;">
        <el-button type="primary" size="mini">保存</el-button>
      </div>
    </div>
    <!-- 选择优惠券弹窗 -->
    <mCouponModel ref="checkCoupons" :timevalue="activeTimer" state="1" @confincheck="onGetSelectCoupon" />
  </div>
</template>
<script>
import mCouponModel from './_source/coupon-model'
import mSelectedCoupon from './_source/SelectedCoupon'
export default {
  components: {
    mCouponModel, mSelectedCoupon
  },
  data() {
    return {
      activeTimer: [], // 活动有效时间
      hasCoupon: false, // 是否赠送优惠券
      selectedCoupons: [], // 已选择的优惠券
      hasHb: false,
      hbNum: 0,
      hasActive: false, // 是否有相关活动
      selectActive: []
    }
  },
  methods: {
    // 选择优惠券(打开弹窗)
    selectCoupon() {
      if (this.activeTimer.length > 0) {
        this.$refs.checkCoupons.handleGetlist()
        this.$refs.checkCoupons.defaultcheck(this.selectedCoupons)
      } else {
        this.$message.error('请先选择活动时间')
      }
    },
    // 获取已选择的优惠券
    onGetSelectCoupon(selectedCoupons) {
      this.selectedCoupons = selectedCoupons
      this.$refs.selectedCouponView.showPage(selectedCoupons, 1)
    }
  }
}
</script>
<style lang="scss">
.newcommer-create-modal {
  .params-items {
    .title {
      font-size: 18px;
      font-weight: 500;
      height: 40px;
      line-height: 40px;
      margin-bottom: 20px;
    }
    .selected-coupon-view{
      width: 80%;
    }
  }
}
</style>
