<template>
  <div v-loading="loading" class="auth-model">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="公众微信号 ">
        {{ authInfo.nickName || '-' }}
      </el-form-item>
      <el-form-item label="第三方平台">
        {{ authInfo.principalName || '-' }}
      </el-form-item>
      <el-form-item label="微信转账类型">
        {{ authInfo.serviceTypeInfo || '-' }}
      </el-form-item>
      <el-form-item v-if="isAuthInfo">
        <!--<el-button v-if="authInfo.isAuth === 1" disabled>已授权</el-button>-->
        <el-button type="primary" @click="onAuth">{{ authInfo.isAuth === 0 ? '去授权' : '重新授权' }}</el-button>
      </el-form-item>
    </el-form>
    <br>
    <el-divider content-position="left">海典健康微商城商户中心已获得该公众号以下接口权限</el-divider>
    <div>
      <el-tag v-for="(item,$index) in authInfo.funcInfo" :key="$index" style="margin-right: 8px" :type="color()">{{ item }}</el-tag>
    </div>
    <el-dialog id="completeDialog" :close-on-click-modal="false" append-to-body title="微信授权" :visible.sync="dialogComplete" width="800">
      <div id="completeDiv" style="margin: -30px -20px -34px -20px;">
        <iframe :src="toPath" height="660" width="100%" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { jumpAuthUrl, checkAuthInfo } from '@/api/channelService'

export default {
  name: 'Auth',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: ''
      },
      dialogComplete: false,
      toPath: '',
      authInfo: {},
      loading: false
    }
  },
  computed: {
    isAuthInfo() {
      return !_.isEmpty(this.authInfo)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    this.getAuthData()
  },
  beforeMount() {
  },
  mounted() {
    // const self = this
    // window.addEventListener('message', function(){
    //   self.dialogComplete = false
    //   self.getAuthData()
    // })
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
    // window.removeEventListener('message', () => {}, false)
  },
  destroyed() {
  },
  methods: {
    getAuthData() {
      this.loading = true
      checkAuthInfo(this.$store.state.user.merCode).then(res => {
        this.authInfo = res.data
        this.loading = false
        this.$emit('on-auth', this.authInfo.isAuth)
      }).catch(() => {
        this.loading = false
      })
    },
    color() {
      return _.sample(['success', 'warning', ''])
    },
    onAuth() {
      // this.dialogComplete = true
      jumpAuthUrl(this.$store.state.user.merCode).then(res => {
        this.toPath = res.data
        setTimeout(() => {
          this.dialogComplete = true
        }, 100)
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .auth-model {
    height: calc(100vh - 250px);
  }
</style>
