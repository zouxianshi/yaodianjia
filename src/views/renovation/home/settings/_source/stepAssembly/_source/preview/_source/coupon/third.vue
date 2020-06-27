<template>
  <div class="sap-coupon-third-model">
    <div class="sctm-item-scroll">
      <div class="sctm-item-box" :style="{width:`${140 * item.itemList.length}px`}">
        <template v-for="(el,$index) in item.itemList">
          <m-first-item :key="$index" class="sctm-item" :el="el" size="mini" />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
import mFirstItem from './firstItem'
export default {
  name: 'SapCouponThird',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
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
  computed: {},
  components: { mFirstItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-coupon-third-model {
    .sctm-item-scroll {
      width: 100%;
      overflow-x: scroll;
      .sctm-item-box {
        .sctm-item {
          width: 132px;
          display: inline-block;
          margin-right: 8px;
          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

  }
</style>
