<template>
  <el-dialog
    title="推广设置"
    :append-to-body="true"
    :visible.sync="dialogVisible"
    class="actform-dialog"
  >
    <el-form ref="actForm" :model="actForm" :rules="rules" size="small" label-width="120px">
      <div class="form-title">活动宣传设置</div>
      <el-form-item label="活动图片：">
        <el-upload
          class="avatar-uploader-poster"
          :action="upLoadUrl"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleImgError"
        >
          <el-image v-if="actForm.bannerUrl" :src="showImg(actForm.bannerUrl)" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon-poster" />
        </el-upload>
        <p style="color: rgb(171,171,171)">活动图片首页设置, 建议尺寸：750px*268px支持.jpg.png.jpeg格式，大小不超过1M</p>
      </el-form-item>
      <div class="form-title">朋友圈推广</div>
      <el-form-item>
        <img :src="shareImg">
      </el-form-item>
      <el-form-item label="标题：" prop="setName">
        <el-input
          v-model="actForm.setName"
          placeholder="不超过15字"
          style="width: 380px;"
          maxlength="15"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="摘要：">
        <el-input
          v-model="actForm.setDesc"
          style="width: 380px;"
          maxlength="30"
          show-word-limit
          type="textarea"
          placeholder="请输入摘要信息"
          :autosize="{ minRows: 2, maxRows: 4}"
        />
      </el-form-item>
      <el-form-item label="图片：" required>
        <el-upload
          class="avatar-uploader"
          :action="upLoadUrl"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleImgAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="handleImgError"
        >
          <el-image v-if="actForm.picUrl" :src="showImg(actForm.picUrl)" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button :loading="creatLoading" type="primary" style="width: 120px" @click="actFormSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import shareImg from '@/assets/image/acvity/share-img.png'
// import { createActExtend, updateActExtend, getActExtend } from '@/api/activity'
import { createActExtend, getActExtend } from '@/api/activity'

export default {
  data() {
    return {
      actForm: {
        picUrl: '',
        bannerUrl: ''
      },
      pageLoading: false,
      shareImg,
      dialogVisible: false,
      rules: {
        setName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        picUrl: [{ required: true, message: '请上传活动图片', trigger: 'blur' }]
      },
      activityId: '',
      loading: false,
      creatLoading: false
    }
  },
  computed: {
    ...mapGetters(['token', 'merCode']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  methods: {
    open(activityId) {
      this.activityId = activityId
      this.dialogVisible = true
      this.loading = true
      getActExtend(activityId).then(res => {
        const { data } = res
        this.actForm = data
        this.loading = false
      }).catch(error => {
        console.log(error)
        this.loading = false
      })
    },
    handleImgError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        // location.reload()
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
        this.pageLoading.close()
      }
    },
    handleAvatarSuccess(res, file) {
      console.log('图片地址-----', this.actForm, file)
      if (res.code === '10000') {
        this.actForm.bannerUrl = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }

      this.pageLoading.close()
    },
    handleImgAvatarSuccess(res, file) {
      console.log('图片地址-----', this.actForm, file)
      if (res.code === '10000') {
        this.actForm.picUrl = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }

      this.pageLoading.close()
    },

    beforeAvatarUpload(file) {
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
    },
    actFormSubmit() {
      console.log('活动设置我要提交了')
      this.$refs.actForm.validate(valid => {
        if (valid) {
          console.log('我准备通过了----------------------', this.actForm)
          if (!this.actForm.picUrl) {
            this.$message({
              message: '图片不可为空',
              type: 'warning'
            })
          }
          // 此处需要根据当前活动是否设置了推广
          // 如果没有需要调取createActExtend
          // 如果需要更新则需要调取updateActExtend
          this.creatLoading = true
          createActExtend()
            .then(res => {
              this.creatLoading = false
              if (res.code === '10000') {
                this.$message({
                  message: '配置创建成功',
                  type: 'success'
                })
              }
            })
            .catch(error => {
              console.log(error)
              this.creatLoading = false
            })
        } else {
          console.log('error submit!!', valid)
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.actform-dialog {
  overflow: auto;
  .form-title {
    line-height: 14px;
    font-size: 14px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
  }
  .avatar-uploader-icon-poster {
    font-size: 28px;
    color: #8c939d;
    width: 300px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
  }
  .avatar-uploader-poster {
    .avatar {
      width: 300px !important;
      height: 100px !important;
    }
  }
  .avatar-uploader-poster .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  img {
    width: 100%;
  }
}
</style>
