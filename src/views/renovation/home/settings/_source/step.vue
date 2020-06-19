<template>
  <div class="step-model">
    <el-steps :active="stepVal" align-center>
      <el-step title="页面设置" icon="el-icon-edit" />
      <el-step title="组件设置" icon="el-icon-upload" />
      <el-step title="保存首页" icon="el-icon-picture" />
    </el-steps>
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

  }
</style>
