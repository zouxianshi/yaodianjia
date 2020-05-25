<template>
  <el-form
    ref="noteForm"
    :model="params"
    size="mini"
    label-position="left"
    label-width="110px"
  >
    <el-form-item label="使用须知：">
      <el-input
        v-model="params.note"
        type="textarea"
        style="width:300px"
        maxlength="200"
        show-word-limit
        rows="9"
        placeholder="请输入使用须知"
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
        return {
        }
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
        note: ''
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
        _self.$refs['noteForm'].validate(valid => {
          if (valid) {
            resolve({ note: _self.params.note })
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
