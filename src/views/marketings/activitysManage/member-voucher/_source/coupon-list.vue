<template>
  <div class="coupon-list-modal">
    <div class="select-coupon">
      <el-button style="margin-bottom: 24px" @click="selectCoupon">选择优惠券</el-button>
      <mSelectedCoupon
        v-show="selectedCoupons.length>0"
        ref="selectedCouponView"
        @onDel="onGetSelectCoupon"
      />
    </div>
    <checkCoupon ref="checkCoupons" state="1" @confincheck="onGetSelectCoupon" />
  </div>
</template>
<script>
import checkCoupon from '@/components/Marketings/checkCoupon'
import mSelectedCoupon from '../../../_source/SelectedCoupon'
export default {
  components: {
    checkCoupon, mSelectedCoupon
  },
  data() {
    return {
      selectedCoupons: []
    }
  },
  methods: {
    selectCoupon() {
      this.$refs.checkCoupons.handleGetlist('支付有礼')
      this.$refs.checkCoupons.defaultcheck(this.selectedCoupons)
    },
    onGetSelectCoupon(selectedCoupons) {
      this.selectedCoupons = selectedCoupons
      this.$refs.selectedCouponView.showPage(selectedCoupons, this.pageStatus)
    }
  }
}
</script>
<style lang="scss">
.coupon-list-modal{
  height: calc(100vh - 400px);
  .select-coupon{
    padding-top: 24px;
  }
}
</style>
