<template>
  <div class="va-first-commodity-model">
    <m-first-item v-for="(el,i) in 2" :key="i" />
  </div>
</template>
<script>
import mFirstItem from './firstItem'
export default {
  name: 'VaFirstCommodity',
  data() {
    return {}
  },
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
  .va-first-commodity-model {
    overflow: hidden;
    .c-first-item-model {
      &:nth-child(2n + 1) {
        margin-left: 10px;
      }
    }
  }
</style>
