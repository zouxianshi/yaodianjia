<template>
  <el-dialog title="选取商品" append-to-body class="m-dialog m-dialog-goods" :visible.sync="dialog.visible" :close-on-click-modal="false" width="920px" @close="handlerClose">
    <div class="modal-body">
      <div class="md-search">
        <div class="search-item" @keyup.enter="forSearch()">
          <span class="label">选择分类：</span>
          <el-select
            v-model="type1"
            size="small"
            placeholder="请选择"
            @change="onTypeChange($event, 1)"
          >
            <el-option v-for="item1 in typeOption1" :key="item1.id" :label="item1.name" :value="item1.id" />
          </el-select>
          <el-select
            v-model="type2"
            size="small"
            placeholder="请选择"
            @change="onTypeChange($event, 2)"
          >
            <el-option v-for="item2 in typeOption2" :key="item2.id" :label="item2.name" :value="item2.id" />
          </el-select>
          <el-select
            v-model="type3"
            size="small"
            placeholder="请选择"
            @change="onTypeChange($event, 3)"
          >
            <el-option v-for="item3 in typeOption3" :key="item3.id" :label="item3.name" :value="item3.id" />
          </el-select>
        </div>
        <div class="search-btns">
          <el-button type="primary" size="small" @click.stop="forSearch()">查 询</el-button>
        </div>
      </div>
      <p class="note-text">当前类目下<span v-if="pager.total>0">包括101个商品</span>
        <span v-else>暂无商品</span>
      </p>
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
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column align="center" label="商品图片" min-width="60">
          <template slot-scope="scope">
            <div v-if="scope.row.mainPic && scope.row.mainPic!==''" class="x-img-mini" style="width: 60px; height: 60px">
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
          </template> -->
        </el-table-column>
        <el-table-column prop="name" label="商品名称" align="center" min-width="120" />
        <el-table-column prop="brandName" label="品牌" align="center" min-width="100" />
        <el-table-column label="规格信息" align="center" min-width="100">
          <template slot-scope="scope">
            <span v-text="formatSkuInfo(scope.row.specSkuList)" />
          </template>
        </el-table-column>
        <el-table-column prop="manufacture" label="生产厂家" align="center" min-width="120" />
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
          <span v-if="mySelectList && mySelectList.length>0">已选商品：</span>
          <span v-else>请选取商品</span>
        </div>
        <div class="label-line">
          <div v-for="(mItem, index2) in mySelectList" :key="index2" class="label">
            <span v-text="mItem.name" />
            <i
              v-if="editable && !mItem.checked"
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
import { queryGoods, getTypeTree } from '@/api/common'
export default {
  name: 'DialogGoods',
  props: {
    list: {
      type: Array,
      default: () => []
    },
    limitMax: { // 选取数量限制个数 0表示不限制
      type: Number,
      default: 0
    },
    editable: {
      // 是否可编辑
      type: Boolean,
      default: true
    }
    // typeList: {
    //   type: Array,
    //   default: _ => {
    //     return []
    //   }
    // }
  },
  data() {
    return {
      dialog: {
        visible: true
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
      typeList: []
    }
  },
  created() {
    this.fetchData()
  },
  mounted() {},
  methods: {
    // 获取数据
    fetchData() {
      this._getTableData() // 统计列表
      this._getTypeTree() // 分类类表
    },
    onTypeChange(typeid, level) { // 分类切换
      this.searchForm.typeid = typeid
      this.searchForm.typeLevel = level
      if (level === 1) {
        this.type2 = ''
        this.type3 = ''
        const index1 = this.typeOption1.findIndex(v => {
          return v.id === typeid
        })
        this.typeOption2 = index1 > -1 ? this.typeOption1[index1].children || '' : []
      } else if (level === 2) {
        this.type3 = ''
        const index2 = this.typeOption2.findIndex(v => {
          return v.id === typeid
        })
        this.typeOption3 = index2 > -1 ? this.typeOption2[index2].children : []
      }
      console.log('searchForm', this.searchForm)
      this.forSearch()
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
      this.searchForm = {
        keyWord: ''
      }
    },
    confirm() {
      if (this.mySelectList && this.mySelectList.length === 0) {
        this.$message({ type: 'warning', message: '请选取商品' })
        return false
      }
      if (this.limitMax !== 0 && this.mySelectList.length > this.limitMax) {
        this.$message({ type: 'warning', message: '最多只能选取' + this.limitMax + '个商品' })
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
          skuStr += `${v.skuKeyName}:${v.skuValue}，`
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
      if (myItem.checked) {
        console.log('外层已选取得数据只能在外层删掉')
        return false
      }
      const index = this.tableData.findIndex(item => {
        console.log('222item', item)
        console.log('myItem', myItem)
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
      const params = {
        level: this.searchForm.typeLevel,
        typeId: this.searchForm.typeid,
        hasSpec: true, // 是否包含SPEC键值，true-包含，false-不包含
        infoFlag: true, // 消息完善标志,true-已完善商品，false-未完善商品，不传未所有商品
        auditStatus: 1, // 审核状态，0-审核不通过，1-审核通过，2-待审,3-未提交审核
        name: this.searchForm.keyWord.trim(),
        currentPage: this.pager.current,
        pageSize: this.pager.size
      }

      queryGoods(params).then(res => {
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
    _getTypeTree() {
      // this.tableData = []
      /* setTimeout(() => {
          this.tableData = this.tableArr.slice()
          this.$nextTick(() => {
            this.updateChecked()
          })
        }, 1000)
        return false*/
      const params = {
        typeId: '',
        hasSpec: true, // 是否包含SPEC键值，true-包含，false-不包含
        infoFlag: true, // 消息完善标志,true-已完善商品，false-未完善商品，不传未所有商品
        auditStatus: 1, // 审核状态，0-审核不通过，1-审核通过，2-待审,3-未提交审核
        name: this.searchForm.keyWord.trim(),
        currentPage: this.pager.current,
        pageSize: this.pager.size
      }
      getTypeTree(params).then(res => {
        if (res.code === '10000' && res.data) {
          this.typeTree = res.data
          this.typeOption1 = this.typeTree.map(v => {
            return {
              id: v.id,
              name: v.name,
              children: v.children
            }
          })
        } else {
          this.typeTree = []
        }
      })
    }
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
  .note-text{
    margin-top: 24px;
    color: #888888;
  }
}
</style>
