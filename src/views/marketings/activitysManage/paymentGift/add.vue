<template>
  <div class="add">
    <div class="payment-gift-info">
      <h4>活动信息</h4>
      <el-form ref="form" :rules="rules" :model="form" label-width="120px">
        <el-form-item label="活动名称：" prop="name">
          <el-input v-model="form.name" maxlength="30" placeholder="请输入活动名称" clearable />
        </el-form-item>
        <el-form-item label="活动时间：" prop="huodongshijian">
          <el-date-picker
            v-model="form.huodongshijian"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>

        <el-form-item label="活动说明：" prop="desc">
          <el-input
            v-model="form.desc"
            type="textarea"
            maxlength="200"
            placeholder="请输入活动说明"
            clearable
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="payment-gift-rules">
      <h4>活动规则</h4>
      <el-form ref="form" label-width="100px" class="demo-form-inline" :rules="rules" :model="form">
        <el-form-item label="活动范围：">
          <el-radio-group v-model="form.range">
            <el-radio label="0">线上商城</el-radio>
            <el-radio label="1">线下门店</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="活动门店：" prop="store">
          <el-radio-group v-model="form.store">
            <el-radio label="0">全部门店</el-radio>
            <el-radio label="1">
              指定门店
              <span v-if="form.store==='1'" @click="selectStore">选择门店</span>
            </el-radio>
          </el-radio-group>
          <mSelectedStore v-show="form.store==='1'&&selectedStores.length>0" ref="selectedStoreView" @onDel="onGetSelectStore" />
        </el-form-item>
        <el-form-item label="适用商品：" prop="commodity">
          <el-radio-group v-model="form.commodity">
            <el-radio label="0">全部商品</el-radio>
            <el-radio label="1">
              指定商品
              <span v-if="form.commodity==='1'" @click="selectCommodity">选择商品</span>
            </el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="form.commodity=='0'" label="消费金额：" prop="amount">
          <span class="amTips">
            购满金额
            <el-input v-model.number="form.amount" size="mini" style="width:50px" />元，可参与活动
          </span>
        </el-form-item>
      </el-form>
    </div>
    <div class="payment-gift-rules">
      <h4>权益设置</h4>
      <el-form ref="form" label-width="100px" class="demo-form-inline" :rules="rules" :model="form">
        <el-form-item label="选择权益：" prop="youhuiquan">
          <el-checkbox v-model="form.youhuiquan" />送优惠券
          <span class="zkTips">最多可选二十张</span>
          <div>
            <el-link type="primary" :underline="false" @click="selectStore">选择优惠券</el-link>
          </div>
        </el-form-item>
        <el-form-item label="发放时间：" prop="fafangshijian">
          <el-radio-group v-model="form.fafangshijian">
            <el-radio label="0">支付后发放</el-radio>
            <el-radio label="1">订单完成时发放</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="退回权益：" prop="tuihuiquanyi">
          <el-radio-group v-model="form.tuihuiquanyi">
            <el-radio label="0">退款时退回</el-radio>
            <el-radio label="1">退款不退回</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </div>
    <div class="submit-box">
      <el-button type="primary" @click="submitData()">提交</el-button>
    </div>
    <mPopSelectStore ref="selectStore" @onSelect="onGetSelectStore" />
  </div>
</template>
<script>
// import { mapGetters } from 'vuex'
import mPopSelectStore from '@/components/Marketings/popSelectStore'
import mSelectedStore from '@/components/Marketings/SelectedStore'
export default {
  name: 'PaymentGiftAdd',
  components: {
    mPopSelectStore, mSelectedStore
  },
  data() {
    return {
      form: {
        huodongshijian: [], // 活动时间
        name: '', // 活动名称
        desc: '', // 活动说明
        range: '0', // 活动范围
        amount: 0, // 金额
        store: '0', // 门店
        commodity: '0', // 指定商品
        fafangshijian: '0', // 发放时间
        tuihuiquanyi: '0', // 退回权益
        youhuiquan: true // 优惠券
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        huodongshijian: [
          { required: true, message: '请选择活动时间', trigger: 'blur' }
        ],
        desc: [{ required: true, message: '请输入活动说明', trigger: 'blur' }],
        store: [{ required: true, message: '请选择活动门店', trigger: 'blur' }],
        amount: [
          {
            type: 'number',
            min: 0,
            message: '消费金额必须为数字且不能小于0',
            trigger: 'blur',
            required: true
          }
        ],
        youhuiquan: [
          { required: true, message: '请选择优惠券', trigger: 'blur' }
        ],
        commodity: [
          { required: true, message: '请选择指定商品', trigger: 'blur' }
        ],
        tuihuiquanyi: [
          { required: true, message: '请选择退回权益', trigger: 'blur' }
        ],
        fafangshijian: [
          { required: true, message: '请选择发放时间', trigger: 'blur' }
        ]
      },
      selectedStores: [] // 已选的门店集合
    }
  },
  computed: {
    // ...mapGetters(['merCode', 'name', 'token']),
    // headers() {
    //   return { Authorization: this.token, merCode: this.merCode }
    // }
  },
  methods: {
    // 选择门店
    selectStore() {
      this.$refs.selectStore.show(this.selectedStores)
    },

    // 选择商品
    selectCommodity() {
      // this.$refs.selectCommodity.show()
    },
    goToSetting() {
      this.$router.push('/distribution/store-reservation-setting')
    },
    submitData() {
      console.log(this.form)
      console.log(this.selectedStores)
    },
    onGetSelectStore(selectedStores) {
      this.selectedStores = selectedStores
      this.$refs.selectedStoreView.show(selectedStores)
      console.log('选择的门店：' + JSON.stringify(selectedStores))
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  padding: 10px 61px;
  height: calc(100vh - 158px);
  overflow-y: scroll;
  .payment-gift-info,
  .payment-gift-rules {
    padding: 20px 0;
    form {
      padding-left: 15%;
      width: 80%;
      .inline-input {
        width: 80px;
      }
      .zkTips {
        color: #999;
        margin-left: 10px;
      }
      .amTips {
        color: #606266;
      }
      .el-radio-group {
        display: inline-block;
        line-height: inherit;
        /* vertical-align: text-top; */
        font-size: 0;
        width: 100px;
        margin-top: 3px;
      }
    }
    h4 {
      height: 30px;
      line-height: 30px;
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 21px;
      .rule-tips {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
      }
    }
    .tips {
      font-size: 14px;
      font-weight: 400;
      color: rgba(0, 0, 0, 0.45);
      margin-top: 10px;
      line-height: 14px;
    }
  }
  .payment-gift-rules {
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .submit-box {
    text-align: center;
    margin-top: 20px;
  }
  .set-store {
    margin-left: 20px;
  }
}
</style>
