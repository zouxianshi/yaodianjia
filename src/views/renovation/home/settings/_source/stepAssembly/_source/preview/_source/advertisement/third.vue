<template>
  <div class="sap-advertisement-third-model" :class="classes">
    <div class="satm-item-box" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="satm-ads" @click="active && onSelect({},0)">
        <div v-if="false" class="satm-img-0">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data height="56px" :is-border="active === 'advertisement_0'" />
      </div>
      <div class="satm-ads" @click="active && onSelect({},1)">
        <div v-if="false" class="satm-img-1">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data height="56px" :is-border="active === 'advertisement_1'" />
      </div>
    </div>
    <div class="satm-item-box" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="satm-ads" @click="active && onSelect({},2)">
        <div v-if="false" class="satm-img-2">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data height="56px" :is-border="active === 'advertisement_2'" />
      </div>
      <div class="satm-ads" @click="active && onSelect({},3)">
        <div v-if="false" class="satm-img-3">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 56px;">
        </div>
        <m-item-no-data height="56px" :is-border="active === 'advertisement_3'" />
      </div>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'
const prefixCls = 'sap-advertisement-third-model'

export default {
  name: 'Third',
  data() {
    return {}
  },
  props: {
    active: {
      type: String,
      default: ''
    }
  },
  methods: {
    onSelect(el, i) {
      this.$emit('on-select', { el, i })
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
  $-prefix-cls: "sap-advertisement-third-model";
  .#{$-prefix-cls} {
    overflow: hidden;
    .satm-item-box {
      float: left;
      &:last-child {
        margin-left: 8px;
      }
      .satm-ads {
        &:last-child {
          margin-top: 8px;
        }
      }
    }
    &-active {
      padding: 0 !important;
    }
  }
</style>
