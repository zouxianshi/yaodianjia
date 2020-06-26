<template>
  <div class="sap-advertisement-third-model" :style="stylees">
    <div class="satm-item-box" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="satm-ads">
        <div v-if="false" class="satm-img">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 57px;">
        </div>
        <m-item-no-data height="57px" />
      </div>
      <div class="satm-ads">
        <div v-if="false" class="sasm-img">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 57px;">
        </div>
        <m-item-no-data height="57px" />
      </div>
    </div>
    <div class="satm-item-box" :style="{width:`calc((100% / 2) - 4px)`}">
      <div class="satm-ads">
        <div v-if="false" class="satm-img">
          <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 57px;">
        </div>
        <m-item-no-data height="57px" />
      </div>
      <div class="satm-ads">
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
  name: 'Third',
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
  computed: {},
  components: { mItemNoData }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-advertisement-third-model {
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
  }
</style>
