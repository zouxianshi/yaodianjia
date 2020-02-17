<template>
  <div class="page-container">
    <div class="row">
      <div class="label-box">
        <div class="label">选择到货商品：</div>
        <el-select
          v-model="classify.name"
          placeholder="请选择"
          class="select"
          @change="classifyChange"
        >
          <el-option
            v-for="item in classifyList"
            :key="item.productId"
            :label="item.name"
            :value="{ name: item.name, productId: item.productId }"
          />
        </el-select>
      </div>

      <div class="label-box">
        <div class="label">下单时间：</div>
        <el-select
          v-model="selectDayOption.label"
          placeholder="请选择"
          class="select"
          @change="timeChange"
        >
          <el-option
            v-for="item in dayOption"
            :key="item.type"
            :label="item.label"
            :value="{ label: item.label, type: item.type }"
          />
        </el-select>
      </div>
    </div>

    <div class="row" style="margin-top:10px;">
      <div class="label-box">
        <el-button
          style="margin-left:120px;"
          type="primary"
          size="small"
          @click.stop="_search"
        >查询订单</el-button>
      </div>
    </div>

    <div class="tabel">
      <div class="title font">查询结果：</div>
      <div class="content font">
        订单数量：{{ baseInfo.orderCount || '暂无' }}
      </div>
      <div class="content font">
        订单商品总量：{{ baseInfo.productAllCount || '暂无' }}
      </div>
    </div>

    <div class="btns">
      <el-button
        style="margin-left:120px;"
        type="primary"
        size="small"
        :disabled="disable"
        @click.stop="dialogHandler(true)"
      >确认到货</el-button>
    </div>

    <el-dialog
      :visible.sync="showDialog"
      title="确认批量到货"
      append-to-body
      width="60%"
      @close="resetDialogData"
    >
      <el-form>
        <el-form-item label="到货商品：">
          <div>{{ dialogData.name }}</div>
        </el-form-item>
        <el-form-item label="订单数量：">
          <div>{{ dialogData.orderCount }}</div>
        </el-form-item>
        <el-form-item label="订单商品总量：">
          <div>{{ dialogData.productAllCount }}</div>
        </el-form-item>
        <el-form-item label="到货数量：">
          <div style="display:flex;flex-direction: row;flex-wrap: nowrap;">
            <el-input
              v-model="arrivalCount"
              placeholder="请输入到货数量"
              style="width:320px;"
            />
            <div style="margin-left:12px;">个</div>
          </div>
        </el-form-item>
        <el-form-item label="建议领取时间：">
          <el-date-picker
            v-model="time"
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            :editable="dateable"
            :clearable="dateable"
            format="yyyy-MM-dd HH:mm"
            @change="datePickerChange"
          />
        </el-form-item>
        <div
          style="padding:10px 20px;background:#FFF1DA;color:#B17107;font-size:14px;"
        >
          请确认到货数量（您的实际商品库存）≥订单商品总量
        </div>
        <div
          style="margin-top:10px;display:flex;flex-direction: row;justify-content: flex-end;"
        >
          <el-button
            size="small"
            @click.stop="dialogHandler(false)"
          >取消</el-button>
          <el-button
            style="margin-left:20px;"
            type="primary"
            size="small"
            @click.stop="bulkArrivalService"
          >确认到货</el-button>
        </div>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import DistributionService from '@/api/distributionService'
export default {
  data() {
    return {
      classify: { name: '', productId: null },
      classifyList: [],
      showDialog: false,
      dateable: false,
      time: {
        minDate: null,
        maxDate: null
      },
      dateParam: [],
      todayParam: [],
      dateClick: false,
      arrivalCount: 1,
      datePickerSetting: false,
      dayOption: [
        { label: '全部', type: 0 },
        { label: '今天', type: 1 },
        { label: '昨天', type: 2 },
        { label: '前天', type: 3 },
        { label: '本周', type: 4 }
      ],
      selectDayOption: { label: '全部', type: 0 },
      timeData: { startDate: '', endDate: '' },
      baseInfo: { orderCount: null, productAllCount: null, orderIds: null },
      dialogData: {},
      disable: true,
      timeOptionRange: '',
      pickerOptions: {
        disabledDate: time => {
          // console.log(new Date(time).toLocaleDateString())
          // console.log(new Date(2020, 1, 16).getTime() > time.getTime())
          // console.log('time :', time.getTime())
          // console.log('Date :', new Date(2020, 1, 16).getTime())
          // console.log('Date :', new Date(2020, 1, 16).toLocaleDateString())
          // console.log('this________time : ', this.time)
          // if (!!!this.time) this.time = { minDate: null, maxDate: null }
          if (!this.time.minDate) {
            // 还未选中起始时间
            return (
              new Date(
                Number(this.todayParam[0]),
                Number(this.todayParam[1]) - 1,
                Number(this.todayParam[2])
              ).getTime() > time.getTime()
            )
          } else {
            return (
              new Date(
                Number(this.dateParam[0]),
                Number(this.dateParam[1]) - 1,
                Number(this.dateParam[2])
              ).getTime() !== time.getTime()
            )
          }
        },
        onPick: param => {
          // console.log(
          //   'onPick _________________ :',
          //   new Date(param.minDate).toLocaleDateString()
          // )

          if (!!param.minDate && !!param.maxDate && this.dateClick) {
            param = {
              minDate: null,
              maxDate: null
            }
          }
          if (!this.dateClick) this.dateClick = true

          this.time = param
          this.dateParam = new Date(param.minDate)
            .toLocaleDateString()
            .split('/')
        }
      }
    }
  },
  watch: {
    time(newValue) {
      // 解决时间选择组件清空按钮报错问题
      if (!newValue) this.time = { minDate: null, maxDate: null }
    }
  },
  mounted() {
    this.queryGoodsClassify()
    this.todayParam = new Date().toLocaleDateString().split('/')
    console.log(this.todayParam)
  },
  methods: {
    datePickerChange(e) {
      // 点击确定按钮校验数据
      const start = e[0]
      const end = e[1]
      // 如果不是同一天
      if (
        new Date(start).toLocaleDateString() !==
        new Date(end).toLocaleDateString()
      ) {
        this.time = { minDate: null, maxDate: null }
        this.$message({
          message: '建议领取时间不是同一天',
          type: 'error'
        })
        return
      }

      // 结束时间小于开始时间
      if (Date.parse(new Date(start)) > Date.parse(new Date(end))) {
        this.time = { minDate: null, maxDate: null }
        this.$message({
          message: '建议领取时间时间段设置错误',
          type: 'error'
        })
        return
      }
      this.time = e
    },
    async queryGoodsClassify() {
      const { data } = await DistributionService._getProductList()
      this.classifyList = data
    },
    timeChange(e) {
      this.selectDayOption = e
      this.computerDayOptions(e.type)
    },
    classifyChange(e) {
      this.classify = e
    },
    async _search() {
      if (!this.classify.productId) return
      const param = { productId: this.classify.productId, ...this.timeData }
      const { data } = await DistributionService.getBaseInfo(param)
      this.baseInfo = { ...data }
      this.disable = !this.baseInfo.orderCount
    },
    dialogHandler(bol) {
      if (bol) {
        this.dialogData = { ...this.baseInfo, ...this.classify }
      } else {
        this.resetDialogData()
      }

      this.showDialog = bol
      this.dateable = false
    },
    computerDayOptions(type) {
      let time = { startDate: '', endDate: '' }
      const date = new Date()
      const today = date.toLocaleDateString().split('/')
      if (type === 1) {
        // 今天
        time = {
          startDate: `${today[0]}-${
            today[1] < 10 ? '0' + today[1] : today[1]
          }-${today[2] < 10 ? '0' + today[2] : today[2]} 00:00:00`,
          endDate: `${today[0]}-${today[1] < 10 ? '0' + today[1] : today[1]}-${
            today[2] < 10 ? '0' + today[2] : today[2]
          } 23:59:59`
        }
      } else if (type === 2) {
        // 昨天
        const endDate = new Date(Date.parse(date) - 86400000)
          .toLocaleDateString()
          .split('/')
        time = {
          startDate: `${endDate[0]}-${
            endDate[1] < 10 ? '0' + endDate[1] : endDate[1]
          }-${endDate[2] < 10 ? '0' + endDate[2] : endDate[2]} 00:00:00`,
          endDate: `${today[0]}-${today[1] < 10 ? '0' + today[1] : today[1]}-${
            today[2] < 10 ? '0' + today[2] : today[2]
          } 23:59:59`
        }
      } else if (type === 3) {
        const endDate = new Date(Date.parse(date) - 86400000 * 2)
          .toLocaleDateString()
          .split('/')
        time = {
          startDate: `${endDate[0]}-${
            endDate[1] < 10 ? '0' + endDate[1] : endDate[1]
          }-${endDate[2] < 10 ? '0' + endDate[2] : endDate[2]} 00:00:00`,
          endDate: `${today[0]}-${today[1] < 10 ? '0' + today[1] : today[1]}-${
            today[2] < 10 ? '0' + today[2] : today[2]
          } 23:59:59`
        }
      } else if (type === 4) {
        const num = date.getDay() - 1
        const endDate = new Date(Date.parse(date) - 86400000 * num)
          .toLocaleDateString()
          .split('/')
        time = {
          startDate: `${endDate[0]}-${
            endDate[1] < 10 ? '0' + endDate[1] : endDate[1]
          }-${endDate[2] < 10 ? '0' + endDate[2] : endDate[2]} 00:00:00`,
          endDate: `${today[0]}-${today[1] < 10 ? '0' + today[1] : today[1]}-${
            today[2] < 10 ? '0' + today[2] : today[2]
          } 23:59:59`
        }
      }
      this.timeData = time
    },
    resetDialogData() {
      this.time = null
      this.arrivalCount = 1
      this.dialogData = {}
    },
    async bulkArrivalService() {
      console.log('construct : ', this.time.constructor === Array)
      if (this.time.constructor !== Array) {
        this.$message({
          message: '请选择建议领取时间',
          type: 'error'
        })
        return
      }
      const time = this.time

      const _startDate = new Date(time[0]).toLocaleDateString().split('/')
      const _s_h =
        new Date(time[0]).getHours() < 10
          ? '0' + new Date(time[0]).getHours()
          : new Date(time[0]).getHours()
      const _s_m =
        new Date(time[0]).getMinutes() < 10
          ? '0' + new Date(time[0]).getMinutes()
          : new Date(time[0]).getMinutes()
      console.log(_s_h, _s_m)
      const _endDate = new Date(time[1]).toLocaleDateString().split('/')
      const _e_h =
        new Date(time[1]).getHours() < 10
          ? '0' + new Date(time[1]).getHours()
          : new Date(time[1]).getHours()
      const _e_m =
        new Date(time[1]).getMinutes() < 10
          ? '0' + new Date(time[1]).getMinutes()
          : new Date(time[1]).getMinutes()
      console.log(_e_h, _e_m)
      const startDate = `${_startDate[0]}-${
        _startDate[1] < 10 ? '0' + _startDate[1] : _startDate[1]
      }-${
        _startDate[2] < 10 ? '0' + _startDate[2] : _startDate[2]
      } ${_s_h}:${_s_m}:00`
      const endDate = `${_endDate[0]}-${
        _endDate[1] < 10 ? '0' + _endDate[1] : _endDate[1]
      }-${
        _endDate[2] < 10 ? '0' + _endDate[2] : _endDate[2]
      } ${_e_h}:${_e_m}:00`
      const param = {
        arrivalCount: Number(this.arrivalCount),
        endDate,
        orderIds: this.dialogData.orderIds,
        startDate
      }
      console.log('param ________________ : ', param)
      const { code } = await DistributionService.bulkArrival(param)
      if (code === '10000') {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        this.dialogHandler(false)
        this.$router.go(-1)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page-container {
  height: calc(100vh - 200px);
  .row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 80%;
    margin: 32px auto 0 auto;

    .label-box {
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      align-items: center;
      .label {
        color: rgba(0, 0, 0, 0.85);
        font-size: 14px;
        width: 120px;
        text-align: right;
      }
      .select {
        width: 332px;
      }
    }
  }
  .btns {
    width: 80%;
    margin: 40px auto 0 auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  .tabel {
    width: 80%;
    height: 175px;
    background: rgba(243, 242, 242, 1);
    margin: 47px auto 0 auto;
    overflow: hidden;
    .font {
      color: #000;
      font-size: 16px;
      margin-left: 32px;
    }
    .title,
    .content {
      margin-top: 21px;
    }
  }
}
</style>
