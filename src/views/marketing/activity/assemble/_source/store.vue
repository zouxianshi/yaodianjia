<template>
  <div>
    <el-dialog
      title="选择门店"
      :visible.sync="isShow"
      append-to-body
      width="700px"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="modal-body">
        <div class="search-box" @keydown.enter="_loadStoreData">
          <div class="search-query">
            <el-input v-model="storeCode" placeholder="门店编码/门店名称" style="width:200px" size="mini" />
            <el-button type="primary" size="mini" @click="_loadStoreData">查询</el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          style="width: 100%"
          max-height="300"
          @select-all="handleSelectionChangeStore"
          @select="handleSelect"
        >
          <el-table-column
            type="selection"
            :selectable="checkSelectable"
            width="55"
          />
          <el-table-column label="门店编号" prop="stCode" />
          <el-table-column label="门店名称" prop="stName" />
          <el-table-column label="门店地址" show-overflow-tooltip>
            <template slot-scope="scope">
              {{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}{{ scope.row.address }}
            </template>
          </el-table-column>
          <el-table-column label="门店电话" prop="mobile" />
        </el-table>
        <div class="text-right pagination">
          <el-pagination
            small
            :current-page="currentPage"
            background
            :page-size="10"
            layout="total, prev, pager, next"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <el-divider content-position="left">选择的门店</el-divider>
        <ul class="choose-box">
          <template v-if="multipleSelection.length!==0">
            <li v-for="(item,index) in multipleSelection" :key="index">
              <el-tag type="info" size="small" closable @close="handleTagClose(item)"><span :title="item.stName">{{ item.stName }}</span></el-tag>
            </li>
          </template>
          <template v-else>
            <p class="text-center">请选择门店</p>
          </template>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="" size="small" @click="handleCanle">取消</el-button>
        <el-button type="primary" size="small" :loading="subLoading" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getStoreList } from '@/api/depot'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    list: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      storeCode: '',
      total: 0, // 门店总页数
      currentPage: 1, // 门店分页
      chooseStore: [], // 选择的门店数据
      tableData: [],
      multipleSelection: [],
      isAll: false,
      subLoading: false
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        if (this.list && this.list.length > 0) {
          this.multipleSelection = this.list.slice()
        } else {
          this.multipleSelection = []
        }
        this.currentPage = 1
        this._loadStoreData()
      }
    }
  },
  created() {

  },
  methods: {
    checkSelectable() {
      return !this.isAll
    },
    handleChooseStore() { // 选择全部
      this.$refs.multipleTable.clearSelection()
      this.multipleSelection = []
      this.tableData.map(v => {
        this.$refs.multipleTable.toggleRowSelection(v)
      })
    },
    _loadStoreData() {
      const query = {
        searchKey: this.storeCode,
        currentPage: this.currentPage,
        onlineStatus: 1,
        status: 1,
        pageSize: 10
      }
      getStoreList(query).then(res => {
        const { data, totalCount } = res.data
        this.tableData = data
        this.total = totalCount
        if (this.isAll) { // 选择全部  选中门店
          setTimeout(() => {
            this.tableData.map(v => {
              this.$refs.multipleTable.toggleRowSelection(v)
            })
          }, 300)
        } else {
          setTimeout(() => {
            // 翻页 如果存在之前选中的就选中
            this.tableData.map(v => {
              const index = this.multipleSelection.findIndex(item => {
                return item.id === v.id
              })
              if (index > -1) {
                this.$refs.multipleTable.toggleRowSelection(v)
              }
            })
          }, 300)
        }
      })
    },
    handleSubmit() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '你未选择任何门店，请先选择门店',
          type: 'warning'
        })
        return
      }
      this.$emit('complete', this.multipleSelection)
    },
    handleSelectionChangeStore(allList) { // 门店列表选中事件 表格全选事件
      this.tableData.map(item => {
        const index = this.multipleSelection.findIndex(mItem => {
          return mItem.id === item.id
        })
        if (index > -1) {
          if (allList.length > 0) {
            // console.log('已存在' + item.commodityId + ':' + item.commodityName)
          } else {
            // 反选
            this.multipleSelection.splice(index, 1)
          }
        } else {
          this.multipleSelection.push(item)
        }
      })
    },
    handleSelect(selection, row) { // 单个选择
      const index = this.multipleSelection.findIndex(v => {
        return v.id === row.id
      })
      if (index > -1) {
        this.multipleSelection.splice(index, 1)
      } else {
        this.multipleSelection.push(row)
      }
    },
    handleTagClose(row) {
      const index = this.multipleSelection.findIndex(v => {
        return v.id === row.id
      })
      if (index > -1) {
        this.multipleSelection.splice(index, 1)
      }
      this.tableData.map(v => {
        if (v.id === row.id) {
          this.$refs.multipleTable.toggleRowSelection(v)
        }
      })
    },
    handleCanle() {
      this.$emit('close')
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this._loadStoreData()
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-body{
  .search-box{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .search-query{
      display: flex;
      .el-input{
        margin-right: 10px;
      }
    }
  }
  .pagination{
    margin: 10px 0;
  }
  .choose-box{
      li{
          display: inline-block;
          margin-right: 10px;
          margin-bottom: 10px;
          .el-tag{
            display: flex;
            align-items: center;
            span{
              display: inline-block;
              overflow: hidden;
              max-width: 200px;
              text-overflow:ellipsis;
            }

          }
           .el-tag__close{
              display: inline-block;
              margin-top: 5px;
            }
      }
  }
}
</style>
