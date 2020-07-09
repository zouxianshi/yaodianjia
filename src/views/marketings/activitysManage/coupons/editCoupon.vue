<template>
  <div class="app-container edit-coupons-modal">
    <el-form
      v-model="couponParams"
      label-width="100"
      label-position="right"
      :disabled="isCheck || isNotStart"
    >
      <el-form-item label="领取方式：">
        <el-radio-group v-model="couponParams.activityType" size="mini" :disabled="true">
          <el-radio :label="1">免费领取</el-radio>
          <el-radio :label="3">现金购买</el-radio>
          <el-radio :label="2">海贝兑换</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="领取时间：">
        <el-date-picker
          v-model="dataValue"
          :disabled="true"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </el-form-item>
      <el-form-item label="领取方式：">
        <el-table :data="couponInfo">
          <el-table-column prop="cname" label="优惠券名称" width="100" show-overflow-tooltip />
          <el-table-column prop="denomination" label="优惠内容" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination,scope.row.giftName,scope.row.cname) }}</template>
          </el-table-column>
          <el-table-column prop="effectTime" label="使用时间" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
          </el-table-column>
          <el-table-column prop="sceneRule" label="使用场景" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ scope.row.sceneRule ===1 ? '仅商城' : scope.row.sceneRule === 2 ? '仅门店' : '线上线下通用' }}</template>
          </el-table-column>
          <el-table-column prop="shopRule" label="适用门店" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ scope.row.shopRule ===1?'所有门店':'' || scope.row.shopRule ===2?'部分门店':'' }}</template>
          </el-table-column>
          <el-table-column prop="productRule" label="适用商品" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ scope.row.productRule ===1?'所有商品可用': scope.row.productRule ===2?'部分商品可用':'部分商品不可用' }}</template>
          </el-table-column>
          <el-table-column prop="totalCount" label="券总数" width="120">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.totalCount"
                maxlength="8"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column prop="perCount" label="每人限领" width="110">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.perCount"
                maxlength="2"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column
            v-if="couponParams.activityType === 3"
            prop="amount"
            required
            label="所需现金"
            width="120"
          >
            <template slot-scope="scope">
              <el-input v-model="scope.row.amount" maxlength="5" size="mini" />
            </template>
          </el-table-column>
          <el-table-column
            v-if="couponParams.activityType === 2"
            prop="integral"
            required
            label="所需海贝"
            width="120"
          >
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.integral"
                maxlength="5"
                onkeyup="this.value=this.value.replace(/\D/g,'')"
                size="mini"
              />
            </template>
          </el-table-column>
          <el-table-column prop="date" label="操作" width="80">
            <template>
              <el-button disabled type="text" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-form-item>
      <el-form>
        <el-button size="mini" @click="returnList">{{ isCheck ? '返回' : '取消' }}</el-button>
        <el-button v-if="!isCheck" size="mini" type="primary" @click="submitUp">确认</el-button>
      </el-form>
    </el-form>
  </div>
</template>

<script>
import { getActivityCouponDetail, editCoupon } from '@/api/coupon'
export default {
  data() {
    return {
      couponParams: {},
      couponInfo: [],
      dataValue: [],
      isNotStart: 0, // 活动是否未开始
      isCheck: false
    }
  },
  created() {
    var serachParams = JSON.parse(sessionStorage.getItem('couponCenterDetail'))
    this.isCheck = this.$route.query.check === 'true'
    this.isNotStart = serachParams.activityState !== 2
    this.couponParams = serachParams
    var timeArr = serachParams.timeLimit.split(',')
    this.dataValue = [new Date(timeArr[0]), new Date(timeArr[1])]
    var params = {
      activityId: serachParams.activityId,
      couponId: serachParams.id
    }
    getActivityCouponDetail(params).then(res => {
      if (res.data) {
        var arr = []
        arr.push(res.data)
        this.couponInfo = arr
      }
    })
  },
  methods: {
    // 格式化使用日期
    handletimeRule(timeRule, effectTime) {
      if (timeRule) {
        if (timeRule === 1) {
          return `自领取起${effectTime}天有效`
        } else if (timeRule === 2) {
          return `自领取起${effectTime.split(',')[0]}天有效,${
            effectTime.split(',')[1]
          }天失效`
        } else {
          return `${effectTime.split(',')[0]} 到 ${effectTime.split(',')[1]}`
        }
      }
    },
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
    // 提交数据
    submitUp() {
      const datas = this.couponInfo[0]
      const params = {
        amount: datas.amount,
        id: datas.id,
        integral: datas.integral,
        perCount: datas.perCount,
        totalCount: datas.totalCount
      }
      editCoupon(params).then(res => {
        console.log(res)
        if (res.code === '10000') {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.$router.push(
            '/marketings/activity-manage/coupons/list?code=TA001&name=领券中心'
          )
        }
      })
    },
    // 返回列表
    returnList() {
      this.$router.push(
        '/marketings/activity-manage/coupons/list?code=TA001&name=领券中心'
      )
    }
  }
}
</script>
<style lang="scss">
.edit-coupons-modal {
  width: 94%;
}
</style>
