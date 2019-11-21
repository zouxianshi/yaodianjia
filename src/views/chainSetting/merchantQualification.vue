<template>
  <div class="container">
    <h3>商家资质</h3>
    <el-table
      :data="list"
      :show-header="false"
    >
      <el-table-column width="230px">
        <template slot-scope="scope">
          {{ scope.row.certificateName }}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
          <el-col :span="20" style="font-size: 14px;color: #999999">
            <span v-if="scope.row.certificateCode">资质证号：{{ scope.row.certificateCode }}</span>

            <el-button
              v-if="!scope.row.certificateCode || !scope.row.certificateName || !scope.row.certificatePicture"
              type="warning"
              size="mini"
              @click="onEdit(scope.row)"
            >待完善</el-button>
            <el-button v-else type="text" icon="el-icon-edit" @click="onEdit(scope.row)" />
            <el-button v-if="scope.$index > 6" type="text" icon="el-icon-delete" @click="onDel(scope.row)" />
            <!--            <span style="font-size: 14px;color: #ffffff;background-color: orangered;padding-left: 5px;padding-right: 5px">待完善</span>-->
            <!--            <el-button type="text" icon="el-icon-delete" style="margin-left: 10px" v-if="!scope.row.id" @click="onDel(scope.$index)"></el-button>-->
          </el-col>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="text" size="small" @click="onCreate">添加其他证书</el-button>
    <!--<div style="text-align: center;margin-top: 10px;margin-bottom: 10px">
      <el-button type="primary" size="small" @click="submit">保存</el-button>
    </div>-->
    <!--<el-row style="margin-top: 30px" v-for="item in list">
      <el-col :span="4" class="label-name">营业执照</el-col>
      <el-col :span="20" style="font-size: 14px;color: #999999">资质证号：12345678</el-col>
    </el-row>-->
    <!--<el-row style="margin-top: 15px">
      <el-col :span="4" class="label-name">药品经营许可证</el-col>
      <el-col :span="20">
        <span style="font-size: 14px;color: #ffffff;background-color: orangered;padding-left: 5px;padding-right: 5px">待完善</span>
      </el-col>
    </el-row>-->
    <el-dialog
      v-if="visable"
      append-to-body
      title="完善证书"
      :visible.sync="visable"
      width="800px"
      :close-on-click-modal="false"
      @close="dismiss"
    >
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        label-position="right"
        label-width="110px"
      >
        <el-form-item label="证书名称：" prop="certificateName">
          <el-input v-model.trim="form.certificateName" style="width: 260px" :disabled="form.sortNumber <= 6" maxlength="30" />
        </el-form-item>
        <el-form-item label="证书编号：" prop="certificateCode">
          <el-input v-model.trim="form.certificateCode" style="width: 260px" maxlength="30" />
        </el-form-item>
        <div v-loading="uploadLoading">
          <el-form-item label="证书图片：" prop="certificatePicture">
            <el-input v-model="form.certificatePicture" style="display: none" />
            <el-upload
              class="avatar-uploader"
              :headers="headers"
              :action="upLoadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </div>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dismiss">取 消</el-button>
        <el-button type="primary" size="small" :loading="loading" @click="handleSubmit('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import config from '../../utils/config'
import {
  getMerCertificate,
  createMerCertificate,
  editMerCertificate,
  delMerCertificate
} from '../../api/chainSetting'
export default {
  name: 'MerchantQualification',
  data() {
    const _checkName = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9]+$/
      if (!reg.test(value)) {
        callback(new Error('只能输入中英文或数字'))
      } else {
        callback()
      }
    }
    return {
      uploadLoading: false,
      loading: false,
      popVisible: false,
      visable: false,
      defaultName: [
        '营业执照',
        '药品经营许可证',
        '药品经营质量管理规范认证证书',
        '互联网药品信息规范认证证书',
        '互联网药品交易服务资格证书',
        '食品流通许可证',
        '医疗器械经营许可证'
      ],
      list: [],
      form: {
        id: null,
        certificateName: null,
        certificateCode: null,
        certificatePicture: null,
        sortNumber: 0
      },
      imageUrl: '',
      rules: {
        certificateName: [
          { required: true, message: '请输入证书名称', trgger: 'blur' }
        ],
        certificateCode: [
          { required: true, message: '请输入证书编号', trgger: 'blur' },
          { validator: _checkName, message: '只能输入数字和英文字母', trigger: 'blur' }
        ],
        certificatePicture: [
          { required: true, message: '请上传证书图片', trgger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['merCode']),
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_uploadImg?merCode=${this.merCode}`
    },
    headers() {
      return { 'Authorization': this.$store.getters.token }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    handleSubmit(form) { // 保存
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.save()
        } else {
          console.log('error submit')
        }
      })
    },
    getData() {
      this.loading = true
      getMerCertificate(this.merCode).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.list = _.cloneDeep(res.data)
          const tempList = [
            _.find(_.cloneDeep(res.data), { 'sortNumber': 0 }),
            _.find(_.cloneDeep(res.data), { 'sortNumber': 1 }),
            _.find(_.cloneDeep(res.data), { 'sortNumber': 2 }),
            _.find(_.cloneDeep(res.data), { 'sortNumber': 3 }),
            _.find(_.cloneDeep(res.data), { 'sortNumber': 4 }),
            _.find(_.cloneDeep(res.data), { 'sortNumber': 5 }),
            _.find(_.cloneDeep(res.data), { 'sortNumber': 6 })
          ]
          for (let i = 0; i < tempList.length; i++) {
            let tempData = tempList[i]
            if (tempData) {
              tempData.certificateName = this.defaultName[i]
            } else {
              tempData = {
                certificateName: this.defaultName[i],
                certificateCode: null,
                certificatePicture: null,
                sortNumber: i
              }
            }
            tempList[i] = tempData
          }
          this.list = _.filter(_.cloneDeep(this.list), (o) => o.sortNumber > 6)
          _.map(tempList, (o) => {
            this.list.push(o)
          })
          this.list = _.orderBy(_.cloneDeep(this.list), ['sortNumber'], ['asc'])
          console.log(this.list)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-3', res.data)
      })
    },
    onDel(row) {
      this.$confirm('确定删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(row)
      }).catch(() => {
      })
    },
    onEdit(row) {
      this.form = _.cloneDeep(row)
      console.log(this.form.certificatePicture)
      if (this.form.certificatePicture) {
        this.imageUrl = this.showImg(this.form.certificatePicture)
        console.log(this.imageUrl)
      }
      this.visable = true
    },
    onCreate() {
      this.form.sortNumber = this.list[this.list.length - 1].sortNumber + 1
      this.visable = true
    },
    save() {
      if (this.uploadLoading) {
        return
      }
      this.loading = true
      this.form.merCode = this.merCode
      if (this.form.id) {
        editMerCertificate(this.form).then(res => {
          if (res.code === '10000') {
            this.loading = false
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 5 * 1000
            })
            this.dismiss()
            this.getData()
          } else {
            this.loading = false
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 5 * 1000
            })
          }
          console.log('res-3', res.data)
        })
      } else {
        createMerCertificate(this.form).then(res => {
          if (res.code === '10000') {
            this.loading = false
            this.$message({
              message: '保存成功',
              type: 'success',
              duration: 5 * 1000
            })
            this.dismiss()
            this.getData()
          } else {
            this.loading = false
            this.$message({
              message: res.msg,
              type: 'error',
              duration: 5 * 1000
            })
          }
          console.log('res-3', res.data)
        })
      }
    },
    del(row) {
      this.loading = true
      delMerCertificate({
        merCode: this.merCode,
        id: row.id
      }).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.$message({
            message: '删除',
            type: 'success',
            duration: 5 * 1000
          })
          this.getData()
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-3', res.data)
      })
    },
    submit() {
      /* let sortNumber = 0
      _.map(this.list, (o) => {
        if(o.sortNumber && o.sortNumber > sortNumber){
          sortNumber = o.sortNumber
        }
      })
      const saveData = _.filter(_.cloneDeep(this.list), (o) => {return o.id == null})
      _.map(saveData, (o) => {
        sortNumber++
        _.assign(o, {
          sortNumber: sortNumber,
          merCode: this.merCode
        })
      })
      console.log(saveData)*/

    },
    dismiss() {
      this.form.id = null
      this.form.certificatePicture = null
      this.form.certificateName = null
      this.form.certificateCode = null
      this.imageUrl = null
      this.visable = false
    },
    handleAvatarSuccess(res, file) {
      this.form.certificatePicture = res.data
      this.imageUrl = URL.createObjectURL(file.raw)
      this.uploadLoading = false
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isJPG && !isPNG) {
        this.$message.error('上传证书图片只能是 JPG/PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传证书图片大小不能超过 2MB!')
      }
      this.uploadLoading = true
      return (isJPG || isPNG) && isLt2M
    }
  }
}
</script>

<style scoped>
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    color: #99a9bf;
  }
  .label-name {
    font-size: 14px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    text-align: center;
  }
  .avatar {
    width: 108px;
    height: 108px;
    display: block;
  }
</style>
