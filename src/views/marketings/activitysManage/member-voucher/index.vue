<template>
  <div class="member-voucher-modal app-container">
    <el-steps :active="stepActive" simple>
      <el-step title="选择会员" />
      <el-step title="选择优惠券" />
      <el-step title="发放成功" />
    </el-steps>
    <mMemberList v-show="stepActive === 1" @nextstep="toSetp2" @submitParams="saveParams" />
    <mCouponList v-show="stepActive === 2" @nextstep="toSetp3" @prevstep="prev" ref="cop" />
    <mVoucherSuccess v-show="stepActive === 3" ref="success" />
  </div>
</template>
<script>
import mCouponList from './_source/coupon-list'
import mMemberList from './_source/member-list'
import mVoucherSuccess from './_source/voucher-success'
import { batchSendCoupon, batchSendCouponNew } from '@/api/birthday'
export default {
  name: 'MemberVoucher',
  components: {
    mCouponList, mMemberList, mVoucherSuccess
  },
  data() {
    return {
      stepActive: 1,
      isRunning: false,
      params: {
        couponNumList: []
        // listUserCouponBaseInfo: []
      }
    }
  },
  methods: {
    saveParams(params){ // 保存搜索会员参数
      this.params.conditionJson = params
      Object.assign(this.params, JSON.parse(params))
    },
    toSetp2() {
      this.stepActive = 2
      // this.params.listUserCouponBaseInfo = memberList
    },
    toSetp3(couponNumList) {
      if (this.isRunning) {
        return
      }
      this.isRunning = true
      this.params.couponNumList = couponNumList
      batchSendCouponNew(this.params).then(res => {
        this.$refs.cop.stopLoading()
        this.isRunning = false
        if (res.code === '10000') {
          this.stepActive = 3
          this.$refs.success.countDown()
        } else {
          this.$message.error('发券失败！')
        }
      })
    },
    prev() {
      this.stepActive = 1
    }
  }
}
</script>
<style lang="scss">
.member-voucher-modal{
  color: #666;
}
</style>
