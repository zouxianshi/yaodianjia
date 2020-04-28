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
          :rules="rules"
          :inline="false"
          :model="discountForm"
          label-width="110px"
          size="mini"
          label-position="left"
        >
          <el-form-item label="优惠券类型：">
            <span>礼品券</span>
          </el-form-item>
          <el-form-item label="优惠券名称：" prop="cname">
            <el-input
              v-model="discountForm.cname"
              placeholder="请输入优惠券名称"
              maxlength="10"
              style="width:300px"
            />
          </el-form-item>
          <el-form-item label="兑换商品：">
            <el-button type="text" :disabled="isUpdate" @click="selectCommodity()">选择商品</el-button>
            <mSelectedProduct
              v-show="selectedPro.length>0"
              ref="selectedPro"
              @onDel="_deleteItemPro"
            />
          </el-form-item>
          <el-form-item label="退货规则：">
            <el-radio-group v-model="discountForm.returnRule" :disabled="isUpdate">
              <el-radio :label="1">退货退回</el-radio>
              <el-radio :label="2">退货后失效</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="到期提醒：" prop="expireInfo">
            <el-checkbox v-model="isRember" :disabled="isUpdate" @change="discountForm.expireInfo=0" />到期前
            <el-input
              v-model="discountForm.expireInfo"
              :disabled="isUpdate || !isRember"
              size="mini"
              style="width:50px"
            />天微信提醒
          </el-form-item>
          <el-form-item label="使用须知：">
            <el-input
              v-model="discountForm.note"
              type="textarea"
              style="width:300px"
              rows="5"
              placeholder="请输入使用须知"
            />
          </el-form-item>
        </el-form>
        <el-form
          v-show="active===2"
          ref="form2"
          :rules="rules"
          :model="discountForm"
          label-width="100px"
          size="mini"
          label-position="left"
        >
          <el-form-item label="使用场景：">
            <span>门店</span>
          </el-form-item>
          <el-form-item label="使用门槛：" prop="useRule">
            <el-radio-group v-model="useRuleLimit" :disabled="isUpdate" @change="discountForm.useRule='0'">
              <el-radio :label="0">无门槛</el-radio>
              <el-radio :label="1">
                订单满
                <el-input
                  v-model="discountForm.useRule"
                  :disabled="isUpdate || useRuleLimit != 1"
                  style="width:100px"
                  maxlength="5"
                  onkeyup="value=value.replace(/[^0-9\.]/g,'')"
                />元
              </el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="使用时间：">
            <el-radio-group
              v-model="discountForm.timeRule"
              style="width:200px"
              :disabled="isUpdate"
              @change="changeTimeRule"
            >
              <el-radio :label="1">
                自领取起
                <el-input
                  v-model="otherData.expirationDay"
                  onkeyup="value=value.replace(/[^0-9]/g,'')"
                  :disabled="isUpdate || discountForm.timeRule != 1"
                  style="width:60px"
                />天内有效
              </el-radio>
              <el-radio :label="2">
                自领取起
                <el-input
                  v-model="otherData.notActive"
                  onkeyup="value=value.replace(/[^0-9]/g,'')"
                  :disabled="isUpdate || discountForm.timeRule != 2"
                  style="width:60px"
                />天后生效，生效后
                <el-input v-model="otherData.effective" :disabled="isUpdate || discountForm.timeRule != 2" style="width:60px" />天失效
              </el-radio>
              <el-radio :label="3">
                <el-date-picker
                  v-model="otherData.expirationDate"
                  :disabled="isUpdate"
                  type="datetimerange"
                  range-separator="至"
                  start-placeholder="生效日期"
                  end-placeholder="失效日期"
                  @change="changeData"
                />
              </el-radio>
            </el-radio-group>
          </el-form-item>
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
                  v-if="discountForm.shopRule===2"
                  type="text"
                  :disabled="isUpdate"
                  @click="selectStore"
                >选择门店</el-button>
              </el-radio>
            </el-radio-group>
            <mSelectedStore
              v-show="selectedStore.length > 0"
              ref="selectedStore"
              @onDel="_deleteItemSto"
            />
          </el-form-item>
        </el-form>
        <el-button v-if="active===1" size="mini" type="primary" @click="next">下一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="active = 1">上一步</el-button>
        <el-button v-if="active===2" size="mini" type="primary" @click="_submit">确认</el-button>
      </div>
    </div>
    <mPopSelectStore ref="selectStore" @onSelect="getSelectedStore" />
    <mPopSelectProduct ref="selectCommodity" @onSelect="getSelectedPro" />
  </div>
</template>
<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import mPhoneView from '../_source/phoneView'
import mPopSelectStore from '@/components/Marketings/popSelectStore' // 选择门店弹窗
import mPopSelectProduct from './selectOneProduct' // 选择商品弹窗
import mSelectedStore from '../../_source/SelectedStore' // 已选择门店列表
import mSelectedProduct from '../../_source/SelectedProduct' // 已选择商品列表
import {
  getCouponDetail,
  addCoupon,
  updateCoupon,
  _searchByMercode
} from '@/api/coupon'
import { formatDate } from '@/utils/timer'
export default {
  name: 'DiscountIndex',
  components: {
    mPhoneView,
    mPopSelectStore,
    mPopSelectProduct,
    mSelectedStore,
    mSelectedProduct
  },
  data() {
    var validateExpireInfo = (rule, value, callback) => {
      if (this.isRember && !value) {
        // 如果选择了提醒，提醒天数就不能为空
        return callback(new Error('请输入正确提醒天数'))
      } else {
        callback()
      }
    }

    return {
      isUpdate: false, // 判断是不是更新页面，来禁止编辑某些选项
      active: 1, // 当前操作步骤
      selectedStore: [],
      selectedPro: [],
      otherData: {
        expirationDay: '1', // 直接开始有效天数
        expirationDate: [new Date(), new Date()], // 有效期(当选择开始、结束日期是)
        notActive: '1', // 等待生效天数
        effective: '1', // 有效天数
        merName: ''
      },
      isRember: false, // 是否到期提醒
      isSelectMax: false, // 是否输入最大优惠
      useRuleLimit: 0, // 使用门槛
      discountForm: {
        ctype: 3, // 礼品券
        cname: '', // 优惠券名称
        // maxPrice: 0, // 最大优惠
        returnRule: 1, // 退货规则
        expireInfo: 0, // 到期提醒
        note: '', // 使用须知
        sceneRule: 2, // 使用场景 (2.线下门店)
        effectTime: 0,
        useRule: 0, // 门槛金额
        shopRule: 1, // 适用门店
        productRule: 2, // 使用商品(2.部分商品可用)
        timeRule: 1,
        logo: '' // 预览图片
      },
      rules: {
        cname: [
          { required: true, message: '请输入优惠券名称', trigger: 'blur' }
        ],
        expireInfo: [{ validator: validateExpireInfo, trigger: 'blur' }]
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
          this.selectedStore = datas.listCouponStoreEntity
          this.$refs.selectedStore.show(datas.listCouponStoreEntity) // 已选择的门店列表显示
          this.selectedPro = datas.listCouponProductEntity
          this.$refs.selectedPro.show(datas.listCouponProductEntity) // 已选择的商品列表显示
          this.isRember = !!datas.expireInfo // 是否需要到期提醒
          this.useRuleLimit = datas.useRule === 0 ? 0 : 1 // 是否有使用门槛
          this.otherData = {
            expirationDay: '0', // 直接开始有效天数
            expirationDate: [new Date(), new Date()], // 有效期(当选择开始、结束日期是)
            notActive: '0', // 等待生效天数
            effective: '0' // 有效天数
          }
          if (datas.timeRule === 1) {
            this.otherData.expirationDay = datas.effectTime
          } else if (datas.timeRule === 2) {
            var effectTimes = datas.effectTime.split(',')
            this.otherData.notActive = effectTimes[0]
            this.otherData.effective = effectTimes[1]
          } else {
            this.otherData.expirationDate = [...datas.effectTime.split(',')]
          }
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
    // 切换商品限制规则
    changeProductRule() {
      this.selectedPro = []
    },
    changeStoreRule() {
      this.selectedStore = []
    },
    changeTimeRule() {
      this.otherData.expirationDay = 1
      this.otherData.expirationDate = [new Date(), new Date()]
      this.otherData.notActive = 1
      this.otherData.effective = 1
    },
    changeData(e) { // 限制时间
      if (new Date(e[0]).getTime() < new Date().getTime()) {
        this.$alert('有效期开始时间需大于当前时间，请重新选择', '有效期有误', {
          confirmButtonText: '确定'
        })
      }
    },
    next() {
      if (this.active++ > 1) this.active = 1
    },
    _submit() {
      //  提交数据
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.$refs['form2'].validate(valid => {
            if (valid) {
              if (this.$route.query.id) {
                this.discountForm.expireInfo = Number(
                  this.discountForm.expireInfo
                )
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
                  this.selectedStore.forEach(item => {
                    var obj = {
                      ruleType: 1,
                      storeCode: item.stCode,
                      storeId: item.id,
                      storeName: item.stName
                    }
                    params.listCouponStore.push(obj)
                  })
                }
                params.listCouponProduct = []
                if (params.productRule === 2 || params.productRule === 3) {
                  this.selectedPro.forEach(item => {
                    var obj = {
                      proBrand: item.brandName,
                      proCode: item.erpCode,
                      proId: item.id,
                      proName: item.name,
                      proPrice: item.price,
                      proSpec: item.specSkuList
                        ? item.specSkuList[0].skuValue
                        : '',
                      ruleType: 1
                    }
                    params.listCouponProduct.push(obj)
                  })
                }
                var _data = this.otherData
                if (params.timeRule === 1) {
                  params.effectTime = _data.expirationDay
                } else if (params.timeRule === 2) {
                  params.effectTime = _data.notActive + ',' + _data.effective
                } else {
                  if (new Date(_data.expirationDate[0]).getTime() < new Date().getTime()) {
                    this.$alert('有效期开始时间需大于当前时间，请重新选择', '有效期有误', {
                      confirmButtonText: '确定'
                    })
                    return
                  }
                  params.effectTime =
                    formatDate(_data.expirationDate[0]) +
                    ',' +
                    formatDate(_data.expirationDate[1])
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
            } else {
              return false
            }
          })
        } else {
          return false
        }
      })
    },
    // 选择门店
    selectStore() {
      this.$refs.selectStore.show(this.selectedStore)
    },
    // 选择商品
    selectCommodity() {
      this.$refs.selectCommodity.show(this.selectedPro)
    },
    // 获取选择门店数据
    getSelectedStore(data) {
      this.selectedStore = data
      this.$refs.selectedStore.show(data) // 已选择的列表显示
    },
    // 获取选择商品数据
    getSelectedPro(data) {
      this.selectedPro = data
      this.$refs.selectedPro.show(data)
    },
    // 删除已选择门店数据
    _deleteItemSto(data) {
      this.selectedStore = data
    },
    // 删除已选择商品数据
    _deleteItemPro(data) {
      this.selectedPro = data
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
