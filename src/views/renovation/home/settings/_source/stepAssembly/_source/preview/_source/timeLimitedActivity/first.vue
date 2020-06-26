<template>
  <div class="sap-tla-first-model">
    <div class="stfm-title-box">
      <span class="stfm-text-1">据活动结束还剩</span>
      <span class="stfm-cd">
        <v-countdown :current-time="1593163904" :start-time="1593163904" :end-time="1601112681" />
      </span>
    </div>
    <div class="stfm-content">
      <div class="cfim-no-data">
        <m-item-no-data height="140px" />
        <div style="padding: 10px">
          <m-line-bar margin-top="24px" enter-type="button" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import vCountdown from './countdown'
import mLineBar from './../../../lineBar'
import mItemNoData from './../../../itemNoData'
export default {
  name: 'SapTlaFirst',
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
  components: { mLineBar, mItemNoData, vCountdown }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-tla-first-model {
    .stfm-title-box {
      height: 36px;
      background:#F32525;
      position: relative;
      .stfm-text-1 {
        position: absolute;
        left:10px;
        top: 11px;
        font-size: 14px;
        color: #fff;
      }
      .stfm-cd {
        position: absolute;
        right: 8px;
        top: 9px;
      }
    }
    .stfm-content {
      margin: 8px;
      background: #fff;
      border-radius: 0px 0px 2px 2px;
    }
  }
</style>
