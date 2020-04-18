<template>
  <div :class="prefixCls">
    <div v-if="iconClx !== 'no-data'" :class="iconClx" :style="{width:`${size}px`,height:`${size}px`,backgroundSize:'cover'}" />
    <div v-else class="vhi-default" :class="{'no-text':!text}">
      <img class="default-img" src="./img/va_default_icons_no_data.png" :width="size" :height="size">
      <p v-if="text" class="p-test">{{ text }}</p>
    </div>
  </div>
</template>
<script>
const prefixCls = 'v-hs-icons'
export default {
  name: 'HsIcons',
  data() {
    return {}
  },
  props: {
    iconClx: {
      type: String,
      default: 'no-data'
    },
    size: {
      type: Number,
      default: 50
    },
    isCenter: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
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
    prefixCls() {
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-center`]: !!this.isCenter
        }
      ]
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $hs-icons-prefix-cls: "v-hs-icons";

  .#{$hs-icons-prefix-cls} {
    @for $i from 0 through 17 {
      .sa_default_icons_#{$i} {
        background: url('./img/sa_default_icons_#{$i}.png') no-repeat;
        display: block;
      }
    }
    &-center {
      position: relative;
      height: 100%;
      .vhi-default {
        width: 100px;
        height: 80px;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -50px;
        margin-top: -36px;
        text-align: center;
        &.no-text {
          height: 50px;
          margin-top: -25px;
        }
        .default-img {
          margin: 0 auto;
          display: block;
        }
        .p-test {
          color: #bbb;
          font-size: 12px;
        }
      }

    }
  }
</style>
