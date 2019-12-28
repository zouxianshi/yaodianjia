<template>
  <div class="app-container">
    <div class="store-goods-wrapper">
      <div class="setting_wrapper">
        <div class="con">
          <div class="title">订单自动确认收货规则</div>
          <div>普通的O2O订单，门店发货48小时后自动确认收货</div>
          <div>对于位置偏远，发快递配送的订单，发货7天后自动确认收货</div>
        </div>
      </div>

      <el-form :model="settingData">
        <div class="setting_item">
          <div class="title">
            待付款订单取消时间设置
          </div>
          <el-form-item label="">
            <div class="con">
              在线支付订单，拍下后
              <el-input v-model="settingData.orderCancelTime" :value="settingData.orderCancelTime" class="width80" placeholder="请输入" size="mini" />
              分钟内未付款，自动取消订单订单优惠券分摊方式设置
            </div>
          </el-form-item>
        </div>

        <!-- <div class="setting_item">
          <div class="title">
            现金购买类型优惠券计入成本设置
          </div>
          <div class="con">
            <el-radio-group v-model="settingData.couponCost">
              <el-radio name="radio_coupon" :label="0">计入优惠券金额</el-radio>
              <el-radio name="radio_coupon" :label="1">不计入优惠券金额</el-radio>
            </el-radio-group>
          </div>
          <div class="note">
            <div>例：顾客花10元购买50元优惠券，下单金额为200元，用该券抵扣后支付150元</div>
            <div>如选择计入优惠券金额，计算该单实际优惠为40元</div>
            <div>如选择不计入优惠券金额，该单将拆分为两条明细，一条为100购买商品，一条为10元购买50元优惠券</div>
          </div>
        </div> -->
      </el-form>

      <div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="handleSaveSetting">保 存</el-button>
        </span>
      </div>

    </div>
  </div>
</template>
<script>
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'
import { getOrderSetUp, updateOrderSetUp } from '@/api/order'
export default {
  mixins: [mixins],
  data() {
    return {
      settingData: {
        // couponCost: 1,
        orderCancelTime: 0
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getOrderSetUp(this.merCode).then(res => {
        if (res.data) {
          this.settingData = res.data
        }
      })
    },
    handleSaveSetting() {
      // console.log('this.settingData.couponCost:', this.settingData.couponCost)
      // if (this.settingData.couponCost === null) {
      //   this.$message({
      //     message: '请完成现金购买类型优惠券是否计入成本的设置',
      //     type: 'error'
      //   })
      // }

      const reg = /[^0-9]/
      if (!this.settingData.orderCancelTime) {
        this.$message({
          message: '请输入数值',
          type: 'error'
        })
        return
      }
      if (this.settingData.orderCancelTime !== '' && reg.test(this.settingData.orderCancelTime)) {
        this.$message({
          message: '请输入非负整数',
          type: 'error'
        })
        return
      }
      if (this.settingData.orderCancelTime > 99999999) {
        this.$message({
          message: '最大值不能超过99999999',
          type: 'error'
        })
        return
      }
      this.settingData.modifyName = this.name

      updateOrderSetUp(this.settingData).then(res => {
        this.$message({
          message: '设置成功',
          type: 'success'
        })
      })
    }

  }
}
</script>
<style lang="scss">
.store-goods-wrapper {
  .search-form {
    .search-item {
      .label-name {
        width: 60px;
      }
      .el-input {
        width: 180px;
      }
    }
  }
  .cascader{
      .el-input{
          width: 300px!important
      }
  }
  .choose-num{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .edit-tip{
    i{
      cursor: pointer;
      &:hover{
        color: #409eff
      }
    }
  }
}

.setting_wrapper{
  width: 100%;
  background:#fff7e8;
  padding:20px 20px 0 20px;
  margin-bottom: 30px;
  overflow: hidden;
  color:#555;
  // color: #faad14;
  .con{
    clear: both;
    vertical-align: middle;
    margin-bottom: 10px;
    line-height: 28px;
    font-size: 14px;
    .title{font-size: 18px;}
  }
}

.setting_item{
  margin-bottom: 30px;
  color: #606266;
  .title{
    border-left:#409eff 2px solid;
    line-height: 18px;
    font-size: 16px;
    padding-left: 10px;
    margin-bottom: 10px;
  }
  .con{
    font-size: 14px;
    padding:10px 0;
    .width80{
      width: 80px;
    }
  }
  .note{
    color:#888;
    margin:20px 0 0 0;
    font-size: 12px;
    line-height: 22px;
  }
}

</style>
