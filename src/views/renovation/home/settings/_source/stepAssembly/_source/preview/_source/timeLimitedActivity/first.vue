<template>
  <div class="sap-tla-first-model">
    <div class="stfm-title-box">
      <span class="stfm-text-1">据活动结束还剩</span>
      <span class="stfm-cd">
        <template v-if="item.startTime">
          <v-countdown :current-time="rtTimeStamp(item.currentTime)" :start-time="rtTimeStamp(item.endTime)" :end-time="rtTimeStamp(item.endTime)" />
        </template>
      </span>
    </div>
    <div class="stfm-content">
      <div class="cfim-no-data">
        <template v-if="item.itemList.length">
          <img v-if="item.itemList[0].img" class="cfim-img" :src="showImg(item.itemList[0].img)" alt="" style="width: 140px;height:140px;margin: 0 auto;display: block;">
          <m-item-no-data v-else height="140px" />
          <div style="padding: 10px 0">
            <m-line-bar margin-top="24px" enter-type="button" :el="item.itemList[0]" />
          </div>
        </template>
        <template v-else>
          <m-item-no-data height="140px" />
          <div style="padding: 10px 0">
            <m-line-bar margin-top="24px" enter-type="button" :el="itemParams" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import vCountdown from './countdown'
import mLineBar from './../../../lineBar'
import mItemNoData from './../../../itemNoData'
import { itemParams } from './.././../../../default'
export default {
  name: 'SapTlaFirst',
  data() {
    return {
      itemParams
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    rtTimeStamp(v) {
      return dayjs(v).valueOf()
    }
  },
  watch: {
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
  components: { mLineBar, mItemNoData, vCountdown }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-tla-first-model {
    position: relative;
    z-index: 1;
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
