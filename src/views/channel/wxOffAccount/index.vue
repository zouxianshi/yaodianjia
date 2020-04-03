<template>
  <div class="wx-off-account-model">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="公众号授权" name="1">
        <m-auth v-if="activeName === '1'" />
      </el-tab-pane>
      <el-tab-pane label="自定义菜单" name="2">
        <m-custom-menu v-if="activeName === '2'" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mAuth from './_source/auth'
import mCustomMenu from './_source/customMenu'
export default {
  name: 'Index',
  components: { mAuth, mCustomMenu },
  props: {},
  data() {
    return {
      activeName: '1'
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
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .wx-off-account-model {
    padding: 20px 0px 10px 20px;
  }
</style>
