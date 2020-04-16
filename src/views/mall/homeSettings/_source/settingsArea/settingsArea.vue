<template>
  <div class="settings-area-model">
    <component :is="mod" :item="{...item,type:'four'}" />
  </div>
</template>
<script>
import mNavigation from './navigation'
import mAdvertise from './advertise'
import mRecommend from './recommend'
import mCommodity from './commodity'
import mTitle from './title'
export default {
  name: 'SettingsArea',
  components: {},
  props: {},
  data() {
    return {
      item: {
        // code:'mall-title',
        code: 'commodity'
      }
    }
  },

  computed: {
    mod() {
      switch (this.item.code) {
        case 'title':
          return mTitle
        case 'mall-title':
          return mTitle
        case 'advertise':
          return mAdvertise
        case 'recommend':
          return mRecommend
        case 'commodity':
          return mCommodity
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
    setSelected(item) {
      $('.hsm-hm').animate({
        scrollTop: 0
      }, 400)
      this.item = item
      this.selected = item.code
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
      padding-left: 100px;
      .el-tabs__item {
        height: 36px;
        line-height: 36px;
      }
    }
  }
</style>
