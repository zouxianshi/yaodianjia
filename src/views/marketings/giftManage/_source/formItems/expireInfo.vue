<template>
  <div class="expire-info">
    <el-form
      ref="expireInfoForm"
      :model="params"
      size="mini"
      label-position="left"
      label-width="110px"
      :inline="false"
      :rules="rules"
    >
      <el-form-item label="到期提醒：" prop="expireInfo">
        <el-checkbox v-model="isRember" :disabled="disabled" @change="params.expireInfo=1" />到期前
        <el-input
          v-model="params.expireInfo"
          :disabled="disabled || !isRember"
          size="mini"
          maxlength="4"
          style="width:80px"
        />天微信提醒
      </el-form-item>
    </el-form>
  </div>
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
    var validateExpireInfo = (rule, value, callback) => {
      if (this.isRember && !((' ' + value).trim() && Number(value) !== 0)) {
        // 如果选择了提醒，提醒天数就不能为空
        callback(new Error('请输入正确提醒天数'))
      } else {
        callback()
      }
    }
    return {
      params: {
        expireInfo: 1
      },
      isRember: false,
      rules: {
        expireInfo: [{ validator: validateExpireInfo, trigger: 'blur' }]
      }
    }
  },
  watch: {
    discountForm(newVal) {
      this.params = _.cloneDeep(newVal)
      this.isRember = !!this.params.expireInfo
    }
  },
  methods: {
    $verification() {
      var _self = this
      var result = new Promise(function(resolve, reject) {
        _self.$refs['expireInfoForm'].validate(valid => {
          if (valid) {
            if (_self.isRember) {
              resolve({ expireInfo: _self.params.expireInfo })
            } else {
              resolve({ expireInfo: 0 })
            }
          } else {
            reject(valid)
          }
        })
      })
      return result
    }
  }
}
</script>
<style lang="scss">
</style>
