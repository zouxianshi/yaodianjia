<template>
  <div class="announcement-form-item-model">
    <div class="afim-name">
      <el-input size="mini" placeholder="请输入内容" />
    </div>
    <div class="afim-st">
      <el-button size="mini">重新选择</el-button>
      <span class="afim-text-1">已选：商城首页</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AnnouncementFormItem',
  data() {
    return {}
  },
  props: {},
  methods: {},
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
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .announcement-form-item-model {
    .afim-st {
      margin-top: 12px;
      .afim-text-1 {
        font-size: 12px;
        color: #303030;
        margin-left: 12px;
        display: inline-block;
      }
    }
  }
</style>
