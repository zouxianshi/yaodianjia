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
        <el-form ref="formData" :model="infoData" @submit.native.prevent>
          <el-form-item label="" :prop="keys" :rules="[{ required: true, message: '不能为空', trigger: 'blur' }]">
            <el-input v-model="infoData[keys]" size="mini" placeholder="" :maxlength="maxLength" style="width:200px" @focuse="handleInput" />
            <span>
              <el-button type="danger" icon="el-icon-close" circle size="mini" @click="isShow=false" />
              <el-button type="success" icon="el-icon-check" circle size="mini" @click="handleSubSave" />
            </span>
            <p v-if="keys==='erpCode'&&err_show" class="tip">商品编码只能为纯数字</p>
          </el-form-item>
        </el-form>
      </div>
      <el-button slot="reference" type="text" size="mini" icon="el-icon-edit" title="修改" />
    </el-popover>
  </span>
</template>
<script>
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
    return {
      infoData: {},
      isShow: false,
      err_show: false
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
          var reg = /^[0-9]+.?[0-9]*$/
          console.log(reg.test(String))
          if (this.keys === 'erpCode' && !reg.test(String)) {
            this.err_show = true
            return
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
      console.log('jjjj')
      this.err_show = false
    }
  }
}
</script>
