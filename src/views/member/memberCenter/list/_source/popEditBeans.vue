<template>
  <div class="edit-beans-model">
    <el-dialog :visible.sync="dialogVisible" width="550px" :modal-append-to-body="true" :append-to-body="true" :before-close="closeDia">
      <div slot="title" class="dialog-title">海贝管理</div>
      <div class="beans-content-body">
        <div class="beans-num">海贝<span>{{ beanTotalNum }}</span></div>
        <el-form ref="beansForm" label-position="right" label-width="120px" :rules="rules" :model="beansForm">
          <el-form-item label="增减海贝：">
            <el-radio v-model="addOrD" label="1">增加</el-radio>
            <el-radio v-model="addOrD" label="2">删减</el-radio>
          </el-form-item>
          <el-form-item label="" prop="integral">
            <el-input v-model="beansForm.integral" maxlength="8" style="width: 200px" size="mini" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="请输入数量" />
          </el-form-item>
          <el-form-item label="操作备注">
            <el-input v-model="beansForm.notes" style="width: 300px;" type="textarea" autosize />
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="close()">取 消</el-button>
        <el-button size="mini" @click="_submitData()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { beanManagement, menberBaseInfo } from '@/api/memberService'
export default {
  data() {
    return {
      dialogVisible: false,
      addOrD: '1',
      beanTotalNum: '0',
      beansForm: {
        'integral': '',
        'notes': '',
        'userId': ''
      },
      rules: {
        integral: [
          { required: true, message: '请输入海贝数量', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    closeDia(done) {
      this.beansForm = {
        'integral': '',
        'notes': '',
        'userId': ''
      }
      done()
    },
    changeDia(userId) {
      this.beansForm.userId = userId
      this.dialogVisible = true
      // 先获取海贝总数（海贝详细接口没有返回）
      var params2 = {
        userId: userId,
        merCode: this.$store.state.user.merCode
      }
      menberBaseInfo(params2).then(res => {
        if (res.data && res.data.onlineIntegral) {
          this.beanTotalNum = res.data.onlineIntegral
        } else {
          this.beanTotalNum = 0
        }
      })
    },
    // 关闭前清空
    close() {
      this.beansForm = {
        'integral': '',
        'notes': '',
        'userId': ''
      }
      this.dialogVisible = false
    },
    // 提交数据(修改海贝数据)
    _submitData() {
      var params = JSON.parse(JSON.stringify(this.beansForm))
      if (this.addOrD === '2') {
        params.integral = -params.integral
      }
      this.$refs['beansForm'].validate((valid) => {
        if (valid) {
          beanManagement(params).then(res => {
            if (res.code && res.code === '10000') {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.close()
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>
<style lang="scss">
.dialog-title{
  font-size: 16px;font-weight: 600;border-bottom: 1px solid #eee;position: relative;
  height: 30px;
}
.beans-content-body{
  .beans-num{
    height: 30px;line-height: 30px;text-indent: 4rem;margin-top: 10px;color:rgba(0,0,0,0.65);
    span{
      color: #000;margin-left: 20px;
    }
  }
}
</style>
