<template>
  <div :class="classes">
    <div v-if="item.itemList.length" class="safm-banner">
      <m-banner :item-list="item.itemList" />
    </div>
    <div v-else>
      <m-item-no-data height="120px" :size="50" />
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'
import mBanner from './../banner/banner'

const prefixCls = 'sap-advertisement-five-model'

export default {
  name: 'Five',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    },
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
          [`${prefixCls}-active`]: this.active === 'advertisement_0'
        }
      ]
    }
  },
  components: { mItemNoData, mBanner }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  $-prefix-cls: "sap-advertisement-five-model";

  .#{$-prefix-cls} {

  }
</style>
