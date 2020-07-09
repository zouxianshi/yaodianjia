<template>
  <div class="app-container turntable-add-model">
    <el-steps :active="stepActive" simple>
      <el-step title="活动规则" />
      <el-step title="奖项设置" />
      <el-step title="保存提交" />
    </el-steps>
    <ruleList
      v-show="stepActive === 1"
      ref="ruleList"
      :params="params"
      @handleNext="handleNext"
    />
    <awardSetting
      v-show="stepActive === 2"
      ref="awardSetting"
      :params="params"
      @handleNext="handleNext"
      @submitAjax="submitAjax"
    />
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
        data.isShare = data.isShare === 1
        this.$refs.ruleList.ruleForm = data
        this.$refs.ruleList.ruleForm.activeTime = [
          new Date(data.beginTime),
          new Date(data.endTime)
        ]
        if (data.joinRule === 3) {
          this.$refs.ruleList.ruleForm.activeLimit = data.countRule
        } else if (data.countType === 1) {
          this.$refs.ruleList.ruleForm.personLimit = data.countRule
        } else {
          this.$refs.ruleList.ruleForm.dayLimit = data.countRule
        }
        data.listActivityGiftEntity.map(item => {
          item.winRandom = item.winRandom * 100
        })
        this.$refs.awardSetting.formsGift.selectedGift =
          data.listActivityGiftEntity
        if (this.$route.query.type === 'copy') {
          this.params.pageState = 1 // 1编辑(复制)
          console.log(this.params)
        } else {
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
        }
      })
    }
  },
  methods: {
    handleNext(stepActive, obj = {}) {
      this.stepActive = stepActive
      Object.assign(this.params, obj)
    },
    submitAjax(obj = {}) {
      // 新增优惠券
      Object.assign(this.params, obj)
      var params = this.params
      params.integralRule = parseInt(params.integralRule)
      if (
        new Date(params.beginTime).getTime() < new Date().getTime() &&
        !this.$refs.ruleList.isRuning
      ) {
        this.$message.warning('请返回上一步，活动开始时间不能小于当前时间')
        return
      } else {
        if (this.$route.query.type === 'copy') {
          // 复制活动
          delete params.id
          delete params.createTime
          delete params.updateTime
          createLuckDraw(params)
            .then(res => {
              if (res.code === '10000') {
                this.stepActive = 3
                this.$refs.submitSave.countDown()
              } else {
                this.$message({
                  message: '复制失败！',
                  type: 'error'
                })
              }
            })
            .catch(() => {
              this.$message({
                message: '复制失败！',
                type: 'error'
              })
            })
        } else {
          // 如果不是复制，判断是新增还是修改
          if (params.id) {
            params.listActivityGiftEntity = []
            params.removedList = this.removedList
            updateActivity(params)
              .then(res => {
                if (res.code === '10000') {
                  this.stepActive = 3
                  this.$refs.submitSave.countDown()
                } else {
                  this.$message({
                    message: '修改失败！',
                    type: 'error'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  message: '修改失败！',
                  type: 'error'
                })
              })
          } else {
            createLuckDraw(params)
              .then(res => {
                if (res.code === '10000') {
                  this.stepActive = 3
                  this.$refs.submitSave.countDown()
                } else {
                  this.$message({
                    message: '添加失败！',
                    type: 'error'
                  })
                }
              })
              .catch(() => {
                this.$message({
                  message: '添加失败！',
                  type: 'error'
                })
              })
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
