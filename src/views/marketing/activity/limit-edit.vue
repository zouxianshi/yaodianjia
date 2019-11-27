<template>
  <div class="dashboard-container">
    <div class="app-container">
      <section class="form-box">
        <el-form ref="xForm" :model="xForm" :rules="xRules" size="small" label-width="80px" :disabled="disabled">
          <el-form-item label="活动类型">
            <el-radio-group v-model="xForm.type">
              <el-radio :label="11">限时优惠</el-radio>
              <el-radio :label="12">限时秒杀</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="活动名称" prop="name">
            <el-input v-model="xForm.name" placeholder="不超过20字" maxlength="20" style="width: 380px;" />
          </el-form-item>
          <el-form-item label="活动描述">
            <el-input
              v-model="xForm.description"
              type="textarea"
              placeholder="不超过50字"
              maxlength="50"
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
            <el-radio-group v-model="xForm.storeRange" @change="onChange()">
              <el-radio :label="0">全部门店</el-radio>
              <el-radio :label="1">部分门店</el-radio>
              <el-button v-if="xForm.storeRange === 1" type="text" @click="toSelectStore">选取门店</el-button>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="是否免运">
            <el-radio-group v-model="xForm.freePostFee" @change="onChange()">
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
              <el-form-item label="批量设置">
                <el-select v-model="mutiSetType" placeholder="批量设置" @change="mutiSetChange">
                  <el-option v-if="xForm.mode === 1" label="批量设置折扣" value="1" />
                  <el-option v-if="xForm.mode === 2" label="批量设置减价" value="2" />
                  <el-option label="批量设置限购" value="3" />
                  <el-option label="批量设置库存" value="4" />
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <el-table :data="selectedGoods" size="small" style="margin: 20px 0">
            <el-table-column label="序号" type="index" />
            <el-table-column label="商品名称" prop="productName" min-width="150px" />
            <el-table-column label="规格" prop="productSpecName" min-width="100px" />
            <el-table-column label="生产厂家" prop="productManufacture" min-width="120px" />
            <el-table-column :label="xForm.mode===1?'折扣':'减价'" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.discount" style="width:80px" :disabled="disabled" />
                <span v-if="xForm.mode===1">折</span>
                <span v-else>元</span>
              </template>
            </el-table-column>
            <el-table-column label="限购" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.limitAmount" style="width: 80px" :disabled="disabled" />
              </template>
            </el-table-column>
            <el-table-column label="库存" prop="name" min-width="100px">
              <template slot-scope="scope">
                <el-input v-model="scope.row.stockAmount" style="width:80px" :disabled="disabled" />
              </template>
            </el-table-column>
            <el-table-column v-if="!disabled" label="操作" prop="name" min-width="120px">
              <template slot-scope="scope">
                <el-button type="text" @click.stop="handleDel(scope.row, scope.$index)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
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
    <dialog-set ref="dialogSet" :type="mutiSetType" @on-change="onSetChange" />
    <dialog-goods ref="dialogGoods" :list="propGoodsList" @on-change="onSelectedGoods" />
    <dialog-store ref="dialogStore" :list="selectedStore" @on-change="onSelectedStore" />
  </div>
</template>

<script>
import {
  mapGetters
} from 'vuex'
import dialogSet from './_source/dialog-set'
import dialogGoods from './_source/dialog-goods'
import dialogStore from '@/components/Dialog/DialogStore'

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
    // const checkWebsite = (rule, value, callback) => {
    //   console.log('value', value)
    //   if (value === '') {
    //     callback(new Error('请输入链接地址'))
    //   }
    //   if (!/(http|https):\/\/([\w.]+\/?)\S*/.test(value)) {
    //     callback(new Error('链接格式不正确，例：http://111.com'))
    //   }
    //   callback()
    // }
    // const checkNum = (rule, value, callback) => {
    //   if (value !== '' && !/^[1-9]([0-9])*$/.test(value)) {
    //     callback(new Error('请输入正整数'))
    //   }
    //   callback()
    // }
    return {
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
      editDetail: null, // 编辑详情
      mutiSetType: '', // 设置类型 1.折扣 2.减价 3限购 4.库存
      propGoodsList: [],
      selectedGoods: [],
      selectedStore: [],
      storeIds: [],
      storeNames: []
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
    // this.fetchData()
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
      this.selectedGoods.splice(index, 1)
    },
    modeChange(val) {
      if (val === 1 && this.mutiSetType === '2') {
        this.mutiSetType = '1'
      }
      if (val === 2 && this.mutiSetType === '1') {
        this.mutiSetType = '2'
      }
    },
    onChange(val) {
      console.log('val', this.xForm)
    },
    mutiSetChange(val) {
      if (this.selectedGoods && this.selectedGoods.length > 0) {
        this.$refs.dialogSet.open()
      } else {
        this.$message('请选择商品后再设置')
      }
    },
    toSelectStore() {
      this.$refs.dialogStore.open()
    },
    onSetChange(data) {
      // 设置类型 1.折扣 2.减价 3限购 4.库存
      this.selectedGoods.forEach(goods => {
        if (this.mutiSetType === '1' || this.mutiSetType === '2') {
          goods.discount = data.value
        } else if (this.mutiSetType === '3') {
          goods.limitAmount = data.value
        } else if (this.mutiSetType === '4') {
          goods.stockAmount = data.value
        }
      })
      this.$refs.dialogSet.close()
    },
    onSelectedStore(list) {
      if (list && list.length > 0) {
        this.selectedStore = list
        this.storeIds = this.selectedStore.map(store => store.id)
        this.storeNames = this.selectedStore.map(store => store.stName)
        console.log(this.storeIds)
        console.log(this.storeNames)
      }
    },
    toSelectedGoods() {
      this.propGoodsList = this.selectedGoods.map(goods => {
        const item = {
          checked: true,
          specId: goods.productSpecId,
          name: goods.productName
        }
        return item
      })
      console.log('propGoodsList', this.propGoodsList)
      this.$nextTick(_ => {
        this.$refs.dialogGoods.open()
      })
    },
    onSelectedGoods(list) {
      if (list && list.length > 0) {
        console.log('onSelectedGoods', list)
        list.forEach(goods => {
          const index = this.selectedGoods.findIndex(v => {
            return goods.specId === v.productSpecId
          })
          if (index === -1) {
            const item = {
              id: '',
              activityId: this.dataid,
              discount: goods.discount || '',
              limitAmount: goods.limitAmount || '',
              productManufacture: goods.manufacture || '',
              productName: goods.name || '',
              productSpecId: goods.specId || '',
              productSpecName: this.formatSkuInfo(goods.specSkuList || ''),
              stockAmount: goods.stockAmount || ''
            }
            this.selectedGoods.push(item)
          } else {
            console.log('已存在')
          }
        })
        // this.selectedStore = list
        // this.storeIds = this.selectedStore.map(store => store.id)
        // this.storeNames = this.selectedStore.map(store => store.stName)
        console.log(this.selectedGoods)
      }
    },
    formatSkuInfo(skuList) {
      let skuStr = ''
      if (skuList && skuList.length > 0) {
        skuList.forEach(v => {
          skuStr += `${v.skuKeyName}:${v.skuValue}，`
        })
      }
      return skuStr
    },
    submit() {
      console.log('xForm', this.xForm)
      // 表单验证
      // 表单验证
      this.$refs.xForm.validate((valid) => {
        if (valid) {
          // 验证结束时间
          const end_time = new Date(this.xForm.endTime).getTime()
          const current_time = new Date().getTime()
          if (end_time <= current_time) {
            this.$message.warning('结束时间必须大于当前时间')
            return false
          }
          if (this.xForm.storeRange === 1 && this.storeIds.length === 0) {
            this.$message.warning('请选取门店')
            return false
          }
          if (this.selectedGoods.length === 0) {
            this.$message.warning('请选取商品')
            return false
          }
          const data = {
            storeIds: this.xForm.storeRange === 1 && this.storeIds.length > 0 ? this.storeIds.join(',') : '',
            storeNames: this.xForm.storeRange === 1 && this.storeNames.length > 0 ? this.storeNames.join(',')
              : ''
          }
          if (this.xForm.id && this.xForm.id !== '') {
            this._updateActivity(data)
          } else {
            this._addActivity(data)
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _getDetailData() {
      const params = {
        id: this.dataid
      }
      console.log('params detail', params)
      getActivityDetail(params).then(res => {
        if (res.code === '10000') {
          // / this.xForm = ''
          this.xForm = res.data
          this.selectedGoods = this.xForm.items.map((item) => {
            delete item.mode
            return item
          })
          this.xForm.dateRange = [res.data.startTime, res.data.endTime]
        }
      }).catch(err => {
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
        items: this.selectedGoods,
        storeIds: data.storeIds,
        storeNames: data.storeNames
      }
      const params = Object.assign(data, formData)
      console.log('params', params)
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
        items: this.selectedGoods,
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
  .scope-img-wrap {
    width: 60px;
    height: 40px;
    background: #f5f5f5;
    margin: auto;

    img {
      width: 100%;
      height: 100%;
    }
  }

  .x-dialog-body {
    width: 100%;
    display: flex;

    .form-box {
      flex: 1;
    }

    .preview-box {
      flex: 0 0 250px;

      .title {
        font-size: 18px;
      }

      .prview-pic {
        margin-top: 20px;
        width: 100%;
        height: 450px;
      }
    }

    .test-1 {
      color: red;
    }
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
