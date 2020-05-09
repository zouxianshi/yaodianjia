<template>
  <div class="va-second-commodity-model">
    <template v-for="(el,i) in item.itemList">
      <m-second-item :key="i" :item="el" />
    </template>
  </div>
</template>
<script>
import mSecondItem from './secondItem'
export default {
  name: 'VaSecondCommodity',
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
  components: { mSecondItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-second-commodity-model {
    overflow: hidden;
    .c-second-item-model {
      &:nth-child(3n + 1) {
        margin-left: 11px;
      }
    }
  }
</style>
