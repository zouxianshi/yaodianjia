<template>
  <div class="birthday-modal app-container">
    <div class="items-title">基本信息</div>
    <el-form label-width="100px" label-position="right">
      <el-form-item label="发送规则：">
        会员在生日当天，早晨7点收到祝福礼包
      </el-form-item>
    </el-form>
    <div class="items-title" style="margin-top: 40px">礼包内容</div>
    <el-form label-width="100px" label-position="right" :model="paramsForm">
      <el-form-item label="优惠券：">
        <el-button style="margin-bottom: 24px" size="mini" @click="selectCoupon">选择优惠券</el-button>
        <mSelectedCoupon
          v-show="selectedCoupons.length>0"
          ref="selectedCouponView"
          @onDel="onGetSelectCoupon"
        />
      </el-form-item>
      <el-form-item label="赠送海贝：">
        <el-input-number v-model="paramsForm.HB" :min="0" :max="999999" :step="1" :controls="false" style="width: 120px" size="mini" /> 海贝
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="mini" @click="$router.push('/marketing/activity?type=members')">取消</el-button>
      <el-button size="mini" type="primary" @click="_onSubmit">确定</el-button>
    </div>
    <checkCoupon ref="checkCoupons" state="1" @confincheck="onGetSelectCoupon" />
  </div>
</template>
<script>
import _ from 'lodash'
import { createActivity, normalActivityAddedCouponList } from '@/api/coupon'
import { queryBirthday, updateNormalActivityNoTime } from '@/api/birthday'
import checkCoupon from '@/components/Marketings/checkCoupon'
import mSelectedCoupon from '../../_source/SelectedCoupon'
export default {
  name: 'BirthdayGift',
  components: {
    checkCoupon, mSelectedCoupon
  },
  data() {
    return {
      birthInfo: {},
      paramsForm: {
        couponList: '',
        HB: 0
      },
      selectedCoupons: []
    }
  },
  created() {
    const params = {
      pageSize: 100,
      currentPage: 1
    }
    queryBirthday().then(res => {
      if (res.code === '10000') {
        if (!!res.data) {
          this.birthInfo = res.data
          params.id = res.data.id
          this.paramsForm.HB = res.data.hb
          normalActivityAddedCouponList(params).then(res => {
            this.selectedCoupons = res.data.records
            this.$refs.selectedCouponView.showPage(this.selectedCoupons, this.pageStatus)
          })
        }
      }
    })
  },
  methods: {
    _onSubmit() {
      let params = {
        activityDetailName: "新人礼包",
        activityPayReqDTO: [],
        activityTemplateCode: "TC006",
        activityType: 0,
        bottomNote: "文案",
        joinRule: 0,
        productRule: 1,
        sceneRule: 0,
        sendRule: 1,
        shopRule: 1
      }
      if (this.paramsForm.HB > 0) {
        var obj = {
          giftId: null,
          giftNum: this.paramsForm.HB,
          giftType: 3
        }
        params.activityPayReqDTO.push(obj)
      }
      _.map(this.selectedCoupons, item => {
        var obj = {
          giftNum: item.giftNum,
          giftType: 1,
          giftId: item.id
        }
        params.activityPayReqDTO.push(obj)
      })
      if (this.birthInfo.id) {
        let removeList = []
        _.map(this.birthInfo.listActivityPayEntity, item => {
          removeList.push(item.id)
        })
        params.removedList = removeList
        params.id = this.birthInfo.id
        updateNormalActivityNoTime(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
            this.$router.push('/marketing/activity?type=members')
          }
        })
      } else {
        createActivity(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
            this.$router.push('/marketing/activity?type=members')
          }
        })
      }
    },
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
.birthday-modal {
  .items-title {
    font-size: 18px;
    font-weight: 600;padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
  }
  .el-form{
    margin-top: 20px;
  }
}
</style>
