<template>
  <div class="aga-first-model">
    <!--加价购-->
    <m-markup />
    <!--满减-->
    <m-full-reduction />
    <!--特惠-->
    <m-special />
    <!--秒杀-->
    <m-spike />
    <!--拼团-->
    <m-together />
  </div>
</template>
<script>
import mTogether from './_source/together'
import mSpike from './_source/spike'
import mSpecial from './_source/special'
import mFullReduction from './_source/fullReduction'
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
  components: { mTogether, mSpike, mSpecial, mFullReduction, mMarkup }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .aga-first-model {

  }
</style>
