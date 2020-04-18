<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <div class="form-title">基本信息</div>
      <el-form-item label="活动名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="不超过30字"
          style="width: 380px;"
          maxlength="30"
          show-word-limit
        />
      </el-form-item>
      <el-form-item label="活动时间：" prop="activitTime">
        <el-date-picker
          v-model="form.activitTime"
          style="width: 380px"
          size="small"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="至"
          :default-time="['00:00:00', '23:59:59']"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="handleTimeChange"
        />
      </el-form-item>
      <div class="form-title">活动规则</div>
      <el-form-item label="活动范围：" prop="allStores" required>
        <el-radio-group v-model="form.allStores" @change="handleStoreChange">
          <el-radio :label="true">全部门店</el-radio>
          <el-radio :label="false">部分门店</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="!form.allStores">
        <!-- storeComponent -->
        <el-button
          type="primary"
          plain
          @click="$refs.storeComponent.open()"
        >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
      </el-form-item>
      <!-- 门店列表 -->
      <el-form-item v-show="!form.allStores">
        <select-store ref="selectStoreComponent" @del-item="delSelectStore" />
      </el-form-item>
      <el-form-item label="活动商品：" prop="allSpecs" required>
        <el-radio-group v-model="form.allSpecs" @change="handleProductChange">
          <el-radio :label="true">全部商品</el-radio>
          <el-radio :label="false">部分商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 选择的商品列表 -->
      <el-form-item v-show="!form.allSpecs">
        <div style="margin-bottom: 8px">
          <el-button
            type="primary"
            plain
            size="small"
            @click="$refs.GoodsComponent.open()"
          >选择商品 | 已选（{{ storeSelectGoods.length }}）</el-button>
        </div>
        <select-goods ref="storeGods" @del-item="delSelectGoods" />
      </el-form-item>
      <el-form-item label="下单规则：" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-tooltip class="item" effect="dark" content="参加满减是否使用优惠" placement="top-end">
            <el-checkbox label="1" name="type">
              优惠券
              <i class="el-icon-question" />
            </el-checkbox>
          </el-tooltip>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item label="活动规则：" prop="ruleType" required>
        <el-radio-group v-model="form.ruleType" @change="ruleTypeChange">
          <el-radio :label="1">阶梯满减</el-radio>
          <el-radio :label="0">
            循环满减
            <i class="el-icon-question" />
          </el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 优惠设置 -->
      <div class="form-title">优惠设置</div>
      <el-form-item label="满减规则：" required>
        <el-radio-group v-model="form.uint" @change="unitChange">
          <el-radio :label="0">金额（元）</el-radio>
          <el-radio :label="1" :disabled="form.ruleType === 0">商品数量（件）</el-radio>
        </el-radio-group>
      </el-form-item>
      <div v-for="(domain, $Index) in form.ruleList" :key="$Index">
        <el-divider v-if="form.ruleType === 1" content-position="left">
          {{ $Index+1 }}级优惠
          <el-button
            v-if="$Index !== 0"
            style="margin-left: 20px"
            type="danger"
            size="mini"
            icon="el-icon-delete"
            circle
            @click="handleDelete($Index)"
          />
        </el-divider>
        <el-form-item
          label="满减门槛："
          :prop="'ruleList.'+ $Index + '.threshold'"
          :rules="{
            required: true, validator:validThreshold, trigger: 'change'
          }"
        >
          <el-input v-model="domain.threshold" style="width: 200px" class="input-with-select">
            <template slot="append">{{ form.uint === 0 ? '元':'件' }}</template>
          </el-input>
        </el-form-item>
        <el-form-item v-show="false" :prop="'ruleList.'+ $Index + '.uint'">
          <el-input v-model="domain.uint" />
        </el-form-item>
        <el-form-item label="优惠内容：">
          <el-checkbox
            v-model="domain.order_full"
            border
            @input.native="orderFullChange($event, $Index)"
          >订单金额优惠</el-checkbox>
        </el-form-item>
        <el-form-item
          v-show="domain.order_full && form.ruleType === 1"
          style="margin-left: 30px; margin-bottom: 0px"
        >
          <div style="display: flex; flex-direction: row">
            <el-form-item>
              <el-radio v-model="domain.discountType" :label="1">打</el-radio>
            </el-form-item>
            <el-form-item
              :prop="'ruleList.'+ $Index + '.discount1'"
              :rules="{
                validator:validDiscountPrice, trigger: 'change'
              }"
            >
              <el-input
                v-model="domain.discount1"
                style="width: 200px; margin-left: 10px"
                class="input-with-select"
                :min="0"
                :max="10"
              >
                <template slot="append">折</template>
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <el-form-item
          v-show="domain.order_full && form.uint === 0"
          style="margin-left: 30px; margin-bottom: 0px"
        >
          <div style="display: flex; flex-direction: row">
            <el-form-item>
              <el-radio v-model="domain.discountType" :label="0">减</el-radio>
            </el-form-item>
            <el-form-item
              :prop="'ruleList.'+ $Index + '.discount0'"
              :rules="{
                validator:validAmountPrice, trigger: 'change'
              }"
            >
              <el-input
                v-model="domain.discount0"
                style="width: 200px; margin-left: 10px"
                class="input-with-select"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item>
          <template>
            <el-checkbox v-model="domain.giftOrNot" border>送赠品</el-checkbox>
            <el-button v-if="!!domain.giftOrNot" type="text">选择赠品</el-button>
          </template>
        </el-form-item>
        <el-form-item>这里是表格</el-form-item>
      </div>
      <el-divider v-if="form.ruleType === 1" content-position="left">
        <el-tooltip
          effect="dark"
          content="最多支持五级优惠，每级优惠不叠加，如：满足二级优惠条件后则不再享有一级优惠。"
          placement="top-start"
        >
          <el-button plain type="warning" size="mini" @click="handleAdd">
            添加层级
            <i class="el-icon-question" />
          </el-button>
        </el-tooltip>
      </el-divider>
      <el-form-item>
        <el-button type="primary" style="width: 120px" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择主商品组件 -->
    <store-goods ref="GoodsComponent" :list="storeSelectGoods" @on-change="handleSelectGoods" />
    <!-- 门店列表 -->
    <store-dialog ref="storeComponent" :list="chooseStore" @complete="handleSelectStore" />
  </div>
</template>

<script>
import _ from 'lodash'
import storeGoods from '../../components/store-gods'
// import storeGoodsGifts from '../../components/store-gods-gifts'
import storeDialog from '../../components/store'
import selectStore from '../../components/select-store'
import selectGoods from '../../components/select-goods'
// import { createActFull } from '@/api/activity'
import { mapGetters } from 'vuex'

export default {
  components: {
    storeGoods,
    storeDialog,
    // storeGoodsGifts,
    selectStore,
    selectGoods
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  data() {
    const checkActivitTime = (rule, value, callback) => {
      console.log('我是时间检测-----------------------')
      if (!value) {
        return callback(new Error('请选择活动开始和结束时间'))
      }
      if (value[0] >= value[1]) {
        return callback(new Error('活动结束时间要大于开始时间'))
      }
      callback()
    }
    return {
      activeName: 'basic',
      form: {
        type: ['1'], // 下单规则
        allStores: true,
        allSpecs: true,
        ruleType: 1, // 循环0/阶梯1
        uint: 0, // 满减门槛元/件 0元1件
        ruleList: [
          {
            uint: 0,
            threshold: '', // 满减门槛金额
            giftOrNot: 0, // 是否赠送赠品默认0否，1是
            order_full: true,
            discountType: 1, //  减价类型0减价1打折
            discount0: '', // 金额；
            discount1: '' // 折扣
          }
        ]
      },
      initRuleFull: {
        threshold: '', // 满减门槛金额
        giftOrNot: 0,
        order_full: true,
        discountType: 1, // 折1/减价0
        discount0: '',
        discount1: ''
      },
      chooseStore: [],
      allStore: [],
      storeSelectGoods: [],
      allStoreGoods: [],
      giftList: [], // 赠品列表
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activitTime: [
          {
            required: true,
            validator: checkActivitTime,
            trigger: 'change'
          }
        ]
      },
      pageLoading: ''
    }
  },
  created() {
    this.activeName = this.$route.query.type || 'basic'
  },
  methods: {
    handleTimeChange(row) {
      console.log('活动时间', row)
      if (row) {
        this.form.startTime = row[0]
        this.form.endTime = row[1]
      }
      // 此时需要需查询店铺和商品信息；
    },
    handleStoreChange() {
      console.log('活动范围门店变更')
    },
    handleProductChange() {
      console.log('活动范围活动商品变更')
    },
    // 校验满减门槛金额设置
    validThreshold(rule, value, callback) {
      console.log('校验满减门槛金额设置', rule, value)
      const index = rule.field.split('.')[1]
      // console.log('---------', this.form.ruleList[index].uint)
      if (!value) {
        return callback(new Error('满减门槛不能为空'))
      }
      if (!value || value <= 0) {
        return callback(new Error('满减门槛必须大于0'))
      }
      // 元
      if (this.form.uint === 0) {
        if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value)) {
          return callback(new Error('必须为大于0.01的正数'))
        }
      }
      // 件
      if (this.form.uint === 1) {
        if (!/^[1-9]\d*$/.test(value)) {
          return callback(new Error('必须为大于0的正整数'))
        }
      }
      // 后续的数值必须大于前面的金额
      if (this.form.ruleList.length > 1) {
        console.log('后续的数值必须大于前面的金额', this.form.ruleList, index)
        // this.form.ruleList.forEach((element,index) => {
        if (index >= 1) {
          console.log(
            '我是金额',
            this.form.ruleList[index].threshold,
            this.form.ruleList[index - 1].threshold
          )
          if (
            this.form.ruleList[index].threshold <=
            this.form.ruleList[index - 1].threshold
          ) {
            return callback(new Error('此项金额必须大于前一项金额'))
          }
        }
        // })
      }

      callback()
    },
    // 校验优惠内容满减金额优惠
    validAmountPrice(rule, value, callback) {
      // 如果选择的是打折那么范围为0.1-10
      // 如果选择是元那么打折的范围为0-99999999
      console.log('111111', rule, value)
      const index = rule.field.split('.')[1]
      if (this.form.ruleList[index].discountType === 0) {
        if (!value) {
          return callback(new Error('请输入折扣金额'))
        }
        if (
          !/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value) ||
          value <= 0
        ) {
          return callback(new Error('必须为大于0.01的正数'))
        }
        if (value > 99999999) {
          return callback(new Error('不可大于99999999'))
        }
        this.form.ruleList[index].discount = value
      }
      callback()
    },
    // 校验优惠内容满减折扣优惠
    validDiscountPrice(rule, value, callback) {
      // 如果选择的是打折那么范围为0.1-10
      // 如果选择是元那么打折的范围为0-99999999
      console.log('2222-validDiscountPrice', rule, value)
      const index = rule.field.split('.')[1]
      if (this.form.ruleList[index].discountType === 1) {
        if (!value) {
          return callback(new Error('请输入折扣力度'))
        }
        if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1})?)$/.test(value) || value <= 0) {
          return callback(new Error('必须为大于0.1的正数'))
        }
        if (value >= 10) {
          return callback(new Error('必须小于10'))
        }
        this.form.ruleList[index].discount = value
      }
      callback()
    },
    handleSelectStore(val) {
      console.log('门店结果页出来了-------', val)
      this.chooseStore = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    handleSelectGoods(val) {
      this.storeSelectGoods = val
      this.$refs.storeGods.dataFrom(val)
    },
    handleGiftList(list) {
      console.log('提交的数据-----赠品列表', list)
      this.giftList = list
    },
    // 追加优惠层级
    handleAdd() {
      // 追加优惠层级需要根据第一层的设置来决定第二层的门槛
      // 如果第一层设置为件数，那么后续只能设置为件数，并且只能打折
      this.form.ruleList = this.form.ruleList.concat({
        ...this.initRuleFull
      })
    },
    // 删除层级
    handleDelete(index) {
      // const data = this.form.ruleList.slice(index, 1)
      const data = JSON.parse(JSON.stringify(this.form.ruleList))
      console.log('data', index, this.form.ruleList)
      data.splice(index, 1)
      console.log('data-------------', data)
      this.form.ruleList = data
    },
    // 满减规格设置
    unitChange(val) {
      console.log('unitChange----', val)
      // 满减门槛元/件 0元1件
      // 单位切换，优惠内容层级设置全部更新为与上级单位一致；
      this.form.ruleList.map(item => {
        return {
          ...item,
          discountType: val,
          uint: val
        }
      })
    },
    ruleTypeChange(val) {
      console.log('ruleTypeChange----', val)
      if (val === 0) {
        this.form.ruleList = [{ ...this.initRuleFull }]
        this.form.uint = 0
      }
    },

    onSubmit() {
      //
      console.log('我是格式话表单提交数据----------------', this.form)
      this.$refs.form.validate(valid => {
        if (valid) {
          if (new Date(this.form.startTime).getTime() < new Date().getTime()) {
            this.$message.warning('活动开始时间不能小于当前时间')
            return
          }
          let dataParam = {}
          dataParam = _.pick(this.form, [
            'allSpecs',
            'allStores',
            'endTime',
            'startTime',
            'name'
          ])
          // 需要增加组装的参数    userCoupons  pmtRule:{ruleList, ruleType} activitySpecList storeIds merCode: this.merCode,
          if (Array.isArray(this.form.type) && this.form.type.length) {
            const index = this.form.type.findIndex(item => item === '1')
            if (index >= 0) {
              dataParam.userCoupons = 3
            } else {
              dataParam.userCoupons = 0
            }
          }
          dataParam = {
            ...dataParam,
            merCode: this.merCode,
            pmtRule: {
              ruleType: this.form.ruleType,
              ruleList: this.form.ruleList
            }
          }
          // createActFull(dataParam).then(res => {
          //   this.$message({
          //     message: '创建成功',
          //     type: 'success'
          //   })
          // })
        } else {
          console.log('error submit!!', valid)
          return false
        }
      })
    },
    delSelectStore(item, index) {
      console.log('item, index', item, index, this.chooseStore)
      this.chooseStore.splice(index, 1)
      this.$refs.selectStoreComponent.dataFrom(this.chooseStore)
    },
    delSelectGoods(item, index) {
      console.log('item, index', item, index)
      this.storeSelectGoods.splice(index, 1)
      this.$refs.storeGods.dataFrom(this.storeSelectGoods)
      // this.storeSelectGoods = this.storeSelectGoods
    },
    // 订单金额优惠复选款选择
    orderFullChange(e, i) {
      console.log('orderFullChange', e, i)
      this.form.ruleList[i].discountType === 0
      console.log(this.form)
      // this.$set(this.form)
    }
  },

  beforeRouteLeave(to, from, next) {
    next(false)
    this.$confirm(
      '检测到未保存的内容，是否在离开页面前保存修改？',
      '确认信息',
      {
        distinguishCancelAndClose: true,
        confirmButtonText: '保存',
        cancelButtonText: '放弃修改'
      }
    )
      .then(() => {
        this.$message({
          type: 'info',
          message: '保存修改'
        })
      })
      .catch(action => {
        next()
      })
  }
}
</script>

<style lang="scss">
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-container {
  position: relative;
  .form-title {
    line-height: 14px;
    font-size: 14px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .el-select .el-input {
    width: 60px;
  }
  // .input-with-select .el-input-group__append {
  //   background-color: #fff;
  // }
  .choose-store-box {
    width: 500px;
    height: 100px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 5px;
    overflow-y: auto;
    .el-tag {
      margin-right: 10px;
      max-width: 150px;
      @extend .text-overflow-1;
    }
  }
  .section-group-item {
    margin: 10px 0;
  }
  .action-wapper {
    position: absolute;
    padding: 12px;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    text-align: right;
  }
}
</style>
