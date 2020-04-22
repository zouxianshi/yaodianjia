<template>
  <el-dialog
    title="选择优惠券"
    :visible.sync="dialogVisible"
    width="70%"
    append-to-body
    :before-close="handleClose"
  >
    <div class="checkCoupon-model">
      <div class="search-form">
        <div class="search-item">
          <div class="search-item">
            <span class="label-name" style="width:100px">优惠券状态：</span>
            <el-select v-model="region" placeholder="活动区域">
              <el-option label="全部" value="0" />
              <el-option label="折扣券" value="1" />
              <el-option label="满减券" value="2" />
              <el-option label="礼品券" value="3" />
            </el-select>
          </div>
          <span class="label-name" style="width:100px">券名称：</span>
          <el-input v-model.trim="keyword" size="small" placeholder="请输入关键字" />
        </div>
        <div class="search-item">
          <el-button type="primary" size="small" @click="handleGetlist">查询</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350"
        @selection-change="handleSelectionChange"
      >
        <!-- <el-table-column label="日期" width="120">
          <template slot-scope="scope">{{ scope.row.date }}</template>
        </el-table-column>-->
        <el-table-column prop="cname" label="优惠券名称" />
        <el-table-column label="适用商品">
          <template
            slot-scope="scope"
          >{{ scope.row.productRule ===1?'全部商品':'' || scope.row.shopRule ===2?'部分商品':'' || scope.row.shopRule ===3?'部分商品不可用':'' }}</template>
        </el-table-column>
        <el-table-column prop="address" label="优惠内容">
          <template
            slot-scope="scope"
          >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination) }}</template>
        </el-table-column>
        <el-table-column label="使用时间" show-overflow-tooltip>
          <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
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
        <el-table-column type="selection" width="55" />
      </el-table>
      <div style="margin-top:20px">已选门店：</div>
      <div class="block">
        <el-pagination
          :page-size="pageSize"
          :current-page="currentPage"
          :page-sizes="[10, 20, 30, 40]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalPage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="checkSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { getactivitList } from '@/api/coupon'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckCoupon',
  components: {},
  props: {
    selectlist: {
      type: Array,
      default() {
        return []
      }
    },
    // 起止时间
    timevalue: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      region: '0',
      keyword: '',
      tableData: [],
      checklist: [],
      beforeTime: '',
      endTime: ''
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {
    timevalue(newName, oldName) {
      this.beforeTime = this.filterDate(newName[0])
      this.endTime = this.filterDate(newName[1])
      this.handleGetlist()
    }
  },
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
    this.handleGetlist()
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleGetlist() {
      const params = {
        beginTime: this.beforeTime,
        endTime: this.endTime,
        cname: this.keyword,
        ctype: this.region,
        currentPage: this.currentPage,
        merCode: this.merCode,
        pageSize: this.pageSize
      }
      getactivitList(params).then(res => {
        this.tableData = res.data.records
        this.totalPage = res.data.total
      })
    },
    handleClose() {
      this.dialogVisible = false
    },
    checkSure() {
      this.$emit('confincheck', this.checklist)
      this.$refs.multipleTable.clearSelection()
      this.dialogVisible = false
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleGetlist()
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSelectionChange(val) {
      this.checklist = val
    },
    defaultcheck(rows) {
      this.dialogVisible = true
      if (rows) {
        var id = []
        rows.map(item => {
          id.push(item.id)
        })
        this.$nextTick(() => {
          // this.$refs.multipleTable.clearSelection()
          this.tableData.forEach(row => {
            if (id.indexOf(row.id) >= 0) {
              this.$refs.multipleTable.toggleRowSelection(row, true)
            }
          })
        })
      }
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
    },
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
        return `自领取${effectTime.split(',')[0]}天有效,${effectTime.split(',')[1]}天失效`
      } else {
        return `${effectTime.split(',')[0]} - ${effectTime.split(',')[1]}`
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.checkCoupon-model {
  .el-table--medium th,
  // .el-table--medium td {
  //   padding: 2px;
  // }
  // .el-table thead th {
  //   height: 50px;
  // }
  .search-form {
    margin-bottom: 0px;
    .search-item {
      .el-input {
        width: 180px;
      }
    }
  }
  .block {
    text-align: right;
    margin-top: 40px;
  }
}
</style>
