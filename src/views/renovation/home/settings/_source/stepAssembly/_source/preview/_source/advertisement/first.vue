<template>
  <div :class="classes">
    <div class="safm-box">
      <div v-if="el.img" class="safm-img-0">
        <img :src="el.img" alt="" style="width:100%;height: 120px;">
      </div>
      <m-item-no-data v-else height="120px" :size="50" />
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'

const prefixCls = 'sap-advertisement-first-model'

export default {
  name: 'First',
  data() {
    return {
      el: {}
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
        this.el = _.cloneDeep(v[0])
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
  $-prefix-cls: "sap-advertisement-first-model";
  .#{$-prefix-cls} {
    &-active {
      border: 1px solid #4F88FF;
      padding: 0 !important;
    }
  }
</style>
