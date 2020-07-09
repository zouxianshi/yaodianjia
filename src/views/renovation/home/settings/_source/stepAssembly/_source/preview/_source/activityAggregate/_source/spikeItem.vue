<template>
  <div class="spike-item-model">
    <div class="sim-img">
      <m-item-no-data height="158px" :size="50" />
    </div>
    <div class="sim-name">
      <span>999三九感冒灵颗感999三九感冒灵颗感</span>
    </div>
    <div class="sim-price">
      <span class="sim-t1">秒杀价</span>
      <span class="sim-t2">¥2999</span>
      <span class="sim-t3">立省 ¥29</span>
    </div>
    <div class="sim-qg-num">
      <div class="min-bar"><div class="bar" /></div>
      <div class="min-text-1">已抢购20%</div>
    </div>
    <div class="sim-btn">
      <el-button type="danger" round size="mini">去抢购</el-button>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../../itemNoData'
export default {
  name: 'MarkupItem',
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
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .spike-item-model {
    width: 100%;
    background: #fff;
    border-radius: 4px;
    position: relative;
    padding-bottom: 10px;
    .sim-img {
      height: 158px;
    }
    .sim-name {
      >span {
        padding: 8px 8px 2px 8px;
        display: inline-block;
        font-size: 13px;
        color: #3E3E3E;
        line-height: 18px;
      }
    }
    .sim-price {
      padding:2px 8px;
      position: relative;
      .sim-t1 {
        font-size: 12px;
        color: #3E3E3E;
      }
      .sim-t2 {
        font-size: 13px;
        color: #F32525;
        padding: 0 2px;
      }
      .sim-t3 {
        font-size: 12px;
        color: #C3C3C3;
        position: absolute;
        right: 6px;
        top: 6px;
      }
    }
    .sim-qg-num {
      padding: 12px 8px;
      position: relative;
      .min-bar {
        width: calc(100% - 54px);
        height: 5px;
        background: #F1F1F1;
        border-radius:4px;
        .bar {
          height: 5px;
          width: 30%;
          background: #F32525;
          border-radius:4px;
        }
      }
      .min-text-1 {
        font-size: 12px;
        color: #3E3E3E;
        position: absolute;
        right: 0px;
        top: 8px;
        transform: scale(0.8);
      }
    }
    .sim-btn {
      text-align: center;
      .el-button {
        padding:4px 10px;
      }
    }
  }
</style>
