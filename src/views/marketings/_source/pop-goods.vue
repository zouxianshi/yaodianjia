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
      <el-radio-group
        v-model="goodsType"
        v-loading="loading"
        size="mini"
        style="margin: 0 0 20px 0"
        @change="changegoodsType"
      >
        <el-radio-button :label="1">线上商品</el-radio-button>
        <el-radio-button :label="2">线下商品</el-radio-button>
      </el-radio-group>
      <div class="modal-body">
        <el-form
          v-if="goodsType === 1"
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
        <span v-show="goodsType === 2" class="set-goods-title">批量设置指定商品</span>
        <el-button v-if="goodsType === 2" size="mini" type="primary" style="vertical-align: top;">
          <a :href="downUrl">下载模板</a>
        </el-button>
        <el-upload
          v-show="goodsType === 2"
          style="display: inline-block;vertical-align: top;"
          class="upload"
          action
          :multiple="false"
          :show-file-list="false"
          accept="csv, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          :http-request="httpRequest"
        >
          <el-button size="mini" type="primary" :disabled="exportLoading" :loading="exportLoading">批量导入</el-button>
        </el-upload>
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
          <el-table-column type="selection" align="left" width="50" />
          <el-table-column prop="erpCode" label="商品编码" :show-overflow-tooltip="true" />
          <el-table-column prop="name" label="商品名称" :show-overflow-tooltip="true" />
        </el-table>
        <div class="table-footer">
          <el-pagination
            v-if="goodsType === 1"
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
import XLSX from 'xlsx'
import { getTypeTree } from '@/api/common'
import { queryActivityCommGoods } from '@/api/activity'
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
  created() {
    if (process.env.NODE_ENV === 'production') {
      this.downUrl = 'https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/template/%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
    } else {
      this.downUrl = 'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/template/%E5%95%86%E5%93%81%E5%AF%BC%E5%85%A5%E6%A8%A1%E6%9D%BF.xlsx'
    }
  },
  data() {
    return {
      downUrl: '',
      goodsType: 1, // 商品类型
      loading: false,
      exportLoading: false,
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
    httpRequest(e) {
      this.exportLoading = true
      const file = e.file // 文件信息
      if (!file) {
        return false
      } else if (!/\.(xls|xlsx)$/.test(file.name.toLowerCase())) {
        this.$message.error('上传格式不正确，请上传xls或者xlsx格式')
        return false
      }
      const fileReader = new FileReader()
      fileReader.onload = ev => {
        try {
          const data = ev.target.result
          const workbook = XLSX.read(data, {
            type: 'binary' // 以字符编码的方式解析
          })
          const exlname = workbook.SheetNames[0] // 取第一张表
          const exl = XLSX.utils.sheet_to_json(workbook.Sheets[exlname]) // 生成json表格内容
          console.log(exl)
          if (exl.length === 0) {
            this.$message.error('导入商品不能为空，请重新导入！')
            this.exportLoading = false
            return
          }
          if (!exl[0].erpCode || !exl[0].name || exl[0].length > 2) {
            this.$message.error('导入模板格式错误，请查看导入模板！')
            this.exportLoading = false
            return
          }
          if (exl.length > 500) {
            this.$message.error('导入商品数据不能超过500条，当前导入数量' + exl.length + '条')
            this.exportLoading = false
            return
          }
          let isPass = true // 检测每一项不为空数据
          const erpCodeArr = []
          _.map(exl, item => {
            if (!item.erpCode || !item.name) {
              this.$message.error('导入商品有空数据，请检查导入文件！')
              this.exportLoading = false
              isPass = false
              return
            }
            erpCodeArr.push(item.erpCode)
          })
          const lengths = erpCodeArr.length - Array.from(new Set(erpCodeArr)).length
          if (lengths > 0) {
            this.$message.error('导入商品erpCode不能重复，当前有' + lengths + '条重复数据')
            this.exportLoading = false
            return
          }
          if (!isPass) {
            return false
          }
          this.tableData = exl
          this.exportLoading = false
          this.$nextTick(() => {
            this.updateChecked()
          })
          // document.getElementsByName('file')[0].value = '' // 根据自己需求，可重置上传value为空，允许重复上传同一文件
        } catch (e) {
          this.$message.error('导入失败，请检查导入文件！')
          this.exportLoading = false
          return false
        }
      }
      fileReader.readAsBinaryString(file)
    },
    // 改变线上线下
    changegoodsType(e) {
      if (e === 2) {
        this.tableData = []
      } else {
        this.tableData = []
        this.fetchData()
      }
    },
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
      this.goodsType = 1
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
      if (this.limitMax !== 0 && this.mySelectList.length > this.limitMax) {
        this.$message({
          type: 'warning',
          message: '最多只能选取' + this.limitMax + '个商品'
        })
        return false
      }
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
          return mItem.erpCode === item.erpCode
        })
        if (index > -1) {
          if (allList.length > 0) {
            console.log('已存在' + item.erpCode + ':' + item.name)
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
        return mItem.erpCode === row.erpCode
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
        return item.erpCode === myItem.erpCode
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
          return mItem.erpCode === item.erpCode
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
            this.tableData = res.data.data || []
            this.pager.total = res.data.totalCount
            console.log('我获取玩列表了--------')
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
  .set-goods-title{
    font-size: 18px;
    margin-right: 150px;
    height: 29px;
    line-height: 29px;
    font-weight: 600;
    display: inline-block;
  }
}
</style>
