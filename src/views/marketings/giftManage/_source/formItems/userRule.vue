<template>
  <el-form ref="useRuleForm" :model="params" size="mini" label-position="left" label-width="110px" :rules="rules">
    <el-form-item label="使用门槛：" prop="useRule">
      <el-radio-group v-model="useRuleLimit" :disabled="disabled" @change="params.useRule=0">
        <el-radio :label="0">无门槛</el-radio>
        <el-radio :label="1">
          订单满
          <el-input
            v-model="params.useRule"
            :disabled="disabled || useRuleLimit != 1"
            style="width:100px"
            type="number"
            @keyup.native="changeView1"
          />元
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>
<script>
import _ from 'lodash'
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
    var validateUseRule = (rule, value, callback) => {
      if (this.useRuleLimit === 1 && (value > 100000 || value < 0.01)) {
        callback(new Error('请输入正确的门槛金额（0.01 - 100000元）'))
      } else if (value.toString().split('.')[1].length > 2) {
        return callback(new Error('最多支持两位小数'))
      } else {
        callback()
      }
    }
    return {
      params: {
        useRule: 0
      },
      useRuleLimit: 0,
      rules: {
        useRule: [
          { validator: validateUseRule, trigger: 'blur' }
        ]
      }
    }
  },
  watch: {
    discountForm(newVal) {
      this.params = _.cloneDeep(newVal)
    }
  },
  methods: {
    $verification() {
      var _self = this
      var result = new Promise(function(resolve, reject) {
        _self.$refs['useRuleForm'].validate(valid => {
          if (valid) {
            resolve({ useRule: _self.params.useRule })
          } else {
            reject('请输入正确的门槛金额（0.01 - 100000元）')
          }
        })
      })
      return result
    },
    // 改变预览界面显示
    changeView1() {
      var obj = {
        useRule: this.params.useRule
      }
      this.$emit('changeViews', obj)
    }
  }
}
</script>
