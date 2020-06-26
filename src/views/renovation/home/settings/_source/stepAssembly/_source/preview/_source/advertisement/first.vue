<template>
  <div class="sap-advertisement-first-model" :style="stylees">
    <div v-if="false" class="safm-img">
      <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 120px;">
    </div>
    <m-item-no-data height="120px" :size="50" />
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
import mItemNoData from './../../../itemNoData'
export default {
  name: 'First',
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
  .sap-advertisement-first-model {

  }
</style>
