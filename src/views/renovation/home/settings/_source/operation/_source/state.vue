<template>
  <div class="operation-state-model">
    <el-button type="primary" plain size="small" @click="onGoHome">返回列表</el-button>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
  name: 'State',
  data() {
    return {}
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setStepVal']),
    onGoHome() {
      this.$router.push(`/renovation/home/list`)
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
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .state-model {

  }
</style>
