<template>
  <div class="discount-index-model">
    <div class="content">
      <div class="discount-content-l">
        <mPhoneView />
      </div>
      <div class="discount-content-r">
        <el-steps :active="active" finish-status="success" simple>
          <el-step title="基本信息" />
          <el-step title="使用规则" />
          <el-step title="卡券同步设置" />
        </el-steps>
        <el-button @click="next">123</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import mPhoneView from '../_source/phoneView'
export default {
  name: 'DiscountIndex',
  components: {
    mPhoneView
  },
  data() {
    return {
      active: 0
    }
  },
  methods: {
    next() {
      if (this.active++ > 2) this.active = 0
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .discount-index-model {
    padding: 20px;
    .content{
      display: flex;justify-content: space-between;
      .discount-content-l{
        flex: 0 0 30%;
      }
      .discount-content-r{
        flex: 0 0 70%;padding-left: 24px;
      }
    }
  }
</style>
