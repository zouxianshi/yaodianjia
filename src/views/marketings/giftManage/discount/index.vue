<template>
  <div class="discount-index-model">
    <div class="content">
      <div class="discount-content-l">
        <mPhoneView />
      </div>
      <div class="discount-content-r">
        <el-steps :active="active" simple>
          <el-step title="基本信息" />
          <el-step title="使用规则" />
        </el-steps>
        <el-form v-show="active===1" ref="form" :model="discountForm" label-width="100px" size="mini" label-position="left">
          <el-form-item label="优惠券类型：">
            <span>折扣券</span>
          </el-form-item>
          <el-form-item label="优惠券名称：">
            <el-input v-model="discountForm.name" placeholder="请输入优惠券名称" maxlength="10" style="width:300px" />
          </el-form-item>
          <el-form-item label="优惠内容：">
            <el-input v-model="discountForm.detail" style="width:80px" /> 折
            <span class="zkTips">例：若折扣为8折，填8即可</span>
            <p style="margin-top:15px">
              <el-checkbox v-model="discountForm.isSelectMax" />
              最多优惠
              <el-input v-model="discountForm.maxDis" style="width:80px" /> 元
            </p>
          </el-form-item>
          <el-form-item label="退货规则：">
            <el-radio-group v-model="discountForm.returnRules">
              <el-radio label="1">退货退回</el-radio>
              <el-radio label="2">退货后失效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="到期提醒：">
            <el-checkbox v-model="discountForm.isRemember" />
            到期前
            <el-input v-model="discountForm.rememberDay" size="mini" style="width:50px" />
            天微信提醒
          </el-form-item>
          <el-form-item label="使用须知：">
            <el-input
              v-model="discountForm.notice"
              type="textarea"
              style="width:300px"
              rows="5"
              placeholder="请输入使用须知"
            />
          </el-form-item>
        </el-form>
        <el-form v-show="active===2" ref="form2" :model="discountForm" label-width="100px" size="mini" label-position="left">
          <el-form-item label="使用场景：">
            <el-radio-group v-model="discountForm.scenes">
              <el-radio label="0">线上线下通用</el-radio>
              <el-radio label="1">微商城</el-radio>
              <el-radio label="2">线下门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用门槛：">
            <el-radio-group v-model="discountForm.threshold">
              <el-radio label="0">无门槛</el-radio>
              <el-radio label="1">订单满 <el-input v-model="discountForm.thresholdPrice" style="width:50px" /> 元</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用时间：">
            自领取起 <el-input style="width:40px" /> 天有效
            <span class="zkTips">例：若折扣为8折，填8即可</span>
            <p style="margin-top:15px">
              <el-checkbox v-model="discountForm.isSelectMax" />
              最多优惠
              <el-input v-model="discountForm.maxDis" style="width:80px" /> 元
            </p>
          </el-form-item>
          <el-form-item label="适用门店：">
            <el-radio-group v-model="discountForm.store">
              <el-radio label="0">全部门店</el-radio>
              <el-radio label="1">指定门店 <span v-if="discountForm.store==='1'">选择门店</span></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="适用商品：">
            <el-radio-group v-model="discountForm.commodity">
              <el-radio label="0">全部商品</el-radio>
              <el-radio label="1">指定商品可用 <span v-if="discountForm.store==='1'">选择商品</span></el-radio>
              <el-radio label="2">指定商品不可用 <span v-if="discountForm.store==='2'">选择商品</span></el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form>
        <el-button size="mini" type="primary" @click="next">下一步</el-button>
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
      active: 1,
      discountForm: {
        name: '', // 折扣名称
        detail: '', // 优惠内容
        isSelectMax: '', // 是否输入最大优惠
        maxDis: '', // 最大优惠
        returnRules: '0', // 退货规则
        isRemember: '', // 是否提醒
        rememberDay: '',
        notice: '', // 使用须知
        scenes: '', // 使用场景
        threshold: '', // 使用门槛
        thresholdPrice: '', // 门槛金额
        expiration: '', // 使用时间
        store: '', // 适用门店
        commodity: '' // 使用商品
      }
    }
  },
  methods: {
    next() {
      if (this.active++ > 1) this.active = 1
    },
    onSubmit() {
      console.log('submit!')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.discount-index-model {
  padding: 20px;
  height: calc(100vh - 180px);
  overflow: auto;
  .content {
    display: flex;
    height: calc(100vh - 200px);
    .discount-content-l {
      flex: 0 0 24%;
    }
    .discount-content-r {
      flex: 0 0 60%;
      padding-left: 5%;
      .el-steps--simple{
        margin-bottom: 24px;
      }
      .zkTips{
        color: #bbb;margin-left: 24px;
      }
    }
  }
}
</style>
