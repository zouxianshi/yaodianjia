<template>
  <div class="commodity-first-item-model" :style="commonStyleEs">
    <div class="cfim-img">
      <img v-if="el.img" :src="showImg(el.img)" alt="" style="width: 86px;height: 86px;">
      <m-item-no-data v-else height="86px" />
    </div>
    <div class="cfim-content">
      <div class="cfim-no-data">
        <m-line-bar margin-top="24px" :el="el" maxlength="30" />
      </div>
    </div>
  </div>
</template>
<script>
import { mixinsCommonStyle } from './../../../../default'
import mLineBar from './../../../lineBar'
import mItemNoData from './../../../itemNoData'
export default {
  name: 'CommodityFirstItem',
  data() {
    return {
      isNoData: true
    }
  },
  mixins: [mixinsCommonStyle],
  props: {
    el: {
      type: Object,
      default: () => {}
    }
  },
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
  computed: {
  },
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
    box-sizing: content-box;
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
