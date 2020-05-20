<template>
  <div class="app-container turntable-add-model">
    <el-steps :active="stepActive" simple>
      <el-step title="活动规则" />
      <el-step title="奖项设置" />
      <el-step title="保存提交" />
    </el-steps>
    <ruleList v-show="stepActive === 1" ref="ruleList" :params="params" @handleNext="handleNext" />
    <awardSetting v-show="stepActive === 2" ref="awardSetting" :params="params" @handleNext="handleNext" @submitAjax="submitAjax" />
    <submitSave v-show="stepActive === 3" ref="submitSave" @handleNext="handleNext" />
  </div>
</template>
<script>
import { createLuckDraw, ActivityDetail, updateActivity } from '@/api/coupon'
import ruleList from './_sourse/ruleList'
import awardSetting from './_sourse/awardSetting'
import submitSave from './_sourse/submitSave'
import _ from 'lodash'
export default {
  name: 'TurntableIndex',
  components: {
    ruleList,
    awardSetting,
    submitSave
  },
  data() {
    return {
      stepActive: 1, // 显示第几步
      removedList: [],
      params: {
        activityDetailName: '',
        activityGiftReqDTO: [],
        activityNote: '',
        activityTemplateCode: this.$route.query.code,
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
  created() {
    if (this.$route.query.id) {
      var params = {
        id: this.$route.query.id
      }
      ActivityDetail(params).then(res => {
        var data = res.data
        this.params = data
        this.removedList = [] // 修改礼品列表时用
        _.map(data.listActivityGiftEntity, item => {
          this.removedList.push(item.id)
        })
        this.$refs.ruleList.ruleForm = data
        this.$refs.ruleList.activeTime = [data.beginTime, data.endTime]
        if (data.countType === 1) {
          this.$refs.ruleList.personLimit = data.countRule
        } else {
          this.$refs.ruleList.dayLimit = data.countRule
        }
        data.listActivityGiftEntity.map(item => {
          item.winRandom = item.winRandom * 100
        })
        this.$refs.awardSetting.formsGift.selectedGift = data.listActivityGiftEntity
        if (data.state === 1 && data.status === 1) {
          this.params.pageState = 1 // 1编辑 2查看
        } else if (data.state === 2 && data.status === 1) {
          this.params.pageState = 1
        } else if (
          (data.state === 3 && data.status === 1) ||
          (data.state === 1 && data.status === 0) ||
          (data.state === 2 && data.status === 0) ||
          (data.state === 3 && data.status === 0)
        ) {
          this.params.pageState = 2 // 1编辑 2查看
        }
      })
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
      params.integralRule = parseInt(params.integralRule)
      if (params.id) {
        params.listActivityGiftEntity = []
        params.removedList = this.removedList
        updateActivity(params).then(res => {
          if (res.code === '10000') {
            this.stepActive = 3
            this.$refs.submitSave.countDown()
          } else {
            this.$message({
              message: '修改失败！',
              type: 'error'
            })
          }
        }).catch(err => {
          console.log(err)
          this.$message({
            message: '修改失败！',
            type: 'error'
          })
        })
      } else {
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
}
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
