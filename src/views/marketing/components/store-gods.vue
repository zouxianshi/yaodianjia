<template>
  <span>
    <el-dialog
      title="选取商品"
      append-to-body
      class="m-dialog m-dialog-goods"
      :visible.sync="dialog.visible"
      :close-on-click-modal="false"
      width="1100px"
      @close="handlerClose"
    >
      <div class="modal-body">
        <el-form
          :inline="true"
          :model="searchForm"
          size="small"
          class="demo-form-inline"
          @keydown.enter="_loadStoreData"
        >
          <el-form-item label="商品分组">
            <el-cascader
              v-model="searchForm.typeid"
              v-loading="typeTreeLoading"
              :options="typeTree"
              :props="merchantOption"
              clearable
              @change="onTypeChange"
            />
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-input v-model.trim="searchForm.brandName" clearable placeholder="请输入商品品牌" />
          </el-form-item>
          <el-form-item label="商品信息">
            <el-input v-model.trim="searchForm.searchKeyWord" clearable placeholder="商品编码/商品名称" />
          </el-form-item>
          <el-form-item v-show="false" label="活动开始时间">
            <el-input v-model="searchForm.startTime" clearable />
          </el-form-item>
          <el-form-item v-show="false" label="活动结束时间">
            <el-input v-model="searchForm.endTime" clearable />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="forSearch">查询</el-button>
            <el-button size="small" @click.stop="forReset()">重 置</el-button>
          </el-form-item>
        </el-form>
        <el-table
          ref="multipleTable"
          v-loading="loading"
          element-loading-text="加载中"
          border
          size="small"
          :data="tableData"
          style="width: 100%;margin-top: 20px"
          max-height="256"
          @select-all="handleSelectAllChange"
          @select="handleSelect"
        >
          <el-table-column type="selection" align="center" width="50" />
          <el-table-column align="center" label="商品图片" min-width="60">
            <template slot-scope="scope">
              <div
                v-if="scope.row.picUrl && scope.row.picUrl!==''"
                class="x-img-mini"
                style="width: 60px; height: 60px"
              >
                <div class="x-image__preview">
                  <el-image
                    style="width: 60px; height: 60px"
                    fit="contain"
                    :src="showImg(scope.row.picUrl)"
                    :preview-src-list="[showImg(scope.row.picUrl)]"
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
          <el-table-column prop="name" label="商品名称" :show-overflow-tooltip="true" />
          <el-table-column prop="erpCode" label="商品编码" :show-overflow-tooltip="true" />
          <el-table-column
            prop="brandName"
            label="品牌"
            min-width="80"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="规格信息" min-width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope" :show-overflow-tooltip="true">
              <div v-html="formatSkuInfo(scope.row.specSkus)" />
            </template>
          </el-table-column>
          <el-table-column
            prop="mprice"
            label="参考价格(元)"
            min-width="60"
            align="center"
            :show-overflow-tooltip="true"
          />
          <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="small" @click.stop="handleSelect(scope.row)">选取</el-button>
          </template>
          </el-table-column>-->
        </el-table>
        <div class="table-footer">
          <el-pagination
            background
            style="text-align: right;margin-top: 20px"
            :current-page="pager.current"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pager.size"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pager.total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>

        <div class="result-section">
          <!-- <div class="blank-line" /> -->
          <el-divider content-position="left">
            已选商品（去重后当前
            <span style="color: #409eff;padding: 0 4px">{{ mySelectList.length }}</span>个商品）
          </el-divider>
          <div class="label-line">
            <div v-for="(mItem, index2) in mySelectList" :key="index2" class="label">
              <el-tag
                type="success"
                size="small"
                closable
                @close="removeMyselectItem(mItem, index2)"
              >
                <!-- commodityName是为了兼容组合商品返回的数据没有name -->
                <span :title="mItem.name">{{ mItem.name || mItem.commodityName }}</span>
              </el-tag>
            </div>
          </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <template v-if="editable">
          <el-button size="small" @click="dialog.visible = false">取 消</el-button>
          <el-button type="primary" size="small" @click="confirm()">确 定</el-button>
        </template>
        <el-button v-else @click="dialog.visible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </span>
</template>

<script>
import { getTypeTree } from '@/api/common'
import { queryActivityCommGoods } from '@/api/activity'
export default {
  name: 'DialogGoods',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    limitMin: {
      // 选取数量最低限制个数
      type: Number,
      default: 1
    },
    limitMax: {
      // 选取数量限制个数 0表示不限制
      type: Number,
      default: 0
    },
    editable: {
      // 是否可编辑
      type: Boolean,
      default: true
    },
    type: {
      type: String,
      default: 'primary'
    },
    // 是否根据门店筛选
    storeIds: {
      type: Array,
      default: () => []
    },
    groupType: {
      // 是否排除组合商品，true排除
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
        size: 20,
        total: 0
      },
      searchForm: {
        typeid: [],
        brandName: '',
        searchKeyWord: ''
      },
      tableData: [], // table数据
      // multipleSelection: [], //
      mySelectList: [],
      checkAll: false,
      typeTree: [], // 分组数据
      // 商品分组设置
      merchantOption: {
        label: 'name',
        value: 'id',
        checkStrictly: true // 是否可以选择任一级
      },
      typeTreeLoading: false
    }
  },
  computed: {
    merCode() {
      return this.$store.state.user.merCode || ''
    }
  },
  methods: {
    // 获取数据
    fetchData() {
      this._getTableData() // 统计列表
      this._getTypeTree() // 分类类表
    },
    onTypeChange(typeid) {
      // 分类切换
      this.forSearch()
    },
    // 调用打开方法；
    open() {
      this.dialog.visible = true
      if (Array.isArray(this.list) && this.list.length > 0) {
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
      this.searchForm = {
        typeid: [],
        brandName: '',
        searchKeyWord: ''
      }
    },
    confirm() {
      if (this.mySelectList && this.mySelectList.length === 0) {
        this.$message({ type: 'warning', message: '请选取商品' })
        return false
      }
      if (this.limitMin !== 0 && this.mySelectList.length < this.limitMin) {
        this.$message({
          type: 'warning',
          message: '最少要选取' + this.limitMin + '个商品'
        })
        return false
      }
      if (this.limitMax !== 0 && this.mySelectList.length > this.limitMax) {
        this.$message({
          type: 'warning',
          message: '最多只能选取' + this.limitMax + '个商品'
        })
        return false
      }
      console.log('confirm', this.mySelectList)
      this.$emit('on-change', this.mySelectList)
      this.close()
    },
    // 格式化规格信息
    formatSkuInfo(skuList) {
      let skuStr = ''
      if (skuList && skuList.length > 0) {
        skuList.forEach(v => {
          skuStr += `<div>${v.skuKeyName}: ${v.skuValue}</div>`
        })
      }
      return skuStr
    },
    handlerClose() {
      this.reset()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.pager.size = val
      this._getTableData()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this._getTableData()
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
      // console.log('勾选列表------', allList, this.mySelectList)
      this.tableData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.specId === item.specId
        })
        if (index > -1) {
          if (allList.length > 0) {
            console.log('已存在' + item.specId + ':' + item.name)
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
      // console.log('单独勾选了------', val, row)
      // console.log('单独勾选了------this.mySelectList', this.mySelectList)
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
      console.log('我准备回显数据------')
      const currentCheckedList = []
      this.tableData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.specId === item.specId
        })
        if (index > -1) {
          currentCheckedList.push(item)
        }
      })
      console.log('我准备回显数据------++++++++', currentCheckedList)
      this.toggleSelection(currentCheckedList)
    },
    forSearch() {
      this.pager.current = 1
      this.pager.total = 0
      this._getTableData()
    },
    forReset() {
      this.reset()
      this.forSearch()
    },
    _getTableData() {
      this.loading = true
      const [firstTypeId, secondTypeId, threeTypeId] = this.searchForm.typeid
      const params = {
        brandName: this.searchForm.brandName,
        searchKeyWord: this.searchForm.searchKeyWord,
        currentPage: this.pager.current,
        groupType: this.groupType,
        pageSize: this.pager.size,
        firstTypeId,
        secondTypeId,
        threeTypeId,
        merCode: this.merCode,
        distinct: true,
        storeIds: this.storeIds
      }

      queryActivityCommGoods(params)
        .then(res => {
          if (res.code === '10000' && res.data) {
            _.map(res.data.data, goodsItems => {
              goodsItems.source = 1
            })
            this.tableData = res.data.data || []
            this.pager.total = res.data.totalCount
            this.$nextTick(() => {
              this.updateChecked()
            })
          } else {
            this.tableData = []
          }
          this.loading = false
        })
        .catch(e => {
          this.loading = false
        })
    },
    _getTypeTree() {
      const params = {
        // dimensionId: '',
        merCode: this.merCode,
        type: 2, //	integer($int32)类型，1-分类，2-分组
        use: true
      }
      this.typeTreeLoading = true
      getTypeTree(params)
        .then(res => {
          if (res.code === '10000' && res.data) {
            this.typeTree = res.data
          } else {
            this.typeTree = []
          }
          this.typeTreeLoading = false
        })
        .catch(res => {
          this.typeTreeLoading = false
        })
    },
    handleOpenStore() {}
  }
}
</script>

<style lang="scss" scoped>
.m-dialog-goods {
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
  .note-text {
    margin-top: 24px;
    color: #888888;
  }
  .table-footer {
    justify-content: flex-end;
  }
}
</style>
