<template>
  <div class="imgupload">
    <draggable id="upload-list" v-model="fileList" class="upload-list" @end="handeDragEnd">
      <div
        v-for="(item,index) in fileList"
        :key="index"
        class="upload-list-card"
      >
        <div v-if="item.status==='uploading'" class="process text-center">
          <el-progress type="circle" :width="80" :percentage="item.process" />
        </div>
        <div v-else class="uploaded-img">
          <img :src="item.imgUrl" alt="">
          <div class="action">
            <i class="el-icon-zoom-in" @click="handlePreview(item)" />
            <i class="el-icon-delete" @click.stop="handleRemove(index)" />
          </div>
          <label v-show="item.status==='success'" class="upload-status-label-suc">
            <i class="el-icon-upload-success el-icon-check" />
          </label>
        </div>
      </div>
    </draggable>
    <div v-if="limit!==0&&fileList.length!==limit" class="upload-list-card upload-box">
      <i class="el-icon-plus" />
      <input
        id="files"
        type="file"
        class="upload-btn"
        :multiple="multiple"
        @change="handleChooseFile"
      >
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import draggable from 'vuedraggable'
export default {
  name: 'ImgUpload',
  components: { draggable },
  props: {
    multiple: { // 是否支持多选
      type: Boolean,
      default: false
    },
    actions: { // 上传地址
      type: String,
      default: ''
    },
    name: { // 上传是的file名字
      type: String,
      default: 'file'
    },
    fileData: { // 上传时的额外参数
      type: Object,
      default: () => {
        return null
      }
    },
    headers: { // 请求头
      type: Object,
      default: () => {
        return null
      }
    },
    limit: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      fileList: []
    }
  },
  created() {

  },
  methods: {
    handeDragEnd() {
      this.$emit('onsort', this.fileList)// 排序成功之后抛出数据
    },
    getFileList() { // 获取已上传的文件列表
      return this.fileList
    },
    handleChooseFile(e) {
      const file = e.target.files[0]
      if (file) {
        const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
        if (!isImg) {
          this.$message({
            message: '只能上传图片',
            type: 'warning'
          })
          return
        }
        this.fileList.push({
          name: file.name,
          fileSize: file.size,
          status: 'uploading',
          imgUrl: URL.createObjectURL(file),
          process: 0
        })
        const index = this.fileList.length
        const formData = new FormData()
        formData.append('file', file)
        formData.append('merCode', this.fileData.merCode)
        this.uploadFile(index - 1, formData)
        document.getElementById('files').value = '' // 置空，解决上传重复图片
      }
    },
    uploadFile(index, data) {
      axios({
        url: this.actions,
        method: 'post',
        headers: this.headers,
        onUploadProgress: (progressEvent) => { // 原生获取上传进度的事件
          if (progressEvent.lengthComputable) {
            // 属性lengthComputable主要表明总共需要完成的工作量和已经完成的工作是否可以被测量
            // 如果lengthComputable为false，就获取不到progressEvent.total和progressEvent.loaded
            const process = parseInt((progressEvent.loaded / progressEvent.total) * 100)
            this.fileList[index].process = process
            if (process === 100) {
              this.fileList[index].status = 'success'
            }
          }
        },
        data: data
      }).then(res => {
        if (res.data.code === '10000') {
          this.fileList[index].imgUrl = res.data.data
        }
        this.$emit('onSuccess', res.data, this.fileList, index)
      }).catch(error => {
        this.$emit('onError', error, index)
      })
    },
    handlePreview(val) {
      this.$emit('preview', val)
    },
    handleRemove(index) {
      this.fileList.splice(index, 1)
    }
  }
}
</script>
<style lang="scss" scoped>
.upload-list {
  display: inline-block;
}
.upload-list-card {
  display: inline-block;
  width: 100px;
  height: 100px;
  background-color: #fbfdff;
  border: 1px solid #c0ccda;
  border-radius: 6px;
  box-sizing: border-box;
  cursor: pointer;
  line-height: 146px;
  vertical-align: top;
  line-height: 100px;
  margin-right: 5px;
  .upload-btn {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    cursor: pointer;
    width: 100px;
  }
  .process {
    height: 100px;
    .el-progress--circle {
      vertical-align: middle;
      margin-top: -6px;
    }
  }
  .uploaded-img {
    height: 100%;
    position: relative;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      border-radius: 6px;
    }
    &:hover {
      .action {
        opacity: 1;
      }
    }
    .upload-status-label-suc{
      position: absolute;
      display: block;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgba(0,0,0,.2);
      line-height: normal;
      i{
        font-size: 12px;
        margin-top: 11px;
        transform: rotate(-45deg);
        color: #fff;
      }
    }
    .action {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      cursor: default;
      text-align: center;
      color: #fff;
      opacity: 0;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      i{
        cursor: pointer;
      }
    }
  }
  &.upload-box {
    position: relative;
    text-align: center;
    border: 1px dashed #c0ccda;
    i {
      font-size: 28px;
      color: #8c939d;
    }
  }
}
</style>
