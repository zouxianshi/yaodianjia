<template>
  <div class="va-navigation-entry">
    <component :is="mod" v-if="isComponent" :item="item" />
  </div>
</template>
<script>
import mFirstNavigation from './firstNavigation'
import mSecondNavigation from './secondNavigation'
export default {
  name: 'VaNavigation',
  data() {
    return {
      isComponent: false
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
    'item': {
      deep: true,
      immediate: true,
      handler() {
        this.isComponent = false
        setTimeout(() => {
          this.isComponent = true
        })
      }
    }
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
      return this.item.subType === 'first' ? mFirstNavigation : mSecondNavigation
    }
  },
  components: {}
}
</script>
<style>
  .va-navigation-entry {
    min-height: 100px;
    margin-bottom: -10px;
  }
</style>
