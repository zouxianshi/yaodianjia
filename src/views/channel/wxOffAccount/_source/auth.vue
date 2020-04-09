<template>
  <div v-loading="loading" class="auth-model">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="公众微信号 ">
        {{ authInfo.nickName || '-' }}
      </el-form-item>
      <el-form-item label="公众号昵称">
        {{ authInfo.principalName || '-' }}
      </el-form-item>
      <el-form-item label="微信转账类型">
        {{ authInfo.serviceTypeInfo || '-' }}
      </el-form-item>
      <el-form-item v-if="isAuthInfo">
        <el-button v-if="authInfo.isAuth === 1" disabled>已授权</el-button>
        <el-button v-else type="primary" @click="onAuth">重新授权</el-button>
      </el-form-item>
    </el-form>
    <br>
    <el-divider content-position="left">药店加商户中心已获得该公众号以下接口权限</el-divider>
    <div>
      <el-tag v-for="(item,$index) in authInfo.funcInfo" :key="$index" style="margin-right: 8px" :type="color()">{{ item }}</el-tag>
    </div>
    <el-dialog id="completeDialog" append-to-body title="微信授权" :visible.sync="dialogComplete" width="85%">
      <div id="completeDiv">
        <iframe :src="toPath" height="500" width="100%" />
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
    this.loading = true
    checkAuthInfo(this.$store.state.user.merCode).then(res => {
      this.authInfo = res.data
      this.loading = false
      this.$emit('on-auth', this.authInfo.isAuth)
    }).catch(() => {
      this.loading = false
    })
  },
  beforeMount() {
  },
  mounted() {
    window.addEventListener('message', () => {
      this.dialogComplete = false
    })
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
    window.removeEventListener('message', () => {}, false)
  },
  destroyed() {
  },
  methods: {
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
