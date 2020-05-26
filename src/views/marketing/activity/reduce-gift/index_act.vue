<template>
  <div v-loading="pageInfoloading" class="app-container">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      size="small"
      :disabled="disabled"
      label-width="120px"
    >
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
      <el-form-item label="活动范围：" prop="allStore" required>
        <el-radio-group v-model="form.allStore" @change="handleStoreChange">
          <el-radio :label="true">全部门店</el-radio>
          <el-radio :label="false">部分门店</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-show="!form.allStore">
        <!-- storeComponent -->
        <el-button
          type="primary"
          plain
          @click="$refs.storeComponent.open()"
        >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
      </el-form-item>
      <!-- 门店列表 -->
      <el-form-item v-show="!form.allStore">
        <select-store ref="selectStoreComponent" @del-item="delSelectStore" />
      </el-form-item>
      <el-form-item label="活动商品：" prop="allSpec" required>
        <el-radio-group v-model="form.allSpec" @change="handleProductChange">
          <el-radio :label="true">全部商品</el-radio>
          <el-radio :label="false">部分商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 选择的商品列表 -->
      <el-form-item v-show="!form.allSpec">
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
          <el-tooltip class="item" effect="dark" placement="top-start">
            <div slot="content">
              循环次数说明
              <br>循环满减最多循环1000次，比如每满100减10元，最多减10000元
            </div>
            <el-radio :label="0">
              循环满减
              <i class="el-icon-question" />
            </el-radio>
          </el-tooltip>
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
      <el-form-item label="优惠方式：" required>
        <el-radio-group v-model="form.discountType" @change="discountTypeChange">
          <el-radio :label="0" :disabled="form.uint === 1">直减（元）</el-radio>
          <el-radio :label="1">折扣</el-radio>
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
            v-model="domain.checkOrNot"
            border
            @input.native="orderFullChange($event, $Index)"
          >订单金额优惠</el-checkbox>
        </el-form-item>
        <el-form-item
          v-show="domain.checkOrNot && form.discountType === 1"
          style="margin-left: 30px; margin-bottom: 0px"
        >
          <div style="display: flex; flex-direction: row">
            <el-form-item>
              <el-radio v-model="form.discountType" :label="1">打</el-radio>
            </el-form-item>
            <el-form-item
              :prop="'ruleList.'+ $Index + '.discount'"
              :rules="{
                validator:validDiscountPrice, trigger: 'change'
              }"
            >
              <el-input
                v-model="domain.discount"
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
          v-show="domain.checkOrNot && form.discountType === 0"
          style="margin-left: 30px; margin-bottom: 0px"
        >
          <div style="display: flex; flex-direction: row">
            <el-form-item>
              <el-radio v-model="form.discountType" :label="0">减</el-radio>
            </el-form-item>
            <el-form-item
              :prop="'ruleList.'+ $Index + '.discount'"
              :rules="{
                validator:validAmountPrice, trigger: 'change'
              }"
            >
              <el-input
                v-model="domain.discount"
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
            <el-button
              v-if="!!domain.giftOrNot"
              type="text"
              @click="handleOpenGiftDialog($Index)"
            >选择赠品</el-button>
          </template>
        </el-form-item>
        <el-form-item v-show="!!domain.giftOrNot">
          <select-gift-list
            ref="selectGiftComponent"
            :table-data="domain.giftList"
            :gift-index="$Index"
            @del-item="delSelectGifts"
          />
        </el-form-item>
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
        <el-button
          v-if="!disabled"
          type="primary"
          style="width: 120px; margin-top: 20px"
          @click="onSubmit"
        >{{ edit?'更新':'提交' }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 选择主商品组件 -->
    <store-goods ref="GoodsComponent" :list="storeSelectGoods" @on-change="handleSelectGoods" />
    <!-- 门店列表 -->
    <store-dialog ref="storeComponent" :list="chooseStore" @complete="handleSelectStore" />
    <!-- 选择赠品组件 -->
    <store-goods-gifts ref="storeGiftsComponent" :limit-max="1" @commit="handleGiftList" />
  </div>
</template>

<script>
import _ from 'lodash'
import storeGoods from '../../components/store-gods'
import storeGoodsGifts from '../../components/store-gods-gifts'
import selectGiftList from '../../components/select-gift-list'
import storeDialog from '../../components/store'
import selectStore from '../../components/select-store'
import selectGoods from '../../components/select-goods'
import { createActFull, getActFull, updateActFull } from '@/api/activity'
import { mapGetters } from 'vuex'

export default {
  components: {
    storeGoods,
    storeDialog,
    storeGoodsGifts,
    selectStore,
    selectGoods,
    selectGiftList
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
      disabled: false, // 当前页面是否可编辑
      activityId: '', // 活动id
      edit: false,
      form: {
        type: ['1'], // 下单规则
        allStore: true,
        allSpec: true,
        ruleType: 1, // 循环0/阶梯1
        uint: 0, // 满减门槛元/件 0元1件
        discountType: 0, // 减价类型0减价1打折
        ruleList: [
          {
            uint: 0,
            discountType: 0,
            threshold: '', // 满减门槛金额
            giftOrNot: false, // 是否赠送赠品默认0否，1是
            checkOrNot: true, // 0/false 否 1/true是
            discount: '', // 金额；
            giftList: [] // 选择的赠品列表
          }
        ]
      },
      initRuleFull: {
        threshold: '', // 满减门槛金额
        giftOrNot: false,
        checkOrNot: true,
        discount: '',
        giftList: [] // 选择的赠品列表
      },
      chooseStore: [], // 选择的门店
      storeSelectGoods: [], // 选择的门店商品数据---去重的
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
      pageLoading: '',
      pageInfoloading: false,
      leaveAction: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    console.log(this.$route)
    if (this.$route.query.id) {
      this.activityId = this.$route.query.id
      this.disabled = this.$route.query.id && !this.$route.query.edit // 当前页面为查看
      this.edit = this.$route.query.id && this.$route.query.edit // 当前页面为编辑
      this.getActFullInfo(this.$route.query.id)
    }
  },
  methods: {
    // 查询活动详情
    getActFullInfo(id) {
      this.pageInfoloading = true
      getActFull(id)
        .then(res => {
          console.log('查询活动详情0', res)
          this.pageInfoloading = false
          if (res.code === '10000') {
            const { data } = res
            // 转换activityDetail 去除数据
            // ruleType, uint discountType
            let ruleType, uint, discountType, ruleList_af
            if (
              data.activityDetail &&
              data.activityDetail.ruleList &&
              Array.isArray(data.activityDetail.ruleList)
            ) {
              ruleType = data.activityDetail.ruleList[0].ruleType
              uint = data.activityDetail.ruleList[0].uint
              discountType = data.activityDetail.ruleList[0].discountType
              // 转换giftOrNot checkOrNot
              ruleList_af = data.activityDetail.ruleList.map(item => {
                return {
                  ...item,
                  checkOrNot: !!item.checkOrNot,
                  giftOrNot: !!item.giftOrNot,
                  giftList: item.giftSpecDTO
                }
              })
            }
            this.form = {
              name: data.pmtName,
              activitTime: [data.startTime, data.endTime],
              allStore: !!data.isAllStore,
              allSpec: false,
              type: data.userCoupons === 3 ? ['1'] : [],
              ruleType,
              uint,
              discountType,
              ruleList: ruleList_af,
              startTime: data.startTime,
              endTime: data.endTime
            }
            this.chooseStore = data.storeResDTOList
            this.$refs.selectStoreComponent.dataFrom(data.storeResDTOList)
            this.storeSelectGoods = data.commList
            this.$refs.storeGods.dataFrom(data.commList)
            // this.$refs.selectGiftComponent.dataFrom(item.giftSpecDTO)
          }
        })
        .catch(e => {
          console.log('查询活动详情0---err', e)
          this.pageInfoloading = false
        })
    },
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
        if (index >= 1) {
          console.log(
            '我是金额',
            this.form.ruleList[index].threshold,
            this.form.ruleList[index - 1].threshold
          )
          if (
            Number(this.form.ruleList[index].threshold || 0) <=
            Number(this.form.ruleList[index - 1].threshold || 0)
          ) {
            return callback(new Error('此项金额必须大于前一项金额'))
          }
        }
      }

      callback()
    },
    // 校验优惠内容满减金额优惠
    validAmountPrice(rule, value, callback) {
      // 如果选择的是打折那么范围为0.1-10
      // 如果选择是元那么打折的范围为0-99999999
      console.log('111111', rule, value)
      const index = rule.field.split('.')[1]
      if (this.form.discountType === 0) {
        if (!value) {
          return callback(new Error('请输入满减金额'))
        }
        if (
          !/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value) ||
          value <= 0
        ) {
          return callback(new Error('必须为大于0.01的正数'))
        }
        if (value > 99999999) {
          return callback(new Error('满减金额不可大于99999999'))
        }
        // 后续的数值必须大于前面的金额
        if (this.form.ruleList.length > 1) {
          if (index >= 1) {
            if (
              Number(this.form.ruleList[index].discount || 0) <=
              Number(this.form.ruleList[index - 1].discount || 0)
            ) {
              return callback(new Error('此项满减金额必须大于前一项满减金额'))
            }
          }
        }
      }
      callback()
    },
    // 校验优惠内容满减折扣优惠
    validDiscountPrice(rule, value, callback) {
      // 如果选择的是打折那么范围为0.1-10
      // 如果选择是元那么打折的范围为0-99999999
      console.log('2222-validDiscountPrice', rule, value)
      const index = rule.field.split('.')[1]
      if (this.form.discountType === 1) {
        if (!value) {
          return callback(new Error('请输入折扣力度'))
        }
        if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1})?)$/.test(value) || value <= 0) {
          return callback(new Error('必须为大于0.1的正数'))
        }
        if (value >= 10) {
          return callback(new Error('折扣力度必须小于10'))
        }
        if (this.form.ruleList.length > 1) {
          if (index >= 1) {
            if (
              Number(this.form.ruleList[index].discount || 0) >
              Number(this.form.ruleList[index - 1].discount || 0)
            ) {
              return callback(new Error('此项折扣力度必须大于前一项折扣力度'))
            }
          }
        }
      }
      callback()
    },
    handleSelectStore(val) {
      console.log(
        '门店结果页出来了-------',
        val,
        this.$refs.selectStoreComponent
      )
      this.chooseStore = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    handleSelectGoods(val) {
      this.storeSelectGoods = val
      this.$refs.storeGods.dataFrom(val)
    },
    handleOpenGiftDialog($Index) {
      this.$refs.storeGiftsComponent.open($Index)
      this.$refs.storeGiftsComponent.dialogSelect(
        this.form.ruleList[$Index].giftList
      )
    },
    handleGiftList(list, index) {
      console.log('提交的数据-----赠品列表', list, this.$refs)
      this.form.ruleList[index].giftList = list
      console.log(
        '提交的数据-----赠品列表',
        list,
        this.$refs.selectGiftComponent
      )
      this.$refs.selectGiftComponent[index].dataFrom(list)
    },
    // 追加优惠层级
    handleAdd() {
      // 追加优惠层级需要根据第一层的设置来决定第二层的门槛
      // 如果第一层设置为件数，那么后续只能设置为件数，并且只能打折
      this.form.ruleList = this.form.ruleList.concat({
        ...this.initRuleFull,
        discountType: this.form.discountType,
        uint: this.form.uint
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
          uint: val
        }
      })
      if (val === 1) {
        this.form.discountType = 1
      }
    },
    discountTypeChange(val) {
      const data = this.form.ruleList.map(item => {
        return {
          ...item,
          discountType: val
        }
      })
      this.form.ruleList = data
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
            'allSpec',
            'allStore',
            'endTime',
            'startTime',
            'name'
          ])
          // 需要增加组装的参数    userCoupons  pmtRule:{ruleList, ruleType} activitySpecList storeIds merCode: this.merCode,
          if (Array.isArray(this.form.type)) {
            const index = this.form.type.findIndex(item => item === '1')
            if (index >= 0) {
              dataParam.userCoupons = 3
            } else {
              dataParam.userCoupons = 0
            }
          }
          const ruleList_af = this.form.ruleList.map(item => {
            let giftSpecIds = []
            if (Array.isArray(item.giftList)) {
              giftSpecIds = item.giftList.map(giftItem => giftItem.id)
            }
            return {
              ...item,
              giftOrNot: item.giftOrNot ? 1 : 0,
              checkOrNot: item.checkOrNot ? 1 : 0,
              uint: this.form.uint,
              discountType: this.form.discountType,
              ruleType: this.form.ruleType,
              giftSpecId: Array.isArray(giftSpecIds) && item.giftOrNot
                ? giftSpecIds.join(',')
                : ''
            }
          })
          // 解析门店
          const storeIdData = []
          const specIdData = []
          if (!this.form.allStore) {
            this.chooseStore.forEach(element => {
              storeIdData.push(element.id)
            })
          }
          if (!this.form.allSpec) {
            this.storeSelectGoods.forEach(element => {
              specIdData.push({
                specId: element.specId,
                name: element.name
              })
            })
          }
          dataParam = {
            ...dataParam,
            merCode: this.merCode,
            id: this.activityId,
            activitySpecList: specIdData, //
            storeIds: storeIdData,
            pmtRule: {
              ruleType: this.form.ruleType,
              ruleList: ruleList_af
            }
          }
          console.log('待提交数据-----', dataParam)
          this.leaveAction = true
          const loading = this.$loading({
            lock: true,
            text: '努力创建中，请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (this.edit) {
            updateActFull(dataParam)
              .then(res => {
                this.$message({
                  message: '更新成功',
                  type: 'success'
                })
                loading.close()
                this.$router.replace('/marketing/activity/reduce-gift-list')
              })
              .catch(() => {
                loading.close()
              })
          } else {
            createActFull(dataParam)
              .then(res => {
                this.$message({
                  message: '创建成功',
                  type: 'success'
                })
                loading.close()
                this.$router.replace('/marketing/activity/reduce-gift-list')
              })
              .catch(() => {
                loading.close()
              })
          }
        } else {
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
    delSelectGifts(item, index, giftIndex) {
      console.log(item, index)
      this.form.ruleList[giftIndex].giftList.splice(index, 1)

      this.$refs.selectGiftComponent[index].dataFrom(this.form.ruleList[giftIndex].giftList)
    },
    // 订单金额优惠复选款选择
    orderFullChange(e, i) {
      console.log('orderFullChange', e, i)
      this.form.ruleList[i].discountType === 0
      console.log(this.form)
    }
  },

  beforeRouteLeave(to, from, next) {
    if (this.disabled || this.leaveAction) {
      this.$store.dispatch('tagsView/delView', from)
      next()
      if (this.pageLoading) {
        this.pageLoading.close()
      }
    } else {
      const answer = window.confirm('你还有数据没有保存，是否确认退出')
      if (answer) {
        if (this.pageLoading) {
          this.pageLoading.close()
        }
        this.$store.dispatch('tagsView/delView', from)
        next()
      } else {
        next(false)
      }
    }
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
