<template>
  <div class="aga-first-model">
    <!--加价购-->
    <m-markup />
    <!--拼团-->
    <m-together />
  </div>
</template>
<script>
import mTogether from './_source/together'
import mMarkup from './_source/markup'
export default {
  name: 'AgaFirst',
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
  components: { mTogether, mMarkup }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .aga-first-model {

  }
</style>
