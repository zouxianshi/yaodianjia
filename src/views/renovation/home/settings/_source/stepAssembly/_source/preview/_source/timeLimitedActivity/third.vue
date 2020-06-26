<template>
  <div class="sap-tla-third-model">
    <div class="sttm-title-box">
      <span class="sttm-text-1">据活动结束还剩</span>
      <span class="sttm-cd">
        <v-countdown :current-time="1593163904" :start-time="1593163904" :end-time="1601112681" />
      </span>
    </div>
    <div class="sttm-content">
      <m-four :item="item" enter-type="rob" />
    </div>
  </div>
</template>
<script>
import vCountdown from './countdown'
import mFour from './../commodity/four'

export default {
  name: 'SapTlaThird',
  data() {
    return {}
  },
  props: {
    item: {
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
