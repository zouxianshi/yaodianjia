<template>
  <div class="va-four-commodity-model">
    <template v-for="(el,i) in item.itemList">
      <m-four-item :key="i" :item="el" />
    </template>
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
