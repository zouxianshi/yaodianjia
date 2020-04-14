<template>
  <div class="va-navigation-entry">
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mFirstNavigation from './firstNavigation'
import mSecondNavigation from './secondNavigation'
export default {
  name: 'VaNavigation',
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
  computed: {
    mod() {
      return this.item.type === 'first' ? mFirstNavigation : mSecondNavigation
    }
  },
  components: {}
}
</script>
<style>
  .va-navigation-entry {
  }
</style>
