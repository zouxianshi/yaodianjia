<template>
  <div class="rule-ruleList-modal">
    <div class="rule-ruleList-title">活动信息</div>
    <el-form
      ref="ruleForm"
      :model="ruleForm"
      :rules="rules"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="活动名称" prop="name">
        <el-input v-model="ruleForm.name" style="width:400px" placeholder="最多30字" />
      </el-form-item>
      <el-form-item label="活动时间" prop="value2">
        <el-date-picker
          v-model="ruleForm.value2"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </el-form-item>
      <el-form-item label="活动说明" prop="desc">
        <el-input v-model="ruleForm.desc" style="width:500px" type="textarea" placeholder="最多200字" />
      </el-form-item>
      <el-form-item label="底部文案" prop="region">
        <el-input v-model="ruleForm.region" style="width:400px" placeholder="解释说明，最多20字" />
      </el-form-item>
      <div v-if="intrShow" style="font-size:13px;margin-left:20px">
        大转盘的玩法场景说明：
        <ul>
          <li>1. 免费参与：创建抽奖活动后，将链接发布至商城首页或打印活动二维码，会员进入免费参与抽奖，较适用于小面额优惠券抽奖，提高用户活跃，促进商品销售；</li>
          <li>2. 积分参与：会员需要消耗一定的积分才能参与抽奖， 消耗会员积分库存，设置活动后可以将链接发布至微商城广告位，或打印二维码制作海报，会员扫码参与抽奖；</li>
          <li>3. 活动参与：适用于支付满一定金额获得抽奖机会的奖励，可以提高用户活跃，创建一个大转盘活动后，设置抽奖次数，然后在支付有礼中，添加支付后权益为参与抽奖，会员在微商城或线下消费满足条件后，触发抽奖机会入口，会员进入参与抽奖。</li>
        </ul>
      </div>
      <div class="rule-ruleList-title">
        活动规则
        <i class="el-icon-warning-outline" @click="()=>intrShow?intrShow=false:intrShow=true" />
      </div>
      <el-form-item label="参与方式" prop="participatio">
        <div class="rule-ruleList-participatio">
          <div>
            <el-radio v-model="ruleForm.participatio" label="1">免费参与</el-radio>
          </div>
          <div>
            <el-radio v-model="ruleForm.participatio" label="2">
              消耗积分&emsp;每消耗&emsp;
              <el-input v-model="ruleForm.participatioInput" style="width:100px" />&emsp;积分，参与一次
            </el-radio>
          </div>
          <div>
            <el-radio v-model="ruleForm.participatio" label="3">免费参与</el-radio>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="抽奖次数" prop="sweepstakes">
        <div class="rule-ruleList-participatio">
          <div>
            <el-radio v-model="ruleForm.sweepstakes" label="1">
              <span>
                每天可抽奖&emsp;
                <el-input v-model="ruleForm.everyday" style="width:100px" />
              </span>
            </el-radio>
          </div>
          <div>
            <el-radio v-model="ruleForm.sweepstakes" label="2">
              <span>
                每人可抽奖&emsp;
                <el-input v-model="ruleForm.people" style="width:100px" />
              </span>
            </el-radio>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <div style="margin-left:30px">
      <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'GiftCard',
  // props: {

  // },
  data() {
    var validatesweepstake = (rule, value, callback) => {
      if (value === '1') {
        if (this.ruleForm.everyday === '') {
          callback(new Error('请输入每日抽奖次数'))
        } else {
          callback()
        }
      } else {
        if (this.people === '') {
          callback(new Error('请输入每人抽奖次数'))
        } else {
          callback()
        }
      }
    }
    var validateparticipatio = (rule, value, callback) => {
      if (value === '2') {
        if (this.ruleForm.participatioInput === '') {
          callback(new Error('请输入消耗积分数'))
        }
      } else {
        callback()
      }
    }
    return {
      intrShow: false,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      ruleForm: {
        name: '',
        region: '',
        desc: '',
        value2: '',
        participatio: '1',
        sweepstakes: '1',
        participatioInput: '',
        everyday: '',
        people: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 1, max: 30, message: '最多30字', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请输入底部文案', trigger: 'blur' },
          { min: 1, max: 20, message: '最多20字', trigger: 'blur' }
        ],
        value2: [
          {
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        desc: [
          { required: true, message: '请填写活动说明', trigger: 'blur' },
          { min: 1, max: 200, message: '最多200字', trigger: 'blur' }
        ],
        sweepstakes: [{ validator: validatesweepstake, trigger: 'change' }],
        participatio: [{ validator: validateparticipatio, trigger: 'change' }]
      }
    }
  },
  watch: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.$emit('handleNext', false, true, false)
        } else {
          console.log('error submit!!')
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
    height: 50px;
    line-height: 50px;
    width: 70%;
    border-bottom: 2px solid #bbbbbb;
    margin-bottom: 20px;
  }
  .el-textarea__inner {
    min-height: 70px !important;
  }
  .el-icon-warning-outline:hover {
    cursor: pointer;
  }
  .rule-ruleList-participatio {
    margin-top: 30px;
    div {
      margin: 5px 0;
    }
  }
}
</style>
