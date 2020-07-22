
<template>
  <div class="app-container tequitySubmit-model">
    <div>
      <img src="@/assets/image/save.png" style="width:120px;height:120px">
    </div>
    <div>{{ successText }}</div>
    <div style="margin-top:50px">
      <el-button @click="$router.go(0);">继续设置</el-button>
      <el-button v-if="back" @click="$router.back(-1);">返回</el-button>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'EquitySubmit',
  components: {},
  props: {
    back: {
      type: Boolean,
      default: false
    },
    successText: {
      type: String,
      default: '提交成功'
    }
  },
  data() {
    return {
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
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.tequitySubmit-model {
  margin-top: 40px;
  text-align: center;
  height: calc(100vh - 250px);
}
</style>
