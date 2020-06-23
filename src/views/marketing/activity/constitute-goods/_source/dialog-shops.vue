<template>
  <el-dialog
    append-to-body
    class="m-dialog dialog-goods"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    width="900px"
    @close="handlerClose"
  >
    <div class="modal-header">
      <div class="title">上下架商品</div>
    </div>
    <div class="modal-body">
      <div class="md-search">
        <div class="search-item" @keyup.enter="forSearch()">
          <span class="title">选择门店：</span>
          <el-input
            v-model="searchParams.searchKey"
            style="width: 240px"
            placeholder="
门店编码/门店名称"
            size="small"
          />
        </div>
        <div class="search-btns">
          <el-button type="primary" size="small" @click.stop="forSearch()">查 询</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        border
        :data="tableData"
        style="width: 100%;margin-top: 20px"
        max-height="256"
        @select-all="handleSelectAllChange"
        @select="handleSelect"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column align="center" prop="stCode" label="门店编码" width="120" />
        <el-table-column prop="stName" label="门店名称" align="center" min-width="150" />
        <el-table-column prop="address" label="门店地址" align="center" min-width="150" />
        <el-table-column prop="mobile" label="门店电话" align="center" min-width="150" />
      </el-table>
      <el-pagination
        background
        style="text-align: right;margin-top: 20px"
        :current-page="pager.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pager.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div class="result-section">
        <div class="blank-line" />
        <div class="title">
          <span v-if="mySelectList && mySelectList.length>0">已选门店：</span>
          <span v-else style="color: red">请选择门店</span>
        </div>
        <div class="label-line">
          <div v-for="(mItem, index2) in mySelectList" :key="index2" class="label">
            <span v-text="mItem.stName" />
            <i
              v-if="editable"
              class="icon el-icon-close"
              @click.stop="removeMyselectItem(mItem, index2)"
            />
          </div>
        </div>
      </div>
    </div>
    <span slot="footer" class="dialog-footer">
      <template v-if="editable">
        <el-button type="primary" size="small" @click="confirm()">确 定</el-button>
        <el-button size="small" @click="dialog.visible = false">取 消</el-button>
      </template>
      <el-button v-else @click="dialog.visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { mapGetters } from 'vuex'
import { queryStore } from '@/api/chainSetting'
export default {
  name: 'DialogShops',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    editable: {
      // 是否可编辑
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      visable: false,
      flagShipName: null,
      codeOrName: null,
      totalCount: 0,
      searchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        searchKey: null
      },
      loading: false,
      dialog: {
        visible: false
      },
      pager: {
        current: 1,
        size: 10,
        total: 0
      },
      search: {
        keyWord: ''
      },
      tableData: [],
      multipleSelection: [],
      mySelectList: []
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {},
  mounted() {},
  methods: {
    // 获取数据
    fetchData() {
      this._getTableData() // 统计列表
    },
    open() {
      this.dialog.visible = true
      this.mySelectList = this.list.slice()
      this.fetchData()
    },
    close() {
      this.dialog.visible = false
    },
    reset() {
      this.pager = {
        current: 1,
        size: 10,
        total: 0
      }
      this.search = {
        keyWord: ''
      }
    },
    confirm() {
      if (this.mySelectList && this.mySelectList.length === 0) {
        this.$message({ type: 'warning', message: '请选取商品' })
        return false
      }
      this.$emit('confirm', this.mySelectList)
      this.close()
    },
    handlerClose() {
      this.reset()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager.size = val
      this.fetchData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this.fetchData()
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 选取store-1.表格选取（全选/反选），更新 mySelectList
    handleSelectAllChange(allList) {
      this.tableData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.id === item.id
        })
        if (index > -1) {
          if (allList.length > 0) {
            console.log('已存在' + item.id + ':' + item.name)
          } else {
            // 反选
            this.mySelectList.splice(index, 1)
          }
        } else {
          this.mySelectList.push(item)
        }
      })
    },
    // 选取store-2.表格选取（单选/取消），更新 mySelectList
    handleSelect(val, row) {
      const index = this.mySelectList.findIndex(mItem => {
        return mItem.storeId === row.storeId
      })
      if (index > -1) {
        this.mySelectList.splice(index, 1)
      } else {
        this.mySelectList.push(row)
      }
    },
    // 选取store-3. 移除mySelectList的 item, 更新table的列表选中
    removeMyselectItem(myItem, index2) {
      const index = this.tableData.findIndex(item => {
        return item.storeId === myItem.storeId
      })
      if (index > -1) {
        this.toggleSelection([this.tableData[index]])
      }
      this.mySelectList.splice(index2, 1)
    },
    // 选取store-4. table数据更新时(初次,切页面等), 根据 mySelectList 更新table的列表选中
    updateChecked() {
      const currentCheckedList = []
      this.tableData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.storeId === item.storeId
        })
        if (index > -1) {
          currentCheckedList.push(item)
        }
      })
      this.toggleSelection(currentCheckedList)
    },
    forSearch() {
      this.pager.current = 1
      this.pager.total = 0
      this._getTableData()
    },
    // getStore() {
    //   this.loading = true
    //   this.searchParams.merCode = this.merCode
    //   this.searchParams.onlineStatus = 1
    //   queryStore(this.searchParams).then(res => {
    //     if (res.code === '10000') {
    //       this.list = res.data.data
    //       this.totalCount = res.data.totalCount
    //       this.loading = false
    //     } else {
    //       this.loading = false
    //       this.$message({
    //         message: res.msg,
    //         type: 'error',
    //         duration: 5 * 1000
    //       })
    //     }
    //     console.log('res-2', this.list)
    //   })
    // },
    _getTableData() {
      this.loading = true
      this.searchParams.merCode = this.merCode
      this.searchParams.onlineStatus = 1
      queryStore(this.searchParams).then(res => {
        if (res.code === '10000') {
          this.tableData = res.data.data
          this.totalCount = res.data.totalCount
          this.loading = false
          console.log('tableData:', this.tableData)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        // console.log('res-2', this.list)
      })
      // const params = {
      //   storeId: '',
      //   keyWord: this.search.keyWord.trim(),
      //   currentPage: this.pager.current,
      //   pageSize: this.pager.size
      // }
      // getProductList(params).then(res => {
      //   if (res.code === '10000' && res.data) {
      //     this.tableData = res.data.data || []
      //     this.pager.total = res.data.totalAmount
      //     this.$nextTick(() => {
      //       this.updateChecked()
      //     })
      //   } else {
      //     this.tableData = []
      //   }
      // })
    }
  }
}
</script>

<style lang="scss">
.dialog-goods {
  .el-dialog__header {
    height: 0;
    padding: 0;
  }
  .el-dialog__body {
    padding: 0;
  }

  .el-dialog__headerbtn {
    top: 8px;
    right: 12px;
  }
}
</style>
<style lang="scss" scoped>
.dialog-goods {
  .modal-header {
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    font-weight: bold;
    text-align: left;
    background: #f2f2f2;

    .title {
      margin-left: 15px;
      font-size: 15px;
    }
  }

  .modal-body {
    box-sizing: border-box;
    padding: 20px;

    .md-search {
      display: flex;

      .search-item {
        flex: 0 0 auto;
      }

      .search-btns {
        margin-left: 20px;
      }
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
  }
}
</style>
