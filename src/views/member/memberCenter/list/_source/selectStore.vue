<template>
  <div class="select-store-model">
    <el-dialog title="" :visible.sync="dialogVisible" width="50%" :modal-append-to-body="true" :append-to-body="true" :before-close="closeDia">
      <div slot="title" class="dialog-title">选择门店</div>
      <div class="content-body">
        <div class="choose-left">
          <div class="search">
            <el-input size="mini" style="width:70%" placeholder="请输入" />
            <el-button size="mini" type="text" style="width:28%">查询</el-button>
          </div>
          <div class="selects-content">
            <mSelectRadio :items-arr="shopArr" />
          </div>
        </div>
        <div class="choose-right">
          <div class="tips">已选择名单</div>
          <div class="has-choosed">
            <el-tag type="info" closable size="mini">门店111</el-tag>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">取 消</el-button>
        <el-button size="mini" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mSelectRadio from './selectRadio' // 选择组件
export default {
  components: {
    mSelectRadio
  },
  data() {
    return {
      dialogVisible: false,
      shopArr: ['门店1', '门店2', '门店3']
    }
  },
  methods: {
    closeDia(done) {
      done()
    },
    showDialogVisible() {
      this.dialogVisible = true
    }
  }
}
</script>
<style scoped lang="scss">
.dialog-title{
  font-size: 16px;font-weight: 600;border-bottom: 1px solid #eee;position: relative;
  height: 30px;
}
.content-body{
  display: flex;justify-content: space-between;
  .choose-left{
    flex: 0 0 35%;border-right: 1px solid #979797;
  }
  .choose-right{
    flex: 0 0 55%;
  }
}
</style>
