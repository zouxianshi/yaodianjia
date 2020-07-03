<template>
  <el-dialog title="页面设置" append-to-body="" :close-on-click-modal="false" width="500px" :visible.sync="visible">
    <div class="form-box">
      <el-form ref="formData" :model="formData" :rules="rules" label-width="100px" size="small">
        <el-form-item label="模板名称：" prop="name">
          <el-input v-model="formData.name" placeholder="请输入最多不超过12个汉字" show-word-limit maxlength="12" />
        </el-form-item>
        <el-form-item label="页面标题：" prop="title">
          <el-input v-model="formData.title" placeholder="请输入最多不超过12个汉字" show-word-limit maxlength="12" />
        </el-form-item>
        <el-form-item label="背景颜色：" prop="backgroundColor">
          <div class="color-box">
            <el-color-picker
              v-model="formData.backgroundColor"
              size="mini"
              :predefine="predefineColors"
            /> <span v-text="formData.backgroundColor" />
          </div>
        </el-form-item>
        <el-form-item label="组件边框：" prop="borderFlag">
          <el-select v-model="formData.borderFlag">
            <el-option :value="0" label="无边框" />
            <el-option :value="1" label="有边框" />
          </el-select>
        </el-form-item>
        <template v-if="formData.borderFlag===1">
          <el-form-item label="边框样式" prop="borderStyle">
            <el-select v-model="formData.borderStyle">
              <el-option :value="0" label="直角" />
              <el-option :value="1" label="圆角" />
            </el-select>
          </el-form-item>
          <el-form-item label="边框大小：" prop="borderSize">
            <el-input v-model="formData.borderSize" type="number" placeholder="建议填写3" show-word-limit maxlength="12">
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          <el-form-item label="边框颜色：" prop="borderColor">
            <div class="color-box">
              <el-color-picker
                v-model="formData.borderColor"
                size="mini"
                :predefine="predefineColors"
              /> <span v-text="formData.borderColor" />
            </div>
          </el-form-item>
        </template>
        <el-form-item label="分享描述：" prop="shareDesc">
          <el-input v-model="formData.shareDesc" maxlength="16" show-word-limit placeholder="请填写最多不超过16个汉字" />
        </el-form-item>
        <el-form-item label="分享图片：" prop="shareImg">
          <el-upload
            class="avatar-uploader"
            :action="upLoadUrl"
            :headers="headers"
            :show-file-list="false"
            :before-upload="beforeUpload"
            :on-success="handleAvatarSuccess"
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
      <el-button size="small" @click="visible=false">取消</el-button>
      <el-button size="small" :loading="saveLoaiding" type="primary" @click="handleSubmit">确定</el-button>
    </span>
  </el-dialog>

</template>
<script>
import RenovationService from '@/api/renovation'
import mixins from './mixins'
export default {
  name: 'BaseForm',
  mixins: [mixins],
  data() {
    return {
      visible: false,
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
        '#c7158577',
        '#e5e5e5',
        '#c9c9c9'
      ],
      rules: {
        name: [{ required: true, message: '请输入模板名称', trigger: 'blur' }],
        title: [{ required: true, message: '请输入页面标题', trigger: 'blur' }],
        backgroundColor: [{ required: true, message: '请设置背景颜色', trigger: 'change' }],
        borderFlag: [{ required: true, message: '请选择组件边框', trigger: 'change' }],
        borderStyle: [{ required: true, message: '请选择边框样式', trigger: 'change' }],
        borderSize: [{ required: true, message: '请输入边框大小', trigger: 'blur' }],
        borderColor: [{ required: true, message: '请边框颜色', trigger: 'change' }],
        shareDesc: [{ required: true, message: '请输入分享描述', trigger: 'blur' }],
        shareImg: [{ required: true, message: '请上传分享图片', trigger: 'change' }]
      },
      pageLoading: null,
      saveLoaiding: false
    }
  },
  methods: {
    openDialog(val) {
      this.formData = val
      this.visible = true
    },
    handleSubmit() {
      this.$refs['formData'].validate((valid) => {
        if (valid) {
          this._updateBase()
        } else {
          console.log('error submit!!')
          return false
        }
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
    //  更新基本信息
    async _updateBase() {
      this.saveLoaiding = true
      try {
        await RenovationService.updateBaseInfo(this.formData)
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        this.visible = false
        this.saveLoaiding = false
        this.$emit('success')
      } catch (error) {
        this.saveLoaiding = false
        console.log(error)
      }
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
