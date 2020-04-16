<template>
  <span>
    <!-- <el-button :type="type" size="mini" @click="dialog.visible = true">选择商品</el-button> -->
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
              v-model="searchForm.merchant"
              :loading="typeTreeLoading"
              :options="typeTree"
              :props="merchantOption"
              clearable
              @change="onTypeChange"
            />
          </el-form-item>
          <el-form-item label="商品品牌">
            <el-input v-model="searchForm.brand" clearable placeholder="请输入商品品牌" />
          </el-form-item>
          <el-form-item label="商品信息">
            <el-input v-model="searchForm.storeCode" clearable placeholder="商品编码/商品名称" />
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
                v-if="scope.row.mainPic && scope.row.mainPic!==''"
                class="x-img-mini"
                style="width: 60px; height: 60px"
              >
                <div class="x-image__preview">
                  <el-image
                    style="width: 60px; height: 60px"
                    fit="contain"
                    :src="showImg(scope.row.mainPic)"
                    :preview-src-list="[showImg(scope.row.mainPic)]"
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
          <el-table-column prop="name" label="商品名称" min-width="120" :show-overflow-tooltip="true" />
          <el-table-column
            prop="brandName"
            label="品牌"
            min-width="80"
            :show-overflow-tooltip="true"
          />
          <el-table-column label="规格信息" min-width="100" :show-overflow-tooltip="true">
            <template slot-scope="scope" :show-overflow-tooltip="true">
              <div v-html="formatSkuInfo(scope.row.specSkuList)" />
            </template>
          </el-table-column>
          <el-table-column
            prop="mprice"
            label="参考价格"
            min-width="60"
            align="center"
            :show-overflow-tooltip="true"
          />
          <el-table-column
            prop="manufacture"
            label="生产厂家"
            min-width="120"
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
            :page-sizes="[10, 15, 20, 50]"
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
            已选商品（当前
            <span style="color: #409eff;padding: 0 4px">{{ mySelectList.length }}</span>商品）
          </el-divider>
          <div class="label-line">
            <div v-for="(mItem, index2) in mySelectList" :key="index2" class="label">
              <el-tag type="success" size="small" closable @close="removeMyselectItem(mItem, index2)">
                <span :title="mItem.name">{{ mItem.name }}</span>
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
import { queryGoods, getTypeTree } from '@/api/common'
export default {
  name: 'DialogGoods',
  props: {
    list: {
      type: Array,
      default: () => []
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
        keyWord: '',
        typeid: '',
        typeLevel: ''
      },
      type1: '',
      type2: '',
      type3: '',
      typeOption1: [],
      typeOption2: [],
      typeOption3: [],
      tableData: [],
      multipleSelection: [],
      mySelectList: [],
      typeList: [],
      checkAll: false,
      typeTree: [],
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
  created() {
    this.fetchData()
  },
  methods: {
    // 获取数据
    fetchData() {
      this._getTableData() // 统计列表
      this._getTypeTree() // 分类类表
    },
    onTypeChange(typeid) {
      // 分类切换
      console.log('searchForm------', Array)
      this.searchForm.typeid =
        Array.isArray(typeid) && typeid.length ? typeid[typeid.length - 1] : ''
      this.searchForm.typeLevel =
        Array.isArray(typeid) && typeid.length ? typeid.length : ''
      this.forSearch()
    },
    open() {
      this.dialog.visible = true
      console.log('this.list-----', this.list)
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
      this.typeid = ''
      this.pager = {
        current: 1,
        size: 20,
        total: 0
      }
      this.searchForm = {
        keyWord: '',
        typeid: '',
        typeLevel: ''
      }
    },
    confirm() {
      if (this.mySelectList && this.mySelectList.length === 0) {
        this.$message({ type: 'warning', message: '请选取商品' })
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
    handleCheckAllChange(val) {
      this.$refs.multipleTable.toggleAllSelection()
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
          console.log(mItem)
          console.log(item)
          return mItem.specId === item.specId
        })
        if (index > -1) {
          currentCheckedList.push(item)
        }
      })
      this.toggleSelection(currentCheckedList)
    },
    initClass() {
      this.typeOption1 = this.typeTree.map(v => {
        return {
          id: v.id,
          name: v.name,
          children: v.children
        }
      })
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
      const params = {
        commodityType: 1, // 商品类型（1：普通商品， 2：组合商品）
        level: this.searchForm.typeLevel,
        typeId: this.searchForm.typeid,
        hasSpec: true, // 是否包含SPEC键值，true-包含，false-不包含
        infoFlag: true, // 消息完善标志,true-已完善商品，false-未完善商品，不传未所有商品
        auditStatus: 1, // 审核状态，0-审核不通过，1-审核通过，2-待审,3-未提交审核
        name: this.searchForm.keyWord.trim(),
        currentPage: this.pager.current,
        pageSize: this.pager.size
      }

      queryGoods(params)
        .then(res => {
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
        })
        .catch(e => {
          this.loading = false
        })
    },
    _getTypeTree() {
      const params = {
        dimensionId: '',
        merCode: 'hydee',
        type: 1, //	integer($int32)类型，1-分类，2-分组
        use: false
      }
      this.typeTreeLoading = true
      getTypeTree(params)
        .then(res => {
          if (res.code === '10000' && res.data) {
            this.typeTree = res.data
            this.initClass()
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
