
<template>
  <div class="tim-title-bg sap-title-four-model" :style="stylees">
    <strong class="tim-text">热销商品</strong>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
export default {
  name: 'SapTitleFour',
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
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-title-four-model {
    background: url('./img/four_bg.png') no-repeat center;
  }
</style>
