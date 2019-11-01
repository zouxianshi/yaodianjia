<template>
  <div class="app-container">
    <div class="depot-wrappe clearfix">
      <el-alert
        type="warning"
        :closable="false"
      >
        <p slot="title" class="alret-title">
          海典药品库包含50万商品，为方便您快速创建商品，您可以直接添加海典标库商品，如果找不到您想发布的商品，请您<router-link tag="span" class="link" to="/home">自建新品</router-link>
        </p>
      </el-alert>
      <div style="margin-top:20px">
        <a href="#/goods-manage/addition">
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">添加标库商品</el-button>
        </a>
        <a href="#/goods-manage/import">
          <el-button type="primary" size="small" icon="el-icon-upload2">商品导入</el-button>
        </a>
        <!-- <el-button type="" size="small" icon="el-icon-download" @click="handleExport">导出</el-button> -->
      </div>
      <section @keydown.enter="getList">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input v-model.trim="listQuery.name" size="small" style="width:200px" placeholder="商品名称" />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input v-model.trim="listQuery.manufacture" size="small" style="width:200px" placeholder="生产企业" />
          </div>
          <div class="search-item">
            <span class="label-name">商品编码</span>
            <el-input v-model.trim="listQuery.erpCode" size="small" style="width:200px" placeholder="商品编码" />
          </div>
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input v-model.trim="listQuery.barCode" size="small" style="width:200px" placeholder="商品名称" />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input v-model.trim="listQuery.approvalNumber" size="small" style="width:200px" placeholder="批准文号" />
          </div>
          <div class="search-item">
            <span class="label-name">商品来源</span>
            <el-select v-model="listQuery.origin" placeholder="选择商品来源" size="small" @change="getList">
              <el-option label="全部" value="" />
              <el-option label="海典" value="1" />
              <el-option label="商家" value="2" />
            </el-select>
          </div>
          <div class="search-item">
            <el-button type="" size="small" @click="getList">查询</el-button>
          </div>
        </div>
      </section>
      <section class="depot-list">
        <el-card class="tree-card">
          <div class="tree-box">
            <div
              class="search text-center"
            >
              <a href="#/goods-manage/group">
                <el-button type="text" size="small">新建自定义分组</el-button>
              </a>
            </div>
            <div class="tree">
              <el-tree
                ref="tree"
                :data="treeData"
                :props="defaultProps"
                node-key="id"
                @node-click="handleTreeClick"
              >
                <span
                  slot-scope="{ node, data }"
                  class="custom-tree-node"
                  :class="{'active':data.id===listQuery.typeId}"
                >
                  <span
                    class="ellipsis"
                    :title="node.label"
                  >{{ node.label }}</span>
                </span>
              </el-tree>
            </div>
          </div>
        </el-card>
      </section>
      <section class="depot-table">
        <div class="text-right" style="margin-bottom:10px;display:flex;justify-content:space-between">
          <div>
            <el-radio-group v-model="listQuery.infoFlag" size="small" @change="getList">
              <el-radio-button :label="false">全部</el-radio-button>
              <el-radio-button :label="true">待完善资料</el-radio-button>
            </el-radio-group>
          </div>
          <div>
            <template v-if="!listQuery.infoFlag">
              <el-button type="primary" size="mini" @click="handleChangeUpdown(1)">批量上架</el-button>
              <el-button type="danger" size="mini" @click="handleChangeUpdown(0)">批量下架</el-button>
            </template>
            <el-button type="" size="mini" @click="handleUpGroup">批量修改分组</el-button>
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
            <el-table-column
              type="selection"
              width="55"
            />
            <el-table-column
              prop="orCode"
              align="left"
              min-width="120"
              label="商品图片"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <template v-if="scope.row.stPath">
                  <el-image
                    style="width: 100px; height: 100px"
                    :src="scope.row.mainPic"
                    lazy
                    fit="contain"
                    :preview-src-list="[`${scope.row.mainPic}`]"
                  />
                </template>
                <template v-else>
                  <p class="">暂未上传</p>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              prop="orName"
              align="left"
              min-width="160"
              label="商品信息"
            >
              <template slot-scope="scope">
                <div>
                  <p v-text="scope.row.name" />
                  <p v-text="scope.row.approvalNumber" />
                </div>
              </template>
            </el-table-column>
            <el-table-column
              align="left"
              min-width="120"
              label="生产企业"
              prop="manufacture"
            />
            <el-table-column
              prop="orParentName"
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
            <el-table-column
              prop="modifyTime"
              align="left"
              min-width="155"
              label="修改时间"
            />
            <el-table-column
              prop="address"
              align="left"
              fixed="right"
              label="操作"
              :min-width="listQuery.infoFlag?'100':'220'"
            >
              <template slot-scope="scope">
                <template v-if="!listQuery.infoFlag">
                  <el-button type="primary" size="mini" @click="handleUpDown(1,scope.row)">上架</el-button>
                  <el-button type="info" size="mini" @click="handleUpDown(0,scope.row)">下架</el-button>
                </template>
                <a :href="`#/goods-manage/edit?id=${scope.row.id}`">
                  <el-button type="" size="mini">编辑</el-button>
                </a>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </section>
    </div>
    <store :status="status" :choose-num="specData.length" :spec-data="specData" :is-show="dialogVisible" @close="dialogVisible=false" />
    <group :is-show="groupVisible" :group-data="groupData" :goods-data="goodsData" @close="groupVisible=false" />
  </div>
</template>
<script>
import { getGoodsList, exportData } from '@/api/depot'
import { getTypeDimensionList } from '@/api/group'
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import download from '@hydee/download'
import store from '../components/store'
import group from '../components/grouping'
export default {
  components: { Pagination, store, group },
  mixins: [mixins],
  data() {
    return {
      keyword: '',
      goodStatus: 1,
      chooseNum: 0,
      status: 0,
      multiselect: [],
      treeData: [],
      groupData: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      goodsData: [],
      specData: [],
      loading: false,
      tableData: [],
      dialogVisible: false,
      total: 0,
      subLoading: false,
      groupVisible: false,
      listQuery: {
        approvalNumber: '',
        barCode: '',
        manufacture: '',
        name: '',
        infoFlag: false,
        erpCode: '',
        typeId: '' // 分组id
      }
    }
  },
  created() {
    this.getList()
    this._loadTypeList()
  },
  methods: {
    getList() {
      this.loading = true
      getGoodsList(this.listQuery).then(res => {
        const { data, totalCount } = res.data
        this.tableData = data
        this.total = totalCount
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    _loadTypeList() {
      getTypeDimensionList(this.$store.state.user.merCode).then(res => {
        this.treeData = res.data
        this.groupData = res.data
        this.treeData = JSON.parse(JSON.stringify(this.treeData))
        this.treeData.unshift({ name: '全部', id: '' })
      })
    },
    handleTreeClick(row, node) { // 节点被点击时
      this.listQuery.typeId = row.id
      this.getList()
    },
    handleChangeUpdown(status) { // 批量上下架
      this.specData = []
      if (this.multiselect.length === 0) {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      this.multiselect.map(res => {
        this.specData.push(`${res.specId}`)
      })
      this.status = status
      this.dialogVisible = true
    },
    handleUpDown(status, row) { // 单个上下架
      this.specData = [`${row.specId}`]
      this.status = status
      this.dialogVisible = true
    },
    handleSelectionChange(rows) {
      this.multiselect = rows
    },
    handleUpGroup() { // 修改分组
      if (this.multiselect.length === 0) {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      this.multiselect.map(res => {
        this.goodsData.push(res.specId)
      })
      this.groupVisible = true
    },
    handleExport() { // 商品导出
      exportData(this.listQuery)
        .then(res => {
          if (res.type === 'application/json') {
            this.$message({
              message: '导出的记录为空',
              type: 'error'
            })
          } else {
            download.blob(res)
            this.$message({
              message: '数据导出成功',
              type: 'success'
            })
          }
        })
        .catch(() => {

        })
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
.depot-wrappe {
  margin-bottom: 30px;
  .search-item{
    .label-name{
      text-align: left;
      width: 60px
    }
  }
}
.table-footer{
  display: flex;
  justify-content: space-between;
  align-items: center
}
.depot-list {
  float: left;
  width: 300px;
  .search-form {
    margin: 10px 0;
  }
}

.depot-table {
  margin-left: 320px;
}
</style>

