<template>
  <div class="rule-awardSetting-modal">
    <el-alert
      type="warning"
      :closable="false"
    >奖项个数说明：大转盘支持设置6或8个奖项； 排序说明：将按照您添加的先后顺序在大转盘活动中显示；中奖几率说明：单位默认为百分比，中奖总和必须等于1</el-alert>
    <div style="margin:20px 0">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="奖品顺序" width="50" />
        <el-table-column prop="name" label="奖品类型" />
        <el-table-column prop="province" label="图片" />
        <el-table-column prop="city" label="奖品名称" />
        <el-table-column prop="address" label="内容" />
        <el-table-column prop="zip" label="中奖几率" />
        <el-table-column prop="zip" label="奖品数量" />
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              type="text"
              size="small"
              @click.native.prevent="deleteRow(scope.$index, tableData)"
            >移除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-button type="primary" plain @click="dialogVisible = true">添加奖品</el-button>
    <div style="margin-top:40px">
      <el-button type="primary" @click="$emit('handleNext', true, false, false)">上一步</el-button>
      <el-button type="primary" @click="$emit('handleNext', false, false, true)">保存并提交</el-button>
    </div>
    <el-dialog title="添加奖品" :visible.sync="dialogVisible" width="70%" append-to-body>
      <el-form
        ref="ruleForm"
        :model="ruleForm"
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="奖品类型" prop="region">
          <el-select v-model="ruleForm.region">
            <el-option label="优惠券" value="1" />
            <el-option label="积分" value="2" />
            <el-option label="实物" value="3" />
            <el-option label="谢谢参与" value="4" />
            <el-option label="再来一次" value="5" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="ruleForm.region==='1'" label="奖品内容" prop="region">
          <el-select v-model="ruleForm.inputValue" filterable placeholder="请选择">
            <el-option
              v-for="item in couponList"
              :key="item.id"
              :label="item.cname"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="奖品图片" prop="awardImage">
          <el-upload
            v-loading="uploadLoading"
            class="avatar-uploader x-uploader"
            :action="upLoadUrl"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeUpload"
            @preview="handlePreview"
          >
            <img v-if="ruleForm.awardImage" :src="showImgHandler(ruleForm.awardImage)" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon" />
          </el-upload>
        </el-form-item>
        <el-form-item v-show="ruleForm.region!=='1'" label="奖品内容" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入奖品名称 不超过六个字" style="width:400px" />
        </el-form-item>
        <el-form-item label="中奖几率" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入中奖几率 默认单位百分比" style="width:400px" />%
        </el-form-item>
        <el-form-item label="奖品数量" prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入总数量" style="width:400px" />份
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getCouponList } from '@/api/coupon'
import { mapGetters } from 'vuex'
import config from '@/utils/config'
export default {
  name: 'AwardSetting',
  // props: {

  // },
  data() {
    return {
      uploadLoading: false,
      dialogVisible: false,
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-08',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-06',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        },
        {
          date: '2016-05-07',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }
      ],
      couponList: [],
      ruleForm: {
        name: '',
        region: '1',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        inputValue: '',
        awardImage: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        region: [
          { required: true, message: '请选择活动区域', trigger: 'change' }
        ],
        date1: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ],
        date2: [
          {
            type: 'date',
            required: true,
            message: '请选择时间',
            trigger: 'change'
          }
        ],
        type: [
          {
            type: 'array',
            required: true,
            message: '请至少选择一个活动性质',
            trigger: 'change'
          }
        ],
        resource: [
          { required: true, message: '请选择活动资源', trigger: 'change' }
        ],
        desc: [{ required: true, message: '请填写活动形式', trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  mounted() {
    this.getcouponList()
  },
  methods: {
    deleteRow(index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    getcouponList() {
      const searchParams = {
        cname: '',
        ctype: 0,
        busType: 0,
        currentPage: 1,
        pageSize: 999
      }
      getCouponList(searchParams).then(res => {
        if (res.data && res.data.records) {
          this.couponList = res.data.records
        }
      })
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '10000') {
        this.ruleForm.awardImage = res.data
      } else {
        this.uploadLoading = false
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
    },
    beforeAvatarUpload(file) {
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message({
          message: '上传图片大小不能超过 2MB!',
          type: 'warning'
        })
        return false
      }
      if (!isImg) {
        this.$message({
          message: '请上传jpeg、png、jpg格式的图片',
          type: 'warning'
        })
        return false
      }
      if (isImg) {
        this.uploadLoading = true
      }
      return isImg
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.rule-awardSetting-modal {
  padding-top: 10px;
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
