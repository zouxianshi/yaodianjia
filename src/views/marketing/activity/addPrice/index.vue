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
      <div class="form-title">活动范围</div>
      <el-form-item label="门店范围：" prop="allStores" required>
        <el-radio-group v-model="form.allStores">
          <el-radio :label="true">全部门店</el-radio>
          <el-radio :label="false">部分门店</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item v-if="form.allStores === 1">已选当前上线的全部门店</el-form-item> -->
      <el-form-item v-show="form.allStores === 0">
        <!-- storeComponent -->
        <el-button
          type="primary"
          plain
          @click="$refs.storeComponent.open()"
        >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
        <!-- <store-dialog @complete="handleSelectStore">选择门店</store-dialog> -->
      </el-form-item>
      <!-- 门店列表 -->
      <el-form-item v-show="form.allStores === 0">
        <select-store ref="selectStoreComponent" @del-item="delSelectStore" />
      </el-form-item>
      <el-form-item label="商品范围：" prop="allStores" required>
        <el-radio-group v-model="form.allSpecs">
          <el-radio :label="true">全部商品</el-radio>
          <el-radio :label="false">部分商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item v-if="form.allSpecs === 1">已选当前上线的全部商品</el-form-item> -->
      <el-form-item v-show="form.allSpecs === 0">
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
      <div class="form-title">换购规则</div>
      <el-form-item label="活动门槛：" prop="threshold">
        <template>
          <el-input v-model="form.threshold" style="width: 100px; margin-right: 8px" />元
          <span class="info">以最终下单支付的金额计算</span>
        </template>
      </el-form-item>
      <el-form-item label="换购商品：" required>
        <span class="info">最多可选15个商品</span>
      </el-form-item>
      <el-form-item>
        <template>
          <el-button
            type="primary"
            plain
            style="margin-bottom: 8px"
            @click="$refs.storeGoodsComponent.open()"
          >选择换购商品 | 已选（{{ storeActivityGoods.length }}）</el-button>
        </template>
        <select-activity-goods ref="activityGod" @del-item="delActivityGoods" />
      </el-form-item>
      <el-form-item label="换购数量：" prop="confineNum">
        <template>
          <span>最多可换购</span>
          <el-input v-model="form.confineNum" style="width: 100px; margin-right: 8px" />
          <span>件</span>
          <span class="info">换购商品允许顾客下单时在商品的总换购数量</span>
        </template>
      </el-form-item>
      <el-form-item label="下单规则：" prop="type">
        <el-checkbox-group v-model="form.type">
          <el-tooltip class="item" effect="dark" content="参加加价购是否可使用优惠券" placement="top-end">
            <el-checkbox label="1" name="type">
              优惠券
              <i class="el-icon-question" />
            </el-checkbox>
          </el-tooltip>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width: 120px" @click="onSubmit">提交</el-button>
      </el-form-item>
    </el-form>
    <!-- 选取换购商品组件 -->
    <store-goods
      ref="storeGoodsComponent"
      :limit-max="15"
      :list="storeActivityGoods"
      @on-change="handleSelectActivityGoods"
    />
    <!-- 选择主商品组件 -->
    <store-goods ref="GoodsComponent" :list="storeSelectGoods" @on-change="handleSelectGoods" />
    <!-- 门店列表 -->
    <store-dialog ref="storeComponent" :list="chooseStore" @complete="handleSelectStore" />
  </div>
</template>

<script>
import _ from 'lodash'
import storeGoods from '../../components/store-gods'
import storeDialog from '../../components/store'
import selectStore from '../../components/select-store'
import selectGoods from '../../components/select-goods'
import selectActivityGoods from './_source/select-activity-goods'
import { createActAdd } from '@/api/activity'
import { mapGetters } from 'vuex'

export default {
  components: {
    storeGoods,
    storeDialog,
    selectGoods,
    selectStore,
    selectActivityGoods
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
    const checkThreshold = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入活动门槛'))
      }
      if (!/^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/.test(value) || value <= 0) {
        return callback(new Error('必须为大于0.01的正数'))
      }
      callback()
    }
    const checkActivityNum = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入换购数量'))
      }
      if (!/^[1-9]\d*$/.test(value) || value <= 0) {
        return callback(new Error('必须为大于0的正整数'))
      }
      if (value > 1000) {
        return callback(new Error('换购数量不可大于1000'))
      }
      callback()
    }
    return {
      form: {
        type: ['1'],
        allStores: true,
        allSpecs: true,
        threshold: ''
      },
      rules: {
        name: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        activitTime: [
          {
            required: true,
            validator: checkActivitTime,
            trigger: 'change'
          }
        ],
        threshold: [
          { required: true, validator: checkThreshold, trigger: 'blur' }
        ],
        confineNum: [
          { required: true, validator: checkActivityNum, trigger: 'blur' }
        ]
      },
      chooseStore: [],
      storeSelectGoods: [], // 选取的主商品
      storeActivityGoods: [] // 选区的换购商品
    }
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
    handleSelectStore(val) {
      console.log('门店结果页出来了-------', val)
      this.chooseStore = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    handleSelectGoods(val) {
      this.storeSelectGoods = val
      this.$refs.storeGods.dataFrom(val)
    },
    handleSelectActivityGoods(val) {
      this.storeActivityGoods = val
      this.$refs.activityGod.dataFrom(val)
    },
    // selectStore
    delActivityGoods(item, index) {
      console.log('item, index', item, index)
      this.storeActivityGoods.splice(index, 1)
      this.$refs.activityGod.dataFrom(this.storeActivityGoods)
      // this.storeActivityGoods = this.storeActivityGoods
    },
    delSelectGoods(item, index) {
      console.log('item, index', item, index)
      this.storeSelectGoods.splice(index, 1)
      this.$refs.storeGods.dataFrom(this.storeSelectGoods)
      // this.storeSelectGoods = this.storeSelectGoods
    },
    delSelectStore(item, index) {
      console.log('item, index', item, index, this.chooseStore)
      this.chooseStore.splice(index, 1)
      this.$refs.selectStoreComponent.dataFrom(this.chooseStore)
      // this.chooseStore = this.chooseStore
    },
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log('我准备通过了----------------------')
          this.$refs.activityGod
            .onsubmit()
            .then(res => {
              console.log('二次验证也通过了----------------------', res)
              // const dataParma = {}
              console.log(this.form)
              console.log(res)
              let dataParam = {}
              dataParam = _.pick(this.form, [
                'allSpecs',
                'allStores',
                'endTime',
                'startTime',
                'name'
              ])
              let userCoupons = ''
              // 需要增加组装的参数    userCoupons  pmtRule:{ruleList, confineNum, threshold, userCoupons} activitySpecList storeIds merCode: this.merCode,
              if (Array.isArray(this.form.type) && this.form.type.length) {
                const index = this.form.type.findIndex(item => item === '1')
                if (index >= 0) {
                  userCoupons = 3
                } else {
                  userCoupons = 0
                }
              }
              dataParam = {
                ...dataParam,
                merCode: this.merCode,
                pmtRule: {
                  confineNum: this.form.confineNum,
                  threshold: this.form.threshold,
                  ruleList: res,
                  userCoupons
                }
              }
              // 这里需要处理下数据-----
              createActAdd(dataParam).then(res => {
                if (res.code === '10000') {
                  this.$message({
                    message: '创建成功',
                    type: 'success'
                  })
                }
              })
            })
            .catch(res => {
              console.log('二次验证失败----------------------')
            })
        } else {
          console.log('error submit!!', valid)
          return false
        }
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.app-container {
  position: relative;
  .form-title {
    line-height: 14px;
    font-size: 14px;
    border-left: #409eff 2px solid;
    padding-left: 10px;
    margin-bottom: 20px;
  }
  .info {
    color: #b3b3b3;
  }
}
</style>
