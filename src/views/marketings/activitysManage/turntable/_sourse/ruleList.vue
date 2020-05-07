<template>
  <div class="rule-ruleList-modal">
    <div class="rule-ruleList-title">活动信息</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
      size="mini"
      :disabled="isPageUpdateOrView"
    >
      <el-form-item label="活动名称" prop="activityDetailName">
        <el-input v-model="ruleForm.activityDetailName" style="width:400px" placeholder="最多30字" />
      </el-form-item>
      <el-form-item label="活动时间">
        <el-date-picker
          v-model="activeTime"
          :disabled="isRuning"
          type="datetimerange"
          range-separator="至"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="活动说明" prop="activityNote">
        <el-input v-model="ruleForm.activityNote" style="width:500px" type="textarea" maxlength="200" placeholder="最多200字" />
      </el-form-item>
      <el-form-item label="底部文案" prop="bottomNote">
        <el-input v-model="ruleForm.bottomNote" :disabled="isRuning" style="width:400px" placeholder="解释说明，最多20字" />
      </el-form-item>
      <el-form-item>
        <div v-if="intrShow && this.$route.query.code==='TA003'" class="intrwarning">
          大转盘的玩法场景说明：
          <ul>
            <li>1. 免费参与：创建抽奖活动后，将链接发布至商城首页或打印活动二维码，会员进入免费参与抽奖，较适用于小面额优惠券抽奖，提高用户活跃，促进商品销售；</li>
            <li>2. 积分参与：会员需要消耗一定的积分才能参与抽奖， 消耗会员积分库存，设置活动后可以将链接发布至微商城广告位，或打印二维码制作海报，会员扫码参与抽奖；</li>
            <li>3. 活动参与：适用于支付满一定金额获得抽奖机会的奖励，可以提高用户活跃，创建一个大转盘活动后，设置抽奖次数，然后在支付有礼中，添加支付后权益为参与抽奖，会员在微商城或线下消费满足条件后，触发抽奖机会入口，会员进入参与抽奖。</li>
          </ul>
        </div>
        <div v-if="intrShow && this.$route.query.code==='TA004'" class="intrwarning">
          刮刮乐的玩法场景说明：
          <ul>
            <li>1. 免费参与：创建抽奖活动后，将链接发布至商城首页或打印活动二维码，会员进入免费参与抽奖，较适用于小面额优惠券抽奖，提高用户活跃，促进商品销售；</li>
            <li>2. 积分参与：会员需要消耗一定的积分才能参与抽奖， 消耗会员积分库存，设置活动后可以将链接发布至微商城广告位，或打印二维码制作海报，会员扫码参与抽奖；</li>
            <li>3. 活动参与：适用于支付满一定金额获得抽奖机会的奖励，可以提高用户活跃，创建一个活动后，设置抽奖次数，然后在支付有礼中，添加支付后权益为参与抽奖，会员在微商城或线下消费满足条件后，触发抽奖机会入口，会员进入参与抽奖。</li>
          </ul>
        </div>
        <div slot="label">
          活动规则
          <i style="color: #faad14;" class="el-icon-question" @click="()=>intrShow?intrShow=false:intrShow=true" />
        </div>
      </el-form-item>
      <el-form-item label="参与方式" prop="integralRule">
        <el-radio-group v-model="ruleForm.joinRule" :disabled="isRuning" style="width:120px;font-size: 18px;line-height: inherit;" @change="ruleForm.integralRule=ruleForm.countRule=0">
          <el-radio :label="1">免费参与</el-radio>
          <el-radio :label="2">消耗积分&emsp;每消耗&emsp;
            <el-input v-model="ruleForm.integralRule" onkeyup="this.value=this.value.replace(/\D/g,'')" :disabled="isRuning || ruleForm.joinRule !== 2" maxlength="8" style="width:100px" />&emsp;积分，参与一次
          </el-radio>
          <el-radio :label="3">活动参与</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="抽奖次数">
        <el-radio-group v-if="ruleForm.joinRule !== 3" v-model="ruleForm.countType" :disabled="isRuning" style="width:120px;font-size: 18px;line-height: inherit;" @change="changeCount">
          <el-radio :label="2">
            <span>
              每天可抽奖&emsp;
              <el-input v-model="dayLimit" onkeyup="this.value=this.value.replace(/\D/g,'')" :disabled="isRuning || ruleForm.countType===1" maxlength="6" style="width:100px" />
            </span>
          </el-radio>
          <el-radio :label="1">
            <span>
              每人可抽奖&emsp;
              <el-input v-model="personLimit" onkeyup="this.value=this.value.replace(/\D/g,'')" :disabled=" isRuning || ruleForm.countType===2" maxlength="6" style="width:100px" />
            </span>
          </el-radio>
        </el-radio-group>
        <el-input v-else v-model="ruleForm.countRule" :disabled="isRuning" onkeyup="this.value=this.value.replace(/\D/g,'')" maxlength="6" style="width:120px" />
      </el-form-item>
    </el-form>
    <div style="margin-left:30px">
      <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
    </div>
  </div>
</template>
<script>
import { formatDate } from '@/utils/timer'
export default {
  name: 'GiftCard',
  props: {
    params: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    var validateparticipatio = (rule, value, callback) => {
      if (this.ruleForm.joinRule === 2 && (Number(value) === 0 || ('' + value).trim() === '')) {
        callback(new Error('请输入大于0的消耗积分数'))
      } else {
        callback()
      }
    }
    return {
      intrShow: false,
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().getTime() - 86400000)
        }
      },
      activeTime: [], // 活动有效期
      dayLimit: 0, // 每天限制
      personLimit: 0, // 每人限制
      ruleForm: {
        activityDetailName: '', // 活动名称
        bottomNote: '', // 底部文案
        beginTime: '', // 活动开始时间
        endTime: '', // 活动结束时间
        activityNote: '', // 活动说明
        integralRule: 0, // 参与消耗积分
        joinRule: 1, // 参与方式
        countType: 2, // 参与限制类型  1：每人 2：每天
        countRule: 0 // 次数限制
      },
      rules: {
        activityDetailName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 30, message: '最多30字', trigger: 'blur' }
        ],
        bottomNote: [
          { required: true, message: '请输入底部文案', trigger: 'blur' },
          { min: 1, max: 20, message: '最多20字', trigger: 'blur' }
        ],
        activityNote: [
          { required: true, message: '请填写活动说明', trigger: 'blur' },
          { min: 1, max: 200, message: '最多200字', trigger: 'blur' }
        ],
        integralRule: [{ validator: validateparticipatio, trigger: 'blur' }] // 参与消耗积分
      }
    }
  },
  computed: {
    isPageUpdateOrView() { // 判断编辑还是查看页面
      if (this.params.pageState === 2) { // 查看
        return true
      } else { // 编辑
        return false
      }
    },
    isRuning() { // 活动进行中
      if (this.params.state === 1) {
        return true
      } else {
        return false
      }
    }
  },
  watch: {
    activeTime(newVal) {
      this.ruleForm.beginTime = formatDate(newVal[0])
      this.ruleForm.endTime = formatDate(newVal[1])
    },
    personLimit(newVal) { // 监听按人限制变化
      if (this.ruleForm.countType === 1) {
        this.ruleForm.countRule = newVal
      }
    },
    dayLimit(newVal) {
      if (this.ruleForm.countType === 2) {
        this.ruleForm.countRule = newVal
      }
    }
  },
  methods: {
    changeCount() { // 改变限制次数类型
      this.personLimit = this.dayLimit = 0
      this.ruleForm.countRule = 0
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (!this.activeTime[0]) {
            this.$message({
              message: '请选择活动时间',
              type: 'error'
            })
            return false
          }
          if (Number(this.ruleForm.countRule) === 0) {
            this.$message({
              message: '请输入正确抽奖次数限制',
              type: 'error'
            })
            return false
          }
          this.$emit('handleNext', 2, this.ruleForm)
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.rule-ruleList-modal {
  .rule-ruleList-title {
    height: 15px;
    padding-left: 10px;
    margin-top: 10px;
    line-height: 15px;
    width: 70%;
    border-left: 2px solid #409eff;
    margin-bottom: 20px;
  }
  .intrwarning{
    font-size:13px;
    margin-left:20px;
    background-color: #fdf6ec;
    color: #e6a23c;
    border-radius: 5px;
    padding:10px
  }
  .el-textarea__inner {
    min-height: 70px !important;
  }
  .el-icon-warning-outline:hover {
    cursor: pointer;
  }
}
</style>
