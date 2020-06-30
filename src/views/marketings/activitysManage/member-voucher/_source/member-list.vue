<template>
  <div class="member-list-modal app-container">
    <el-form label-width="100" label-position="left">
      <el-form-item label="发放对象：">商户会员</el-form-item>
      <el-form-item label="匹配条件：">
        全部会员 <span @click="addCondition"><i class="el-icon-edit" />高级筛选</span>
      </el-form-item>
      <el-form-item label="相关会员：">100人</el-form-item>
    </el-form>
    <el-table :data="tabelData">
      <el-table-column prop="name" label="会员姓名" />
      <el-table-column prop="kahao" label="会员卡号" />
      <el-table-column prop="jifen" label="积分" />
      <el-table-column prop="lkTime" label="领卡时间" />
    </el-table>
    <!-- 选择会员高级筛选弹窗 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabelData: [{
        name: '张三',
        kahao: '123456',
        jifen: '400',
        lkTime: '2010-09-09'
      }],
      dialogVisible: false
    }
  },
  methods: {
    addCondition() {
      console.log(this.tabelData)
      this.dialogVisible = true
    }
  }
}
</script>
