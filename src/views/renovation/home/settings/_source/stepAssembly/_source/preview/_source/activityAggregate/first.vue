<template>
  <div class="aga-first-model">
    <!--拼团 group 13-->
    <m-together v-if="is('13')" />
    <!--秒杀 amount 12-->
    <m-spike v-if="is('12')" />
    <!--特惠 preference 11-->
    <m-special v-if="is('11')" />
    <!--满减 full 14-->
    <m-full-reduction v-if="is('14')" />
    <!--加价购 add 15-->
    <m-markup v-if="is('15')" />
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
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    is(key) {
      return _.map(_.reject(this.item.selectList, ['selected', false]), v => v.id).includes(key)
    }
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    console.log(this.item)
    console.log('-----this.item')
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
    ...mapState('renovation', ['agaData', 'agaSelectList'])
  },
  components: { mTogether, mSpike, mSpecial, mFullReduction, mMarkup }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .aga-first-model {

  }
</style>
