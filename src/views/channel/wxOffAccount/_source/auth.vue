<template>
  <div class="auth-model">
    <el-form ref="form" :model="form" label-width="160px">
      <el-form-item label="公众微信号 ">
        millionfor
      </el-form-item>
      <el-form-item label="公众号昵称">
        quanquansy@gmail.com
      </el-form-item>
      <el-form-item label="微信转账类型">
        服务号
      </el-form-item>
      <el-form-item label=" ">
        <el-button type="primary" @click="onAuth">授权</el-button>
      </el-form-item>
    </el-form>
    <br>
    <el-divider content-position="left">药店加商户中心已获得该公众号以下接口权限</el-divider>
    <div>
      <el-tag :type="color()">消息中心权限</el-tag>
      <el-tag :type="color()">消息中心权限</el-tag>
      <el-tag :type="color()">消息中心权限</el-tag>
      <el-tag :type="color()">消息中心权限</el-tag>
      <el-tag :type="color()">消息中心权限</el-tag>
    </div>
    <el-dialog id="completeDialog"	append-to-body title="微信授权" :visible.sync="dialogComplete" width="85%">
      <div id="completeDiv">
        <iframe :src="toPath" height="500" width="100%" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
import _ from 'lodash'
import { jumpAuthUrl } from '@/api/channelService'

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
      // toPath: 'http://localhost:7002/#/auth/auth-call-back'
      toPath: ''
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
  },
  created() {

  },
  beforeMount() {
  },
  mounted() {
    window.addEventListener('message', (eve) => {
      setTimeout(() => {
        this.dialogComplete = false
        console.log('刷新公众号授权接口 回调状态')
      }, 5000)
    })
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  methods: {
    color() {
      return _.sample(['success', 'warning', ''])
    },
    onAuth() {
      // this.dialogComplete = true
      jumpAuthUrl().then(res => {
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
  }
</style>
