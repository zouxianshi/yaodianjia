<template>
  <div v-loading="loading" class="setting-container">
    <div v-show="getLoading" class="module">
      <div class="title">小程序二维码</div>
      <div class="content">
        <img class="code-pic" :src="qrCode">
        <a
          class="download"
          :href="qrCode"
          download="download_qrcode.png"
        >下载小程序码</a>
      </div>
    </div>
    <div class="module">
      <div class="title">小程序参数信息</div>
      <div class="content">
        <div class="panel">
          <div class="tips">小程序appid：</div>
          <div class="txt">{{ appid }}</div>
          <el-button
            id="copy-appid"
            class="copy"
            type="primary"
            :data-clipboard-text="appid"
            @click="onCopyHandler('copy-appid')"
          >一键复制</el-button>
        </div>
        <div class="panel">
          <div class="tips">参数路径：</div>
          <div class="txt">{{ link }}</div>
          <el-button
            id="copy-link"
            class="copy"
            type="primary"
            :data-clipboard-text="link"
            @click="onCopyHandler('copy-link')"
          >一键复制</el-button>
        </div>
      </div>
    </div>
    <div class="module">
      <div class="title">商户名称</div>
      <div class="content">
        <div class="panel">
          <div class="tips">商户名称：</div>
          <div class="txt">{{ storeName }}</div>
          <el-button
            class="copy"
            type="primary"
            @click="showUpdateDialog"
          >修改名称</el-button>
        </div>
      </div>
    </div>

    <div class="module">
      <div class="title">规则设置</div>
      <div class="content">
        <div class="panel column">
          <div class="row">
            <div class="tips">规则设置：顾客收到领取通知后</div>
            <el-input v-model="ruledays" class="rule-input" maxlength="3" />
            <div class="tips">
              天未前往线下进行购买取货，预约单将自动取消作废
            </div>
          </div>
          <div
            class="row"
            style="width: 100%;justify-content: flex-end;margin-top:10px;"
          >
            <el-button
              class="copy"
              type="primary"
              @click="setOrderBeyondTimeService"
            >确认设置</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- 推荐设置 -->
    <!-- <div class="module">
      <div class="title">推荐设置</div>
      <div class="content">
        <div class="panel column flex-start">
          <div class="row">
            <div class="tips">是否推荐 :</div>
            <div class="radio-group">
                <el-radio-group class="group" v-model="radio" @change="recommendRadio">
                  <el-radio label="1">是</el-radio>
                  <el-radio label="2">否</el-radio>
                </el-radio-group>
            </div>
          </div>
          <div class="row">
            <div class="tips-txt">
              开启推荐，小程序将会推荐给您的商户旗下门店附近的用户
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="module" style="border:0;">
      <div class="title">DM单设置</div>
      <div class="content">
        <div class="panel column flex-start">
          <div class="row">
            <div class="tips" style="width:100px;">DM单：</div>
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :headers="headers"
              :before-upload="beforeUpload"
              :on-success="uploadSuccessDM"
              :show-file-list="false"
            >
              <img
                v-if="!!ruleForm.dmPath"
                :src="showImgHandler(ruleForm.dmPath)"
                class="avatar"
              >
              <div
                v-else
                style="width:80px;height:80px;text-align:center;line-height:80px"
              >
                <i class="el-icon-plus">点击上传</i>
              </div>
            </el-upload>
            <div class="tips-group">
              <div class="items">1、点击“下载设计模板”下载模板文件至本地</div>
              <div class="items">2、设计好DM单后，导出图片点击上传</div>
              <div class="items">3、图片大小不超过5M</div>
            </div>
          </div>
        </div>

        <div class="panel column flex-start">
          <div class="row">
            <div class="tips" style="width:100px;">商城二维码：</div>
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :headers="headers"
              :before-upload="beforeUpload"
              :on-success="uploadSuccessMall"
              :show-file-list="false"
            >
              <img
                v-if="!!ruleForm.qrCodePath"
                :src="showImgHandler(ruleForm.qrCodePath)"
                class="avatar"
              >
              <div
                v-else
                style="width:80px;height:80px;text-align:center;line-height:80px"
              >
                <i class="el-icon-plus">点击上传</i>
              </div>
            </el-upload>
          </div>
        </div>

        <div class="panel column flex-start">
          <div class="row">
            <div class="tips" style="width:100px;">公众号二维码：</div>
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :headers="headers"
              :before-upload="beforeUpload"
              :on-success="uploadSuccessQR"
              :show-file-list="false"
            >
              <img
                v-if="!!ruleForm.officialCodePath"
                :src="showImgHandler(ruleForm.officialCodePath)"
                class="avatar"
              >
              <div
                v-else
                style="width:80px;height:80px;text-align:center;line-height:80px"
              >
                <i class="el-icon-plus">点击上传</i>
              </div>
            </el-upload>
          </div>
        </div>
        <div class="panel">
          <div class="tips" style="width:120px;">公众号名称：</div>
          <el-input v-model="ruleForm.officialName" placeholder="请输入公众号名" />
        </div>

        <div class="row" style="margin-top:20px;">
          <a class="downloadPDF" download>下载设计模板</a>
          <el-button type="primary" @click="setUpdateDMReqDTO">确认设置</el-button>
        </div>
      </div>
    </div>
    <el-dialog append-to-body title="修改商户名称" :visible.sync="updateDialog">
      <el-input
        v-model="changeStoreName"
        maxlength="7"
        placeholder="请输入商户名称"
        @
      />
      <div
        style="display:flex;flex-direction:row;justify-content: center;margin-top:30px;"
      >
        <el-button
          style="margin-right:20px;"
          @click="hiddenUpdateDialog"
        >取消</el-button>
        <el-button
          type="primary"
          @click="updateStoreNameService"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Clipboard from 'clipboard'
import DistributionService from '@/api/distributionService'
import { throttle } from '@/utils/throttle'
import config from '@/utils/config'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      appid: '',
      link: '',
      storeName: '',
      qrCode: '',
      getLoading: false,
      changeStoreName: '',
      ruledays: 0,
      updateDialog: false,
      loading: true,
      radio: '1',
      ruleForm: {
        dmPath: '',
        qrCodePath: '',
        officialCodePath: '',
        officialName: ''
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return { Authorization: this.token, merCode: this.merCode }
    },
    upLoadUrl() {
      return `${this.uploadFileURL}${config.mask}/1.0/file/_uploadImg?merCode=${this.merCode}`
    }
  },
  watch: {
    changeStoreName(newValue) {
      this.changeStoreName = newValue
    },
    ruledays(newValue) {
      if (/^[0-9]*$/.test(newValue)) {
        this.ruledays = newValue
      } else {
        this.ruledays = ''
      }
    }
  },
  mounted() {
    this.getQRCode()
  },

  methods: {
    beforeUpload(file) {
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 5
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 5MB!',
          type: 'warning'
        })
        return false
      }
      if (!isImg) {
        this.$message({
          message: '请上传jpeg、png、jpg格式的图片',
          type: 'warning'
        })
        return false
      }
      if (isImg) {
        this.uploadLoading = true
      }
      return isImg
    },
    uploadSuccessDM(res, file, fileList) {
      // 图片上传成功
      if (res.code === '10000') {
        this.ruleForm.dmPath = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    uploadSuccessMall(res, file, fileList) {
      // 图片上传成功
      if (res.code === '10000') {
        this.ruleForm.qrCodePath = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    uploadSuccessQR(res, file, fileList) {
      // 图片上传成功
      if (res.code === '10000') {
        this.ruleForm.officialCodePath = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    async getQRCode() {
      const { data, code } = await DistributionService.getWeappCode()
      this.loading = false
      if (code === '10000') {
        this.link = `${data.page}?${data.parameter}`
        this.appid = data.appId
        this.qrCode = `data:image/png;base64,${data.data}`
        this.storeName = data.memberName || ''
        this.getLoading = true
        this.ruledays = data.beyondTime
        this.ruleForm = {
          qrCodePath: data.qrCodePath,
          dmPath: data.dmPath,
          officialCodePath: data.officialCodePath,
          officialName: data.officialName
        }
      }
    },

    onCopyHandler(id) {
      const clipboard = new Clipboard(`#${id}`)
      clipboard.on('success', () => {
        this.$message({ type: 'success', message: '复制成功！' })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({ type: 'error', message: JSON.stringify(e) })
        clipboard.destroy()
      })
    },
    showUpdateDialog() {
      this.updateDialog = true
      this.changeStoreName = this.storeName
    },
    hiddenUpdateDialog() {
      this.updateDialog = false
    },
    setOrderBeyondTimeService: throttle(async function() {
      const { code } = await DistributionService.setOrderBeyondTime({
        beyondTime: this.ruledays === '' ? 0 : Number(this.ruledays)
      })
      if (code === '10000') {
        this.$message({ type: 'success', message: '设置成功 !' })
        this.getQRCode()
      }
    }, 3000),
    updateStoreNameService: throttle(async function() {
      const { code } = await DistributionService.updateStoreName(
        this.changeStoreName
      )
      if (code === '10000') {
        this.$message({ type: 'success', message: '修改成功' })
        this.hiddenUpdateDialog()
        this.getQRCode()
      }
    }, 3000),
    recommendRadio(value) {
      console.log('recommendRadio-----', value)
    },
    setUpdateDMReqDTO: throttle(async function() {
      if (!this.ruleForm.dmPath) {
        this.$message({
          message: '请上传DM单',
          type: 'error'
        })
        return
      } else if (!this.ruleForm.qrCodePath) {
        this.$message({
          message: '请上传商城二维码',
          type: 'error'
        })
        return
      } else if (!this.ruleForm.officialCodePath) {
        this.$message({
          message: '公众号二维码不能为空',
          type: 'error'
        })
        return
      } else if (!this.ruleForm.officialName && !this.ruleForm.officialName.replace(/\s+/g, '')) {
        this.$message({
          message: '公众号名称不能为空',
          type: 'error'
        })
        return
      }
      console.log('000000', this.ruleForm)
      const { code } = await DistributionService.setUpdateDMReqDTO({
        ...this.ruleForm,
        merCode: this.merCode
      })
      console.log('000000', this.ruleForm, code)
      if (code === '10000') {
        this.$message({ type: 'success', message: '设置成功' })
        this.getQRCode()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  height: 76vh;
  overflow-y: scroll;
  margin-bottom: 30px;
}
.el-icon-plus {
  font-size: 12px;
  color: rgba(0, 0, 0, 0.45);
}
.downloadPDF {
  padding: 9px 20px;
  background: rgba(255, 255, 255, 1);
  border-radius: 4px;
  margin-right: 20px;
  border: 1px solid rgba(21, 125, 232, 1);
  color: #157de8;
  font-size: 14px;
}
.tips-group {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-left: 20px;
  .items {
    font-size: 12px;
    line-height: 24px;
    color: rgba(0, 0, 0, 0.85);
  }
}
.module {
  padding: 30px 69px 50px 69px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid rgba(151, 151, 151, 0.3);
  .title {
    font-size: 16px;
    color: #000;
  }
  .right-items {
    display: flex;
    justify-content: flex-end;
  }
  .content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    .panel {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 20px;
      min-width: 620px;

      .row {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
      }
      &.column {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
      }
      &.flex-start {
        align-items: flex-start;
      }
      .tips {
        color: #000000;
        font-size: 14px;
      }
      .radio-group {
        display: flex;
        flex-direction: row;
        .group {
          margin-left: 20px;
        }
      }
      .tips-txt {
        font-size: 12px;
        color: #f5a623;
        padding: 10px 0 0 80px;
      }
      .rule-input {
        width: 80px;
        margin: 0 10px;
      }
      .txt {
        width: 360px;
        height: 36px;
        border-radius: 4px;
        border: 1px solid #ebebeb;
        margin: 0 10px;
        color: rgba(0, 0, 0, 0.36);
        line-height: 36px;
        padding: 0 10px;
      }
      .copy {
      }
    }
    .code-pic {
      width: 220px;
      height: 220px;
      margin: 30px 0;
    }
    .download {
      width: 114px;
      height: 32px;
      background: rgba(21, 125, 232, 1);
      border-radius: 2px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      color: #fff;
    }
  }
}
</style>
