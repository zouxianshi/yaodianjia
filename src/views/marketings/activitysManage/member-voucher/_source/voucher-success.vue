<template>
  <div class="app-container turntable-submitSave-model">
    <div>
      <img src="@/assets/image/save.png" style="width:120px;height:120px">
    </div>
    <div style="font-size:18px;margin:15px 0">操作成功</div>
    <div style="color:#7E8E9E;margin:15px 0">
      优惠券发放中，稍后您可在
      <el-button type="text" @click="$router.push('/activity/member-voucher-list')">发券记录</el-button>
      中查看
    </div>
    <div>{{ content }}<el-button type="text" @click="$router.push('/activity/member-voucher-list')">发券记录</el-button></div>
  </div>
</template>
<script>
export default {
  name: 'SubmitSave',
  components: {},
  props: {
  },
  data() {
    return {
      content: '',
      totalTime: 5, // 记录具体倒计时时间
      clock: '',
      activityTemplateCode: this.$route.query.code
    }
  },
  computed: {
    // ...mapGetters(['merCode'])
  },
  watch: {},
  destroyed() {
    window.clearInterval(this.clock)
  },
  methods: {
    // 倒计时
    countDown() {
      this.content = this.totalTime + 's后跳转至'
      this.clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后跳转至'
        if (this.totalTime < 1) {
          window.clearInterval(this.clock)
          this.toUrl()
        }
      }, 1000)
    },
    toUrl() {
      this.$router.push('/activity/member-voucher-list')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.turntable-submitSave-model {
  margin-top: 40px;
  text-align: center;
}
</style>
