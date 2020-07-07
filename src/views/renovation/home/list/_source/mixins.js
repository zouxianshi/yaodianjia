import { mapGetters } from 'vuex'
import config from '@/utils/config'
const minxis = {
  data() {
    return {
      pageLoading: false
    }
  },
  computed: {
    ...mapGetters(['token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
      if (res.code === '10000') {
        this.formData.shareImg = res.data
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
    handleAvatarErr() {
      this.pageLoading.close()
    },
    beforeAvatarUpload(file) {
      const isImg =
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isImg) {
        this.$message({
          message: '只能上传格式为 jpg、jpeg、png的图片',
          type: 'warning'
        })
        return
      }
      this.pageLoading = this.$loading({
        lock: true,
        text: '图片上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return isImg && isLt2M
    }
  }
}

export default minxis
