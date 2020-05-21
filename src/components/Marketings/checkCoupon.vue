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
          <el-button type="primary" size="small" @click="handleGetlist('查询')">查询</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        height="350"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="cname" label="优惠券名称" />
        <el-table-column label="适用商品">
          <template
            slot-scope="scope"
          >{{ scope.row.productRule ===1?'全部商品':'' || scope.row.productRule ===2?'部分商品':'' || scope.row.productRule ===3?'部分商品不可用':'' }}</template>
        </el-table-column>
        <el-table-column prop="address" label="优惠内容">
          <template
            slot-scope="scope"
          >{{ handleshopRule(scope.row.ctype,scope.row.useRule,scope.row.denomination,scope.row.giftName) }}</template>
        </el-table-column>
        <el-table-column label="使用时间" width="160">
          <template slot-scope="scope">{{ handletimeRule(scope.row.timeRule,scope.row.effectTime) }}</template>
        </el-table-column>
        <el-table-column label="使用场景" width="90">
          <template
            slot-scope="scope"
          >{{ scope.row.sceneRule ===1?'线上':'' || scope.row.sceneRule ===2?'线下':'' || scope.row.sceneRule ===3?'线上线下通用':'' }}</template>
        </el-table-column>
        <el-table-column prop="productRule" label="适用门店" width="100">
          <template
            slot-scope="scope"
          >{{ scope.row.shopRule ===1?'全部门店':'' || scope.row.shopRule ===2?'部分门店':'' || scope.row.shopRule ===3?'部分门店不可用':'' }}</template>
        </el-table-column>
        <div slot="empty" style="height:200px;line-height: 200px;">
          当前无任何优惠券，先去
          <span
            style="color:#2790FA"
            class="creatcoucops"
            @click="$router.push({ path: '/marketings/gift-manage/list' })"
          >创建优惠券</span>吧
        </div>
      </el-table>
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
      <div style="margin-top:20px">已选优惠券：</div>
      <div class="has-selected">
        <span v-for="(item ,index) in multipleSelectionAll" :key="index">
          <el-tooltip placement="top">
            <div slot="content">{{ item.cname }}</div>
            <el-tag
              style="margin-right:10px"
              type="success"
            >{{ item.cname.length>10?item.cname.substring(0, 10)+'...':item.cname }}</el-tag>
          </el-tooltip>
        </span>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="checkSure">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { formatDate } from '@/utils/timer'
import { searchActivities } from '@/api/coupon'
import { mapGetters } from 'vuex'
export default {
  name: 'CheckCoupon',
  components: {},
  props: {
    // 起止时间
    timevalue: {
      type: Array,
      default() {
        return []
      }
    },
    // 是否单选
    singlechoice: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      dialogVisible: false,
      currentPage: 1,
      pageSize: 10,
      totalPage: 0,
      region: '0',
      keyword: '',
      tableData: [],
      checklist: [],
      beforeTime: '',
      endTime: '',
      // 所有选中的数据包含跨页数据
      multipleSelectionAll: [],
      // 当前页选中的数据
      multipleSelection: [],
      // 标识列表数据中每一行的唯一键的名称
      idKey: 'id'
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {
    timevalue(newName, oldName) {
      this.beforeTime = formatDate(newName[0])
      this.endTime = formatDate(newName[1])
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
    handleGetlist(val) {
      if (val === '查询') {
        this.pageSize = 10
        this.currentPage = 1
      }
      this.tableLoading = true
      const params = {
        beginTime: this.beforeTime,
        busType: 1,
        endTime: this.endTime,
        cname: this.keyword,
        ctype: this.region,
        currentPage: this.currentPage,
        merCode: this.merCode,
        pageSize: this.pageSize
      }
      searchActivities(params).then(res => {
        this.tableData = res.data.records
        this.totalPage = res.data.total
        this.setSelectRow()
        this.tableLoading = false
      })
    },
    handleClose() {
      this.$refs.multipleTable.clearSelection()
      this.currentPage = 1
      this.tableData = []
      this.dialogVisible = false
    },
    checkSure() {
      if (this.singlechoice && this.tableData.length > 1) {
        this.$message.error('请单选')
      } else {
        const multipleSelectionAll = JSON.parse(
          JSON.stringify(this.multipleSelectionAll)
        )
        this.$emit('confincheck', multipleSelectionAll)
        this.currentPage = 1
        this.tableData = []
        this.dialogVisible = false
        this.$refs.multipleTable.clearSelection()
      }
    },
    handlematching(rows) {
      this.multipleSelectionAll = rows
      this.setSelectRow()
    },
    defaultcheck(rows) {
      const row = JSON.parse(JSON.stringify(rows))
      this.dialogVisible = true
      this.allselect = row
      this.handlematching(row)
      this.changePageCoreRecordData()
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
    },
    //
    setSelectRow() {
      if (!this.multipleSelectionAll || this.multipleSelectionAll.length <= 0) {
        return
      }
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      // this.$refs.multipleTable.clearSelection()
      this.$nextTick(() => {
        this.tableData.forEach(row => {
          if (selectAllIds.indexOf(row.id) >= 0) {
            this.$refs.multipleTable.toggleRowSelection(row, true)
          }
        })
      })
    },
    // 记忆选择核心方法
    changePageCoreRecordData() {
      // 标识当前行的唯一键的名称
      const idKey = this.idKey
      const that = this
      if (this.multipleSelectionAll.length <= 0) {
        this.multipleSelectionAll = this.multipleSelection
        return
      }
      // 总选择里面的key集合
      const selectAllIds = []
      this.multipleSelectionAll.forEach(row => {
        selectAllIds.push(row[idKey])
      })
      const selectIds = []
      // 获取当前页选中的id
      this.multipleSelection.forEach(row => {
        selectIds.push(row[idKey])
        // 如果总选择里面不包含当前页选中的数据，那么就加入到总选择集合里
        if (selectAllIds.indexOf(row[idKey]) < 0) {
          that.multipleSelectionAll.push(row)
        }
      })
      const noSelectIds = []
      // 得到当前页没有选中的id
      this.tableData.forEach(row => {
        if (selectIds.indexOf(row[idKey]) < 0) {
          noSelectIds.push(row[idKey])
        }
      })
      noSelectIds.forEach(id => {
        if (selectAllIds.indexOf(id) >= 0) {
          for (let i = 0; i < that.multipleSelectionAll.length; i++) {
            if (that.multipleSelectionAll[i][idKey] === id) {
              // 如果总选择中有未被选中的，那么就删除这条
              that.multipleSelectionAll.splice(i, 1)
              break
            }
          }
        }
      })
    },
    handleSizeChange(val) {
      // 改变页的时候调用一次
      this.pageSize = val
      this.handleGetlist()
    },
    handleCurrentChange(val) {
      // 改变每页显示条数的时候调用一次
      this.changePageCoreRecordData()
      this.currentPage = val
      this.handleGetlist()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      this.changePageCoreRecordData()
    }, // 得到选中的所有数据
    getAllSelectionData() {
      // 再执行一次记忆勾选数据匹配，目的是为了在当前页操作勾选后直接获取选中数据
      this.changePageCoreRecordData()
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
  .creatcoucops:hover {
    cursor: pointer;
  }
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
  .has-selected {
    margin-top: 10px;
    border-top: 2px solid #eee;
    padding: 20px 0 10px;
    line-height: 36px;
  }
}
</style>
