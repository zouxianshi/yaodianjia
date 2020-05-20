<template>
  <div class="expire-info">
    <el-form
      ref="expireInfoForm"
      :model="params"
      size="mini"
      label-position="left"
      label-width="110px"
      :inline="false"
    >
      <el-form-item label="到期提醒：">
        <el-checkbox v-model="isRember" :disabled="disabled" @change="changeIsRember" />到期前
        <el-select v-model="params.expireInfo" placeholder="请选择" style="width:80px" :disabled="disabled || !isRember">
          <el-option
            v-for="item in 10"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
        天微信提醒
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
    return {
      params: {
        expireInfo: 0
      },
      isRember: false
    }
  },
  watch: {
    discountForm(newVal) {
      this.params = _.cloneDeep(newVal)
      this.isRember = !!this.params.expireInfo
    }
  },
  methods: {
    changeIsRember() {
      if (this.isRember) {
        this.params.expireInfo = 1
      } else {
        this.params.expireInfo = 0
      }
    },
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
