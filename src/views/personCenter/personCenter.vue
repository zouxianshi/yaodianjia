<template>
  <div class="app-container">
    <div class="modal-body">
      <el-form ref="modalForm" :model="modalForm" :rules="rules" label-width="100px">
        <el-form-item label="姓名" prop="userName">
          <span>{{ modalForm.userName }}</span>
          <!--          <el-input v-model="modalForm.userName" style="width:300px" size="small" placeholder="请输入姓名" :disabled="true" />-->
        </el-form-item>
        <el-form-item label="手机号码" prop="mobile">
          <el-input v-model.trim="modalForm.mobile" style="width:300px" size="small" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="邮箱" prop="mail">
          <el-input v-model.trim="modalForm.mail" style="width:300px" size="small" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="post">
          <el-button type="primary" plain @click="resetPwsClick">修改密码</el-button>
        </el-form-item>
        <el-form-item label="部门" prop="deptName">
          <!--          <el-input v-model="modalForm.deptName" style="width:300px" size="small" disabled />-->
          <span style="color:#333333">{{ modalForm.deptName }}</span>
        </el-form-item>
        <el-form-item label="所属角色" prop="roleRemark">
          <!--          <textarea v-model="modalForm.roles[0].roleRemark" style="width:300px" />-->
          <span style="color:#333333">{{ modalForm.rolesRemark }}</span>
        </el-form-item>
        <el-form-item label="创建时间" prop="createTime">
          <!--          <el-input v-model="modalForm.createTime" style="width:300px" size="small" disabled />-->
          <span style="color:#333333">{{ modalForm.createTime }}</span>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" :loading="subLoading" @click="onSubmit('modalForm')">保 存</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      title="重置密码"
      :visible.sync="resetdialogVisible"
      append-to-body
      width="30%"
    >
      <div class="reset-body">
        <el-form ref="resetModel" :model="resetModel" label-width="100px" :rules="rules">
          <el-form-item label="新密码" prop="resetPwd">
            <el-input v-model="resetModel.resetPwd" style="width:203px" size="small" placeholder="请输入密码" />
          </el-form-item>
          <el-form-item label="老密码" prop="oldPwd">
            <el-input v-model="resetModel.oldPwd" style="width:203px" size="small" placeholder="请输入密码" />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" type="primary" @click="resetPwsClickBtn('resetModel')">重 置</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
import { checkPersonCenter, updatePersonCenterData, resetPWDPersonCenter } from '@/api/merchant_Person_Api'
import { checkPhone, checkEmail } from '@/utils/validate'
import md5 from 'js-md5'
export default {
  name: 'PersonCenter',
  data() {
    const _checkPhone = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入手机号码'))
      }
      if (!checkPhone(value)) {
        callback(new Error('手机号码输入有误'))
      } else {
        callback()
      }
    }

    const _mail = (rule, value, callback) => {
      if (!value) {
        callback(new Error('请输入邮箱'))
      }
      if (!checkEmail(value)) {
        callback(new Error('邮箱输入有误'))
      } else {
        callback()
      }
    }

    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!/^(?![^a-zA-Z]+$)(?!\D+$).{6,20}/.test(value)) {
          callback(new Error('请设置6-20位数字和字母组成的密码'))
        }
        callback()
      }
    }

    return {
      modalForm: {
        id: '',
        merCode: '',
        userCode: '',
        userName: '',
        account: '',
        password: '',
        avatarPath: '',
        mobile: '',
        mail: '',
        userType: '',
        userStatus: '',
        deptName: '',
        createTime: '',
        roles: [],
        rolesRemark: ''
      },
      resetModel: {
        resetPwd: '',
        oldPwd: ''
      },
      subLoading: false,
      // index: 0,
      resetdialogVisible: false,
      rules: {
        mobile: [{ required: true, validator: _checkPhone, trigger: 'blur' }],
        mail: [{ required: true, validator: _mail, trigger: 'blur' }],
        resetPwd: [
          { required: true, validator: validatePass, trigger: 'blur' },
          { max: 20, message: '新密码长度在 20 个字符以内' }
        ],
        oldPwd: [
          { required: true, message: '老密码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getMerchantData()
  },
  methods: {
    getMerchantData() {
      checkPersonCenter().then(res => {
        this.modalForm = res.data
        const arys = this.modalForm.roles
        const ary = []
        // console.log(arys.length)
        for (let i = 0; i < arys.length; i++) {
          console.log(arys[i].roleName)
          ary.push(arys[i].roleName)
        }
        this.modalForm.rolesRemark = ary.join()
      })
    },
    onSubmit(modalForm) {
      this.$refs[modalForm].validate((valid) => {
        if (valid) {
          const query = {
            id: this.modalForm.id,
            mobile: this.modalForm.mobile,
            mail: this.modalForm.mail
          }
          this.subLoading = true

          updatePersonCenterData(query).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.subLoading = false
              this.handleCanle()
            }, 1000)
          })
        } else {
          return false
        }
      })
    },
    handleCanle() {
      this.getMerchantData()
    },
    resetPwsClick() {
      this.resetdialogVisible = true
      this.$refs.resetModel.clearValidate()
      this.$nextTick(() => {
        if (this.$refs.resetModel) {
          this.resetModel = {
            resetPwd: '',
            oldPwd: ''
          }
        }
      })
    },
    resetPwsClickBtn(resetModel) {
      this.$refs[resetModel].validate((valid) => {
        if (valid) {
          const query = {
            userId: this.modalForm.id,
            newPwd: md5(this.resetModel.resetPwd).toUpperCase(),
            oldPwd: md5(this.resetModel.oldPwd).toUpperCase()
          }
          resetPWDPersonCenter(query).then(res => {
            this.$message({
              message: res.msg,
              type: 'success'
            })
            setTimeout(() => {
              this.subLoading = false
              this.handleCanle()
            }, 1000)
            this.resetdialogVisible = false
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
