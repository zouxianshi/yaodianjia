<template>
  <el-form ref="useRuleForm" :model="params" size="mini" label-position="left" label-width="110px">
    <el-form-item label="使用门槛：" prop="useRule">
      <el-radio-group v-model="useRuleLimit" :disabled="disabled" @change="params.useRule='0'">
        <el-radio :label="0">无门槛</el-radio>
        <el-radio :label="1">
          订单满
          <el-input
            v-model="params.useRule"
            :disabled="disabled || useRuleLimit != 1"
            style="width:100px"
            maxlength="5"
            onkeyup="value=value.replace(/[^0-9\.]/g,'')"
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
    return {
      params: {
        useRule: 0
      },
      useRuleLimit: 0
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
            reject(valid)
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
