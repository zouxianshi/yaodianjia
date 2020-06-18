<template>
  <div class="sign-create-modal app-container">
    <div class="title">
      签到规则
    </div>
    <el-form :model="paramsForm">
      <el-form-item label="签到模式">
        <el-radio-group v-model="paramsForm.modelType" required>
          <el-radio :label="1">固定模式</el-radio>
          <el-radio :label="2">激励模式</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="paramsForm.modelType === 1" label="奖励设置" required>
        每人每天签到赠送
        <el-input-number v-model="paramsForm.fixedValue" :precision="2" :min="1" :max="99999" :controls="false" size="mini" style="width: 120px" />海贝
        <span class="tips">会员每日签到获得海贝奖励，无连续签到也可获得此奖励</span>
      </el-form-item>
      <el-form-item v-if="paramsForm.modelType === 2" label="奖励设置" required>
        <div class="jl-items">
          首次签到赠送
          <el-input-number v-model="paramsForm.fixedValue" :precision="2" :min="1" :max="99999" :controls="false" size="mini" style="width: 120px" />海贝
        </div>
        <div class="jl-items">
          连续签到，在前一天赠送数量的基础上多赠送
          <el-input-number v-model="paramsForm.incrValue" :precision="2" :min="1" :max="99999" :controls="false" size="mini" style="width: 120px" />海贝
        </div>
        <div class="jl-items">
          连续签到
          <el-input-number v-model="paramsForm.incrLimitRuleValue" :precision="0" :min="2" :max="365" :controls="false" size="mini" style="width: 120px" />
          天后，不在赠送额外海贝，以第
          <el-input-number v-model="paramsForm.incrLimitValue" :precision="0" :min="2" :max="365" :controls="false" size="mini" style="width: 120px" />
          天的赠送额度继续赠送
        </div>
      </el-form-item>
      <el-form-item v-if="paramsForm.modelType === 2">
        <div class="tips" style="margin: 0 0 24px ;  line-height:25px; width: 70%">
          例如:<br>
          某商家设置了激励模式的海贝签到规则，规则如下：首次签到送1海贝；连续签到，在上次赠送的基础上多赠送1海贝；连续签到5天后不再额外赠送，以第五天的额度继续赠送。
          顾客A：第一天签到送了1海贝，第二天签到送了2海贝，第三天签到送了3海贝，第四天签到送了4海贝，第五天签到送了5海贝，第六天签到送了5海贝，第七天签到送了5海贝，第八天忘记签到，第九天签到送了1海贝。
          顾客B：第一天签到送了1海贝，第二天签到送了2海贝，第三天忘记签到，第四天签到送1海贝……
        </div>
      </el-form-item>
      <el-form-item label="规则说明">
        <el-input
          v-model="paramsForm.remark"
          style="width:500px; vertical-align: text-top;"
          type="textarea"
          maxlength="200"
          :show-word-limit="true"
          :rows="5"
          placeholder="输入规则说明"
        />
      </el-form-item>
    </el-form>
    <div class="submit-box">
      <el-button size="mini">取消</el-button>
      <el-button type="primary" size="mini" @click="_onSubmit">确定</el-button>
    </div>
  </div>
</template>
<script>
import { _searchMemberSignIn, sigenInSavaAndEdit } from '@/api/marketing'
import _ from 'lodash'
export default {
  data() {
    return {
      paramsForm: {
        modelType: 1, // 1 固定模式 2 激励模式
        fixedValue: 1,
        remark: '', // 规则说明
        incrLimitRuleValue: 2, // 连续签到X天后
        incrLimitValue: 2, // 以第X天的为准
        incrValue: 0 // 多赠送的海贝
      }
    }
  },
  created() {
    _searchMemberSignIn().then(res => {
      if (res.code === '10000') {
        this.paramsForm = res.data
      }
    })
  },
  methods: {
    _onSubmit() {
      var params = _.cloneDeep(this.paramsForm)
      if (params.fixedValue === '' || !params.fixedValue) {
        this.$message.error('奖励设置不能为空！')
        return false
      }
      if (params.modelType === 2 && (!params.incrValue || !params.incrLimitRuleValue || !params.incrLimitValue)) {
        this.$message.error('奖励设置不能有空！')
        return false
      }
      sigenInSavaAndEdit(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            type: 'success',
            message: '操作成功！'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.sign-create-modal{
  .title{
    font-size: 18px;height: 50px;line-height: 50px;border-bottom: 1px solid #666;font-weight: 500;margin-bottom: 24px;
  }
  .tips{
    margin-left: 24px;font-size: 12px;color: #999;
  }
  .jl-items{
    margin-left: 67px;
  }
}
</style>
