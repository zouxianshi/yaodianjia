<template>
  <div class="add-model app-container">
    <el-radio-group v-model="radio" size="mini" @change="change">
      <el-radio-button label="免费领取" />
      <el-radio-button label="现金购买" />
      <el-radio-button label="积分兑换" />
    </el-radio-group>
    <div class="add-addItem-model">
      <span class="add-addLeft-model">领取时间:</span>
      <div class="add-addRight-model">
        <el-date-picker
          v-model="value"
          type="datetimerange"
          :picker-options="pickerOptions"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
        />
      </div>
    </div>
    <div class="add-addItem-model">
      <span class="add-addLeft-model">选优惠券:</span>
      <div class="add-addRight-model">
        <el-button type="primary" size="mini" plain @click="handlecheck">选择会员券</el-button>
        <div style="margin-top:10px">已选择6张优惠券</div>
      </div>
    </div>
    <div v-show="checkedit" class="add-addItem-model">
      <span class="add-addLeft-model">选择优惠券:</span>
      <div class="add-addRight-model">
        <el-table :data="selectlist" height="250" style="width: 100%">
          <el-table-column prop="cname" label="优惠券名称" />
          <el-table-column prop="address" label="优惠内容">
            <template
              slot-scope="scope"
            >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination) }}</template>
          </el-table-column>
          <el-table-column label="使用时间" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
          </el-table-column>
          <el-table-column label="使用场景" width="90">
            <template
              slot-scope="scope"
            >{{ scope.row.shopRule ===1?'线上':'' || scope.row.shopRule ===2?'线下':'' || scope.row.shopRule ===3?'线上线下通用':'' }}</template>
          </el-table-column>
          <el-table-column prop="productRule" label="适用门店" width="100">
            <template
              slot-scope="scope"
            >{{ scope.row.productRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
          </el-table-column>
          <el-table-column label="券总数" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model="scope.row.date" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="每人限领（张）" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model="scope.row.date" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="radio==='积分兑换'" label="所需积分" width="130">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model.number="scope.row.date" type="number" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column v-if="radio==='现金购买'" label="所需现金" width="100">
            <template slot-scope="scope">
              <div style="display:flex;align-items: center;">
                <el-input v-model="scope.row.date" placeholder />
                <i class="el-icon-edit" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <el-button
                type="text"
                size="small"
                @click.native.prevent="deleteRow(scope.$index, selectlist)"
              >移除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <el-button size="mini">取 消</el-button>
    <el-button type="primary" size="mini" @click="handleSumbit">确 定</el-button>
    <checkCoupon ref="checkCoupons" :timevalue="value" @confincheck="confincheck" />
  </div>
</template>
<script>
import { marketaddCoupon } from '@/api/coupon'
import checkCoupon from './_source/checkCoupon'
import { mapGetters } from 'vuex'
export default {
  name: 'Add',
  components: {
    checkCoupon: checkCoupon
  },
  props: {},
  data() {
    return {
      checkedit: false,
      radio: '免费领取',
      selectlist: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      },
      value: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {
    selectlist() {
      if (this.selectlist) {
        this.$nextTick(() => {
          console.log(this.selectlist)
          if (this.selectlist.length === 0) {
            this.checkedit = false
          } else {
            this.checkedit = true
          }
        })
      }
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handlecheck() {
      this.$refs.checkCoupons.defaultcheck(this.selectlist)
    },
    confincheck(val) {
      this.selectlist = val
    },
    deleteRow(index, rows) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          rows.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    change() {},
    // handlechange(val) {
    //   console.log(val)
    //   this.selectlist = val
    // }
    // 商品折扣处理
    handleshopRule(ctype, useRule, denomination) {
      console.log(ctype, useRule, denomination)
      if (ctype === 1) {
        if (useRule === 0) {
          return `无门槛，${denomination}折`
        } else {
          return `满${useRule}可用,${denomination}折`
        }
      } else if (ctype === 2) {
        if (useRule === 0) {
          return '无门槛，满减券'
        } else {
          return `满${useRule}可用,减${denomination}元`
        }
      } else {
        return '指定礼品'
      }
    },
    // 使用日期
    handletimeRule(timeRule, effectTime) {
      if (timeRule === 1) {
        return `自领取${effectTime}天有效`
      } else if (timeRule === 2) {
        return `自领取${effectTime.split(',')[0]}天有效,${
          effectTime.split(',')[1]
        }天失效`
      } else {
        return `${effectTime.split(',')[0]} - ${effectTime.split(',')[1]}`
      }
    },
    // 提交
    handleSumbit() {
      console.log(this.selectlist)
      let radiotype = 0
      if (this.radio === '免费领取') {
        radiotype = 1
      } else if (this.radio === '现金购买') {
        radiotype = 3
      } else if (this.radio === '积分兑换') {
        radiotype = 2
      }
      const params = {
        activityDetailName: this.$route.query.activityTemplateName,
        activityTemplateCode: this.$route.query.activityTemplateCode,
        activityType: radiotype,
        beginTime: this.filterDate(this.value[0]),
        endTime: this.filterDate(this.value[1]),
        listActivityAddCouponRelationReqDto: [
          {
            amount: 8,
            couponId: 8,
            integral: 8,
            perCount: 8,
            totalCount: 8
          }
        ],
        merCode: '666666'
      }
      console.log(params)
      marketaddCoupon(params).then(res => {
        console.log(res)
      })
    },
    filterDate(date) {
      date = new Date(date)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      var d = date.getDate()
      var h = date.getHours()
      var m1 = date.getMinutes()
      var s = date.getSeconds()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      h = h < 10 ? '0' + h : h
      m1 = m1 < 10 ? '0' + m1 : m1
      s = s < 10 ? '0' + s : s
      return y + '-' + m + '-' + d + ' ' + h + ':' + m1 + ':' + s
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.add-model {
  .add-addItem-model {
    margin: 40px 0;
    font-size: 14px;
    .add-addLeft-model {
      display: inline-block;
      vertical-align: top;
      width: 80px;
      margin: 0px 40px 0px 0px;
    }
    .add-addRight-model {
      display: inline-block;
      .el-table thead th {
        height: 50px;
      }
      .el-table--medium th,
      .el-table--medium td {
        padding: 2px;
      }
      .el-icon-edit {
        color: #147de8;
      }
    }
  }
}
</style>
