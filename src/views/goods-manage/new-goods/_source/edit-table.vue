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
        <el-form ref="formData" :model="infoData">
          <el-form-item label="" :prop="keys" :rules="{ required: true, message: '不能为空', trigger: 'blur' }">
            <el-input v-model="infoData[keys]" size="mini" placeholder="" style="width:200px" />
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
    }
  },
  data() {
    return {
      infoData: {},
      isShow: false
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this.infoData = JSON.parse(JSON.stringify(this.info))
      }
    }
  },
  methods: {
    handleSubSave() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this.$emit('saveInfo', this.infoData, this.keys, this.index)
          this.isShow = false
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
