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
        <el-button type="primary">重新授权</el-button>
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
  </div>
</template>
<script>
import _ from 'lodash'
export default {
  name: 'Auth',
  components: {},
  props: {},
  data() {
    return {
      form: {
        name: ''
      }
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
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .auth-model {
  }
</style>
