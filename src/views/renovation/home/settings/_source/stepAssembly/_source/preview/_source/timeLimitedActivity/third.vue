<template>
  <div class="sap-tla-third-model">
    <div class="sttm-title-box" :style="commonStyleBackgr">
      <span class="sttm-text-1">
        <span v-if="item.validStatus === 0">距活动开始还剩</span>
        <span v-if="item.validStatus === 1">距活动结束还剩</span>
        <span v-if="item.validStatus === 2">距活动结束还剩</span>
      </span>
      <span class="sttm-cd">
        <template v-if="item.validStatus === 0">
          <v-countdown :current-time="rtTimeStamp(item.currentTime)" :start-time="rtTimeStamp(item.currentTime)" :end-time="rtTimeStamp(item.startTime)" />
        </template>
        <template v-if="item.validStatus === 1">
          <v-countdown :current-time="rtTimeStamp(item.startTime)" :start-time="rtTimeStamp(item.startTime)" :end-time="rtTimeStamp(item.endTime)" />
        </template>
        <template v-if="item.validStatus === 2">
          <v-countdown :current-time="1593678334" :start-time="1593678334" :end-time="1593678334" />
        </template>
      </span>
    </div>
    <div class="sttm-content">
      <template v-if="item.itemList.length">
        <m-four :item="item" enter-type="rob" />
      </template>
      <template v-else>
        <m-four :item="{...item,itemList:[itemParams,itemParams,itemParams,itemParams,itemParams,itemParams]}" enter-type="rob" />
      </template>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { itemParams, mixinsCommonStyle } from './.././../../../default'
import vCountdown from './countdown'
import mFour from './../commodity/four'

export default {
  name: 'SapTlaThird',
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
  components: { vCountdown, mFour }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-tla-third-model {
    .sttm-title-box {
      height: 36px;
      background:#F32525;
      position: relative;
      .sttm-text-1 {
        position: absolute;
        left:10px;
        top: 11px;
        font-size: 14px;
        color: #fff;
      }
      .sttm-cd {
        position: absolute;
        right: 8px;
        top: 9px;
      }
    }
    .sttm-content {
      margin: 8px 0;
    }
  }
</style>
