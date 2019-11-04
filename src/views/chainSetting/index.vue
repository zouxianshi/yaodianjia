<template>
  <div class="container">
    <div class="conditions">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="旗舰店设置" name="first">
          <m-flagship />
        </el-tab-pane>
        <el-tab-pane label="支付设置" name="second">
          <m-pay />
        </el-tab-pane>
        <el-tab-pane label="快递配置" name="third">
          <m-express />
        </el-tab-pane>
        <el-tab-pane label="商家资质" name="fourth">
          <m-merchant-qualification />
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import mFlagship from './flagship'
import mPay from './pay'
import mExpress from './express'
import mMerchantQualification from './merchantQualification'
export default {
  name: 'ChainSetting',
  components: { mFlagship, mPay, mExpress, mMerchantQualification },
  data() {
    return {
      activeName: 'first'
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}
</script>

<style scoped>
  .conditions{
    margin-left: 28px;
    margin-top: 20px;
    margin-right: 28px;
  }
</style>
