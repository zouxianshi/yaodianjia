<template>
  <div class="ad-frame-first-model">
    <m-four :item="item" />
  </div>
</template>
<script>
import mFour from './../commodity/four'
export default {
  name: 'AdFrameFirst',
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
  computed: {},
  components: { mFour }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .ad-frame-first-model {

  }
</style>
