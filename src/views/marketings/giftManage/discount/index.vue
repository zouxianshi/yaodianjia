<template>
  <div class="discount-index-model app-container">
    <div class="content">
      <div class="discount-content-l">
        <mPhoneView :datas="discountForm" :other-data="otherData" />
      </div>
      <div class="discount-content-r">
        <el-steps :active="active">
          <el-step title="基本信息" />
          <el-step title="使用规则" />
        </el-steps>
        <el-form
          v-show="active===1"
          ref="form"
          :rules="rules"
          :inline="false"
          :model="discountForm"
          label-width="110px"
          size="mini"
          label-position="left"
        >
          <el-form-item label="优惠券类型：">
            <span>折扣券</span>
          </el-form-item>
          <m-counpon-name ref="cname" :discount-form="discountForm" @changeViews="changeView" />
          <el-form-item label="优惠内容：" prop="denomination">
            <el-input-number
              v-model="discountForm.denomination"
              style="width:80px"
              :disabled="isUpdate"
              :min="1"
              :max="9.99"
              :precision="2"
              :controls="false"
            >折
            </el-input-number>
            <span class="zkTips">例：若折扣为8折，填8即可</span>
          </el-form-item>
          <!-- <el-form-item label prop="maxPrice">
            <el-checkbox
              v-model="isSelectMax"
              :disabled="isUpdate"
              @change="changeMaxPrice"
            />最多优惠
            <el-input
              v-model="discountForm.maxPrice"
              type="number"
              :disabled="isUpdate || !isSelectMax"
              style="width:100px"
            />元
          </el-form-item> -->
          <mReturnRules ref="returnRules" :discount-form="discountForm" :disabled="isUpdate" />
          <mExpireInfo ref="expireInfo" :discount-form="discountForm" :disabled="isUpdate" />
          <mUserNote ref="note" :discount-form="discountForm" />
        </el-form>
        <el-form
          v-show="active===2"
          ref="form2"
          :rules="rules"
          :model="discountForm"
          label-width="110px"
          size="mini"
          label-position="left"
        >
          <el-form-item label="使用场景：">
            <el-radio-group v-model="discountForm.sceneRule" :disabled="isUpdate">
              <el-radio :label="3">线上线下通用</el-radio>
              <el-radio :label="1">微商城</el-radio>
              <el-radio :label="2">线下门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <mUserRule
            ref="useRule"
            :discount-form="discountForm"
            :disabled="isUpdate"
            @changeViews="changeView"
          />
          <mTimeRule
            ref="timeRule"
            :discount-form="discountForm"
            :disabled="isUpdate"
            @changeViews="changeView"
          />
          <el-form-item label="适用门店：">
            <el-radio-group
              v-model="discountForm.shopRule"
              :disabled="isUpdate"
              @change="changeStoreRule"
            >
              <el-radio :label="1">全部门店</el-radio>
              <el-radio :label="2">指定门店&emsp;
                <el-button
                  v-show="discountForm.shopRule === 2"
                  type="primary"
                  plain
                  :disabled="isUpdate"
                  @click="$refs.storeComponent.open()"
                >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <!-- 门店列表 -->
          <el-form-item v-show="chooseStore.length > 0">
            <select-store ref="selectStoreComponent" :disabled="isUpdate" @del-item="delSelectStore" />
          </el-form-item>
          <el-form-item label="适用商品：">
            <el-radio-group v-model="discountForm.productRule" :disabled="isUpdate" @change="changeProductRule">
              <el-radio :label="1">全部商品</el-radio>
              <el-radio :label="2">指定商品可用&emsp;
                <el-button v-show="discountForm.productRule === 2" type="primary" plain size="mini" :disabled="isUpdate" @click="$refs.GoodsComponent.open()">
                  选择商品 | 已选（{{ storeSelectGoods.length }}）
                </el-button>
              </el-radio>
              <!-- <el-radio :label="3">指定商品不可用&emsp;
                <el-button v-show="discountForm.productRule === 3" type="primary" plain size="mini" :disabled="isUpdate" @click="$refs.GoodsComponent.open()">
                  选择商品 | 已选（{{ storeSelectGoods.length }}）
                </el-button>
              </el-radio> -->
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="storeSelectGoods.length > 0">
            <select-goods ref="storeGods" :disabled="isUpdate" @del-item="delSelectGoods" />
          </el-form-item>
        </el-form>
        <el-button v-if="active===1" size="mini" type="primary" @click="nextStep">下一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="active = 1">上一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="_submit">确认</el-button>
      </div>
    </div>
    <!-- 门店列表 -->
    <store-dialog ref="storeComponent" :list="chooseStore" @complete="handleSelectStore" />
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :limit-max="9999"
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

import storeGoods from '../../_source/pop-goods'
import selectGoods from '../../_source/selected-goods'
import { formatDate } from '@/utils/timer'

import {
  getCouponDetail,
  addCoupon,
  updateCoupon,
  _searchByMercode
} from '@/api/coupon'
export default {
  name: 'DiscountIndex',
  components: {
    // 选择门店
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
    var validateMaxPrice = (rule, value, callback) => {
      // 验证最大优惠金额
      if (this.isSelectMax && !value) {
        return callback(new Error('请输入优惠金额上限'))
      } else if (this.isSelectMax && (value < 0.01 || value >= 100000)) {
        return callback(new Error('优惠金额上限大于0.01元且小于100000元'))
      } else if (value.toString().indexOf('.') > 0 && value.toString().split('.')[1].length > 2) {
        return callback(new Error('最多支持两位小数'))
      } else {
        callback()
      }
    }
    var validateDenomination = (rule, value, callback) => {
      // 验证优惠内容
      if (!value || parseFloat(value) < 1 || parseFloat(value) > 9.99) {
        return callback(new Error('优惠券折扣必须大于等于1，且最大不能超过9.99'))
      } else if (value.toString().indexOf('.') > 0 && value.toString().split('.')[1].length > 2) {
        return callback(new Error('最多支持两位小数'))
      } else {
        callback()
      }
    }
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(new Date().getTime() - 86400000)
        }
      },
      isUpdate: false, // 判断是不是更新页面，来禁止编辑某些选项
      chooseStore: [], // 选择的门店
      storeSelectGoods: [], // 选择的商品
      active: 1, // 当前操作步骤
      compArr1: ['cname', 'returnRules', 'expireInfo', 'note'],
      compArr2: ['timeRule', 'useRule'],
      otherData: {
        expirationDay: '1', // 直接开始有效天数
        expirationDate: [new Date(), new Date(new Date().getTime() + 3600000)], // 有效期(当选择开始、结束日期是)
        notActive: '1', // 等待生效天数
        effective: '1', // 有效天数
        merName: ''
      },
      isSelectMax: false, // 是否输入最大优惠
      discountForm: {
        ctype: 1,
        cname: '', // 折扣名称
        denomination: '', // 优惠内容
        maxPrice: 0, // 最大优惠
        returnRule: 1, // 退货规则
        expireInfo: 0, // 到期提醒
        note: '', // 使用须知
        sceneRule: 3, // 使用场景
        effectTime: [formatDate(new Date()), formatDate(new Date(new Date().getTime() + 3600000))].join(','),
        useRule: 0, // 门槛金额
        shopRule: 1, // 适用门店
        productRule: 1, // 使用商品
        timeRule: 3,
        logo: ''
      },
      rules: {
        denomination: [
          { validator: validateDenomination, trigger: 'blur' },
          { required: true, message: '请填写优惠内容', trigger: 'blur' }
        ],
        maxPrice: [{ validator: validateMaxPrice, trigger: 'blur' }]
      }
    }
  },
  computed: {
    ...mapGetters(['merCode']),
    oneImg() {
      return require('../img/one.png')
    },
    twoImg() {
      return require('../img/two.png')
    }
  },
  mounted() {
    // 查询商户信息
    _searchByMercode({ merCode: this.merCode }).then(res => {
      if (res.data) {
        this.discountForm.logo = res.data.merLogo
        this.otherData.merName = res.data.merName
      }
    })
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
          // 回显选择商品
          var data = datas.listCouponProductEntity
          this.storeSelectGoods = []
          data.map(item => {
            var obj = {
              erpCode: item.proCode,
              name: item.proName
            }
            this.storeSelectGoods.push(obj)
          })
          this.$refs.storeGods.dataFrom(this.storeSelectGoods)
          this.isSelectMax = !!datas.maxPrice // 是否需要最大优惠
        }
      })
    }
  },
  methods: {
    // 修改是否有最大优惠
    changeMaxPrice() {
      this.discountForm.maxPrice = ''
      this.$refs.form.validateField('maxPrice', (flag) => {
      })
    },
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
      this.$refs.storeGods.dataFrom([])
    },
    // 切换门店限制类型（全部门店 | 选择门店）
    changeStoreRule() {
      this.chooseStore = []
      this.$refs.selectStoreComponent.dataFrom([])
    },
    nextStep() {
      if (this.active === 1) {
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
      _.map([...that.compArr1, ...that.compArr2], item => {
        var flag = that.$refs[item].$verification()
        arr.push(flag)
      })
      _.map(that.compArr2, item => {
        var flag = that.$refs[item].$verification()
        arr.push(flag)
      })
      Promise.all(arr)
        .then(res => {
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
              if (this.chooseStore.length === 0) {
                this.$message({
                  message: '请至少选择一家门店', type: 'error'
                })
                return false
              }
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
            params.listCouponProduct = []
            if (params.productRule === 2 || params.productRule === 3) {
              if (this.storeSelectGoods.length === 0) {
                this.$message({
                  message: '请至少选择一件商品', type: 'error'
                })
                return false
              }
              this.storeSelectGoods.forEach(item => {
                var obj = {
                  proCode: item.erpCode,
                  proName: item.name
                }
                params.listCouponProduct.push(obj)
              })
            }
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
              message: '请检查参数',
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
