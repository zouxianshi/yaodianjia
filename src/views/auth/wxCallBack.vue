<template>
  <div class="wx-call-back-model">
    授权成功... 5s后自动关闭弹窗
  </div>
</template>
<script>
export default {
  name: 'WxCallBack',
  components: {},
  props: {},
  data() {
    return {
      randomObj: {
        edit: 'edit_' + new Date().getTime() // 先定义随机ID
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {
  },
  created() {
    window.parent.postMessage({ // 参数是对象
      cmd: '***',
      params: {
        success: true
      }
    }, '*')
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
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .wx-call-back-model {

  }
</style>
