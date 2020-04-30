<template>
  <div class="select-product-modal">
    <el-dialog :visible.sync="dialogTableVisible" :append-to-body="true">
      <span slot="title">选择商品</span>
      <div class="nav-bar">
        <el-form :inline="true" :model="searchParams" class="demo-form-inline">
          <el-form-item label="商品分组">
            <el-cascader
              ref="groupRef"
              v-model="searchParams.groupId"
              class="cascader"
              :props="defaultProps"
              :options="groupData"
              size="mini"
              @change="handleChangeGroup"
            />
          </el-form-item>
          <el-form-item label="商品品牌" style="margin-left:10px;">
            <el-input
              v-model="searchParams.brandName"
              placeholder="商品品牌名称"
              size="mini"
              style="width:120px"
            />
          </el-form-item>
          <el-form-item label="商品信息" style="margin-left:10px">
            <el-input
              v-model="searchParams.erpOrName"
              placeholder="商品编码/商品名称"
              size="mini"
              style="width:120px"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="searchData()">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="dataTable"
        :data="gridData"
        height="300px"
        @select="select"
        @select-all="selectAll"
        @selection-change="selectAuto"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="num" label="商品图片">
          <template slot-scope="scope">
            <el-image
              style="width: 70px; height: 70px"
              :src="showImg(scope.row.mainPic)+'?x-oss-process=style/w_80'"
              lazy
              fit="contain"
              :preview-src-list="[`${showImg(scope.row.mainPic)}?x-oss-process=style/w_800`]"
            />
          </template>
        </el-table-column>
        <el-table-column property="erpCode" label="商品编码" />
        <el-table-column property="name" label="商品名称" :show-overflow-tooltip="true" />
        <el-table-column property="brandName" label="品牌" />
        <el-table-column property="specSkuList" label="规格">
          <template
            slot-scope="scope"
          >{{ scope.row.specSkuList&&scope.row.specSkuList.length > 0 ? scope.row.specSkuList[0].skuValue : '' }}</template>
        </el-table-column>
        <el-table-column property="mprice" label="参考价" />
      </el-table>
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 50, 100, 500]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
      <div class="has-selected">
        已选商品：
        <span v-for="(item ,index) in selectedArr" :key="index">
          <el-tooltip placement="top">
            <div slot="content">
              {{ item.name }}
            </div>
            <el-tag style="margin-right:10px" type="success">{{ item.name.length>10?item.name.substring(0, 10)+'...':item.name }}</el-tag>
          </el-tooltip>
        </span>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="_submit">确定</el-button>
        <el-button size="mini" @click="dialogTableVisible=false">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { getStoreGoodsList } from '@/api/store-goods'
import { getTypeTree } from '@/api/group'
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      gridData: [],
      selectedArr: [], //  已选择商品所有信息
      hasSelectList: [], // 已选择商品id集合
      nowSelect: [],
      totalCount: 0,
      groupData: [],
      searchParams: {
        erpOrName: '',
        brandName: '',
        groupId: null
      },
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      dialogTableVisible: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    // 获取分组
    getTypeTree({ merCode: this.merCode, type: 2, use: true }).then(res => {
      this.groupData = res.data
      this.groupData.unshift({ name: '全部', id: '' })
    })
  },
  methods: {
    show(product) {
      this.selectedArr = [...product]
      this.hasSelectList = []
      product.forEach(item => {
        this.hasSelectList.push(item.erpCode)
      })
      this.queryGoodsData()
    },
    handleChangeGroup(val) {
      this.searchParams.groupId = val[val.length - 1]
    },
    // 查询商品
    queryGoodsData() {
      var params = Object.assign({}, this.pageInfo, this.searchParams)
      getStoreGoodsList(params).then(res => {
        console.log(res)
        this.dialogTableVisible = true
        if (res.data && res.data.data) {
          this.gridData = res.data.data
          this.totalCount = res.data.totalCount
          this.$nextTick(() => {
            this.$refs.dataTable.clearSelection()
            this.gridData.forEach(row => {
              if (this.hasSelectList.indexOf(row.erpCode) >= 0) {
                this.$refs.dataTable.toggleRowSelection(row, true)
              }
            })
          })
        }
      })
    },
    // 提交选中
    _submit() {
      this.dialogTableVisible = false
      this.pageInfo.currentPage = 1
      var selectedData = JSON.parse(JSON.stringify(this.selectedArr))
      this.$emit('onSelect', selectedData)
    },
    searchData() {
      this.queryGoodsData()
    },
    // 分页
    handleSizeChange(e) {
      this.pageInfo.pageSize = e
      this.queryGoodsData()
    },
    handleCurrentChange(e) {
      this.pageInfo.currentPage = e
      this.queryGoodsData()
    },
    // 单选
    select(e, rows) {
      this.checkSelect(e)
    },
    // 全选
    selectAll(e) {
      this.checkSelect(e)
    },
    // 改变选中状态时触发
    selectAuto(e) {},
    // 处理所有选中项
    checkSelect(e) {
      // 添加当前页选中项中未在所有已选择的数组中的item
      this.nowSelect = e
      var nowSelectCode = []
      e.forEach(item => {
        nowSelectCode.push(item.erpCode)
        if (this.hasSelectList.indexOf(item.erpCode) < 0) {
          this.selectedArr.push(item)
          this.hasSelectList.push(item.erpCode)
        }
      })
      // 得到当前页没有选中的id(当前页取消选择)
      var noSelectIds = []
      this.gridData.forEach(row => {
        if (nowSelectCode.indexOf(row.erpCode) < 0) {
          noSelectIds.push(row['erpCode'])
        }
      })
      noSelectIds.forEach(erpCode => {
        for (var i = 0; i < this.hasSelectList.length; i++) {
          if (this.hasSelectList[i] === erpCode) {
            // 如果总选择中有未被选中的，那么就删除这条
            this.hasSelectList.splice(i, 1)
            this.selectedArr.splice(i, 1)
            break
          }
        }
      })
    }
  }
}
</script>
<style lang="scss">
.el-dialog__body {
  .goods-logo {
    width: 55px;
    height: 55px;
  }
  padding-top: 10px;
  padding-bottom: 0;
  .el-pagination {
    text-align: right;
    margin-top: 15px;
  }
  .has-selected {
    margin-top: 10px;
    border-top: 2px solid #eee;
    padding: 20px 0 10px;
    line-height: 36px;
  }
  .el-table thead th {
    height: 40px;
  }
}
</style>
