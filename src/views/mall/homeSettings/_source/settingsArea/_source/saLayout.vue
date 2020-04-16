<template>
  <div class="sa-layout-model">
    <el-card class="box-card" shadow="always">
      <div class="slm-exhibition">
        <slot name="exhibition" />
      </div>
    </el-card>
    <div class="slm-list-box">
      <slot name="item" />
    </div>
    <div class="slm-submit">
      <slot name="submit" />
    </div>
  </div>
</template>
<style lang="scss" rel="stylesheet/scss">
  .sa-layout-model {
    .slm-exhibition {
      width: 420px;
      margin: 0 auto;
    }
    .slm-list-box {
      margin-top: 10px;
    }
  }
</style>
