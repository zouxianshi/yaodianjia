<template>
  <div class="sap-announcement-first-model">
    <div class="safm-left-bg" />
    <div class="safm-right-bg" />
    <div class="safm-box">
      <m-notice text-color="#3E3E3E" :item-list="itemList" :choose-flag="item.chooseFlag" />
    </div>
  </div>
</template>
<script>
import mNotice from './_source/notice'
export default {
  name: 'SapAnnouncementFirst',
  data() {
    return {
      itemList: []
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  watch: {
    'item.itemList': {
      deep: true,
      immediate: true,
      handler(v) {
        this.itemList = _.cloneDeep(v)
      }
    }
  },
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
  .sap-announcement-first-model {
    height: 38px;
    background:rgba(244,246,247,.7);
    border-radius: 6px;
    position: relative;
    .safm-left-bg,.safm-right-bg {
      width: 86px;
      height: 56px;
      position: absolute;
      z-index: 0;
    }
    .safm-left-bg {
      background: url('./img/first_left_bg.png') no-repeat;
      left: -6px;
      top: -9px;
    }
    .safm-right-bg {
      right: -6px;
      top: -9px;
      background: url('./img/first_right_bg.png') no-repeat;
    }
    .safm-box {
      position: relative;
      z-index: 1;
      padding-left: 64px;
      padding-top: 12px;
    }
  }
</style>
