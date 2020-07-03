<template>
  <el-dialog title="页面设置" append-to-body="" :close-on-click-modal="false" width="500px" :visible.sync="visible">
    <div class="share-info-box">
      <el-form ref="formData" :model="formData" :rules="rules" size="small" label-width="100px">
        <el-form-item label="分享描述：" prop="shareDesc">
          <el-input v-model="formData.shareDesc" maxlength="16" show-word-limit placeholder="请填写最多不超过16个汉字" />
        </el-form-item>
        <el-form-item label="分享图片：" prop="shareImg">
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            :on-error="handleAvatarErr"
          >
            <img v-if="formData.shareImg" :src="showImg(formData.shareImg)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
            <div slot="tip" class="el-upload__tip">请上传jpg、png格式图片，建议尺寸5：4</div>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <span slot="footer">
      <el-button size="mini">取消</el-button>
      <el-button type="primary" :loading="saveLoading" size="mini" @click="handleSubmit">确定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import mixins from './mixins'
import { checkName } from '@/utils/validate'
import RenovationService from '@/api/renovation'

const vefDesc = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('请输入分享描述'))
  } else if (checkName(value)) {
    callback(new Error('特殊字符串有限制不可输入，仅可输入最多不超过16个汉字'))
  } else {
    callback()
  }
}

export default {
  name: 'ShareInfo',
  mixins: [mixins],
  props: {
    ids: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      visible: false,
      saveLoading: false,
      formData: {
        shareDesc: '',
        shareImg: ''
      },
      rules: {
        shareDesc: [
          { validator: vefDesc, trigger: 'blur' }
        ],
        shareImg: [{ required: true, message: '请上传分享图片', trigger: 'change' }]
      }
    }
  },
  methods: {
    openDialog() {
      this.visible = true
      this.$nextTick(_ => {
        this.$refs.formData.resetFields()
      })
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
      return isType && isLt2M
    },
    handleSubmit() {
      this.$refs['formData'].validate(async(valid) => {
        if (valid) {
          console.log('ids', this)
          const data = { ids: this.ids, ...this.formData }
          try {
            this.saveLoading = true
            await RenovationService.updateShareInfo(data)
            this.$message({
              message: '设置成功',
              type: 'success'
            })
            this.$emit('success')
            this.saveLoading = false
            this.visible = false
          } catch (error) {
            this.saveLoading = false
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
     .share-info-box{
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
