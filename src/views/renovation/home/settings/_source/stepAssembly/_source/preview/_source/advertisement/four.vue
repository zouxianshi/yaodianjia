<template>
  <div :class="classes">
    <div v-if="itemList[0].img" class="safm-img">
      <img :src="itemList[0].img" alt="" style="width:100%;">
    </div>
    <m-item-no-data v-else height="280px" :size="50" />
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'

const prefixCls = 'sap-advertisement-four-model'

export default {
  name: 'Four',
  data() {
    return {
      itemList: []
    }
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
  watch: {
    'item.itemList': {
      deep: true,
      immediate: true,
      handler(v) {
        this.itemList = _.cloneDeep(v)
      }
    }
  },
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
  $-prefix-cls: "sap-advertisement-four-model";
  .#{$-prefix-cls} {
    &-active {
      border: 1px solid #4F88FF;
      padding: 0 !important;
    }
  }
</style>
