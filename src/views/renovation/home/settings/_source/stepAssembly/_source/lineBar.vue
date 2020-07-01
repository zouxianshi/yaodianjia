<template>
  <div :class="classes">
    <div class="lbm-sp1">
      {{ el.name }}
    </div>
    <div class="lbm-sp2" />
    <div class="lbm-sp3" :style="stylees">
      <span class="lbm-jsymbol">¥{{ el.price || el.mprice }}</span>
    </div>
    <div v-if="enterType === 'icon'" class="lbm-cart" />
    <div v-if="enterType === 'button'" class="lbm-buttom">
      <el-button type="danger" size="mini" round>立即抢购</el-button>
    </div>
    <div v-if="enterType === 'rob'" class="lbm-text">
      <em>抢</em>
    </div>
  </div>
</template>
<script>
const prefixCls = 'line-bar-model'
export default {
  name: 'LineBar',
  data() {
    return {}
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    },
    width: {
      type: String,
      default: '100%'
    },
    marginTop: {
      type: String,
      default: '0px'
    },
    enterType: {
      type: String,
      default: 'icon'
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-is-el`]: !_.isEmpty(this.el.name)
        }
      ]
    },
    stylees() {
      return [
        {
          marginTop: this.marginTop - 8
        }
      ]
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .line-bar-model {
    position: relative;
    height: 82px;
    .lbm-sp1,.lbm-sp2,.lbm-sp3 {
      height: 18px;
      background: #F1F1F1;
      border-radius:2px;
    }
    .lbm-sp1 {
      width: 100%;
      font-size: 14px;
      color: #000;
      line-height: 22px;
    }
    .lbm-sp2 {
      width: 60%;
      margin-top: 8px;
    }
    .lbm-sp3 {
      width: 25%;
      margin-top: 8px;
      .lbm-jsymbol {
        display: none;
        color: #ff0000;
        font-size: 14px;
      }
    }
    .lbm-cart {
      width: 28px;
      height: 28px;
      background: url('./img/icons_cart.png') no-repeat;
      position: absolute;
      right: -4px;
      bottom: -4px;
    }
    .lbm-buttom {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    .lbm-text {
      width: 28px;
      height: 18px;
      position: absolute;
      right: -8px;
      bottom: 0px;
      line-height: 18px;
      background: #F32525;
      border-radius:12px 0 0 12px;
      text-align: center;
      em {
        font-weight: bold;
        font-size: 15px;
        color: #fff;
      }
    }

    &-is-el {
      .lbm-sp1 {
        height: 56px;
      }
      .lbm-sp1,.lbm-sp3 {
        background: transparent;
      }
      .lbm-sp2 {
        display: none;
      }
      .lbm-sp3 {
        .lbm-jsymbol {
          display: block;
        }
      }
    }
  }
</style>
