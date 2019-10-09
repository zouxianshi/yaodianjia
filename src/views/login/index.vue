<template>
  <div class="login-container">
    <header class="login-header">
      <p>
        <img src="../../assets/image/logo.png" alt="logo">
      </p>
    </header>
    <div class="login-content">
      <span class="bg-logo" />
      <el-card
        style="width:358px;position"
        class="el-cards"
        :body-style="{height:'350px',padding:'0px'}"
      >
        <div class="login-card">
          <ul class="login-tab">
            <!-- <li class="text-center" :class="{'active':codeLogin}" @click="codeLogin=true">
              <span>扫码登录</span>
            </li>-->
            <li class="text-center" :class="{'active':!codeLogin}" @click="codeLogin=false">
              <span>账号密码登录</span>
            </li>
          </ul>
          <div v-if="codeLogin" class="login-code">
            <div class="flex">
              <div class="code text-center">
                <el-image v-if="!is_expire" :src="qrcodeImg" />
                <img v-else src="../../assets/image/login/erweimaguoqi.png">
              </div>
              <span class="app-img" />
            </div>
            <p v-if="is_expire" class="tip text-center">
              <span class="expire">二维码已过期</span>
              <span class @click="handleRefeshCode">请点击刷新</span>
            </p>
          </div>
          <div v-else class="login-form" @keydown.enter="handleLogin('loginForm')">
            <el-form ref="loginForm" :model="loginForm" :rules="rules">
              <el-form-item label prop="account">
                <el-input v-model.trim="loginForm.account" placeholder="请输入用户名" @blur="checkPhone">
                  <i slot="prefix" class="hydee-icon user-icon" style="line-height:36px" />
                </el-input>
              </el-form-item>
              <el-form-item label prop="password">
                <el-input v-model.trim="loginForm.password" type="password" placeholder="请输入密码">
                  <i slot="prefix" class="hydee-icon password-icon" style="line-height:36px" />
                </el-input>
              </el-form-item>
              <!-- <el-form-item label="">
                <el-input placeholder="输入验证码">
                  <i slot="prefix" class="hydee-icon safe-icon " style="line-height:36px" />
                </el-input>
              </el-form-item>-->
            </el-form>
            <el-button
              type="primary"
              size="medium "
              :loading="logingLoading"
              @click="handleLogin('loginForm')"
            >登录</el-button>
          </div>
        </div>
      </el-card>
    </div>
    <footer class="login-footer">
      <!-- <p class="text-center">
        <span class="hydee-icon icon-kefu"></span>
        <span class="hydee-icon icon-qq"></span>
      </p>-->
      <p class="suport text-center">Copyright © 2010-2020 上海海典软件股份有限公司 版权所有 沪ICP备10208754号</p>
    </footer>
  </div>
</template>

<script>
import { checkSignPhone } from '@/api/user'
import md5 from 'js-md5'
// 引入二维码生成插件
import jrQrcode from 'jr-qrcode'
export default {
  name: 'Login',
  data() {
    return {
      qrcodeImg: '',
      loginForm: {
        account: '',
        password: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号用户名', trgger: 'blur' }
        ],
        ppasswordwd: [{ required: true, message: '请输入密码', trgger: 'blur' }]
      },
      code: '',
      codeLogin: false,
      expire_time: 0,
      logingLoading: false,
      is_expire: false // 二维码是否过期
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  created() {
    // this._loadLoginQrCode()
  },
  methods: {
    checkPhone() {
      // 检验账号是否激活
      if (this.loginForm.account) {
        checkSignPhone(this.loginForm.account).then(res => {
          const { data } = res
          if (data && data.userStatus === 0) {
            this.$router.push({
              path: '/check',
              query: { phone: data.mobile }
            })
          }
        })
      }
    },
    // _loadLoginQrCode() {
    //   getLoginQrCode().then(res => {
    //     if (res.result && res.data) {
    //       this.createdCode(res.data)
    //       this.code = res.data
    //       this.Interval = setInterval(() => {
    //         this.expire_time++
    //         if (this.expire_time >= 600) {
    //           this.is_expire = true
    //         }
    //         this.checkAppLogin()
    //       }, 1000)
    //     } else {
    //       this.$message({
    //         message: res.errors,
    //         type: 'error'
    //       })
    //     }
    //   })
    // },
    createdCode(code) {
      // 二维码生成
      this.qrcodeImg = jrQrcode.getQrBase64(`prescriptionLogin:${code}`, {
        padding: 10, // 二维码四边空白（默认为10px）
        width: 140, // 二维码图片宽度（默认为256px）
        height: 140, // 二维码图片高度（默认为256px）
        reverse: false, // 反色二维码，二维码颜色为上层容器的背景颜色
        background: '#ffffff', // 二维码背景颜色（默认白色）
        foreground: '#000000' // 二维码颜色（默认黑色）
      })
    },
    checkAppLogin() {
      this.$store
        .dispatch('user/login', this.code)
        .then(res => {
          clearInterval(this.Interval)
          this.$router.push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
          this.loading = false
        })
        .catch(err => {
          if (err.status === '400' && err.errors.indexOf('key值无效') > -1) {
            location.reload()
          }
          this.loading = false
        })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
    },
    handleRefeshCode() {
      // 刷新二维码
      this.expire_time = 0
      this.is_expire = false
      this._loadLoginQrCode()
    },
    handleLogin(formName) {
      this.logingLoading = true
      const data = {
        account: this.loginForm.account,
        pwd: md5(this.loginForm.password).toUpperCase()
      }
      this.$store
        .dispatch('user/login', data)
        .then(res => {
          this.$router.push('/home')
          this.logingLoading = false
        })
        .catch(err => {
          console.log(err)
          this.logingLoading = false
        })
    }
  }
}
</script>
<style lang="scss">
.login-form {
  .el-input {
    input {
      height: 48px;
      padding-left: 42px;
    }
  }
  .el-button {
    height: 48px;
    width: 100%;
  }
}
@import "../../assets/scss/helpers/_variables.scss";
@import "../../assets/scss/helpers/_mixins.scss";
$login-card-active: #088ce6;
.login-container {
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  .login-header {
    height: 96px;
    box-sizing: border-box;
    padding-left: 210px;
    p {
      line-height: 96px;
    }
    img {
      vertical-align: middle;
      margin-right: 18px;
    }
    .title {
      font-size: 16px;
      color: #fff;
    }
  }
  .login-content {
    position: relative;
    height: 672px;
    background: #147de8;
    .bg-logo {
      margin-left: 176px;
      margin-top: 75px;
      display: inline-block;
      @include bg-logo2(790px, 520px, "../../assets/image/login/bg.png");
    }
    .el-cards {
      position: absolute;
      right: 18%;
      top: 110px;
    }
  }
  .login-card {
    .login-tab {
      display: flex;
      padding-top: 40px;
      li {
        flex: 1;
        cursor: pointer;
        font-size: 18px;
        color: #333;
        padding-bottom: 16px;
        border-bottom: 1px solid #e9e9e9;
      }
      .active {
        color: $login-card-active;
        position: relative;
        border-bottom: 2px solid $login-card-active;
      }
    }
    .login-code {
      padding-top: 32px;
      .tip {
        margin-top: 32px;
        .expire {
          color: #999;
          font-size: 14px;
        }
        span {
          color: #088ce6;
          font-size: 16px;
          display: inline-block;
          &:last-child {
            margin-left: 16px;
            cursor: pointer;
          }
        }
      }
      .flex {
        display: flex;
        justify-content: space-around;
      }
      .code {
        width: 168px;
        height: 168px;
        border: 1px solid #e9e9e9;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .app-img {
        display: inline-block;
        @include bg-logo-one(
          149px,
          171px,
          "../../assets/image/login/shoujizhanshi.png"
        );
      }
    }
    .login-form {
      padding: 32px 22px;
      .hydee-icon {
        position: absolute;
        top: 50%;
        margin-top: -9px;
        left: 12px;
      }
    }
  }
  .login-footer {
    height: 135px;
    line-height: 135px;
    .suport {
      color: #697389;
    }
  }
}
//当屏幕小于1560px时适配
@media screen and (max-width: 1560px) {
  .bg-logo {
    margin-left: 100px !important;
  }
  .el-cards {
    right: 12%!important;
  }
}
</style>
