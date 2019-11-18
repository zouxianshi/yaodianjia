<template>
  <div class="app-container">
    <el-alert
      v-if="offlineStore > 0"
      type="warning"
      :closable="false"
    >
      <template slot="title">
        当前上线{{ onlineStore }}家门店，还能上线{{ offlineStore }}家门店
      </template>
    </el-alert>
    <div>
      <el-button type="primary" size="small" style="margin-top: 20px" @click="visable = true">添加上线门店</el-button>
      <div style="float: right">
        <el-input v-model="searchParams.searchKey" size="small" style="width: 200px;margin-top: 20px;margin-left: 80px;" placeholder="门店编码/门店名称" />
        <el-button type="primary" size="small" style="margin-left: 10px" @click="getData">查询</el-button>
        <el-button type="primary" size="small" @click="handleExport">导出<i class="el-icon-download el-icon--right" /></el-button>
      </div>
    </div>
    <el-dialog
      v-if="visable"
      append-to-body
      title="添加上线门店"
      :visible.sync="visable"
      width="800px"
      :close-on-click-modal="false"
      @close="dismiss"
    >
      <div>
        <span>选择门店：</span>
        <el-input v-model="diaLogSearchParams.searchKey" size="small" placeholder="门店编码/名称" style="width: 180px" />
        <el-button size="small" type="primary" style="margin-left: 5px" @click="getData">查询</el-button>
      </div>
      <el-table
        v-loading="loading"
        :data="dialogList"
        height="250"
        border
        style="margin-top: 10px"
        @selection-change="handleDialogSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
          :selectable="checkDialogSelectable"
        />
        <el-table-column label="门店编码">
          <template slot-scope="scope">
            <span v-if="scope.row.stCode">
              {{ scope.row.stCode }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="门店名称">
          <template slot-scope="scope">
            <span v-if="scope.row.stName">
              {{ scope.row.stName }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="门店地址">
          <template slot-scope="scope">
            <span v-if="scope.row.address">
              {{ scope.row.address }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="门店电话">
          <template slot-scope="scope">
            <span v-if="scope.row.mobile">
              {{ scope.row.mobile }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="配送方式">
          <template slot-scope="scope">
            <span v-if="scope.row.isself === 1 || scope.row.isdelivery === 1 || scope.row.isdistribution === 1">
              {{ getDeliveryFun(scope.row) }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="diaLogTotalCount"
          :current-page="diaLogSearchParams.currentPage"
          :page-size="diaLogSearchParams.pageSize"
          @current-change="dialogPageChange"
        />
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dismiss">取 消</el-button>
        <el-button type="primary" size="small" @click="online">确定</el-button>
      </div>
    </el-dialog>
    <section class="table-box">
      <el-table
        v-loading="loading"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <div slot="empty">
          当前无上线门店，上线商城需添加<el-button type="text" @click="visable = true">上线门店</el-button>
        </div>
        <el-table-column
          type="selection"
          width="55"
          :selectable="checkSelectable"
        />
        <el-table-column label="门店图片">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="scope.row.stPath"
            />
          </template>
        </el-table-column>
        <el-table-column label="门店名称">
          <template slot-scope="scope">
            <span v-if="scope.row.stName">
              {{ scope.row.stName }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="门店编码">
          <template slot-scope="scope">
            <span v-if="scope.row.stCode">
              {{ scope.row.stCode }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="门店地址">
          <template slot-scope="scope">
            <span v-if="scope.row.address">
              {{ scope.row.address }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="电话">
          <template slot-scope="scope">
            <span v-if="scope.row.mobile">
              {{ scope.row.mobile }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="配送支持">
          <template slot-scope="scope">
            <span v-if="scope.row.isself === 1 || scope.row.isdelivery === 1 || scope.row.isdistribution === 1">
              {{ getDeliveryFun(scope.row) }}
            </span>
            <span v-else style="color: red">未配置</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
            <!--            <el-button size="small" type="text">编辑</el-button>-->
            <el-button size="small" type="text" :disabled="scope.row.centerStore === 1" @click="offline(scope.row.stCode)">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :current-page="searchParams.currentPage"
          :page-size="searchParams.pageSize"
          @current-change="pageChange"
        />
      </div>
    </section>
    <div style="margin-top: 10px">
      <span style="font-size: 14px">已选{{ multipleSelection.length }}家门店</span>
      <el-button type="primary" size="mini" @click="offline(null)">下线</el-button>
    </div>
    <!--<div style="margin-top: 10px;font-size: 14px;font-weight: 400;color:#99a9bf;line-height: 20px">
      添加上线门店时，如在购买范围内的上线门店数量，提示：操作成功；如超出门店购买范围<br>
      提示:您上线的门店已超出上限，如需上线更多门店，请进行购买
    </div>-->
  </div>
</template>

<script>
import _ from 'lodash'
import download from '@hydee/download'
import { mapGetters } from 'vuex'
import {
  queryStore,
  onOffStore,
  exportData
} from '../../api/chainSetting'
export default {
  name: 'Setting',
  data() {
    return {
      visable: false,
      loading: false,
      totalCount: 0,
      diaLogTotalCount: 0,
      searchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        searchKey: null,
        onlineStatus: 1
      },
      diaLogSearchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        searchKey: null,
        onlineStatus: 0
      },
      multipleSelection: [],
      dialogMultipleSelection: [],
      onlineStore: 0,
      offlineStore: 0,
      list: [],
      dialogList: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      this.loading = true
      this.searchParams.merCode = this.merCode
      queryStore({
        merCode: this.merCode,
        currentPage: 1,
        pageSize: 200000
      }).then(res => {
        if (res.code === '10000') {
          this.onlineStore = _.filter(_.cloneDeep(res.data.data), { 'onlineStatus': 1 }).length
          this.offlineStore = _.filter(_.cloneDeep(res.data.data), { 'onlineStatus': 0 }).length
        }
        console.log('res-2', this.list)
      })
      queryStore(this.searchParams).then(res => {
        if (res.code === '10000') {
          this.list = _.cloneDeep(res.data.data)
          this.totalCount = res.data.totalCount
          this.loading = false
          console.log(this.list, this.dialogList)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
      this.diaLogSearchParams.merCode = this.merCode
      queryStore(this.diaLogSearchParams).then(res => {
        if (res.code === '10000') {
          this.dialogList = _.cloneDeep(res.data.data)
          this.diaLogTotalCount = res.data.totalCount
          this.loading = false
          console.log(this.list, this.dialogList)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    online() {
      if (this.dialogMultipleSelection.length <= 0) {
        this.$message({
          message: '请至少选择一个门店',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      const selectStore = _.map(this.dialogMultipleSelection, (o) => {
        return o.stCode
      })
      console.log(selectStore)
      const params = {
        list: selectStore,
        merCode: this.merCode,
        onlineStatus: 1
      }
      onOffStore(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '门店上线成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.dismiss()
          this.getData()
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    offline(id) {
      const params = {
        list: [],
        merCode: this.merCode,
        onlineStatus: 0
      }
      if (id) {
        console.log(id)
        params.list = [id]
      } else {
        console.log(this.multipleSelection.length)
        if (this.multipleSelection.length <= 0) {
          this.$message({
            message: '请至少选择一个门店',
            type: 'error',
            duration: 5 * 1000
          })
          return
        }
        params.list = _.map(this.multipleSelection, (o) => {
          return o.stCode
        })
      }
      onOffStore(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: '门店下线成功',
            type: 'success',
            duration: 5 * 1000
          })
          this.getData()
          this.loading = false
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    checkSelectable(row) {
      return row.centerStore !== 1
    },
    checkDialogSelectable(row) {
      return row.stCode && row.stName && row.address && row.mobile && (row.isself === 1 || row.isdelivery === 1 || row.isdistribution === 1)
    },
    handleDialogSelectionChange(val) {
      this.dialogMultipleSelection = val
      console.log(this.dialogMultipleSelection)
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log(this.multipleSelection)
    },
    pageChange(currentPage) {
      this.loading = true
      this.searchParams.currentPage = currentPage
      queryStore(this.searchParams).then(res => {
        if (res.code === '10000') {
          this.list = _.cloneDeep(res.data.data)
          this.totalCount = res.data.totalCount
          this.loading = false
          console.log(this.list, this.dialogList)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    dialogPageChange(currentPage) {
      this.loading = true
      this.diaLogSearchParams.currentPage = currentPage
      this.diaLogSearchParams.merCode = this.merCode
      queryStore(this.diaLogSearchParams).then(res => {
        if (res.code === '10000') {
          this.dialogList = _.cloneDeep(res.data.data)
          this.diaLogTotalCount = res.data.totalCount
          this.loading = false
          console.log(this.list, this.dialogList)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    handleExport() {
      this.searchParams.excelFlag = true
      exportData(this.searchParams)
        .then(res => {
          if (res.type === 'application/json') {
            this.$message({
              message: '导出的记录为空',
              type: 'error'
            })
          } else {
            download.blob(res)
            this.$message({
              message: '数据导出成功',
              type: 'success'
            })
          }
        })
        .catch(() => {

        })
    },
    dismiss() {
      this.visable = false
      this.dialogMultipleSelection = null
    },
    getDeliveryFun(row) {
      const isself = row.isself
      const isdelivery = row.isdelivery
      const isdistribution = row.isdistribution
      let funNum = 0
      let funVal = ''
      if (isself === 1) {
        funVal += '门店自提'
        funNum++
      }
      if (isdelivery === 1) {
        if (funNum > 0) {
          funVal += '，'
        }
        funVal += '普通快递'
        funNum++
      }
      if (isdistribution === 1) {
        if (funNum > 0) {
          funVal += '，'
        }
        funVal += '配送上门'
        funNum++
      }
      return funVal
    }
  }
}
</script>

<style scoped>
  .container{
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 10px;
  }
  .container h3 {
    font-size: 22px;
    font-weight: 400;
    margin: 0 0 10px;
    color: #1f2d3d;
  }
  .container h6 {
    font-size: 14px;
    font-weight: 400;
    color: #99a9bf;
  }
  .label-name {
    display: inline-block;
    margin-right: 10px;
    text-align: right;
    color: #999999;
    font-size: 14px;
  }
  .pages {
    text-align: right;
    padding-top: 20px;
    margin-right: -10px;
  }
</style>
