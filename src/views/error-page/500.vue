<template>
  <div class="pic-404 text-center">
    <img class="pic-404__parent" width="390" height="284" src="@/assets/image/error/500.png" alt="500">
    <div class="bullshit">
      <p class="text-center error-tip-txt">啊哦，服务器处理点小状况，工程师正在努力修复中</p>
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
