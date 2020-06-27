<template>
  <div class="coupon-form-item-model">
    <el-form label-width="90px" size="mini">
      <el-form-item label="优惠券名称">
        <strong>活动百元大钞券抢险券</strong>
        <span class="cfim-delete" @click="$emit('on-coupon-delete')">删除</span>
      </el-form-item>
      <el-form-item label="发放量">
        <el-input v-model="name" placeholder="请输入数字" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CouponFormItem',
  data() {
    return {
      name: ''
    }
  },
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .coupon-form-item-model {
    .el-form-item {
      position: relative;
      .cfim-delete {
        font-size: 12px;
        color: #4F88FF;
        position: absolute;
        right: 0;
        top: 0;
        cursor: pointer;
      }
    }
  }
</style>
