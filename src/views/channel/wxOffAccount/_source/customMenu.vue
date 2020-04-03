<template>
  <div class="custom-menu-model">
    <div class="cmm-view-window">
      <el-card :body-style="{ padding: '0px' }">
        <m-view-window />
      </el-card>
    </div>
    <div class="cmm-menu-settings">
      <el-card>
        <m-menu-settings />
      </el-card>
    </div>
  </div>
</template>
<script>
import mViewWindow from './viewWindow'
import mMenuSettings from './menuSettings'
export default {
  name: 'CustomMenu',
  components: { mViewWindow, mMenuSettings },
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
  beforeDestroy() {
  },
  destroyed() {
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .custom-menu-model {
    height: calc(100vh - 250px);
    overflow-y: scroll;
    padding-left: 320px;
    .cmm-view-window {
      width: 320px;
      position: absolute;
      left: 0;
      top: 0;
    }
    .cmm-menu-settings {
      width: calc(100% - 20px);
      margin-left: 20px;
    }
  }
</style>
