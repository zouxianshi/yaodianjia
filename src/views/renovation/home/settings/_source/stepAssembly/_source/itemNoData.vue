<template>
  <div class="item-no-data-model" :style="stylees" :class="prefixCls">
    <img class="indm-img" :style="imgStylees" src="./img/icons_no_data.svg" alt="">
  </div>
</template>
<script>
export default {
  name: 'ItemNoData',
  data() {
    return {}
  },
  props: {
    prefixCls: {
      type: String,
      default: ''
    },
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
  .item-no-data-model {
    background: #F1F1F1;
    position: relative;
    .indm-img {
      position: absolute;
      left: 50%;
      top: 50%;
    }
  }
</style>
