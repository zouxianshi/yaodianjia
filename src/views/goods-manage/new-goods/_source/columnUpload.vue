<template>
  <div class="spec-upload-model">
    <el-upload class="avatar-uploader specs-img-table" :action="upLoadUrl" :headers="{ Authorization: token }" :show-file-list="false" :on-success="handleAvatarSuccessEdit" :on-error="handleImgError" :before-upload="beforeUpload">
      <el-image v-if="item.picUrl" class="avatar" style="width:60px;height:60px" :src="showImg(item.picUrl)">
        <div slot="placeholder" class="image-slot">加载中<span class="dot">...</span></div>
      </el-image>
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
export default {
  name: 'SpecUpload',
  data() {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    handleAvatarSuccessEdit(res, fileList, index) {
      if (res.code === '10000') {
        this.$set(this.item, 'picUrl', res.data)
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
    handleImgError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        location.reload()
      } else {
        this.$message({ message: '图片上传失败', type: 'error' })
        this.pageLoading.close()
      }
    },
    beforeUpload(file) {
      const size = file.size / 1024
      const isImg =
          file.type === 'image/jpeg' ||
          file.type === 'image/png' ||
          file.type === 'image/jpg'
      if (!isImg) {
        this.$message({
          message: '只能上传格式为 jpg、jpeg、png的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return
      }
      if (size > 1024) {
        this.$message({
          message: '最大只能上传1MB的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return false
      }
      this.pageLoading = this.$loading({
        lock: true,
        text: '图片上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return true
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spec-upload-model {

  }
</style>
