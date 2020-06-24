<template>
  <div class="custom-model">
    <el-form ref="formModle" :model="formModle" label-width="142px">
      <el-form-item label="背景颜色">
        <span class="cm-color">
          <el-color-picker v-model="color" />
          <span class="cm-color-text">{{ color }}</span>
        </span>
        <span class="cm-text" style="position: relative;top:-6px;">设置当前页面整体背景色，默认#FFFFFF</span>
      </el-form-item>
      <el-form-item label="组件边框">
        <el-select v-model="formModle.name1" placeholder="请选择">
          <el-option v-for="item in option" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <span class="cm-text">此选项为联动选项</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'StepBasicsCustom',
  data() {
    return {
      color: '#ff0000',
      formModle: {
        name: '',
        name1: '选项1'
      },
      option: [{ value: '选项1', label: '黄金糕' }, { value: '选项1', label: '黄金糕' }]
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
  .custom-model {
    .cm-color {
      height: 36px;
      line-height: 36px;
      border: 1px solid #DCDFE6;
      display: inline-block;
      border-radius:4px;
      padding: 0 8px;
      .cm-color-text {
        font-size: 16px;
        color: #303030;
        margin-left: 8px;
        position: relative;
        top: -12px;
      }
      .el-color-picker__trigger {
        border: none;
      }
    }
    .cm-text {
      font-size: 14px;
      color: #9B9B9B;
      margin-left: 20px;
    }
  }
</style>
