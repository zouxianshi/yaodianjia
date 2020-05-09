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
      <el-form ref="xForm" :model="xForm" label-width="100px">
        <el-form-item
          label="换购价："
          prop="value"
          :rules="[{ required: true, validator: check_discount, trigger: 'blur' }]"
        >
          <el-input v-model="xForm.value" style="width: 200px" placeholder maxlength="11" />
          <span class="note-text">填写换购金额，如9.9元</span>
        </el-form-item>
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
        if (!checkNumberdouble(value)) {
          // 2.减价
          callback(new Error('请输入最多2位小数的正数'))
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
    return {
      check_discount: check_discount,
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
    fetchData() {},
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
      this.$refs.xForm.validate(valid => {
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
      // this.$emit('on-reset')
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
  .img-wrap {
    margin: 0 auto;
    width: 50px;
    height: 32px;
    img {
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
