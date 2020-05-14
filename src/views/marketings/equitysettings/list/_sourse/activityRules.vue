<template>
  <div class="activityRules-model">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="兑换对象">
        积分&nbsp;
        <img src="@/assets/icon/exchange.png" alt style="width:15px;height:15px"> &nbsp;海贝&nbsp;
        <el-tooltip
          class="item"
          effect="dark"
          content="为区别线上线下积分，“海贝”为线上积分名称，不可修改"
          placement="top-start"
        >
          <i class="el-icon-warning-outline" style="color: #409eff;" />
        </el-tooltip>
      </el-form-item>
      <el-form-item label="兑换比例">
        1 ：
        <el-input v-model="form.num" onkeyup="this.value=this.value.replace(/\D/g,'')" style="width:100px" />
      &nbsp;
        <el-tooltip class="item" effect="dark" content="请根据实际情况设置海贝的兑换比例" placement="top-start">
          <i class="el-icon-warning-outline" style="color: #409eff;" />
        </el-tooltip>
      </el-form-item>
      <el-divider />
      <div class="preview">
        <el-form-item label="预览规则">
          1积分&nbsp;
          <img src="@/assets/icon/exchange.png" alt style="width:15px;height:15px"> &nbsp;海贝&nbsp;
        </el-form-item>
      </div>
    </el-form>
    <div style="margin:200px 0px 0px 300px">
      <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ActivityRules',
  props: {},
  data() {
    return {
      form: {
        name: '',
        num: 1
      }
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleChange(val) {
      console.log(val)
    },
    onSubmit() {}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.activityRules-model {
  padding: 20px;
  height: calc(100vh - 250px);
  .preview {
    color: #909399;
  }
  .preview .el-form-item__label {
    color: #909399;
  }
}
</style>
