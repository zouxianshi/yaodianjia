<template>
  <div class="form-box">
    <el-form :model="formData" label-width="100px" size="small">
      <el-form-item label="模板名称：">
        <el-input v-model="formData.name" placeholder="请输入最多不超过12个汉字" show-word-limit maxlength="12" />
      </el-form-item>
      <el-form-item label="页面标题：">
        <el-input v-model="formData.title" placeholder="请输入最多不超过12个汉字" show-word-limit maxlength="12" />
      </el-form-item>
      <el-form-item label="背景颜色：">
        <div class="color-box">
          <el-color-picker
            v-model="formData.backgroundColor"
            size="mini"
            :predefine="predefineColors"
          /> <span v-text="formData.backgroundColor" />
        </div>
      </el-form-item>
      <el-form-item label="组件边框：">
        <el-select v-model="formData.borderFlag">
          <el-option :value="0" label="无边框" />
          <el-option :value="1" label="有边框" />
        </el-select>
      </el-form-item>
      <template v-if="formData.borderFlag===1">
        <el-form-item label="边框样式">
          <el-select v-model="formData.borderStyle">
            <el-option :value="0" label="直角" />
            <el-option :value="1" label="圆角" />
          </el-select>
        </el-form-item>
        <el-form-item label="边框大小：">
          <el-input v-model="formData.borderSize" placeholder="建议填写3" show-word-limit maxlength="12">
            <template slot="append">px</template>
          </el-input>
        </el-form-item>
        <el-form-item v-if="formData.borderFlag===1" label="边框颜色：">
          <el-color-picker
            v-model="formData.borderColor"
            show-alpha
            :predefine="predefineColors"
          />
        </el-form-item>
      </template>
      <el-form-item label="分享描述：">
        <el-input v-model="formData.shareDesc" maxlength="16" show-word-limit placeholder="请填写最多不超过16个汉字" />
      </el-form-item>
      <el-form-item label="分享图片：">
        <el-upload
          class="avatar-uploader"
          :action="upLoadUrl"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="formData.shareImg" :src="formData.shareImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
          <div slot="tip" class="el-upload__tip">请上传jpg、png格式图片，建议尺寸5：4</div>
        </el-upload>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import config from '@/utils/config'
import { mapGetters } from 'vuex'
export default {
  name: 'BaseForm',
  computed: {
    ...mapGetters(['token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  data() {
    return {
      formData: {
        backgroundColor: '#fff',
        borderColor: '',
        borderFlag: 0,
        borderSize: 0,
        borderStyle: 0,
        name: '',
        searchHint: '',
        shareDesc: '',
        shareImg: '',
        styleType: 0,
        title: ''
      },
      predefineColors: [
        '#ff4500',
        '#ff8c00',
        '#ffd700',
        '#90ee90',
        '#00ced1',
        '#1e90ff',
        '#c71585',
        '#c7158577'
      ],
      rules: {}
    }
  },
  methods: {
    initData(val) {
      this.formData = val
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '10000') {
        this.formData.shareImg = res.data
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      }
    },
    beforeAvatarUpload() {

    }
  }
}
</script>
<style lang="scss">
    .form-box{
         .avatar-uploader-icon {
            font-size: 28px;
            color: #8c939d;
            width: 100px;
            height: 100px;
            line-height: 100px!important;
            text-align: center;
        }
        .avatar {
            width: 100px;
            height: 100px;
            display: block;
        }
    }
</style>
<style lang="scss" scoped>
.color-box{
    height: 38px;
    width: 150px;
    border:1px solid #E0E0E0;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 5px;
}

</style>
