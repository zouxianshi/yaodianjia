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

    <div class="module" style="border:0;">
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
      loading: true
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
    async setOrderBeyondTimeService() {
      const { code } = await DistributionService.setOrderBeyondTime({
        beyondTime: this.ruledays === '' ? 0 : Number(this.ruledays)
      })
      if (code === '10000') {
        this.$message({ type: 'success', message: '设置成功 !' })
        this.getQRCode()
      }
    },
    async updateStoreNameService() {
      const { code } = await DistributionService.updateStoreName(
        this.changeStoreName
      )
      if (code === '10000') {
        this.$message({ type: 'success', message: '修改成功' })
        this.hiddenUpdateDialog()
        this.getQRCode()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.setting-container {
  height: 76vh;
  overflow-y: scroll;
  margin-bottom: 30px;
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
      .tips {
        color: #000000;
        font-size: 14px;
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
