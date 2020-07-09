<template>
  <div>
    <section class="order-manage" style="position:relative" @keydown.enter="searchList()">
      <div class="search-form order-form">
        <div class="search-item">
          <span class="label-name">订单搜索</span>
          <el-select
            v-model="listQuery.orderSearchType"
            filterable
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="selectloading"
            @change="searchSelectChange"
          >
            <el-option
              v-for="itemOp in options"
              :key="itemOp.value"
              :value="itemOp.value"
              :label="itemOp.label"
            />
          </el-select>
        </div>
        <div class="search-item">
          <el-input
            v-model.trim="listQuery.searchValue"
            size="small"
            placeholder
            @keyup.enter.native="searchList()"
          />
        </div>
      </div>
      <div class="search-form">
        <div class="search-item">
          <div class="block">
            <span class="label-name">下单时间</span>
            <el-date-picker
              v-model="dateSelect"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right"
              format="yyyy-MM-dd HH:mm:ss"
              value-format="yyyy-MM-dd HH:mm:ss"
              popper-class="order_dataTimepicker"
              :default-time="['00:00:00', '23:59:59']"
              @change="chooseTimeRange"
            />
          </div>
        </div>
      </div>
      <div class="search-form">
        <div class="search-item">
          <span class="label-name">商品名称</span>
          <el-input v-model.trim="listQuery.proName" size="small" placeholder="商品名称" />
        </div>
        <div class="search-item">
          <span class="label-name">订单类型</span>
          <el-select
            v-model="listQuery.orderType"
            filterable
            placeholder="订单类型"
            @change="handleChangeCommodityType"
          >
            <el-option label="全部" value />
            <el-option label="处方药订单" value="R" />
            <el-option label="普通订单" value="N" />
            <el-option label="拼团订单" value="G" />
            <!-- <el-option label="积分订单" value="V" /> -->
            <el-option label="海贝商城订单" value="I" />
          </el-select>
          <!-- R处方药/N正常订单/V虚拟商品订单/G拼团订单 -->
          <!-- prescriptionSheetMark -->
        </div>
        <!-- <div class="search-item">
            <span class="label-name">订单来源</span>
            <el-select
              v-model="listQuery.orderSource"
              filterable
              placeholder="订单来源"
              @change="handleChangeCommodityType"
            >
              <el-option label="微商城" value="1" />
            </el-select>
        </div>-->
        <div class="search-item">
          <span class="label-name">订单状态</span>
          <el-select
            v-model="listQuery.orderStatus"
            filterable
            placeholder="订单状态"
            @change="handleChangeOrderStatus"
          >
            <el-option label="全部" value />
            <el-option label="待付款" value="2" />
            <el-option label="待发货" value="4" />
            <el-option label="已发货" value="6" />
            <el-option label="待提货" value="7" />
            <el-option label="已完成" value="12" />
            <el-option label="待退款" value="10" />
            <!-- <el-option label="待退货" value="10" /> -->
            <el-option label="待退货" value="8" />
            <!--待退货  == 待退货-->
            <el-option label="退款完成" value="30" />
            <el-option label="已取消" value="20" />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name">收货方式</span>
          <el-select
            v-model="listQuery.receive"
            filterable
            placeholder="收货方式"
            @change="handleChangeCommodityType"
          >
            <el-option label="全部" value />
            <el-option label="普通快递" value="0" />
            <el-option label="配送上门" value="1" />
            <el-option label="门店自提" value="2" />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name">所在门店</span>
          <el-select
            v-model="listQuery.storeId"
            filterable
            placeholder="请输入关键词"
            :remote-method="remoteMethod"
            :loading="selectloading"
            @change="handleChangeStore"
          >
            <el-option label="全部" value />
            <el-option
              v-for="(item,index) in storeList"
              :key="index"
              :label="item.stName+'('+item.stCode+')'"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name">接单员工</span>
          <el-select
            v-model="listQuery.empId"
            filterable
            placeholder="请输入关键词"
            @change="handleChangeStore"
          >
            <el-option label="全部" value />
            <el-option
              v-for="(item,indexEmp) in employeeData"
              :key="indexEmp"
              :label="item.empName+'('+item.empCode+')'"
              :value="item.id"
            />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name">支付方式</span>
          <el-select
            v-model="listQuery.payment"
            filterable
            placeholder="支付方式"
            @change="handleChangeCommodityType"
          >
            <el-option label="全部" value />
            <el-option label="在线支付" value="0" />
            <el-option label="货到付款" value="1" />
          </el-select>
        </div>
      </div>
      <div class="search-form" style="margin-bottom:20px;margin-left:80px">
        <div class="search-item">
          <el-button type="primary" size="small" @click="searchList()">查询</el-button>
          <el-button type size="small" @click="resetQuery">重置</el-button>
          <el-button type="primary" size="small" @click="exportFunc">
            导出
            <i class="el-icon-download el-icon--right" />
          </el-button>
          <export-table />
        </div>
      </div>
      <div v-if="approvalNums > 0" class="message-tips">
        您有{{ approvalNums }}个处方药订单审批，请及时处理！
        <el-button class="sp-btn" type="text" @click="toMerchant">马上去审批 >></el-button>
      </div>
    </section>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="主状态订单" name="first">
        <div class="order_tab">
          <el-radio-group v-model="listQuery.orderStatus" size="small" @change="orderStatusChange">
            <el-radio-button label>全部</el-radio-button>
            <el-radio-button label="2">待付款</el-radio-button>
            <el-radio-button v-loading="loadingCountReceived" label="4">
              待发货
              <template v-if="preSendNum>0">
                <span class="badge">{{ preSendNum }}</span>
              </template>
            </el-radio-button>
            <el-radio-button label="6">已发货</el-radio-button>
            <el-radio-button label="7">待提货</el-radio-button>
            <el-radio-button label="12">已完成</el-radio-button>
            <el-radio-button label="20">已取消</el-radio-button>
          </el-radio-group>
        </div>
      </el-tab-pane>
      <el-tab-pane label="售后订单" name="second">
        <div class="order_tab">
          <el-radio-group v-model="listQuery.orderStatus" size="small" @change="orderStatusChange">
            <el-radio-button label="10">待退款</el-radio-button>
            <el-radio-button label="8">待退货</el-radio-button>
            <el-radio-button label="30">退款完成</el-radio-button>
          </el-radio-group>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { throttle } from '@/utils/throttle'
import exportTable from '../export-table'
import { getPendingOrder, employeeSearch, getCountReceived } from '@/api/order'
import { getMyStoreList } from '@/api/store-goods'
import { exportData } from '@/api/task'
export default {
  components: {
    exportTable
  },
  data() {
    return {
      listQuery: {
        // 'distribution': '', // 配送方式
        empId: '', // 接单员工
        endDate: '', // 下单结束时间
        merCode: '',
        orderSearchType: 1, // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        // 'orderSource': '', // 订单来源 1.微商城
        orderStatus: '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=待提货7) ===已发货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        // prescriptionSheetMark: '', // 订单类型 是不是处方单1、0
        payment: '', // 支付方式
        proName: '', // 商品名称
        receive: '', // 收货方式
        searchValue: '', // 搜索内容
        startDate: '', // 下单开始时间
        isSuper: 0, // 是否是超级管理员
        storeId: '' // 下单门店id
      },
      selectloading: false,
      options: [
        {
          value: 1,
          label: '订单号'
        },
        {
          value: 5,
          label: '拼团订单号'
        },
        {
          value: 2,
          label: '收货人姓名'
        },
        {
          value: 3,
          label: '收货人手机'
        },
        {
          value: 4,
          label: '会员卡号'
        }
      ],
      pickerOptions: {
        // 时间控件相关
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              let end = new Date()
              let start = new Date()
              const year = new Date().getFullYear()
              const month = new Date().getMonth() + 1
              const day = new Date().getDate()
              // const hours = end.getHours()
              // const minutes = end.getMinutes()
              // const seconds = end.getSeconds()
              // end = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
              start = year + '-' + month + '-' + day + ' ' + '00:00:00'
              end = year + '-' + month + '-' + day + ' ' + '23:59:59'

              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              let end = new Date()
              let start = new Date()
              const year = new Date().getFullYear()
              const month = new Date().getMonth() + 1
              const day = new Date().getDate() - 1
              start = year + '-' + month + '-' + day + ' ' + '00:00:00'
              end = year + '-' + month + '-' + day + ' ' + '23:59:59'
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近7天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近30天',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      storeList: [], // 门店
      employeeData: [], // 员工
      dateSelect: [], // 选择下单时间
      approvalNum: 0,
      activeName: 'first',
      loadingCountReceived: false, // 加载待发货数量
      refundStatus: ['10', '8', '30'], // 退款三子
      preSendNum: 0 // 待发货的数量
    }
  },

  computed: {
    ...mapGetters(['merCode', 'name', 'roles']),
    approvalNums() {
      return this.approvalNum
    }
  },
  created() {
    this.getApprovalNum()
    this._loadStoreList()
    // this._employeeSearch()
    this.getpreSendNum()
  },
  mounted() {
    const that = this
    that.$nextTick(() => {
      that.timer = setInterval(that.getApprovalNum, 60000)
    })
  },
  methods: {
    handleClick(val) {
      console.log('tab切换了-------', val)
      if (val.name === 'first') {
        this.listQuery.orderStatus = ''
      } else {
        this.listQuery.orderStatus = '10'
      }
      this.$emit('changeTab', val.name)
      this.searchList()
    },
    // 父组件更改了表单项，修改表单并触发搜索
    fatherSearchForm(params) {
      this.listQuery = {
        ...this.listQuery,
        ...params
      }
      this.searchList()
    },
    orderStatusChange(val) {
      console.log('val', val)
      this.searchList()
    },
    // 搜索回调了
    searchList() {
      console.log('this.listQuery', this.listQuery)
      // 特殊处理退款单的状态需要改为传递returnStatus  售后状态 0:待退货 1 待退款 2 退款完成
      const dataParam = Object.assign({}, this.listQuery)
      dataParam.isSuper = this.roles.includes('admin') ? 1 : 0
      switch (this.listQuery.orderStatus) {
        case '10':
          dataParam.returnStatus = 1
          break
        case '8':
          dataParam.returnStatus = 0
          break
        case '30':
          dataParam.returnStatus = 2
          break
        default:
          break
      }
      this.getpreSendNum()
      this.$emit('search', 'searchForm', dataParam)
    },
    getpreSendNum() {
      this.loadingCountReceived = true
      getCountReceived(this.listQuery).then(res => {
        this.loadingCountReceived = false
        if (res.data >= 0) {
          this.preSendNum = res.data
        }
      })
    },
    remoteMethod(val) {
      this.selectloading = true
    },
    searchSelectChange(data) {
      this.listQuery.searchValue = ''
    },
    chooseTimeRange(date) {
      // 时间选择
      if (!date) {
        this.listQuery.startDate = ''
        this.listQuery.endDate = ''
      }
      if (date && date.length !== 0) {
        this.listQuery.startDate = this.dateSelect[0]
        this.listQuery.endDate = this.dateSelect[1]
      }
    },
    handleChangeCommodityType(val) {
      // 商品类型改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.searchList()
    },
    resetQuery() {
      sessionStorage.removeItem('listQ')
      let isSuper = 0
      if (this.roles.includes('admin')) {
        isSuper = 1
      } else {
        isSuper = 0
      }
      this.listQuery = {
        // 'distribution': '', // 配送方式
        empId: '', // 接单员工
        endDate: '', // 下单结束时间
        merCode: this.merCode,
        orderSearchType: 1, // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        // 'orderSource': '', // 订单来源 1.微商城
        orderStatus: '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=7.待提货) 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        // prescriptionSheetMark: '', // 订单类型 是不是处方单1、0
        payment: '', // 支付方式
        proName: '', // 商品名称
        receive: '', // 收货方式
        searchValue: '', // 搜索内容
        startDate: '', // 下单开始时间
        isSuper: isSuper, // 是否是超级管理员
        storeId: '' // 下单门店id
      }
      this.dateSelect = '' // 下单时间置空
      this.activeName = 'first'
      this.$emit('changeTab', 'first')
      this.searchList()
    },
    _loadStoreList(val = '') {
      // 加载门店数据
      return new Promise((resolve, reject) => {
        getMyStoreList({
          pageSize: 10000,
          currentPage: 1,
          storeName: val
        })
          .then(res => {
            const { data } = res.data
            // data.unshift({ id: '', stName: '全部' })
            this.storeList = data
            this.selectloading = false
            resolve(data)
          })
          .catch(err => {
            this.selectloading = false
            reject(err)
          })
      })
    },
    _employeeSearch() {
      console.log('1111111----_employeeSearch')
      return new Promise((resolve, reject) => {
        if (Array.isArray(this.employeeData) && this.employeeData.length) {
          return resolve(this.employeeData)
        }
        employeeSearch({
          merCode: this.merCode,
          pageSize: 10000,
          status: 1
        })
          .then(res => {
            // 获取门店员工
            if (res.data) {
              this.employeeData = res.data.data
              resolve(res.data.data)
            }
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    handleChangeOrderStatus(val) {
      // 订单状态改变时触发
      // this.storeList.map(v => {
      //   if (v.id === val) {
      //     this.chooseStore = v
      //   }
      // })
      let activeName = ''
      if (this.refundStatus.includes(val)) {
        activeName = 'second'
      } else {
        activeName = 'first'
      }
      this.$emit('changeTab', activeName)
      this.searchList()
    },
    handleChangeStore(val) {
      // 门店选择改变时触发
      // this.storeList.map(v => {
      //   if (v.id === val) {
      //     this.chooseStore = v
      //   }
      // })
      this.searchList()
    },
    exportFunc: throttle(async function() {
      console.log('导出')
      exportData(this.listQuery)
        .then(res => {
          if (res.code === '10000') {
            this.$alert(
              '订单列表正在导出中，稍后请点击【查看并导出记录】下载导出文件',
              '订单导出',
              {
                confirmButtonText: '好的',
                center: true,
                roundButton: true,
                confirmButtonClass: 'hydee_alert_btn'
              }
            )
          }
        })
        .catch(error => {
          console.log('导出错误-----------', error)
        })
    }, 3000),
    // 获取当前审批单数量
    getApprovalNum() {
      getPendingOrder(this.$store.state.user.merCode).then(res => {
        console.log(res.code)
        if (res.code === '10000') {
          this.approvalNum = res.data ? res.data : 0
          console.log('组件生成周期', this.approvalNum)
        }
      })
    },
    // 跳转小蜜审方
    toMerchant() {
      window.open('https://xiaomi.hydee.cn/merchant-admin/', '_blank')
    }
  },
  destroyed() {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss" scoped>
.order-manage {
  .search-form {
    .search-item {
      margin-bottom: 10px;
      .label-name {
        width: 80px;
      }
      .el-input {
        width: 180px;
      }
    }
  }
}
</style>
