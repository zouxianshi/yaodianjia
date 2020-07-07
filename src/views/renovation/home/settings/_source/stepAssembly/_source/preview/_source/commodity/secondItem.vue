<template>
  <div class="commodity-second-item-model" :style="commonStyleEs">
    <div class="csim-img">
      <img v-if="el.img" :src="showImg(el.img)" alt="" :style="{width:`100%`,height:imgHeight}">
      <m-item-no-data v-else :height="imgHeight" />
    </div>
    <div class="csim-content">
      <div class="csim-no-data">
        <m-line-bar margin-top="12px" :enter-type="enterType" :el="el" />
      </div>
    </div>
  </div>
</template>
<script>
import { mixinsCommonStyle } from './../../../../default'
import mLineBar from './../../../lineBar'
import mItemNoData from './../../../itemNoData'
export default {
  name: 'SecondItem',
  data() {
    return {
      isNoData: false
    }
  },
  mixins: [mixinsCommonStyle],
  props: {
    el: {
      type: Object,
      default: () => {}
    },
    imgHeight: {
      type: String,
      default: '130px'
    },
    enterType: {
      type: String,
      default: 'icon'
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
  computed: {},
  components: { mLineBar, mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .commodity-second-item-model {
    background: #fff;
    border-radius: 2px;
    padding: 8px;
    .csim-content {
      margin-top: 8px;
      .csim-no-data {

      }
    }
  }
</style>
