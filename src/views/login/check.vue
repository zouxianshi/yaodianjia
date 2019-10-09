<template>
  <div class="check-wrapper">
    <el-steps :active="stepActive" simple>
      <el-step title="短信校验" icon="el-icon-s-comment" />
      <el-step title="设置密码" icon="el-icon-setting" />
      <el-step title="激活成功" icon="el-icon-circle-check" />
    </el-steps>
    <ul class="step-content">
      <li v-show="stepActive===1">
        <p v-if="is_send" class="tips"><i class="el-icon-info" />检验码已发到你的手机，5分钟内输入有效，请勿泄露</p>
        <el-form ref="msgForm" :model="msgForm" label-width="100px">
          <el-form-item label="手机号码">
            <span v-text="phone" />
          </el-form-item>
          <el-form-item label="验证码">
            <el-input v-model.trim="msgForm.imgCode" class="code" placeholder="输入图形验证码" />
            <el-image :src="imgCodeUrl" style="width: 140px; height: 36px;vertical-align: middle" @click="random++">
              <div slot="placeholder" class="image-slot text-center" style="background:#F5F7FA;color:#c0c4cc">
                加载中<span class="dot">...</span>
              </div>
              <div slot="error" class="error-slot text-center" style="background:#F5F7FA;color:#c0c4cc">
                <span>加载失败 <i class="el-icon-refresh-left" style="cursor: pointer" @click="random++" /></span>
              </div>
            </el-image>
          </el-form-item>
          <el-form-item label="短信验证码">
            <el-input v-model.trim="msgForm.msgCode" class="code" placeholder="输入短信验证码" />
            <el-button
              type="info"
              :loading="send_loading"
              :disabled="is_send"
              @click="handleSendMsgCode"
            > <span v-if="send">{{ is_send?`重新发送验证码(${time}s)`:'重新发送验证码' }}</span>
              <span v-else>{{ is_send?`重新发送验证码(${time}s)`:'发送验证码' }}</span>
            </el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" @click="handleNext">下一步</el-button>
          </el-form-item>
        </el-form>
      </li>
      <li v-show="stepActive===2">
        <el-form ref="pasForm" :model="pasForm" status-icon :rules="rules" label-width="100px">
          <el-form-item label="输入密码" prop="password">
            <el-input v-model.trim="pasForm.password" style="width:250px" autocomplete="off" maxlength="20" :type="show1?'text':'password'" placeholder="输入密码">
              <i slot="suffix" class="el-input__icon el-icon-view" @click="show1=!show1" />
            </el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model.trim="pasForm.checkPass" style="width:250px" autocomplete="off" maxlength="20" :type="show2?'text':'password'" placeholder="确认密码">
              <i slot="suffix" class="el-input__icon el-icon-view" @click="show2=!show2" />
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="is_loading" @click="handleSubmit('pasForm')">确认</el-button>
          </el-form-item>
        </el-form>
      </li>
      <li v-show="stepActive===3" class="text-center">
        <p class="success">
          <i class="el-icon-success" />
        </p>
        <p>激活成功，<router-link tag="span" to="/login" style="color:#001ba0;cursor: pointer;">去登陆</router-link></p>
      </li>
    </ul>
  </div>
</template>
<script>
import { sendMsgCode, checkMsgCode, setPassword } from '@/api/user'
import md5 from 'js-md5'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (!/^(?![^a-zA-Z]+$)(?!\D+$).{6,20}/.test(value)) {
          callback(new Error('请设置6-20位数字和字母组成的密码'))
        }
        if (this.pasForm.checkPass !== '') {
          this.$refs.pasForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.pasForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      stepActive: 1,
      random: 0,
      phone: '',
      send_loading: false,
      msgForm: {
        imgCode: '',
        msgCode: ''
      },
      pasForm: {
        password: '',
        checkPass: ''
      },
      show1: false,
      show2: false,
      is_send: false,
      time: 60,
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: 'blur' }
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      },
      is_loading: false,
      send: false
    }
  },
  computed: {
    imgCodeUrl() {
      return `${this.uploadFileURL}/1.0/verification/_createImgCode?${this.random}&mobile=${this.$route.query.phone}`
    }
  },
  created() {
    this.phone = this.$route.query.phone
  },
  methods: {
    handleSendMsgCode() {
      if (!this.msgForm.imgCode) {
        this.$message({
          message: '请输入图形验证码',
          type: 'error'
        })
        return
      }
      this.send_loading = true
      sendMsgCode({ code: this.msgForm.imgCode, mobile: this.phone }).then(res => {
        this.$message({
          message: '短信校验已发至您的手机',
          type: 'success'
        })
        this.interval = setInterval(() => {
          this.send_loading = false
          this.send = true
          this.is_send = true
          if (this.time === 0) {
            clearInterval(this.interval)
            this.time = 60
            this.is_send = false
          } else {
            this.time--
          }
        }, 1000)
      }).catch(err => {
        this.send_loading = false
        console.log(err)
      })
    },
    handleNext() { // 下一步校验
      checkMsgCode({ code: this.msgForm.msgCode, mobile: this.phone }).then(res => {
        this.stepActive = 2
      }).catch(err => {
        console.log(err)
      })
    },
    handleSubmit(formName) { // 设置密码并激活
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.is_loading = true
          const data = {
            code: this.msgForm.msgCode,
            mobile: this.phone,
            password: md5(this.pasForm.checkPass).toUpperCase()
          }
          setPassword(data).then(res => {
            this.stepActive = 3
            this.is_loading = false
          }).catch(err => {
            console.log(err)
            this.is_loading = false
          })
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
$color:#147de8;
.check-wrapper{
    position: absolute;
    left: 50%;
    margin-left: -300px;
    right:0;
    top:50%;
    bottom: 0;
    width:600px;
    height: 300px;
    margin-top: -150px;
    .step-content{
        margin-top: 20px;
        .tips{
            font-size: 14px;
            color: #333;
            i{
                color: $color;
                margin-right: 10px;
                display: inline-block;
            }
        }
        .el-form{
            margin-top: 10px;
            .code{
                width: 200px
            }
        }
    }
    .success{
        font-size: 60px;
        color: #147de8;
        margin-bottom: 30px;
    }
}
</style>
