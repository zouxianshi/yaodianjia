<template>
  <!-- 我是活动选择门店公用组件 -->
  <el-dialog
    title="选择门店"
    :visible.sync="isShow"
    append-to-body
    width="800px"
    :close-on-press-escape="false"
    :close-on-click-modal="false"
  >
    <div class="stores-modal-body">
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
            v-loading="typeTreeLoading"
            :props="merchantOption"
            :options="options"
            clearable
            @change="onTypeChange"
          />
        </el-form-item>
        <el-form-item label="门店信息">
          <el-input v-model="formInline.storeProperty" clearable placeholder="门店编码/门店名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_loadStoreData">查询</el-button>
        </el-form-item>
      </el-form>
      <el-table
        size="small"
        ref="multipleTable"
        :data="tableData"
        stripe
        style="width: 100%"
        max-height="300"
        @select-all="handleSelectionChangeStore"
        @select="handleSelect"
      >
        <el-table-column type="selection" :selectable="checkSelectable" width="55" />
        <!--     :filters="[{text: '本页全选', value: '本页全选'},{text: '反选当页', value: '反选当页'}]"
        :filter-method="filterHandler"-->
        <el-table-column label="门店编号" prop="stCode" width="100" />
        <el-table-column label="门店名称" prop="stName" show-overflow-tooltip>
          <template slot-scope="scope">
            <span>{{ scope.row.stName }}</span>
            <span v-if="scope.row.centerStore" class="qijian-badge">旗舰店</span>
          </template>
        </el-table-column>
        <el-table-column label="门店地址" show-overflow-tooltip>
          <template
            slot-scope="scope"
          >{{ scope.row.province }}{{ scope.row.city }}{{ scope.row.area }}{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column label="门店电话" prop="mobile" />
        <el-table-column label="配送方式" width="260">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.isdelivery">普通快递</el-tag>
            <el-tag v-if="scope.row.isdistribution">配送上门</el-tag>
            <el-tag v-if="scope.row.isself">门店自提</el-tag>
          </template>
        </el-table-column>
      </el-table>
      <div class="text-right pagination">
        <el-pagination
          :current-page="pageInfo.currentPage"
          background
          :page-sizes="[10,20,50,100]"
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
</template>
<script>
// import { getStoreList } from '@/api/depot'
import { queryOrgMerchant, queryStoreByOrg } from '@/api/activity'
import { mapGetters } from 'vuex'
export default {
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      }
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
      typeTreeLoading: false,
      formInline: {
        storeProperty: '',
        merchant: []
      },
      isShow: false,
      options: [],
      merchantOption: {
        label: 'orName',
        value: 'id',
        checkStrictly: true // 是否可以选择任一级
      }
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  methods: {
    open() {
      this.isShow = true
      console.log('this.list-----', this.list)
      if (Array.isArray(this.list) && this.list.length > 0) {
        this.multipleSelection = this.list.slice()
      } else {
        this.multipleSelection = []
      }
      this._loadStoreData()
      this.getOrgMerchant()
    },
    getOrgMerchant() {
      this.typeTreeLoading = true
      queryOrgMerchant(this.merCode)
        .then(res => {
          this.typeTreeLoading = false
          if (res.code === '10000' && res.data) {
            this.options = res.data
          } else {
            this.options = []
          }
        })
        .catch(res => {
          this.typeTreeLoading = false
        })
    },
    onTypeChange(typeid) {
      // 分类切换
      console.log('searchForm------', typeid)
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
      const query = {
        orgId:
          this.formInline && Array.isArray(this.formInline.merchant)
            ? this.formInline.merchant[this.formInline.merchant.length - 1]
            : '',
        storeProperty: this.formInline.storeProperty,
        merCode: this.merCode,
        ...this.pageInfo
      }
      queryStoreByOrg(query).then(res => {
        const { data, totalCount } = res.data
        this.tableData = Array.isArray(data) ? data : []
        this.pageInfo.total = totalCount
        this.$nextTick(() => {
          this.updateChecked()
        })
      })
    },
    updateChecked() {
      console.log(
        '我准备回显数据------multipleSelection',
        this.multipleSelection
      )
      console.log('我准备回显数据------tableData', this.tableData)
      const currentCheckedList = []
      this.tableData.forEach(item => {
        const index = this.multipleSelection.findIndex(mItem => {
          return mItem.id === item.id
        })
        if (index > -1) {
          currentCheckedList.push(item)
        }
      })
      this.toggleSelection(currentCheckedList)
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
    // 勾选界面
    // filterHandler(value, row, column) {
    //   console.log('filterHandler----', value, row, column)
    //   // const property = column['property']
    //   // return row[property] === value
    // }
  }
}
</script>
<style lang="scss">
.stores-modal-body {
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
  .qijian-badge {
    position: absolute;
    left: 50px;
    top: 4px;
    background: rgba(237, 20, 61, 0.7);
    border: 1px solid #f78096;
    border-radius: 10px;
    height: 16px;
    line-height: 16px;
    color: #fff;
    font-size: 10px;
    padding: 0 10px;
  }
}
</style>
