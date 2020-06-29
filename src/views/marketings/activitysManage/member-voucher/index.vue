<template>
  <div class="member-voucher-modal app-container">
    <el-steps :active="stepActive" simple>
      <el-step title="选择会员" />
      <el-step title="选择优惠券" />
      <el-step title="发放成功" />
    </el-steps>
    <mMemberList v-if="stepActive === 1" />
    <mCouponList v-if="stepActive === 2" />
    <mVoucherSuccess v-if="stepActive === 3" />
    <el-button @click="nextStep">下一步</el-button>
  </div>
</template>
<script>
import mCouponList from './_source/coupon-list'
import mMemberList from './_source/member-list'
import mVoucherSuccess from './_source/voucher-success'
export default {
  name: 'MemberVoucher',
  components: {
    mCouponList, mMemberList, mVoucherSuccess
  },
  data() {
    return {
      stepActive: 1
    }
  },
  methods: {
    nextStep() {
      if (this.stepActive < 3) {
        this.stepActive++
      } else {
        this.stepActive = 1
      }
    }
  }
}
</script>
<style lang="scss">
.member-voucher-modal{
  color: #666;
}
</style>
