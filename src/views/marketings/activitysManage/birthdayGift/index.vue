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
      <el-form-item label-width="0" style="margin: 0">
        <el-checkbox v-model="isSelectCoupon" style="width: 95px;" @change="changeCouponType">优惠券：</el-checkbox>
        <el-button style="margin-bottom: 24px" size="mini" :disabled="!isSelectCoupon" @click="selectCoupon">选择优惠券</el-button>
      </el-form-item>
      <el-form-item label-width="0" style="margin: 0">
        <mSelectedCoupon
          v-show="selectedCoupons.length>0"
          ref="selectedCouponView"
          @onDel="onGetSelectCoupon"
        />
      </el-form-item>
      <el-form-item label-width="0" style="margin: 0">
        <el-checkbox v-model="isSelectHb" @change="paramsForm.HB = 1">赠送海贝：</el-checkbox>
        <el-input-number v-model="paramsForm.HB" :disabled="!isSelectHb" :min="1" :max="10000" :step="1" :controls="false" style="width: 120px" size="mini" /> 海贝
      </el-form-item>
    </el-form>
    <div class="btn-box">
      <el-button size="mini" @click="$router.push('/marketing/activity?type=members')">取消</el-button>
      <el-button size="mini" type="primary" @click="_onSubmit">确定</el-button>
    </div>
    <checkCoupon ref="checkCoupons" :max-length="5" state="1" @confincheck="onGetSelectCoupon" />
  </div>
</template>
<script>
import _ from 'lodash'
import { createActivity, normalActivityAddedCouponList } from '@/api/coupon'
import { queryBirthday, updateNormalActivityNoTime } from '@/api/birthday'
import checkCoupon from '../../_source/pop-coupon'
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
        HB: 1
      },
      selectedCoupons: [],
      isSelectCoupon: false,
      isSelectHb: false
    }
  },
  created() {
    const params = {
      pageSize: 100,
      currentPage: 1
    }
    queryBirthday().then(res => {
      if (res.code === '10000') {
        if (res.data) {
          this.birthInfo = res.data
          params.id = res.data.id
          this.paramsForm.HB = res.data.hb
          if (res.data.hb > 0) {
            this.isSelectHb = true
          }
          normalActivityAddedCouponList(params).then(res => {
            if (res.data.records.length > 0) {
              this.isSelectCoupon = true
            }
            this.selectedCoupons = res.data.records
            this.$refs.selectedCouponView.showPage(this.selectedCoupons, this.pageStatus)
          })
        }
      }
    })
  },
  methods: {
    // 选择或不选择优惠券
    changeCouponType() {
      console.log('yes')
      this.selectedCoupons = []
      this.$refs.selectedCouponView.showPage(this.selectedCoupons, this.pageStatus)
    },
    _onSubmit() {
      const params = {
        activityDetailName: '新人礼包',
        activityPayReqDTO: [],
        activityTemplateCode: 'TC006',
        activityType: 0,
        bottomNote: '文案',
        joinRule: 0,
        productRule: 1,
        sceneRule: 0,
        sendRule: 1,
        shopRule: 1
      }
      if (this.paramsForm.HB > 0 && this.isSelectHb) {
        var obj = {
          giftId: null,
          giftNum: this.paramsForm.HB,
          giftType: 3
        }
        params.activityPayReqDTO.push(obj)
      }
      if (this.isSelectCoupon) {
        _.map(this.selectedCoupons, item => {
          var obj = {
            giftNum: item.giftNum,
            giftType: 1,
            giftId: item.id
          }
          params.activityPayReqDTO.push(obj)
        })
      }
      if (params.activityPayReqDTO.length === 0) {
        this.$message.error('请至少设置一个礼包内容')
        return false
      }
      if (this.birthInfo.id) {
        const removeList = []
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
  .btn-box{
    margin-top: 50px;
    text-align: center;
  }
}
</style>
