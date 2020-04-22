<template>
  <div class="c-four-item-model">
    <m-icon-activity v-if="item.activityId" />
    <div class="cfim-photo" :class="{'no-data':!item.img}">
      <img v-if="item.img" :src="`${showImg(item.img)}?x-oss-process=style/w_160`" alt="" width="100" height="100">
      <m-icons v-else :is-center="true" />
    </div>
    <div class="cfim-content">
      <div class="cfim-name">{{ item.name || '-' }}</div>
      <div class="cfim-price">
        <span class="sp1">¥{{ item.price || '0.00' }}</span>
        <span class="sp2">¥{{ item.mprice || '0.00' }}</span>
      </div>
    </div>
    <div class="cfim-cart" />
  </div>
</template>
<script>
import mIcons from './../../_source/icons'
import mIconActivity from '../_source/iconActivity'
export default {
  name: 'CFourItem',
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
  components: { mIconActivity, mIcons }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  // 白色圆角块
  @mixin white-background-radius($radius: 4px,$padding: 8px, $bg: #fff) {
    background: $bg;
    border-radius: $radius;
    padding: $padding;
  }
  .c-four-item-model {
    width: 398px;
    height: 128px;
    margin-bottom: 10px;
    position: relative;
    @include white-background-radius;
    .cfim-photo {
      width: 100px;
      height: 100px;
      position: absolute;
      left: 14px;
      top: 14px;
      &.no-data {
        background: #F0F2F5;
        border-radius: 4px;
      }
    }
    .cfim-content {
      margin-left: 120px;
      margin-top: 6px;
      position: relative;
      height: 100px;
      .cfim-name {
        font-size: 14px;
        line-height: 20px;
      }
      .cfim-price {
        font-size: 14px;
        position: absolute;
        left: 0;
        bottom: 0;
        .sp1 {
          font-size: 16px;
          color: #fb342c;
        }
        .sp2 {
          color: #c3c6cf;
          text-decoration: line-through;
          margin-left: 8px;
        }
      }
    }
    .cfim-cart {
      width: 28px;
      height: 28px;
      background: url('../img/va_icos_cart.png') no-repeat;
      position: absolute;
      right: 12px;
      bottom: 10px;
    }
  }
</style>
