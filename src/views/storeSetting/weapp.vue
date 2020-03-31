<template>
  <div v-loading="isLoading" class="weapp-container">
    <div class="panel">
      <div class="left">
        <div class="title">小程序码物料 :</div>
        <img class="_image" :src="QR_CODE">
      </div>
      <div class="right">
        <a class="download" :href="QR_CODE" download>下载小程序二维码</a>
      </div>
    </div>
    <div class="panel">
      <div class="left">
        <div class="title">小程序appid :</div>
        <div class="content">{{ APP_ID }}</div>
      </div>
      <div class="right">
        <el-button
          type="primary"
          class="appid"
          :data-clipboard-text="APP_ID"
          @click="onCopyHandler('.appid')"
        >一键复制</el-button>
      </div>
    </div>
    <div class="panel">
      <div class="left">
        <div class="title">参考路径 :</div>
        <div class="content">{{ PAGE_LINK }}</div>
      </div>
      <div class="right">
        <el-button
          type="primary"
          class="pagelink"
          :data-clipboard-text="PAGE_LINK"
          @click="onCopyHandler('.pagelink')"
        >一键复制</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Clipboard from 'clipboard'
import { getWeappSetting } from '@/api/storeSetting.service'
export default {
  data() {
    return {
      APP_ID: '',
      PAGE_LINK: '',
      QR_CODE: '',
      isLoading: true
    }
  },
  mounted() {
    getWeappSetting()
      .then(res => {
        console.log(res)
        this.APP_ID = res.data.appId
        this.PAGE_LINK = res.data.page
        this.QR_CODE = res.data.qrBase64
        this.isLoading = false
      })
      .catch(err => {
        console.error(err)
      })
  },

  methods: {
    // 复制功能
    onCopyHandler(className) {
      const clipboard = new Clipboard(className)
      clipboard.on('success', () => {
        this.$message({ type: 'success', message: '复制成功！' })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({ type: 'error', message: JSON.stringify(e) })
        clipboard.destroy()
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.weapp-container {
  height: 76vh;
  padding: 0 40px;
}
.panel {
  padding: 20px 20px;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    .title {
      width: 120px;
    }
    .content {
    }
    ._image {
      width: 200px;
      height: 200px;
    }
  }
  .right {
    .download {
      padding: 10px 20px;
      font-size: 14px;
      border-radius: 4px;
      color: #fff;
      background-color: #147de8;
      border-color: #147de8;
    }
  }
}
</style>
