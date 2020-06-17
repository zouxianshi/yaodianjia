<template>
  <div v-loading="pageInfoloading" class="app-container">
    <el-form ref="form" :model="form" :rules="rules" size="small" label-width="120px">
      <div class="form-title">基本信息</div>
      <el-form-item ref="name" label="活动名称：" prop="name">
        <el-input
          v-model="form.name"
          placeholder="不超过30字"
          style="width: 380px;"
          maxlength="30"
          show-word-limit
          :disabled="disabled"
        />
      </el-form-item>
      <el-form-item label="活动底图：">
        <el-radio-group v-model="form.img" :disabled="disabled">
          <el-radio label="1">不添加</el-radio>
          <el-radio label="2">添加</el-radio>
        </el-radio-group>
        <template v-if="form.img==='2'">
          <div class="select-picture">
            <el-upload
              class="avatar-uploader"
              :action="upLoadUrl"
              :show-file-list="false"
              :headers="headers"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
              :on-error="handleImgError"
              :disabled="disabled"
            >
              <el-image v-if="form.imgUrl" :src="showImg(form.imgUrl)" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
            <div class="select-btn">
              <div>上传图片尺寸比例建议：3:1</div>
            </div>
          </div>
        </template>
      </el-form-item>
      <el-form-item label="活动描述：">
        <el-input
          v-model="form.description"
          :disabled="disabled"
          type="textarea"
          :placeholder="disabled ? '':'不超过200字'"
          maxlength="200"
          :rows="4"
          show-word-limit
          style="width: 380px;"
        />
      </el-form-item>
      <el-form-item ref="activitTime" label="活动时间：" prop="activitTime">
        <el-date-picker
          v-model="form.activitTime"
          :disabled="disabled"
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
      <!-- <el-form-item label="活动范围：" prop="allStore" required>
        <el-radio-group v-model="form.allStore" :disabled="disabled">
          <el-radio :label="true">全部门店</el-radio>
          <el-radio :label="false">部分门店</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item v-show="!form.allStore || disabled || edit" label="活动范围：" required>
        <!-- storeComponent -->
        <el-button
          type="primary"
          plain
          :disabled="disabled"
          @click="$refs.storeComponent.open()"
        >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
      </el-form-item>
      <!-- 门店列表 -->
      <el-form-item v-show="!form.allStore || disabled || edit">
        <select-store ref="selectStoreComponent" :disabled="disabled" @del-item="delSelectStore" />
      </el-form-item>
      <!-- <el-form-item label="活动商品：" prop="allSpec" required>
        <el-radio-group v-model="form.allSpec" :disabled="disabled">
          <el-radio :label="true">全部商品</el-radio>
          <el-radio :label="false">部分商品</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <!-- 选择的商品列表 -->
      <el-form-item v-show="!form.allSpec || disabled || edit" label="活动商品：" required>
        <div style="margin-bottom: 8px">
          <el-button
            type="primary"
            plain
            size="small"
            :disabled="disabled"
            @click="$refs.GoodsComponent.open()"
          >选择商品 | 已选（{{ storeSelectGoods.length }}）</el-button>
        </div>
        <select-goods ref="storeGods" :disabled="disabled" @del-item="delSelectGoods" />
      </el-form-item>
      <el-form-item ref="type" label="下单规则：" prop="type">
        <el-checkbox-group v-model="form.type" :disabled="disabled">
          <el-tooltip class="item" effect="dark" content="参加满减是否使用优惠" placement="top-end">
            <el-checkbox label="1" name="type">
              优惠券
              <i class="el-icon-question" />
            </el-checkbox>
          </el-tooltip>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item ref="ruleType" label="活动规则：" prop="ruleType" required>
        <el-radio-group v-model="form.ruleType" :disabled="disabled" @change="ruleTypeChange">
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
        <el-radio-group v-model="form.uint" :disabled="disabled" @change="unitChange">
          <el-radio :label="0">订单金额（元）</el-radio>
          <el-radio :label="1" :disabled="form.ruleType === 0">商品数量（件）</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item label="优惠方式：" required>
        <el-radio-group v-model="form.discountType" @change="discountTypeChange">
          <el-radio :label="0" :disabled="form.uint === 1">直减（元）</el-radio>
          <el-radio :label="1">折扣</el-radio>
        </el-radio-group>
      </el-form-item>-->
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
            :disabled="disabled"
            @click="handleDelete($Index)"
          />
        </el-divider>
        <el-form-item
          :ref="'ruleList.'+ $Index + '.threshold'"
          label="满减门槛："
          :prop="'ruleList.'+ $Index + '.threshold'"
          :rules="{
            required: true, validator:validThreshold, trigger: 'change'
          }"
        >
          <el-input
            v-model="domain.threshold"
            :disabled="disabled"
            style="width: 200px"
            class="input-with-select"
          >
            <template slot="append">{{ form.uint === 0 ? '元':'件' }}</template>
          </el-input>
        </el-form-item>
        <el-form-item
          v-show="false"
          :ref="'ruleList.'+ $Index + '.uint'"
          :prop="'ruleList.'+ $Index + '.uint'"
        >
          <el-input v-model="domain.uint" :disabled="disabled" />
        </el-form-item>
        <el-form-item label="优惠内容：" required>
          <el-checkbox
            v-model="domain.checkOrNot"
            :disabled="disabled"
            border
            @input.native="orderFullChange($event, $Index)"
          >订单金额优惠</el-checkbox>
        </el-form-item>
        <!-- v-show="domain.checkOrNot && form.discountType === 1" -->
        <el-form-item style="margin-left: 30px; margin-bottom: 0px">
          <div style="display: flex; flex-direction: row">
            <el-form-item>
              <el-radio
                v-model="domain.discountType"
                :disabled="!domain.checkOrNot || form.ruleType === 0 || disabled"
                :label="1"
                @change="validDiscountType($Index, 'discount1')"
              >打</el-radio>
            </el-form-item>
            <el-form-item
              :ref="'ruleList.'+ $Index + '.discount1'"
              :prop="'ruleList.'+ $Index + '.discount1'"
              :rules="{
                validator:validDiscountPrice, trigger: 'change'
              }"
            >
              <el-input
                v-model="domain.discount1"
                style="width: 200px; margin-left: 10px"
                class="input-with-select"
                :disabled="!domain.checkOrNot || domain.discountType !== 1 || form.ruleType === 0 || disabled"
              >
                <template slot="append">折</template>
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>
        <!-- v-show="domain.checkOrNot && form.discountType === 0" -->
        <el-form-item style="margin-left: 30px; margin-bottom: 0px">
          <div style="display: flex; flex-direction: row">
            <el-form-item>
              <el-radio
                v-model="domain.discountType"
                :disabled="!domain.checkOrNot || form.uint === 1 || disabled"
                :label="0"
                @change="validDiscountType($Index, 'discount0')"
              >减</el-radio>
            </el-form-item>
            <el-form-item
              :ref="'ruleList.'+ $Index + '.discount0'"
              :prop="'ruleList.'+ $Index + '.discount0'"
              :rules="{
                validator:validAmountPrice, trigger: 'change'
              }"
            >
              <el-input
                v-model="domain.discount0"
                style="width: 200px; margin-left: 10px"
                class="input-with-select"
                :disabled="!domain.checkOrNot || form.uint === 1 || domain.discountType !== 0 || disabled"
              >
                <template slot="append">元</template>
              </el-input>
            </el-form-item>
          </div>
        </el-form-item>

        <el-form-item>
          <template>
            <el-checkbox v-model="domain.giftOrNot" :disabled="disabled" border>送赠品</el-checkbox>
            <el-button
              v-if="!!domain.giftOrNot"
              :disabled="disabled"
              type="text"
              @click="handleOpenGiftDialog($Index)"
            >选择赠品</el-button>
          </template>
        </el-form-item>
        <el-form-item v-show="!!domain.giftOrNot">
          <select-gift-list
            ref="selectGiftComponent"
            :table-data="domain.giftList"
            :disabled="disabled"
            :gift-index="$Index"
            @del-item="delSelectGifts"
          />
        </el-form-item>
      </div>
      <el-divider
        v-if="form.ruleType === 1 && Array.isArray(form.ruleList) && form.ruleList.length < 5 && !disabled"
        content-position="left"
      >
        <el-tooltip
          effect="dark"
          content="最多支持五级优惠，每级优惠不叠加，如：满足二级优惠条件后则不再享有一级优惠。"
          placement="top-start"
        >
          <el-button plain type="warning" size="mini" :disabled="disabled" @click="handleAdd">
            添加层级
            <i class="el-icon-question" />
          </el-button>
        </el-tooltip>
      </el-divider>
    </el-form>
    <!-- 操作按钮 -->
    <div class="action-wapper">
      <el-button
        v-if="!disabled"
        type="primary"
        :disabled="disabled"
        @click="onSubmit"
      >{{ edit?'更新':'保存' }}</el-button>
      <el-button @click="$router.go(-1)">返 回</el-button>
    </div>
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :list="storeSelectGoods"
      :store-ids="form.allStore?[]:chooseStore.map(item => item.id)"
      @on-change="handleSelectGoods"
    />
    <!-- 门店列表 -->
    <store-dialog ref="storeComponent" :list="chooseStore" @complete="handleSelectStore" />
    <!-- 选择赠品组件 -->
    <store-goods-gifts ref="storeGiftsComponent" :limit-max="5" @commit="handleGiftList" />
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
import { checkNumberdouble } from '@/utils/validate'
import config from '@/utils/config'
import { throttle } from '@/utils/throttle'

export default {
  name: 'ReduceGift',
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
        allStore: false,
        allSpec: false,
        imgUrl: '',
        description: '',
        ruleType: 1, // 循环0/阶梯1
        img: '1',
        uint: 0, // 满减门槛元/件 0元1件
        ruleList: [
          {
            uint: 0,
            discountType: 1, // 0元1折
            threshold: '', // 满减门槛金额
            giftOrNot: false, // 是否赠送赠品默认0否，1是
            checkOrNot: true, // 0/false 否 1/true是
            discount0: '', // 金额；
            discount1: '', // 打折；
            giftList: [] // 选择的赠品列表
          }
        ]
      },
      initRuleFull: {
        // 这个是在添加层级时用到的数据格式
        discountType: 1,
        threshold: '', // 满减门槛金额
        giftOrNot: false,
        checkOrNot: true,
        discount0: '',
        discount1: '',
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
    ...mapGetters(['token', 'merCode']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  created() {
    console.log(this.$route)
    if (this.$route.query.id) {
      this.activityId = this.$route.query.id
      this.disabled = this.$route.query.id && !!this.$route.query._ck // 当前页面为查看
      this.edit = this.$route.query.id && !this.$route.query._ck // 当前页面为编辑
      this.getActFullInfo(this.$route.query.id)
    }
  },
  mounted() {
    let title = ''
    title = this.$route.query.id
      ? !this.$route.query._ck
        ? '编辑满减满赠'
        : '查看满减满赠详情'
      : '创建满减满赠'
    this.$route.meta.title = title
    this.$store.dispatch('tagsView/updateVisitedView', {
      ...this.$route,
      meta: {
        ...this.$route.meta,
        title
      },
      title
    })
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
            let ruleType, uint, ruleList_af
            // let ruleType, uint, discountType, ruleList_af
            if (
              data.activityDetail &&
              data.activityDetail.ruleList &&
              Array.isArray(data.activityDetail.ruleList)
            ) {
              ruleType = data.activityDetail.ruleList[0].ruleType
              uint = data.activityDetail.ruleList[0].uint
              // discountType = data.activityDetail.ruleList[0].discountType
              // 转换giftOrNot checkOrNot
              ruleList_af = data.activityDetail.ruleList.map(item => {
                return {
                  ...item,
                  checkOrNot: !!item.checkOrNot,
                  giftOrNot: !!item.giftOrNot,
                  giftList: Array.isArray(item.giftSpecDTO) ? item.giftSpecDTO : [],
                  discountType: item.discountType,
                  [`discount${item.discountType}`]: item.discount
                }
              })
            }
            this.form = {
              name: data.pmtName,
              activitTime: [data.startTime, data.endTime],
              allStore: !!data.allStore,
              allSpec: !!data.allSpec,
              type: data.userCoupons === 3 ? ['1'] : [],
              img: data.imgUrl ? '2' : '1',
              description: data.description,
              imgUrl: data.imgUrl,
              ruleType,
              uint,
              // discountType,
              ruleList: ruleList_af,
              startTime: data.startTime,
              endTime: data.endTime
            }
            console.log('-----------------', ruleList_af)
            this.chooseStore = Array.isArray(data.storeResDTOList)
              ? data.storeResDTOList
              : []
            this.$refs.selectStoreComponent.dataFrom(
              Array.isArray(data.storeResDTOList) ? data.storeResDTOList : []
            )
            this.storeSelectGoods = Array.isArray(data.commList)
              ? data.commList
              : []
            this.$refs.storeGods.dataFrom(
              Array.isArray(data.commList) ? data.commList : []
            )
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
        if (value > 99999999) {
          return callback(new Error('满减门槛不可大于99999999'))
        }
        if (!checkNumberdouble(value)) {
          return callback(new Error('请输入最多2位小数的正数'))
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
      const index = rule.field.split('.')[1]
      console.log('111111', rule, value, this.form.ruleList[index].threshold)
      if (
        this.form.ruleList[index].discountType === 0 &&
        this.form.ruleList[index].checkOrNot
      ) {
        if (!value) {
          return callback(new Error('请输入满减金额'))
        }
        if (value >= Number(this.form.ruleList[index].threshold || 0)) {
          return callback(new Error('优惠金额必须小于满减门槛'))
        }
        if (value > 99999999) {
          return callback(new Error('满减金额不可大于99999999'))
        }
        if (!checkNumberdouble(value)) {
          return callback(new Error('请输入最多2位小数的正数'))
        }
        // 后续的数值必须大于前面的金额
        // if (this.form.ruleList.length > 1) {
        //   if (index >= 1) {
        //     if (
        //       Number(this.form.ruleList[index].discount0 || 0) <=
        //       Number(this.form.ruleList[index - 1].discount0 || 0)
        //     ) {
        //       return callback(new Error('此项满减金额必须大于前一项满减金额'))
        //     }
        //   }
        // }
      }
      callback()
    },
    // 校验优惠内容满减折扣优惠
    validDiscountPrice(rule, value, callback) {
      // 如果选择的是打折那么范围为0.1-10
      // 如果选择是元那么打折的范围为0-99999999
      console.log('2222-validDiscountPrice', rule, value)
      const index = rule.field.split('.')[1]
      console.log('2222-validDiscountPrice---ruleList', this.form.ruleList)
      if (
        this.form.ruleList[index].discountType === 1 &&
        this.form.ruleList[index].checkOrNot
      ) {
        if (!value) {
          return callback(new Error('请输入折扣力度'))
        }
        if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1})?)$/.test(value) || value <= 0) {
          return callback(new Error('必须为大于0.1的正数且最多一位小数'))
        }
        if (value >= 10) {
          return callback(new Error('折扣力度必须小于10'))
        }
        // if (this.form.ruleList.length > 1) {
        //   if (index >= 1) {
        //     console.log('2222-validDiscountPrice---力度', this.form.ruleList)
        //     if (
        //       Number(this.form.ruleList[index].discount1 || 0) >=
        //       Number(this.form.ruleList[index - 1].discount1 || 0)
        //     ) {
        //       return callback(new Error('此项折扣力度必须大于前一项折扣力度'))
        //     }
        //   }
        // }
      }
      callback()
    },
    // 校验折扣方式
    validDiscountType(rule, value, callback) {
      console.log('11111=----validDiscountType', rule, value, this.$refs.form)
      if (value === 'discount1') {
        this.$refs.form.clearValidate()
      } else {
        this.$refs.form.clearValidate()
      }
    },
    handleSelectStore(val) {
      this.chooseStore = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    handleSelectGoods(val) {
      this.storeSelectGoods = val
      this.$refs.storeGods.dataFrom(val)
    },
    handleOpenGiftDialog($Index) {
      // 打开赠品列表组件 当前设置的层级索引 && 当前要回显的list数据
      this.$refs.storeGiftsComponent.open(
        $Index,
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
      // this.$refs.selectGiftComponent[index].dataFrom(list)
    },
    // 追加优惠层级
    handleAdd() {
      // 追加优惠层级需要根据第一层的设置来决定第二层的门槛
      // 如果第一层设置为件数，那么后续只能设置为件数，并且只能打折
      this.form.ruleList = this.form.ruleList.concat({
        ...this.initRuleFull,
        // discountType: this.form.discountType,
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
      // 单位切换，如果切换为件，那么优惠内容只能为打折，否则维持原状
      const data = this.form.ruleList.map(item => {
        return {
          ...item,
          uint: val,
          discountType: val === 1 ? 1 : item.discountType
        }
      })
      this.form.ruleList = data
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
      // 单位切换，如果切换为循环满减，那么优惠内容只能为减金额
      if (val === 0) {
        this.form.ruleList = [{ ...this.initRuleFull, discountType: 0 }]
        this.form.uint = 0
      }
    },
    beforeAvatarUpload(file) {
      const size = file.size / 1024
      const isImg =
        file.type === 'image/jpeg' ||
        file.type === 'image/png' ||
        file.type === 'image/jpg'
      if (!isImg) {
        this.$message({
          message: '只能上传格式为 jpg、jpeg、png的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return
      }
      if (size > 1024) {
        this.$message({
          message: '最大只能上传1MB的图片',
          type: 'warning'
        })
        this.pageLoading.close()
        return false
      }
      this.pageLoading = this.$loading({
        lock: true,
        text: '图片上传中...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return true
    },
    handleAvatarSuccess(res, file) {
      if (res.code === '10000') {
        this.form.imgUrl = res.data
        console.log('1111111111111111', res.data, this.form)
      } else {
        this.$message({
          message: res.msg,
          type: 'error'
        })
      }
      this.pageLoading.close()
    },
    handleImgError(row) {
      const data = JSON.parse(row.toString().replace('Error:', ''))
      if (data.code === 40301) {
        // location.reload()
      } else {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
        this.pageLoading.close()
      }
    },
    onSubmit: throttle(function() {
      //
      console.log('我是格式话表单提交数据----------------', this.form)
      this.$refs.form.validate((valid, object) => {
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
            'name',
            'imgUrl',
            'description'
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
          let ruleList_af = []
          try {
            ruleList_af = this.form.ruleList.map((item, index) => {
              let giftSpecIds = []
              if (Array.isArray(item.giftList)) {
                giftSpecIds = item.giftList.map(giftItem => giftItem.specId)
              }
              if (!item.giftOrNot && !item.checkOrNot) {
                throw new Error(`第${index + 1}项必须要选择一项优惠内容`)
              }
              if (item.giftOrNot && !giftSpecIds.length) {
                throw new Error(`第${index + 1}项已勾选赠品，但未选择赠品内容`)
              }
              return {
                ...item,
                giftOrNot: item.giftOrNot ? 1 : 0,
                checkOrNot: item.checkOrNot ? 1 : 0,
                uint: this.form.uint,
                discountType: item.discountType,
                ruleType: this.form.ruleType,
                discount: item[`discount${item.discountType}`],
                giftSpecId:
                  Array.isArray(giftSpecIds) && item.giftOrNot
                    ? giftSpecIds.join(',')
                    : ''
              }
            })
          } catch (error) {
            if (error) {
              this.$message.warning(error.message)
              return
            }
          }
          // 解析门店
          const storeIdData = []
          const specIdData = []
          if (!this.form.allStore) {
            this.chooseStore.forEach(element => {
              storeIdData.push(element.id)
            })
            if (Array.isArray(storeIdData) && !storeIdData.length) {
              this.$message.warning('门店不可为空')
              return
            }
          }
          if (!this.form.allSpec) {
            this.storeSelectGoods.forEach(element => {
              specIdData.push({
                specId: element.specId,
                name: element.name,
                manufacture: element.manufacture,
                erpCode: element.erpCode
              })
            })
            if (Array.isArray(specIdData) && !specIdData.length) {
              this.$message.warning('商品不可为空')
              return
            }
          }
          dataParam = {
            ...dataParam,
            imgUrl: this.form.img === '2' ? this.form.imgUrl : '',
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
          const loading = this.$loading({
            lock: true,
            text: '努力创建中，请稍后',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
          if (this.edit) {
            updateActFull(dataParam)
              .then(res => {
                loading.close()
                this.leaveAction = true
                this.resultData(res.data, '更新成功')
              })
              .catch(() => {
                loading.close()
              })
          } else {
            createActFull(dataParam)
              .then(res => {
                loading.close()
                this.leaveAction = true
                this.resultData(res.data, '创建成功')
              })
              .catch(() => {
                loading.close()
              })
          }
        } else {
          console.log('我是格式话表单提交数据----------------object', object)
          for (const i in object) {
            let dom = this.$refs[i]
            if (Object.prototype.toString.call(dom) !== '[object Object]') {
              // 这里是针对遍历的情况（多个输入框），取值为数组
              dom = dom[0]
            } // 第一种方法（包含动画效果）
            dom.$el.scrollIntoView({
              // 滚动到指定节点
              block: 'center', // 值有start,center,end，nearest，当前显示在视图区域中间
              behavior: 'smooth' // 值有auto、instant,smooth，缓动动画（当前是慢速的）
            })
            break // 因为我们只需要检测一项,所以就可以跳出循环了
          }
          return false
        }
      })
    }, 3000),
    resultData(data, msg) {
      if (data) {
        this.$alert(
          '<div><h3 style="font-weight: 600">活动已成功创建，但部分商品未添加活动成功，部分商品创建不成功的原因可能有：</h3> <p style="color: red">1. 同一时间段内，门店部分商品已参加了其他互斥的营销活动</p> <p style="color: red">2. 部分门店对应商品未上架，该门店商品活动无法创建</p></div>',
          '部分商品未添加成功提醒',
          {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '返回列表查看',
            callback: () => {
              this.$router.replace('/marketing/activity/list/14')
            }
          }
        )
      } else {
        this.$message.success(msg)
        this.$router.replace('/marketing/activity/list/14')
      }
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

      this.$refs.selectGiftComponent[index].dataFrom(
        this.form.ruleList[giftIndex].giftList
      )
    },
    // 订单金额优惠复选款选择
    orderFullChange(e, i) {
      console.log('orderFullChange', e, i)
      this.form.ruleList[i].discountType = 1
      // this.$set(this.form)
      console.log(this.form)
    }
  },
  beforeRouteLeave(to, from, next) {
    // 路由离开关闭标签
    if (this.leaveAction) {
      this.$store.dispatch('tagsView/delView', from)
    }
    next()
  }
}
</script>

<style lang="scss" scoped>
.text-overflow-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.app-container {
  // position: relative;
  margin-bottom: 80px;
  .form-title {
    line-height: 14px;
    font-size: 14px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px !important;
    text-align: center;
  }
  .select-picture {
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    .select-btn {
      margin-left: 10px;
      font-size: 12px;
      color: #8c939d;
    }
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
    text-align: center;
    z-index: 1;
  }
}
</style>
