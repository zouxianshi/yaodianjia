<template>
  <div class="select-store-modal">
    <el-dialog :visible.sync="dialogTableVisible" :append-to-body="true">
      <span slot="title">选择活动</span>
      <div class="nav-bar">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="活动类型">
            <el-select v-model="searchParams.activityTemplateCode" placeholder="请选择" size="mini">
              <el-option label="全部" value="0" />
              <el-option label="大转盘" value="TA003" />
              <el-option label="刮刮乐" value="TA004" />
            </el-select>
          </el-form-item>
          <el-form-item label="活动名称" style="margin-left:10px">
            <el-input v-model="searchParams.activityName" placeholder="活动名称" size="mini" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="orderTable"
        v-loading="tableLoading"
        :data="gridData"
        highlight-current-row
        @current-change="handleCurrentChange"
      >
        <el-table-column label="选择" width="50" center>
          <template slot-scope="scope">
            <el-radio
              v-model="radio"
              :label="scope.$index"
              @change.native="getCurrentRow(scope.$index)"
            >&nbsp;</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="活动类型">
          <template slot-scope="scope">{{ handleTemplateName(scope.row.activityTemplateCode) }}</template>
        </el-table-column>
        <el-table-column property="activityDetailName" label="活动名称" show-overflow-tooltip />
        <el-table-column label="活动时间" width="300">
          <template
            slot-scope="scope"
            width="300"
          >{{ handletimeRule(scope.row.beginTime,scope.row.endTime) }}</template>
        </el-table-column>
        <el-table-column property="countRule" label="参与次数">
          <template slot-scope="scope">{{ scope.row.countRule? scope.row.countRule : 0 }}次</template>
        </el-table-column>
      </el-table>
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[5, 50, 100, 500]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="changePage"
      />

      <div class="has-selected">
        已选活动：
        <span v-for="(item ,index) in selectedArr" :key="index">
          <el-tooltip placement="top">
            <div slot="content">{{ item.activityDetailName }}</div>
            <el-tag
              style="margin-right:10px"
              type="success"
            >{{ item.activityDetailName.length>10?item.activityDetailName.substring(0,10)+'...':item.activityDetailName }}</el-tag>
          </el-tooltip>
        </span>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="_submit">确定</el-button>
        <el-button size="mini" @click="dialogTableVisible=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { normalAddActivityList } from '@/api/coupon'
export default {
  props: {
    // 活动开始时间
    beginendtime: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      gridData: [],
      selectedArr: [],
      hasSelectList: [],
      searchParams: {
        activityTemplateCode: '',
        activityName: '',
        beginTime: ''
      },
      totalCount: 0,
      pageInfo: {
        currentPage: 0,
        pageSize: 5
      },
      currentRow: null,
      radio: false,
      dialogTableVisible: false
    }
  },
  methods: {
    show(activity) {
      this.selectedArr = [...activity]
      this.hasSelectList = []
      activity.forEach(item => {
        this.hasSelectList.push(item.name)
      })
      this.queryData()
    },
    // 使用日期
    handletimeRule(beginTime, endTime) {
      return beginTime.replace('T', ' ') + '-' + endTime.replace('T', ' ')
    },
    handleTemplateName(activityTemplateCode) {
      let name = ''
      switch (activityTemplateCode) {
        case 'TA001':
          name = '领券中心'
          break
        case 'TC002':
          name = '支付有礼'
          break
        case 'TA003':
          name = '大转盘'
          break
        case 'TA004':
          name = '刮刮乐'
          break
      }
      return name
    },
    // 查询商品
    queryData() {
      if (this.beginendtime.length === 0) {
        this.$message({
          message: '请选择活动时间',
          type: 'warning'
        })
      } else {
        this.searchParams.beginTime = this.beginendtime[0]
          .replace(/T/g, ' ')
          .replace(/Z/g, '')
        this.tableLoading = true
        var params = Object.assign({}, this.pageInfo, this.searchParams)
        normalAddActivityList(params).then(res => {
          this.dialogTableVisible = true
          if (res.data && res.data.records) {
            this.gridData = res.data.records
            this.totalCount = res.data.total
            this.$nextTick(() => {
              // this.selectedArr.splice(0)
              if (this.gridData.length > 0 && this.currentRow) {
                const index = this.gridData.findIndex(
                  item => item.id === this.currentRow.id
                )
                if (index > -1) {
                  this.radio = index
                  this.selectedArr.splice(0)
                  console.log(this.selectedArr)
                  this.selectedArr.push(this.currentRow)
                }
              }
            })
          }
          this.tableLoading = false
        })
      }
    },
    searchData() {
      this.queryData()
    },
    // 分页
    handleSizeChange(e) {
      this.pageInfo.pageSize = e
      this.queryData()
    },
    changePage(e) {
      this.pageInfo.currentPage = e
      this.queryData()
    },
    handleCurrentChange(val) {
      this.currentRow = val
      if (this.gridData.length > 0 && this.currentRow) {
        const index = this.gridData.findIndex(
          item => item.id === this.currentRow.id
        )
        if (index > -1) {
          this.radio = index
          this.selectedArr.splice(0)
          console.log(this.selectedArr)
          this.selectedArr.push(this.currentRow)
        }
      }
    },
    getCurrentRow(index) {
      this.radio = index
    },

    // 提交选中
    _submit() {
      this.dialogTableVisible = false
      this.$emit('onSelect', this.selectedArr)
    },

    // 单选
    select(e, rows) {
      this.selectedArr = e
    },
    // 全选
    selectAll(e) {
      this.selectedArr = e
    },
    // 预设选中（下面tag标签）
    selectAuto(e) {
      this.selectedArr = e
    }
  }
}
</script>
<style lang="scss">
.el-dialog {
  width: 55%;
}
.el-dialog__body {
  padding-top: 10px;
  padding-bottom: 0;
  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }
  .has-selected {
    margin-top: 10px;
    border-top: 2px solid #eee;
    padding: 20px 0 10px;
  }
  .el-table thead th {
    height: 40px;
  }
}
</style>
