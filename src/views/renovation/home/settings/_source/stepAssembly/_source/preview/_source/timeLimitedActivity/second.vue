<template>
  <div class="sap-tla-second-model">
    <div class="stsm-title-box">
      <span class="stsm-text-1">据活动结束还剩</span>
      <span class="stsm-cd">
        <template v-if="item.startTime">
          <v-countdown :current-time="rtTimeStamp(itemParams.currentTime)" :start-time="rtTimeStamp(itemParams.endTime)" :end-time="rtTimeStamp(itemParams.endTime)" />
        </template>
      </span>
    </div>
    <div class="stsm-content">
      <el-row :gutter="8">
        <template v-if="item.itemList.length">
          <template v-for="(el,$index) in item.itemList">
            <el-col :key="$index" :span="12" class="stsm-item">
              <m-second-item :el="el" enter-type="rob" />
            </el-col>
          </template>
        </template>
        <template v-else>
          <template v-for="(el,$index) in 2">
            <el-col :key="$index" :span="12" class="stsm-item">
              <m-second-item :el="itemParams" enter-type="rob" />
            </el-col>
          </template>
        </template>
      </el-row>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import { itemParams } from './.././../../../default'
import vCountdown from './countdown'
import mSecondItem from './../commodity/secondItem'
export default {
  name: 'SapTlaSecond',
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
  components: { vCountdown, mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-tla-second-model {
    .stsm-title-box {
      height: 36px;
      background:#F32525;
      position: relative;
      .stsm-text-1 {
        position: absolute;
        left:10px;
        top: 11px;
        font-size: 14px;
        color: #fff;
      }
      .stsm-cd {
        position: absolute;
        right: 8px;
        top: 9px;
      }
    }
    .stsm-content {
      margin: 8px;
      .stsm-item {
        margin-bottom: 8px;
      }
    }
  }
</style>
