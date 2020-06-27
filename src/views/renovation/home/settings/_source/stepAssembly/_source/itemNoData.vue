<template>
  <div :style="stylees" :class="classes">
    <img class="indm-img" :style="imgStylees" src="./img/icons_no_data.svg" alt="">
  </div>
</template>
<script>
const prefixCls = 'item-no-data-model'
export default {
  name: 'ItemNoData',
  data() {
    return {}
  },
  props: {
    size: {
      type: Number,
      default: 30
    },
    height: {
      type: String,
      default: '30px'
    },
    borderRadius: {
      type: String,
      default: '0px'
    },
    isBorder: {
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
          [`${prefixCls}-is-border`]: !!this.isBorder
        }
      ]
    },
    stylees() {
      const { height, borderRadius } = this
      return [
        {
          height: `${height}`,
          borderRadius: `${borderRadius}`
        }
      ]
    },
    imgStylees() {
      const { size } = this
      return [
        {
          width: `${size}px`,
          height: `${size}px`,
          marginLeft: `-${Number(size / 2)}px`,
          marginTop: `-${Number(size / 2)}px`
        }
      ]
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $-prefix-cls: "item-no-data-model";
  .#{$-prefix-cls} {
    background: #F1F1F1;
    position: relative;
    .indm-img {
      position: absolute;
      left: 50%;
      top: 50%;
    }
    &-is-border {
      border: 1px solid #4F88FF;
    }
  }
</style>
