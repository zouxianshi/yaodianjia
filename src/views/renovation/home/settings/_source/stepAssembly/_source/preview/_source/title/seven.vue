
<template>
  <div class="tim-title-bg sap-title-seven-model" :style="stylees">
    <strong class="tim-text">热销商品</strong>
  </div>
</template>
<script>
import { globalBinding } from './../../../../mixins'
export default {
  name: 'SapTitleSeven',
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
  .sap-title-seven-model {
    background: url('./img/seven_bg.png') no-repeat center;
    .tim-text {
      color: #fff;
    }
  }
</style>
