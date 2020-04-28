<template>
  <el-form ref="cnameForm" :model="params" :rules="cnameRules" size="mini" label-position="left" label-width="110px">
    <el-form-item label="优惠券名称：" prop="cname">
      <el-input
        v-model="params.cname"
        placeholder="请输入优惠券名称"
        maxlength="10"
        style="width:300px"
        @keyup.native="verification()"
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
    }
  },
  data() {
    return {
      params: {
      },
      cnameRules: {
        cname: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.params = _.cloneDeep(this.discountForm)
  },
  methods: {
    verification() {
      console.log(this.params)
    }
  }
}
</script>
