<template>
  <span>
    <el-popover
      v-model="isShow"
      placement="right"
      :title="title"
      width="300"
      trigger="click"
    >
      <div class="content">
        <el-form ref="formData" :model="infoData" :rules="rules" @submit.native.prevent>
          <el-form-item v-if="keys!=='mprice'" label="" :prop="keys" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
            <el-input v-model="infoData[keys]" size="mini" placeholder="" :maxlength="maxLength" style="width:200px" @focus="handleInput" />
            <span>
              <el-button type="danger" icon="el-icon-close" circle size="mini" @click="isShow=false" />
              <el-button type="success" icon="el-icon-check" circle size="mini" @click="handleSubSave" />
            </span>
            <p v-if="keys==='erpCode'&&err_show" class="tip">商品编码只能为纯数字</p>
            <p v-show="keys==='barCode'&&err_show" class="tip">只能输入数字、英文、字符</p>
          </el-form-item>
          <el-form-item v-else label="" :prop="keys">
            <el-input v-model="infoData[keys]" size="mini" placeholder="" :maxlength="maxLength" style="width:200px" @focus="handleInput" />
            <span>
              <el-button type="danger" icon="el-icon-close" circle size="mini" @click="isShow=false" />
              <el-button type="success" icon="el-icon-check" circle size="mini" @click="handleSubSave" />
            </span>
          </el-form-item>
        </el-form>
      </div>
      <el-button slot="reference" type="text" size="mini" icon="el-icon-edit" title="修改" />
    </el-popover>
  </span>
</template>
<script>
import { checkNumberdouble, checkZmSZ } from '@/utils/validate'

export default {
  name: 'EditTable',
  props: {
    title: {
      type: String,
      default: ''
    },
    keys: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    },
    info: {
      type: Object,
      default: () => {
        return {}
      }
    },
    maxLength: {
      type: String,
      default: '9999'
    }
  },
  data() {
    const _checkMprice = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      } else {
        if (value > 99999999) {
          return callback(new Error('最多只能输入8位数'))
        }
        if (!checkNumberdouble(value)) {
          callback(new Error('只能设置最多两位小数的正数'))
        } else {
          callback()
        }
      }
    }
    return {
      infoData: {},
      isShow: false,
      err_show: false,
      rules: {
        mprice: [{ validator: _checkMprice, trigger: 'blur' }]
      }
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this.infoData = JSON.parse(JSON.stringify(this.info))
      }
    },
    info() {
      this.err_show = false
    }
  },
  methods: {
    handleSubSave() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          if (this.keys === 'erpCode' && !/^[0-9]+$/.test(this.infoData[this.keys])) {
            this.err_show = true
            return
          }
          if (this.keys === 'barCode' && !checkZmSZ(this.infoData[this.keys])) {
            this.err_show = true
            return
          }
          this.err_show = false
          this.$emit('saveInfo', this.infoData, this.keys, this.index)
          this.isShow = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleInput(value) {
      this.err_show = false
    }
  }
}
</script>
<style scoped>
.tip{
  font-size: 12px;
}
</style>
