<template>
  <div class="edit-beans-model">
    <el-dialog :visible.sync="dialogVisible" width="550px" :modal-append-to-body="true" :append-to-body="true" :before-close="closeDia">
      <div slot="title" class="dialog-title">健康豆管理</div>
      <div class="beans-content-body">
        <div class="beans-num">健康豆<span>99</span></div>
        <el-form label-position="right" label-width="120px" :model="beansForm">
          <el-form-item label="增减健康豆：">
            <el-radio v-model="beansForm.addOrD" label="1">增加</el-radio>
            <el-radio v-model="beansForm.addOrD" label="2">删减</el-radio>
          </el-form-item>
          <el-form-item label="">
            <el-input v-model="beansForm.num" style="width: 200px" size="mini" placeholder="请输入数量" />
          </el-form-item>
          <el-form-item label="操作备注">
            <el-input v-model="beansForm.des" style="width: 300px;" type="textarea" autosize />
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
export default {
  data() {
    return {
      dialogVisible: false,
      beansForm: {
        addOrD: '',
        num: '',
        des: ''
      }
    }
  },
  methods: {
    closeDia(done) {
      this.beansForm = {
        addOrD: '',
        num: '',
        des: ''
      }
      done()
    },
    changeDia() {
      this.dialogVisible = true
    },
    // 关闭前清空
    close() {
      this.beansForm = {
        addOrD: '',
        num: '',
        des: ''
      }
      this.dialogVisible = false
    },
    // 提交数据
    _submitData() {
      console.log(this.beansForm)
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
