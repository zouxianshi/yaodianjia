<template>
  <el-popover v-model="visible" placement="top-end" popper-class="plx-to-url-model">
    <div class="to-url-box">
      <el-radio-group v-model="radio">
        <el-radio class="radio-item" :label="3">会员领卡链接</el-radio>
        <el-radio class="radio-item" :label="6">自定义链接 <el-input style="width: 260px;margin-left: 10px" placeholder="请输入内容" size="mini" />
        </el-radio>
      </el-radio-group>
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" plain>跳转网页</el-button>
  </el-popover>
</template>
<script>
export default {
  name: 'ToUrl',
  components: {},
  props: {},
  data() {
    return {
      radio: 3,
      visible: false
    }
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
  .plx-to-url-model {
    .to-url-box {
      padding-top: 8px;
      .radio-item {
        display: block;
        margin-bottom: 10px;
      }
    }
  }
</style>
