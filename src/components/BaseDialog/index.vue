<template>
  <div class="base-dialog-model">
    <el-dialog
      :title="title"
      :visible.sync="isVisible"
      :width="width"
      :append-to-body="true"
      @closed="handleCancel"
    >
      <slot name="content" />
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleCancel">{{ cancelText }}</el-button>
        <el-button size="small" type="primary" :loading="isLoading" @click="handleOk">{{ okText }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
// 基础弹框组件
export default {
  name: 'BaseDialog',
  data() {
    return {
      isLoading: false
    }
  },
  props: {
    title: {
      type: String,
      default: '提示'
    },
    isVisible: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '30%'
    },
    cancelText: {
      type: String,
      default: '取 消'
    },
    okText: {
      type: String,
      default: '确 定'
    },
    onOk: {
      type: Function,
      default: () => {}
    }
  },
  methods: {
    handleCancel() {
      this.$emit('close')
    },
    async handleOk() {
      this.isLoading = true
      try {
        await this.onOk()
      } catch (error) {
        console.error(error)
        this.isLoading = false
      }
      this.$emit('ok')
      this.isLoading = false
    }
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  computed: {},
  components: {}
}
</script>
<style lang="scss" rel="stylesheet/scss">
.base-dialog-model {
}
</style>
