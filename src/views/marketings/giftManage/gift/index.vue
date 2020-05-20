<template>
  <div class="discount-index-model">
    <div class="content">
      <div class="discount-content-l">
        <mPhoneView :data="discountForm" :other-data="otherData" />
      </div>
      <div class="discount-content-r">
        <el-steps :active="active" simple>
          <el-step title="基本信息" />
          <el-step title="使用规则" />
        </el-steps>
        <el-form
          v-show="active===1"
          ref="form"
          :inline="false"
          :model="discountForm"
          label-width="110px"
          size="mini"
          label-position="left"
        >
          <el-form-item label="优惠券类型：">
            <span>礼品券</span>
          </el-form-item>
          <m-counpon-name ref="cname" :discount-form="discountForm" @changeViews="changeView" />
          <el-form-item label="兑换商品：" required>
            <el-button type="primary" plain size="mini" :disabled="isUpdate" @click="$refs.GoodsComponent.open()">
              选择商品
            </el-button>
          </el-form-item>
          <el-form-item v-show="storeSelectGoods.length > 0">
            <select-goods ref="storeGods" :disabled="isUpdate" @del-item="delSelectGoods" />
          </el-form-item>
          <mReturnRules ref="returnRules" :discount-form="discountForm" :disabled="isUpdate" />
          <mExpireInfo ref="expireInfo" :discount-form="discountForm" :disabled="isUpdate" />
          <mUserNote ref="note" :discount-form="discountForm" />
        </el-form>
        <el-form
          v-show="active===2"
          ref="form2"
          :model="discountForm"
          label-width="110px"
          size="mini"
          label-position="left"
        >
          <el-form-item label="使用场景：">
            <span>门店</span>
          </el-form-item>
          <mUserRule ref="useRule" :discount-form="discountForm" :disabled="isUpdate" @changeViews="changeView" />
          <mTimeRule ref="timeRule" :discount-form="discountForm" :disabled="isUpdate" @changeViews="changeView" />
          <el-form-item label="适用门店：">
            <el-radio-group
              v-model="discountForm.shopRule"
              :disabled="isUpdate"
              @change="changeStoreRule"
            >
              <el-radio :label="1">全部门店</el-radio>
              <el-radio :label="2">
                指定门店&emsp;
                <el-button
                  type="primary"
                  plain
                  :disabled="isUpdate || discountForm.shopRule === 1"
                  @click="$refs.storeComponent.open()"
                >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 门店列表 -->
          <el-form-item>
            <select-store ref="selectStoreComponent" :disabled="isUpdate" @del-item="delSelectStore" />
          </el-form-item>
        </el-form>
        <el-button v-if="active===1" size="mini" type="primary" @click="next">下一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="active = 1">上一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="_submit">确认</el-button>
      </div>
    </div>
    <!-- 门店列表 -->
    <store-dialog ref="storeComponent" :list="chooseStore" @complete="handleSelectStore" />
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
import _ from 'lodash'
import { mapGetters } from 'vuex'
import mPhoneView from '../_source/phoneView'
import mCounponName from '../_source/formItems/couponName' // cname
import mReturnRules from '../_source/formItems/returnRules' // returnRuler
import mExpireInfo from '../_source/formItems/expireInfo'
import mUserNote from '../_source/formItems/userNote' // 使用须知
import mTimeRule from '../_source/formItems/timeRule' // 时间限制
import mUserRule from '../_source/formItems/userRule' // 使用门槛
import storeDialog from '../../../marketing/components/store' // 已选择门店
import selectStore from '../../../marketing/components/select-store' // 已选择门店列表
import storeGoods from '../../../marketing/components/store-gods'
import selectGoods from '../../../marketing/components/select-goods'
import {
  getCouponDetail,
  addCoupon,
  updateCoupon,
  _searchByMercode
} from '@/api/coupon'
export default {
  name: 'DiscountIndex',
  components: {
    storeDialog,
    selectStore,
    // 选择商品
    storeGoods,
    selectGoods,
    mPhoneView,
    mCounponName,
    mReturnRules,
    mExpireInfo,
    mUserNote,
    mTimeRule,
    mUserRule
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().getTime() - 86400000)
        }
      },
      compArr1: ['cname'],
      compArr2: ['timeRule', 'useRule'],
      isUpdate: false, // 判断是不是更新页面，来禁止编辑某些选项
      active: 1, // 当前操作步骤
      chooseStore: [], // 选择的门店
      storeSelectGoods: [], // 选择的商品
      otherData: {
        expirationDay: '1', // 直接开始有效天数
        expirationDate: [new Date(), new Date()], // 有效期(当选择开始、结束日期是)
        notActive: '1', // 等待生效天数
        effective: '1', // 有效天数
        merName: ''
      },
      isSelectMax: false, // 是否输入最大优惠
      useRuleLimit: 0, // 使用门槛
      discountForm: {
        ctype: 3, // 礼品券
        cname: '', // 优惠券名称
        returnRule: 1, // 退货规则
        expireInfo: 0, // 到期提醒
        note: '', // 使用须知
        sceneRule: 2, // 使用场景 (2.线下门店)
        effectTime: 1,
        giftId: '',
        useRule: 0, // 门槛金额
        shopRule: 1, // 适用门店
        productRule: 2, // 使用商品(2.部分商品可用)
        timeRule: 1,
        logo: '' // 预览图片
      }
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  mounted() {
    this.useRuleLimit = this.discountForm.useRule === 0 ? 0 : 1 // 是否有使用门槛
    if (this.$route.query.id) {
      // 编辑
      this.isUpdate = true
      var params = {
        id: this.$route.query.id
      }
      getCouponDetail(params).then(res => {
        if (res.data) {
          var datas = res.data
          this.discountForm = datas
          this.chooseStore = []
          // 回显选择门店
          datas.listCouponStoreEntity.map(items => {
            var obj = {
              busId: items.busId,
              id: items.id,
              ruleType: items.ruleType,
              storeId: items.storeId,
              stCode: items.storeCode,
              stName: items.storeName,
              address: items.storeAddress
            }
            this.chooseStore.push(obj)
          })
          this.$refs.selectStoreComponent.dataFrom(
            Array.isArray(this.chooseStore) ? this.chooseStore : []
          )

          this.$refs.storeGods.dataFrom(this.storeSelectGoods)
          // 回显选择商品
          var data = [datas.giftResDTO]
          this.storeSelectGoods = []
          data.map(item => {
            var obj = {
              picUrl: item.picUrl,
              erpCode: item.erpCode,
              name: item.name,
              mprice: item.mprice,
              specSkus: item.specSkuList
            }
            this.storeSelectGoods.push(obj)
          })
          this.$refs.storeGods.dataFrom(this.storeSelectGoods)
        }
      })
    }
    // 查询商户信息
    _searchByMercode({ merCode: this.merCode }).then(res => {
      if (res.data) {
        this.discountForm.logo = res.data.merLogo
        this.otherData.merName = res.data.merName
      }
    })
  },
  methods: {
    // 删除已选择门店
    delSelectStore(item, index) {
      this.chooseStore.splice(index, 1)
      this.$refs.selectStoreComponent.dataFrom(this.chooseStore)
    },
    // 选择门店
    handleSelectStore(val) {
      this.chooseStore = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    // 选择商品
    handleSelectGoods(val) {
      this.storeSelectGoods = val
      this.$refs.storeGods.dataFrom(val)
    },
    // 删除已选择商品
    delSelectGoods(item, index) {
      this.storeSelectGoods.splice(index, 1)
      this.$refs.storeGods.dataFrom(this.storeSelectGoods)
    },
    // 更新预览界面
    changeView(obj) {
      Object.assign(this.discountForm, obj)
    },
    // 切换商品限制规则
    changeProductRule() {
      this.storeSelectGoods = []
      this.$refs.storeGods.dataFrom(this.storeSelectGoods)
    },
    changeStoreRule() {
      this.chooseStore = []
      this.$refs.selectStoreComponent.dataFrom([])
    },
    next() {
      if (this.active === 1) {
        if (this.storeSelectGoods.length <= 0) {
          this.$message({
            message: '请选择商品',
            type: 'error'
          })
          return
        }
        this.$refs['form'].validate(flag => {
          if (flag) {
            var arr = []
            _.map(this.compArr1, v => {
              var flag = this.$refs[v].$verification()
              arr.push(flag)
            })
            Promise.all(arr).then(res => {
              console.log(res)
              this.active++
            }).catch(err => {
              console.log(err)
              return false
            })
          }
        })
      }
    },
    async _submit() {
      var that = this
      var arr = []
      _.map(that.compArr2, item => {
        var flag = that.$refs[item].$verification()
        arr.push(flag)
      })
      Promise.all(arr).then(res => {
        _.map(res, item => {
          Object.assign(this.discountForm, item)
        })
        if (this.$route.query.id) {
          this.discountForm.expireInfo = Number(this.discountForm.expireInfo)
          updateCoupon(this.discountForm).then(res => {
            if (res.code === '10000') {
              this.$message({
                message: res.msg,
                type: 'success'
              })
            }
            this.$router.push('/marketings/gift-manage/list')
          })
        } else {
          // 新增时处理数据
          var params = _.cloneDeep(this.discountForm)
          params.listCouponStore = []
          // 处理限制门店以及限制商品
          if (params.shopRule === 2) {
            this.chooseStore.forEach(item => {
              var obj = {
                ruleType: 1,
                storeCode: item.stCode,
                storeId: item.id,
                storeName: item.stName,
                storeAddress: item.province + item.city + item.area + item.address
              }
              params.listCouponStore.push(obj)
            })
          }
          params.giftId = this.storeSelectGoods[0].erpCode
          addCoupon(params).then(res => {
            if (res.code === '10000') {
              this.$message({
                message: res.msg,
                type: 'success'
              })
              this.$router.push('/marketings/gift-manage/list')
            }
          })
        }
      })
        .catch(err => {
          if (typeof (err) === 'string') {
            this.$message({
              message: err,
              type: 'error'
            })
          } else {
            this.$message({
              message: '参数错误，请检查基本信息、使用规则参数！',
              type: 'error'
            })
          }
        })
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
    .discount-content-l {
      flex: 0 0 24%;
    }
    .discount-content-r {
      flex: 0 0 60%;
      padding-left: 5%;
      .el-form {
        .el-radio-group {
          display: inline-block;
          line-height: inherit;
          vertical-align: text-top;
          font-size: 0;
          width: 100px;
        }
      }
      .el-steps--simple {
        margin-bottom: 24px;
      }
      .zkTips {
        color: #bbb;
        margin-left: 24px;
      }
    }
  }
}
</style>
