<template>
  <div class="sap-advertisement-four-model" :style="stylees">
    <div v-if="false" class="safm-img">
      <img src="https://images.ydjia.cn/ydjia-merchant-manager/888888/20200617/8491500185354981adb819e77d0f9521.jpg" alt="" style="width:100%;height: 280px;">
    </div>
    <m-item-no-data height="280px" :size="50" />
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'
import { globalBinding } from './../../../../mixins'
export default {
  name: 'Four',
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
  .sap-advertisement-four-model {

  }
</style>
