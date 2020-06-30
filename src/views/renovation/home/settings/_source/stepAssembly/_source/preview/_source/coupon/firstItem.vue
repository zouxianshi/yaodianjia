<template>
  <div :class="classes">
    <div class="cfim-item-left">
      <div class="cfim-line-1" />
      <div class="cfim-line-2" />
      <div class="cfim-text-num">Aa</div>
      <div class="cfim-type" />
    </div>
    <div class="cfim-item-right">
      <div class="cfim-name" :class="el.cname ? 'no' : ''">
        {{ el.cname }}
      </div>
      <div class="cfim-btn">
        <el-button round size="mini">立即领取</el-button>
      </div>
    </div>
  </div>
</template>
<script>
/**
   * 设计的大小没一点规律，搞得前端作死的写乱七八糟的样式，严重谴责设计人员不专业！！！
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
      }
      .cfim-type {
        background:rgba(255,255,255,1);
        border-radius:2px;
        opacity:0.8;
        margin: 0 auto;
      }
    }
    .cfim-item-right {
      width: calc(100% - 84px);
      border-radius: 0 2px 2px 0;
      background: -moz-linear-gradient(left,  rgba(243,37,37,0.94) 0%, rgba(243,37,37,0.94) 1%, rgba(238,63,63,1) 100%); /* FF3.6-15 */
      background: -webkit-linear-gradient(left,  rgba(243,37,37,0.94) 0%,rgba(243,37,37,0.94) 1%,rgba(238,63,63,1) 100%); /* Chrome10-25,Safari5.1-6 */
      background: linear-gradient(to right,  rgba(243,37,37,0.94) 0%,rgba(243,37,37,0.94) 1%,rgba(238,63,63,1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
      filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#f0f32525', endColorstr='#ee3f3f',GradientType=1 ); /* IE6-9 */
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
          font-size: 28px;
          margin-top: 26px;
        }
        .cfim-type {
          width:42px;
          height:15px;
          margin-top: 10px;
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
          font-size: 20px;
          margin-top: 16px;
        }
        .cfim-type {
          width:24px;
          height:8px;
          margin-top: 6px;
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
          font-size: 20px;
          margin-top: 10px;
        }
        .cfim-type {
          width:24px;
          height:8px;
          margin-top: 6px;
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
          .el-button {
            height: 20px;
            line-height: 20px;
            border-color: #fff;
            color: #F32525;
            padding: 0px 6px;
          }
        }
      }
    }
  }
</style>
