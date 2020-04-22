<template>
  <div class="c-first-item-model">
    <m-icon-activity v-if="item.activityId" />
    <div class="cfim-photo" :class="{'no-data':!item.img}">
      <img v-if="item.img" :src="`${showImg(item.img)}?x-oss-process=style/w_160`" alt="" width="140" height="140">
      <m-icons v-else :is-center="true" />
    </div>

    <p class="cfim-name">{{ item.name || '-' }}</p>
    <p class="cfim-price">
      <span class="p-1">¥{{ item.price || '0.00' }}</span>
      <span class="p-2">¥{{ item.mprice || '0.00' }}</span>
    </p>
    <p class="cfim-cart" />
  </div>
</template>
<script>
import mIcons from './../../_source/icons'
import mIconActivity from '../_source/iconActivity'
export default {
  name: 'CFirstItem',
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
  .c-first-item-model {
    width: 193px;
    height: 259px;
    background: #fff;
    border-radius: 6px;
    float: left;
    position: relative;
    margin: 0 6px 10px 6px;
    &:nth-child(1) {
      margin-left: 10px;
    }
    .cfim-name,.cfim-price {
      padding:0 10px;
    }
    .cfim-photo {
      width: 193px;
      height: 200px;
      &.no-data {
        background: #F0F2F5;
        border-radius: 4px 4px 0 0;
      }
      >img {
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -70px;
        margin-top: -96.5px;
      }
    }
    .cfim-name {
      font-size: 14px;
      color: #333;
    }
    .cfim-price {
      font-size: 14px;
      padding-top: 14px;
      .p-1 {
        color: #fb3f38;
      }
      .p-2 {
        font-size: 12px;
        color: #bdc1ca;
        text-decoration: line-through;
        padding-left: 12px;
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
