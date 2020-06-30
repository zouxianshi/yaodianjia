<template>
  <div class="sap-announcement-third-model">
    <div class="satm-left-bg" />
    <div class="satm-right-bg" />
    <div class="satm-box">
      <m-notice text-color="#FF8C2F" :item-list="itemList" />
    </div>
  </div>
</template>
<script>
import mNotice from './_source/notice'
export default {
  name: 'SapAnnouncementThird',
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
  .sap-announcement-third-model {
    height: 38px;
    background:rgba(255, 201, 115, 1);
    border-radius: 22px;
    position: relative;
    margin-left: 8px;
    .satm-left-bg,.satm-right-bg {
      height: 56px;
      position: absolute;
      z-index: 0;
    }
    .satm-left-bg {
      width: 98px;
      background: url('./img/third_left_bg.png') no-repeat;
      left: -15px;
      top: -9px;
    }
    .satm-right-bg {
      width: 244px;
      right: 8px;
      top: -9px;
      background: url('./img/third_right_bg.png') no-repeat;
    }
    .satm-box {
      position: relative;
      z-index: 1;
      padding-left: 84px;
      padding-top: 12px;
    }
  }
</style>
