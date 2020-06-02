<template>
  <div class="app-container coupons-index-model">
    <el-button
      type="primary"
      size="mini"
      @click="() => $router.push({ path: '/marketings/activity-manage/coupons/add', query: { activityTemplateCode: this.$route.query.code,activityTemplateName: this.$route.query.name,code:radio} })"
    >添加优惠券</el-button>
    <div class="explain">
      <el-alert
        title="领券中心可自由上架及下架优惠券，领券中心的优惠上架后用户可手工领取，您可根据活动营销方案定期上架以保持用户活跃"
        type="warning"
        :closable="false"
      />
    </div>
    <div class="search-form">
      <div class="search-item">
        <div class="search-item">
          <span class="label-name" style="width:100px">优惠券状态：</span>
          <el-select v-model="region" placeholder="优惠券状态">
            <el-option label="全部" value />
            <el-option label="未开始" value="2" />
            <el-option label="进行中" value="1" />
            <el-option label="已失效" value="3" />
            <el-option label="已删除" value="5" />
          </el-select>
        </div>
        <span class="label-name" style="width:100px">优惠券名称：</span>
        <el-input v-model.trim="keyword" size="small" placeholder="请输入关键字" />
      </div>
      <div class="search-item">
        <el-button type="primary" size="small" @click="getList('查询')">查询</el-button>
      </div>
      <div class="search-item">
        <!-- <el-button type="primary" size="small" @click="exportFun">
          导出
          <i class="el-icon-download el-icon--right" />
        </el-button>-->
      </div>
    </div>
    <div style="margin-bottom:20px">
      <el-radio-group v-model="radio" size="mini" @change="changeOption">
        <el-radio-button label="全部" />
        <el-radio-button label="免费领取" />
        <el-radio-button label="海贝兑换" />
        <el-radio-button label="现金购买" />
      </el-radio-group>
    </div>
    <el-table v-loading="show" :data="tableData" style="width: 100%" empty-text="领券中心暂未上架任何优惠券">
      <el-table-column key="1" prop="cname" label="优惠券信息" width="150">
        <template slot-scope="scope">
          <div>
            {{ scope.row.cname }}
            <el-tag
              v-if="scope.row.ctype ===1"
              effect="dark"
              type="success"
              size="mini"
            >折</el-tag>
            <el-tag
              v-if="scope.row.ctype ===2"
              effect="dark"
              type="danger"
              size="mini"
            >满</el-tag>
            <el-tag
              v-if="scope.row.ctype ===3"
              effect="dark"
              type="warning"
              size="mini"
            >礼</el-tag>
          </div>
          <div>ID:{{ scope.row.id }}</div>
          <div>{{ scope.row.sceneRule ===1?'仅商城':'' || scope.row.sceneRule ===2?'仅门店':'' || scope.row.sceneRule ===3?'线上线下通用':'' }}</div>
        </template>
      </el-table-column>
      <el-table-column v-if="radio === '全部'" key="2" prop="name" label="领取方式">
        <template
          slot-scope="scope"
        >{{ scope.row.activityType ===1?'免费领取':'' || scope.row.activityType ===2?'海贝兑换':'' || scope.row.activityType ===3?'现金购买':'' }}</template>
      </el-table-column>
      <el-table-column key="3" prop="totalCount" label="券总数" min-width="80" align="center" />
      <el-table-column key="4" label="使用时间" width="160">
        <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
      </el-table-column>
      <el-table-column key="5" label="优惠内容">
        <template
          slot-scope="scope"
        >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination,scope.row.giftName) }}</template>
      </el-table-column>
      <el-table-column key="6" prop="perCount" label="限领" min-width="80" align="center" />
      <el-table-column key="7" prop="totalReceiveCountActivity" label="已领取量" min-width="80" align="center" />
      <el-table-column v-if="radio === '海贝兑换' || radio === '全部'" key="8" prop="integral" label="所需海贝" min-width="80" align="center" />
      <el-table-column v-if="radio === '现金购买' || radio === '全部'" key="9" prop="amount" label="所需现金" min-width="80" align="center" />
      <el-table-column key="10" prop="timeLimit" label="领券时间" width="160">
        <template
          slot-scope="scope"
        >{{ scope.row.timeLimit? scope.row.timeLimit.replace(/,/," 到 ") : scope.row.timeLimit }}</template>
      </el-table-column>
      <el-table-column key="11" prop="name" label="优惠券状态" min-width="100" align="center">
        <template
          slot-scope="scope"
        >
          <el-tag v-if="scope.row.activityState.toString()==='1'" size="mini" type="success">进行中</el-tag>
          <el-tag v-if="scope.row.activityState.toString()==='2'" size="mini" type="info">未开始</el-tag>
          <el-tag v-if="scope.row.activityState.toString()==='3'" size="mini" type="danger">已失效</el-tag>
          <el-tag v-if="scope.row.activityState.toString()==='5'" size="mini" type="danger">已删除</el-tag>
        </template>
      </el-table-column>
      <el-table-column key="12" fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.activityState.toString()==='2'"
            type="text"
            size="small"
            @click.native.prevent="editRow(scope.row)"
          >编辑</el-button>
          <el-button
            v-if="scope.row.activityState.toString()!=='2'"
            type="text"
            size="small"
            @click.native.prevent="editRow(scope.row, true)"
          >查看</el-button>
          <el-button
            v-if="scope.row.activityState.toString()!=='5'"
            type="text"
            size="small"
            @click.native.prevent="deleteRow(scope.$index, tableData)"
          >移除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        :total="totalPage"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { searchActivitie, couponInvalid } from '@/api/coupon'
import { mapGetters } from 'vuex'
export default {
  name: 'CouponsIndex',
  components: {},
  props: {},
  data() {
    return {
      show: false,
      currentPage: 1,
      pageSize: 10,
      totalPage: 1,
      region: '',
      couponStatus: '',
      radio: '全部',
      keyword: '',
      couponName: '',
      tableData: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.getList()
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    getList(val) {
      this.show = true
      if (val === '查询') {
        this.pageSize = 10
        this.currentPage = 1
        this.couponStatus = this.region
        this.couponName = this.keyword
      } else if (val === '类型') {
        this.pageSize = 10
        this.currentPage = 1
      }
      let radioVal = ''
      if (this.radio === '全部') {
        radioVal = ''
      } else if (this.radio === '免费领取') {
        radioVal = 1
      } else if (this.radio === '海贝兑换') {
        radioVal = 2
      } else if (this.radio === '现金购买') {
        radioVal = 3
      }
      const params = {
        activityTemplateCode: this.$route.query.code,
        // busType: '0',
        // activityTemplateName: this.$route.query.name,
        activityType: radioVal,
        cname: this.couponName,
        currentPage: this.currentPage,
        merCode: this.merCode,
        pageSize: this.pageSize,
        state: this.couponStatus
      }
      searchActivitie(params).then(res => {
        this.tableData = res.data.records
        this.totalPage = res.data.total
        this.show = false
      })
    },
    deleteRow(index, rows) {
      this.$confirm('删除此优惠券, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const params = {
            id: rows[index].activityId,
            listCouponRemove: [rows[index].id]
          }
          couponInvalid(params).then(res => {
            if (res.code === '10000') {
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              this.getList('类型')
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑优惠券
    editRow(row, check = false) {
      sessionStorage.setItem('couponCenterDetail', JSON.stringify(row))
      if (check) {
        this.$router.push(`/marketings/activity-manage/coupons/edit?check=${check}`)
      } else {
        this.$router.push(`/marketings/activity-manage/coupons/edit`)
      }
    },
    changeOption(val) {
      this.getList('类型')
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getList()
    },
    // 商品折扣处理
    handleshopRule(ctype, useRule, denomination, giftName) {
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
        if (giftName === 'null' || null) {
          return ''
        } else {
          return giftName
        }
      }
    },
    // 使用日期
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
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.coupons-index-model {
  .explain {
    margin: 20px 0;
    font-size: 13px;
  }
  .el-table--medium th,
  .el-table--medium td {
    padding: 2px;
  }
  .el-table thead th {
    height: 50px;
  }
  .search-form {
    margin-top: 10px;
    .search-item {
      .el-input {
        width: 180px;
      }
    }
  }
  .block {
    margin-top: 30px;
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
