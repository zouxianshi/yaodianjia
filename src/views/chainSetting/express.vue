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
      <el-form-item label="配送区域设置：" />
      <el-table :data="form.list">
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
            <div :class="{'el-form-item is-error':scope.row.ykg === ''}">
              <div class="el-form-item__content">
                <el-input v-model.number="scope.row.ykg" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5" style="width: 100px" @input="onChange" />
                <div class="el-form-item__error"> 请输入首重 </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="运费（元）" width="120px">
          <template slot-scope="scope">
            <div :class="{'el-form-item is-error':!/^\d+(\.\d{0,2})?$/.test(scope.row.freight)}">
              <div class="el-form-item__content">
                <el-input v-model="scope.row.freight" oninput="value=value.replace(/[^0-9.]/g,'')" maxlength="5" style="width: 100px" @change="onChange" />
                <div v-if="scope.row.freight === ''" class="el-form-item__error"> 请输入运费 </div>
                <div v-else class="el-form-item__error"> 最多2位小数 </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="续重（Kg）" width="120px">
          <template slot-scope="scope">
            <div :class="{'el-form-item is-error':scope.row.continueWeight === ''}">
              <div class="el-form-item__content">
                <el-input v-model="scope.row.continueWeight" oninput="value=value.replace(/[^\d]/g,'')" maxlength="5" style="width: 100px" />
                <div class="el-form-item__error"> 请输入续重 </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="续费（元）" width="120px">
          <template slot-scope="scope">
            <div :class="{'el-form-item is-error':!/^\d+(\.\d{0,2})?$/.test(scope.row.renewalCost)}">
              <div class="el-form-item__content">
                <el-input v-model="scope.row.renewalCost" :step="0.01" oninput="value=value.replace(/[^0-9.]/g,'')" maxlength="5" style="width: 100px" />
                <div v-if="scope.row.renewalCost === ''" class="el-form-item__error"> 请输入续费 </div>
                <div v-else class="el-form-item__error"> 最多2位小数 </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="包邮门槛(元)" width="160px">
          <template slot-scope="scope">
            <div :class="{'el-form-item is-error':!/^\d+(\.\d{0,2})?$/.test(scope.row.postageFreeThreshold)}">
              <div class="el-form-item__content">
                <el-input v-model="scope.row.postageFreeThreshold" oninput="value=value.replace(/[^0-9.]/g,'')" maxlength="5" style="width: 100px" />
                <div v-if="scope.row.postageFreeThreshold === ''" class="el-form-item__error"> 请输入包邮门槛 </div>
                <div v-else class="el-form-item__error"> 最多2位小数 </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="110px">
          <template slot-scope="scope">
            <el-button size="small" type="primary" icon="el-icon-edit" circle @click="onEdit(scope.$index)" />
            <el-button size="small" type="danger" icon="el-icon-delete" circle @click="onDel(scope.$index)" />
          </template>
        </el-table-column>
      </el-table>
      <!--      <el-button size="small" type="primary" style="margin-top: 10px" @click="visable = true">新增区域</el-button>-->
      <div style="margin-top: 20px;font-size: 14px">
        <el-button type="text" @click="onEdit(-1)">按区域设置配送费用</el-button>
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
      :close-on-click-modal="false"
      @close="dismiss"
    >
      <div v-if="visable">
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
            style="width: 150px"
            :disabled="isSelected(city.id)"
            @change="onCheck($event,city)"
          >{{ city.name }}</el-checkbox>
        </span>
      </div>
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
  computed: {
    ...mapGetters(['merCode'])
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
      if (index === -1) {
        this.checkAll = false
        this.isIndeterminate = false
        this.visable = true
        return
      }
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
      if (this.checkedCities.length <= 0) {
        this.$message({
          message: '请至少选择一个',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
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
        /* let maxSort = 0
        _.map(_.cloneDeep(this.form.list), (o) => {
          if(o.sortNumber && o.sortNumber > maxSort){
            maxSort = o.sortNumber
          }
        })*/
        if (this.form.list[this.form.list.length - 1].sortNumber !== null) {
          sortNumber = this.form.list[this.form.list.length - 1].sortNumber + 1
          // sortNumber = maxSort + 1
        } else {
          sortNumber = 0
        }
      }
      console.log('editPosition', this.editPosition)
      console.log('sortNumber', sortNumber)
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
      this.checkAll = false
    },
    handleCheckAllChange(val) {
      if (val) {
        console.log('da')
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
        console.log('db')
        this.checkedCities = []
        _.map(this.showCities, function(o) {
          o.checked = false
        })
      }
      console.log(this.checkedCities)
      if (this.checkedCities.length > 0) {
        console.log('aa')
        this.isIndeterminate = true
        if (this.selected.length === this.cities.length) {
          console.log('bb')
          this.checkAll = true
        } else {
          console.log('cc')
          this.checkAll = false
        }
      } else {
        console.log('dd')
        this.isIndeterminate = false
        this.checkAll = false
      }
      this.isIndeterminate = this.checkedCities.length > 0
      this.checkAll = (this.checkedCities.length + this.selected.length) === this.cities.length
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
      console.log(this.cities)
      console.log(this.selected)
      console.log(this.checkedCities)
      this.isIndeterminate = this.checkedCities.length > 0
      this.checkAll = (this.checkedCities.length + this.selected.length) === this.cities.length
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
      const patten = /^\d+(\.\d{0,2})?$/
      let vlidate = true
      _.map(_.cloneDeep(this.form.list), o => {
        if (o.ykg === '' ||
          o.continueWeight === '' ||
          !patten.test(o.freight) ||
          !patten.test(o.renewalCost) ||
          !patten.test(o.postageFreeThreshold)) {
          vlidate = false
          return
        }
      })
      if (!vlidate) {
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
    },
    onChange(cv, ov) {
      console.log(cv, ov)
    }
  }/*,
  watch: {
    'form.list': {
      deep: true,
      handler(v) {
        console.log(v)
      }
    }
  }*/
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
