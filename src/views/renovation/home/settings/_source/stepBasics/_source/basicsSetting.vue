<template>
  <div class="basics-setting-model">
    <el-form ref="formModle" :model="formModle" label-width="142px">
      <el-form-item label="模板名称">
        <el-input v-model="formModle.name" style="width: 320px;" placeholder="请输入最多不超过12个汉字" />
        <span class="bsm-text">当前模板名称用于辨识此模板</span>
      </el-form-item>
      <el-form-item label="页面标题">
        <el-input v-model="formModle.name1" style="width: 320px;" placeholder="请输入最多不超过12个汉字" />
        <span class="bsm-text">当前页面标题用于页面展示及页面微信分享标题</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'BasicsSetting',
  data() {
    return {
      formModle: {
        name: '',
        name1: ''
      }
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
  .basics-setting-model {
    .bsm-text {
      font-size: 14px;
      color: #9B9B9B;
      margin-left: 20px;
    }
  }
</style>
