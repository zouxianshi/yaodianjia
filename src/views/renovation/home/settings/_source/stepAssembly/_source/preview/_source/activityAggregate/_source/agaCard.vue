<template>
  <div class="aga-card-model">
    <div class="acm-title">
      <div :class="`acm-icon acm-icon-${type}`" />
      <div class="acm-time">
        <v-countdown :current-time="rtTimeStamp(startTime)" :start-time="rtTimeStamp(startTime)" :end-time="rtTimeStamp(endTime)" />
      </div>
    </div>
    <div class="acm-content">
      <slot />
    </div>
    <div v-if="type === 'together' || type === 'fullReduction'" class="acm-more">
      <span>查看更多 >></span>
    </div>
  </div>
</template>
<script>
import dayjs from 'dayjs'
import vCountdown from './../../timeLimitedActivity/countdown'
export default {
  name: 'AgaCard',
  data() {
    return {}
  },
  props: {
    type: {
      type: String,
      default: 'together'
    },
    startTime: {
      type: String,
      default: '2021-07-02 16:25:34'
    },
    endTime: {
      type: String,
      default: '2021-07-02 16:25:34'
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
  components: { vCountdown }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .aga-card-model {
    .acm-title {
      position: relative;
      height: 36px;
      background: #F32525;
      .acm-icon {
        width: 88px;
        height: 26px;
        display: inline-block;
        position: absolute;
        left: 8px;
        top: 6px;
        &.acm-icon-together {
          background: url('./../img/title_together.png') no-repeat;
        }
        &.acm-icon-spike {
          background: url('./../img/title_spike.png') no-repeat;
        }
        &.acm-icon-special {
          background: url('./../img/title_special.png') no-repeat;
        }
        &.acm-icon-fullReduction {
          background: url('./../img/title_fullReduction.png') no-repeat;
        }
        &.acm-icon-markup {
          background: url('./../img/title_markup.png') no-repeat;
        }
      }
      .acm-time {
        position: absolute;
        right: 6px;
        top: 9px;
      }
    }
    .acm-more {
      text-align: center;
      color: #808086;
      font-size: 12px;
      padding: 16px 0;
    }
    .acm-content {
      padding: 8px;
    }
  }
</style>
