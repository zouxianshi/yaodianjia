<template>
  <div class="pop-health-detail">
    <el-dialog :visible.sync="dialogVisible" width="50%" :close-on-click-modal="false" :modal-append-to-body="true" :append-to-body="true">
      <div slot="title" class="diagHeader">健康状态详情</div>
      <div class="content-health">
        123
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="dialogVisible = false">关 闭</el-button>
        <el-button type="primary" size="mini" @click="dialogVisible = false">下一条</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    openDetail() {
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
.content-health{
  min-height: 200px;
}
.diagHeader{
  height: 30px;font-size: 16px;
}
</style>
