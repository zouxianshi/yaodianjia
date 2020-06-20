<template>
  <div class="step-model">
    <div class="sm-box">
      <el-steps :active="stepVal" align-center>
        <el-step title="页面设置" />
        <el-step title="组件设置" />
        <el-step title="保存首页" />
      </el-steps>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'Step',
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
    ...mapState('renovation', ['stepVal'])
  },
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .step-model {
    height: 90px;
    border-bottom: 1px solid #ddd;
    .sm-box {
      padding-top: 20px;
    }
  }
</style>
