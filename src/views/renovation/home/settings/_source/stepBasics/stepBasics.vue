<template>
  <div class="basics-model">
    <div class="bm-basics-setting">
      <div class="bm-title"><strong>页面基础设置</strong></div>
      <m-basics-setting />
    </div>
    <div class="bm-style-setting">
      <div class="bm-title"><strong>页面风格设置</strong></div>
      <m-style-setting @on-toggle-style="onToggleStyle" />
    </div>
    <div v-if="radio === '3'" class="bm-style-setting">
      <div class="bm-title"><strong>首页分享设置</strong></div>
      <m-share-setting />
    </div>
  </div>
</template>
<script>
import mBasicsSetting from './_source/basicsSetting'
import mStyleSetting from './_source/styleSetting'
import mShareSetting from './_source/shareSetting'
export default {
  name: 'StepBasics',
  data() {
    return {
      radio: '0'
    }
  },
  props: {},
  methods: {
    onToggleStyle(v) {
      this.radio = v
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
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: { mBasicsSetting, mStyleSetting, mShareSetting }
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
    .bm-style-setting {
      margin-top: 40px;
    }
  }
</style>
