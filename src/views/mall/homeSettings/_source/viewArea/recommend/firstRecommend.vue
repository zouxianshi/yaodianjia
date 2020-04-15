<template>
  <div class="first-recommend-model">
    <m-first-commodity />
  </div>
</template>
<script>
import mFirstCommodity from '../commodity/firstCommodity.vue'
export default {
  name: 'VaFirstRecommend',
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
  watch: {

  },
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
  components: { mFirstCommodity }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .first-recommend-model {

  }
</style>
