<template>
  <div class="sa-title-model">
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="标题" name="标题">标题</el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: 'SaTitle',
  data() {
    return {
      activeName: '标题'
    }
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
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-title-model {

  }
</style>
