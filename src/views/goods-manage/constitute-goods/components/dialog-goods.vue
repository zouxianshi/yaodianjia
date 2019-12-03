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
      <div class="title">选取商品</div>
    </div>
    <div class="modal-body">
      <div class="md-search">
        <div class="search-item" @keyup.enter="forSearch()">
          <el-input v-model="search.keyWord" style="width: 240px" placeholder="搜索" size="small" />
        </div>
        <div class="search-btns">
          <el-button type="primary" size="small" @click.stop="forSearch()">查 询</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        v-loading="loading"
        border
        size="small"
        :data="tableData"
        style="width: 100%;margin-top: 20px"
        max-height="256"
        @select-all="handleSelectAllChange"
        @select="handleSelect"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column align="center" label="图片" width="120">
          <template slot-scope="scope">
            <div
              v-if="scope.row.mainPic && scope.row.mainPic!==''"
              class="x-img-mini"
              style="width: 60px; height: 36px"
            >
              <div class="x-image__preview">
                <el-image
                  fit="scale-down"
                  :src="showImg(scope.row.mainPic)"
                  :preview-src-list="[scope.row.imageUrl]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂无上传</div>
          </template>
          <!-- <template slot-scope="scope">
            <div class="img-wrap">
              <img :src="showImg(scope.row.mainPic)">
            </div>
          </template>-->
        </el-table-column>
        <el-table-column prop="commodityName" label="名称" align="center" min-width="150" />
        <!-- <el-table-column label="规格" align="center" min-width="150">
          <template slot-scope="scope">
            <span v-for="(item,index) in scope.row.specSkuList" :key="index">
              {{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}
            </span>
          </template>
        </el-table-column> -->
        <el-table-column prop="standard" label="规格" align="center" min-width="150" />
        <el-table-column prop="mprice" label="价格" align="center" width="100" />
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click.stop="handleSelect(scope.row)">选取</el-button>
          </template>
        </el-table-column>-->
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
          <span v-if="mySelectList && mySelectList.length>0">已选商品：</span>
          <span v-else style="color: red">请选取商品</span>
        </div>
        <div class="label-line">
          <div v-for="(mItem, index2) in mySelectList" :key="index2" class="label">
            <span v-text="mItem.commodityName" />
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
import { getcommSpecGoodsList } from '../../../../api/constitute-goods'
export default {
  name: 'DialogGoods',
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
  created() { },
  mounted() { },
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
      console.log()
      this.tableData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.specId === item.specId
        })
        // this.referPrice = item.mprice
        // item.price = ''
        // this.number = 0
        if (index > -1) {
          if (allList.length > 0) {
            console.log('已存在' + item.specId + ':' + item.commodityName)
          } else {
            // 反选
            this.mySelectList.splice(index, 1)
          }
        } else {
          this.mySelectList.push(item)
        }
      })
      console.log('mySelectList:', this.mySelectList)
    },
    // 选取store-2.表格选取（单选/取消），更新 mySelectList
    handleSelect(val, row) {
      const index = this.mySelectList.findIndex(mItem => {
        return mItem.specId === row.specId
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
        return item.specId === myItem.specId
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
          return mItem.specId === item.specId
        })
        console.log('商品tableData：', this.tableData)
        console.log('商品index', index)
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
    _getTableData() {
      this.loading = true
      const params = {
        searchKeyWord: this.search.keyWord.trim(), // 搜索的关键字
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        commodityType: 1,
        merCode: this.merCode
      }

      getcommSpecGoodsList(params).then(res => {
        if (res.code === '10000' && res.data) {
          this.tableData = res.data.data || []
          this.pager.total = res.data.totalCount
          this.$nextTick(() => {
            this.updateChecked()
          })
        } else {
          this.tableData = []
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
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
  .el-table thead th {
    height: 40px;
  }
  .img-wrap {
    margin: 0 auto;
    width: 50px;
    height: 32px;
    img {
      width: 100%;
      height: 100%;
    }
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
