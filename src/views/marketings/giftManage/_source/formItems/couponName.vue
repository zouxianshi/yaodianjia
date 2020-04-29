<template>
  <el-form
    ref="cnameForm"
    :model="params"
    :rules="cnameRules"
    size="mini"
    label-position="left"
    label-width="110px"
  >
    <el-form-item label="优惠券名称：" prop="cname">
      <el-input
        v-model="params.cname"
        :disabled="disabled"
        placeholder="请输入优惠券名称"
        maxlength="10"
        style="width:300px"
        @keyup.native="changeView1"
      />
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
      params: {},
      cnameRules: {
        cname: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
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
        _self.$refs['cnameForm'].validate(valid => {
          if (valid) {
            resolve({ cname: _self.params.cname })
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
        cname: this.params.cname
      }
      this.$emit('changeViews', obj)
    }
  }
}
</script>
