<template>
  <div class="app-container">
    <el-form
      ref="form"
      v-loading="pageInfoloading"
      :model="form"
      :rules="rules"
      :disabled="disabled"
      size="small"
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
      <div class="form-title">活动范围</div>
      <el-form-item label="门店范围：" prop="allStore" required>
        <el-radio-group v-model="form.allStore">
          <el-radio :label="true">全部门店</el-radio>
          <el-radio :label="false">部分门店</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item v-if="form.allStores === 1">已选当前上线的全部门店</el-form-item> -->
      <el-form-item v-show="!form.allStore">
        <!-- storeComponent -->
        <el-button
          type="primary"
          plain
          @click="$refs.storeComponent.open()"
        >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
        <!-- <store-dialog @complete="handleSelectStore">选择门店</store-dialog> -->
      </el-form-item>
      <!-- 门店列表 -->
      <el-form-item v-show="!form.allStore">
        <select-store ref="selectStoreComponent" @del-item="delSelectStore" />
      </el-form-item>
      <el-form-item label="商品范围：" prop="allStore" required>
        <el-radio-group v-model="form.allSpec">
          <el-radio :label="true">全部商品</el-radio>
          <el-radio :label="false">部分商品</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- <el-form-item v-if="form.allSpecs === 1">已选当前上线的全部商品</el-form-item> -->
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
        <select-activity-goods ref="activityGod" :disabled="disabled" @del-item="delActivityGoods" />
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
        <el-button type="primary" style="width: 120px" @click="onSubmit">{{ edit?'更新':'提交' }}</el-button>
      </el-form-item>
    </el-form>
    <!-- 选取换购商品组件 -->
    <store-goods
      ref="storeGoodsComponent"
      :limit-max="15"
      :list="storeActivityGoods"
      :group-type="true"
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
import { createActAdd, getActAddInfo, updateActAdd } from '@/api/activity'
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
        return callback(new Error('必须为大于0.01的正数,且最多两位小数'))
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
        allStore: true,
        allSpec: true,
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
      edit: false,
      chooseStore: [],
      pageInfoloading: false,
      storeSelectGoods: [], // 选取的主商品
      storeActivityGoods: [] // 选区的换购商品
    }
  },
  created() {
    if (this.$route.query.id) {
      this.activityId = this.$route.query.id
      this.disabled = this.$route.query.id && !!this.$route.query._ck // 当前页面为查看
      this.edit = this.$route.query.id && !this.$route.query._ck // 当前页面为编辑
      this.getInfo(this.$route.query.id)
      this.$route.meta.title = !this.$route.query._ck
        ? '编辑加价购'
        : '查看加价购详情'
      document.title = !this.$route.query._ck
        ? '编辑加价购'
        : '查看加价购详情'
    }
  },
  methods: {
    getInfo(id) {
      this.pageInfoloading = true
      getActAddInfo(id)
        .then(res => {
          console.log('查询活动详情0', res)
          this.pageInfoloading = false
          if (res.code === '10000') {
            const { data } = res
            // 转换activityDetail 去除数据
            this.form = {
              name: data.pmtName,
              activitTime: [data.startTime, data.endTime],
              allStore: !!data.allStore,
              allSpec: false,
              type: data.userCoupons === 3 ? ['1'] : [],
              threshold: data.activityDetail.threshold,
              confineNum: data.activityDetail.confineNum,
              ruleList: data.activityDetail.ruleList,
              startTime: data.startTime,
              endTime: data.endTime
            }
            this.chooseStore = data.storeResDTOList
            this.$refs.selectStoreComponent.dataFrom(data.storeResDTOList)
            this.storeSelectGoods = data.commList
            this.$refs.storeGods.dataFrom(data.commList)
            this.storeActivityGoods = data.activityDetail.ruleList
            this.$refs.activityGod.dataFrom(
              data.activityDetail && Array.isArray(data.activityDetail.ruleList)
                ? data.activityDetail.ruleList
                : []
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
                'allSpec',
                'allStore',
                'endTime',
                'startTime',
                'name'
              ])
              let userCoupons = ''
              // 需要增加组装的参数    userCoupons  pmtRule:{ruleList, confineNum, threshold, userCoupons} activitySpecList storeIds merCode: this.merCode,
              if (Array.isArray(this.form.type)) {
                const index = this.form.type.findIndex(item => item === '1')
                if (index >= 0) {
                  userCoupons = 3
                } else {
                  userCoupons = 0
                }
              }
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
                userCoupons,
                activitySpecList: specIdData, //
                storeIds: storeIdData,
                pmtRule: {
                  confineNum: this.form.confineNum,
                  threshold: this.form.threshold,
                  ruleList: res
                }
              }
              console.log('11111111', dataParam)
              const loading = this.$loading({
                lock: true,
                text: '努力创建中，请稍后',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              })
              if (this.activityId) {
                updateActAdd({
                  ...dataParam,
                  id: this.activityId
                })
                  .then(res => {
                    if (res.code === '10000') {
                      this.$message({
                        message: '更新成功',
                        type: 'success'
                      })
                      loading.close()
                      this.$router.replace('/marketing/activity/list?type=15')
                    }
                  })
                  .catch(() => {
                    loading.close()
                  })
              } else {
                createActAdd(dataParam)
                  .then(res => {
                    if (res.code === '10000') {
                      this.$message({
                        message: '创建成功',
                        type: 'success'
                      })
                      loading.close()
                      this.$router.replace('/marketing/activity/list?type=15')
                    }
                  })
                  .catch(() => {
                    loading.close()
                  })
              }
              // 这里需要处理下数据-----
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
