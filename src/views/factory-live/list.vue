<template>
  <div class="app-cotainer factory-live-list">
    <div class="nav-toop">
      <el-button size="mini" type="primary">
        <i class="el-icon-plus"></i>
        新建直播活动
      </el-button>
    </div>
    <el-tabel :data="liveData">

    </el-tabel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      liveData: {}
    }
  }
}
</script>
<style lang="scss">
.factory-live-list{
  .nav-toop{
    text-align: right;
  }
}
</style>