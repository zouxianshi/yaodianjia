<template>
  <div class="va-first-commodity-model">
    <m-first-item v-for="(el,i) in item.itemList" :key="i" :item="el" />
  </div>
</template>
<script>
import mFirstItem from './firstItem'
export default {
  name: 'VaFirstCommodity',
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
  computed: {},
  components: { mFirstItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-first-commodity-model {
    overflow: hidden;
    .c-first-item-model {
      &:nth-child(2n + 1) {
        margin-left: 10px;
      }
    }
  }
</style>
