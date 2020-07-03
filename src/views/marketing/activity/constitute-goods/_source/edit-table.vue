<template>
  <span>
    <el-popover
      v-model="isShow"
      :placement="keys==='addNum'?'left':'right'"
      :title="title"
      :width="300"
      trigger="click"
    >
      <div class="content">
        <el-form ref="formData" :model="infoData" :rules="rules" @submit.native.prevent>
          <el-form-item
            label
            :prop="keys"
          >
            <el-input
              v-model.trim="infoData[keys]"
              size="mini"
              placeholder
              :maxlength="maxLength"
              style="width:200px"
            />
            <span>
              <el-button
                type="danger"
                icon="el-icon-close"
                circle
                size="mini"
                @click="isShow=false"
              />
              <el-button
                type="success"
                icon="el-icon-check"
                circle
                size="mini"
                @click="handleSubSave"
              />
            </span>
            <!-- <p v-show="keys==='limitNum'&&err_show" class="tip">只能输入不能小于0的整数</p> -->
          </el-form-item>
        </el-form>
      </div>
      <el-button slot="reference" type="text" size="mini" icon="el-icon-edit" title="修改" />
    </el-popover>
  </span>
</template>
<script>
import { checkNumberdouble } from '@/utils/validate'

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
    const _check_num = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if ((value !== '' && reg.test(value)) || value === '0') {
        callback(new Error('请输入正整数'))
      }
      if (value > 99) {
        callback(new Error('最大值不能超过99'))
      }
      callback()
    }
    return {
      infoData: {},
      isShow: false,
      err_show: false,
      rules: {
        addPrice: [{ validator: _checkMprice, trigger: 'blur' }],
        addNum: [{ validator: _check_num, trigger: 'blur' }]
      }
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        const data = JSON.parse(JSON.stringify(this.info))
        data.limitType = data.limitType || 0
        data.type = data.type || 2
        data.limit = data.limitNum
        this.infoData = data
      }
    },
    info() {
      this.err_show = false
    }
  },
  methods: {
    // handleInputNum(e) {
    //   const value = e.target.value
    //   e.target.value = value.replace(/[^\d]/g, '')
    //   this.infoData.limitNum = value.replace(/[^\d]/g, '')
    // },
    handleRadioChange(val) {
      this.err_show = false
    },
    handleSubSave() {
      this.$refs['formData'].validate(valid => {
        if (valid) {
          console.log('formData------------', this.keys)
          // this.err_show = false
          // if (this.keys === 'addPrice') {
          //   if (!/^([1-9]\d*|0)(\.\d*[1-9])?$/.exec(this.infoData.mprice)) {
          //     this.infoData.addPrice = this.infoData.addPrice
          //   }
          // }
          // if (this.keys === 'addNum') {
          //   if (isNaN(this.infoData.addNum)) {
          //     this.$message({
          //       message: '请输入数字',
          //       type: 'error'
          //     })
          //     return
          //   }
          // }
          // this.isShow = false
          // const data = JSON.parse(JSON.stringify(this.infoData))
          // if (this.keys === 'limitNum' && data.limitType === 2) {
          //   data.limitNum = data.limit
          // }
          // if (this.keys === 'limitNum' && data.limitType === 0) {
          //   data.limitNum = 0
          // }
          this.isShow = false
          const data = JSON.parse(JSON.stringify(this.infoData))
          this.$emit('saveInfo', data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
    // handleInput(value) {
    //   this.err_show = false
    // }
  }
}
</script>
<style scoped>
.tip {
  font-size: 12px;
}
</style>
