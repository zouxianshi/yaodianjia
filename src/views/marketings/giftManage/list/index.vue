<template>
  <div class="list-index-model">
    礼品管理列表
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/gift-manage/discount' })">创建折扣券</el-button>
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/gift-manage/full-reduction' })">创建满减券</el-button>
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/gift-manage/gift' })">创建礼品券</el-button>

  </div>
</template>
<script>
export default {
  name: 'ListIndex',
  components: {},
  props: {},
  data() {
    return {}
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
  methods: {},
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-index-model {

  }
</style>
