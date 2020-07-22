<template>
  <div class="sap-announcement-second-model">
    <div class="sasm-left-bg" />
    <div class="sasm-right-bg" />
    <div class="sasm-box">
      <m-notice text-color="#F32525" :item-list="itemList" :choose-flag="item.chooseFlag" />
    </div>
  </div>
</template>
<script>
import mNotice from './_source/notice'
export default {
  name: 'SapAnnouncementSecond',
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
  .sap-announcement-second-model {
    height: 38px;
    background:rgba(254, 213, 207, 1);
    border-radius: 22px;
    position: relative;
    margin-left: 8px;
    .sasm-left-bg,.sasm-right-bg {
      height: 56px;
      position: absolute;
      z-index: 0;
    }
    .sasm-left-bg {
      width: 97px;
      background: url('./img/second_left_bg.png') no-repeat;
      left: -14px;
      top: -9px;
    }
    .sasm-right-bg {
      width: 244px;
      right: 1px;
      top: -9px;
      background: url('./img/second_right_bg.png') no-repeat;
    }
    .sasm-box {
      position: relative;
      z-index: 1;
      padding-left: 84px;
      padding-top: 12px;
    }
  }
</style>
