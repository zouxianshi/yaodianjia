<template>
  <div class="sa-navigation-box">
    <m-edit-item v-for="(el,i) in 8" :key="i" :is-add="i === 7" />
    <div class="snb-submit">
      <el-button type="primary" style="width: 100%" size="mini">保存导航设置</el-button>
    </div>
  </div>
</template>
<script>
import mEditItem from './editItem'
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
  components: { mEditItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-navigation-box {

  }
</style>
