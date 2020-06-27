<template>
  <div class="sap-coupon-second-model">
    <div class="scsm-item-box">
      <el-row :gutter="8">
        <template v-for="(el,$index) in item.itemList">
          <el-col :key="$index" :span="12" class="scsm-item">
            <m-first-item :el="el" size="small" />
          </el-col>
        </template>
      </el-row>
    </div>
  </div>
</template>
<script>
import mFirstItem from './firstItem'
export default {
  name: 'SapCouponSecond',
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
  .sap-coupon-second-model {
    .scsm-item-box {
      overflow: hidden;
    }
  }
</style>
