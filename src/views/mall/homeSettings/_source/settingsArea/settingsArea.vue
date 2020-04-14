<template>
  <div class="settings-area-model">
    <component :is="mod" />
  </div>
</template>
<script>
import mNavigation from './navigation'
import mTitle from './title'
export default {
  name: 'SettingsArea',
  components: {},
  props: {},
  data() {
    return {
      selected: 'navigation'
    }
  },
  computed: {
    mod() {
      switch (this.selected) {
        case 'title':
          return mTitle
        default:
          return mNavigation
      }
    }
  },
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
  methods: {
    setSelected(v) {
      console.log(`------ 点击了区域设置 - ${v}`)
      this.selected = v
    }
  },
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .settings-area-model {
    .el-tabs__nav-scroll {
      padding-left: 20px;
      .el-tabs__item {
        height: 36px;
        line-height: 36px;
      }
    }
  }
</style>
