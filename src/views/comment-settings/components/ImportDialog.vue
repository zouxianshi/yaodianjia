<template>
  <el-dialog title="导入评论" :visible.sync="visible" append-to-body @closed="$emit('closed')">
    <el-alert type="warning" :closable="false">
      <p slot="title" class="alret-title">
        商家有责任核对商品信息的准确性，一致性.若因商家未核对商品名称，图片与实物的匹配情况而导致的相关问题和损失，将按照法律法规以及平台规则处理.
        商品标库包含海量商品，这些商品有高品质的商品图片、准确商品毛重和规格、标品商品UPC条形码等基本信息，免费提供商家创建商品使用方便商户快捷建品
        第一步：按名称、条形码进行搜索商品；第二步：在搜索结果中点击“生成商品”；第三步：在商品详情页填写商品价格并选择店内分类，保存后，商品创建完成。
      </p>
    </el-alert>
    <!-- <p class="text-right " style="margin-top:10px">
        <a href="#/goods-manage/importRecode">
          <el-button type="primary" size="small">导入历史</el-button>
        </a>
    </p>-->
    <ul class="step">
      <li>
        <p class="title">① 下载EXCEL表格</p>
        <div class="step-cnt">
          <el-card class="file-card">
            <div class="file-bg">
              <div class="excel">
                <img style="width: 50px; height: 50px" src="../../../assets/image/excel_img.jpeg">
                <span>通过条码匹配药品库.xls</span>
              </div>
              <a
                href="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/template/%E8%AF%84%E8%AE%BA%E4%B8%8A%E4%BC%A0%E6%A8%A1%E6%9D%BF.xlsx"
                download="导入商品模板.xls"
              >
                <i class="el-icon-download" />
              </a>
            </div>
          </el-card>
        </div>
      </li>
      <li>
        <p class="title">② 填写excle表格，按规范操作</p>
      </li>
      <li>
        <p class="title">③ 上传已填写的excel表格</p>
        <div class="step-cnt">
          <el-upload
            ref="file"
            class="upload-demo"
            drag
            :action="uploadUlr"
            :headers="headers"
            name="excelFile"
            :data="uploadParams"
            :limit="1"
            :on-success="handleFileSuccess"
            :on-error="handleFileErr"
            :before-upload="beforeUpload"
            :auto-upload="false"
            :on-change="fileChange"
          >
            <i class="el-icon-upload" />
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div slot="tip" class="el-upload__tip">
              只能上传excel文件
              <span class="tip">一次只允许上传1个文件</span>
            </div>
          </el-upload>
        </div>
      </li>
    </ul>

    <div class="bottom-bar">
      <el-button @click="$emit('closed')">取消</el-button>
      <el-button type="primary" :loading="isSubmitLoading" @click="handleUpload">导入评论</el-button>
    </div>

    <importResult
      :is-show="errorDialogVisible"
      :error-text="errorText"
      :error-result-url="errorResultUrl"
      @close="errorDialogVisible=false"
    />
  </el-dialog>
</template>
<script>
import config from '@/utils/config'
import ImportResult from '@/views/comment-settings/components/ImportResult'
import { mapGetters } from 'vuex'
export default {
  components: {
    ImportResult
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    commodityId: {
      type: String,
      default: ''
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
    ...mapGetters(['merCode', 'token']),
    uploadUlr() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/commodity-comment/_batImport`
    },
    headers() {
      return { Authorization: this.token }
    },
    uploadParams() {
      return { merCode: this.merCode }
    }
  },
  methods: {
    beforeUpload(file) {
      const type = file.name.split('.')
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
    handleUpload() {
      if (!this.is_file) {
        this.$message({
          message: '请上传文件',
          type: 'warning'
        })
      }
      this.$refs.file.submit()
    },
    fileChange() {
      this.is_file = true
    },
    handleFileSuccess(res) {
      if (res.code === '10000') {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        this.$refs.file.clearFiles()
        this.errorResultUrl = res.data.url
        this.$emit('closed')
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
        window.location.reload()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.step {
  margin-top: 20px;
  li {
    margin-bottom: 20px;
    .title {
      margin-bottom: 20px;
    }
    .step-cnt {
      margin-left: 20px;
    }
    .file-card {
      width: 350px;
      .file-bg {
        height: 50px;
        padding-right: 10px;
        background: #f6f7fb;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .excel {
          display: flex;
          align-items: center;
          span {
            display: inline-block;
            margin-left: 10px;
          }
        }
      }
    }
  }
}
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
