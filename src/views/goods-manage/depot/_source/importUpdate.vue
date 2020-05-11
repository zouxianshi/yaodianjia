<template>
  <div>
    <el-dialog
      title="批量导入修改商品分组"
      :visible.sync="isShow"
      append-to-body
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="modal-body">
        <el-upload
          ref="file"
          class="upload-demo"
          drag
          :action="uploadUlr"
          :headers="headers"
          name="file"
          :limit="1"
          :on-success="handleFileSuccess"
          :on-error="handleFileErr"
          :auto-upload="false"
          :before-upload="beforeUpload"
          :on-change="fileChange"
        >
          <i class="el-icon-upload" />
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div slot="tip" class="el-upload__tip">
            仅支持XLS/XLSX文件格式。每次最多导入5000条。导入后将替换原值。
            <!-- <span class="tip">一次只允许上传1个文件</span> -->
            <div style="margin-top: 7px">
              <el-link type="primary" :href="batchEditUrl">点击下载导入模板</el-link>
            </div>
          </div>
        </el-upload>
      </div>
      <span slot="footer">
        <el-button type size="small" @click="handleColse">取消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit">立即上传</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="上传结果"
      :visible.sync="errorDialogVisible"
      append-to-body
      width="30%"
      :before-close="handleErrorColse"
      class="error-dialog"
    >
      <div class="error-dialog-model">
        <span>{{ errorText }}</span>
        <el-link type="primary" :href="batchEditUrl">下载结果文件</el-link>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-link :href="batchEditUrl" :underline="false">
          <el-button type="primary">下 载</el-button>
        </el-link>
        <el-button @click="errorDialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import config from '@/utils/config'
import { mapGetters } from 'vuex'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      is_file: false,
      errorDialogVisible: false,
      errorText: ''
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token', 'name']),
    batchEditUrl() {
      return `${this.uploadFileURL}${config.merchandise}/1.0/ds/op/file/template/batchEdit?merCode=${this.merCode}`
    },
    uploadUlr() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/comm-relate/excel/batchEdit`
    },
    headers() {
      return {
        Authorization: this.token,
        merCode: this.merCode,
        userName: this.name
      }
    },
    uploadParam() {
      return { merCode: this.merCode, userName: this.name }
    }
  },
  watch: {
    isShow() {}
  },
  methods: {
    handleErrorColse() {
      this.errorDialogVisible = false
    },
    handleColse() {
      this.$emit('close')
    },
    fileChange() {
      this.is_file = true
    },
    handleFileSuccess(res) {
      if (res.code === '10000' && res.data) {
        this.$refs.file.clearFiles()
        this.handleColse()
        this.errorDialogVisible = true
        if (res.data.fail === 0) {
          this.errorText = `上传${res.data.success +
            res.data.fail}条数据：操作成功${res.data.success}条；可点击下载结果文件查看。`
        } else {
          this.errorText = `上传${res.data.success +
            res.data.fail}条数据：操作成功${res.data.success}条；操作失败${
            res.data.fail
          }条，失败原因可点击下载结果文件查看。`
        }
      } else {
        this.$message.close() // 关闭
        this.$message({
          message: res.msg,
          type: 'error'
        })
        this.$refs.file.clearFiles()
      }
      this.is_file = false
    },
    handleFileErr(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        location.reload()
      } else {
        this.$message({
          message: '文件上传失败',
          type: 'error'
        })
        this.$refs.file.clearFiles()
      }
    },
    beforeUpload(file) {
      const type = file.name.split('.')
      console.log(type)
      if (type[1] !== 'xls' && type[1] !== 'xlsx') {
        this.$message({
          message: '请上传正确的模板',
          type: 'warning'
        })
        this.is_file = false
        return false
      }
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 2MB!')
        return false
      }
      return true
    },
    handleSubmit() {
      if (!this.is_file) {
        this.$message({
          message: '请上传文件',
          type: 'warning'
        })
      }
      this.$refs.file.submit()
    }
  }
}
</script>
<style lang="scss">
.el-dialog {
  width: 35%;
}

.upload-demo {
  display: flex;
  flex-direction: column;
  align-items: center;

  .el-upload__tip {
    width: 360px;
    line-height: 20px;
  }
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
