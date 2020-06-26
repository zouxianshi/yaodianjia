<template>
  <div class="commodity-second-item-model">
    <div class="csim-img">
      <img v-if="isNoData" src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" :style="{width:`100%`,height:imgHeight}">
      <m-item-no-data v-else :height="imgHeight" />
    </div>
    <div class="csim-content">
      <div class="csim-no-data">
        <m-line-bar margin-top="12px" :enter-type="enterType" />
      </div>
    </div>
  </div>
</template>
<script>
import mLineBar from './../../../lineBar'
import mItemNoData from './../../../itemNoData'
export default {
  name: 'SecondItem',
  data() {
    return {
      isNoData: false
    }
  },
  props: {
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
