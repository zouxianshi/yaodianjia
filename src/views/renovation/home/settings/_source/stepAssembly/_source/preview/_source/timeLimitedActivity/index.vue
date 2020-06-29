<template>
  <div class="tla-index-model">
    <component :is="mod" :item="item" />
  </div>
</template>
<script>
import mFirst from './first'
import mSecond from './second'
import mThird from './third'

export default {
  name: 'TimeLimitedActivityIndex',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
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
  computed: {
    mod() {
      switch (this.item.subType) {
        case 'first':
          return mFirst
        case 'second':
          return mSecond
        case 'third':
          return mThird
      }
    }
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .tla-index-model {
  }
</style>
