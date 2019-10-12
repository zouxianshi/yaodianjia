<template>
  <div class="app-container">
    <div class="group-edit-wrapper">
      <el-alert title="温馨提示：点击分类图片位置可维护/修改分类图片；绑定到家分类可将相关到家分类商品自动划分至该店内分类下" type="warning" :closable="false" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
    this.$store
      .dispatch('tagsView/delView', from)
    next()
  },
  created() {

  },
  methods: {

  }
}
</script>
