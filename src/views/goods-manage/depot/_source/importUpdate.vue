<template>
  <div>
    <el-dialog
      title="批量导入修改商品分组"
      class="import-update-dialog"
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
            仅支持XLS/XLSX文件格式。每次最多导入500条。导入后将<i>替换原分组，只保留新导入的分组。</i>
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
    <importResult
      :is-show="errorDialogVisible"
      :error-text="errorText"
      :error-result-url="errorResultUrl"
      @close="errorDialogVisible=false"
    />
  </div>
</template>
<script>
import config from '@/utils/config'
import importResult from './importResult'
import { mapGetters } from 'vuex'
export default {
  components: {
    importResult
  },
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
      errorText: '',
      errorResultUrl: ''
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token', 'name']),
    batchEditUrl() {
      return `${this.uploadFileURL}${config.merchandise}/1.0/ds/op/file/template/batchEdit?merCode=${this.merCode}`
    },
    uploadUlr() {
      return `${this.uploadFileURL}${config.merchandise}/1.0/comm-relate/excel/batchEdit`
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
    handleColse() {
      this.$refs.file.clearFiles()
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
        console.log('上传结果', res)
        if (res.data.fail === 0) {
          this.errorText = `上传${res.data.success +
            res.data.fail}条数据：操作成功${
            res.data.success
          }条；可点击下载查看。`
        } else {
          this.errorText = `上传${res.data.success +
            res.data.fail}条数据：操作成功${res.data.success}条；操作失败${
            res.data.fail
          }条，失败原因可点击下载查看。`
        }
        this.errorResultUrl = res.data.url
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
  .import-update-dialog {
    .upload-demo {
      display: flex;
      flex-direction: column;
      align-items: center;

      .el-upload__tip {
        width: 360px;
        line-height: 20px;
        i {
            font-style:normal;
            color: #DC143C;
        }
      }
    }
  }

</style>
