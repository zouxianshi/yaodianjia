<template>
  <el-popover v-model="visible" placement="right" width="320" trigger="click">
    <div class="subgrouping-model">
      <el-form ref="formInfo" :model="info" :rules="rules" @submit.native.prevent>
        <el-form-item label="" prop="name">
          <el-input v-model="info.name" placeholder="请输入内容" size="mini" style="width: 230px;" />
        </el-form-item>
      </el-form>
      <div v-if="level === '3'||(level==='2'&&type==='create')" class="photo">
        <el-upload
          class="avatar-uploader"
          :action="uploadUrl"
          :show-file-list="false"
          :headers="headers"
          :on-success="handleAvatarSuccess"
          :on-error="handleAvatarError"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="pic" :src="showImg(info.pic)" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon" />
        </el-upload>
      </div>
      <div class="oper">
        <el-button type="success" icon="el-icon-check" :loading="subLoading" circle size="mini" @click="handleSubmit" />
        <el-button type="danger" icon="el-icon-close" circle size="mini" @click="visible=false" />
      </div>
    </div>
    <el-tooltip v-if="!$slots.default" slot="reference" class="item" effect="dark" :content="type === 'edit' ? '编辑' : `新建（${level === '1' ? '二' : '三'}级）子分组` " placement="top">
      <el-button v-if="contentType === 'button'" type="primary" :style="{display:level==='3'?'none':'inline-block'}" icon="el-icon-folder-add" :disabled="level === '3'" circle size="mini" style="margin-right: 10px" />
      <i v-if="contentType === 'text'" class="icon-edit el-icon-edit" />
    </el-tooltip>
    <el-tooltip v-if="$slots.default" slot="reference" class="item" effect="dark" content="创建分组" placement="top">
      <slot />
    </el-tooltip>
  </el-popover>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
let loading = ''
export default {
  name: 'SubgroupingVue',
  components: {},
  props: {
    type: { // 类型  是编辑or创建
      type: String,
      default: ''
    },
    contentType: { // 按钮显示类型  button//text
      type: String,
      default: 'text'
    },
    level: { // 级别
      type: String,
      default: '1'
    },
    oneIndex: { // 下标
      type: Number,
      default: 0
    },
    twoIndex: { // 下标
      type: Number,
      default: 0
    },
    threeIndex: { // 下标
      type: Number,
      default: 0
    },
    parentId: {
      type: String,
      default: '0'
    },
    groupInfo: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      visible: false,
      pic: '',
      rules: {
        name: [{ required: true, message: '请输入分组名称', trigger: 'blur' }]
      },
      info: {
        children: [],
        show: true
      },
      subLoading: false
    }
  },
  computed: {
    ...mapGetters(['groupList', 'merCode', 'token']),
    headers() {
      return { 'Authorization': this.token }
    },
    uploadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImg?merCode=${this.merCode}`
    }
  },
  watch: {
    visible(val) {
      if (val) {
        if (this.groupInfo.name) {
          this.info = JSON.parse(JSON.stringify(this.groupInfo))
          if (this.info.pic) {
            this.pic = this.info.pic
          }
        }
      }
    }
  },
  created() {

  },
  methods: {
    handleSubmit() {
      this.$refs.formInfo.validate((valid) => {
        if (valid) {
          this.subLoading = true
          if (this.type === 'create') {
            this._Create()
          } else {
            this._Modify()
          }
        } else {
          return false
        }
      })
    },
    _Modify() { // 修改
      this.$store.dispatch('group/modifyGroup', this.info).then(res => {
        const updata = this.groupList.slice()
        if (this.level === '1') {
          updata[this.oneIndex] = this.info
        } else if (this.level === '2') {
          updata[this.oneIndex].children[this.twoIndex] = this.info
        } else if (this.level === '3') {
          updata[this.oneIndex].children[this.twoIndex].children[this.threeIndex] = this.info
        }
        this.$store.dispatch('group/updateGroup', updata)
        this.visible = false
        this.subLoading = false
        this.info = {}
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      })
    },
    _Create() { // 创建分组
      const data = {
        'dimensionId': this.$route.params.id,
        'level': this.level === '0' ? 1 : parseInt(this.level) + 1,
        'name': this.info.name,
        'parentId': this.parentId,
        'pic': this.info.pic,
        'type': 2
      }
      this.$store.dispatch('group/createGroup', data).then(res => {
        const resData = res.data
        const updata = this.groupList.slice()
        this.pic = ''
        console.log('提交')
        if (this.level === '1') {
          resData.children = []
          resData.show = true
          updata[this.oneIndex].children.push(resData)
        } else if (this.level === '2') {
          resData.children = []
          resData.show = true
          updata[this.oneIndex].children[this.twoIndex].children.push(resData)
        } else if (this.level === '0') {
          resData.children = []
          resData.show = true
          this.pic = ''
          updata.push(resData)
        }
        this.$store.dispatch('group/updateGroup', updata)
        this.visible = false
        this.subLoading = false
        this.info = {}
        this.$message({
          message: '创建成功',
          type: 'success'
        })
      })
    },
    handleAvatarSuccess(res) {
      if (res.code === '10000') {
        this.pic = res.data
        this.info.pic = res.data
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      loading.close()
    },
    handleAvatarError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        location.reload()
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
        loading.close()
      }
    },
    beforeAvatarUpload(file) {
      const isImg = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/jpg'
      loading = this.$loading({
        lock: true,
        text: '图片上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      if (!isImg) {
        this.$message({
          message: '只能上传格式为 jpg、jpeg、png的图片',
          type: 'warning'
        })
        loading.close()
      }
      return isImg
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .subgrouping-model {
    position: relative;
    .el-button--mini.is-circle {
      padding: 4px;
    }
    .el-button {
      margin-left: 10px;
    }
    .photo {
      padding: 3px;
      border-radius: 3px;
      margin-left: -2px;
      margin-top: 6px;
      .el-image {
        border-radius: 3px;
      }
    }
    .oper {
      position: absolute;
      right: 2px;
      top: 4px;
    }
  }
</style>
<style scoped>
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 50px;
    height: 50px;
    line-height: 50px !important;
    text-align: center;
}
.avatar{
  width: 50px;
  height: 50px;
}
</style>
