<template>
  <div class="container">
    <div class="app-container">
      <el-radio-group v-model="tabPosition" style="margin-bottom: 30px;" size="small">
        <el-radio-button :label="0">旗舰店设置</el-radio-button>
        <el-radio-button :label="1">支付设置</el-radio-button>
        <el-radio-button :label="2">快递配置</el-radio-button>
        <el-radio-button :label="3">商家资质</el-radio-button>
      </el-radio-group>
      <m-flagship v-if="tabPosition === 0" />
      <m-pay v-else-if="tabPosition === 1" />
      <m-express v-else-if="tabPosition === 2" />
      <m-merchant-qualification v-else-if="tabPosition === 3" />
      <!--<el-tabs v-model="activeName" type="card" @tab-click="handleClick">
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
      </el-tabs>-->
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
      activeName: 'first',
      tabPosition: 0
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
