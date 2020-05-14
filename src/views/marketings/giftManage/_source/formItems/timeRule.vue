<template>
  <el-form
    ref="cnameForm"
    :model="params"
    :rules="cnameRules"
    size="mini"
    label-position="left"
    label-width="110px"
  >
    <el-form-item label="使用时间：">
      <el-radio-group
        v-model="params.timeRule"
        style="width:200px"
        :disabled="disabled"
        @change="changeView1"
      >
        <el-radio :label="1">
          自领取起
          <el-input
            v-model="otherData.expirationDay"
            onkeyup="value=value.replace(/[^0-9]/g,'')"
            :disabled="disabled || params.timeRule != 1"
            style="width:60px"
            @keyup.native="changeView1"
          />天内有效
          <el-tooltip class="item" effect="light" placement="top-start">
            <i class="el-icon-question" />
            <div slot="content" style="width:500px;line-height:24px">
              <p>有效期按自然日计算，如设置自领取起3天有效，用户在4月15日12:00时领取，则该优惠券的可用时间为4月15日的12:00:00至
                4月17日的23:59:59。
              </p>
            </div>
          </el-tooltip>
        </el-radio>
        <el-radio :label="2">
          自领取起
          <el-input
            v-model="otherData.notActive"
            onkeyup="value=value.replace(/[^0-9]/g,'')"
            :disabled="disabled || params.timeRule != 2"
            style="width:60px"
            @keyup.native="changeView1"
          />天后生效，生效后
          <el-input
            v-model="otherData.effective"
            :disabled="disabled || params.timeRule != 2"
            style="width:60px"
            @keyup.native="changeView1"
          />天失效
          <el-tooltip class="item" effect="light" placement="top-start">
            <i class="el-icon-question" />
            <div slot="content" style="width:500px;line-height:24px">
              <p>有效期按自然日计算，如设置自领取起3天有效，用户在4月15日12:00时领取，则该优惠券的可用时间为4月15日的12:00:00至
                4月17日的23:59:59。
              </p>
            </div>
          </el-tooltip>
        </el-radio>
        <el-radio :label="3">
          <el-date-picker
            v-model="otherData.expirationDate"
            :disabled="disabled"
            type="datetimerange"
            range-separator="至"
            :picker-options="pickerOptions"
            start-placeholder="生效日期"
            end-placeholder="失效日期"
            @change="changeView1"
          />
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script>
import _ from 'lodash'
import { formatDate } from '@/utils/timer'
export default {
  props: {
    discountForm: {
      type: Object,
      default() {
        return {}
      }
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      params: {
        effectTime: 0,
        timeRule: 1
      },
      cnameRules: {
        cname: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ]
      },
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().getTime() - 86400000)
        }
      },
      otherData: {
        expirationDay: '1', // 直接开始有效天数
        expirationDate: [new Date(), new Date()], // 有效期(当选择开始、结束日期是)
        notActive: '1', // 等待生效天数
        effective: '1', // 有效天数
        merName: ''
      }
    }
  },
  watch: {
    discountForm(newVal) {
      this.params = _.cloneDeep(newVal)
      if (this.params.timeRule === 1) {
        this.otherData.expirationDay = this.params.effectTime
      } else if (this.params.timeRule === 2) {
        var effectTimes = this.params.effectTime.split(',')
        this.otherData.notActive = effectTimes[0]
        this.otherData.effective = effectTimes[1]
      } else {
        this.otherData.expirationDate = [...this.params.effectTime.split(',')]
      }
    }
  },
  methods: {
    $verification() {
      var _self = this
      var result = new Promise(function(resolve, reject) {
        _self.$refs['cnameForm'].validate(valid => {
          if (valid) {
            var _data = _self.otherData
            var params = _self.params
            if (params.timeRule === 1) {
              params.effectTime = _data.expirationDay
            } else if (params.timeRule === 2) {
              params.effectTime = _data.notActive + ',' + _data.effective
            } else {
              params.effectTime =
                formatDate(_data.expirationDate[0]) +
                ',' +
                formatDate(_data.expirationDate[1])
            }
            resolve({
              effectTime: params.effectTime,
              timeRule: params.timeRule
            })
          } else {
            reject(valid)
          }
        })
      })
      return result
    },
    // 改变预览界面显示
    changeView1() {
      var _data = this.otherData
      var params = this.params
      if (params.timeRule === 1) {
        params.effectTime = _data.expirationDay
      } else if (params.timeRule === 2) {
        params.effectTime = _data.notActive + ',' + _data.effective
      } else {
        params.effectTime =
            formatDate(_data.expirationDate[0]) +
            ',' +
            formatDate(_data.expirationDate[1])
      }
      var obj = {
        effectTime: params.effectTime,
        timeRule: params.timeRule
      }
      this.$emit('changeViews', obj)
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form {
  .el-radio-group {
    display: inline-block;
    line-height: inherit;
    vertical-align: text-top;
    font-size: 0;
    width: 100px;
  }
}
</style>
