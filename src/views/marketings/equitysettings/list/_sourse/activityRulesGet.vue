<template>
  <div
    v-loading="pageLoading"
    class="activityRules-model"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
  >
    <div class="header">
      消费奖励
      <span style="color: #faad14">（一年内可申请12次修改，本年还可修改{{ leftTimes || 0 }}次）</span>
    </div>
    <el-form
      ref="forms"
      :model="forms"
      label-width="150px"
      validate-on-rule-change
      :disable="!leftTimes"
      label-position="left"
      style="height: calc(100vh - 350px); overflow: auto"
    >
      <el-form-item label="按次数兑换：" />
      <div class="item-lable">
        <el-form-item
          v-for="(domain, $Index) in forms.numberChange"
          :key="domain.keyId"
          :label="'规则'+($Index+1)+'：'"
        >
          <div class="form-line">
            <span style="margin-right: 8px">每消费</span>
            <el-form-item
              :ref="'numberChange.'+ $Index + '.number'"
              :prop="'numberChange.'+ $Index + '.number'"
              :rules="{
                validator:validExchangeHb, trigger: 'change'
              }"
            >
              <el-input v-model.number="domain.number" placeholder style="width:80px" size="small">
                <template slot="append">次</template>
              </el-input>
            </el-form-item>
            <span class="send">送</span>
            <el-form-item
              :ref="'numberChange.'+ $Index + '.exchangeHb'"
              :prop="'numberChange.'+ $Index + '.exchangeHb'"
              :rules="{
                validator:validExchangeHb, trigger: 'change'
              }"
            >
              <el-input
                v-model.number="domain.exchangeHb"
                placeholder
                min="0"
                style="width:120px"
                size="small"
              >
                <template slot="append">个海贝</template>
              </el-input>
            </el-form-item>
            <span style="margin-left: 16px; margin-right: 8px">次数是否累计</span>
            <el-form-item
              :ref="'numberChange.'+ $Index + '.cumulative'"
              :prop="'numberChange.'+ $Index + '.cumulative'"
            >
              <el-select
                v-model="domain.cumulative"
                placeholder="请选择"
                size="small"
                style="width:70px"
              >
                <el-option :key="1" label="是" :value="1" />
                <el-option :key="0" label="否" :value="0" />
              </el-select>
            </el-form-item>
            <el-divider direction="vertical" />
            <el-popconfirm
              placement="top"
              icon="el-icon-info"
              icon-color="red"
              title="确定移除此条规则吗？"
              @onConfirm="deleteRule('numberChange', $Index)"
            >
              <i slot="reference" class="el-icon-delete" />
            </el-popconfirm>
          </div>
        </el-form-item>
      </div>

      <el-form-item v-if="!forms.numberChange.length" label=" ">
        <el-button class="btn-add-rule" @click="addRule('numberChange')">+ 添加规则</el-button>
        <!-- <el-popover placement="top-start" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <el-image style="width: 400px;" :src="ImgexNum" />
          <span slot="reference" class="example-btn">示例演示</span>
        </el-popover>-->
      </el-form-item>
      <el-form-item label="定额消费兑换：" />
      <div class="item-lable">
        <el-form-item
          v-for="(domain, $Index) in forms.amountAreaChange"
          :key="domain.keyId"
          :label="'规则'+($Index+1)+'：'"
        >
          <div class="form-line">
            <span style="margin-right: 8px">消费</span>
            <el-form-item
              :ref="'amountAreaChange.'+ $Index + '.minAmount'"
              :prop="'amountAreaChange.'+ $Index + '.minAmount'"
              :rules="{
                validator:validAmountPrice, trigger: 'change'
              }"
            >
              <el-input v-model="domain.minAmount" placeholder style="width:120px" size="small">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
            <span class="send">送</span>
            <el-form-item
              :ref="'amountAreaChange.'+ $Index + '.exchangeHb'"
              :prop="'amountAreaChange.'+ $Index + '.exchangeHb'"
              :rules="{
                validator:validExchangeHb, trigger: 'change'
              }"
            >
              <el-input
                v-model.number="domain.exchangeHb"
                placeholder
                min="0"
                style="width:120px"
                size="small"
              >
                <template slot="append">个海贝</template>
              </el-input>
            </el-form-item>
            <span style="margin-left: 16px; margin-right: 8px">次数是否累计</span>
            <el-form-item
              :ref="'amountAreaChange.'+ $Index + '.cumulative'"
              :prop="'amountAreaChange.'+ $Index + '.cumulative'"
            >
              <el-select
                v-model="domain.cumulative"
                placeholder="请选择"
                size="small"
                style="width:70px"
              >
                <el-option :key="1" label="是" :value="1" />
                <el-option :key="0" label="否" :value="0" />
              </el-select>
            </el-form-item>
            <el-divider direction="vertical" />
            <el-popconfirm
              placement="top"
              icon="el-icon-info"
              icon-color="red"
              title="确定移除此条规则吗？"
              @onConfirm="deleteRule('amountAreaChange', $Index)"
            >
              <i slot="reference" class="el-icon-delete" />
            </el-popconfirm>
          </div>
        </el-form-item>
      </div>
      <el-form-item v-if="!forms.amountAreaChange.length" label=" ">
        <el-button class="btn-add-rule" @click="addRule('amountAreaChange')">+ 添加规则</el-button>
      </el-form-item>
      <el-form-item label="区域金额消费兑换：" />
      <div class="item-lable">
        <el-form-item
          v-for="(domain, $Index) in forms.amountChange"
          :key="domain.keyId"
          :label="'规则'+($Index+1)+'：'"
        >
          <div class="form-line">
            <span style="margin-right: 8px">消费</span>
            <el-form-item
              :ref="'amountChange.'+ $Index + '.minAmount'"
              :prop="'amountChange.'+ $Index + '.minAmount'"
              :rules="{
                validator:validAmountPrice, trigger: 'change'
              }"
            >
              <el-input v-model="domain.minAmount" placeholder style="width:120px" size="small">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>

            <span class="tips-text">-</span>
            <el-form-item
              :ref="'amountChange.'+ $Index + '.maxAmount'"
              :prop="'amountChange.'+ $Index + '.maxAmount'"
              :rules="{
                validator:validMaxAmountPrice, trigger: 'change'
              }"
            >
              <el-input v-model="domain.maxAmount" placeholder style="width:120px" size="small">
                <template slot="append">￥</template>
              </el-input>
            </el-form-item>
            <span class="send">送</span>
            <el-form-item
              :ref="'amountChange.'+ $Index + '.exchangeHb'"
              :prop="'amountChange.'+ $Index + '.exchangeHb'"
              :rules="{
                validator:validExchangeHb, trigger: 'change'
              }"
            >
              <el-input
                v-model.number="domain.exchangeHb"
                placeholder
                style="width:120px"
                size="small"
              >
                <template slot="append">个海贝</template>
              </el-input>
            </el-form-item>

            <el-divider v-if="forms.amountChange.length >= 1" direction="vertical" />
            <el-popconfirm
              v-if="forms.amountChange.length >= 1"
              placement="top"
              icon="el-icon-info"
              icon-color="red"
              title="确定移除此条规则吗？"
              @onConfirm="deleteRule('amountChange', $Index)"
            >
              <i slot="reference" class="el-icon-delete" />
            </el-popconfirm>
          </div>
        </el-form-item>
      </div>

      <el-form-item label=" ">
        <el-button class="btn-add-rule" @click="addRule('amountChange')">+ 添加规则</el-button>
        <el-popover placement="top-start" trigger="hover" content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
          <el-image style="width: 400px;" :src="ImgexAmount" />
          <span slot="reference" class="example-btn">示例演示</span>
        </el-popover>
      </el-form-item>
      <div class="item-title">调整倍率</div>
      <div class="item-lable">
        <el-form-item label="生效时间：">
          <div class="form-line">
            <el-select
              v-model="forms.unit"
              style="width: 120px; margin-right: 10px"
              placeholder="请选择"
              @change="unitChange"
            >
              <el-option
                v-for="item in timeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-form-item
              v-if="forms.unit === '1'"
              ref="weekTime"
              prop="weekTime"
              :rules="{
                validator:vilidDate, trigger: 'change'
              }"
            >
              <el-select v-model="forms.weekTime" clearable multiple placeholder="请选择星期几">
                <el-option
                  v-for="item in weekTimes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item
              v-if="forms.unit === '2'"
              ref="monthTime"
              prop="monthTime"
              :rules="{
                validator:vilidDate, trigger: 'change'
              }"
            >
              <el-select
                v-model="forms.monthTime"
                popper-class="monthTime"
                multiple
                clearable
                placeholder="请选择几号"
                style="width: 260px;"
              >
                <el-option
                  v-for="item in monthTimes"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <template v-if="forms.unit === '3'">
              <el-form-item ref="startTime" prop="startTime">
                <el-date-picker
                  v-model="forms.customTime.startTime"
                  type="datetime"
                  placeholder="不限制"
                  clearable
                />
              </el-form-item>
              <span style="margin: 0 10px">-</span>
              <el-form-item ref="endTime" prop="endTime">
                <el-date-picker
                  v-model="forms.customTime.endTime"
                  type="datetime"
                  placeholder="不限制"
                  clearable
                />
              </el-form-item>
            </template>
          </div>
        </el-form-item>
        <el-form-item label="海贝获得倍率：">
          <el-input-number
            v-model="forms.rate"
            style="width:120px"
            controls-position="right"
            :min="1"
            :max="9999"
          />
        </el-form-item>
      </div>
    </el-form>
    <div style="text-algin: center">
      <el-popconfirm
        placement="top"
        icon="el-icon-info"
        icon-color="red"
        :title="'本年度剩余可修改次数为' + leftTimes + '次, 确定修改吗？'"
        @onConfirm="onSubmit"
      >
        <el-button
          slot="reference"
          :disabled="!leftTimes || !(forms.numberChange.length || forms.amountChange.length)"
          :loading="loading"
          type="primary"
          size="small"
        >保存</el-button>
      </el-popconfirm>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { throttle } from '@/utils/throttle'
import ImgexAmount from '@/assets/image/acvity/exchangeHb-amount.png'
import ImgexNum from '@/assets/image/acvity/exchangeHb-num.png'
import { saveExchangeHb, queryExchangeHb } from '@/api/equity'
import { checkNumberdouble, checkNumber } from '@/utils/validate'
export default {
  name: 'ActivityRules',
  props: {},
  data() {
    return {
      forms: {
        numberChange: [],
        amountChange: [],
        amountAreaChange: [],
        rate: 1, // 倍率
        unit: '0',
        weekTime: '',
        monthTime: '',
        customTime: {
          startTime: '',
          endTime: ''
        }
      },
      ImgexAmount,
      ImgexNum,
      leftTimes: '',
      loading: false,
      pageLoading: false,
      timeOptions: [
        { value: '0', label: '不限制' },
        { value: '1', label: '每周' },
        { value: '2', label: '每月' },
        { value: '3', label: '自定义' }
      ],
      weekTimes: [
        { value: '1', label: '每周一' },
        { value: '2', label: '每周二' },
        { value: '3', label: '每周三' },
        { value: '4', label: '每周四' },
        { value: '5', label: '每周五' },
        { value: '6', label: '每周六' },
        { value: '7', label: '每周日' }
      ],
      monthTimes: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  mounted() {
    this.getData()
    this.monthTimes = Array.from({ length: 28 }, (item, index) => {
      return {
        value: `${index > 8 ? '' : '0'}${index + 1}`,
        label: `${index > 8 ? '' : '0'}${index + 1}`
      }
    })
    console.log('this.monthTimes---', this.monthTimes)
  },
  methods: {
    getData() {
      this.pageLoading = true
      queryExchangeHb()
        .then(res => {
          console.log('queryExchangeHb----', res)
          this.pageLoading = false
          if (res.code === '10000') {
            const { data } = res
            this.forms = {
              ...this.forms,
              numberChange:
                data && Array.isArray(data.numberExchangeRules)
                  ? data.numberExchangeRules
                  : [],
              amountChange:
                data && Array.isArray(data.amountExchangeRules)
                  ? data.amountExchangeRules
                  : [],
              amountAreaChange:
                data && data.fixedAmountRule
                  ? [data.fixedAmountRule]
                  : [],
              rate: data.rate || 1,
              unit: data.rateEffectType || '0',
              weekTime:
                data.rateEffectType === '1'
                  ? data.rateEffectArray.split(',')
                  : [],
              monthTime:
                data.rateEffectType === '2'
                  ? data.rateEffectArray.split(',')
                  : [],
              customTime: {
                startTime: data.rateEffectBeginTime,
                endTime: data.rateEffectEndTime
              }
            }

            this.leftTimes = data && data.limitModifyTimes
          }
        })
        .catch(() => {
          this.pageLoading = false
        })
    },
    // addRule
    addRule(type) {
      const numberChangeInit = {
        number: '',
        exchangeHb: '',
        cumulative: 0,
        keyId: `numberChange-${new Date().getTime()}`
      }
      const amountChangeInit = {
        minAmount: '',
        maxAmount: '',
        exchangeHb: '',
        keyId: `amountChange-${new Date().getTime()}`
      }
      const amountAreaChangeInit = {
        minAmount: '',
        exchangeHb: '',
        cumulative: 0,
        keyId: `amountAreaChange-${new Date().getTime()}`
      }
      let initRuleFull = ''
      if (type === 'numberChange') {
        initRuleFull = numberChangeInit
      } else if (type === 'amountChange') {
        initRuleFull = amountChangeInit
      } else {
        initRuleFull = amountAreaChangeInit
      }
      this.forms[type] = this.forms[type].concat({
        ...initRuleFull
      })
    },
    deleteRule(type, index) {
      const data = JSON.parse(JSON.stringify(this.forms[type]))
      data.splice(index, 1)
      this.forms[type] = data
    },
    // 按金额兑换消费最小值校验
    validAmountPrice(rule, value, callback) {
      const index = rule.field.split('.')[1]
      console.log('validAmountPrice---', rule, value, index)
      if (!_.toNumber(value)) {
        return callback(new Error('不可为空且大于0'))
      }
      if (rule.field.split('.')[0] === 'amountChange') {
        if (
          this.forms.amountChange[index].maxAmount !== null &&
          this.forms.amountChange[index].maxAmount !== '' &&
          value > Number(this.forms.amountChange[index].maxAmount || 0)
        ) {
          return callback(new Error('最小区间不可高于最大区间'))
        }
      }
      if (value > 99999999) {
        return callback(new Error('金额不可大于99999999'))
      }
      if (!checkNumberdouble(value)) {
        return callback(new Error('请输入最多2位小数的正数'))
      }
      callback()
    },
    // 按金额兑换消费最大值校验
    validMaxAmountPrice(rule, value, callback) {
      console.log('validMaxAmountPrice---', rule, value)
      const index = rule.field.split('.')[1]
      if (!_.toNumber(value)) {
        return callback(new Error('不可为空且大于0'))
      }
      if (
        this.forms.amountChange[index].minAmount !== null &&
        this.forms.amountChange[index].minAmount !== '' &&
        value < Number(this.forms.amountChange[index].minAmount || 0)
      ) {
        return callback(new Error('最大区间不可低于最小区间'))
      }
      if (value > 99999999) {
        return callback(new Error('金额不可大于99999999'))
      }
      if (!checkNumberdouble(value)) {
        return callback(new Error('请输入最多2位小数的正数'))
      }
      // 这里要判断跟最小区间的合理性
      if (this.forms.amountChange[index].minAmount * 1) {
        this.$refs['forms'].clearValidate(
          _.replace(rule.field, 'maxAmount', 'minAmount')
        )
      }
      callback()
    },
    validExchangeHb(rule, value, callback) {
      if (!_.toNumber(value)) {
        return callback(new Error('不可为空且大于0'))
      }
      if (!checkNumber(value)) {
        return callback(new Error('请输入正确的正整数'))
      }
      callback()
    },
    validDays(rule, value, callback) {
      if (value) {
        if (!checkNumber(value)) {
          return callback(new Error('请输入正整数'))
        }
      }
      callback()
    },
    vilidDate(rule, value, callback) {
      console.log('vilidDate', rule, value, callback)
      console.log('vilidDate---unit', this.forms.unit)
      // const fieldName = rule.field
      if (this.forms.unit !== '0' || this.forms.unit !== '3') {
        console.log(
          'vilidDate--Array.isArray',
          !(Array.isArray(value) && value.length)
        )
        if (!(Array.isArray(value) && value.length)) {
          return callback(new Error('请选择日期'))
        }
      }
      callback()
    },
    unitChange() {
      // 移除部分表单的校验结果
      this.$refs['forms'].clearValidate([
        'weekTime',
        'monthTime',
        'startTime',
        'endTime'
      ])
    },
    // 校验倍率模块的必填项
    onSubmit: throttle(function() {
      let params = {}
      const numberExchangeRules = []
      const amountExchangeRules = []
      const amountAreaExchangeRules = []
      let rateEffectArray = ''
      this.$refs['forms'].validate((valid, object) => {
        console.log('forms-----', object, this.forms)
        if (valid) {
          // this.loading = true
          if (this.forms.numberChange.length) {
            this.forms.numberChange.forEach(element => {
              console.log('element---', element)
              numberExchangeRules.push({
                ...element,
                ruleType: 0,
                merCode: this.merCode
              })
            })
          }
          if (this.forms.amountChange.length) {
            this.forms.amountChange.forEach(element => {
              amountExchangeRules.push({
                ...element,
                ruleType: 1,
                merCode: this.merCode
              })
            })
          }
          if (this.forms.amountAreaChange.length) {
            this.forms.amountAreaChange.forEach(element => {
              amountAreaExchangeRules.push({
                ...element,
                ruleType: 3,
                merCode: this.merCode,
                minAmount: element.minAmount * 1 || 0
              })
            })
          }
          if (this.forms.unit === '1') {
            rateEffectArray = this.forms.weekTime.join(',')
          } else if (this.forms.unit === '2') {
            rateEffectArray = this.forms.monthTime.join(',')
          } else {
            rateEffectArray = ''
          }
          params = {
            amountExchangeRules,
            merCode: this.merCode,
            numberExchangeRules,
            fixedAmountRule: amountAreaExchangeRules[0],
            rateExchangeRules: {
              ruleType: 2,
              rate: this.forms.rate,
              rateEffectType: this.forms.unit,
              rateEffectArray, // 生效时间-保存周/月生效时间
              rateEffectBeginTime: this.forms.customTime.startTime, // 生效时间-自定义开始时间
              rateEffectEndTime: this.forms.customTime.endTime // 生效时间-自定义结束时间
            }
          }
          console.log('要上传的参数---', params)
          saveExchangeHb(params).then(res => {
            if (res.code === '10000') {
              this.loading = false
              this.$message({
                message: '保存成功',
                type: 'success'
              })
              this.$emit('submitactivit', 2)
            }
          })
        } else {
          console.log('error submit!!')
          this.loading = false
          return false
        }
      })
    }, 1000)
  }
}
</script>

<style lang="scss" scoped>
.activityRules-model {
  height: calc(100vh - 250px);
  min-width: 700px;
  overflow: auto;
  .header {
    padding: 15px 0;
    border-bottom: 1px solid rgba(231, 231, 231, 1);
    margin-bottom: 15px;
  }
  .form-title {
    font-size: 14px;
    margin: 20px 0;
  }
  .form-line {
    display: flex;
    flex-direction: row;
    align-items: center;
    .tips-text {
      color: rgba(166, 166, 166, 0.85);
      font-size: 10px;
      margin: 0 8px;
    }
    .send {
      width: 28px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      border-radius: 14px;
      background: rgba(114, 114, 114, 1);
      color: #fff;
      margin: 0 8px;
      margin-left: 16px;
    }
  }
  .btn-add-rule {
    cursor: pointer;
    width: 120px;
    border: 1px dashed #d8d8d8;
    padding: 0 20px;
    line-height: 28px;
    display: inline-block;
    margin-right: 20px;
  }

  .item-title {
    // font-size: 20px;
    // width: 150px;
    // text-align: right;
    font-weight: 700;
    padding: 12px 0;
    // padding-left: 60px;
    border-bottom: 1px solid #e7e7e7;
    margin-bottom: 18px;
  }
  .example-btn {
    color: rgba(197, 197, 197, 1);
  }
  .preview {
    color: #909399;
  }
  .preview .el-form-item__label {
    color: #909399;
  }
  .el-form-item__content {
    margin-left: 0px !important;
  }
}
</style>

<style lang="scss">
.form-line {
  .el-input-group__append {
    padding: 0 10px;
  }
}
.item-lable {
  .el-form-item__label {
    text-align: right !important;
  }
}
.monthTime.is-multiple {
  width: 260px;
  padding-left: 5px;
  .el-select-dropdown__item {
    display: inline-block;
    padding: 0 10px;
  }
  .el-select-dropdown__item.selected::after {
    content: '';
  }
  .el-select-dropdown__item:hover {
    background: #78bbff;
    color: #fff;
  }
  .el-select-dropdown__item.selected {
    background: #147de8;
    color: #fff;
  }
  .el-select-dropdown__item.selected.hover {
    background: #78bbff;
    color: #fff;
  }
}
</style>
