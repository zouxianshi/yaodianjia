<template>
  <div class="commodity-first-item-model">
    <div class="cfim-img">
      <img v-if="isNoData" src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width: 86px;height: 86px;">
      <m-item-no-data v-else height="86px" />
    </div>
    <div class="cfim-content">
      <div class="cfim-no-data">
        <m-line-bar margin-top="24px" />
      </div>
    </div>
  </div>
</template>
<script>
import mLineBar from './../../../lineBar'
import mItemNoData from './../../../itemNoData'
export default {
  name: 'CommodityFirstItem',
  data() {
    return {
      isNoData: true
    }
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
  components: { mItemNoData, mLineBar }
}
</script>

<style lang="scss" rel="stylesheet/scss">

  $h: 102px;

  .commodity-first-item-model {
    height: $h;
    border-radius: 2px;
    position: relative;
    background: #fff;
    .cfim-img {
      position: absolute;
      left: 8px;
      top: 8px;
      width: 86px;
    }
    .cfim-content {
      padding: 8px 8px 8px 102px;
      height: $h;
    }
  }
</style>
