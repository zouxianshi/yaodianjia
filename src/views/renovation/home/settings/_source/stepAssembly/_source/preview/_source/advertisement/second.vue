<template>
  <div class="sap-advertisement-second-model" :style="stylees">
    <div class="sasm-left" :style="{width:`calc((100% / 2) - 4px)`}">
      <div v-if="false" class="sasm-img">
        <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 120px;">
      </div>
      <m-item-no-data height="120px" :size="50" />
    </div>
    <div class="sasm-right" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="asam-ads">
        <div v-if="false" class="sasm-img">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 57px;">
        </div>
        <m-item-no-data height="57px" />
      </div>
      <div class="asam-ads">
        <div v-if="false" class="sasm-img">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 57px;">
        </div>
        <m-item-no-data height="57px" />
      </div>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'
import { globalBinding } from './../../../../mixins'
export default {
  data() {
    return {}
  },
  mixins: [globalBinding],
  props: {},
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
  },
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-advertisement-second-model {
    overflow: hidden;
    .sasm-left,.sasm-right {
      float: left;
      height: 120px;
    }
    .sasm-left {
      margin-right: 4px;
      background: blue;
    }
    .sasm-right {
      margin-left: 4px;
      .asam-ads{
        &:last-child {
          margin-top: 8px;
        }
      }
    }
  }
</style>
