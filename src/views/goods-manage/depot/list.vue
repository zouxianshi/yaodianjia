<template>
  <div class="app-container">
    <div class="depot-wrappe clearfix">
      <!-- <el-alert type="warning" :closable="false">
        <p slot="title" class="alret-title">
          为方便您快速创建商品，您可以直接添加海典标库商品，如果找不到您想发布的商品，请您
          <router-link tag="span" class="link" to="/goods-manage/apply">自建新品</router-link>
        </p>
      </el-alert>-->
      <div style="margin-top:20px">
        <a href="#/goods-manage/addition">
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">添加标库商品</el-button>
        </a>
        <a href="#/goods-manage/import">
          <el-button type="primary" size="small" icon="el-icon-upload2">商品导入</el-button>
        </a>
        <el-button
          type
          size="small"
          icon="el-icon-download"
          :loading="exportLoading"
          @click="handleExport"
        >导出</el-button>
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
          <!-- <div class="search-item">
            <span class="label-name">商品类型</span>
            <el-select v-model="listQuery.commodityType" size="small" placeholder="普通商品/组合商品">
              <el-option label="普通商品" value="1" />
              <el-option label="组合商品" value="2" />
            </el-select>
          </div>-->
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
          <div class="search-item">
            <span class="label-name">货&nbsp;&nbsp;&nbsp;&nbsp;主</span>
            <el-select
              v-model="listQuery.owner"
              size="small"
              placeholder="请选择货主"
              @change="handleQuery"
            >
              <el-option label="自营" :value="0" />
              <el-option label="平安" :value="1" />
            </el-select>
          </div>

          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuery.barCode"
              size="small"
              style="width:200px"
              placeholder="条形码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="listQuery.approvalNumber"
              size="small"
              style="width:200px"
              placeholder="批准文号"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="listQuery.manufacture"
              size="small"
              style="width:200px"
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品来源</span>
            <el-select
              v-model="listQuery.origin"
              placeholder="选择商品来源"
              size="small"
              @change="handleQuery"
            >
              <el-option label="全部" value />
              <el-option label="海典商品库" value="1" />
              <el-option label="自建商品库" value="2" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">橱窗图</span>
            <el-select
              v-model="listQuery.hasMainPic"
              placeholder="选择橱窗图"
              size="small"
              @change="handleQuery"
            >
              <el-option label="有" :value="true" />
              <el-option label="无" :value="false" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">品&nbsp;&nbsp;&nbsp;&nbsp;牌</span>
            <el-select
              v-model="listQuery.brandId"
              v-loadmore="loadMore"
              filterable
              remote
              clearable
              :remote-method="remoteMethod"
              :loading="loading"
              size="small"
              placeholder="选择品牌"
              @change="handleBrandChange"
              @clear="handleBrandClear"
            >
              <el-option
                v-for="item in brandList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
            </el-select>
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
        <div
          class="text-right"
          style="margin-bottom:10px;display:flex;justify-content:space-between"
        >
          <!-- <div>
            <el-radio-group v-model="listQuery.infoFlag" size="small" @change="getList">
              <el-radio-button :label="true">全部</el-radio-button>
              <el-radio-button :label="false">待完善资料</el-radio-button>
            </el-radio-group>
          </div>-->
          <div>
            <template v-if="listQuery.infoFlag">
              <el-button type="primary" size="mini" @click="handleChangeUpdown(1)">批量上架</el-button>
              <el-button type="danger" size="mini" @click="handleChangeUpdown(0)">批量下架</el-button>
            </template>
            <el-button type size="mini" @click="handleUpGroup">批量修改分组</el-button>
            <el-button type="info" size="mini" @click="handleSettingLimitBuy">批量设置限购</el-button>
            <el-button type="warning" size="mini" @click="handleImportUpdate">导入修改分组</el-button>
          </div>
        </div>
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
              align="left"
              min-width="120"
              label="生产企业"
              show-overflow-tooltip
              prop="manufacture"
            />
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
            <el-table-column prop="modifyTime" align="left" min-width="155" label="修改时间" />
            <el-table-column
              prop="address"
              align="left"
              fixed="right"
              label="操作"
              :min-width="!listQuery.infoFlag?'120':'200'"
            >
              <template slot-scope="scope">
                <!-- <template v-if="listQuery.infoFlag&&scope.row.commodityType!==2">
                  <el-button type="primary" size="mini" plain @click="handleUpDown(1,scope.row)">上架</el-button>
                  <el-button type="warning" size="mini" plain @click="handleUpDown(0,scope.row)">下架</el-button>
                </template>-->
                <template v-if="scope.row.commodityType!==2">
                  <a @click="handleEdit(scope.row.id)">
                    <el-button type="success" plain size="mini">编辑</el-button>
                  </a>
                </template>
                <template>
                  <el-button type="danger" plain size="mini" @click="handleDel(scope.row)">删除</el-button>
                </template>
              </template>
            </el-table-column>
          </el-table>
          <el-image-viewer v-if="isShowImg" :on-close="onCloseImg" :url-list="srcList" />
        </div>
        <pagination
          :total="total"
          :page-sizes="[20, 30, 50, 100]"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </section>
    </div>
    <store
      :status="status"
      :choose-num="specData.length"
      :spec-data="specData"
      :mer-code="merCode"
      :is-show="dialogVisible"
      @close="dialogVisible=false"
      @complete="dialogVisible=false;getList()"
    />
    <group
      :is-show="groupVisible"
      :group-data="groupData"
      :goods-data="goodsData"
      @complete="groupVisible=false;getList()"
      @close="groupVisible=false"
    />
    <limit-buy
      :is-show="limitVisible"
      :spec-data="specData"
      :commodity-ids="commodityIds"
      @complete="limitVisible=false;getList()"
      @close="limitVisible=false"
    />
    <importUpdate
      :is-show="importAllVisible"
      :spec-data="specData"
      @complete="importAllVisible=false;getList()"
      @close="importAllVisible=false"
    />
    <el-backtop target=".app-container" :bottom="100" />
  </div>
</template>
<script>
import ElImageViewer from '@/components/imageViewer/imageViewer'
import { getGoodsList, delGoods, exportDataNew } from '@/api/depot'
import { getTypeDimensionList, getTypeTree } from '@/api/group'
import { getBrandList } from '@/api/new-goods'
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import download from '@hydee/download'
import store from '../components/store'
import group from '../components/grouping'
import limitBuy from './_source/limit-buy'
import importUpdate from './_source/importUpdate'

export default {
  name: 'Depot',
  components: {
    Pagination,
    store,
    group,
    limitBuy,
    importUpdate,
    ElImageViewer
  },
  mixins: [mixins],
  data() {
    return {
      isShowImg: false,
      srcList: [],
      keyword: '',
      goodStatus: 1,
      chooseNum: 0,
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
      goodsData: [],
      merCode: '',
      specData: [],
      commodityIds: [],
      loading: false,
      exportLoading: false,
      tableData: [],
      brandList: [], // 品牌列表
      brandId: '', // 商品品牌id
      brandName: '', // 品牌名称
      brandNanme: '',
      brandNanme_currentPage: 1,
      brandNanme_pageSize: 30,
      brandLoading: false,
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
        brandId: '', // 品牌类型
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
        level: '',
        groupLevel: ''
      },
      goodsTypeList: []
    }
  },
  created() {
    this.merCode = this.$store.state.user.merCode
    this.getList()
    this._loadGoodTypeList()
    this._loadTypeList()
    this._loadGoodTypeList()
    this._loadBrandList({
      pageSize: 30,
      currentPage: 1
    }) // 获取所属品牌
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
      // const answer = window.confirm('你还有数据没有保存，是否确认退出')
      // if (answer) {
      //   this.$store.dispatch('tagsView/delView', to).then(res => {
      //     this.isToEdit = false
      next()
      //   })
      // } else {
      //   this.isToEdit = false
      // }
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
    handleBrandChange() {
      this.getList()
    },
    handleBrandClear() {
      this._loadBrandList({
        pageSize: 30,
        currentPage: 1
      })
      this.getList()
    },
    remoteMethod(query) {
      this.brandNanme = query
      this._loadBrandList({
        brandName: query,
        pageSize: 30,
        currentPage: 1
      })
    },
    loadMore: function() {
      this._loadBrandList({
        brandName: this.brandNanme,
        pageSize: 30,
        currentPage: this.brandNanme_currentPage
      })
    },
    handleSettingLimitBuy() {
      // 设置限购
      this.specData = []
      this.commodityIds = []
      if (this.multiselect.length === 0) {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      let flag = true
      this.multiselect.map(res => {
        if (res.commodityType === 2) {
          flag = false
        }
        this.specData.push(`${res.specId}`)
        this.commodityIds.push(`${res.id}`)
      })
      if (!flag) {
        this.$message({
          message: '当前页面不允许操作组合商品，请重新选择',
          type: 'error'
        })
        return
      }
      this.limitVisible = true
    },
    handleImportUpdate() {
      this.importAllVisible = true
    },
    resetQuery() {
      // 重置
      this.listQuery = {
        isIgnorePic: true,
        owner: 0,
        approvalNumber: '',
        barCode: '',
        brandId: '',
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
        this.listQuery.typeId.length > 0
      ) {
        this.listQuery.typeId = this.listQuery.typeId[
          this.listQuery.typeId.length - 1
        ]
      } else if (
        Array.isArray(this.listQuery.typeId) &&
        this.listQuery.typeId.length === 0
      ) {
        this.listQuery.typeId = ''
      }
      const nodesObj = this.$refs['cascType'].getCheckedNodes()
      this.listQuery.level = nodesObj.length > 0 ? nodesObj[0].level : ''
      this.getList()
    },
    getList() {
      this.loading = true
      getGoodsList(this.listQuery)
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
    _loadBrandList(params) {
      // 获取品牌
      // this.brandLoading = true
      getBrandList(params).then(res => {
        const { data, currentPage } = res.data
        if (currentPage === 1) {
          this.brandList = Array.isArray(data) ? data : []
        } else {
          const arr = Array.isArray(data) ? data : []
          this.brandList = [...this.brandList, ...arr]
        }
        this.brandNanme_currentPage = currentPage + 1
        // this.brandLoading = false
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
      this.listQuery.groupLevel = row.level
      this.getList()
    },
    handleChangeUpdown(status) {
      // 批量上下架
      this.specData = []
      if (this.multiselect.length === 0) {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      if (this.listQuery.owner === 1) {
        this.$message({
          message: `平安的商品暂不支持此操作`,
          type: 'error'
        })
        return
      }
      let flag = true
      let picFlag = true
      this.multiselect.map(res => {
        if (res.commodityType === 2) {
          flag = false
        }
        if (status === 1 && !res.mainPic) {
          picFlag = false
        }
        this.specData.push(`${res.specId}`)
      })
      if (!flag) {
        this.$message({
          message: '当前页面不允许操作组合商品，请重新选择',
          type: 'error'
        })
        return
      }
      if (!picFlag) {
        this.$message({
          message: '不允许橱窗图为空的商品上架，请先完善信息',
          type: 'error'
        })
        return
      }
      this.status = status
      this.dialogVisible = true
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
      this.$confirm(
        '请谨慎操作，删除后商品无法恢复，且顾客购物车的该商品信息一并消失。继续删除吗？',
        '',
        {
          confirmButtonText: '继续删除',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).then(() => {
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
    handleUpGroup() {
      // 修改分组
      this.goodsData = []
      if (this.multiselect.length === 0) {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      let flag = true
      this.multiselect.map(res => {
        if (res.commodityType === 2) {
          flag = false
        }
        this.goodsData.push(res.id)
      })
      if (!flag) {
        this.$message({
          message: '当前页面不允许操作组合商品，请重新选择',
          type: 'error'
        })
        return
      }
      this.groupVisible = true
    },
    handleExport() {
      // 修改分组
      this.goodsData = []
      this.multiselect.map(res => {
        this.goodsData.push(res.specId)
      })
      // const param = { ids: this.goodsData, merCode: this.merCode }
      this.exportLoading = true
      // 商品导出
      exportDataNew({
        ...this.listQuery,
        skuIds: this.goodsData,
        hasLimit: true
      })
        .then(res => {
          this.exportLoading = false
          if (res.type === 'application/json') {
            this.$message({
              message: '导出的记录为空',
              type: 'error'
            })
          } else {
            download.blob(res, '导出结果文件', 'xlsx')
            this.$message({
              message: '数据导出成功',
              type: 'success'
            })
          }
        })
        .catch(() => {})
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

