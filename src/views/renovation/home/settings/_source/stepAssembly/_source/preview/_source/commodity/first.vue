<template>
  <div class="sap-commodity-first-model" :style="stylees">
    <div class="scfm-item-box">
      <m-first-item />
    </div>
  </div>
</template>
<script>
import mFirstItem from './firstItem'
import { globalBinding } from './../../../../mixins'
export default {
  name: 'SapCommodityFirst',
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
  components: { mFirstItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-commodity-first-model {

  }
</style>
