<template>
  <div class="special-item-model">
    <div class="mim-img">
      <img v-if="el.storeSpec.picUrl" :src="showImg(el.storeSpec.picUrl)" alt="" style="height: 158px;">
      <m-item-no-data v-else height="158px" :size="50" />
    </div>
    <div class="mim-name">
      <span>{{ truName(el.storeSpec.name) }}</span>
    </div>
    <div class="mim-price">
      <span class="mim-t1">秒杀价</span>
      <span class="mim-t2">¥{{ el.storeSpec.price }}</span>
      <span class="mim-t3">立省 ¥{{ el.storeSpec.mprice - el.storeSpec.price }}</span>
    </div>
    <div class="mim-btn">
      <el-button type="danger" round size="mini">立即抢购</el-button>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../../itemNoData'
export default {
  name: 'SpecialItem',
  data() {
    return {}
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    truName(v) {
      return _.truncate(v, { 'length': 12, 'omission': '...' })
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
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .special-item-model {
    width: 100%;
    background: #fff;
    border-radius: 4px;
    position: relative;
    padding-bottom: 10px;
    .mim-img {
      height: 158px;
    }
    .mim-name {
      >span {
        padding: 8px 8px 2px 8px;
        display: inline-block;
        font-size: 13px;
        color: #3E3E3E;
        line-height: 18px;
      }
    }
    .mim-price {
      padding:2px 8px;
      position: relative;
      .mim-t1 {
        font-size: 12px;
        color: #3E3E3E;
      }
      .mim-t2 {
        font-size: 13px;
        color: #F32525;
        padding: 0 2px;
      }
      .mim-t3 {
        font-size: 12px;
        color: #C3C3C3;
        position: absolute;
        right: 6px;
        top: 6px;
      }
    }
    .mim-btn {
      text-align: center;
      padding-top: 8px;
      .el-button {
        padding:4px 10px;
      }
    }
  }
</style>
