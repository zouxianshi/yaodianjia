
<template>
  <div class="app-container tequitySubmit-model">
    <div>
      <img src="@/assets/image/save.png" style="width:120px;height:120px">
    </div>
    <div>{{ content }}</div>
    <div style="margin-top:50px">
      <el-button @click="$router.go(0);">继续设置</el-button>
    </div>
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
export default {
  name: 'EquitySubmit',
  components: {},
  props: {
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
}
</style>
