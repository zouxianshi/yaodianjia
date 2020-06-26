<template>
  <div class="sap-advertisement-five-model">
    <div v-if="false" class="safm-banner">
      <m-banner />
    </div>
    <div :style="stylees">
      <m-item-no-data height="120px" :size="50" />
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../itemNoData'
import mBanner from './../banner/banner'
import { globalBinding } from './../../../../mixins'

export default {
  name: 'Five',
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
  components: { mItemNoData, mBanner }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sap-advertisement-five-model {

  }
</style>
