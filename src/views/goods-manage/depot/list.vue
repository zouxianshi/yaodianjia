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
        <el-button type="primary" size="small" icon="el-icon-circle-plus-outline" @click="handleAdd">添加标库商品</el-button>
        <el-button type="primary" size="small" icon="el-icon-upload2" @click="handleImport">商品导入</el-button>
        <el-button type="" size="small" icon="el-icon-download" @click="handleExport">导出</el-button>
      </div>
      <section @keydown.enter="getList">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input v-model.trim="listQuery.name" size="small" style="width:200px" placeholder="商品名称" />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input v-model.trim="listQuery.storeName" size="small" style="width:200px" placeholder="生产企业" />
          </div>
          <div class="search-item">
            <span class="label-name">商品编码</span>
            <el-input v-model.trim="listQuery.dimensionId" size="small" style="width:200px" placeholder="商品编码" />
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
            <el-select v-model="listQuery.origin" placeholder="选择商品来源" size="small">
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
              <el-button type="primary" size="small">新建自定义分组</el-button>
            </div>
            <div class="tree">
              <el-tree
                ref="tree"
                :data="treeData"
                :props="defaultProps"
                node-key="id"
              />
            </div>
          </div>
        </el-card>
      </section>
      <section class="depot-table">
        <!-- <el-radio-group v-model="listQuery.status" size="small">
          <el-radio-button :label="0">全部</el-radio-button>
          <el-radio-button :label="1">已上架</el-radio-button>
          <el-radio-button :label="2">已下架</el-radio-button>
          <el-radio-button :label="3">待完善资料</el-radio-button>
        </el-radio-group> -->
        <div class="table-box">
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
                    :src="scope.row.stPath"
                    lazy
                    fit="contain"
                    :preview-src-list="[`${scope.row.stPath}`]"
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
              min-width="120"
              :show-overflow-tooltip="true"
              label="商品信息"
            />
            <el-table-column
              align="left"
              min-width="120"
              label="生产企业"
            />
            <el-table-column
              prop="orParentName"
              align="left"
              label="参考价"
              :show-overflow-tooltip="true"
              min-width="160"
            />
            <el-table-column
              prop="headPerson"
              align="left"
              label="商品编码"
              :show-overflow-tooltip="true"
              min-width="120"
            />
            <el-table-column
              prop="address"
              label="状态"
              align="left"
            >
              <template slot-scope="scope">
                <el-tag
                  v-if="scope.row.status==0"
                  type="danger"
                  size="mini"
                >禁用</el-tag>
                <el-tag
                  v-else
                  type="success"
                  size="mini"
                >启用</el-tag>
              </template>
            </el-table-column>
            <el-table-column
              prop="createTime"
              align="left"
              min-width="155"
              label="创建时间"
            />
            <el-table-column
              prop="address"
              align="left"
              fixed="right"
              label="操作"
              min-width="100"
            >
              <template slot-scope="scope">
                <!-- <el-button type="" size="mini" @click="handleListEdit(scope.row)">编辑</el-button> -->
                <el-button
                  :type="scope.row.status===1?'danger':'success'"
                  size="mini"
                  @click="handleCommand(1,scope.row)"
                >{{ scope.row.status===1?'停用':'启用' }}</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div class="table-footer">
            <div class="opeat" style="margin-top:-12px">
              <el-button type="primary" size="mini" @click="handleChangeUpdown(1)">批量上架</el-button>
              <el-button type="danger" size="mini" @click="handleChangeUpdown(0)">批量下架</el-button>
              <el-button type="" size="mini" @click="handleUpGroup">批量修改分组</el-button>
            </div>
            <pagination
              :total="total"
              :page.sync="listQuery.currentPage"
              :limit.sync="listQuery.pageSize"
              @pagination="getList"
            />
          </div>
        </div>
      </section>
    </div>
    <store :status="status" :choose-num="chooseNum" :is-show="dialogVisible" @close="dialogVisible=false" />
    <group :is-show="groupVisible" @close="groupVisible=false" />
  </div>
</template>
<script>
import { getGoodsList } from '@/api/depot'
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
// import download from '@hydee/download'
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
      treeData: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      loading: false,
      tableData: [],
      dialogVisible: false,
      total: 0,
      subLoading: false,
      groupVisible: false,
      listQuery: {
        approvalNumber: '',
        barCode: '',
        dimensionId: '',
        manufacture: '',
        name: '',
        status: 0,
        storeName: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getGoodsList(this.listQuery).then(res => {
        this.tableData = res.data
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleChangeUpdown(status) { // 上下架
      this.status = status
      this.chooseNum = 1
      this.dialogVisible = true
    },
    handleSelectionChange(rows) {

    },
    handleAdd() {
      this.$router.push('/goods-manage/addition')
    },
    handleImport() {
      this.$router.push('/goods-manage/import')
    },
    handleUpGroup() { // 修改分组
      this.groupVisible = true
    },
    handleExport() {
      // const query = {
      //   currentPage: this.listQuery.page,
      //   onlineStatus: this.online,
      //   pageSize: this.listQuery.limit,
      //   storeName: this.keyword
      // }
      // exportData(query)
      //   .then(res => {
      //     if (res.type === 'application/json') {
      //       this.$message({
      //         message: '导出的记录为空',
      //         type: 'error'
      //       })
      //     } else {
      //       download.blob(res)
      //       this.$message({
      //         message: '数据导出成功',
      //         type: 'success'
      //       })
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err)
      // })
    }
  }
}
</script>
<style lang="scss">
.el-tree-node__content {
  &:hover {
    .opeart {
      transform: translateX(0);
    }
  }
}
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
  .opeart {
    width: 85px;
    position: absolute;
    text-align: right;
    right: 0;
    z-index: 33;
    opacity: 0.9;
    background: #f5f7fa;
    transform: translateX(120px);
    transition: all 0.2s;
    &.flw1 {
      flex: 0 0 50px !important;
    }
    &.flw2 {
      flex: 0 0 95px !important;
    }
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

