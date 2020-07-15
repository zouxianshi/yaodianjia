<template>
  <div class="sap-tla-first-model">
    <div class="stfm-title-box" :style="itemStyleBackgr">
      <span class="stfm-text-1">
        <span v-if="item.validStatus === 0">距活动开始还剩</span>
        <span v-if="item.validStatus === 1">距活动结束还剩</span>
        <span v-if="item.validStatus === 2">距活动结束还剩</span>
      </span>
      <span class="stfm-cd">
        <template v-if="item.validStatus === 0">
          <v-countdown :current-time="rtTimeStamp(item.currentTime)" :start-time="rtTimeStamp(item.currentTime)" :end-time="rtTimeStamp(item.startTime)" />
        </template>
        <template v-if="item.validStatus === 1">
          <v-countdown :current-time="rtTimeStamp(item.startTime)" :start-time="rtTimeStamp(item.startTime)" :end-time="rtTimeStamp(item.endTime)" />
        </template>
        <template v-if="item.validStatus === 2 || !item.startTime">
          <v-countdown :current-time="1593678334" :start-time="1593678334" :end-time="1593678334" />
        </template>
      </span>
    </div>
    <div class="stfm-content">
      <div class="cfim-no-data">
        <template v-if="item.itemList.length">
          <div v-for="(el,$index) in item.itemList" :key="$index">
            <img v-if="el.img" class="cfim-img" :src="showImg(el.img)" alt="" style="width: 140px;height:140px;margin: 0 auto;display: block;">
            <m-item-no-data v-else height="140px" />
            <div style="padding: 10px">
              <m-line-bar margin-top="24px" enter-type="button" :el="el" />
            </div>
            <div v-if="$index < item.itemList.length - 1" style="height:8px;background: #F5F7F8;margin: 0 -8px;" />
          </div>
        </template>
        <template v-else>
          <m-item-no-data height="140px" />
          <div style="padding: 10px">
            <m-line-bar margin-top="24px" enter-type="button" :el="itemParams" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { mapState } from 'vuex'
import vCountdown from './countdown'
import mLineBar from './../../../lineBar'
import mItemNoData from './../../../itemNoData'
import { itemParams, mixinsCommonStyle } from './.././../../../default'
export default {
  name: 'SapTlaFirst',
  data() {
    return {
      itemParams
    }
  },
  mixins: [mixinsCommonStyle],
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
  computed: {
    ...mapState('renovation', ['basics']),
    itemStyleBackgr() {
      return this.basics.styleType === 'custom' ? { background: `${this.item.color}` } : this.commonStyleBackgr
    }
  },
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
