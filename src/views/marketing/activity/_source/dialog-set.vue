<template>
  <el-dialog
    append-to-body
    class="m-dialog dialog-goods"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    width="560px"
    @close="handlerClose"
  >
    <div class="modal-header">
      <div class="title">批量设置</div>
    </div>
    <div class="modal-body">
      <el-form ref="xForm" :model="xForm" label-width="72px">
        <template v-if="type === '1'">
          <el-form-item
            label="折扣："
            prop="value"
            :rules="[{ required: true, validator: check_discount, trigger: 'blur' }]"
          >
            <el-input v-model="xForm.value" style="width: 200px" placeholder="" maxlength="5" />
            <span>折</span>
            <span class="note-text">填写折扣，如8</span>
          </el-form-item>
        </template>
        <template v-if="type === '2'">
          <el-form-item
            label="减价："
            prop="value"
            :rules="[{ required: true, validator: check_discount, trigger: 'blur' }]"
          >
            <el-input v-model="xForm.value" style="width: 200px" placeholder="" maxlength="11" />
            <span class="note-text">填写减价金额，如减价10元则填10</span>
          </el-form-item>
        </template>
        <template v-if="type === '3'">
          <el-form-item
            label="限购："
            prop="value"
            :rules="[{ required: true, validator: check_limit, trigger: 'blur' }]"
          >
            <el-input v-model="xForm.value" style="width: 200px" placeholder="" maxlength="8" />
            <span class="note-text">填写限购数量，如0表示不限购</span>
          </el-form-item>
        </template>
        <template v-if="type === '4'">
          <el-form-item
            label="库存："
            prop="value"
            :rules="[{ required: true, validator: check_num, trigger: 'blur' }]"
          >
            <el-input v-model="xForm.value" style="width: 200px" placeholder="" maxlength="8" />
            <span class="note-text">填写秒杀库存数量，大于0</span>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <template v-if="editable">
        <el-button type="primary" size="mini" @click="submit()">确 定</el-button>
        <el-button size="mini" @click="dialog.visible = false">取 消</el-button>
      </template>
      <el-button v-else @click="dialog.visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { checkNumberdouble } from '@/utils/validate'
export default {
  name: 'DialogSet',
  props: {
    type: {
      type: String,
      default: '' // 设置类型 1.折扣 2.减价 3限购 4.库存
    },
    editable: {
      // 是否可编辑
      type: Boolean,
      default: true
    }
  },
  data() {
    const check_discount = (rule, value, callback) => {
      console.log('rule', rule)
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '') {
        if (this.type === '2' && !checkNumberdouble(value)) { // 2.减价
          callback(new Error('请输入最多2位小数的正数'))
        }
        if (this.type === '1') { // 1.折扣
          const reg = /(^([0-9]+|0)$)|(^(([0-9]+|0)\.([0-9]{1}))$)/
          if (!reg.test(value)) {
            callback(new Error('请输入最多1位小数的正数'))
          }
          if (value <= 0 || value >= 10) {
            callback(new Error('折扣值应大于0小于10'))
          }
        }
      }
      if (value <= 0) {
        callback(new Error('最小值必须大于0'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    const check_limit = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '' && reg.test(value)) {
        callback(new Error('请输入正整数'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    const check_num = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '' && reg.test(value) || value === '0') {
        callback(new Error('请输入正整数'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    return {
      check_discount: check_discount,
      check_limit: check_limit,
      check_num: check_num,
      dialog: {
        visible: false
      },
      xForm: {
        value: ''
      }
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 获取数据
    fetchData() {
    },
    open() {
      this.dialog.visible = true
      // this.fetchData()
    },
    close() {
      this.dialog.visible = false
      this.reset()
    },
    reset() {
      this.xForm = {
        value: ''
      }
      this.$refs.xForm.clearValidate()
    },
    submit() {
      this.$refs.xForm.validate((valid) => {
        if (valid) {
          console.log('on-submit', this.xForm)
          this.$emit('on-change', this.xForm)
        } else {
          console.log('submit err')
        }
      })
    },
    handlerClose() {
      this.reset()
      this.$emit('on-reset')
    }
  }
}
</script>

<style lang="scss">
.dialog-goods {
  .el-dialog__header {
    height: 0;
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }

  .el-dialog__headerbtn {
    top: 8px;
    right: 12px;
  }
  .el-table thead th {
    height: 40px;
  }
  .img-wrap{
    margin: 0 auto;
    width: 50px;
    height: 32px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.dialog-goods {
  .modal-header {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    background: #f2f2f2;

    .title {
      margin-left: 15px;
      font-size: 15px;
    }
  }

  .modal-body {
    box-sizing: border-box;
    padding: 20px;
    font-size: 14px;
    .note-text {
        margin-left: 15px;
        font-size: 13px;
        color: #999999;
    }
  }
}
</style>
