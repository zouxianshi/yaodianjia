<template>
  <div>
    <el-dialog
      :title="`${status===0?'下架':'上架'}商品(已选${chooseNum}个商品)`"
      :visible.sync="isShow"
      append-to-body
      width="700px"
      :close-on-press-escape="false"
      :show-close="false"
      :close-on-click-modal="false"
    >
      <div class="modal-body">
        <div class="search-box" @keydown.enter="_loadStoreData">
          <div class="search-item">
            <span>门店选择：</span>
            <el-checkbox v-model="isAll" @change="handleChooseStore">全部门店</el-checkbox>
          </div>
          <div class="search-query">
            <el-input v-model="storeCode" placeholder="门店编码/门店名称" style="width:200px" size="mini" />
            <el-button type="primary" size="mini" @click="_loadStoreData">查询</el-button>
          </div>
        </div>
        <el-table
          ref="multipleTable"
          :data="list"
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
        <el-divider content-position="left">未选择门店的销售状态保持不变</el-divider>
        <ul class="choose-box">
          <template v-if="!isAll&&multipleSelection.length!==0">
            <li v-for="(item,index) in multipleSelection" :key="index">
              <el-tag type="info" size="small" closable @close="handleTagClose(item)"><span :title="item.stName">{{ item.stName }}</span></el-tag>
            </li>
          </template>
          <template v-else>
            <p class="text-center">{{ isAll?'已选择全部门店':'请选择门店' }}</p>
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
import { getStoreList, setBatchUpdown } from '@/api/depot'
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    status: {
      type: Number,
      default: 0
    },
    chooseNum: {
      type: Number,
      default: 0
    },
    specData: {
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
      list: [],
      multipleSelection: [],
      isAll: false,
      subLoading: false
    }
  },
  watch: {
    isShow(val) {
      if (val) {
        this.multipleSelection = []
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
      this.list.map(v => {
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
        this.list = data
        this.total = totalCount
        if (this.isAll) { // 选择全部  选中门店
          setTimeout(() => {
            this.list.map(v => {
              this.$refs.multipleTable.toggleRowSelection(v)
            })
          }, 300)
        } else {
          setTimeout(() => {
            // 翻页 如果存在之前选中的就选中
            this.list.map(v => {
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
      const data = []
      if (!this.isAll) {
        this.multipleSelection.map(res => {
          data.push(res.id)
        })
      }

      if (!this.isAll && data.length === 0) {
        this.$message({
          message: '你未选择任何门店，请先选择门店',
          type: 'warning'
        })
        return
      }
      const params = {
        status: this.status,
        isAll: this.isAll,
        specIds: this.specData,
        storeIds: data,
        userName: this.$store.getters.name
      }
      this.subLoading = true
      setBatchUpdown(params).then(res => {
        this.subLoading = false
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$emit('complete')
      }).catch(() => {
        this.subLoading = false
      })
    },
    handleSelectionChangeStore(val) { // 门店列表选中事件 表格全选事件
      val.map(v => {
        const index = this.multipleSelection.findIndex(item => {
          return item.id === v.id
        })
        if (index === -1) {
          this.multipleSelection.push(v)
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
      this.$refs.multipleTable.toggleRowSelection(row)
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
