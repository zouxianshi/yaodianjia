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
          线上微商城，全场通用，金额不限
        </div>
        <div class="cfim-text-2">
          有效期：2020-02-03至2020-03-14
        </div>
      </template>
    </div>
    <div class="cfim-item-right">
      <div class="cfim-line-1" />
      <div class="cfim-line-2" />
      <div class="cfim-btn-text">
        立即领取
      </div>
      <!--<el-tooltip class="item" effect="dark" :content="el.cname" placement="top">
        <div class="cfim-name" :class="el.cname ? 'no' : ''">
          {{ truCname(el.cname) }}
        </div>
      </el-tooltip>
      <div class="cfim-btn">
        <el-button round size="mini">立即领取</el-button>
      </div>-->
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
    },
    truCname(v) {
      if (!v || v === 'undefined') {
        return ''
      }
      return _.truncate(v, { 'length': (() => {
        switch (this.size) {
          case 'medium':
            return 22
          case 'small':
            return 9
          case 'mini':
            return 7
        }
      })(), 'omission': '' })
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
        font-size: 14px;
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
          transform: scale(0.9);
          margin-top: -4px;
          line-height: 14px;
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
          transform: scale(0.8);
          margin-top: -4px;
          line-height: 14px;
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

    /*.cfim-item-left,.cfim-item-right {
      float: left;
    }
    .cfim-item-left {
      background: #C72D2D;
      position: relative;
      border-radius: 2px 0 0 2px;
      text-align: center;
      z-index: 1;
      .cfim-line-1,.cfim-line-2 {
        width: 12px;
        height: 12px;
        background: #FBFBFB;
        border-radius:100%;
        position: absolute;
      }
      .cfim-line-1 {
        top:-6px;
      }
      .cfim-line-2 {
        bottom:-6px
      }
      .cfim-text-num {
        color: #fff;
        .cfim-discount {
          font-size: 12px;
          transform: scale(0.8);
          display: inline-block;
          color: #fff;
        }
      }
      .cfim-type {
        width: 100%;
        background:rgba(255,255,255,1);
        border-radius:2px;
        opacity:0.8;
        font-size: 12px;
        color: #fff;
        -webkit-transform: scale(0.8);
        display: inline-block;
      }
    }
    .cfim-item-right {
      width: calc(100% - 84px);
      border-radius: 0 2px 2px 0;
      background: -moz-linear-gradient(left,  rgba(243,37,37,0.94) 0%, rgba(243,37,37,0.94) 1%, rgba(238,63,63,1) 100%); !* FF3.6-15 *!
      background: -webkit-linear-gradient(left,  rgba(243,37,37,0.94) 0%,rgba(243,37,37,0.94) 1%,rgba(238,63,63,1) 100%); !* Chrome10-25,Safari5.1-6 *!
      background: linear-gradient(to right,  rgba(243,37,37,0.94) 0%,rgba(243,37,37,0.94) 1%,rgba(238,63,63,1) 100%); !* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ *!
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f32525', endColorstr='#ee3f3f',GradientType=1 ); !* IE6-9 *!
      position: relative;
      z-index: 0;
      .cfim-name {
        height: 18px;
        line-height: 18px;
        border-radius:2px;
        background:rgba(255,255,255,.8);
        font-size: 14px;
        color: #fff;
        &.no {
           background: none;
        }
      }
      .cfim-btn {
        position: absolute;
        .el-button {
          border-color: #fff;
          color: #F32525;
        }
      }
    }
    &-medium {
      .cfim-item-left,.cfim-item-right {
        height: 104px;
      }
      .cfim-item-left {
        width: 84px;
        .cfim-line-1,.cfim-line-2 {
          left: 78px;
        }
        .cfim-text-num {
          font-size: 24px;
          margin-top: 26px;
        }
        .cfim-type {
          width: 80%;
          height:15px;
          margin-top: 10px;
          font-size: 14px;
          background: transparent;
        }
      }
      .cfim-item-right {
        .cfim-name {
          margin:12px 0 0 12px;
          width: calc(100% - 22px);
        }
        .cfim-btn {
          right: 10px;
          bottom: 12px;
        }
      }
    }
    &-small {
      .cfim-item-left,.cfim-item-right {
        height: 66px;
      }
      .cfim-item-left {
        width: 45px;
        .cfim-line-1,.cfim-line-2 {
          left: 39px;
        }
        .cfim-text-num {
          font-size: 14px;
          margin-top: 16px;
        }
        .cfim-type {
          height:8px;
          margin-top: 6px;
          font-size: 12px;
        }
      }
      .cfim-item-right {
        width: calc(100% - 45px);
        .cfim-name {
          margin: 8px 0 0 8px;
          width: calc(100% - 16px);
          font-size: 14px;
        }
        .cfim-btn {
          right: 8px;
          bottom: 8px;
          .el-button {
            height: 20px;
            line-height: 20px;
            border-color: #fff;
            color: #F32525;
            padding: 0px 10px;
          }
        }
      }
    }
    &-mini {
      .cfim-item-left,.cfim-item-right {
        height: 54px;
      }
      .cfim-item-left {
        width: 34px;
        .cfim-line-1,.cfim-line-2 {
          left: 28px;
        }
        .cfim-text-num {
          margin-top: 10px;
          font-size: 12px;
        }
        .cfim-type {
          width:36px;
          height:8px;
          margin: 6px 0 0 0;
          font-size: 12px;
        }
      }
      .cfim-item-right {
        width: calc(100% - 34px);
        .cfim-name {
          margin: 6px 0 0 6px;
          width: calc(100% - 12px);
          font-size: 12px;
        }
        .cfim-btn {
          right: 6px;
          bottom: 6px;
          -webkit-transform: scale(0.8);
          .el-button {
            height: 20px;
            line-height: 20px;
            border-color: #fff;
            color: #F32525;
            padding: 0px 6px;
          }
        }
      }
    }*/
  }
</style>
