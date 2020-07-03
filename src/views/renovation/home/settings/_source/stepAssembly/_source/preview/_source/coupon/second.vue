<template>
  <div class="sap-coupon-second-model">
    <div class="scsm-item-box">
      <el-row v-if="item.itemList.length" :gutter="8">
        <template v-for="(el,$index) in item.itemList">
          <el-col :key="$index" :span="12" class="scsm-item">
            <m-first-item :el="el" size="small" />
          </el-col>
        </template>
      </el-row>
      <el-row v-else :gutter="8">
        <template v-for="(el,$index) in 2">
          <el-col :key="$index" :span="12" class="scsm-item">
            <m-first-item :el="itemParams" size="small" />
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>
<script>
import { itemParams } from './.././../../../default'
import mFirstItem from './firstItem'
export default {
  name: 'SapCouponSecond',
  data() {
    return {
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
  .sap-coupon-second-model {
    .scsm-item-box {
      overflow: hidden;
      margin-bottom: -8px;
      .scsm-item {
        margin-bottom: 8px;
      }
    }
  }
</style>
