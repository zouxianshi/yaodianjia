<template>
  <span class="el-upload-model">
    <el-upload :headers="headers" :action="upLoadUrl" :show-file-list="false" :on-error="handleUploadError" :on-success="handleUploadSuccess" :before-upload="beforeUpload">
      <img v-if="imageUrl" :src="imageUrl" class="avatar">
      <i v-else class="el-icon-plus avatar-uploader-icon" />
    </el-upload>
  </span>
</template>
<script>
import config from '@/utils/config'
export default {
  name: 'SaElUpload',
  data() {
    return {
      imageUrl: ''
    }
  },
  props: {},
  methods: {
    handleUploadSuccess(res, file) {
      this.$message.success('上传成功！')
      this.$emit('on-upload', { img: this.showImg(res.data), file })
    },
    handleUploadError() {
      this.$message.error('图片上传失败')
    },

    beforeUpload(file) {
      const isType = file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isType) {
        this.$message.warning('请上传 JPG、JPEG、PNG 格式的图片！')
        return false
      }
      if (!isLt2M) {
        this.$message.warning('请上传不超过 2M 的图片！')
        return false
      }
      this.uploadLoading = true
      return isType && isLt2M
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
    headers() {
      return { 'Authorization': this.$store.getters.token }
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.$store.getters.merCode}`
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .el-upload-model {
    display: inline-block;
    .avatar-uploader-icon {
      border-radius:4px;
      border:1px solid rgba(224,224,224,1);
    }
  }
</style>
