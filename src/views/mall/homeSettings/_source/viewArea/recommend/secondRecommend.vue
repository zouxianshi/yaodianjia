<template>
  <div class="second-recommend-model">
    <m-four-commodity />
  </div>
</template>
<script>
import mFourCommodity from '../commodity/fourCommodity'
export default {
  name: 'VaSecondRecommend',
  data() {
    return {
      dragList: []
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
  },
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
  components: { mFourCommodity }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .second-recommend-model {

  }
</style>
