<template>
  <div v-loading="loading" class="container">
    <div class="header-panel">
      <div class="box">
        <div
          class="item frist"
          :class="orderStatus === '' && 'active'"
          @click="changeTableItem('')"
        >
          全部
        </div>
        <div class="cutoff" />
        <div
          class="item"
          :class="orderStatus === 'SUCCESS' && 'active'"
          @click="changeTableItem('SUCCESS')"
        >
          待到货
        </div>
        <div class="cutoff" />
        <div
          class="item"
          :class="orderStatus === 'ARRIVED' && 'active'"
          @click="changeTableItem('ARRIVED')"
        >
          待核销
        </div>
        <div class="cutoff" />
        <div
          class="item last"
          :class="orderStatus === 'COMPLETE' && 'active'"
          @click="changeTableItem('COMPLETE')"
        >
          已完成
        </div>
      </div>
      <el-select
        v-model="selectStore.storeName"
        filterable
        placeholder="选择门店"
        class="search"
        @change="selectChange"
      >
        <el-option
          v-for="item in storeListData"
          :key="item.id"
          :label="item.storeName"
          :value="{ storeName: item.storeName, id: item.id }"
        />
      </el-select>
      <div class="search-container">
        <div class="search-item" @keyup.enter="forSearch()">
          <el-input
            v-model="orderNum"
            placeholder="请输入预约单号搜索"
            prefix-icon="el-icon-search"
            class="search"
          />
        </div>
        <div class="search-btns" style="margin-left:10px;">
          <el-button
            type="primary"
            size="small"
            @click.stop="forSearch()"
          >搜 索</el-button>
        </div>
        <el-button
          style="margin-left:20px;"
          type="primary"
          size="small"
          @click.stop="exportDisplayHandler(true)"
        >批量导出</el-button>
      </div>
    </div>
    <div class="table-panel">
      <table-card
        :table-data="orderListData"
        @button-click="setDialogContent"
      />
    </div>
    <div class="pagination-panel">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-table :data="dialogContent">
        <el-table-column property="pic" label="商品图片" width="150">
          <div
            style="width: 72px;
    height: 72px;position: relative;"
          >
            <img
              :src="
                showImgHandler(
                  dialogContent[0] && dialogContent[0].productImgUrl
                )
              "
              style="width: 72px;
    height: 72px;z-index:2;position: absolute;"
            >
            <div
              class="dialog-pic"
              style="width: 72px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    font-size: 14px;
    color: #9b9b9b;
    background-color: #ebebeb;z-index:1;position: absolute;"
            >
              暂无图片
            </div>
          </div></el-table-column>
        <el-table-column
          property="productName"
          label="商品名称/编号"
          width="200"
        />
        <el-table-column property="productPrice" label="单价" />
        <el-table-column property="productCount" label="数量" />
      </el-table>
      <div style="display:flex;flex-direction:row;margin-top:40px;">
        <div style="color:#000;font-size:14px">预约单号：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0] && dialogContent[0].id }}
        </div>
      </div>
      <div
        v-if="dialogContent[0] && dialogContent[0].status === 'ARRIVED'"
        style="display:flex;flex-direction:row;margin-top:40px;"
      >
        <div style="color:#000;font-size:14px">预约人：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0] && dialogContent[0].personName }}
        </div>
      </div>
      <div
        v-if="dialogContent[0] && dialogContent[0].status === 'ARRIVED'"
        style="display:flex;flex-direction:row;margin-top:40px;"
      >
        <div style="color:#000;font-size:14px">身份证号：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0] && dialogContent[0].personId }}
        </div>
      </div>
      <div
        v-if="dialogContent[0] && dialogContent[0].status === 'SUCCESS'"
        style="display:flex;flex-direction:row;margin-top:40px;"
      >
        <div style="color:#000;font-size:14px">收货门店：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0].address }}
        </div>
      </div>
      <div
        style="display:flex;flex-direction:row;margin-top:40px;justify-content: center;"
      >
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          type="primary"
          @click="updateOrderStatusService"
        >确认</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="批量导出数据"
      :visible.sync="exportDialogVisible"
      append-to-body
      width="60%"
      @close="resetSelectReport"
    >
      <div class="line">
        <el-select
          v-model="selectDayStore.storeName"
          filterable
          placeholder="选择门店"
          class="search"
          @change="changeSelectDayStoreID"
        >
          <el-option
            v-for="item in storeListDayData"
            :key="item.id"
            :label="item.storeName"
            :value="{ storeName: item.storeName, id: item.id }"
          />
        </el-select>
        <el-select
          v-model="selectDayGoods.label"
          filterable
          placeholder="选择商品类型"
          class="search"
        >
          <el-option
            v-for="item in selectDayGoodsList"
            :key="item.id"
            :label="item.label"
            :value="{ label: item.label, id: item.id }"
          />
        </el-select>
        <el-select
          v-model="selectDayModule.label"
          placeholder="请选择时间"
          @change="selectDayChange"
        >
          <el-option-group
            v-for="(group, idx) in dayOptions"
            :key="idx"
            label=""
          >
            <el-option
              v-for="(item, index) in group.options"
              :key="index"
              :label="item.label"
              :value="{ label: item.label, value: item.value }"
              :disabled="item.disabled"
            />
          </el-option-group>
        </el-select>
        <el-button
          style="margin-left:20px;"
          type="primary"
          @click="searchDayReport"
        >搜索</el-button>
        <el-button
          style="margin-left:20px;"
          @click="resetSelectReport"
        >重置</el-button>
      </div>
      <el-table
        v-loading="reportloading"
        :data="exportList"
        style="width: 100%;margin-top:20px;"
        height="400"
        border
      >
        <el-table-column prop="id" label="预约单编号" />
        <el-table-column prop="productName" label="商品" />
        <el-table-column prop="productCount" label="数量" />
        <el-table-column label="预约人姓名/手机号/身份证号">
          <template slot-scope="scope">
            <div>
              {{ scope.row.memberPersonName }} /
              {{ scope.row.memberMobilePhone }} / {{ scope.row.memberPersonId }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="预约时间" />
        <el-table-column prop="updateTime" label="领取时间" />
        <el-table-column prop="updateTime" label="门店名称/地址">
          <template slot-scope="scope">
            <div>
              {{ scope.row.storeName }} /
              {{ scope.row.storeAddress }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top:20px;">
        筛选完成，是否导出全部数据？
      </div>
      <div style="margin-top:20px;display:flex;justify-content: flex-end;">
        <el-button @click.stop="exportDisplayHandler(false)">取消</el-button>
        <el-button
          v-loading="reportloading"
          type="primary"
          @click="donwloadExcel"
        >导出</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableCard from './table-card/index.vue'
import DistributionService from '@/api/distributionService'
export default {
  components: { tableCard },
  data() {
    return {
      storeListData: [],
      storeListDayData: [],
      selectStore: { storeName: '全部', id: '' },
      selectDayStore: { storeName: '全部', id: '' },
      selectDayGoodsList: [{ label: '全部', id: '' }],
      selectDayGoods: { label: '全部', id: '' },
      dialogVisible: false,
      dialogTitle: '',
      dialogContent: [],
      orderStatus: '',
      orderNum: '',
      currentPage: 1,
      pageSize: 10,
      orderListData: [],
      totalCount: 0,
      loading: true,
      exportDialogVisible: false,
      selectDayModule: { label: '当天', id: 16 },
      selectResult: {},
      selectDayStoreID: '',
      exportExcel: null,
      dayOptions: [
        {
          label: '',
          options: [
            {
              value: '16',
              label: '当天'
            },
            {
              value: '15',
              label: '最近一周'
            },
            {
              value: '14',
              label: '最近一个月'
            },
            {
              value: '13',
              label: '最近三个月'
            }
          ]
        },
        {
          label: '',
          options: [
            {
              value: '1',
              label: '一月'
            },
            {
              value: '2',
              label: '二月'
            },
            {
              value: '3',
              label: '三月'
            },
            {
              value: '4',
              label: '四月'
            },
            {
              value: '5',
              label: '五月'
            },
            {
              value: '6',
              label: '六月'
            },
            {
              value: '7',
              label: '七月'
            },
            {
              value: '8',
              label: '八月'
            },
            {
              value: '9',
              label: '九月'
            },
            {
              value: '10',
              label: '十月'
            },
            {
              value: '11',
              label: '十一月'
            },
            {
              value: '12',
              label: '十二月'
            }
          ]
        }
      ],
      exportList: [],
      reportloading: true
    }
  },
  watch: {
    orderNum(newValue) {
      this.orderNum = newValue
    }
  },
  mounted() {
    this.getStoreListServie()
    const d = new Date()
    this.dayOptions[1].options.map(item => {
      if (Number(item.value) > d.getMonth() + 1) {
        item.disabled = true
      }
    })
  },
  methods: {
    changeSelectDayStoreID(e) {
      console.log('selectDayStoreID _________________ : ', e)
      this.selectDayStore = e
    },
    searchDayReport() {
      this.queryReportService()
    },
    async queryReportService() {
      this.reportloading = true
      const storeId = this.selectDayStore.id
      const { data } = await DistributionService.queryReport(
        Object.assign(this.selectResult, { storeId })
      )
      this.exportList = data
      this.exportReportService()
    },
    async exportReportService() {
      console.log(
        'exportReportService ________________________________________'
      )
      const storeId = this.selectDayStore.id
      const res = await DistributionService.exportReport(
        Object.assign(this.selectResult, {
          storeId,
          responsetype: 'blob'
        })
      )
      this.exportExcel = res
      this.reportloading = false
    },
    resetSelectReport() {
      this.selectDayModule = { label: '当天', value: '16' }
      this.selectDayStore = { storeName: '全部', id: '' }
      this.selectDayStoreID = ''
      this
    },
    donwloadExcel() {
      const content = this.exportExcel
      const blob = new Blob([content], {
        type: 'application/vnd.ms-excel;charset=utf-8'
      })

      const fileName = `export${Date.parse(new Date())}.xls`
      if ('download' in document.createElement('a')) {
        // 非IE下载
        const elink = document.createElement('a')
        elink.download = fileName
        elink.style.display = 'none'
        elink.href = URL.createObjectURL(blob)
        document.body.appendChild(elink)
        elink.click()
        URL.revokeObjectURL(elink.href) // 释放URL 对象
        document.body.removeChild(elink)
      } else {
        // IE10+下载
        navigator.msSaveBlob(blob, fileName)
      }
    },
    selectDayChange(e) {
      // 选择月份
      console.log(e)

      const val = e.value
      this.selectDayModule = e
      if (Number(val) <= 12) {
        this.selectResult = this.selectMouth(e)
      } else {
        if (Number(val) === 13) {
          // 3个月
          this.selectResult = this.getMonthDay(3)
        } else if (Number(val) === 14) {
          // 1个月
          this.selectResult = this.getMonthDay(1)
        } else if (Number(val) === 15) {
          // 一周\
          this.selectResult = this.getDayWeek()
        } else {
          // 当天
          this.getNowTime()
        }
      }
      console.log('Result _________________________ : ', this.selectResult)
    },
    getNowTime() {
      const date = new Date()
      // const valueOfDate = date.valueOf()
      const nowTime = date
        .toLocaleDateString()
        .toString()
        .split('/')
        .join('-')

      this.selectResult = {
        startDate: `${nowTime} 00:00:00`,
        endDate: `${nowTime} 23:59:59`
      }
    },
    /**
     * 选择几月份
     */
    selectMouth(num) {
      const date = new Date()
      const year = date.getFullYear()
      const mouthDayArray = [
        31,
        this.isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ]
      return {
        startDate: `${year}-${num}-01 00:00:00`,
        endDate: `${year}-${num}-${mouthDayArray[num - 1]} 23:59:59`
      }
    },
    getDayWeek() {
      const date = new Date()
      const valueOfDate = date.valueOf()
      const nowTime = date
        .toLocaleDateString()
        .toString()
        .split('/')
        .join('-')
      const resultTime = new Date(valueOfDate - 86400 * 1000 * 7)
        .toLocaleDateString()
        .toString()
        .split('/')
        .join('-')
      return {
        startDate: `${resultTime} 00:00:00`,
        endDate: `${nowTime} 23:59:59`
      }
    },
    /**
     * 解析时间天数
     */
    getMonthDay(num) {
      const date = new Date()
      const valueOfDate = date.valueOf()
      const nowTime = date
        .toLocaleDateString()
        .toString()
        .split('/')
        .join('-')
      const year = date.getFullYear()
      const mouth = date.getMonth() + 1
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()
      const mouthDayArray = [
        31,
        this.isLeapYear(year) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ]
      const temp = []
      for (let i = 1; i <= num; i++) {
        if (mouth - i - 1 >= 0) {
          temp.push(mouthDayArray[mouth - i - 1])
        } else {
          temp.push(mouthDayArray[12 + mouth - i - 1])
        }
      }
      console.log(temp)
      const sum = temp.reduce((x, y) => x + y)
      const resultTime = new Date(valueOfDate - 86400 * 1000 * sum)
        .toLocaleDateString()
        .toString()
        .split('/')
        .join('-')
      console.log('resultTime ___________________ : ', {
        startDate: `${nowTime} ${h < 10 ? '0' + h : h}:${
          m < 10 ? '0' + m : m
        }:${s < 10 ? '0' + s : s}`,
        endDate: `${resultTime} ${h < 10 ? '0' + h : h}:${
          m < 10 ? '0' + m : m
        }:${s < 10 ? '0' + s : s}`
      })
      return {
        startDate: `${resultTime} 00:00:00`,
        endDate: `${nowTime} 23:59:59`
      }
    },
    /**
     * 判断是否是闰年
     */
    isLeapYear(year) {
      const cond1 = year % 4 === 0 // 条件1：年份必须要能被4整除
      const cond2 = year % 100 !== 0 // 条件2：年份不能是整百数
      const cond3 = year % 400 === 0 // 条件3：年份是400的倍数
      // 当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
      // 如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
      // 所以得出判断闰年的表达式：
      const cond = (cond1 && cond2) || cond3
      if (cond) {
        return true
      } else {
        return false
      }
    },
    selectChange(e) {
      this.selectStore = e
      this.getOrderListByTypeService()
    },
    selectDayStoreChange(e) {
      this.selectDayStore = e
      // this.getOrderListByTypeService()
    },
    /*  */
    handleSizeChange(e) {
      this.pageSize = e
      this.currentPage = 1
      this.getOrderListByTypeService()
    },
    handleCurrentChange(e) {
      this.currentPage = e
      this.getOrderListByTypeService()
    },
    /* 搜索 */
    forSearch() {
      this.getOrderListByTypeService()
    },
    /* 查询门店列表 */
    async getStoreListServie() {
      const { data, code } = await DistributionService.queryStoreList({
        pageSize: 10000
      })
      if (code === '10000') {
        this.storeListData = [{ storeName: '全部', id: '' }].concat(data.data)
        this.storeListDayData = [{ storeName: '全部', id: '' }].concat(
          data.data
        )

        this.getOrderListByTypeService()
      }
    },
    /**
     * 查询订单
     */
    async getOrderListByTypeService() {
      const params = {
        currentPage: this.currentPage,
        orderId: this.orderNum,
        orderStatus: this.orderStatus,
        pageSize: this.pageSize,
        storeId: this.selectStore.id
      }
      const { data, code } = await DistributionService.queryOrderListByType(
        params
      )
      this.loading = false
      if (code === '10000') {
        this.orderListData = data.data
        this.totalCount = data.totalCount
        // this.orderListData = [
        //   {
        //     address: 'string',
        //     createTime: '2020-02-05T15:18:19.333Z',
        //     id: 0,
        //     memberId: 0,
        //     merCode: 'string',
        //     mobilePhone: 'string',
        //     personId: 'string',
        //     personName: 'string',
        //     productCount: 0,
        //     productId: 0,
        //     productImgUrl: 'string',
        //     productName: 'string',
        //     productPrice: 0,
        //     projectCountPerMember: 0,
        //     projectDaysPerMember: 0,
        //     projectLimitPerMember: 0,
        //     status: 'SUCCESS',
        //     storeName: 'string'
        //   }
        // ]
      }
      console.warn('getOrderListByTypeService _________________ ', data)
    },
    /* 核销 */
    async updateOrderStatusService() {
      const params = {
        id: this.dialogContent[0].id,
        status:
          this.dialogContent[0].status === 'SUCCESS' ? 'ARRIVED' : 'COMPLETE'
      }
      console.log('updateOrderStatusService ________________ ')
      const { data, code } = await DistributionService.updateOrderStatus(params)
      if (code === '10000') {
        console.log(data)
        this.closeDialog()
        this.getOrderListByTypeService()
      }
    },

    /* 切换展示数据类型 */
    changeTableItem(type) {
      if (this.orderStatus === type) return
      this.orderStatus = type
      this.currentPage = 1
      this.getOrderListByTypeService()
    },
    /* table-card 组件按钮点击 */
    setDialogContent(obj) {
      this.dialogVisible = true
      if (obj.status === 'ARRIVED') {
        this.dialogTitle = '确认核销'
      } else if (obj.status === 'SUCCESS') {
        this.dialogTitle = '确认到货 (签收后预约单进入核销状态，请提醒用户上门)'
      }
      this.dialogContent = [obj]
    },
    closeDialog() {
      this.dialogVisible = false
    },
    exportDisplayHandler(bol) {
      this.exportDialogVisible = bol
      if (bol) {
        this.getNowTime()
        this.queryReportService()
      } else {
        this.resetSelectReport()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  overflow-y: scroll;
  height: calc(100vh - 160px);

  .header-panel {
    padding: 10px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .search-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .search {
      width: 284px;
      margin-left: 44px;
    }
    .box {
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      border: 1px solid #d7d7d7;
      flex-shrink: 0;
      .cutoff {
        width: 1px;
        background-color: #d7d7d7;
      }
      .item {
        padding: 12px;
        font-size: 14px;
        background: #fff;
        color: #4a4a4a;
        cursor: pointer;
        display: inline-block;
        &.frist {
          border-radius: 6px 0 0 6px;
        }
        &.last {
          border-radius: 0 6px 6px 0;
        }
        &.active {
          color: #fff;
          background: #157de8;
        }
      }
    }
  }
  .table-panel {
    padding: 0 25px;
  }
  .pagination-panel {
    padding: 0 25px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0 20px 0;
  }
  .dialog-pic {
    width: 72px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    font-size: 14px;
    color: #9b9b9b;
    background-color: #ebebeb;
  }
}
</style>
