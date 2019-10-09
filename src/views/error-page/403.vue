<template>
  <div class="pic-404 text-center" style="margin-top:30px">
    <img class="pic-404__parent" width="390" height="284" src="@/assets/image/error/403.png" alt="403">
    <div class="bullshit">
      <p class="text-center error-tip-txt">抱歉，你无访问此页面的权限</p>
      <el-button type="primary" @click="$router.push('/')"> 返回首页</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
    message() {
      return '站长说你不能进入这个页面...'
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
