<template>
  <div class="basics-model">
    <div class="bm-basics-setting">
      <div class="bm-title"><string>页面基础设置</string></div>
      <m-basics-setting />
    </div>
    <div class="bm-style-setting">
      <div class="bm-title"><string>页面风格设置</string></div>
      <m-style-setting />
    </div>
  </div>
</template>
<script>
import mBasicsSetting from './_source/basicsSetting'
import mStyleSetting from './_source/styleSetting'
export default {
  name: 'Basics',
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
  components: { mBasicsSetting, mStyleSetting }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .basics-model {
    padding: 20px;
    .bm-title {
      padding-left: 140px;
      padding-bottom: 20px;
      strong {
        font-size: 16px;
      }
    }
  }
</style>
