<template>
  <div class="coupon-list-modal">
    <div class="select-coupon">
      <el-button style="margin-bottom: 24px" size="mini" @click="selectCoupon">选择优惠券</el-button>
      <mSelectedCoupon
        v-show="selectedCoupons.length>0"
        ref="selectedCouponView"
        max-heigth="450px"
        @onDel="onGetSelectCoupon"
      />
    </div>
    <div style="position: absolute;bottom: 24px">
      <el-button @click="onStep(true)">上一步</el-button>
      <el-button v-loading="isLoading" @click="onStep(false)">确定</el-button>
    </div>
    <checkCoupon ref="checkCoupons" :max-length="5" state="1" @confincheck="onGetSelectCoupon" />
  </div>
</template>
<script>
import checkCoupon from '../../../_source/pop-coupon'
import mSelectedCoupon from '../../../_source/selectedCouNonum'
import _ from 'lodash'
export default {
  components: {
    checkCoupon, mSelectedCoupon
  },
  data() {
    return {
      selectedCoupons: [],
      isLoading: false
    }
  },
  methods: {
    selectCoupon() {
      this.$refs.checkCoupons.handleGetlist()
      this.$refs.checkCoupons.defaultcheck(this.selectedCoupons)
    },
    onGetSelectCoupon(selectedCoupons) {
      this.selectedCoupons = selectedCoupons
      this.$refs.selectedCouponView.showPage(selectedCoupons, this.pageStatus)
    },
    // 上一步或下一步
    onStep(type) {
      if (type) {
        this.$emit('prevstep')
      } else {
        if (this.selectedCoupons.length === 0) {
          this.$message.error('请至少选择一张优惠券')
        } else {
          const arr = []
          _.map(this.selectedCoupons, items => {
            const obj = {
              id: items.id,
              num: 1
            }
            arr.push(obj)
          })
          this.isLoading = true
          this.$emit('nextstep', arr)
        }
      }
    },
    // 结束加载中
    stopLoading() {
      this.isLoading = false
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
