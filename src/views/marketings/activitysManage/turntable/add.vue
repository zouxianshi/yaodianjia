<template>
  <div class="app-container turntable-add-model">
    <el-steps :active="stepActive" simple>
      <el-step title="活动规则" />
      <el-step title="奖项设置" />
      <el-step title="保存提交" />
    </el-steps>
    <ruleList v-show="stepActive === 1" :params="params" @handleNext="handleNext" />
    <awardSetting v-show="stepActive === 2" :params="params" @handleNext="handleNext" @submitAjax="submitAjax" />
    <submitSave v-show="stepActive === 3" @handleNext="handleNext" />
  </div>
</template>
<script>
import { createLuckDraw } from '@/api/coupon'
import ruleList from './_sourse/ruleList'
import awardSetting from './_sourse/awardSetting'
import submitSave from './_sourse/submitSave'
export default {
  name: 'TurntableIndex',
  components: {
    ruleList,
    awardSetting,
    submitSave
  },
  props: {},
  data() {
    return {
      stepActive: 1, // 显示第几步
      params: {
        activityDetailName: '',
        activityGiftReqDTO: [],
        activityNote: '',
        activityTemplateCode: 'TA003',
        beginTime: '',
        bottomNote: '',
        countRule: '',
        countType: '',
        endTime: '',
        integralRule: '',
        joinRule: '',
        activityType: 0
      }
    }
  },
  methods: {
    handleNext(stepActive, obj = {}) {
      this.stepActive = stepActive
      Object.assign(this.params, obj)
    },
    submitAjax(obj = {}) { // 新增优惠券
      Object.assign(this.params, obj)
      var params = this.params
      createLuckDraw(params).then(res => {
        if (res.code === '10000') {
          this.stepActive = 3
        } else {
          this.$message({
            message: '添加失败！',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '添加失败！',
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
