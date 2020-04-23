<template>
  <div class="dashboard-container">
    <div
      v-loading="pageLoading"
      class="app-container"
      :class="disabled ? 'x-disabled-container': ''"
      element-loading-text="加载中"
    >
      <section class="form-box">
        <el-form
          ref="xForm"
          :model="xForm"
          :rules="xRules"
          size="small"
          label-width="80px"
          :disabled="disabled"
        >
          <el-form-item label="活动类型">
            <el-radio-group v-model="xForm.type">
              <el-radio v-if="xForm.type=== '12'" label="12">限时秒杀</el-radio>
              <el-radio v-if="xForm.type=== '11'" label="11">限时特惠</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动名称" prop="pmtName">
            <el-input
              v-model="xForm.pmtName"
              :placeholder="disabled ? '':'不超过20字'"
              maxlength="20"
              style="width: 380px;"
              show-word-limit
            />
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input
              v-model="xForm.description"
              type="textarea"
              :placeholder="disabled ? '':'不超过200字'"
              maxlength="200"
              :rows="4"
              show-word-limit
              style="width: 380px;"
            />
          </el-form-item>
          <el-form-item label="生效时间" prop="startTime">
            <el-date-picker
              v-model="xForm.dateRange"
              style="width: 380px"
              size="small"
              type="datetimerange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              :default-time="['00:00:00','23:59:59']"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              @change="handleTimeChange($event, 3)"
            />
          </el-form-item>
          <el-form-item label="优惠模式">
            <el-radio-group v-model="xForm.mode" @change="modeChange">
              <el-radio :label="1">折扣</el-radio>
              <el-radio :label="2">减价</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="选取门店" prop="allStore" required>
            <el-radio-group v-model="xForm.allStore">
              <el-radio :label="true">全部门店</el-radio>
              <el-radio :label="false">部分门店</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item v-show="!xForm.allStore">
            <!-- storeComponent -->
            <el-button
              type="primary"
              plain
              @click="$refs.storeComponent.open()"
            >选择门店 | 已选（{{ selectedStore.length }}）</el-button>
          </el-form-item>
          <el-form-item v-show="!xForm.allStore">
            <select-store ref="selectStoreComponent" @del-item="delSelectStore" />
          </el-form-item>
          <el-form-item label="是否免运">
            <el-radio-group v-model="xForm.freePostFee">
              <el-radio :label="0">否</el-radio>
              <el-radio :label="1">是</el-radio>
            </el-radio-group>
            <template v-if="xForm.freePostFee">
              <span class="note-grey" style="margin-left: 15px;">选择是表示免配送费或快递费用</span>
            </template>
          </el-form-item>
          <el-form-item label="限购商品总数" label-width="108px" prop="limitAmount">
            <el-input
              v-model="xForm.limitAmount"
              class="input-center"
              maxlength="8"
              style="width: 100px;"
              placeholder="0"
            />
            <span
              v-show="xForm.limitAmount ==='0' || xForm.limitAmount === 0 || xForm.limitAmount === ''"
              style="display:inline-block;width: 45px;margin-left: 5px;color: #e6a23c;"
            >不限购</span>
            <span class="note-grey" style="margin-left: 15px;">1个用户在该活动下可多次购买的商品总件数，输入0代表不限购</span>
          </el-form-item>
        </el-form>
        <div class="table-box">
          <div class="muti-set">
            <el-form label-width="80px" style="text-align: right">
              <el-form-item
                v-if="!disabled"
                label="批量设置"
                style="display:inline-block;margin-bottom:0"
              >
                <el-select v-model="mutiSetType" placeholder="批量设置" @change="mutiSetChange">
                  <el-option v-if="xForm.mode === 1" class="x-option" label="批量设置折扣" value="1" />
                  <el-option v-if="xForm.mode === 2" label="批量设置减价" value="2" />
                  <el-option label="批量设置限购" value="3" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-form ref="tableForm" :model="tableForm" class="table-form" size="small">
            <el-table :data="tableForm.selectedGoods" size="small" style="margin: 20px 0">
              <el-table-column label="序号" type="index" min-width="50px" align="center" />
              <el-table-column label="商品图片" prop="picUrl">
                <template slot-scope="scope">
                  <div
                    v-if="scope.row.picUrl && scope.row.picUrl!==''"
                    style="width: 60px; height: 60px"
                  >
                    <div class="x-image__preview">
                      <el-image
                        style="width: 60px; height: 60px"
                        fit="contain"
                        :src="showImg(scope.row.picUrl)"
                        :preview-src-list="[showImg(scope.row.picUrl)]"
                      />
                    </div>
                  </div>
                  <div v-else style="line-height: 32px">暂无上传</div>
                </template>
              </el-table-column>
              <el-table-column
                label="商品编码"
                prop="erpCode"
                min-width="120px"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="商品名称"
                prop="productName"
                min-width="120px"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="参考价(元)"
                prop="mprice"
                min-width="120px"
                :show-overflow-tooltip="true"
              />
              <el-table-column
                label="商品规格"
                prop="productNameSpec"
                min-width="120px"
                :show-overflow-tooltip="true"
              />
              <!-- <el-table-column label="原价" prop="mprice" min-width="120px" /> -->
              <el-table-column :label="xForm.mode===1?'折扣':'减价'" min-width="180px">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'selectedGoods.' + scope.$index + '.discount'"
                    :rules="[{ required: true, validator: check_discount, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="scope.row.discount"
                      style="width:100px"
                      :disabled="disabled"
                      maxlength="11"
                    />
                    <span v-if="xForm.mode===1" style="margin-left: 5px">折</span>
                    <span v-else style="margin-left: 5px">元</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="限购" prop="name" min-width="160px">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'selectedGoods.' + scope.$index + '.confineNum'"
                    :rules="[{ required: true, validator: check_limit, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="scope.row.confineNum"
                      style="width:92px;text-align:center"
                      :disabled="disabled"
                      maxlength="8"
                    />
                    <span
                      v-show="scope.row.confineNum ==='0'"
                      style="margin-left: 5px;color: #e6a23c;"
                    >不限购</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column v-if="xForm.type === '12'" label="库存" prop="name" min-width="160px">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'selectedGoods.' + scope.$index + '.stock'"
                    :rules="[{ required: true, validator: check_num, trigger: 'blur' }]"
                  >
                    <el-input
                      v-model="scope.row.stock"
                      style="width: 92px"
                      :disabled="disabled"
                      maxlength="8"
                    />
                  </el-form-item>
                </template>
              </el-table-column>

              <el-table-column v-if="!disabled" label="操作" prop="name" width="90px" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click.stop="handleDel(scope.row, scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-button
            v-if="!disabled"
            type="primary"
            size="small"
            @click="$refs.GoodsComponent.open()"
          >选择商品</el-button>
        </div>
      </section>
      <section class="form-footer">
        <template v-if="!disabled">
          <el-button size="small" @click="$router.go(-1)">取 消</el-button>
          <el-button type="primary" size="small" :loading="saveLoading" @click="submit">保 存</el-button>
        </template>
        <el-button v-if="disabled" type="primary" size="small" @click="$router.go(-1)">返 回</el-button>
      </section>
    </div>
    <dialog-set
      v-if="!disabled"
      ref="dialogSet"
      :type="mutiSetType"
      @on-change="onSetChange"
      @on-reset="onSetReset"
    />
    <!-- 选择主商品组件 -->
    <store-goods
      ref="GoodsComponent"
      :list="selectedGoods"
      :store-ids="xForm.allStore?[]:selectedStore.map(item => item.id)"
      @on-change="handleSelectGoods"
    />
    <store-dialog ref="storeComponent" :list="selectedStore" @complete="handleSelectStore" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import dialogSet from '../_source/dialog-set'

import storeDialog from '../../components/store'
import selectStore from '../../components/select-store'
import storeGoods from '../../components/store-gods'

import { checkNumberdouble } from '@/utils/validate'
import { createActLimit, updateActLimit, getActLimit } from '@/api/activity'
import config from '@/utils/config'

export default {
  name: 'LimitEdit',
  components: {
    dialogSet,
    storeDialog,
    selectStore,
    storeGoods
  },
  data() {
    const check_discount = (rule, value, callback) => {
      console.log('check_discount----', rule, value)
      const index = rule.field.split('.')[1]
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '') {
        if (this.xForm.mode === 2 && !checkNumberdouble(value)) {
          // 2.减价
          callback(new Error('请输入最多2位小数的正数'))
        }
        if (this.xForm.mode === 2 && (value > Number(this.tableForm.selectedGoods[index].mprice))) {
          // 2.减价
          callback(new Error('减价金额不可大于参考价'))
        }
        if (this.xForm.mode === 1) {
          // 1.折扣
          const reg = /(^([0-9]+|0)$)|(^(([0-9]+|0)\.([0-9]{1}))$)/
          if (!reg.test(value)) {
            callback(new Error('请输入最多1位小数的正数'))
          }
          if (value <= 0 || value >= 10) {
            callback(new Error('折扣值应大于0小于10'))
          }
        }
      }
      if (value <= 0) {
        callback(new Error('最小值必须大于0'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    const check_limit = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '' && reg.test(value)) {
        callback(new Error('请输入正整数'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    const check_num = (rule, value, callback) => {
      const reg = /[^0-9]/
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if ((value !== '' && reg.test(value)) || value === '0') {
        callback(new Error('请输入正整数'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    return {
      saveLoading: false, // 保存loading
      pageLoading: false, // 页面加载loading
      pageStatus: 1, // 1.新增 2.编辑 3.查看(特殊：编辑时，未开始到开始)
      leaveAction: false,
      check_discount: check_discount,
      check_limit: check_limit,
      check_num: check_num,
      disabled: false,
      dataid: '',
      type: this.$route.query.l_type,
      xForm: {
        id: '',
        type: this.$route.query.l_type, // 11.限时优惠 12.限时秒杀
        pmtName: '',
        description: '',
        dateRange: [],
        startTime: '',
        endTime: '',
        mode: 1, // 优惠模式: 1-折扣, 2-减价
        allStore: true, // 门店活动范围: 0-全部, 1-指定门店
        freePostFee: 0, // 是否免邮 免运费配送
        limitAmount: ''
      },
      xRules: {
        pmtName: [
          { required: true, message: '请输入活动名称', trigger: 'blur' }
        ],
        startTime: [
          { required: true, message: '请选择时间段', trigger: 'change' }
        ],
        limitAmount: [{ validator: check_limit, trigger: 'blur' }]
      },
      tableForm: {
        selectedGoods: []
      },
      editDetail: null, // 编辑详情
      mutiSetType: '', // 设置类型 1.折扣 2.减价 3限购 4.库存
      propGoodsList: [],
      selectedGoods: [], // 用户回显弹窗
      selectedStore: [],
      // allStore: false,
      storeIds: [],
      storeNames: [],
      placeText: '不限购'
    }
  },
  beforeRouteLeave(to, from, next) {
    // 路由离开关闭标签
    if (this.disabled || this.leaveAction) {
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
        next()
      } else {
        next(false)
      }
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode']),
    uploadFileUrl() {
      return `${this.uploadFileURL}`
    },
    headers() {
      return {
        Authorization: this.$store.getters.token
      }
    },
    merCode() {
      return this.$store.state.user.merCode || ''
    },
    upLoadUrl() {
      return `${this.uploadFileURL}/${config.merGoods}/1.0/file/_upload?merCode=${this.merCode}`
    }
  },
  created() {
    console.log('222222222222', this.$route)
    const dataid = this.$route.query.id || ''
    const _ck = this.$route.query._ck
    if (dataid && dataid !== '') {
      this.dataid = dataid
      if (_ck === '1') {
        this.pageStatus = 3
      } else {
        this.pageStatus = 2
      }
      this._getDetailData()
    }
    let pageTitle = `限时${this.$route.query.l_type === '11' ? '优惠' : '秒杀'}`
    if (this.pageStatus === 2) {
      // pageStatus 1.新增 2.编辑 3.查看
      pageTitle = `限时${this.$route.query.l_type === '11' ? '优惠' : '秒杀'}编辑`
    } else if (this.pageStatus === 3) {
      pageTitle = `限时${this.$route.query.l_type === '11' ? '优惠' : '秒杀'}详情`
      this.disabled = true
    } else {
      pageTitle = `限时${this.$route.query.l_type === '11' ? '优惠' : '秒杀'}新建`
    }
    this.$route.meta.title = pageTitle
    document.title = pageTitle
  },
  methods: {
    handleSelectStore(val) {
      console.log('门店结果页出来了-------', val)
      this.selectedStore = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    delSelectStore(item, index) {
      console.log('item, index', item, index, this.selectedStore)
      this.selectedStore.splice(index, 1)
      this.$refs.selectStoreComponent.dataFrom(this.selectedStore)
    },
    handleSelectGoods(val) {
      console.log('商品结果页出来了-------', val)
      this.selectedGoods = val
      this.tableForm.selectedGoods = val.map(item => {
        return {
          ...item,
          productName: item.name,
          productNameSpec: this.formatSkuInfo(item.specSkus || '')
        }
      })
    },
    handleTimeChange(val, type) {
      if (val && val.length === 2) {
        this.xForm.startTime = val[0]
        this.xForm.endTime = val[1]
      } else {
        this.xForm.startTime = ''
        this.xForm.endTime = ''
      }
    },
    handleDel(item, index) {
      this.tableForm.selectedGoods.splice(index, 1)
    },
    modeChange(val) {
      if (val === 1 && this.mutiSetType === '2') {
        this.mutiSetType = '1'
      }
      if (val === 2 && this.mutiSetType === '1') {
        this.mutiSetType = '2'
      }
      this.tableForm.selectedGoods.forEach((v, index) => {
        v.discount = ''
        this.$refs.tableForm.clearValidate(
          'selectedGoods.' + index + '.discount'
        )
      })
    },
    mutiSetChange(val) {
      if (
        this.tableForm.selectedGoods &&
        this.tableForm.selectedGoods.length > 0
      ) {
        this.$refs.dialogSet.open()
      } else {
        this.$message('请选择商品后再设置')
        this.mutiSetType = ''
      }
    },
    onSetReset() {
      this.mutiSetType = ''
    },
    onSetChange(data) {
      console.log('11111=--------onSetChange', data)
      console.log(
        '11111=--------this.tableForm.selectedGoods',
        this.tableForm.selectedGoods
      )
      console.log('11111=--------this.tableForm.mutiSetType', this.mutiSetType)
      // 设置类型 1.折扣 2.减价 3限购 4.库存
      const dataMap = this.tableForm.selectedGoods.map((goods, index) => {
        if (this.mutiSetType === '1' || this.mutiSetType === '2') {
          goods.discount = data.value
          this.$refs.tableForm.clearValidate(
            'selectedGoods.' + index + '.discount'
          )
        } else if (this.mutiSetType === '3') {
          goods.confineNum = data.value
          this.$refs.tableForm.clearValidate(
            'selectedGoods.' + index + '.confineNum'
          )
        } else if (this.mutiSetType === '4') {
          goods.stock = data.value
          this.$refs.tableForm.clearValidate(
            'selectedGoods.' + index + '.stock'
          )
        }
        return {
          ...goods
        }
      })
      this.selectedGoods = dataMap
      this.tableForm.selectedGoods = dataMap
      this.$refs.dialogSet.close()
    },
    onSelectedStore(list, checkedAll) {
      this.allStore = checkedAll
      if (list && list.length > 0) {
        this.selectedStore = list.slice()
        console.log('selectedStore-----', this.selectedStore)
        // this.storeIds = this.selectedStore.map(store => store.id)
        // this.storeNames = this.selectedStore.map(store => store.stName)
      }
    },
    toSelectedGoods() {
      this.propGoodsList = this.tableForm.selectedGoods.map(goods => {
        const item = {
          specId: goods.productSpecId,
          name: goods.productName
        }
        return item
      })
      this.$nextTick(_ => {
        this.$refs.dialogGoods.open()
      })
    },
    onSelectedGoods(list) {
      if (list && list.length > 0) {
        // 1.移除table list中不在选取中的数据
        this.tableForm.selectedGoods.forEach((item, index) => {
          const inIndex = list.findIndex(v => {
            return v.specId === item.productSpecId
          })
          if (inIndex === -1) {
            this.tableForm.selectedGoods.splice(index, 1)
          }
        })
        // 1.在table list中添加选取中没有的数据
        list.forEach(goods => {
          const inIndex = this.tableForm.selectedGoods.findIndex(item => {
            return goods.specId === item.productSpecId
          })
          if (inIndex === -1) {
            const item = {
              id: '',
              activityId: this.dataid,
              discount: (goods.discount || '') + '',
              confineNum: (goods.confineNum || '') + '',
              productManufacture: goods.manufacture || '',
              productName: goods.name || '',
              productSpecId: goods.specId || '',
              productSpecName: this.formatSkuInfo(goods.specSkuList || ''),
              stock: (goods.stock || '') + ''
              // mprice: goods.mprice // 参考
            }
            this.tableForm.selectedGoods.push(item)
          } else {
            console.log('已存在')
          }
        })
        // this.selectedStore = list
        // this.storeIds = this.selectedStore.map(store => store.id)
        // this.storeNames = this.selectedStore.map(store => store.stName)
        console.log(this.tableForm.selectedGoods)
      }
    },
    formatSkuInfo(skuList) {
      let skuStr = ''
      if (skuList && skuList.length > 0) {
        skuList.forEach(v => {
          skuStr += `${v.skuKeyName}:${v.skuValue}，`
        })
        skuStr = skuStr.substr(0, skuStr.length - 1)
      }
      console.log('skuStr', skuStr)
      return skuStr
    },
    submit() {
      console.log('xForm', this.xForm)
      // 表单验证
      this.$refs.xForm.validate(valid => {
        if (valid) {
          // 验证时间
          const start_time = new Date(this.xForm.startTime).getTime()
          const end_time = new Date(this.xForm.endTime).getTime()
          const current_time = new Date().getTime()
          if (start_time < current_time) {
            this.$message.warning('活动开始时间不能小于当前时间')
            return false
          }
          if (end_time <= start_time) {
            this.$message.warning('活动结束时间必须大于开始时间')
            return false
          }
          if (!this.xForm.allStore && this.selectedStore.length === 0) {
            this.$message.warning('请选取门店')
            return false
          }
          if (this.tableForm.selectedGoods.length === 0) {
            this.$message.warning('请选取商品')
            return false
          }
          this.$refs.tableForm.validate(valid => {
            if (valid) {
              const data = {
                storeIds: this.selectedStore.map(item => item.id)
              }
              console.log('data', data)
              this.leaveAction = true
              if (this.xForm.id && this.xForm.id !== '') {
                this._updateActivity(data)
              } else {
                this._addActivity(data)
              }
            } else {
              this.$message.warning('请完善商品信息')
              return false
            }
          })
        } else {
          this.$message.warning('请完善活动信息')
          return false
        }
      })
    },
    formatItems(goodsList) {
      let ret = []
      ret = goodsList.map(v => {
        const item = v
        return item
      })
      console.log('formatItems', ret)
      return ret
    },
    updateActivityStatus(activity) {
      console.log('activity', activity)
      if (activity.status && activity.timeStatus === -1) {
        // 未开始
        console.log('活动未开始！')
      } else if (activity.status && activity.timeStatus === 1) {
        // 进行中
        this.pageStatus = 3
        this.disabled = true
        this.$message.warning('活动已开始！')
      } else if (activity.status || activity.timeStatus === 0) {
        // 已结束
        this.pageStatus = 3
        this.disabled = true
        this.$message('活动已结束！')
      }
    },
    _getDetailData() {
      this.pageLoading = true
      console.log('params detail', this.dataid)
      getActLimit(this.dataid)
        .then(res => {
          if (res.code === '10000') {
            // / this.xForm = ''
            const data = res.data
            this.selectedGoods =
              data.activityDetail && Array.isArray(data.activityDetail.ruleList)
                ? data.activityDetail.ruleList
                : []
            this.tableForm.selectedGoods = Array.isArray(
              data.activityDetail.ruleList
            )
              ? data.activityDetail.ruleList.map(item => {
                return {
                  ...item,
                  activityId: item.activityId,
                  discount: '' + item.discount,
                  id: item.id,
                  erpCode: item.erpCode,
                  mprice: item.mprice,
                  productName: item.name,
                  confineNum: '' + item.confineNum,
                  productNameSpec: this.formatSkuInfo(item.specSkus || ''),
                  picUrl: item.picUrl,
                  stock: (item.stock || '') + ''
                }
              })
              : []

            this.xForm = Object.assign(data, {
              dateRange: [res.data.startTime, res.data.endTime],
              type: data.pmtType + '',
              allStore: false,
              mode: data.activityDetail && data.activityDetail.pmtMode,
              freePostFee:
                data.activityDetail && data.activityDetail.freePostFee
            })
            console.log('this.xForm----', this.xForm)
            this.selectedStore = Array.isArray(data.storeResDTOList)
              ? data.storeResDTOList
              : []
            this.$refs.selectStoreComponent.dataFrom(data.storeResDTOList)
            console.log('this.selectedStore', this.selectedStore)
            // 编辑状态时，更新页面当前状态
            if (this.pageStatus === 2) {
              this.updateActivityStatus(data)
            }
          }
          this.pageLoading = false
        })
        .catch(err => {
          this.pageLoading = false
          console.log('err', err)
        })
    },
    _addActivity(data) {
      this.saveLoading = true
      const formData = {
        allStore: this.xForm.allStore,
        id: this.xForm.id,
        type: this.xForm.type,
        name: this.xForm.pmtName,
        description: this.xForm.description,
        startTime: this.xForm.startTime,
        endTime: this.xForm.endTime,
        limitAmount: this.xForm.limitAmount <= 0 ? 0 : this.xForm.limitAmount,
        // mode: this.xForm.mode,
        pmtRule: {
          freePostFee: this.xForm.freePostFee,
          pmtMode: this.xForm.mode,
          pmtType: this.xForm.type,
          ruleList: this.formatItems(this.tableForm.selectedGoods)
        }
      }
      const params = Object.assign(data, formData)
      console.log('createActLimit-----', params)
      createActLimit(params)
        .then(res => {
          if (res.code === '10000') {
            this.$message.success('创建成功')
            setTimeout(_ => {
              this.$router.push(
                `/marketing/activity/list?type=${this.$route.query.l_type}`
              )
              this.saveLoading = false
            }, 1000)
          }
        })
        .catch(err => {
          console.log('err', err)
          this.saveLoading = false
        })
    },
    _updateActivity(data) {
      this.saveLoading = true
      const formData = {
        allStore: this.xForm.allStore,
        id: this.xForm.id,
        type: this.xForm.type,
        name: this.xForm.pmtName,
        description: this.xForm.description,
        startTime: this.xForm.startTime,
        endTime: this.xForm.endTime,
        // mode: this.xForm.mode,
        limitAmount: this.xForm.limitAmount <= 0 ? 0 : this.xForm.limitAmount,
        pmtRule: {
          freePostFee: this.xForm.freePostFee,
          pmtMode: this.xForm.mode,
          pmtType: this.xForm.type,
          ruleList: this.formatItems(this.tableForm.selectedGoods)
        }
      }
      const params = Object.assign(data, formData)
      console.log('data----params', params)
      updateActLimit(params)
        .then(res => {
          if (res.code === '10000') {
            this.$message.success('保存成功')
            setTimeout(_ => {
              this.$router.push(
                `/marketing/activity/list?type=${this.$route.query.l_type}`
              )
              this.saveLoading = false
            }, 1000)
          }
        })
        .catch(err => {
          console.log('err', err)
          this.saveLoading = false
        })
    }
  }
}
</script>
<style lang="scss">
.table-form {
  .el-form-item {
    margin: 16px 0;
  }
  .el-input {
    input {
      padding: 0 8px;
      text-align: center;
    }
  }
}
.input-center {
  input {
    padding: 0 8px;
    text-align: center;
  }
}
</style>
<style lang="scss" scoped>
.btn-select-store {
  display: inline-block;
  line-height: 1;
  white-space: nowrap;
  cursor: pointer;
  background: #fff;
  border: 1px solid #dcdfe6;
  border-color: #dcdfe6;
  color: #606266;
  text-align: center;
  box-sizing: border-box;
  outline: none;
  margin: 0;
  font-weight: 400;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 3px;
}
.btn-select-store:hover {
  color: #147de8;
  border-color: #b9d8f8;
  background-color: #e8f2fd;
}
.m-opacity {
  opacity: 0;
}
.input-text {
  position: relative;
  z-index: 10;
}
.place-text {
  margin-left: -80px;
}
.note-grey {
  font-size: 14px;
  line-height: 1.1;
  color: #999999;
}
.form-footer {
  text-align: center;
}
</style>
