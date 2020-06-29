<template>
  <div class="sap-coupon-first-model">
    <div v-if="item.itemList.length">
      <template v-for="(el,$index) in item.itemList">
        <m-first-item :key="$index" size="medium" :el="el" />
      </template>
    </div>
    <div v-else>
      <m-first-item size="medium" :el="itemParams" />
    </div>
  </div>
</template>
<script>
import { itemParams } from './.././../../../default'
import mFirstItem from './firstItem'
export default {
  name: 'SapCouponFirst',
  data() {
    return {
      itemList: [],
      itemParams
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
  watch: {
    'item.itemList': {
      deep: true,
      handler(v) {
        this.itemList = v
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
  computed: {},
  components: { mFirstItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-coupon-first-model {
    .vi-coupon-first-item {
      margin-bottom: 8px;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
