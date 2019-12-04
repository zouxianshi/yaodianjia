<template>
  <div class="dashboard-container">
    <div v-loading="loading" class="app-container" :class="disabled ? 'x-disabled-container': ''" element-loading-text="加载中">
      <section class="form-box">
        <el-form ref="xForm" :model="xForm" :rules="xRules" size="small" label-width="80px" :disabled="disabled">
          <el-form-item label="活动类型">
            <el-radio-group v-model="xForm.type">
              <el-radio :label="11">限时特惠</el-radio>
              <el-radio :label="12">限时秒杀</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="xForm.name" :placeholder="disabled ? '':'不超过20字'" maxlength="20" style="width: 380px;" show-word-limit />
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input
              v-model="xForm.description"
              type="textarea"
              :placeholder="disabled ? '':'不超过50字'"
              maxlength="50"
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
          <el-form-item label="活动范围">
            <el-radio-group v-model="xForm.storeRange">
              <el-radio :label="0">全部门店</el-radio>
              <el-radio style="margin-right:10px" :label="1">部分门店</el-radio>
            </el-radio-group>
            <div v-if="xForm.storeRange === 1" class="btn-select-store" @click="toSelectStore"><span v-if="!disabled">选取门店/</span>查看已选门店</div>
          </el-form-item>
          <el-form-item label="是否免运">
            <el-radio-group v-model="xForm.freePostFee">
              <el-radio :label="false">否</el-radio>
              <el-radio :label="true">是</el-radio>
            </el-radio-group>
            <template v-if="xForm.freePostFee">
              <span class="note-grey" style="margin-left: 15px;">选择是表示免配送费或快递费用</span>
            </template>
          </el-form-item>
        </el-form>
        <div class="table-box">
          <div class="muti-set">
            <el-form label-width="80px">
              <el-form-item v-if="!disabled" label="批量设置">
                <el-select v-model="mutiSetType" placeholder="批量设置" @change="mutiSetChange">
                  <el-option v-if="xForm.mode === 1" class="x-option" label="批量设置折扣" value="1" />
                  <el-option v-if="xForm.mode === 2" label="批量设置减价" value="2" />
                  <el-option label="批量设置限购" value="3" />
                  <el-option v-if="xForm.type === 12" label="批量设置库存" value="4" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-form ref="tableForm" :model="tableForm" class="table-form">
            <el-table :data="tableForm.selectedGoods" size="small" style="margin: 20px 0">
              <el-table-column label="序号" type="index" min-width="50px" align="center" />
              <el-table-column label="商品名称" prop="productName" min-width="120px" :show-overflow-tooltip="true" />
              <el-table-column label="规格" prop="productSpecName" min-width="120px" :show-overflow-tooltip="true" />
              <el-table-column label="生产厂家" prop="productManufacture" min-width="120px" :show-overflow-tooltip="true" />
              <!-- <el-table-column label="原价" prop="mprice" min-width="120px" /> -->
              <el-table-column :label="xForm.mode===1?'折扣':'减价'" min-width="180px">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'selectedGoods.' + scope.$index + '.discount'"
                    :rules="[{ required: true, validator: check_discount, trigger: 'blur' }]"
                  >
                    <el-input v-model="scope.row.discount" style="width:80px" :disabled="disabled" maxlength="11" />
                    <span v-if="xForm.mode===1" style="margin-left: 5px">折</span>
                    <span v-else style="margin-left: 5px">元</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="限购" prop="name" min-width="160px">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'selectedGoods.' + scope.$index + '.limitAmount'"
                    :rules="[{ required: true, validator: check_limit, trigger: 'blur' }]"
                  >
                    <el-input v-model="scope.row.limitAmount" style="width:80px;text-align:center" :disabled="disabled" maxlength="9" />
                    <span v-show="scope.row.limitAmount ==='0'" style="margin-left: 5px;color: #e6a23c;">不限购</span>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column v-if="xForm.type === 12" label="库存" prop="name" min-width="160px">
                <template slot-scope="scope">
                  <el-form-item
                    :prop="'selectedGoods.' + scope.$index + '.stockAmount'"
                    :rules="[{ required: true, validator: check_num, trigger: 'blur' }]"
                  >
                    <el-input v-model="scope.row.stockAmount" style="width:80px" :disabled="disabled" maxlength="9" />
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column v-if="!disabled" label="操作" prop="name" width="100px" align="center">
                <template slot-scope="scope">
                  <el-button type="text" @click.stop="handleDel(scope.row, scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-form>
          <el-button v-if="!disabled" type="primary" size="small" @click="toSelectedGoods">选择商品</el-button>
        </div>
      </section>
      <section class="form-footer">
        <template v-if="!disabled">
          <el-button size="small" @click="$router.go(-1)">取 消</el-button>
          <el-button type="primary" size="small" @click="submit">确 认</el-button>
        </template>
        <el-button v-if="disabled" type="primary" size="small" @click="$router.go(-1)">返 回</el-button>
      </section>
    </div>
    <dialog-set v-if="!disabled" ref="dialogSet" :type="mutiSetType" @on-change="onSetChange" @on-reset="onSetReset" />
    <dialog-goods ref="dialogGoods" :editable="!disabled" :list="propGoodsList" @on-change="onSelectedGoods" />
    <dialog-store ref="dialogStore" :editable="!disabled" :list="selectedStore" @on-change="onSelectedStore" />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import dialogSet from './_source/dialog-set'
import dialogGoods from './_source/dialog-goods'
import dialogStore from '@/components/Dialog/DialogStore'
import { checkNumberdouble } from '@/utils/validate'

import {
  getActivityDetail,
  addActivity,
  updateActivity
} from '@/api/marketing'
import config from '@/utils/config'

export default {
  name: 'Banner',
  components: {
    dialogSet,
    dialogGoods,
    dialogStore
  },
  data() {
    const check_discount = (rule, value, callback) => {
      if (rule.required && !value) {
        callback(new Error('请输入数值'))
      }
      if (value !== '') {
        if (this.xForm.mode === 2 && !checkNumberdouble(value)) { // 2.减价
          callback(new Error('请输入最多2位小数的正数'))
        }
        if (this.xForm.mode === 1) { // 1.折扣
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
      if (value !== '' && reg.test(value) || value === '0') {
        callback(new Error('请输入正整数'))
      }
      if (value > 99999999) {
        callback(new Error('最大值不能超过99999999'))
      }
      callback()
    }
    return {
      pageLoading: false,
      leaveAction: false,
      check_discount: check_discount,
      check_limit: check_limit,
      check_num: check_num,
      disabled: false,
      dataid: '',
      type: '',
      xForm: {
        id: '',
        type: 11, // 11.限时优惠 12.限时秒杀
        name: '',
        description: '',
        dateRange: [],
        startTime: '',
        endTime: '',
        mode: 1, // 优惠模式: 1-折扣, 2-减价
        storeRange: 0, // 门店活动范围: 0-全部, 1-指定门店
        freePostFee: false // 是否免邮 免运费配送
      },
      xRules: {
        name: [{
          required: true,
          message: '请输入活动名称',
          trigger: 'blur'
        }],
        startTime: [{
          required: true,
          message: '请选择时间段',
          trigger: 'change'
        }]
      },
      tableForm: {
        selectedGoods: []
      },
      editDetail: null, // 编辑详情
      mutiSetType: '', // 设置类型 1.折扣 2.减价 3限购 4.库存
      propGoodsList: [],
      selectedGoods: [],
      selectedStore: [],
      storeIds: [],
      storeNames: [],
      placeText: '不限购'
    }
  },
  beforeRouteLeave(to, from, next) { // 路由离开关闭标签
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
        'Authorization': this.$store.getters.token
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
    const dataid = this.$route.query.id || ''
    const type = this.$route.query.type || ''
    const _ck = this.$route.query._ck
    if (dataid && dataid !== '' && type !== '') {
      this.dataid = dataid
      this.type = type
      this._getDetailData()
    }
    if (_ck === '1') {
      this.disabled = true
    }
  },
  methods: {
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
        this.$refs.tableForm.clearValidate('selectedGoods.' + index + '.discount')
      })
    },
    mutiSetChange(val) {
      if (this.tableForm.selectedGoods && this.tableForm.selectedGoods.length > 0) {
        this.$refs.dialogSet.open()
      } else {
        this.$message('请选择商品后再设置')
        this.mutiSetType = ''
      }
    },
    toSelectStore() {
      this.$refs.dialogStore.open()
    },
    onSetReset() {
      this.mutiSetType = ''
    },
    onSetChange(data) {
      // 设置类型 1.折扣 2.减价 3限购 4.库存
      this.tableForm.selectedGoods.forEach((goods, index) => {
        if (this.mutiSetType === '1' || this.mutiSetType === '2') {
          goods.discount = data.value
          this.$refs.tableForm.clearValidate('selectedGoods.' + index + '.discount')
        } else if (this.mutiSetType === '3') {
          goods.limitAmount = data.value
          this.$refs.tableForm.clearValidate('selectedGoods.' + index + '.limitAmount')
        } else if (this.mutiSetType === '4') {
          goods.stockAmount = data.value
          this.$refs.tableForm.clearValidate('selectedGoods.' + index + '.stockAmount')
        }
      })
      this.$refs.dialogSet.close()
    },
    onSelectedStore(list) {
      if (list && list.length > 0) {
        this.selectedStore = list
        this.storeIds = this.selectedStore.map(store => store.id)
        this.storeNames = this.selectedStore.map(store => store.stName)
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
              limitAmount: (goods.limitAmount || '') + '',
              productManufacture: goods.manufacture || '',
              productName: goods.name || '',
              productSpecId: goods.specId || '',
              productSpecName: this.formatSkuInfo(goods.specSkuList || ''),
              stockAmount: (goods.stockAmount || '') + ''
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
      this.$refs.xForm.validate((valid) => {
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
          if (this.xForm.storeRange === 1 && this.storeIds.length === 0) {
            this.$message.warning('请选取门店')
            return false
          }
          if (this.tableForm.selectedGoods.length === 0) {
            this.$message.warning('请选取商品')
            return false
          }
          this.$refs.tableForm.validate((valid) => {
            if (valid) {
              const data = {
                storeIds: this.xForm.storeRange === 1 && this.storeIds.length > 0 ? this.storeIds.join(',') : '',
                storeNames: this.xForm.storeRange === 1 && this.storeNames.length > 0 ? this.storeNames.join(',')
                  : ''
              }
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
        delete item.mprice
        return item
      })
      console.log('formatItems', ret)
      return ret
    },
    _getDetailData() {
      this.loading = true
      const params = {
        id: this.dataid
      }
      console.log('params detail', params)
      getActivityDetail(params).then(res => {
        if (res.code === '10000') {
          // / this.xForm = ''
          const data = res.data
          this.tableForm.selectedGoods = data.items.map((item) => {
            return {
              activityId: item.activityId,
              discount: '' + item.discount,
              id: item.id,
              limitAmount: '' + item.limitAmount,
              productManufacture: item.productManufacture,
              productName: item.productName,
              productSpecId: item.productSpecId,
              productSpecName: item.productSpecName,
              stockAmount: (item.stockAmount || '') + ''
            }
          })
          console.log('this.xForm', this.xForm)
          this.xForm = Object.assign(data, {
            'dateRange': [res.data.startTime, res.data.endTime]
          })
          this.storeIds = this.xForm.storeIds && this.xForm.storeIds !== '' ? this.xForm.storeIds.split(',') : []
          this.storeNames = this.xForm.storeNames && this.xForm.storeNames !== '' ? this.xForm.storeNames.split(',') : []
          if (this.storeIds && this.storeIds.length > 0) {
            this.selectedStore = this.storeIds.map((v, index) => {
              const store = {
                id: v,
                stName: this.storeNames[index] ? this.storeNames[index] : ''
              }
              return store
            })
          }
          console.log('this.storeIds', this.storeIds)
          console.log('this.storeNames', this.storeNames)
        }
        this.loading = false
      }).catch(err => {
        this.loading = false
        console.log('err', err)
      })
    },
    _addActivity(data) {
      const formData = {
        id: this.xForm.id,
        type: this.xForm.type,
        name: this.xForm.name,
        description: this.xForm.description,
        startTime: this.xForm.startTime,
        endTime: this.xForm.endTime,
        mode: this.xForm.mode,
        storeRange: this.xForm.storeRange,
        freePostFee: this.xForm.freePostFee,
        items: this.tableForm.selectedGoods,
        storeIds: data.storeIds,
        storeNames: data.storeNames
      }
      const params = Object.assign(data, formData)
      addActivity(params).then(res => {
        if (res.code === '10000') {
          this.$message.success('创建成功')
          this.$router.push('/marketing/activity')
        }
      }).catch(err => {
        console.log('err', err)
      })
    },
    _updateActivity(data) {
      const formData = {
        id: this.xForm.id,
        type: this.xForm.type,
        name: this.xForm.name,
        description: this.xForm.description,
        startTime: this.xForm.startTime,
        endTime: this.xForm.endTime,
        mode: this.xForm.mode,
        storeRange: this.xForm.storeRange,
        freePostFee: this.xForm.freePostFee,
        items: this.formatItems(this.tableForm.selectedGoods),
        storeIds: data.storeIds,
        storeNames: data.storeNames
      }
      const params = Object.assign(data, formData)
      updateActivity(params).then(res => {
        if (res.code === '10000') {
          this.$message.success('保存成功')
          this.$router.push('/marketing/activity')
        }
      }).catch(err => {
        console.log('err', err)
      })
    }

  }
}
</script>
<style lang="scss">
  .table-form{
    .el-form-item{
      margin: 16px 0;
    }
    .el-input{
      input {
        padding: 0 8px;
        text-align: center;
      }
    }
  }
</style>
<style lang="scss" scoped>
  .btn-select-store{
    display: inline-block;
    line-height: 1;
    white-space: nowrap;
    cursor: pointer;
    background: #fff;
    border: 1px solid #DCDFE6;
    border-color: #DCDFE6;
    color: #606266;
    text-align: center;
    box-sizing: border-box;
    outline: none;
    margin: 0;
    font-weight: 400;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 3px
  }
  .btn-select-store:hover{
    color: #147de8;
    border-color: #b9d8f8;
    background-color: #e8f2fd;
  }
  .m-opacity{
    opacity: 0;
  }
  .input-text{
    position: relative;
    z-index: 10;
  }
  .place-text{
    margin-left: -80px;
  }
  .note-grey {
    font-size: 14px;
    line-height: 1.1;
    color: #999999;
  }
  .form-footer {
    text-align: center
  }
</style>
