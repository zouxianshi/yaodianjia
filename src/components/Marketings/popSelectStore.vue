<template>
  <div class="select-store-modal">
    <el-dialog
      :visible.sync="dialogTableVisible"
      :append-to-body="true"
    >
      <span slot="title">选择门店</span>
      <div class="nav-bar">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="门店信息" style="margin-left:10px">
            <el-input v-model="searchParams.storeProperty" placeholder="门店编码/门店名称" size="mini" />
          </el-form-item>
          <el-form-item label="所属企业">
            <el-select v-model="searchParams.orgId" placeholder="请选择" size="mini">
              <el-option v-for="(item, index) in organizations" :key="index" :label="item.orName" :value="item.id" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="dataTable"
        :data="gridData"
        height="200px"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectAuto"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="stCode" label="门店编码" width="150" />
        <el-table-column property="stName" label="门店名称" />
        <el-table-column property="address" label="门店地址" />
        <el-table-column property="mobile" label="门店电话" />
      </el-table>
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div class="has-selected">
        已选门店：
        <span v-for="(item ,index) in selectedArr" :key="index">
          <el-tooltip placement="top">
            <div slot="content">{{ item.stName }}</div>
            <el-tag
              style="margin-right:10px"
              type="success"
            >{{ item.stName.length>10?item.stName.substring(0,10)+'...':item.stName }}</el-tag>
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
import { getOrganization, queryStoreByOrgId } from '@/api/coupon'
export default {
  data() {
    return {
      gridData: [],
      selectedArr: [], //  已选择门店所有信息
      hasSelectList: [], // 已选择门店st_code集合
      searchParams: {
        orgId: '',
        storeProperty: ''
      },
      organizations: [], // 企业列表
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      dialogTableVisible: false
    }
  },
  created() {
    getOrganization({ merCode: this.$store.state.user.merCode }).then(res => {
      if (res.data) {
        this.organizations = res.data
      }
    })
  },
  methods: {
    // 查询列表数据
    queryStoreDate() {
      var params = Object.assign({}, this.searchParams, this.pageInfo)
      queryStoreByOrgId(params).then(res => {
        this.dialogTableVisible = true
        if (res.data && res.data.data) {
          this.gridData = res.data.data
          this.totalCount = res.data.totalCount
          this.$nextTick(() => {
            this.$refs.dataTable.clearSelection()
            this.gridData.forEach(row => {
              if (this.hasSelectList.indexOf(row.stCode) >= 0) {
                this.$refs.dataTable.toggleRowSelection(row, true)
              }
            })
          })
        } else {
          this.gridData = []
        }
      })
    },
    show(store) {
      this.hasSelectList = []
      this.selectedArr = [...store]
      store.forEach(item => {
        this.hasSelectList.push(item.stCode)
      })
      this.queryStoreDate()
    },
    // 提交选中
    _submit() {
      this.dialogTableVisible = false
      this.pageInfo.currentPage = 1
      var selectedData = JSON.parse(JSON.stringify(this.selectedArr))
      this.$emit('onSelect', selectedData)
    },
    searchData() {
      this.queryStoreDate()
    },
    // 分页
    handleSizeChange(e) {
      this.pageInfo.pageSize = e
      this.queryStoreDate()
    },
    handleCurrentChange(e) {
      this.pageInfo.currentPage = e
      this.queryStoreDate()
    },
    // 单选
    select(e, rows) {
      this.checkSelect(e)
    },
    // 全选
    selectAll(e) {
      this.checkSelect(e)
    },
    // 预设选中（下面tag标签）
    selectAuto(e) {
      // this.selectedArr = e
    },
    // 处理所有选中项
    checkSelect(e) {
      // 添加当前页选中项中未在所有已选择的数组中的item
      var nowSelectCode = []
      e.forEach(item => {
        nowSelectCode.push(item.stCode)
        if (this.hasSelectList.indexOf(item.stCode) < 0) {
          this.selectedArr.push(item)
          this.hasSelectList.push(item.stCode)
        }
      })
      // 得到当前页没有选中的id(当前页取消选择)
      var noSelectIds = []
      this.gridData.forEach(row => {
        if (nowSelectCode.indexOf(row.stCode) < 0) {
          noSelectIds.push(row['stCode'])
        }
      })
      noSelectIds.forEach(stCode => {
        for (var i = 0; i < this.hasSelectList.length; i++) {
          if (this.hasSelectList[i] === stCode) {
            // 如果总选择中有未被选中的，那么就删除这条
            this.hasSelectList.splice(i, 1)
            this.selectedArr.splice(i, 1)
            break
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-dialog__body{
  padding-top: 10px;padding-bottom: 0;
  .el-pagination{
    text-align: right;margin-top: 15px;
  }
  .has-selected{
    margin-top: 10px;border-top: 2px solid #eee;padding: 20px 0 10px;
  }
  .el-table thead th{
    height: 40px;
  }
}
</style>
