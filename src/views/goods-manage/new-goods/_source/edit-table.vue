<template>
  <span>
    <el-popover
      v-model="isShow"
      :placement="keys==='limitNum'?'left':'right'"
      :title="title"
      :width="keys==='limitNum'?'500':'300'"
      trigger="click"
    >
      <div class="content">
        <el-form ref="formData" :model="infoData" :rules="rules" @submit.native.prevent>
          <template v-if="keys==='limitNum'">
            <el-form-item label="">
              <el-radio-group v-model="infoData.limitType">
                <el-radio :label="0" style="margin-top:10px;display:block">不限购</el-radio>
                <el-radio :label="1" style="margin-top:10px">
                  <span style="color:#333">每笔订单限购&nbsp;
                    <template v-if="infoData.limitType===1">
                      <el-input v-model="infoData.limitNum" size="mini" maxlength="8" :disabled="infoData.limitType===0||infoData.limitType===2" style="width:100px" @input.native="handleInputNum" />&nbsp;<span style="color:#999">件</span>
                    </template>
                    <template v-else>
                      <el-input size="mini" maxlength="8" :disabled="infoData.limitType===0||infoData.limitType===2" style="width:100px" />&nbsp;<span style="color:#999">件</span>
                    </template>
                  </span>
                </el-radio>
                <el-radio :label="2" style="margin-top:10px">
                  <span style="color:#333">按周期每&nbsp;
                    <el-select v-model="infoData.type" :disabled="infoData.limitType===1||infoData.limitType===0" size="mini" style="width:100px" placeholder="选择类型">
                      <el-option :value="2" label="天" />
                      <el-option :value="3" label="周" />
                      <el-option :value="4" label="月" />
                    </el-select>
                    &nbsp;限购&nbsp;
                    <template v-if="infoData.limitType===2">
                      <el-input v-model="infoData.limitNum" maxlength="8" :disabled="infoData.limitType===1||infoData.limitType===0" size="mini" style="width:100px" @input.native="handleInputNum" />
                    </template>
                    <template v-else>
                      <el-input maxlength="8" :disabled="infoData.limitType===1||infoData.limitType===0" size="mini" style="width:100px" />
                    </template>
                  </span>
                  <span>
                    <el-button type="danger" icon="el-icon-close" circle size="mini" @click="isShow=false" />
                    <el-button type="success" icon="el-icon-check" circle size="mini" @click="handleSubSave" />
                  </span>
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </template>
          <template v-else>
            <el-form-item v-if="keys!=='mprice'" label="" :prop="keys" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
              <el-input v-model="infoData[keys]" size="mini" placeholder="" :maxlength="maxLength" style="width:200px" @focus="handleInput" />
              <span>
                <el-button type="danger" icon="el-icon-close" circle size="mini" @click="isShow=false" />
                <el-button type="success" icon="el-icon-check" circle size="mini" @click="handleSubSave" />
              </span>
              <p v-if="keys==='erpCode'&&err_show" class="tip">商品编码只能为纯数字</p>
              <p v-show="keys==='barCode'&&err_show" class="tip">只能输入数字、英文、字符</p>
              <p v-show="keys==='limitNum'&&err_show" class="tip">只能输入不能小于0的整数</p>
            </el-form-item>
            <el-form-item v-else label="" :prop="keys">
              <el-input v-model="infoData[keys]" size="mini" placeholder="" :maxlength="maxLength" style="width:200px" @focus="handleInput" />
              <span>
                <el-button type="danger" icon="el-icon-close" circle size="mini" @click="isShow=false" />
                <el-button type="success" icon="el-icon-check" circle size="mini" @click="handleSubSave" />
              </span>
            </el-form-item>
          </template>

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
    handleInputNum(e) {
      const value = e.target.value
      e.target.value = value.replace(/[^\d]/g, '')
      this.infoData.limitNum = value.replace(/[^\d]/g, '')
    },
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
          if (this.keys === 'mprice') {
            if (!/^([1-9]\d*|0)(\.\d*[1-9])?$/.exec(this.infoData.mprice)) {
              this.infoData.mprice = ~~this.infoData.mprice
            }
          }
          if (this.keys === 'limitNum') {
            console.log('----', this.infoData)
            if (this.infoData.limitNum % 1 !== 0 || this.infoData.limitNum < 0) {
              this.err_show = true
              return
            }
          }
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
