<template>
  <div class="basics-model">
    <div class="bm-basics-setting">
      <div class="bm-title"><strong>页面基础设置</strong></div>
      <m-basics-setting ref="basicsSetting" />
    </div>
    <div class="bm-style-setting">
      <div class="bm-title"><strong>页面风格设置</strong></div>
      <m-style-setting ref="styleSetting" />
    </div>
    <div class="bm-style-setting">
      <div class="bm-title"><strong>首页分享设置</strong></div>
      <m-share-setting ref="shareSetting" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mBasicsSetting from './_source/basicsSetting'
import mStyleSetting from './_source/styleSetting'
import mShareSetting from './_source/shareSetting'
export default {
  name: 'StepHomeBasics',
  data() {
    return {
      isHome: this.$route.name === 'renovation-home-settings',
      basicsModel: {}
    }
  },
  props: {},
  methods: {
    $verification() {
      const { basics, $refs } = this
      const { basicsSetting, styleSetting, shareSetting } = $refs

      if (!basicsSetting.$verification()) {
        return
      }
      if (basics.styleType === 'custom') {
        if (!styleSetting.$verification()) {
          return
        }
      }

      if (!shareSetting.$verification()) {
        return
      }
      return true
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
  computed: {
    ...mapState('renovation', ['basics'])
  },
  components: { mBasicsSetting, mStyleSetting, mShareSetting }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .basics-model {
    padding: 20px;
    .bm-title {
      padding-left: 46px;
      padding-bottom: 20px;
      strong {
        font-size: 16px;
      }
    }
    .bm-style-setting {
      margin-top: 20px;
    }
    .bm-basics-error {
      font-size: 12px;
      color: #ff0000;
    }
  }
</style>
