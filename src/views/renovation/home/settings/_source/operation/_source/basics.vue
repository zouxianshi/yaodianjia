<template>
  <div class="operation-basics-model">
    <el-button type="primary" size="small" @click="isHome ? onNextHomeStep() : onNextDmStep()">下一步</el-button>
    <el-button type="primary" plain size="small" @click="$router.push(`/renovation/home/list`)">返回列表</el-button>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { findComponentsDownward } from '@/utils'
export default {
  name: 'Basics',
  data() {
    return {
      isHome: this.$route.name === 'renovation-home-settings'
    }
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setStepVal']),
    onNextHomeStep() {
      const instance = findComponentsDownward(this.$root, 'StepHomeBasics')[0]
      if (instance.$verification()) {
        if (this.basics.styleType) {
          this.setStepVal(2)
        } else {
          this.$message.error('请选择风格')
        }
      } else {
        this.$message.error('请完善页面设置信息')
      }
    },
    onNextDmStep() {
      const instance = findComponentsDownward(this.$root, 'StepDMBasics')[0]
      if (instance.$verification()) {
        this.setStepVal(2)
      } else {
        this.$message.error('请完善页面设置信息')
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
