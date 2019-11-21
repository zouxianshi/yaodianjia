<template>
  <el-dialog
    append-to-body
    class="m-dialog dialog-goods"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    width="560px"
    @close="handlerClose"
  >
    <div class="modal-header">
      <div class="title">批量设置</div>
    </div>
    <div class="modal-body">
      <el-form :model="xForm" label-width="60px">
        <template>
          <el-form-item label="折扣：">
            <el-input style="width: 200px" placeholder="" />
            <span>折</span>
            <span class="note-text">填写折扣，如8</span>
          </el-form-item>
        </template>
        <template>
          <el-form-item label="减价：">
            <el-input style="width: 200px" placeholder="" />
            <span class="note-text">填写减价金额，如减价10元则填10</span>
          </el-form-item>
        </template>
        <template>
          <el-form-item label="限购：">
            <el-input style="width: 200px" placeholder="" />
            <span class="note-text">填写限购数量，如0表示不限购</span>
          </el-form-item>
        </template>
        <template>
          <el-form-item label="库存：">
            <el-input style="width: 200px" placeholder="" />
            <span class="note-text">填写秒杀库存数量，大于0</span>
          </el-form-item>
        </template>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <template v-if="editable">
        <el-button type="primary" size="mini" @click="confirm()">确 定</el-button>
        <el-button size="mini" @click="dialog.visible = false">取 消</el-button>
      </template>
      <el-button v-else @click="dialog.visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { getProductList } from '@/api/wxmall'
export default {
  name: 'DialogSet',
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
      dialog: {
        visible: true
      },
      pager: {
        current: 1,
        size: 5,
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
          return mItem.commodityId === item.commodityId
        })
        if (index > -1) {
          if (allList.length > 0) {
            console.log('已存在' + item.commodityId + ':' + item.commodityName)
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
        return mItem.commodityId === row.commodityId
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
        return item.commodityId === myItem.commodityId
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
          return mItem.commodityId === item.commodityId
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
    _getTableData() {
      // this.tableData = []
      /* setTimeout(() => {
          this.tableData = this.tableArr.slice()
          this.$nextTick(() => {
            this.updateChecked()
          })
        }, 1000)
        return false*/
      const params = {
        storeId: '',
        keyWord: this.search.keyWord.trim(),
        currentPage: this.pager.current,
        pageSize: this.pager.size
      }
      console.log('params', params)
      getProductList(params).then(res => {
        if (res.code === '10000' && res.data) {
          this.tableData = res.data.data || []
          this.pager.total = res.data.totalCount
          this.$nextTick(() => {
            this.updateChecked()
          })
        } else {
          this.tableData = []
        }
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
  .img-wrap{
    margin: 0 auto;
    width: 50px;
    height: 32px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>
<style lang="scss" scoped>
.dialog-goods {
  .modal-header {
    height: 40px;
    line-height: 40px;
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
    font-size: 14px;
    .note-text {
        margin-left: 15px;
        font-size: 13px;
        color: #999999;
    }
  }
}
</style>
