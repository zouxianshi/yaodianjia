<template>
  <div class="depot-wrappe clearfix">
    <div style="margin-top:20px">
      <el-button
        type="primary"
        size="small"
        icon="el-icon-setting"
        @click="isShowSettingDialog = true"
      >评论设置</el-button>
      <el-button
        type="primary"
        size="small"
        icon="el-icon-upload2"
        @click="handleImportComment"
      >批量导入评论</el-button>
    </div>

    <section @keydown.enter="handleQuery">
      <div class="search-form" style="margin-top:20px;margin-bottom:10px">
        <div class="search-item">
          <span class="label-name">商品分类</span>
          <el-cascader
            ref="cascType"
            v-model="listQuery.typeId"
            :value="listQuery.level"
            size="small"
            :options="goodsTypeList"
            :props="defaultProps"
            clearable
            placeholder="选择商品分类"
          />
        </div>
        <div class="search-item">
          <span class="label-name">商品类型</span>
          <el-select v-model="listQuery.commodityType" size="small" placeholder="普通商品/组合商品">
            <el-option label="普通商品" value="1" />
            <el-option label="组合商品" value="2" />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name">药品类型</span>
          <el-select v-model="listQuery.drugType" size="small" placeholder="请选择药品类型">
            <el-option label="全部" value />
            <el-option label="甲类OTC" value="0" />
            <el-option label="乙类OTC" value="2" />
            <el-option label="OTC" value="4" />
            <el-option label="处方药" value="1" />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name">商品信息</span>
          <el-input
            v-model.trim="listQuery.erpOrName"
            size="small"
            style="width:200px"
            placeholder="商品名称/编码"
          />
        </div>
      </div>

      <div class="search-form">
        <div class="search-item">
          <el-button type="primary" size="small" @click="handleQuery">查询</el-button>
          <el-button type size="small" @click="resetQuery">重置</el-button>
        </div>
      </div>
    </section>

    <section class="depot-list">
      <el-card class="tree-card">
        <div class="tree-box">
          <div class="search text-center">
            <a href="#/goods-manage/group">
              <el-button type="text" size="small">新建自定义分组</el-button>
            </a>
          </div>
          <div class="tree">
            <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              :default-expanded-keys="[1,2]"
              node-key="id"
              @node-click="handleTreeClick"
            >
              <span
                slot-scope="{ node, data }"
                class="custom-tree-node"
                :class="{'active':data.id===listQuery.groupId}"
              >
                <span class="ellipsis" :title="node.label">{{ node.label }}</span>
              </span>
            </el-tree>
          </div>
        </div>
      </el-card>
    </section>

    <section class="depot-table">
      <div class="table-box" style="margin-top:0px">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商品图片"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.mainPic">
                <el-image
                  style="width: 70px; height: 70px"
                  :src="showImg(scope.row.mainPic)+'?x-oss-process=style/w_80'"
                  lazy
                  fit="contain"
                  @click="onLook(scope.row.mainPic)"
                />
              </template>
              <template v-else>
                <p class>暂未上传</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            prop="orName"
            align="left"
            min-width="160"
            show-overflow-tooltip
            label="商品信息"
          >
            <template slot-scope="scope">
              <div style="overflow: hidden;text-overflow: ellipsis;">
                <p class="ellipsis" v-text="scope.row.name" />
                <p class="ellipsis">
                  <span
                    v-for="(item,index) in scope.row.specSkuList"
                    :key="index"
                  >{{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}</span>
                </p>
                <p v-if="scope.row.barCode" class="ellipsis" v-text="'条码：'+scope.row.barCode" />
                <p class="ellipsis" v-text="scope.row.approvalNumber" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="mprice"
            align="left"
            label="参考价"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="erpCode"
            align="left"
            label="商品编码"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column prop="commentCount" align="left" min-width="155" label="评论数量" sortable />
          <el-table-column prop="address" align="left" fixed="right" label="操作" :min-width="200">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleViewCommentClick(scope.row)">管理评论</el-button>
              <el-button type="primary" size="mini" @click="handleAddCommentClick(scope.row)">新增评论</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-image-viewer v-if="isShowImg" :on-close="onCloseImg" :url-list="srcList" />
      </div>
      <pagination
        :total="total"
        :page.sync="listQuery.currentPage"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </section>

    <el-backtop target=".app-container" :bottom="100" />

    <view-comment-dialog
      :visible="isShowViewCommentDialog"
      :commodity-id="commodityId"
      @closed="isShowViewCommentDialog = false"
    />
    <add-comment-dialog
      :visible="isShowAddCommentDialog"
      :commodity-id="commodityId"
      @closed="handleAddCommentDialogClosed"
    />
    <setting-dialog
      :visible="isShowSettingDialog"
      :commodity-id="commodityId"
      @closed="isShowSettingDialog = false"
    />
    <import-dialog
      :visible="isShowImportDialog"
      @closed="isShowImportDialog = false"
    />
  </div>
</template>
<script>
import ElImageViewer from '@/components/imageViewer/imageViewer'
import { delGoods } from '@/api/depot'
import { queryCommodityList } from '@/api/commentService'
import { getTypeDimensionList, getTypeTree } from '@/api/group'
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import ViewCommentDialog from '@/views/comment-settings/components/ViewCommentDialog'
import AddCommentDialog from '@/views/comment-settings/components/AddCommentDialog'
import SettingDialog from '@/views/comment-settings/components/SettingDialog'
import ImportDialog from '@/views/comment-settings/components/ImportDialog'

export default {
  name: 'Manager',
  components: {
    Pagination,
    ElImageViewer,
    ViewCommentDialog,
    AddCommentDialog,
    SettingDialog,
    ImportDialog
  },
  mixins: [mixins],
  data() {
    return {
      isShowImg: false,
      isShowViewCommentDialog: false,
      isShowAddCommentDialog: false,
      isShowSettingDialog: false,
      isShowImportDialog: false,
      srcList: [],
      status: 0,
      multiselect: [],
      treeData: [],
      groupData: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id',
        checkStrictly: true
      },
      editId: '',
      isToEdit: false,
      merCode: '',
      specData: [],
      loading: false,
      tableData: [],
      dialogVisible: false,
      importAllVisible: false,
      limitVisible: false,
      total: 0,
      subLoading: false,
      groupVisible: false,
      listQuery: {
        isIgnorePic: true,
        drugType: '', // 药品类型
        erpOrName: '', // 商品信息
        commodityType: '', // 商品分类
        approvalNumber: '', // 批准文号
        barCode: '', // 条形码
        manufacture: '', // 生产企业
        infoFlag: true,
        origin: '', // 商品来源
        auditStatus: 1,
        groupId: '', // 分组id
        currentPage: 1,
        owner: 0,
        typeId: '', // 商品分类id
        level: ''
      },
      goodsTypeList: [],
      commodityId: ''
    }
  },
  created() {
    this.merCode = this.$store.state.user.merCode
    this.getList()
    this._loadGoodTypeList()
    this._loadTypeList()
    this._loadGoodTypeList()
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      console.log(vm) // 当前组件的实例
      if (sessionStorage.getItem('isRefreshDepot')) {
        sessionStorage.setItem('isRefreshDepot', false)
        vm.getList()
      }
    })
  },
  beforeRouteLeave(to, from, next) {
    const name = `depotEdit`
    const hasGoodsEdit = this.$store.state.tagsView.visitedViews.find(
      item => item.name === name
    )
    if (hasGoodsEdit && to.name === name) {
      const answer = window.confirm('你还有数据没有保存，是否确认退出')
      if (answer) {
        this.$store.dispatch('tagsView/delView', to).then(res => {
          this.isToEdit = false
          next()
        })
      } else {
        this.isToEdit = false
      }
    } else {
      this.isToEdit = false
      next()
    }
  },
  methods: {
    onLook(url) {
      this.srcList = [`${this.showImg(url)}?x-oss-process=style/w_800`]
      this.isShowImg = true
    },
    onCloseImg() {
      this.isShowImg = false
    },
    resetQuery() {
      // 重置
      this.listQuery = {
        isIgnorePic: true,
        owner: 0,
        approvalNumber: '',
        barCode: '',
        manufacture: '',
        name: '',
        infoFlag: this.listQuery.infoFlag,
        erpCode: '',
        auditStatus: 1,
        groupId: '', // 分组id
        currentPage: 1,
        typeId: '',
        level: ''
      }
      this.getList()
    },
    handleQuery() {
      this.listQuery.currentPage = 1
      if (
        this.listQuery.typeId &&
        Array.isArray(this.listQuery.typeId) &&
        this.listQuery.typeId.length
      ) {
        this.listQuery.typeId = this.listQuery.typeId[
          this.listQuery.typeId.length - 1
        ]
      }
      const nodesObj = this.$refs['cascType'].getCheckedNodes()
      this.listQuery.level = nodesObj.length > 0 ? nodesObj[0].level : ''
      this.getList()
    },
    getList() {
      this.loading = true
      queryCommodityList(this.listQuery)
        .then(res => {
          const { data, totalCount } = res.data

          if (data.length === 0 && this.listQuery.currentPage !== 1) {
            this.listQuery.currentPage = 1
            this.getList()
          }

          this.tableData = data
          this.total = totalCount
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    _loadTypeList() {
      getTypeTree({
        merCode: this.$store.state.user.merCode,
        type: 2,
        use: true
      }).then(res => {
        this.treeData = res.data
        this.treeData = JSON.parse(JSON.stringify(this.treeData))
        this.treeData.unshift({ name: '全部', id: '' })
        this.treeData.push({ name: '未分组', id: 'weifenzuflag' })
        // this.$nextTick(_ => {
        //   $('.el-tree')
        //     .find('.el-tree-node')
        //     .each(function(i) {
        //       $(this)
        //         .find('.el-tree-node__content .el-tree-node__expand-icon')
        //         .click()
        //     })
        // })
      })
      getTypeDimensionList(this.$store.state.user.merCode).then(res => {
        this.groupData = res.data
      })
    },
    // 分类
    _loadGoodTypeList() {
      if (Array.isArray(this.goodsTypeList) && this.goodsTypeList.length) {
        return
      }
      getTypeTree({ merCode: 'hydee', type: 1, issTree: true })
        .then(res => {
          console.log('_loadGoodTypeList-------', res)
          this.goodsTypeList = res.data
        })
        .catch(() => {})
    },
    handleTreeClick(row, node) {
      // 节点被点击时
      this.listQuery.groupId = row.id
      this.listQuery.level = row.level
      this.getList()
    },
    handleUpDown(status, row) {
      console.log(row)
      // 单个上下架
      if (this.listQuery.owner === 1) {
        this.$message({
          message: `平安的商品暂不支持此操作`,
          type: 'error'
        })
        return
      }
      if (status === 1 && !row.mainPic) {
        this.$message({
          message: '不允许橱窗图为空的商品上架，请先完善信息',
          type: 'error'
        })
        return
      }
      this.specData = [`${row.specId}`]
      this.status = status
      this.dialogVisible = true
    },
    handleEdit(id) {
      this.isToEdit = true
      this.editId = id
      this.$router.push('/goods-manage/depot-edit?id=' + id + '&backUrl=depot')
    },
    //
    handleDel(row) {
      console.log('当前删除的id', row)
      this.$confirm('确定要删除当前商品嘛？', '', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delGoods({
          merCode: this.merCode, // 商品编码不可为空
          id: row.id, // 商品id不可为空
          specId: row.specId // 商品规格ID,没有时可不传
        }).then(res => {
          console.log('res----delGoods', res)
          if (res.code === '10000') {
            this.$message({
              message: '商品删除成功',
              type: 'success'
            })
            this.getList()
          }
        })
      })
    },
    handleSelectionChange(rows) {
      this.multiselect = rows
    },
    handleViewCommentClick(rows) {
      this.commodityId = rows.id
      this.isShowViewCommentDialog = true
    },
    handleAddCommentClick(rows) {
      this.commodityId = rows.id
      this.isShowAddCommentDialog = true
    },
    handleImportComment() {
      this.isShowImportDialog = true
    },
    handleAddCommentDialogClosed() {
      this.isShowAddCommentDialog = false
      this.getList()
    }
  }
}
</script>
<style lang="scss">
.custom-tree-node {
  display: -webkit-box;
  display: flex;
  display: -ms-flexbox;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
  &.active {
    color: #2d8cf0;
  }
  i {
    display: inline-block;
    margin-left: 10px;
  }
  .ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 9px;
  }
}
</style>
<style lang="scss">
.el-tree-node__content {
  margin-top: 5px;
}
</style>
<style lang="scss" scoped>
.el-divider--vertical {
  margin: 0 4px;
}
.el-button + .el-button {
  margin-left: 0;
}
.depot-wrappe {
  margin-bottom: 30px;
  .search-item {
    .label-name {
      text-align: center;
      width: 60px;
    }
  }
}
.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.depot-list {
  float: left;
  width: 210px;
  .search-form {
    margin: 10px 0;
  }
}

.depot-table {
  margin-left: 230px;
}
</style>

