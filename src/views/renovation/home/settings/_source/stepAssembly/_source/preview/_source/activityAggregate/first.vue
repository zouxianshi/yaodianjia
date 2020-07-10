<template>
  <div class="aga-first-model">
    <!--拼团 group 13-->
    <m-together v-if="agaData.group" />
    <!--秒杀 amount 12-->
    <m-spike v-if="agaData.amount" />
    <!--特惠 preference 11-->
    <m-special v-if="agaData.preference" />
    <!--满减 full 14-->
    <m-full-reduction v-if="agaData.full" />
    <!--加价购 add 15-->
    <m-markup v-if="agaData.add" />
  </div>
</template>
<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('renovation', ['agaData'])
  },
  components: { mTogether, mSpike, mSpecial, mFullReduction, mMarkup }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .aga-first-model {

  }
</style>
