<template>
  <div>
    <el-dialog
      title="批量导入修改门店价格"
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
          :data="uploadParam"
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
            仅支持XLS/XLSX文件格式。每次最多导入500条。导入后将替换原值。
            <!-- <span class="tip">一次只允许上传1个文件</span> -->
            <div style="margin-top: 7px">
              <el-link type="primary" :href="batchEditUrl">点击下载导入模板</el-link>
            </div>
            <div style="margin-top: 7px">
              <el-checkbox v-model="isLock">同时锁定编辑项</el-checkbox>
              <el-tooltip class="item" effect="dark" placement="bottom-start">
                <div slot="content">
                  勾选后，则同时将导入修改成功的项锁定。比如在模板中将价
                  <br>格修改为1，则修改后锁定为1，不被系统自动更新。
                </div>
                <i class="el-icon-info" />
              </el-tooltip>
            </div>
          </div>
        </el-upload>
      </div>
      <span slot="footer">
        <el-button type size="small" @click="handleColse">取消</el-button>
        <el-button type="primary" size="small" @click="handleSubmit">立即上传</el-button>
      </span>
    </el-dialog>
    <batchResult
      :is-show="errorDialogVisible"
      :error-text="errorText"
      :error-result-url="errorResultUrl"
      @close="errorDialogVisible=false"
    />
  </div>
</template>
<script>
import config from '@/utils/config'
import batchResult from './batchResult'
import { mapGetters } from 'vuex'
export default {
  components: {
    batchResult
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isLock: true,
      is_file: false,
      errorDialogVisible: false,
      errorText: '',
      errorResultUrl: ''
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token', 'name']),
    batchEditUrl() {
      return `https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/template/%E5%BE%AE%E5%95%86%E5%9F%8E%E6%89%B9%E9%87%8F%E4%BF%AE%E6%94%B9%E4%BB%B7%E6%A0%BC%E6%A8%A1%E6%9D%BF.xlsx`
    },
    uploadUlr() {
      return `${this.uploadFileURL}${config.merchandise}/1.0/ds/batchEdit/price`
    },
    headers() {
      return {
        Authorization: this.token,
        merCode: this.merCode,
        userName: this.name
      }
    },
    uploadParam() {
      return {
        merCode: this.merCode,
        userName: this.name,
        isYdj: 1,
        isLock: this.isLock ? 1 : 0
      }
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
      console.log('res', res)
      if (res.code === '10000' && res.data) {
        this.$refs.file.clearFiles()
        this.handleColse()
        this.errorDialogVisible = true
        console.log('上传结果', res)
        if (res.data.fail === 0) {
          this.errorText = `上传${res.data.success +
            res.data.fail}条数据：操作成功${
            res.data.success
          }条；可点击下载结果文件查看。`
        } else {
          this.errorText = `上传${res.data.success +
            res.data.fail}条数据：操作成功${res.data.success}条；操作失败${
            res.data.fail
          }条，失败原因可点击下载结果文件查看。`
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
    }

    .el-icon-info:hover {
      color: #147de8;
      cursor: pointer;
    }
  }
}
</style>
