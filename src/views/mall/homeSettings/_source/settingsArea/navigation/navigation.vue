<template>
  <div class="sa-navigation-box">
    <m-item v-for="(el,i) in 8" :key="i" />
    <div class="snb-submit">
      <el-button type="primary" style="width: 100%" size="mini">保存</el-button>
    </div>
  </div>
</template>
<script>
import mItem from './item'
export default {
  name: 'SaNavigationBox',
  data() {
    return {}
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
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
  components: { mItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-navigation-box {

  }
</style>
