<template>
  <div :class="classes">
    <div class="mim-img">
      <img v-if="el.picUrl" :src="showImg(el.picUrl)" alt="" style="height: 96px;">
      <m-item-no-data v-else height="96px" :size="50" />
    </div>
    <div class="mim-price">
      <span class="mim-t2">¥{{ el.mprice }}</span>
    </div>
    <div class="mim-btn">
      <el-button type="danger" round size="mini">{{ type ? '立即换购' : '立即加购' }}</el-button>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../../itemNoData'
const prefixCls = 'full-reduction-item-model'

export default {
  name: 'MarkupItem',
  data() {
    return {}
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    },
    isNoData: {
      type: Boolean,
      default: false
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
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-${this.type}`]: !!this.type,
          [`${prefixCls}-no-data`]: this.isNoData
        }
      ]
    }
  },
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $-prefix-cls: "full-reduction-item-model";

  @mixin line-bar($w:80%,$mt:6px) {
    background: #F1F1F1;
    height: 14px;
    width: $w;
    border-radius:2px;
    margin-top: $mt;
  }

  .#{$-prefix-cls} {
    width: 100%;
    background: #fff;
    border-radius: 4px;
    position: relative;
    padding-bottom: 10px;
    .mim-img {
      height: 96px;
    }
    .mim-price {
      padding:8px;
      position: relative;
      .mim-t2 {
        font-size: 13px;
        color: #F32525;
        padding: 0 2px;
      }
    }
    .mim-btn {
      text-align: center;
      .el-button {
        padding:4px 10px;
      }
    }
    &-white {
      background: none;
      .item-no-data-model {
        background: #fff;
      }
    }
    &-no-data {
      .mim-price {
        @include line-bar(80%);
        .mim-t2 {
          display: none;
        }
      }
      .mim-btn {
        @include line-bar(60%);
        .el-button {
          display: none;
        }
      }
    }
  }
</style>
