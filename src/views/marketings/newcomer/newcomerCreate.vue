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
        :default-time="['00:00:00', '20:59:59']"
        :disabled="isDisabled"
        :picker-options="pickerOptions"
        @change="changeTimes"
      />
    </div>
    <div class="params-items">
      <div class="title">礼包内容</div>
      <el-form label-position="top" style="margin-left: 2rem" size="mini" :disabled="isDisabled">
        <el-form-item>
          <el-checkbox v-model="hasCoupon" @change="selectedCoupons=[]">优惠券</el-checkbox>
          <el-button type="primary" style="margin-left: 24px" :disabled="isDisabled || !hasCoupon" @click="selectCoupon">选择优惠券</el-button>
          <mSelectedCoupon
            v-show="selectedCoupons.length>0"
            ref="selectedCouponView"
            style="margin-top: 24px"
            @onDel="onGetSelectCoupon"
          />
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="hasHb" @change="hbNum=0">赠送海贝</el-checkbox>
          <el-input-number v-model="hbNum" :disabled="isDisabled || !hasHb" style="margin-left: 9px; width:92px" :precision="0" :max="100000" :min="0" :controls="false" />
          海贝
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="hasActive" @change="selectedActivity=[]">相关活动</el-checkbox>
          <el-button type="primary" style="margin-left: 24px" :disabled="isDisabled || !hasActive" @click="selectActivity">选择活动</el-button>
          <mSelectedActivity
            v-show="selectedActivity.length>0"
            ref="selectedActivityView"
            style="margin-top: 24px"
            @onDel="onGetSelectActivity"
          />
        </el-form-item>
      </el-form>
      <div style="margin-top: 50px;text-align: center;">
        <el-button size="mini" @click="$router.push('/activity/newcomer-pack')">
          {{ $route.query.type === 'ck' ? '返回' : '取消' }}
        </el-button>
        <el-button v-if="$route.query.type !== 'ck'" type="primary" size="mini" @click="submitData">保存</el-button>
      </div>
    </div>
    <!-- 选择优惠券弹窗 -->
    <mCouponModel ref="checkCoupons" :timevalue="activeTimer" state="1" @confincheck="onGetSelectCoupon" />
    <!-- 选择活动弹窗 -->
    <mPopSelectActivity ref="selectActivity" :beginendtime="activeTimerFomart" @onSelect="onGetSelectActivity" />
  </div>
</template>
<script>
import mCouponModel from './_source/coupon-model'
import mSelectedCoupon from './_source/SelectedCoupon'
import { ActivityDetail, normalActivityAddedCouponList, normalAddedActivityList } from '@/api/coupon'
import mSelectedActivity from './_source/SelectedActivity'
import mPopSelectActivity from '@/components/Marketings/popSelectActivity'
import { formatDate } from '@/utils/timer'
import { createNewGiftBag, updateGiftBag, newUserGiftList } from '@/api/marketing'
export default {
  components: {
    mCouponModel, mSelectedCoupon, mPopSelectActivity, mSelectedActivity
  },
  data() {
    return {
      updataParams: {},
      activeTimer: [], // 活动有效时间
      hasCoupon: false, // 是否赠送优惠券
      selectedCoupons: [], // 已选择的优惠券
      hasHb: false,
      hbNum: 0,
      hasActive: false, // 是否有相关活动
      selectActive: [],
      selectedActivity: [], // 已选择活动
      hasSelectTime: []
    }
  },
  created() {
    if (this.$route.query.id) {
      this.tailActive(this.$route.query.id)
    }
    newUserGiftList().then(res => {
      this.hasSelectTime = res.data || []
    })
  },
  computed: {
    activeTimerFomart() {
      var timer = [...this.activeTimer]
      timer.map(item => {
        formatDate(item)
      })
      return timer
    },
    isDisabled() {
      return this.$route.query.type === 'ck'
    },
    pickerOptions() {
      var _self = this
      var bgTime = null; var endTime = null
      if (_self.hasSelectTime.length > 0) {
        bgTime = new Date(_self.hasSelectTime[0].beginTime).getTime() - 864000
        endTime = new Date(_self.hasSelectTime[0].endTime).getTime() + 864000
      }
      return {
        disabledDate(time) {
          const tims = time.getTime()

          return tims < new Date(new Date().getTime() - 86400000) || (endTime && (tims > bgTime && tims < endTime))
        }
      }
    }
  },
  methods: {
    // 选择优惠券(打开弹窗)
    selectCoupon() {
      this.$refs.checkCoupons.handleGetlist()
      this.$refs.checkCoupons.defaultcheck(this.selectedCoupons)
    },
    // 获取已选择的优惠券
    onGetSelectCoupon(selectedCoupons) {
      this.selectedCoupons = selectedCoupons
      this.$refs.selectedCouponView.showPage(selectedCoupons, 1)
    },
    // 选择活动
    selectActivity() {
      this.$refs.selectActivity.show(this.selectedActivity)
    },
    // 获取已经选择活动
    onGetSelectActivity(selectedActivity) {
      this.selectedActivity = selectedActivity
      this.$refs.selectedActivityView.showPage(
        selectedActivity
      )
    },
    // 选择时间后，清空已选择优惠券和活动
    changeTimes() {
      this.selectedCoupons = []
      this.selectedActivity = []
    },
    // 查询单个活动详情
    tailActive(id) {
      const params = { id: id }
      const paramsForPage = {
        pageSize: 10, currentPage: 1, id: id
      }
      normalActivityAddedCouponList(paramsForPage).then(res => { // 编辑查看时回显已选择优惠券数据
        if (res.code === '10000') {
          this.onGetSelectCoupon(res.data.records)
        }
      })
      normalAddedActivityList(paramsForPage).then(res => { // 编辑查看时回显已选择活动数据
        if (res.code === '10000') {
          this.onGetSelectActivity(res.data.records)
        }
      })
      ActivityDetail(params).then(res => { // 回显数据
        if (res.code === '10000') {
          const data = res.data
          this.updataParams = data
          this.activeTimer = [data.beginTime, data.endTime]
          this.hbNum = data.hb
          const listActivityPayEntity = data.listActivityPayEntity
          listActivityPayEntity.map(item => { // 回显是否已选择的优惠券、活动、海贝等复选框
            if (item.giftType === 1) {
              this.hasCoupon = true
            } else if (item.giftType === 2) {
              this.hasActive = true
            } else if (item.giftType === 3) {
              this.hasHb = true
            }
          })
        }
      })
    },
    // 验证优惠券、活动、海贝不为空
    voildParams() {
      if (this.hasHb && this.hbNum <= 0) {
        this.$message.error('请输入大于0的海贝数量')
        return false
      } else if (this.hasCoupon && this.selectedCoupons.length === 0) {
        this.$message('请选择优惠券或取消优惠券选项')
        return false
      } else if (this.hasActive && this.selectedActivity.length === 0) {
        this.$message.error('请选择活动或取消活动选项')
        return false
      } else {
        return true
      }
    },
    // 提交活动数据
    submitData() {
      var isPass = this.voildParams()
      if (!isPass) {
        return
      }
      var activityPayReqDTO = []
      if (this.selectedCoupons.length > 0) { // 优惠券数据
        this.selectedCoupons.map(items => {
          const obj = {
            giftId: items.id,
            giftNum: items.giftNum,
            giftType: 1
          }
          activityPayReqDTO.push(obj)
        })
      }
      if (this.selectedActivity.length > 0) { // 活动数据
        this.selectedActivity.map(items => {
          const obj = {
            giftId: items.id,
            giftNum: items.giftNum,
            giftType: 2
          }
          activityPayReqDTO.push(obj)
        })
      }
      if (this.hbNum > 0) { // 活动数据
        const obj = {
          giftId: null,
          giftNum: this.hbNum,
          giftType: 3
        }
        activityPayReqDTO.push(obj)
      }
      const params = {
        activityPayReqDTO: activityPayReqDTO,
        activityDetailName: '新人礼包',
        activityTemplateCode: 'TC005',
        beginTime: formatDate(this.activeTimer[0]),
        endTime: formatDate(this.activeTimer[1]),
        'activityType': 0,
        'bottomNote': '文案',
        'joinRule': 0,
        'productRule': 1,
        'sceneRule': 0,
        'sendRule': 1,
        'shopRule': 1
      }
      if (this.$route.query.id) { // 删除旧的优惠券等数据
        const data = this.updataParams.listActivityPayEntity
        const removedList = []
        data.map(item => {
          removedList.push(item.id)
        })
        params.removedList = removedList
        params.id = this.$route.query.id
        updateGiftBag(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.push('/activity/newcomer-pack')
          }
        })
      } else {
        createNewGiftBag(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.$router.push('/activity/newcomer-pack')
          }
        })
      }
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
