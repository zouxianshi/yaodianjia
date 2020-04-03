<template>
  <el-popover v-model="visible" placement="top" popper-class="plx-edit-model">
    <p class="p-input">
      <el-input v-model="input" size="mini" placeholder="请输入内容" style="width: 180px" />
    </p>
    <p class="p-error">请填写正确的内容</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
    </div>
    <el-button slot="reference" type="primary" icon="el-icon-edit-outline" size="mini" circle />
  </el-popover>
</template>
<script>
export default {
  name: 'Edit',
  components: {},
  props: {},
  data() {
    return {
      visible: false,
      input: ''
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
  .plx-edit-model {
    .p-error {
      padding: 6px 0 8px 0;
      font-size: 12px;
      color: #ff0000;
    }
  }
</style>
