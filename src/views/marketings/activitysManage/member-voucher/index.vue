<template>
  <div class="member-voucher-modal app-container">
    <el-steps :active="stepActive" simple>
      <el-step title="选择会员" />
      <el-step title="选择优惠券" />
      <el-step title="发放成功" />
    </el-steps>
    <mMemberList v-show="stepActive === 1" @nextstep="toSetp2" />
    <mCouponList v-show="stepActive === 2" @nextstep="toSetp3" @prevstep="prev" />
    <mVoucherSuccess v-show="stepActive === 3" ref="success" />
  </div>
</template>
<script>
import mCouponList from './_source/coupon-list'
import mMemberList from './_source/member-list'
import mVoucherSuccess from './_source/voucher-success'
import { batchSendCoupon } from '@/api/birthday'
export default {
  name: 'MemberVoucher',
  components: {
    mCouponList, mMemberList, mVoucherSuccess
  },
  data() {
    return {
      stepActive: 1,
      params: {
        couponNumList: [],
        listUserCouponBaseInfo: []
      }
    }
  },
  methods: {
    toSetp2(memberList) {
      this.stepActive = 2
      this.params.listUserCouponBaseInfo = memberList
    },
    toSetp3(couponNumList) {
      this.params.couponNumList = couponNumList
      batchSendCoupon(this.params).then(res => {
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
