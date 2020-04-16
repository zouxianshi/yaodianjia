<template>
  <span>
    <el-dialog
      title="选择门店"
      :visible.sync="isShow"
      append-to-body
      width="800px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="modal-body">
        <el-form
          :inline="true"
          :model="formInline"
          size="small"
          class="demo-form-inline"
          @keydown.enter="_loadStoreData"
        >
          <el-form-item label="所属企业">
            <el-cascader
              v-model="formInline.merchant"
              :props="merchantOption"
              :options="options"
              clearable
            />
          </el-form-item>
          <el-form-item label="门店信息">
            <el-input v-model="formInline.storeCode" clearable placeholder="门店编码/门店名称" />
          </el-form-item>
          <el-form-item v-show="false" label="活动开始时间">
            <el-input v-model="formInline.startTime" clearable placeholder="门店编码/门店名称" />
          </el-form-item>
          <el-form-item v-show="false" label="活动结束时间">
            <el-input v-model="formInline.endTime" clearable placeholder="门店编码/门店名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="_loadStoreData">查询</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          :data="tableData"
          stripe
          style="width: 100%"
          max-height="300"
          @select-all="handleSelectionChangeStore"
          @select="handleSelect"
        >
          <el-table-column type="selection" :selectable="checkSelectable" width="55" />
          <el-table-column label="门店编号" prop="stCode" width="100" />
          <el-table-column label="门店名称" prop="stName" show-overflow-tooltip />
          <el-table-column label="门店地址" show-overflow-tooltip>
            <template
              slot-scope="scope"
            >{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}{{ scope.row.address }}</template>
          </el-table-column>
          <el-table-column label="门店电话" prop="mobile" />
        </el-table>
        <div class="text-right pagination">
          <el-pagination
            :current-page="pageInfo.currentPage"
            background
            :page-sizes="[10,20,50]"
            :page-size="pageInfo.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageInfo.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
        <el-divider content-position="left">
          选择的门店（当前
          <span style="color: #409eff;padding: 0 4px">{{ multipleSelection.length }}</span>家店）
        </el-divider>
        <ul class="choose-box">
          <template v-if="multipleSelection.length!==0">
            <li v-for="(item,index) in multipleSelection" :key="index">
              <el-tag type="success" size="small" closable @close="handleTagClose(item)">
                <span :title="item.stName">{{ item.stName }}</span>
              </el-tag>
            </li>
          </template>
          <!-- <template v-else>
            <p class="text-center">请选择门店</p>
          </template>-->
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type size="small" @click="isShow = false">取消</el-button>
        <el-button type="primary" size="small" :loading="subLoading" @click="handleSubmit">确定</el-button>
      </span>
    </el-dialog>
  </span>
</template>
<script>
import { getStoreList } from '@/api/depot'
let id = 0
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 查询门店是否限制时间
    activityStartTime: {
      type: String
    },
    activityEndTime: {
      type: String
    }
  },
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      },
      chooseStore: [], // 选择的门店数据
      tableData: [],
      multipleSelection: [],
      isAll: false,
      subLoading: false,
      formInline: {
        storeCode: '',
        merchant: '',
        startTime: this.activityStartTime || '',
        endTime: this.activityEndTime || ''
      },
      isShow: false,
      options: [
        {
          orName: '111111',
          id: 'a1282d9ef71c11e9955d000c29d52f39'
        },
        {
          orName: '海典大药房',
          id: 'a1282d9ef71c11e9955d2220c29d52f39'
        }
      ],
      merchantOption: {
        label: 'orName',
        value: 'id',
        lazy: true,
        checkStrictly: true, // 是否可以选择任一级
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(() => {
            const nodes = Array.from({ length: level + 1 }).map(item => ({
              id: ++id,
              orName: `选项${id}`,
              leaf: level >= 2
            }))
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes)
          }, 1000)
        }
      }
    }
  },
  created() {},
  methods: {
    open() {
      this.isShow = true
      console.log('this.list-----', this.list)
      if (this.list && this.list.length > 0) {
        this.multipleSelection = this.list.slice()
      } else {
        this.multipleSelection = []
      }
      this._loadStoreData()
    },
    checkSelectable() {
      return !this.isAll
    },
    handleChooseStore() {
      // 选择全部
      this.$refs.multipleTable.clearSelection()
      this.multipleSelection = []
      this.tableData.map(v => {
        this.$refs.multipleTable.toggleRowSelection(v)
      })
    },
    _loadStoreData() {
      console.log('formInline-------------', this.formInline)
      const query = {
        ...this.formInline,
        onlineStatus: 1,
        status: 1,
        ...this.pageInfo
      }
      getStoreList(query).then(res => {
        const { data, totalCount } = res.data
        this.tableData = data
        this.pageInfo.total = totalCount
        if (this.isAll) {
          // 选择全部  选中门店
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
      this.isShow = false
      this.$emit('complete', this.multipleSelection)
    },
    handleSelectionChangeStore(allList) {
      // 门店列表选中事件 表格全选事件
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
    handleSelect(selection, row) {
      // 单个选择
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
      this.pageInfo.pageSize = val
      this.pageInfo.currentPage = 1
      this._loadStoreData()
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this._loadStoreData()
    }
  }
}
</script>
<style lang="scss" scoped>
.modal-body {
  .search-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .search-query {
      display: flex;
      .el-input {
        margin-right: 10px;
      }
    }
  }
  .pagination {
    margin: 10px 0;
  }
  .choose-box {
    li {
      display: inline-block;
      margin-right: 10px;
      margin-bottom: 10px;
      .el-tag {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          overflow: hidden;
          max-width: 200px;
          text-overflow: ellipsis;
        }
      }
      .el-tag__close {
        display: inline-block;
        margin-top: 5px;
      }
    }
  }
}
</style>
