<template>
  <div>
    <el-button
      type="primary"
      size="mini"
      @click="dialogDeliveryVisible = true;immediateDelivery()"
    >立即发货</el-button>
    <el-dialog
      v-loading="loadingSendNow"
      title="请选择发货商品"
      :show-close="false"
      width="40%"
      :visible.sync="dialogDeliveryVisible"
      append-to-body
    >
      <el-table
        ref="multipleTable"
        v-loading="loadingSend"
        border
        size="small"
        :data="unReceivedData"
        style="width: 100%;margin-top: 20px"
        max-height="256"
        @select-all="handleSelectAllChange"
        @select="handleSelect"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column align="center" label="商品图片" width="120">
          <template slot-scope="scope">
            <div
              v-if="scope.row.mpic && scope.row.mpic!==''"
              class="x-img-mini"
              style="width: 60px; height: 36px"
            >
              <div class="x-image__preview">
                <el-image
                  fit="scale-down"
                  :src="showImg(scope.row.mpic)"
                  :preview-src-list="[showImg(scope.row.mpic)]"
                />
              </div>[]
            </div>
            <div v-else style="line-height: 32px">暂无上传</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名称" min-width="150">
          <template slot-scope="scope">
            <div>{{ scope.row.commodityName }}</div>
            <div>{{ scope.row.commodityCode }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="单价/数量" align="right" min-width="150">
          <template slot-scope="scope">
            <div>规格 {{ scope.row.skuValue }}</div>
            <div>￥{{ scope.row.commodityPrice }}({{ scope.row.commodityNumber }}件)</div>
          </template>
        </el-table-column>
      </el-table>
      <el-form class="marginTop20">
        <el-form-item :model="orderId" label="订单号：" :label-width="labelWidth">
          <template>
            <div>{{ orderId }}</div>
          </template>
        </el-form-item>
        <!-- 普通发货 -->
        <template v-if="deliveryType===0">
          <el-form-item label="快递公司：" :label-width="labelWidth">
            <el-select
              v-model="expressQuery.expComName"
              filterable
              placeholder="请输入关键词"
              @change="handleChangeExpress"
            >
              <el-option
                v-for="(item,index_ec) in expressData"
                :key="index_ec"
                :label="item.expComName"
                :value="[item.expComCode,item.expComName]"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号：" :label-width="labelWidth">
            <el-input
              v-model="packageNo"
              autocomplete="off"
              style="width:200px;"
              placeholder="请输入快递单号"
              size="small"
            />
          </el-form-item>
        </template>
        <!-- 配送发货 -->
        <template v-if="deliveryType===1">
          <el-form-item label="配送员：" :label-width="labelWidth">
            <el-select
              v-model="deliveryStuffData.deliveryName"
              filterable
              placeholder="请输入关键词"
              @change="handleChangeDelivery"
            >
              <el-option
                v-for="(item,indexEmp2) in employeeData"
                :key="indexEmp2"
                :label="item.empName"
                :value="item.id"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="当前已选：" :label-width="labelWidth">
            <template>
              <div>{{ deliveryStuffData.deliveryName }} {{ deliveryStuffData.deliveryMobile }}</div>
            </template>
          </el-form-item>
          <template v-if="employeeUsual.length>0">
            <el-form-item label="常用配送员：" :label-width="labelWidth">
              <el-button
                v-for="(itemEmployee,indexUsual) in employeeUsual"
                :key="indexUsual"
                type
                @click="setEmployeeData(itemEmployee)"
              >{{ itemEmployee.deliveryUserName }}</el-button>
            </el-form-item>
          </template>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeliveryVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDeliveryVisible;orderSend()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUnReceiveData,
  setOrderSend,
  getEmployeeUsual
} from '@/api/order'
import { mapGetters, mapState, mapActions } from 'vuex'
export default {
  props: {
    pItem: {
      type: Object,
      required: true
    },
    employeeData: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogDeliveryVisible: false,
      loadingSend: false,
      orderId: '',
      deliveryType: '',
      labelWidth: '170px',
      unReceivedData: [],
      deliveryStuffData: {
        deliveryUserId: '',
        deliveryName: '',
        deliveryMobile: ''
      }, // 当前选择的配送员
      expressQuery: {
        // 快递公司搜索关键字
        expComCode: '', // 快递公司编号
        expComName: '' // 快递公司名称
      },
      loadingSendNow: false,
      employeeUsual: [],
      packageNo: ''
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name']),
    ...mapState('order', ['expressData'])
  },
  methods: {
    ...mapActions({
      getExpressData: 'order/getExpressData'
    }),
    immediateDelivery() {
      // 立即发货弹出框
      // console.log('item:', item)
      this.loadingSend = true
      this.deliveryType = this.pItem.deliveryType
      this.orderId = this.pItem.id
      getEmployeeUsual(this.merCode).then(res => {
        // 获取常用配送员
        if (res.data) {
          this.employeeUsual = res.data
        }
        // console.log('this.employeeUsual:', this.employeeUsual)
      })

      this.unReceivedData = [] // 打开时清空弹框缓存
      // 待发货商品数据
      getUnReceiveData({
        merCode: this.merCode,
        orderId: this.pItem.id,
        currentPage: 1,
        pageSize: 20
      }).then(res => {
        this.loadingSend = false
        this.unReceivedData = res.data.data
      })
      this.mySelectList = [] // 打开时清空已选择的商品信息
      this.expressQuery.expComCode = '' // 弹出时清空已选快递公司
      this.packageNo = '' // 弹出时清空快递单号
      this.ExpressCompany() // 快递公司
    },
    handleSelectAllChange(allList) {
      this.unReceivedData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.id === item.id
        })
        if (index > -1) {
          if (allList.length > 0) {
            //  console.log('已存在' + item.commodityId + ':' + item.commodityName)
          } else {
            // 反选
            this.mySelectList.splice(index, 1)
          }
        } else {
          this.mySelectList.push(item)
        }
      })
    },
    handleSelect(val, row) {
      const index = this.mySelectList.findIndex(mItem => {
        // 没有符合条件的返回-1
        return mItem.id === row.id
      })
      if (index > -1) {
        this.mySelectList.splice(index, 1)
      } else {
        this.mySelectList.push(row)
      }
    },
    handleChangeDelivery(val) {
      // 配送员改变时触发
      this.employeeData.forEach(item => {
        if (item.id === val) {
          this.deliveryStuffData.deliveryUserId = item.id
          this.deliveryStuffData.deliveryName = item.empName
          this.deliveryStuffData.deliveryMobile = item.mobile
        }
      })
    },
    ExpressCompany() {
      // 获取快递公司
      if (this.expressData && this.expressData.length) return
      this.getExpressData({ pageSize: 2000 })
    },
    setEmployeeData(item) {
      // 选择常用配送员
      if (item) {
        this.deliveryStuffData.deliveryUserId = item.deliveryUserId
        this.deliveryStuffData.deliveryName = item.deliveryUserName
        this.deliveryStuffData.deliveryMobile = item.deliveryUserPhone
      }
    },
    handleChangeExpress(val) {
      // 快递公司选择改变时触发
      this.expressQuery.currentPage = 1
      // console.log('expressQuery-item:', val)
      this.expressQuery.expComCode = val[0]
      this.expressQuery.expComName = val[1]

      // this.getpreSendNum() // 获取待发货商品数量
    },
    orderSend() {
      // 立即发货
      this.loadingSendNow = true
      let detailsId = []

      if (this.mySelectList.length === 0) {
        this.dialogDeliveryVisible = true
        this.$message({
          message: '请选择要发货的商品',
          type: 'error'
        })
        this.loadingSendNow = false
        return
      } else {
        const mySelectList = this.mySelectList
        detailsId = mySelectList.map(item => {
          return item.id
        }) // 订单明细id集合
      }
      if (this.deliveryType === 0) {
        if (!this.expressQuery.expComName) {
          this.dialogDeliveryVisible = true
          this.$message({
            message: '请选择快递公司',
            type: 'error'
          })
          this.loadingSendNow = false
          return
        }

        if (!this.packageNo) {
          this.dialogDeliveryVisible = true
          this.$message({
            message: '请输入快递单号',
            type: 'error'
          })
          this.loadingSendNow = false
          return
        }

        this.orderSendData = {
          companyName: this.expressQuery.expComName,
          companyNo: this.expressQuery.expComCode,
          merCode: this.merCode,
          modifyName: this.name,
          orderId: this.orderId,
          packageNo: this.packageNo,
          deliveryType: this.deliveryType,
          detailsList: detailsId
        }
      } else if (this.deliveryType === 1) {
        if (!this.deliveryStuffData.deliveryName) {
          this.dialogDeliveryVisible = true
          this.$message({
            message: '请选择配送员',
            type: 'error'
          })
          this.loadingSendNow = false
          return
        }
        this.orderSendData = {
          companyName: this.expressQuery.expComName,
          companyNo: this.expressQuery.expComCode,
          merCode: this.merCode,
          modifyName: this.name,
          orderId: this.orderId,
          deliveryType: this.deliveryType,
          detailsList: detailsId,
          deliveryUserId: this.deliveryStuffData.deliveryUserId,
          deliveryUserName: this.deliveryStuffData.deliveryName,
          deliveryUserPhone: this.deliveryStuffData.deliveryMobile
        }
      }
      // debugger
      console.log('待发货数据', this.orderSendData)
      setOrderSend(this.orderSendData)
        .then(res => {
          //
          this.loadingSendNow = false
          this.dialogDeliveryVisible = false
          this.$message({
            message: '发货成功',
            type: 'success'
          })
          this.expressQuery.expComName = ''
          this.$emit('sendOrder', 111111)
        })
        .catch(res => {
          this.loadingSendNow = false
          this.dialogDeliveryVisible = true
        })
    }
  }
}
</script>

<style>
</style>
