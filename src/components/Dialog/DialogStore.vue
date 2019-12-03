<template>
  <el-dialog
    title="选取门店"
    append-to-body
    class="m-dialog m-dialog-store"
    :visible.sync="dialog.visible"
    :close-on-click-modal="false"
    width="900px"
    @close="handlerClose"
  >
    <div class="modal-body">
      <div class="md-search">
        <div class="search-item" @keyup.enter="forSearch()">
          <el-input v-model="searchParams.keyWord" style="width: 240px" placeholder="门店编码/门店名称" size="small" />
        </div>
        <div class="search-btns">
          <el-button type="primary" size="small" @click.stop="forSearch()">查 询</el-button>
        </div>
      </div>
      <el-table
        ref="multipleTable"
        border
        size="small"
        :data="tableData"
        style="width: 100%;margin-top: 20px"
        max-height="256"
        @select-all="handleSelectAllChange"
        @select="handleSelect"
      >
        <!-- <div v-if="searchParams.keyWord === ''" slot="empty">
          当前无上线门店，先去维护<el-button type="text" @click="toStoreSetting">上线门店</el-button>吧
        </div> -->
        <el-table-column v-if="editable" type="selection" align="center" width="50" />
        <el-table-column property="stCode" label="门店编码" width="150" show-overflow-tooltip />
        <el-table-column label="门店名称">
          <template slot-scope="scope">
            <el-badge v-if="scope.row.centerStore === 1" value="旗舰店" style="margin-top: 8px;margin-right:32px;">
              <span>{{ scope.row.stName }}</span>
              <!--              <span>说的是大三大萨达萨达撒打撒大撒的萨达萨达撒</span>-->
            </el-badge>
            <span v-else>{{ scope.row.stName }}</span>
          </template>
        </el-table-column>
        <el-table-column property="address" label="门店地址" show-overflow-tooltip>
          <template slot-scope="scope">
            <span v-text="`${_isProvince(scope.row.province)}${scope.row.city}${scope.row.area}${scope.row.address}`" />
          </template>
        </el-table-column>
        <el-table-column property="mobile" label="门店电话" show-overflow-tooltip>
          <template slot-scope="scope">
            <div style="line-height: 40px;">{{ scope.row.mobile }}</div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="text-align: right;margin-top: 20px"
        :current-page="pager.current"
        :page-sizes="[10, 15, 20, 50]"
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
          <span v-else-if="editable">请选取门店</span>
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
        <el-button type="primary" size="mini" @click="confirm()">确 定</el-button>
        <el-button size="mini" @click="dialog.visible = false">取 消</el-button>
      </template>
      <el-button v-else size="mini" @click="dialog.visible = false">关 闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { queryStores } from '@/api/common'
import { mapGetters } from 'vuex'
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
      dialog: {
        visible: false
      },
      pager: {
        current: 1,
        size: 20,
        total: 0
      },
      searchParams: {
        keyWord: ''
      },
      tableData: [],
      multipleSelection: [],
      mySelectList: [],
      TheCitys: ['北京', '天津', '上海', '重庆']
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {},
  mounted() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this._getTableData() // 统计列表
    },
    open() {
      this.dialog.visible = true
      if (this.list && this.list.length > 0) {
        this.mySelectList = this.list.slice()
      } else {
        this.mySelectList = []
      }
      this.fetchData()
    },
    close() {
      this.dialog.visible = false
    },
    reset() {
      this.pager = {
        current: 1,
        size: 20,
        total: 0
      }
      this.searchParams = {
        keyWord: ''
      }
    },
    confirm() {
      if (this.mySelectList && this.mySelectList.length === 0) {
        this.$message({ type: 'warning', message: '请选取门店' })
        return false
      }
      console.log('on-change', this.mySelectList)
      this.$emit('on-change', this.mySelectList)
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
            console.log('已存在' + item.id + ':' + item.stName)
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
        return mItem.id === row.id
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
        return item.id === myItem.id
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
          return mItem.id === item.id
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
    toStoreSetting() {
      this.$router.push({ path: '/storeSetting/setting' })
    },
    _getTableData() {
      const params = {
        merCode: this.merCode,
        onlineStatus: 1, // integer($int32) 是否上线门店（0非上线门店，1上线门店）
        status: 1, // 状态（0停用，1启用）
        searchKey: this.searchParams.keyWord.trim(),
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        excelFlag: false
      }
      queryStores(params).then(res => {
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
    },
    _isProvince(val) {
      const index = this.TheCitys.findIndex(name => {
        return val === name
      })
      if (index > -1) {
        return ''
      }
      return val
    }
  }
}
</script>
<style lang="scss" scoped>
.m-dialog-store {
  .modal-body {
    box-sizing: border-box;
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
        font-size: 14px;
        line-height: 40px;
        color: #999;
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
  .note-text{
    margin-top: 24px;
    color: #888888;
  }
}
</style>
