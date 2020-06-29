<template>
  <div class="operation-basics-model">
    <el-button type="primary" size="small" @click="onNextStep">下一步</el-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { findComponentsDownward } from '@/utils'
export default {
  name: 'Basics',
  data() {
    return {}
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setStepVal']),
    onNextStep() {
      const instance = findComponentsDownward(this.$root, 'StepBasics')[0]
      if (instance.$verification()) {
        console.log(JSON.stringify(this.basics))

        this.setStepVal(2)
      }
    }
  },
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
    ...mapState('renovation', ['basics'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .basics-model {

  }
</style>
