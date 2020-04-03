<template>
  <el-popover v-model="visible" placement="top" width="160" popper-class="plx-delete-model">
    <p class="p-text">这是一段内容这是一段内容确定删除吗？</p>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
    </div>
    <el-button slot="reference" type="danger" icon="el-icon-delete" size="mini" circle />
  </el-popover>
</template>
<script>
export default {
  name: 'Delete',
  components: {},
  props: {},
  data() {
    return {
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
  .plx-delete-model {
    .p-text {
      font-size: 12px;
      padding: 4px;
    }
  }
</style>
