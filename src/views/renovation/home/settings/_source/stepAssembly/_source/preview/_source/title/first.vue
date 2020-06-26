<template>
  <div class="tim-title-bg sap-title-first-model" :style="stylees">
    <strong class="tim-text">热销商品</strong>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
export default {
  name: 'SapTitleFirst',
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
  .sap-title-first-model {
    background: url('./img/first_bg.png') no-repeat center;
  }
</style>
