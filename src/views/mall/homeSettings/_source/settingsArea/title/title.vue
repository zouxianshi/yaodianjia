<template>
  <div class="sa-title-box">
    <el-form label-width="80px" size="mini">
      <el-form-item label="标题">
        <el-input v-model="name" />
        <div v-if="isName" class="sa-error">
          {{ item.code === 'mall-title' ? '请填写微商城标题' : '请填写标题' }}
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 100%" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'SaTitleBox',
  data() {
    return {
      name: '',
      isName: false
    }
  },
  props: {},
  methods: {
    onSubmit() {}
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
  .sa-title-box {
    padding: 20px;
  }
</style>
