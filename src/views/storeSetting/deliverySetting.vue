<template>
  <div class="app-container">
    <el-dialog
      append-to-body
      title="配送费用设置"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <el-form :model="form" label-width="110px" label-position="right">
        <div style="font-size: 16px;font-weight: 400;margin-bottom: 10px">起送价</div>
        <el-form-item label="起送价：">
          <el-input v-model="form.initialDeliveryPrice" style="width: 100px" size="mini" type="number" />
          元
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <el-checkbox v-model="form.isfloatingFreight" :true-label="1" :false-label="0">浮动费用：</el-checkbox>
          </template>
          超出
          <el-input v-model="form.floatOverKilometers" style="width: 100px" size="mini" type="number" />
          公里（步行距离），每公里加收
          <el-input v-model="form.cashOnDelivery" style="width: 100px" size="mini" type="number" />
          元
        </el-form-item>
        <div style="font-size: 16px;font-weight: 400;margin-bottom: 10px">免运设置</div>
        <el-form-item label="免费配送：">
          <el-radio v-model="form.isfreeShipping" :label="0" size="mini">否</el-radio>
          <el-radio v-model="form.isfreeShipping" :label="1" size="mini">是</el-radio>
          <span style="font-size: 12px;font-weight: 400;color: #99a9bf">
            合理设置门店运费满免规则，有助于门店销售
          </span>
        </el-form-item>
        <el-form-item label="配送费：">
          <el-input v-model="form.distributionFee" style="width: 100px" size="mini" type="number" />
          元
        </el-form-item>
        <el-form-item v-if="form.isfreeShipping === 1" label="免运门槛：">
          <el-input v-model="form.freeEntryThreshold" style="width: 100px" size="mini" type="number" />
          元
        </el-form-item>
        <div style="font-size: 16px;font-weight: 400;margin-bottom: 10px">配送时间设置</div>
        <el-form-item label="配送时间：">
          <el-input v-model="form.deliveryTime" style="width: 200px" size="mini" maxlength="10" show-word-limit />
        </el-form-item>
        <el-alert
          title="配送时间设置用于在微商城下单时，展示订单预计送达时间"
          type="warning"
          :closable="false"
        />
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dismiss">取消</el-button>
        <el-button type="primary" size="small" @click="submit">确定</el-button>
      </div>
    </el-dialog>
    <el-table
      :data="list"
      height="550"
      border
      style="margin-top: 20px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        :selectable="checkSelectable"
      />
      <el-table-column label="所在省份" property="provinceName" />
      <el-table-column label="包含门店数" property="includeStores" />
      <el-table-column label="支持配送门店数" property="distributionStores" />
      <el-table-column label="起送价" property="initialDeliveryPrice" />
      <el-table-column label="是否免运">
        <template slot-scope="scope">
          <span v-if="scope.row.isfreeShipping === 1">是</span>
          <span v-else>无</span>
        </template>
      </el-table-column>
      <el-table-column label="详细规则">
        <template slot-scope="scope">
          <span v-if="scope.row.isfreeShipping === 1">无</span>
          <span v-else>满{{ scope.row.freeEntryThreshold }}免配送费</span>
        </template>
      </el-table-column>
      <el-table-column label="配送费" property="distributionFee" />
      <el-table-column label="配送说明" property="deliveryTime" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" :disabled="!scope.row.rangeId" @click="setting(scope.row)">设置配送规则</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="margin-top: 10px">
      <span style="font-size: 14px">已选 {{ multipleSelection.length }}个省份</span>
      <el-button type="primary" size="mini" @click="setting(null)">批量设置配送费用规则</el-button>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import {
  getDeliverySettings,
  saveDeliverySettings
} from '../../api/chainSetting'
export default {
  name: 'DeliverySetting',
  data() {
    return {
      visable: false,
      multipleSelection: [],
      list: [],
      form: {
        cashOnDelivery: 0,
        deliveryTime: null,
        distributionFee: 0,
        floatOverKilometers: 0,
        freeEntryThreshold: 0,
        initialDeliveryPrice: 0,
        isfloatingFreight: 0,
        isfreeShipping: 0,
        merCode: null,
        rangeId: []
      }
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getDeliverySettings(this.merCode).then(res => {
        if (res.code === '10000') {
          this.list = _.cloneDeep(res.data)
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    setting(row) {
      if (row) {
        console.log(row)
        this.form.cashOnDelivery = row.cashOnDelivery
        this.form.deliveryTime = row.deliveryTime
        this.form.distributionFee = row.distributionFee
        this.form.floatOverKilometers = row.floatOverKilometers
        this.form.freeEntryThreshold = row.freeEntryThreshold
        this.form.initialDeliveryPrice = row.initialDeliveryPrice
        this.form.isfloatingFreight = row.isfloatingFreight
        this.form.isfreeShipping = row.isfreeShipping
        this.form.merCode = this.merCode
        this.form.rangeId = [row.rangeId]
        if (!this.form.isfloatingFreight) {
          this.form.isfloatingFreight = 0
        }
        if (!this.form.isfreeShipping) {
          this.form.isfreeShipping = 0
        }
      } else {
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请至少选择一项',
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
        this.form.cashOnDelivery = 0
        this.form.deliveryTime = null
        this.form.distributionFee = 0
        this.form.floatOverKilometers = 0
        this.form.freeEntryThreshold = 0
        this.form.initialDeliveryPrice = 0
        this.form.isfloatingFreight = 0
        this.form.isfreeShipping = 0
        this.form.merCode = null
        this.form.rangeId = _.map(this.multipleSelection, 'rangeId')
      }
      this.visable = true
    },
    submit() {
      if (this.form.isfreeShipping !== 1) {
        this.form.freeEntryThreshold = null
      }
      console.log(this.form)
      saveDeliverySettings(this.form).then(res => {
        if (res.code === '10000') {
          this.loading = false
          this.dismiss()
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.getData()
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    dismiss() {
      this.visable = false
      this.form.cashOnDelivery = 0
      this.form.deliveryTime = null
      this.form.distributionFee = 0
      this.form.floatOverKilometers = 0
      this.form.freeEntryThreshold = 0
      this.form.initialDeliveryPrice = 0
      this.form.isfloatingFreight = 0
      this.form.isfreeShipping = 0
      this.form.merCode = null
      this.form.rangeId = []
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    checkSelectable(row) {
      return row.rangeId !== null
    }
  }
}
</script>

<style scoped>
  .container{
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 10px;
  }
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    color: #99a9bf;
  }
  .label-name {
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    color: #999999;
    font-size: 14px;
  }
</style>
