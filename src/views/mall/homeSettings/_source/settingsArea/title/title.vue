<template>
  <div class="sa-title-box">
    <el-form label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="title" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SaTitleBox',
  data() {
    return {
      title: ''
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
  .sa-title-box {
    padding: 20px;
  }
</style>
