<template>
  <div :class="classes" :style="stylees">
    <div class="safm-box">
      <div v-if="false" class="safm-img-0">
        <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 120px;">
      </div>
      <m-item-no-data height="120px" :size="50" />
    </div>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
import mItemNoData from './../../../itemNoData'

const prefixCls = 'sap-advertisement-first-model'

export default {
  name: 'First',
  data() {
    return {}
  },
  mixins: [globalBinding],
  props: {
    active: {
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
  $-prefix-cls: "sap-advertisement-first-model";
  .#{$-prefix-cls} {
    &-active {
      border: 1px solid #4F88FF;
      padding: 0 !important;
    }
  }
</style>
