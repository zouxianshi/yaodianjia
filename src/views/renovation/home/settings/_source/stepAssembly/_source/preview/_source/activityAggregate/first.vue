<template>
  <div class="aga-first-model">
    <!--加价购 add 15-->
    <m-markup />
    <!--满减 full 14-->
    <m-full-reduction />
    <!--特惠 preference 11-->
    <m-special />
    <!--秒杀 amount 12-->
    <m-spike />
    <!--拼团 group 13-->
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
