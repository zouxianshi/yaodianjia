<template>
  <div class="container">
    <h3>快递运费</h3>
    <el-alert
      v-if="cities && cities.length && cities.length - selected.length > 0"
      type="warning"
      :closable="false"
    >
      <template slot="title">
        有未配置的区域{{ cities.length - selected.length }}个
      </template>
    </el-alert>

    <el-form ref="form" :model="form" label-position="right">
      <el-form-item label="计费方式：">
        <el-radio disabled>按重量</el-radio>
      </el-form-item>
      <el-form-item label="配送区域配置：" />
      <el-table :data="form.list" border height="calc(100vh - 530px)">
        <el-table-column label="配送区域">
          <template slot-scope="scope">
            <span v-for="(item, $index) in scope.row.rangeResDTOList" :key="$index">
              <span v-if="$index == scope.row.rangeResDTOList.length - 1">{{ item.name }}</span>
              <span v-else>{{ item.name }}，</span>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="首重（Kg）" width="120px">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.ykg" type="number" />
          </template>
        </el-table-column>
        <el-table-column label="运费（元）" width="120px">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.freight" type="number" />
          </template>
        </el-table-column>
        <el-table-column label="续重（元）" width="120px">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.continueWeight" type="number" />
          </template>
        </el-table-column>
        <el-table-column label="续费（元）" width="120px">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.renewalCost" type="number" />
          </template>
        </el-table-column>
        <el-table-column label="包邮门槛" width="160px">
          <template slot-scope="scope">
            <el-input v-model.number="scope.row.postageFreeThreshold" type="number">
              <template slot="append">元</template>
            </el-input>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110px">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" circle @click="onEdit(scope.$index)" />
            <el-button size="small" type="danger" icon="el-icon-delete" circle @click="onDel(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" type="primary" style="margin-top: 10px" @click="visable = true">新增区域</el-button>
      <div style="margin-top: 20px;font-size: 14px">
        <span style="color: #409eff;margin-right: 20px">按区域设置配送费用</span>
        <span style="color: #99a9bf">如全部设置为0，表示包邮</span>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary" @click="submit">保存</el-button>
      </div>
    </el-form>
    <el-dialog
      append-to-body
      title="新增区域"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <span
        v-for="city in showCities"
        :key="city.id"
      >
        <el-checkbox
          v-model="city.checked"
          :label="city.id"
          size="mini"
          style="width: 120px"
          :disabled="isSelected(city.id)"
          @change="onCheck($event,city)"
        >{{ city.name }}</el-checkbox>
      </span>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dismiss">取消</el-button>
        <el-button type="primary" size="small" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import { mapGetters } from 'vuex'
import {
  getProvince,
  saveDelivery,
  getDelivery
} from '../../api/chainSetting'
export default {
  name: 'Express',
  data() {
    return {
      visable: false,
      checkAll: false,
      isIndeterminate: false,
      checkedCities: [],
      cities: [],
      showCities: [],
      selected: [],
      editPosition: -1,
      form: {
        list: []
      }
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      getProvince().then(res => {
        if (res.code === '10000') {
          this.cities = _.cloneDeep(res.data)
          // this.showCities = _.cloneDeep(res.data)
          this.showCities = _.map(_.cloneDeep(res.data), (v) => {
            return _.assign(v, { checked: false })
          })
          console.log('showCities', this.showCities)
          getDelivery(this.merCode).then(res => {
            if (res.code === '10000') {
              this.form.list = _.cloneDeep(res.data)
              this.selected = []
              _.map(this.form.list, (o) => {
                _.map(o.rangeResDTOList, (v) => {
                  this.selected.push(v.rangeId)
                })
              })
              console.log('selected', this.selected)
            } else {
              this.$message({
                message: res.msg,
                type: 'error',
                duration: 5 * 1000
              })
            }
          })
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-1', this.cities)
      })
    },
    onEdit(index) {
      this.editPosition = index
      const arr = []
      _.map(this.form.list[this.editPosition].rangeResDTOList, (v) => {
        arr.push({
          name: v.name,
          id: v.rangeId
        })
      })
      this.checkedCities = arr
      if (this.checkedCities.length > 0) {
        this.isIndeterminate = true
        if (this.selected.length === this.cities.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      } else {
        this.isIndeterminate = false
        this.checkAll = false
      }
      const ids = _.map(this.checkedCities, 'id')
      _.map(this.showCities, function(o) {
        o.checked = ids.indexOf(o.id) !== -1
      })
      console.log(this.checkedCities)
      this.visable = true
    },
    onDel(index) {
      console.log('index', index)
      const tempData = _.cloneDeep(this.form.list[index].rangeResDTOList)
      console.log('tempData', tempData)
      _.map(tempData, (o) => {
        this.selected = _.filter(_.cloneDeep(this.selected), (v) => v !== o.rangeId)
      })
      console.log('selected', this.selected)
      this.form.list.splice(index, 1)
      console.log('list', this.form.list)
    },
    isSelected(id) {
      if (this.editPosition !== -1) {
        const arr = _.filter(this.form.list[this.editPosition].rangeResDTOList, { rangeId: id })
        if (this.selected.indexOf(id) !== -1 && arr.length <= 0) {
          return true
        } else {
          return false
        }
      } else {
        if (this.selected.indexOf(id) !== -1) {
          return true
        } else {
          return false
        }
      }
    },
    save() {
      const rangeResDTOList = []
      _.map(this.checkedCities, (v) => {
        rangeResDTOList.push({
          name: v.name,
          rangeId: v.id
        })
      })
      console.log(rangeResDTOList)
      let sortNumber = 0
      if (this.form.list && this.form.list.length > 0) {
        if (this.form.list[this.form.list.length - 1].sortNumber) {
          sortNumber = this.form.list[this.form.list.length - 1].sortNumber + 1
        } else {
          sortNumber = 0
        }
      }
      if (this.editPosition === -1) {
        const tempData = {
          billingPlan: 0,
          continueWeight: 0,
          freight: 0,
          merCode: this.merCode,
          renewalCost: 0,
          sortNumber: sortNumber,
          ykg: 0,
          postageFreeThreshold: 0,
          rangeResDTOList: rangeResDTOList
        }
        if (this.form.list) {
          this.form.list.push(tempData)
        } else {
          this.form.list = [tempData]
        }
        console.log(tempData)
      } else {
        this.form.list[this.editPosition].rangeResDTOList = _.cloneDeep(rangeResDTOList)
      }
      this.selected = []
      _.map(this.form.list, (v) => {
        _.map(v.rangeResDTOList, (o) => {
          this.selected.push(o.rangeId)
        })
      })
      this.editPosition = -1
      this.visable = false
      this.checkedCities = []
      this.isIndeterminate = false
    },
    handleCheckAllChange(val) {
      if (val) {
        const that = this
        if (this.editPosition === -1) {
          this.checkedCities = _.filter(this.cities, function(o) { return that.selected.indexOf(o.id) === -1 })
        } else {
          this.checkedCities = _.filter(this.cities, function(o) { return that.selected.indexOf(o.id) === -1 })
          console.log('checkedCities', this.checkedCities)
          _.map(this.form.list[this.editPosition].rangeResDTOList, function(o) {
            that.checkedCities.push({
              id: o.rangeId,
              name: o.name
            })
          })
        }
        console.log(this.checkedCities)
        const ids = _.map(this.checkedCities, 'id')
        _.map(this.showCities, function(o) {
          o.checked = ids.indexOf(o.id) !== -1
        })
      } else {
        this.checkedCities = []
        _.map(this.showCities, function(o) {
          o.checked = false
        })
      }
      if (this.checkedCities.length > 0) {
        this.isIndeterminate = true
        if (this.selected.length === this.cities.length) {
          this.checkAll = true
        } else {
          this.checkAll = false
        }
      } else {
        this.isIndeterminate = false
        this.checkAll = false
      }
    },
    onCheck(value, item) {
      console.log(value, item)
      // console.log('ch', this.showCities)
      if (value) {
        this.checkedCities.push({
          id: item.id,
          name: item.name
        })
      } else {
        this.checkedCities = _.filter(this.checkedCities, function(o) { return o.id !== item.id })
      }
      console.log(this.checkedCities)
    },
    submit() {
      if (this.cities.length - this.selected.length > 0) {
        this.$message({
          message: '有未配置的区域' + (this.cities.length - this.selected.length) + '个',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      const params = _.map(_.cloneDeep(this.form.list), o => {
        const rangeId = _.map(o.rangeResDTOList, v => {
          return v.rangeId
        })
        return _.assign(o, { rangeId: rangeId, rangeResDTOList: null })
      })
      console.log(params)
      saveDelivery({
        'list': params
      }).then(res => {
        if (res.code === '10000') {
          /* this.cities = _.cloneDeep(res.data)
          // this.showCities = _.cloneDeep(res.data)
          this.showCities = _.map(_.cloneDeep(res.data), (v) => {
            return _.assign(v, {checked: false})
          })
          console.log('showCities', this.showCities)*/
          this.$message({
            message: '保存成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.getData()
        } else {
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-1', this.cities)
      })
    },
    dismiss() {
      this.checkedCities = []
      this.checkAll = false
      this.isIndeterminate = false
      this.editPosition = -1
      this.visable = false
      this.showCities = _.map(_.cloneDeep(this.cities), (v) => {
        return _.assign(v, { checked: false })
      })
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  }
}
</script>

<style scoped>
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
