<template>
  <div :class="classes">
    <div class="cfim-item-left">
      <template v-if="(typeof el.ctype === 'undefined')">
        <div class="cfim-labar" />
        <div class="cfim-labar" style="width: 70%" />
        <div class="cfim-labar" style="width: 50%" />
      </template>
      <template v-else>
        <div v-if="el.ctype === 1 || el.ctype === 2" class="cfim-price-box">
          <b v-if="el.ctype === 2">¥</b>
          <span class="cfim-price" style="display: inline-block;margin:0 -4px;">
            {{ truDenomination(`${el.denomination}`) }}
          </span>
          <b v-if="el.ctype === 1">折</b>
        </div>
        <div v-if="el.ctype === 3" class="cfim-price-box">
          <span class="cfim-price" style="display: inline-block;margin:0 -4px;">礼品券</span>
        </div>
        <div class="cfim-text-1">
          <!--<template v-if="el.sceneRule === 1">线上门店可用,</template>
          <template v-if="el.sceneRule === 2">线下门店可用,</template>
          <template v-if="el.sceneRule === 3">线上线下通用,</template>
          <template v-if="el.productRule === 1">所有商品可用,</template>
          <template v-if="el.productRule === 2">部分商品可用,</template>
          <template v-if="el.productRule === 3">部分商品不可用,</template>
          <template v-if="el.shopRule === 1">全部门店可用</template>
          <template v-if="el.shopRule === 2">部分门店可用</template>-->
          {{ truTextTip }}
        </div>
        <div v-if="el.timeRule" class="cfim-text-2">
          <span v-if="el.timeRule === 1">领取后{{ el.effectTime }}天内有效</span>
          <span v-if="el.timeRule === 2">领取{{ el.effectTime.split(',')[0] }}天后生效，生效后{{ el.effectTime.split(',')[1] }}天失效</span>
          <span v-if="el.timeRule === 3">{{ el.effectTime.split(',')[0] }} 到 {{ el.effectTime.split(',')[1] }}</span>
        </div>
        <div v-else class="cfim-text-2">
          有效期：xxxx-xx-xx至xxxx-xx-xx
        </div>
      </template>
    </div>
    <div class="cfim-item-right">
      <div class="cfim-line-1" />
      <div class="cfim-line-2" />
      <div class="cfim-btn-text">
        立即领取
      </div>
    </div>
  </div>
</template>
<script>
/**
   * 设计的大小没一点规律，搞得前端作死的写乱七八糟的样式！！！
   */
const prefixCls = 'vi-coupon-first-item'
export default {
  name: 'CouponFirstItem',
  data() {
    return {}
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    },
    size: {
      type: String,
      default: 'medium'
    }
  },
  methods: {
    truDenomination(v) {
      if (!v || v === 'undefined') {
        return ''
      }
      return _.truncate(v, { 'length': (() => {
        switch (this.size) {
          case 'medium':
            return 4
          case 'small':
            return 4
          case 'mini':
            return 3
        }
      })(),
      'omission': '',
      'separator': /,? +/
      })
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
  computed: {
    truTextTip() {
      const { sceneRule, productRule, shopRule } = this.el
      const sceneRuleText = (() => {
        switch (sceneRule) {
          case 1:
            return '线上门店可用'
          case 2:
            return '线下门店可用'
          case 3:
            return '线上线下通用'
          default:
            return ''
        }
      })()
      const productRuleText = (() => {
        switch (productRule) {
          case 1:
            return '所有商品可用'
          case 2:
            return '部分商品可用'
          case 3:
            return '部分商品不可用'
          default:
            return ''
        }
      })()
      const shopRuleText = (() => {
        switch (shopRule) {
          case 1:
            return '全部门店可用'
          case 2:
            return '部分门店可用'
          default:
            return ''
        }
      })()
      return _.truncate(`${sceneRuleText},${productRuleText},${shopRuleText}`, { 'length': (() => {
        switch (this.size) {
          case 'medium':
            return 22
          case 'small':
            return 12
          case 'mini':
            return 9
        }
      })(), 'omission': '...' })
    },
    classes() {
      const { size } = this
      return [
        `${prefixCls}`,
        `vi-coupon-first-item-${size}`
      ]
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $-prefix-cls: "vi-coupon-first-item";

  .#{$-prefix-cls} {
    overflow: hidden;
    .cfim-item-left,.cfim-item-right {
      float: left;
      height: 120px;
    }
    .cfim-item-left {
      width: calc(100% - 60px);
      background: #F12F2F;
      border-radius:4px 0 0 4px;
      text-align: center;
      position: relative;
      z-index: 1;
      .cfim-price-box {
        color: #fff;
        padding-top: 14px;
        b {
          font-size: 14px;
        }
        .cfim-price {
          font-size: 46px;
        }
      }
      .cfim-text-1 {
        font-size: 13px;
        color: #fff;
        padding: 6px 0 ;
      }
      .cfim-text-2 {
        font-size: 12px;
        color: #FF8887;
      }
    }
    .cfim-item-right {
      width: 60px;
      background: #C72D2D;
      border-radius:0px 4px 4px 0;
      position: relative;
      z-index: 2;
      .cfim-line-1,.cfim-line-2 {
        width: 12px;
        height: 12px;
        background: #FBFBFB;
        border-radius:100%;
        position: absolute;
        left: -6px;
      }
      .cfim-line-1 {
        top:-6px;
      }
      .cfim-line-2 {
        bottom:-6px
      }
      .cfim-btn-text {
        font-size: 16px;
        width: 20px;
        color: #fff;
        margin: 28px auto 0 auto;
        text-align: center;
      }
    }

    .cfim-labar {
      width: 90%;
      margin-top: 14px;
      height: 20px;
      background: #FF8887;
      border-radius: 2px;
      margin-left: 14px;
    }

    &-small {
      height: 70px;
      .cfim-item-left,.cfim-item-right {
        height: 70px;
      }
      .cfim-item-left {
        width: calc(100% - 46px);
        .cfim-price-box {
          padding-top: 8px;
          .cfim-price {
            font-size: 26px;
          }
        }
        .cfim-text-1 {
          font-size: 12px;
          line-height: 17px;
        }
        .cfim-text-2 {
          display: none;
        }
      }
      .cfim-item-right {
        width: 46px;
        .cfim-btn-text {
          width: 32px;
          margin: 22px auto 0 auto;
          font-size: 12px;
          line-height: 14px;
        }
      }
      .cfim-labar {
        margin-top: 6px;
        height: 13px;
        margin-left: 7px;
      }
    }

    &-mini {
      height: 58px;
      .cfim-item-left,.cfim-item-right {
        height: 58px;
      }
      .cfim-item-left {
        width: calc(100% - 40px);
        .cfim-price-box {
          padding-top: 6px;
          .cfim-price {
            font-size: 22px;
          }
        }
        .cfim-text-1 {
          width: 96px;
          font-size: 12px;
          margin-top: -1px;
          line-height: 16px;
        }
        .cfim-text-2 {
          display: none;
        }
      }
      .cfim-item-right {
        width: 40px;
        .cfim-btn-text {
          width: 32px;
          margin: 16px auto 0 auto;
          font-size: 12px;
          line-height: 14px;
        }
      }
      .cfim-labar {
        width: 85%;
        margin-top: 6px;
        height: 11px;
        margin-left: 6px;
      }
    }
  }
</style>
