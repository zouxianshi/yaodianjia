<template>
  <el-card class="activity-card">
    <el-image
      class="image"
      fit="fill"
      :src="item.img"
    />
    <div class="activity-bottom">
      <div class="activity-header">
        <div class="title">{{ item.lable }}</div>
        <el-tooltip class="item" effect="dark" :content="item.desc" placement="top-start">
          <div class="sub-title">{{ item.desc || '' }}</div>
        </el-tooltip>
      </div>
      <div class="action">
        <el-button type="text" class="button">活动列表</el-button>
        <el-divider direction="vertical" />
        <el-button type="text" class="button">新建活动</el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
export default {
  props: {
    item: Object
  }
}
</script>

<style lang="scss">
.activity-card {
  .el-card__body {
    padding: 0;
  }
  .image {
    width: 100%;
    display: block;
    // height: 183px;
  }
  .activity-bottom {
    padding: 14px;
    padding-bottom: 6px;
    .activity-header {
      .title {
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
      }
      .sub-title {
        color: rgba(0, 0, 0, 0.65);
        font-size: 10px;
        line-height: 24px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    // .action {
    //   text-align: right;
    // }
  }
}
</style>
