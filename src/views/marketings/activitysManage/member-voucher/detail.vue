<template>
  <div class="app-container coupon-detail-modal">
    <el-form :model="detailParams" label-width="120px" label-position="right" inline>
      <el-form-item label="发放对象：" style="width: 100%">商户会员</el-form-item>
      <el-form-item label="会员选择：" style="width: 30%">部分会员</el-form-item>
      <el-form-item label="出生月份：" style="width: 30%">{{ detailParams.birthMonth }}</el-form-item>
      <el-form-item label="性别：" style="width: 30%">{{ detailParams.sex }}</el-form-item>
      <el-form-item label="领卡时间：" style="width: 30%">{{ detailParams.lkTime }}</el-form-item>
      <el-form-item label="年龄区间：" style="width: 30%">{{ detailParams.ageQj }}</el-form-item>
      <el-form-item label="会员海贝：" style="width: 30%">{{ detailParams.memberIntiger }}</el-form-item>
      <el-form-item label="所属门店：">{{ detailParams.org }}</el-form-item>
    </el-form>
    <div v-if="detailParams.org === '部分门店' && organization.length > 0" class="tabel-items">
      <el-table :data="organization">
        <el-table-column label="门店编码">
          <template slot-scope="scope">{{ scope.row.stCode }}</template>
        </el-table-column>
        <el-table-column label="门店名称">
          <template slot-scope="scope">{{ scope.row.stName }}</template>
        </el-table-column>
        <el-table-column label="门店地址" prop="address" />
        <el-table-column label="门店电话" prop="mobile" />
      </el-table>
    </div>
    <div class="tabel-items">
      <div class="tital-coupon">
        优惠券：
        <span>{{ couponData.length }}</span>
      </div>
      <el-table :data="couponData">
        <el-table-column label="券类型">
          <template
            slot-scope="scope"
          >{{ scope.row.ctype === 1 ? '折扣券' : scope.row.ctype === 2 ? '满减券' : '折扣券' }}</template>
        </el-table-column>
        <el-table-column prop="cname" label="券名称" />
        <el-table-column prop="1" label="优惠内容">
          <template
            slot-scope="scope"
          >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination,scope.row.giftName,scope.row.cname) }}</template>
        </el-table-column>
        <el-table-column prop="1" label="使用时间">
          <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
        </el-table-column>
        <el-table-column label="使用场景" show-overflow-tooltip>
          <template
            slot-scope="scope"
          >{{ scope.row.sceneRule ===1?'线上':'' || scope.row.sceneRule ===2?'线下':'' || scope.row.sceneRule ===3?'线上线下通用':'' }}</template>
        </el-table-column>
        <el-table-column label="适用门店">
          <template
            slot-scope="scope"
          >{{ scope.row.shopRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
        </el-table-column>
        <el-table-column label="适用商品">
          <template
            slot-scope="scope"
          >{{ scope.row.productRule ===1?'全部商品':'' || scope.row.productRule ===2?'部分商品':'' || scope.row.productRule ===3?'部分商品不可用':'' }}</template>
        </el-table-column>
        <el-table-column label="每人发放数量">1</el-table-column>
      </el-table>
    </div>
    <div class="op-btn">
      <el-button size="mini" @click="$router.push('/activity/member-voucher-list')">返回列表</el-button>
    </div>
  </div>
</template>
<script>
import { listCouponHistoryDetail } from '@/api/birthday'
export default {
  data() {
    return {
      detailParams: {
        birthMonth: '不限',
        sex: '不限',
        lkTime: '不限',
        ageQj: '不限',
        memberIntiger: '不限',
        org: '全部门店'
      },
      couponData: [],
      organization: []
    }
  },
  created() {
    var condition = sessionStorage.getItem('conditionJson')
    if (condition !== "null" && !!condition) {
      const conditions = JSON.parse(condition)
      // 处理生日
      if (!!(conditions.endBirthdayDay) && !!(conditions.startBirthdayDay) ) {
        let day = parseInt(conditions.startBirthdayDay.slice(8, 10)) + 1
        this.detailParams.ageQj =
          conditions.startBirthdayDay.slice(0, 8) + day + 
          ' - ' +
          conditions.endBirthdayDay.slice(0, 10)
      }
      // 处理领卡日期
      if (!!(conditions.startDate) && !!(conditions.endDate) ) {
        this.detailParams.lkTime =
          conditions.startDate.slice(0, 10) +
          ' - ' +
          conditions.endDate.slice(0, 10)
      }
      // 处理出生月份
      if (conditions.month) {
        this.detailParams.birthMonth = conditions.month + '月'
      }
      // 处理海贝范围
      if (conditions.minIntegral !== "" && conditions.maxIntegral !== "" ) {
        this.detailParams.memberIntiger =
          conditions.minIntegral + ' - ' + conditions.maxIntegral
      }
      this.detailParams.sex = (conditions.gender === null || conditions.gender === undefined) ? '不限' : conditions.gender === 1 ? '男' : '女'
      if (conditions.organizations !== null) {
        this.detailParams.org = '部分门店'
        this.organization = conditions.organizationsArr
      } else {
        this.detailParams.org = '全部门店'
      }
    }
    const params = {
      id: this.$route.query.id
    }
    listCouponHistoryDetail(params).then(res => {
      if (res.code === '10000' && res.data) {
        this.couponData = res.data
      }
    })
  },
  methods: {
    // 商品折扣处理
    handleshopRule(ctype, useRule, denomination, giftName, cname) {
      if (ctype === 1) {
        if (useRule === 0) {
          return `无门槛，${denomination}折`
        } else {
          return `满${useRule}可用,${denomination}折`
        }
      } else if (ctype === 2) {
        if (useRule === 0) {
          return `无门槛，减${denomination}`
        } else {
          return `满${useRule}可用,减${denomination}元`
        }
      } else {
        if (giftName === 'null' || giftName === null) {
          return cname
        } else {
          return giftName
        }
      }
    },
    // 使用日期
    handletimeRule(timeRule, effectTime) {
      if (timeRule) {
        if (timeRule === 1) {
          return `自领取${effectTime}天有效`
        } else if (timeRule === 2) {
          return `自领取${effectTime.split(',')[0]}天有效,${
            effectTime.split(',')[1]
          }天失效`
        } else {
          return `${effectTime.split(',')[0]} - ${effectTime.split(',')[1]}`
        }
      }
    }
  }
}
</script>
<style lang="scss">
.coupon-detail-modal {
  .tabel-items {
    margin-top: 20px;
    .tital-coupon {
      height: 40px;
      line-height: 40px;
      span {
        font-weight: 500;
        font-size: 18px;
      }
    }
  }
  .op-btn {
    margin-top: 24px;
  }
}
</style>
