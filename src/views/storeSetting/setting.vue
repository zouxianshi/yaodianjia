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
      <el-button type="primary" size="small" style="margin-top: 20px" @click="showDialog">添加上线门店</el-button>

      <div style="float: right">
        <el-input v-model="searchParams.searchKey" size="small" style="width: 200px;margin-top: 20px;margin-left: 80px;" placeholder="门店编码/门店名称" />
        <el-button type="primary" size="small" style="margin-left: 10px" @click="onSearch">查询</el-button>
        <el-button type="primary" size="small" @click="handleExport">导出<i class="el-icon-download el-icon--right" /></el-button>
      </div>
    </div>
    <el-dialog
      v-if="visable"
      lock-scroll
      title="添加上线门店"
      :modal-append-to-body="false"
      :visible.sync="visable"
      width="800px"
      :close-on-click-modal="false"
      @close="dismiss"
    >
      <div
        style=" font-size: 14px;
    font-weight: 400;
    color: #99a9bf"
      >
        上线门店需配置门店地址、门店电话、配送方式，未配置的门店无法上线门店商城
      </div>
      <div style="margin-top: 10px">
        <span>选择门店：</span>
        <el-input v-model="diaLogSearchParams.searchKey" size="small" placeholder="门店编码/名称" style="width: 180px" />
        <el-button size="small" type="primary" style="margin-left: 5px" @click="onDialogSearch">查询</el-button>
      </div>
      <el-table
        ref="multipleDialogTable"
        v-loading="dialogLoading"
        :data="dialogList"
        height="250"
        border
        style="margin-top: 10px"
        @select="handleDialogSelectChange"
        @select-all="handleDialogSelectAllChange"
      >
        <!-- @selection-change="handleDialogSelectionChange" -->
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
      <div style="position: relative">
        <!--<span
          v-if="dialogSelectedStore"
          style="
        position: absolute;
        margin-top: 25px;
        width: 250px;
        display: block;
        overflow: hidden;
        height:16px;
        line-height: 16px;
        text-overflow: ellipsis;
        -ms-text-overflow: ellipsis;
        white-space:nowrap;"
        >
          已选门店：{{ dialogSelectedStore }}
        </span>-->
        <div class="pages">
          <el-pagination
            background
            layout="total, sizes, prev, pager, next, jumper"
            :total="diaLogTotalCount"
            :current-page="diaLogSearchParams.currentPage"
            :page-size="diaLogSearchParams.pageSize"
            @size-change="dialogPageSizeChange"
            @current-change="dialogPageChange"
          />
        </div>
        <div class="result-section">
          <div class="blank-line" />
          <div class="title">
            <span v-if="myDialogSelectList && myDialogSelectList.length>0">已选门店：</span>
            <span v-else style="color: red">请选取门店</span>
          </div>
          <div class="label-line">
            <span v-for="(mItem, index2) in myDialogSelectList" :key="index2" class="label" style="margin-right: 15px">
              <span v-text="mItem.stName" />
              <el-button type="text" size="mini" class="icon el-icon-close" @click="removeDialogMyselectItem(mItem, index2)" />
              <!--<i
                class="icon el-icon-close"
                @click.stop="removeDialogMyselectItem(mItem, index2)"
              />-->
            </span>
          </div>
        </div>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dismiss">取 消</el-button>
        <el-button type="primary" size="small" @click="online">确定</el-button>
      </div>
    </el-dialog>
    <section class="table-box">
      <el-table
        ref="multipleTable"
        v-loading="loading"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <!--        @select="handleSelectChange"-->
        <!--        @select-all="handleSelectAllChange"-->
        <div slot="empty">
          当前无上线门店，上线商城需添加<el-button type="text" @click="showDialog">上线门店</el-button>
        </div>
        <el-table-column
          type="selection"
          width="55"
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
            <el-button type="text" @click="onEdit(scope.row.id)">编辑</el-button>
            <el-button type="text" :disabled="scope.row.centerStore === 1" @click="offline(scope.row.stCode)">下线</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pages">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          :current-page="searchParams.currentPage"
          :page-size="searchParams.pageSize"
          @size-change="pageSizeChange"
          @current-change="pageChange"
        />
      </div>
      <!--<div class="result-section">
        <div class="blank-line" />
        <div class="title">
          <span v-if="mySelectList && mySelectList.length>0">已选门店：</span>
          <span v-else style="color: red">请选取门店</span>
        </div>
        <div class="label-line">
          <span v-for="(mItem, index2) in mySelectList" :key="index2" class="label" style="margin-right: 15px">
            <span v-text="mItem.stName" />
            <el-button type="text" size="mini" class="icon el-icon-close" @click="removeMyselectItem(mItem, index2)" />
            &lt;!&ndash;<i
                class="icon el-icon-close"
                @click.stop="removeDialogMyselectItem(mItem, index2)"
              />&ndash;&gt;
          </span>
        </div>
      </div>-->
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
      dialogLoading: false,
      totalCount: 0,
      diaLogTotalCount: 0,
      searchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        searchKey: null,
        onlineStatus: 1,
        status: 1
      },
      diaLogSearchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        searchKey: null,
        onlineStatus: 0,
        status: 1
      },
      multipleSelection: [],
      dialogSelectedStore: null,
      onlineStore: 0,
      offlineStore: 0,
      list: [],
      dialogList: [],
      myDialogSelectList: []
      // mySelectList: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getData()
    // this.getDialogData()
  },
  methods: {
    _getData: _.debounce(function() {
      this.getData()
    }, 300, {
      'leading': false,
      'trailing': true
    }),
    onEdit(id) {
      window.location.href = window.location.origin + '/merchant/#/institution/store-edit?id=' + id
    },
    onDialogSearch() {
      this.diaLogSearchParams.currentPage = 1
      this.getDialogData()
    },
    onSearch() {
      this.searchParams.currentPage = 1
      this.getData()
    },
    getData() {
      this.loading = true
      this.searchParams.merCode = this.merCode
      queryStore({
        merCode: this.merCode,
        currentPage: 1,
        pageSize: 200000,
        status: 1
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
          if (!this.list) {
            this.searchParams.currentPage = 1
          }
          this.totalCount = res.data.totalCount
          this.loading = false
          /* this.$nextTick(() => {
            this.updateChecked()
          })*/
          console.log(this.list, this.dialogList)
        } else {
          this.searchParams.currentPage = 1
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
    showDialog() {
      this.visable = true
      this.getDialogData()
    },
    getDialogData() {
      this.dialogLoading = true
      this.diaLogSearchParams.merCode = this.merCode
      queryStore(this.diaLogSearchParams).then(res => {
        if (res.code === '10000') {
          this.dialogList = _.cloneDeep(res.data.data)
          this.diaLogTotalCount = res.data.totalCount
          this.dialogLoading = false
          if (!this.dialogList) {
            this.diaLogSearchParams.currentPage = 1
          }
          this.$nextTick(() => {
            this.updateDialogChecked()
          })
          console.log(this.list, this.dialogList)
        } else {
          this.dialogLoading = false
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
      if (this.myDialogSelectList.length <= 0) {
        this.$message({
          message: '请至少选择一个门店',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      const selectStore = _.map(this.myDialogSelectList, (o) => {
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
          this.loading = false
          // this.totalCount = params.list.length
          // this.list = _.cloneDeep(_.filter(this.list, o => {
          //     return _.indexOf(params.list, o.stCode) === -1
          // }))
          // console.log(this.multipleSelection.length, this.list.length, this.currentPage)
          if ((this.multipleSelection.length >= this.list.length || this.list.length <= 1) && this.searchParams.currentPage > 1) {
            this.searchParams.currentPage--
          }
          /* if (id) {
            this.mySelectList = _.filter(_.cloneDeep(this.mySelectList), o => o.stCode !== id)
          } else {
            this.mySelectList = []
          }*/
          this.getData()
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
    /*  checkSelectable(row) {
      return row.centerStore !== 1
    },*/
    checkDialogSelectable(row) {
      return row.stCode && row.stName && row.address && row.mobile && (row.isself === 1 || row.isdelivery === 1 || row.isdistribution === 1)
    },
    handleDialogSelectAllChange(allList) {
      this.dialogList.forEach(item => {
        if (item.stCode && item.stName && item.address && item.mobile && (item.isself === 1 || item.isdelivery === 1 || item.isdistribution === 1)) {
          const index = this.myDialogSelectList.findIndex(mItem => {
            return mItem.stCode === item.stCode
          })
          if (index > -1) {
            if (allList.length > 0) {
              console.log('已存在' + item.stCode + ':' + item.stName)
            } else {
              // 反选
              this.myDialogSelectList.splice(index, 1)
            }
          } else {
            this.myDialogSelectList.push(item)
          }
        }
      })
      console.log('myDialogSelectList:', this.myDialogSelectList)
    },
    handleDialogSelectChange(val, row) {
      const index = this.myDialogSelectList.findIndex(mItem => {
        return mItem.stCode === row.stCode
      })
      if (index > -1) {
        this.myDialogSelectList.splice(index, 1)
      } else {
        this.myDialogSelectList.push(row)
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    /* handleSelectAllChange(allList) {
      this.list.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.stCode === item.stCode
        })
        if (index > -1) {
          if (allList.length > 0) {
            console.log('已存在' + item.stCode + ':' + item.stName)
          } else {
            // 反选
            this.mySelectList.splice(index, 1)
          }
        } else {
          this.mySelectList.push(item)
        }
      })
      console.log('myDialogSelectList:', this.mySelectList)
    },
    handleSelectChange(val, row) {
      const index = this.mySelectList.findIndex(mItem => {
        return mItem.stCode === row.stCode
      })
      if (index > -1) {
        this.mySelectList.splice(index, 1)
      } else {
        this.mySelectList.push(row)
      }
    },*/
    pageSizeChange(pageSize) {
      this.loading = true
      this.searchParams.pageSize = pageSize
      queryStore(this.searchParams).then(res => {
        if (res.code === '10000') {
          this.list = _.cloneDeep(res.data.data)
          this.totalCount = res.data.totalCount
          this.loading = false
          /* this.$nextTick(() => {
            this.updateChecked()
          })*/
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
    pageChange(currentPage) {
      console.log(currentPage)
      this.loading = true
      this.searchParams.currentPage = currentPage
      queryStore(this.searchParams).then(res => {
        if (res.code === '10000') {
          this.list = _.cloneDeep(res.data.data)
          this.totalCount = res.data.totalCount
          this.loading = false
          /* this.$nextTick(() => {
            this.updateChecked()
          })*/
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
    dialogPageSizeChange(pageSize) {
      this.diaLogSearchParams.pageSize = pageSize
      this.getDialogData()
    },
    dialogPageChange(currentPage) {
      this.diaLogSearchParams.currentPage = currentPage
      this.getDialogData()
      /* this.loading = true
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
      })*/
    },
    handleExport() {
      if (this.multipleSelection.length <= 0) {
        this.$message({
          message: '请至少选择一个门店',
          type: 'error',
          duration: 5 * 1000
        })
        return
      }
      const stCodeList = _.map(this.multipleSelection, (o) => {
        return o.stCode
      })
      // this.searchParams.excelFlag = true
      exportData({
        merCode: this.merCode,
        stCodeList: stCodeList
      })
        .then(res => {
          this.searchParams.excelFlag = null
          if (res.type === 'application/json') {
            this.$message({
              message: '导出的记录为空',
              type: 'error'
            })
          } else {
            download.blob(res, '上线门店')
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
      this.dialogSelectedStore = ''
      this.diaLogSearchParams.searchKey = null
      this.myDialogSelectList = []
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
    },
    removeDialogMyselectItem(myItem, index2) {
      const index = this.dialogList.findIndex(item => {
        return item.stCode === myItem.stCode
      })
      if (index > -1) {
        this.toggleDialogSelection([this.dialogList[index]])
      }
      this.myDialogSelectList.splice(index2, 1)
    },
    updateDialogChecked() {
      const currentCheckedList = []
      this.dialogList.forEach(item => {
        const index = this.myDialogSelectList.findIndex(mItem => {
          return mItem.stCode === item.stCode
        })
        if (index > -1) {
          currentCheckedList.push(item)
        }
      })
      console.log('currentCheckedList', currentCheckedList)
      this.toggleDialogSelection(currentCheckedList)
    },
    toggleDialogSelection(rows) {
      if (rows) {
        console.log('dd', rows)
        rows.forEach(row => {
          this.$refs.multipleDialogTable.toggleRowSelection(row)
        })
      } else {
        console.log('da')
        this.$refs.multipleDialogTable.clearSelection()
      }
    }/*,
    removeMyselectItem(myItem, index2) {
      const index = this.list.findIndex(item => {
        return item.stCode === myItem.stCode
      })
      if (index > -1) {
        this.toggleSelection([this.list[index]])
      }
      this.mySelectList.splice(index2, 1)
    },
    updateChecked() {
      const currentCheckedList = []
      this.list.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.stCode === item.stCode
        })
        if (index > -1) {
          currentCheckedList.push(item)
        }
      })
      console.log('currentCheckedList', currentCheckedList)
      this.toggleSelection(currentCheckedList)
    },
    toggleSelection(rows) {
      if (rows) {
        console.log('dd', rows)
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        console.log('da')
        this.$refs.multipleTable.clearSelection()
      }
    }*/
  }
}
</script>

<style lang="scss" scoped>
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
  .result-section {
    margin-top: 20px;
    box-sizing: border-box;

  .blank-line {
    margin-left: -20px;
    margin-right: -20px;
    height: 10px;
    background: #f2f2f2;
  }

  .title {
    margin-top: 10px;
    font-size: 16px;
    line-height: 40px;
    color: black;
  }

  .label-line {
    height: 60px;
    overflow: auto;

  .label {
    line-height: 30px;
    margin-right: 24px;
    display: inline-block;
    color: #16a8e2;

  .icon {
    cursor: pointer;
  }
  }
  }
  }
</style>
