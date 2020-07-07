<template>
  <div class="member-list-modal app-container">
    <el-form label-width="130" label-position="right" size="mini" :inline="true">
      <el-form-item label="发放对象：">商户会员</el-form-item><div />
      <el-form-item label="匹配条件：">
        <el-select v-model="infoForm.allMember" placeholder="请选择">
          <el-option :value="1" label="全部会员" />
          <el-option :value="2" label="部分会员" />
        </el-select>
      </el-form-item>
      <br>
      <div v-if="infoForm.allMember === 2">
        <el-form-item label="出生月份：" label-width="100">
          <el-select v-model="infoForm.month" placeholder="请选择">
            <el-option :value="null" label="不限" />
            <el-option v-for="item in 12" :key="item" :label="item + '月'" :value="item" />
          </el-select>
        </el-form-item>
        <el-form-item label="性别：" label-width="100">
          <el-select v-model="infoForm.sex" placeholder="请选择">
            <el-option
              v-for="(item, index) in sex"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="领卡时间：" label-width="100">
          <el-select v-model="infoForm.lkTime" placeholder="请选择">
            <el-option
              v-for="(item, index) in lkOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-if="infoForm.lkTime === null"
            v-model="infoForm.lkTimeQj"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="年龄区间：">
          <el-select v-model="infoForm.ageInterval" placeholder="请选择">
            <el-option
              v-for="(item, index) in ageInterval"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <el-date-picker
            v-if="infoForm.ageInterval === null"
            v-model="infoForm.agePicker"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </el-form-item>
        <el-form-item label="会员积分：">
          <el-select v-model="infoForm.pointsType" placeholder="请选择">
            <el-option
              v-for="(item, index) in pointsType"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
          <div v-if="infoForm.pointsType === null" style="display: inline-block">
            <el-input-number v-model="infoForm.pointsMin" :min="0" :max="99999" :precision="0" :controls="false" />
            -
            <el-input-number v-model="infoForm.pointsMax" :min="infoForm.pointsMin + 1" :max="999999" :precision="0" :controls="false" />
          </div>
        </el-form-item>
        <el-form-item label="模糊查询：">
          <el-input v-model="params.content" style="width: 195x" placeholder="会员名/会员卡号/手机号" />
        </el-form-item>
        <el-form-item label="批量搜索：">
          <el-input v-model="infoForm.cardArr" style="width: 195px" placeholder="多个会员卡号请用、隔开" />
        </el-form-item>
        <div />
        <el-form-item label="所属门店：">
          <el-select v-model="infoForm.shopRule" @change="infoForm.shopArr = []">
            <el-option :value="1" label="全部门店" />
            <el-option :value="2" label="部分门店" />
          </el-select>
          <el-button v-if="infoForm.shopRule === 2" size="mini" @click="$refs.storeComponent.open()">选择门店</el-button>
        </el-form-item>
        <div>
          <!-- 门店列表 -->
          <el-form-item v-show="infoForm.shopArr.length > 0 && infoForm.shopRule === 2">
            <select-store ref="selectStoreComponent" @del-item="delSelectStore" />
          </el-form-item>
        </div>
      </div>
      <el-form-item label="相关会员：">{{ totalCount }}人</el-form-item>
      <el-button size="mini" type="primary" @click="getMemberData">查询</el-button>
    </el-form>
    <storeDialog />
    <el-table v-loading="tabelLoading" :data="tabelData" @selection-change="changeSelect">
      <el-table-column type="selection" width="55" />
      <el-table-column prop="img" label="头像">
        <template slot-scope="scope">
          <el-image :src="showImg(scope.row.headUrl)" style=" width:70px; height:70px" />
        </template>
      </el-table-column>
      <el-table-column prop="memberCard" label="卡号" align="center" />
      <el-table-column prop="memberName" label="会员姓名" align="center" />
      <el-table-column prop="nickName" label="昵称" :show-overflow-tooltip="true" width="150" />
      <el-table-column label="性别" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.memberSex === 1">男</span>
          <span v-if="scope.row.memberSex === 2">女</span>
        </template>
      </el-table-column>
      <el-table-column prop="memberAge" label="年龄" align="center" />
      <el-table-column prop="memberPhone" width="150" label="手机号码" align="center" />
      <el-table-column label="会员分类" width="100" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.memberActive === 1">普通会员</span>
          <span v-if="scope.row.memberActive === 2">新增会员</span>
          <span v-if="scope.row.memberActive === 3">优质会员</span>
          <span v-if="scope.row.memberActive === 4">活跃会员</span>
          <span v-if="scope.row.memberActive === 9">沉寂会员</span>
        </template>
      </el-table-column>
      <el-table-column prop="age" label="注册来源" width="120" align="center">
        <template slot-scope="scope">
          <span v-if="scope.row.registerSource === 1">门店推荐注册</span>
          <span v-if="scope.row.registerSource === 2">员工推荐注册</span>
          <span v-if="scope.row.registerSource === 3">商户渠道注册</span>
          <span v-if="scope.row.registerSource === 4">平台渠道注册</span>
          <span v-if="scope.row.registerSource === 5">支付即会员</span>
        </template>
      </el-table-column>
    </el-table>
    <div class="pages">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div>
      <el-button @click="onStep">下一步</el-button>
    </div>
    <store-dialog ref="storeComponent" :list="infoForm.shopArr" @complete="handleSelectStore" />
  </div>
</template>
<script>
import _ from 'lodash'
import storeDialog from '../../../../marketing/components/store' // 已选择门店
import selectStore from '../../../../marketing/components/select-store' // 已选择门店列表
import { queryMembersNew } from '@/api/birthday'
import { formatDate } from '@/utils/timer'
import { formatAge, formatLkTime } from '@/utils/searchParams'
export default {
  components: {
    storeDialog, selectStore
  },
  data() {
    return {
      tabelLoading: false,
      tabelData: [],
      listUserCouponBaseInfo: [],
      infoForm: {
        allMember: 1,
        month: null, // 生日月份
        lkTime: 1, // 领卡时间是哪一种
        lkTimeQj: [new Date(), new Date()], // 选择领卡时间区间
        sex: null,
        ageInterval: 1,
        agePicker: [new Date(), new Date()],
        pointsType: 1,
        pointsMin: 0,
        pointsMax: 0,
        cardArr: '', // 会员id，用，隔开
        shopRule: 1,
        shopArr: []
      },
      params: {
        content: '',
        empCodes: [],
        endBirthdayDay: new Date(),
        endDate: new Date(),
        gender: null,
        maxIntegral: 0,
        minIntegral: 0,
        month: null,
        organizations: [],
        registerSource: 0,
        startBirthdayDay: new Date(),
        startDate: new Date()
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      lkOptions: [
        { label: '不限', value: 1 },
        { label: '一周内', value: [0, 7] },
        { label: '一月内', value: [0, 30] },
        { label: '选择时间段', value: null }
      ],
      sex: [
        { label: '不限', value: null },
        { label: '男', value: 1 },
        { label: '女', value: 2 }
      ],
      ageInterval: [
        { label: '不限', value: 1 },
        { label: '小于20岁', value: [0, 20] },
        { label: '20-25岁', value: [20, 25] },
        { label: '26-35岁', value: [26, 35] },
        { label: '36-45岁', value: [36, 45] },
        { label: '45岁以上', value: [45, 200] },
        { label: '选择出生年月', value: null }
      ],
      pointsType: [
        { label: '不限', value: 1 },
        { label: '1-100', value: [1, 100] },
        { label: '101-200', value: [101, 200] },
        { label: '选择积分区间', value: null }
      ]
    }
  },
  created() {
    this.getMemberData()
  },
  methods: {
    handleSizeChange(e) {
      this.pageInfo.pageSize = e
      this.pageInfo.currentPage = 1
      this.getMemberData()
    },
    handleCurrentChange(e) {
      this.pageInfo.currentPage = e
      this.getMemberData()
    },
    // 选择门店
    handleSelectStore(val) {
      this.infoForm.shopArr = val
      this.$refs.selectStoreComponent.dataFrom(val)
    },
    // 删除已选择门店
    delSelectStore(item, index) {
      this.infoForm.shopArr.splice(index, 1)
      this.$refs.selectStoreComponent.dataFrom(this.infoForm.shopArr)
    },
    // 搜索会员列表
    getMemberData() {
      const formData = _.cloneDeep(this.infoForm)
      let params = {}
      if (formData.allMember === 1) {
        this.params = {}
        params = Object.assign({}, this.params, this.pageInfo)
      } else {
        params = Object.assign({}, this.params, this.pageInfo)
        params.empCodes = formData.cardArr.trim() ? formData.cardArr.trim().split(',') : null
        if (formData.ageInterval === null) { // 年龄段
          params.startBirthdayDay = formatDate(formData.agePicker[0])
          params.endBirthdayDay = formatDate(new Date(formData.agePicker[1]).getTime() + 86399990)
        } else {
          var data = []
          if (formData.ageInterval === 1) {
            data = formatAge(0, 120)
          } else {
            data = formatAge(formData.ageInterval[0], formData.ageInterval[1])
          }
          params.startBirthdayDay = data[0]
          params.endBirthdayDay = data[1]
        }
        if (formData.lkTime === null) { // 领卡时间段
          params.startDate = formatDate(formData.lkTimeQj[0])
          params.endDate = formatDate(new Date(formData.lkTimeQj[1]).getTime() + 86399990)
        } else {
          var data1 = []
          if (formData.lkTime === 1) {
            data1 = ['1900-01-01 00:00:00', '2200-01-01 00:00:00']
          } else {
            data1 = formatLkTime(formData.lkTime[0], formData.lkTime[1])
          }
          params.startDate = data1[0]
          params.endDate = data1[1]
        }
        if (formData.pointsType === null) {
          params.minIntegral = formData.pointsMin
          params.maxIntegral = formData.pointsMax
        } else {
          if (formData.pointsType === 1) {
            params.minIntegral = 0
            params.maxIntegral = 999999999
          } else {
            params.minIntegral = formData.pointsType[0]
            params.maxIntegral = formData.pointsType[1]
          }
        }
        params.gender = formData.sex
        params.month = formData.month ? formData.month > 10 ? '' + formData.month : '0' + formData.month : null
        params.organizations = null
        if (formData.shopRule === 2) {
          params.organizations = []
          _.map(formData.shopArr, item => {
            params.organizations.push(item.stCode)
          })
        }
      }
      this.tabelLoading = true
      queryMembersNew(params).then(res => {
        this.tabelLoading = false
        if (res.code === '10000') {
          this.tabelData = res.data ? res.data.data : []
          this.totalCount = res.data ? res.data.totalCount : 0
        }
      })
    },
    // 选择会员
    changeSelect(e) {
      this.listUserCouponBaseInfo = []
      _.map(e, item => {
        const obj = {
          memberCard: item.memberCard,
          userId: item.userId
        }
        this.listUserCouponBaseInfo.push(obj)
      })
    },
    // 下一步
    onStep() {
      if (this.listUserCouponBaseInfo.length === 0) {
        this.$message.error('请至少选择一个会员')
      } else {
        this.$emit('nextstep', this.listUserCouponBaseInfo)
      }
    }
  }
}
</script>
<style lang="scss">
.member-list-modal {
  .pages {
    text-align: right;
    margin-top: 20px;
  }
}
.el-form-item {
  margin-bottom: 0;
}
</style>
