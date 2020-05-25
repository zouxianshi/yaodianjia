<template>
  <div class="wx-off-account-model">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="公众号授权" name="1">
        <m-auth v-if="activeName === '1'" @on-auth="_onAuth" />
      </el-tab-pane>
      <el-tab-pane label="自定义菜单" name="2" :disabled="isCustomDis">
        <m-custom-menu v-if="activeName === '2'" />
      </el-tab-pane>
      <el-tab-pane label="模块消息" name="3">
        <mEssage v-if="activeName === '3'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mAuth from './_source/auth'
import mCustomMenu from './_source/customMenu'
import mEssage from './_source/message'

export default {
  name: 'Index',
  components: { mAuth, mCustomMenu, mEssage },
  props: {},
  data() {
    return {
      activeName: '1',
      isCustomDis: true
    }
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
  beforeDestroy() {
  },
  destroyed() {
  },
  methods: {
    _onAuth(is) {
      this.isCustomDis = !is
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .wx-off-account-model {
    padding: 20px 0px 10px 20px;
    .el-tabs__content {
      overflow: inherit;
    }
  }
</style>
