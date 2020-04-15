<template>
  <div class="sa-title-model">
    <el-tabs :value="assemblyName" type="card">
      <el-tab-pane :label="assemblyName" :name="assemblyName">
        <m-title />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mTitle from './title'
export default {
  name: 'SaTitle',
  data() {
    return {
      assemblyName: '标题设置'
    }
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
    this.assemblyName = this.item.code === 'mall-title' ? '微商城名称设置' : '标题设置'
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
  components: { mTitle }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-title-model {

  }
</style>
