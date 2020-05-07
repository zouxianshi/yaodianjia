<template>
  <div class="sa-layout-model">
    <el-card class="box-card" shadow="always" style="background: #f9f9fa">
      <div v-loading="saLoading" class="slm-exhibition">
        <slot name="exhibition" />
      </div>
    </el-card>
    <div v-loading="saLoading" class="slm-list-box">
      <slot name="item" />
    </div>
    <div class="slm-submit">
      <slot name="submit" />
    </div>
  </div>
</template>
<script>

import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState('mall', ['saLoading'])
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
  @import './../../../../../../assets/scss/helpers/mixins';

  .sa-layout-model {
    .box-card {
      border-top: 3px solid #E6EBF5;
    }
    .box-card,.slm-list-box,.slm-submit {
      @include mixinFadeInUp()
    }
    .slm-exhibition {
      width: 420px;
      margin: 0 auto;

    }
    .slm-list-box {
      margin-top: 10px;
    }
  }
</style>
