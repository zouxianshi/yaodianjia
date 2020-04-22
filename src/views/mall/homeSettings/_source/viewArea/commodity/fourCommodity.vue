<template>
  <div class="va-four-commodity-model">
    <m-four-item v-for="(el,i) in item.itemList" :key="i" :item="el" />
  </div>
</template>
<script>
import mFourItem from './fourItem'
export default {
  name: 'VaFourCommodity',
  data() {
    return {
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {},
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
  computed: {},
  components: { mFourItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-four-commodity-model {
    padding: 0 10px;
  }
</style>
