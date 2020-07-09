<template>
  <div>
    <el-dialog
      title="上传结果"
      :visible.sync="isShow"
      append-to-body
      width="30%"
      :before-close="handleErrorColse"
      class="error-dialog"
    >
      <div class="error-dialog-model">
        <span>{{ errorText }}</span>
        <!-- <el-link v-show="errorResultUrl" type="primary" :href="errorResultUrl">下载结果文件</el-link> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleErrorColse">关 闭</el-button>
        <el-link v-show="errorResultUrl" :href="errorResultUrl" :underline="false">
          <el-button type="primary">下 载</el-button>
        </el-link>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    errorText: {
      type: String,
      default: ''
    },
    errorResultUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token', 'name']),
    headers() {
      return {
        Authorization: this.token,
        merCode: this.merCode,
        userName: this.name
      }
    }
  },
  watch: {
    isShow() {}
  },
  methods: {
    handleErrorColse() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="scss">
  .el-dialog {
    width: 35%;
  }
  .error-dialog {
    .error-dialog-model {
      line-height: 24px;
    }
    .el-dialog__body {
      padding: 15px 20px;
    }
  }
</style>
