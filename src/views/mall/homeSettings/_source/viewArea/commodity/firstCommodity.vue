<template>
  <div class="va-first-commodity-model">
    <template v-for="(el,i) in item.itemList">
      <m-first-item v-if="size > i" :key="i" :item="el" />
    </template>
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
    },
    size: {
      type: Number,
      default: 2
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
