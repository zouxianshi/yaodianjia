<template>
  <div class="sap-announcement-four-model">
    <div class="safm-left-bg" />
    <div class="safm-right-bg" />
    <div class="safm-box">
      <m-notice text-color="#4B61FF" />
    </div>
  </div>
</template>
<script>
import mNotice from './_source/notice'
export default {
  name: 'SapAnnouncementFour',
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
  components: { mNotice }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-announcement-four-model {
    height: 38px;
    background:rgba(96, 165, 255, 1);
    border-radius: 6px;
    position: relative;
    .safm-left-bg,.safm-right-bg {
      width: 86px;
      height: 56px;
      position: absolute;
      z-index: 0;
    }
    .safm-left-bg {
      background: url('./img/four_left_bg.png') no-repeat;
      left: -6px;
      top: -9px;
    }
    .safm-right-bg {
      right: -6px;
      top: -9px;
      background: url('./img/four_right_bg.png') no-repeat;
    }
    .safm-box {
      position: relative;
      z-index: 1;
      padding-left: 84px;
      padding-top: 12px;
    }
  }
</style>
