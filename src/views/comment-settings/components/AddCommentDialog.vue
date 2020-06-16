<template>
  <el-dialog title="新增评论" :visible.sync="visible" append-to-body @closed="$emit('closed')">
    <el-form ref="formData" :rules="rules" :model="formData" label-width="80px">
      <el-form-item label="评论内容" prop="comment">
        <el-input
          v-model="formData.comment"
          type="textarea"
          :rows="4"
          size="small"
          maxlength="200"
          placeholder="评论内容最多可输入200字"
        />
      </el-form-item>
      <!-- <el-form-item label="评论图片">
        <el-upload
          class="img-upload"
          :action="uploadUlr"
          :headers="headers"
          :on-success="handleFileSuccess"
          :on-exceed="handleExceed"
          :on-remove="handleRemove"
          list-type="picture-card"
          accept="image/png, image/jpeg"
          :limit="4"
        >
          <i class="el-icon-upload2" />
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过1MB</div>
        </el-upload>
      </el-form-item> -->
      <el-form-item class="bottom-bar">
        <el-button @click="$emit('closed')">取消</el-button>
        <el-button type="primary" :loading="isSubmitLoading" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
// 添加评论弹框
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import { addComment } from '@/api/commentService'

export default {
  name: 'AddCommentDialog',
  components: {},
  mixins: [mixins],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    commodityId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      formData: {},
      rules: {
        comment: [
          { required: true, message: '评论内容不能为空', trigger: 'blur' }
        ]
      },
      fileList: [],
      isSubmitLoading: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'token']),
    uploadUlr() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  watch: {},
  methods: {
    onSubmit() {
      const { formData, commodityId, merCode, fileList } = this
      this.$refs['formData'].validate(async valid => {
        if (valid) {
          this.isSubmitLoading = true
          await addComment({
            ...formData,
            commodityId,
            merCode,
            origin: 2,
            top: 0,
            imgUrls: fileList
          })
          this.isSubmitLoading = false
          this.$message.success('添加成功！')
        } else {
          console.log('error submit!!')
          this.isSubmitLoading = false
          return false
        }
      })
    },
    handleFileSuccess(res) {
      if (res.code === '10000') {
        const index = this.fileList.length
        this.$set(this.fileList, index, res.data)
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多只能上传4张图片`)
    },
    handleRemove(file, fileList) {
      console.log('fileList', fileList)
      this.fileList = fileList.map(item => item.response.data)
    }
  }
}
</script>

<style lang="scss">
.custom-tree-node {
  display: -webkit-box;
  display: flex;
  display: -ms-flexbox;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
  &.active {
    color: #2d8cf0;
  }
  i {
    display: inline-block;
    margin-left: 10px;
  }
  .ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 9px;
  }
}
</style>
<style lang="scss">
.el-tree-node__content {
  margin-top: 5px;
}
</style>
<style lang="scss" scoped>
.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
