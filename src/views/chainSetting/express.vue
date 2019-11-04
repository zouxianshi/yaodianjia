<template>
  <div class="container">
    <h3>快递运费</h3>
    <el-alert
      v-if="cities.length - selected.length > 0"
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
      <el-table :data="form.list" border>
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
            <el-button size="small" type="danger" icon="el-icon-delete" circle />
          </template>
        </el-table-column>
      </el-table>
      <el-button size="small" type="primary" style="margin-top: 10px" @click="visable = true">新增区域</el-button>
      <div style="margin-top: 20px;font-size: 14px">
        <span style="color: #409eff;margin-right: 20px">按区域设置配送费用</span>
        <span style="color: #99a9bf">如全部设置为0，表示包邮</span>
      </div>
      <div style="text-align: center;margin-top: 20px">
        <el-button type="primary">保存</el-button>
      </div>
    </el-form>
    <span v-for="city in showCities" :key="city.id">
      <el-checkbox

        v-model="city.checked"

        :label="city.id"
        size="mini"
        style="width: 120px"
        :disabled="isSelected(city.id)"
        @change="onCheck($event,city)"
      >{{ city.name }}</el-checkbox>
    </span>
    <el-dialog
      append-to-body
      title="新增区域"
      :visible.sync="visable"
      width="800px"
      @close="dismiss"
    >
      <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
      <div style="margin: 15px 0;" />
      <el-checkbox
        v-for="city in showCities"
        :key="city.id"
        :label="city.id"
        size="mini"
        style="width: 120px"
        :disabled="isSelected(city.id)"
        :value="city.checked"
        @change="onCheck($event,city)"
      >{{ city.name }}</el-checkbox>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dismiss">取消</el-button>
        <el-button type="primary" size="small" @click="save">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  getProvince
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
          this.cities = res.data
          this.showCities = res.data
          _.map(this.showCities, (v) => {
            v.checked = false
          })
          console.log('showCities', this.showCities)
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

      console.log(this.checkedCities)
      this.visable = true
    },
    isChecked(id) {
      if (this.editPosition !== -1) {
        const arr = _.filter(this.form.list[this.editPosition].rangeResDTOList, { rangeId: id })
        if (arr.length > 0) {
          return true
        } else {
          return false
        }
      } else {
        return false
      }
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
      let sortNumber = 0
      if (this.form.list.length > 0) {
        sortNumber = this.form.list[this.form.list.length - 1].sortNumber + 1
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
        this.form.list.push(tempData)
      } else {
        this.form.list[this.editPosition].rangeResDTOList = rangeResDTOList
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
          _.map(this.form.list.rangeResDTOList, function(o) {
            this.checkedCities.push({
              id: o.rangeId,
              name: o.name
            })
          })
        }
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
    onCheck(e, item) {
      console.log(e)
      console.log(item)
      item.checked = !item.checked
      // console.log(value)
      // // console.log('ch', this.showCities)
      //   if(value){
      //     this.checkedCities.push({
      //       id: id,
      //       name: name
      //     })
      //
      //   }else{
      //     this.checkedCities = _.filter(this.checkedCities, function(o) { return o.id !== id });
      //   }
      // console.log(this.checkedCities)
    },
    dismiss() {
      this.checkedCities = []
      this.checkAll = false
      this.isIndeterminate = false
      this.editPosition = -1
      this.visable = false
      this.showCities = this.cities
      _.map(this.showCities, (v) => {
        _.assign(v, { checked: false })
      })
    }
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
