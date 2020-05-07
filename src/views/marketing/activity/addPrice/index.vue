<template>
  <div class="app-container">
    <el-form
      ref="form"
      v-loading="pageInfoloading"
      :model="form"
      :rules="rules"
      size="small"
      label-width="120px"
    >
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
      <el-form-item ref="activitTime" label="活动时间：" prop="activitTime">
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
          :disabled="disabled"
          @change="handleTimeChange"
        />
      </el-form-item>
      <div class="form-title">活动范围</div>
      <!-- <el-form-item label="门店范围：" prop="allStore" required>
        <el-radio-group v-model="form.allStore" :disabled="disabled">
          <el-radio :label="true">全部门店</el-radio>
          <el-radio :label="false">部分门店</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <!-- <el-form-item v-if="form.allStores === 1">已选当前上线的全部门店</el-form-item> -->
      <el-form-item v-show="!form.allStore || disabled || edit" label="门店范围：" required>
        <!-- storeComponent -->
        <el-button
          type="primary"
          plain
          :disabled="disabled || form.allStore"
          @click="$refs.storeComponent.open()"
        >选择门店 | 已选（{{ chooseStore.length }}）</el-button>
        <!-- <store-dialog @complete="handleSelectStore">选择门店</store-dialog> -->
      </el-form-item>
      <!-- 门店列表 -->
      <el-form-item v-show="!form.allStore || disabled || edit">
        <select-store
          ref="selectStoreComponent"
          :disabled="disabled || form.allStore"
          @del-item="delSelectStore"
        />
      </el-form-item>
      <!-- <el-form-item label="商品范围：" prop="allStore" required>
        <el-radio-group v-model="form.allSpec" :disabled="disabled">
          <el-radio :label="true">全部商品</el-radio>
          <el-radio :label="false">部分商品</el-radio>
        </el-radio-group>
      </el-form-item>-->
      <el-form-item v-show="!form.allSpec || disabled || edit" label="商品范围：" required>
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
      <div class="form-title">换购规则</div>
      <el-form-item ref="threshold" label="活动门槛：" prop="threshold">
        <template>
          <el-input-number
            v-model="form.threshold"
            :step="0.01"
            controls-position="right"
            step-strictly
            :min="0.01"
            :max="99999999"
            :disabled="disabled"
            style="width: 150px; margin-right: 8px"
          />元
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
            :disabled="disabled"
            @click="$refs.storeGoodsComponent.open()"
          >选择换购商品 | 已选（{{ storeActivityGoods.length }}）</el-button>
        </template>
        <select-activity-goods ref="activityGod" :disabled="disabled" @del-item="delActivityGoods" />
      </el-form-item>
      <el-form-item ref="confineNum" label="换购数量：" prop="confineNum">
        <template>
          <span>最多可换购</span>
          <el-input-number
            v-model="form.confineNum"
            controls-position="right"
            :step="1"
            step-strictly
            :min="1"
            :max="15"
            :disabled="disabled"
            style="width: 100px; margin-right: 8px"
          />
          <span>件</span>
          <span class="info">限制顾客可选择换购的最高件数</span>
        </template>
      </el-form-item>
      <el-form-item ref="type" label="下单规则：" prop="type">
        <el-checkbox-group v-model="form.type" :disabled="disabled">
          <el-tooltip class="item" effect="dark" content="参加加价购是否可使用优惠券" placement="top-end">
            <el-checkbox label="1" name="type">
              优惠券
              <i class="el-icon-question" />
            </el-checkbox>
          </el-tooltip>
        </el-checkbox-group>
      </el-form-item>
      <!-- <el-form-item>
        <el-button
          :disabled="disabled"
          type="primary"
          style="width: 120px"
          @click="onSubmit"
        >{{ edit?'更新':'提交' }}</el-button>
      </el-form-item>-->
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
    <!-- 选取换购商品组件 -->
    <store-goods
      ref="storeGoodsComponent"
      :limit-max="15"
      :list="storeActivityGoods"
      :group-type="true"
      :store-ids="form.allStore?[]:chooseStore.map(item => item.id)"
      @on-change="handleSelectActivityGoods"
    />
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :store-ids="form.allStore?[]:chooseStore.map(item => item.id)"
      :list="storeSelectGoods"
      @on-change="handleSelectGoods"
    />
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
import { throttle } from '@/utils/throttle'

export default {
  name: 'AddPriceCreate',
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
        allStore: false,
        allSpec: false,
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
      disabled: false,
      leaveAction: false,
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
    }
  },
  mounted() {
    let title = ''
    title = this.$route.query.id
      ? !this.$route.query._ck
        ? '编辑加价购'
        : '查看加价购详情'
      : '创建加价购'
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
              allSpec: !!data.allSpec,
              type: data.userCoupons === 3 ? ['1'] : [],
              threshold: data.activityDetail.threshold,
              confineNum: data.activityDetail.confineNum,
              ruleList: data.activityDetail.ruleList,
              startTime: data.startTime,
              endTime: data.endTime
            }
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
            this.storeActivityGoods =
              data.activityDetail && Array.isArray(data.activityDetail.ruleList)
                ? data.activityDetail.ruleList
                : []
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
    onSubmit: throttle(function() {
      this.$refs.form.validate((valid, object) => {
        if (valid) {
          console.log('我准备通过了----------------------')
          if (new Date(this.form.startTime).getTime() < new Date().getTime()) {
            this.$message.warning('活动开始时间不能小于当前时间')
            return
          }
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
                if (Array.isArray(storeIdData) && !storeIdData.length) {
                  this.$message.warning('活动门店不可为空')
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
                  this.$message.warning('活动商品不可为空')
                  return
                }
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
                      this.leaveAction = true
                      loading.close()
                      this.resultData(res.data, '更新成功')
                    }
                  })
                  .catch(() => {
                    loading.close()
                  })
              } else {
                createActAdd(dataParam)
                  .then(res => {
                    if (res.code === '10000') {
                      this.leaveAction = true
                      loading.close()
                      this.resultData(res.data, '创建成功')
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
              this.$router.replace('/marketing/activity/list/15')
            }
          }
        )
      } else {
        this.$message.success(msg)
        this.$router.replace('/marketing/activity/list/15')
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    // 路由离开关闭标签
    if (this.leaveAction) {
      this.$store.dispatch('tagsView/delView', from)
    }
    next()
    // if (this.disabled || this.leaveAction) {
    //   this.$store.dispatch('tagsView/delView', from)
    //   next()
    //   if (this.pageLoading) {
    //     this.pageLoading.close()
    //   }
    // } else {
    //   const answer = window.confirm('你还有数据没有保存，是否确认退出')
    //   if (answer) {
    //     if (this.pageLoading) {
    //       this.pageLoading.close()
    //     }
    //     this.$store.dispatch('tagsView/delView', from)
    //     next()
    //   } else {
    //     next(false)
    //   }
    // }
  }
}
</script>
<style lang='scss' scoped>
.app-container {
  padding-bottom: 80px;
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
