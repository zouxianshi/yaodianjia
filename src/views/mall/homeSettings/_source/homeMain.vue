<template>
  <div class="home-main-model">
    <div class="hmm-view-area">
      <m-view-area />
    </div>
    <div class="hmm-settings">
      <m-settings-area />
    </div>
    <div class="clearfix" />
  </div>
</template>
<script>
import mViewArea from './viewArea/viewArea'
import mSettingsArea from './settingsArea/settingsArea'
export default {
  name: 'HomeMain',
  components: { mViewArea, mSettingsArea },
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
  .home-main-model {
    padding: 0 20px 20px 20px;
    .hmm-view-area {
      width: 422px;
      float: left;
      position: relative;
      z-index: 1;
    }
    .hmm-settings {
      float: left;
      margin-left: 20px;
      width: calc(100% - 442px);
    }
  }
</style>
