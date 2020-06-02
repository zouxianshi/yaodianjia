<template>
  <div class="app-container exchange-add">
    <div class="base-info">
      <div class="items-title">基本信息</div>
      <el-divider style="margin-top:5px" />
      <el-form ref="formBase">
        <el-form-item label="选择商品" required>
          <el-button type="text" :disabled="isEdit" @click="$refs.GoodsComponent.open()">选择商品</el-button>
        </el-form-item>
        <el-form-item>
          <select-goods ref="storeGods" :disabled="isEdit" @del-item="delSelectGoods" />
        </el-form-item>
      </el-form>
    </div>
    <div class="rule-info">
      <div class="items-title">规则设置</div>
      <el-divider style="margin-top:5px" />
      <el-form ref="formRule" size="mini" label-width="100px" :model="params" :rules="rules" :disabled="isDisabled">
        <el-form-item label="可兑换库存" prop="totalAmount">
          <el-input-number v-model="params.totalAmount" :controls="false" :precision="0" :min="1" :max="999999" :disabled="isEdit" />
          <span class="tips"> 设置该积分商品在每个门店可兑换库存</span>
        </el-form-item>
        <el-form-item label="换购价格" required>
          <el-input-number v-model="params.exchangePrice" :controls="false" :precision="2" :min="0" :max="99999999" />
          <span style="font-size:18px;margin:0 20px;vertical-align: middle;">元 +</span>
          <el-input-number v-model="params.exchangeHb" :controls="false" :precision="0" :min="1" :max="99999999" />
          <span style="font-size:18px;margin:0 20px;vertical-align: middle;">海贝</span>
          <span class="tips"> 当前兑换比例： 1 : 1</span>
        </el-form-item>
        <el-form-item label="限购数量" prop="limitAmount">
          <el-input-number v-model="params.limitAmount" :controls="false" :precision="0" :min="0" :max="99999" />
          <span class="tips"> 0代表不限购</span>
        </el-form-item>
        <el-form-item label="下单规则">
          不可使用优惠券
        </el-form-item>
        <el-form-item label="购买限制" required>
          <el-checkbox v-model="params.purchaseLimit">该商品不允许直接购买</el-checkbox>
          <p class="tips">如果设置了不允许直接购买，该商品在微商城查看商品详情时立即购买和加入购物车置灰不能下单，只能在兑换商城下单
            ，如果未勾选说明可以分别在微商城和兑换商城下单
          </p>
        </el-form-item>
      </el-form>
      <div v-if="!isDisabled">
        <el-button size="mini" @click="returnList">取消</el-button>
        <el-button size="mini" type="primary" @click="submitData">确定</el-button>
      </div>
      <div v-else>
        <el-button size="mini" @click="$router.push('/activity/exchangeMallList')">返回</el-button>
      </div>
    </div>
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :limit-max="1"
      :list="storeSelectGoods"
      @on-change="handleSelectGoods"
    />
  </div>
</template>
<script>
import storeGoods from '../../marketing/components/store-gods'
import selectGoods from '../../marketing/components/select-goods'
import { cerateExchange, getExchangeInfo, editExchange } from '@/api/exchangeMall'
export default {
  components: { storeGoods, selectGoods },
  data() {
    return {
      storeSelectGoods: [], // 已选择商品
      params: {
        totalAmount: '', // 兑换库存
        exchangePrice: 0, // 兑换金额
        exchangeHb: 0, // 兑换海贝
        limitAmount: 0,
        purchaseLimit: true
      },
      rules: {
        totalAmount: [
          { required: true, message: '请设置可兑换库存', trigger: 'blur' }
        ],
        limitAmount: [
          { required: true, message: '请设置限购数量', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    if (this.$route.query.id) {
      const params = {
        id: this.$route.query.id
      }
      getExchangeInfo(params).then(res => {
        if (res.data) {
          this.storeSelectGoods = [res.data.activitySpecDTO]
          this.$refs.storeGods.dataFrom(this.storeSelectGoods)
          const ruleData = res.data.activityDetail.ruleList[0]
          this.params = {
            totalAmount: ruleData.totalAmount, // 兑换库存
            exchangePrice: ruleData.exchangePrice, // 兑换金额
            exchangeHb: ruleData.exchangeHb, // 兑换海贝
            limitAmount: ruleData.limitAmount,
            purchaseLimit: ruleData.purchaseLimit === 1 // 购买限制
          }
        }
      })
    }
  },
  computed: {
    isDisabled() {
      return this.$route.query.type === 'ck'
    },
    isEdit() {
      return !!this.$route.query.id
    }
  },
  methods: {
    handleSelectGoods(val) {
      this.storeSelectGoods = val
      this.$refs.storeGods.dataFrom(val)
    },
    delSelectGoods(item, index) {
      this.storeSelectGoods.splice(index, 1)
      this.$refs.storeGods.dataFrom(this.storeSelectGoods)
    },
    submitData() {
      if (this.storeSelectGoods.length === 0) {
        this.$message({
          type: 'error',
          message: '请选择商品！'
        })
      }
      const pmtCommList = [{
        name: this.storeSelectGoods[0].name,
        prodManufacture: this.storeSelectGoods[0].manufacture, // 厂家
        prodSpecName: this.storeSelectGoods[0].specStr, // 规格
        specId: this.storeSelectGoods[0].specId // 规格id
      }]
      const pmtRule = {
        ruleList: [{
          limitAmount: this.params.limitAmount,
          exchangeHb: this.params.exchangeHb,
          exchangePrice: this.params.exchangePrice,
          totalAmount: this.params.totalAmount,
          purchaseLimit: this.params.purchaseLimit ? 1 : 0,
          prodSpecId: this.storeSelectGoods[0].specId // 规格id
        }]
      }
      var params = {}
      params = {
        name: this.storeSelectGoods[0].name,
        pmtCommList: pmtCommList,
        pmtRule: pmtRule
      }
      if (this.$route.query.id) {
        params.id = this.$route.query.id
        editExchange(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              type: 'success',
              message: '修改成功！'
            })
            this.$router.push('/activity/exchangeMallList')
          }
        })
      } else {
        cerateExchange(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              type: 'success',
              message: '创建成功！'
            })
            this.$router.push('/activity/exchangeMallList')
          }
        })
      }
    },
    returnList() {
      this.$confirm('当前页面数据暂未保存，确定要离开吗?', '操作提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/activity/exchangeMallList')
      })
    }
  }
}
</script>
<style scoped lang="scss">
.exchange-add{
  padding-top: 20px;
  .items-title{
    font-size: 18px;font-weight: 600;
  }
  .rule-info{
    .tips{
      color: #999;
    }
  }
}
</style>
