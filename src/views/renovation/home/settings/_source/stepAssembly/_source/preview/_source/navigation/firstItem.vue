<template>
  <div :class="classes">
    <div v-if="el.img" class="sfim-icon">
      <img :src="rtImg()" alt="" style="width: 58px;height: 58px;">
    </div>
    <m-item-no-data v-else border-radius="100%" height="58px" :is-border="active" />
    <div class="sfim-text">
      {{ el.name ? el.name : `导航${index + 1}` }}
    </div>
  </div>
</template>
<script>

import mItemNoData from './../../../itemNoData'

const prefixCls = 'sap-first-item-model'

export default {
  name: 'SapFirstItem',
  data() {
    return {

    }
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    },
    active: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: null
    }
  },
  methods: {
    rtImg() {
      const { img } = this.el
      return img.startsWith('http')
        ? img
        : require(`@/views/mall/homeSettings/_source/_source/img/${img}.png`)
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
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-active`]: !!this.active
        }
      ]
    }
  },
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $w:58px;
  $-prefix-cls: "sap-first-item-model";

  .#{$-prefix-cls} {
    width: $w;
    text-align: center;
    margin: 0 auto 8px auto;
    cursor: pointer;
    .sfim-icon {
      >img {
        display: block;
      }
    }
    .sfim-icon,.sfim-no-data {
      width: $w;
      height: $w;
    }
    .sfim-text {
      font-size: 12px;
      color: #4A4A4A;
      margin-top: 8px;
    }
    &-active {
      .sfim-icon {
        box-shadow: #4F88FF 0px 0px 0px 1px inset;
      }
      .sfim-text {
        color: #4F88FF;
        font-weight: bold;
      }
    }
  }
</style>
