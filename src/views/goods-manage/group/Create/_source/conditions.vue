<template>
  <div class="gt-conditions-model">
    <m-subgrouping type="create" level="0">
      <el-button type="primary" size="mini">新建一级分组</el-button>
    </m-subgrouping>
  </div>
</template>
<script>
import mSubgrouping from './subgrouping'
export default {
  name: 'Conditions',
  components: { mSubgrouping },
  props: {},
  data() {
    return {}
  },
  computed: {},
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
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .gt-conditions-model {
    padding-bottom: 16px;
    [type="button"] {
      margin-right: 10px;
    }
  }
</style>
