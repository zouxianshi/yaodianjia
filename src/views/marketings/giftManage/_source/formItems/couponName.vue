<template>
  <el-form-item label="优惠券名称：" prop="cname">
    <el-input
      v-model="discountForm.cname"
      placeholder="请输入优惠券名称"
      maxlength="10"
      style="width:300px"
    />
  </el-form-item>
</template>
<script>
export default {
  props: {
    discountForm: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    verification() {

    }
  }
}
</script>
