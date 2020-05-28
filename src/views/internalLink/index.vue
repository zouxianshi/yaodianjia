<template>
  <div class="app-container">
    <el-table :data="list">
      <el-table-column label="页面名称" property="pageName" />
      <el-table-column label="链接地址" property="linkAddress" />
      <el-table-column label="操作" width="200px">
        <template slot-scope="scope">
          <el-button type="text" class="copy-key" :data-clipboard-text="scope.row.linkAddress" @click="onCopyLink">复制链接</el-button>
          <el-link type="primary" :underline="false" @click="onDownload(scope.row)"><a class="download" :href="scope.row.QR_CODE" download>下载二维码</a></el-link>
          <!-- <el-button type="text" class="copy-key" :data-clipboard-text="scope.row.linkAddress" @click="onCopyLink">下载二维码</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash'
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import {
  getInternalLink
} from '../../api/chainSetting'

import QRCode from 'qrcode'

export default {
  name: 'InternalLink',
  data() {
    return {
      loading: false,
      list: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getData()
  },
  methods: {
    downloadFile(fileName, content) {
      const aLink = document.createElement('a')
      const blob = this.base64ToBlob(content)
      const evt = document.createEvent('HTMLEvents')
      evt.initEvent('click', true, true)
      aLink.download = fileName
      aLink.href = URL.createObjectURL(blob)
      // aLink.dispatchEvent(evt);
      aLink.click()
    },
    // base64转blob
    base64ToBlob(code) {
      const parts = code.split(';base64,')
      const contentType = parts[0].split(':')[1]
      const raw = window.atob(parts[1])
      const rawLength = raw.length
      const uInt8Array = new Uint8Array(rawLength)
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })
    },
    onDownload({ pageName, linkAddress }) {
      QRCode.toDataURL(linkAddress, { height: 600, width: 600 }).then(url => {
        this.downloadFile(pageName, url)
      })
    },
    getData() {
      getInternalLink(this.merCode).then(res => {
        if (res.code === '10000') {
          // this.QR_CODE = res.data.qrBase64
          this.list = _.cloneDeep(res.data)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    onCopyLink() {
      const clipboard = new Clipboard(`.copy-key`)
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

<style scoped>
  .container{
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 10px;
  }
</style>
