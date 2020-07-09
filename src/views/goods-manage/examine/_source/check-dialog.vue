<template>
  <el-dialog title="批量审核" :visible.sync="isShow" :append-to-body="true">
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item label="选择结果：" label-width="120px" prop="result">
        <el-radio v-model="form.result" :label="1">通过</el-radio>
        <el-radio v-model="form.result" :label="2">拒绝</el-radio>
      </el-form-item>
      <el-form-item v-if="form.result===2" label="拒绝原因：" label-width="120px" prop="reason">
        <el-select v-model="form.reason" size="small">
          <el-option label="海典健康微商城平台已存在改商品" :value="1" />
          <el-option label="商品信息不够规范合格" :value="2" />
          <el-option label="其他原因" :value="3" />
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="isShow = false">取 消</el-button>
      <el-button type="primary" @click="confirm()">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    const reason_limit = (rule, value, callback) => {
      if (this.form.result === 2 && this.form.reason === '') {
        callback(new Error('请选择拒绝原因'))
      }
      callback()
    }
    return {
      isShow: false,
      form: {
        result: 1,
        reason: ''
      },
      rules: {
        result: [{ required: true, message: '请选择结果', trigger: 'change' }],
        reason: [{ required: true, validator: reason_limit, trigger: 'change' }]
      }
    }
  },
  methods: {
    show(isShow) {
      this.form = {
        result: 1,
        reason: ''
      }
      this.isShow = isShow
    },
    confirm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.isShow = false
          this.$emit('onSelect', this.form)
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-dialog {
  width: 35%;
}
</style>
