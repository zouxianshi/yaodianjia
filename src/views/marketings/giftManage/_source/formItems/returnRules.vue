<template>
  <div class="return-rule">
    <el-form
      ref="returnRuleForm"
      :model="params"
      size="mini"
      label-position="left"
      label-width="110px"
      :inline="false"
    >
      <el-form-item label="退货规则：">
        <el-radio-group
          v-model="params.returnRule"
          :disabled="disabled"
          @change="$verification()"
        >
          <el-radio :label="1">退货退回</el-radio>
          <el-radio :label="2">退货后失效</el-radio>
        </el-radio-group>
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
      params: {}
    }
  },
  watch: {
    discountForm(newVal) {
      this.params = _.cloneDeep(newVal)
    }
  },
  methods: {
    $verification() {
      return '退货规则'
      // this.$refs['returnRuleForm'].validate(valid => {
      //   if (valid) {
      //     var obj = { returnRule: this.params.returnRule }
      //     return obj
      //   } else {
      //     return false
      //   }
      // })
    }
  }
}
</script>
<style lang="scss">
.return-rule{
    .el-form {
        .el-radio-group {
            display: inline-block;
            line-height: inherit;
            vertical-align: text-top;
            font-size: 0;
            width: 100px;
        }
    }
}

</style>
