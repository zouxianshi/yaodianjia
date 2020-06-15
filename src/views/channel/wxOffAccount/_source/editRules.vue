<template>
  <div>
    <el-dialog :visible.sync="dialogVisible" width="40%" :append-to-body="true">
      <span slot="title">修改模板消息</span>
      <el-form :model="paramsForm" label-width="120" size="mini">
        <el-form-item label="模板编号：">
          <el-input v-model="paramsForm.modelCode" style="width: 60%" disabled />
        </el-form-item>
        <el-form-item label="消息标题：">
          <el-input v-model="paramsForm.modelName" style="width: 60%" disabled />
        </el-form-item>
        <el-form-item label="消息头部：">
          <el-input v-model="paramsForm.modelHead" style="width: 60%" />
        </el-form-item>
        <el-form-item label="消息尾部：">
          <el-input v-model="paramsForm.modelNote" style="width: 60%" />
        </el-form-item>
        <el-form-item label="触发推送：">
          <el-input v-model="paramsForm.modelTime" style="width: 60%" disabled />
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button size="mini" @click="close">取消</el-button>
        <el-button size="mini" type="primary" @click="_submitEdit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setMerchantHN } from '@/api/channelService'
export default {
  name: 'EditRules',
  data() {
    return {
      dialogVisible: false,
      paramsForm: {}
    }
  },
  methods: {
    open(obj = {}) {
      this.paramsForm = obj
      this.dialogVisible = true
    },
    _submitEdit() {
      console.log(this.paramsForm)
      const params = {
        merCode: this.$store.state.user.merCode,
        modelCode: this.paramsForm.modelCode,
        modelHead: this.paramsForm.modelHead,
        modelNote: this.paramsForm.modelNote
      }
      console.log(params)
      setMerchantHN(params).then(res => {
        console.log(res)
        if (res.code === '10000') {
          this.$message({
            message: '修改成功！',
            type: 'success'
          })
          this.$emit('frushData')
          this.dialogVisible = false
        }
      })
    },
    close() {
      this.dialogVisible = false
    }
  }
}
</script>
<style scoped>
</style>
