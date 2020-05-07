<template>
  <div class="app-container turntable-submitSave-model">
    <div>
      <img src="@/assets/image/save.png" style="width:120px;height:120px">
    </div>
    <div style="font-size:18px;margin:15px 0">保存成功</div>
    <div style="color:#7E8E9E;margin:15px 0">活动已保存至活动列表</div>
    <div>{{ content }}</div>
    <div style="margin-top:50px">
      <el-button @click="$router.go(0);">继续创建</el-button>
      <el-button type="primary" plain @click="toUrl()">返回活动列表</el-button>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'SubmitSave',
  components: {},
  props: {},
  data() {
    return {
      content: '',
      totalTime: 5, // 记录具体倒计时时间
      clock: ''
    }
  },
  computed: {
    // ...mapGetters(['merCode'])
  },
  watch: {},
  destroyed() {
    window.clearInterval(this.clock)
  },
  created() {
    this.countDown()
  },
  methods: {
    // 倒计时
    countDown() {
      this.content = this.totalTime + 's后跳转至活动列表'
      this.clock = window.setInterval(() => {
        this.totalTime--
        this.content = this.totalTime + 's后跳转至活动列表'
        if (this.totalTime < 1) {
          window.clearInterval(this.clock)
          this.toUrl()
        }
      }, 1000)
    },
    toUrl() {
      this.$router.push('/marketings/activity-manage/turntable/list?code=TA003&name=大转盘&id=1')
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
