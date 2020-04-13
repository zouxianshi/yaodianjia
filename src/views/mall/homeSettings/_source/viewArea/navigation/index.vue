<template>
  <component :is="mod" :data="data" />
</template>
<script>
import mFirstNavigation from './firstNavigation'
import mSecondNavigation from './secondNavigation'
export default {
  name: 'Index',
  data() {
    return {
      data: []
    }
  },
  props: {
    type: {
      type: String,
      default: 'first'
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
      return this.type === 'first' ? mFirstNavigation : mSecondNavigation
    }
  },
  components: {}
}
</script>
