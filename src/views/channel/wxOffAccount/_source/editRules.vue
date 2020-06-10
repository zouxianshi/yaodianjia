<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="40%" :append-to-body="true">
      <el-form :model="paramsForm" label-width="120">
        <el-form-item label="模板编号">123</el-form-item>
        <el-form-item label="模板编号">123</el-form-item>
        <el-form-item label="模板编号" />
        <el-form-item label="模板编号" />
        <el-form-item label="模板编号" />
      </el-form>
      <span slot="footer">
        <el-button size="mini" type="primary" @click="_submitEdit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'EditRules',
  data() {
    return {
      dialogVisible: false,
      paramsForm: {}
    }
  },
  methods: {
    _submitEdit() {
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
</style>
