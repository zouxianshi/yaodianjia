<template>
  <div class="coupon-form-item-model">
    <el-form label-width="90px" size="mini">
      <el-form-item label="优惠券名称">
        <strong>{{ item.cname }}</strong>
        <span v-if="isDelete" class="cfim-delete" @click="$emit('on-coupon-delete')">删除</span>
      </el-form-item>
      <el-form-item label="发放量">
        <el-input v-model.number="item.value" placeholder="请输入数字" @change="onUploadItem" />
        <div v-if="error.isValue" class="sa-assembly-error">
          {{ error.isValue }}
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'CouponFormItem',
  data() {
    return {
      error: {
        isValue: false
      },
      item: {}
    }
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    },
    isDelete: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    $verification() {
      const { value } = this.item
      let flag = true

      this.error.isValue = false

      if (!value) {
        this.error.isValue = '请输入发放量'
        flag = false
      }

      return flag
    },
    onUploadItem() {
      this.$emit('on-el-update', this.item)
      this.$verification()
    }
  },
  watch: {
    'el': {
      deep: true,
      immediate: true,
      handler(v) {
        this.item = _.cloneDeep(v)
      }
    }
  },
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
