<template>
  <div class="app-container">
    <div class="record-wrapper">
      <el-radio-group v-model="listQuery.auditStatus" size="small" @change="getList">
        <el-radio-button label>全部</el-radio-button>
        <!--<el-radio-button :label="-1">待完善</el-radio-button>-->
        <el-radio-button :label="3">待提交审核</el-radio-button>
        <!--<el-radio-button :label="2">待审核</el-radio-button>-->
        <el-radio-button :label="2">审核中</el-radio-button>
        <el-radio-button :label="1">已通过</el-radio-button>
        <el-radio-button :label="0">已驳回</el-radio-button>
      </el-radio-group>
      <section @keydown.enter="getList">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品信息</span>
            <el-input v-model.trim="listQuery.erpOrName" size="small" placeholder="商品名称/编码" />
          </div>
          <div class="search-item">
            <span class="label-name">商品分组</span>
            <el-cascader
              ref="groupRef"
              v-model="groupId"
              class="cascader"
              :props="defaultProps"
              :options="groupData"
              size="small"
              @change="handleChangeGroup"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input v-model.trim="listQuery.manufacture" size="small" placeholder="生产企业" />
          </div>
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input v-model.trim="listQuery.barCode" size="small" placeholder="条形码" />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input v-model.trim="listQuery.approvalNumber" size="small" placeholder="批准文号" />
          </div>
          <div class="search-item">
            <el-button type="primary" size="small" @click="getList">查询</el-button>
            <el-button type size="small" @click="resetQuery">重置</el-button>
            <el-button
              v-if="listQuery.auditStatus===3||listQuery.auditStatus===0||listQuery.auditStatus===-1"
              type="danger"
              size="small"
              @click="handleBatchDel"
            >删除</el-button>
            <el-button
              v-if="listQuery.auditStatus===3"
              type="warning"
              size="small"
              @click="handleSendCheck(null,true)"
            >批量提交审核</el-button>
            <el-button
              v-if="listQuery.auditStatus===2 && isShowbatchaudit === true"
              type="warning"
              size="small"
              @click="handleBatchCheck"
            >批量审核</el-button>
          </div>
        </div>
      </section>
      <div class="table-box">
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
            min-width="100"
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
            prop="orCode"
            align="left"
            min-width="200"
            label="商品/规格"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span>{{ scope.row.name }}&nbsp;</span>
              <template v-if=" scope.row.specSkuList">
                <span
                  v-for="(item,index) in scope.row.specSkuList"
                  :key="index"
                >{{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            min-width="120"
            prop="manufacture"
            show-overflow-tooltip
            label="生产企业"
          />
          <el-table-column
            prop="barCode"
            align="left"
            label="条形码"
            :show-overflow-tooltip="true"
            min-width="160"
          />
          <el-table-column
            prop="approvalNumber"
            align="left"
            label="批准文号"
            :show-overflow-tooltip="true"
            min-width="160"
          />
          <el-table-column
            prop="erpCode"
            align="left"
            label="商品编码"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column prop="modifyTime" align="left" min-width="155" label="修改时间" />
          <el-table-column prop="address" align="left" fixed="right" label="操作" min-width="250">
            <template slot-scope="scope">
              <template
                v-if="(scope.row.infoStatus >= 12)&&scope.row.auditStatus===3&&(listQuery.auditStatus===''||listQuery.auditStatus===3)"
              >
                <el-button type="primary" size="mini" @click="handleSendCheck(scope.row)">提交审核</el-button>
              </template>
              <template v-else-if="(scope.row.infoStatus>= 12)&&scope.row.auditStatus===0">
                <el-button type="primary" size="mini" @click="handleSendCheck(scope.row)">重新申请</el-button>
              </template>
              <template v-else-if="(scope.row.infoStatus>= 12)&&scope.row.auditStatus===1">
                <a v-if="scope.row.commodityType!==2" @click="handleQuery(scope.row.id)">
                  <el-button type size="mini">查看</el-button>
                </a>
              </template>
              <template v-else-if="(scope.row.infoStatus>= 12)&&scope.row.auditStatus===2">
                <a v-if="scope.row.commodityType!==2 && isShowaudit === true" @click="handleCurrentChange(scope.row)">
                  <el-button type="primary" size="mini">审核</el-button>
                </a>
              </template>
              <template v-if="(scope.row.infoStatus>= 12)&&scope.row.auditStatus===2">
                <a v-if="scope.row.commodityType!==2" @click="handleGoback(scope.row.id)">
                  <el-button type size="mini">撤回</el-button>
                </a>
              </template>
              <template
                v-if="scope.row.origin===2&&scope.row.origin!==1&&listQuery.auditStatus!==-1&&((scope.row.auditStatus!==1&&scope.row.auditStatus!==2&&scope.row.auditStatus!==0))"
              >
                <a @click="handleEdit(scope.row.id,scope.row.auditStatus)">
                  <el-button type size="mini">编辑</el-button>
                </a>
              </template>
              <template
                v-if="scope.row.origin===1&&scope.row.origin!==2&&((scope.row.infoStatus<=13)&&scope.row.auditStatus===1)||listQuery.auditStatus===-1"
              >
                <a @click="handleEdit(scope.row.id)">
                  <el-button type size="mini">编辑</el-button>
                </a>
              </template>
              <template v-if="listQuery.auditStatus!==-1&&scope.row.auditStatus===0">
                <a @click="handleEdit(scope.row.id)">
                  <el-button type size="mini">编辑</el-button>
                </a>
              </template>
              <el-button
                v-if=" scope.row.auditStatus === 0 || scope.row.auditStatus === 3"
                type="danger"
                size="mini"
                @click="handleDel(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-image-viewer v-if="isShowImg" :on-close="onCloseImg" :url-list="srcList" />
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            :page-sizes="[10, 20, 50, 200]"
            @pagination="getList"
          />
        </div>
      </div>
    </div>

    <checkDialog ref="checkDialog" @onSelect="onGetCheck" />

    <base-dialog
      :is-visible="isShowCheckDialog"
      :on-ok="handleCheckDialog"
      @close="isShowCheckDialog = false"
    >
      <p slot="content">{{ checkDialogTips }}</p>
    </base-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import { getNewGoodsRecord, deleteGoods } from '@/api/new-goods'
import { setAuditGoods } from '@/api/examine'
import { getTypeTree } from '@/api/group'
import { mapGetters, mapState } from 'vuex'
import ElImageViewer from '@/components/imageViewer/imageViewer'
import checkDialog from './_source/check-dialog'
import BaseDialog from '@/components/BaseDialog'
export default {
  name: 'GoodsRecord',
  components: { Pagination, ElImageViewer, checkDialog, BaseDialog },
  mixins: [mixins],
  data() {
    return {
      isToEdit: false,
      radio3: '',
      tableData: [],
      total: 0,
      loading: false,
      isShowCheckDialog: false,
      isShowaudit: false, // 是否显示审核按钮
      isShowbatchaudit: false, // 是否显示批量审核按钮
      groupData: [],
      groupId: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      listQuery: {
        approvalNumber: '',
        auditStatus: '',
        barCode: '',
        erpCode: '',
        manufacture: '',
        merCode: '',
        erpOrName: '',
        origin: 0,
        currentPage: 1,
        groupId: ''
      },
      multipleSelection: [],
      srcList: [],
      isShowImg: false,
      checkDialogTips: '确定要提交审核全部数据吗？'
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name']),
    ...mapState('user', ['resList'])
  },
  watch: {},
  created() {
    if (this.$route.query.type) {
      this.listQuery.auditStatus = parseInt(this.$route.query.type)
    }
    this.getList()
    this._loadTypeList()
    // 批量审核按钮、表单审核按钮权限控制
    let commodityData = {}
    let commodityChild = {}
    let commoditynewrecorData = {}
    let commoditynewrecordChild = {}
    let auditData = {}
    let batchauditData = {}
    commodityData = this.resList.find(d => d.rePath === 'commodity')
    if (commodityData === undefined || commodityData === null) {
      return
    }
    commodityChild = commodityData.children
    if (commodityChild === undefined || commodityChild === null) {
      return
    }
    commoditynewrecorData = commodityChild.find(d => d.rePath === 'commodity-new-record')
    if (commoditynewrecorData === undefined || commoditynewrecorData === null) {
      return
    }
    commoditynewrecordChild = commoditynewrecorData.children
    if (commoditynewrecordChild === undefined || commoditynewrecordChild === null) {
      return
    }
    auditData = commoditynewrecordChild.find(d => d.rePath === 'audit')
    batchauditData = commoditynewrecordChild.find(d => d.rePath === 'batch-audit')
    if (auditData !== undefined && auditData !== null) {
      this.isShowaudit = true
    }
    if (batchauditData !== undefined && auditData !== null) {
      this.isShowbatchaudit = true
    }
    console.log(this.listQuery.auditStatus + '__________________________')
  },
  beforeRouteLeave(to, from, next) {
    const name = `applyRecordEdit`
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
    // 撤回
    handleGoback(ids) {
      const data = {
        auditStatus: 3,
        ids: [ids],
        userName: this.name
      }
      setAuditGoods(data).then(res => {
        this.$message({
          message: '数据已撤回到【待提交审核】页面',
          type: 'success'
        })
        this.listQuery.auditStatus = 3
        this.getList()
      })
    },
    onGetCheck(form) {
      console.log(form)
      const ids = []
      this.multipleSelection.map(v => {
        ids.push(v.id)
      })

      // 提交审核
      const data = {
        auditReason: '',
        auditStatus: form.result === 1 ? 1 : 0,
        ids: ids,
        userName: this.name,
        queryDTO: {
          ...this.listQuery,
          origin: 2
        }
      }

      if (form.result === 2) {
        this.listQuery.auditStatus = 0
        if (form.reason === 1) {
          data.auditReason = '海典健康微商城平台已存在改商品'
        } else if (form.reason === 2) {
          data.auditReason = '商品信息不够规范合格'
        } else if (form.reason === 3) {
          data.auditReason = '其他原因'
        }
      } else {
        this.listQuery.auditStatus = 1
      }
      setAuditGoods(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })

        this.getList()
      })
    },
    handleBatchCheck() {
      if (this.multipleSelection.length === 0) {
        this.checkDialogTips = '确定要批量审核全部数据吗？'
        this.isShowCheckDialog = true
        return
      } else {
        this.$refs.checkDialog.show(true)
      }
    },
    handleCurrentChange(row) {
      sessionStorage.setItem('mate', JSON.stringify(row))
      this.$router.push(
        '/goods-manage/apply-record-edit?id=' +
          row.id +
          '&backUrl=apply-record' +
          '&type=query&state=check'
      )
    },
    onLook(url) {
      this.srcList = [`${this.showImg(url)}?x-oss-process=style/w_800`]
      this.isShowImg = true
    },
    onCloseImg() {
      this.isShowImg = false
    },
    resetQuery() {
      this.listQuery = {
        approvalNumber: '',
        auditStatus: this.listQuery.auditStatus,
        barCode: '',
        erpCode: '',
        manufacture: '',
        merCode: '',
        erpOrName: '',
        origin: this.listQuery.origin,
        groupId: ''
      }
      this.groupId = ['']
      this.getList()
    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows
    },
    handleQuery(id) {
      this.isToEdit = true
      this.$router.push(
        '/goods-manage/apply-record-edit?id=' +
          id +
          '&backUrl=apply-record' +
          '&type=query'
      )
    },
    handleEdit(id, auditStatus) {
      this.isToEdit = true
      this.$router.push(
        `/goods-manage/apply-record-edit?id=${id}&backUrl=apply-record&source=1&type=${auditStatus}`
      )
    },
    async handleCheckDialog() {
      if (this.listQuery.auditStatus === 2) {
        this.$refs.checkDialog.show(true)
      } else {
        // 提交审核
        const data = {
          ids: [],
          userName: this.name,
          auditStatus: 2,
          queryDTO: {
            ...this.listQuery,
            origin: 2
          }
        }
        await setAuditGoods(data)
        this.$message({
          message: '提交审核完成，可在【审核中】页面查看',
          type: 'success'
        })

        this.listQuery.auditStatus = 2
        this.getList()
        this.isShowCheckDialog = false
      }
    },
    async handleSendCheck(row, isAll) {
      let ids = []
      if (row === null && isAll) {
        if (this.multipleSelection.length === 0) {
          this.checkDialogTips = '确定要提交审核全部数据吗？'
          this.isShowCheckDialog = true
          return
        }
        this.multipleSelection.map(v => {
          ids.push(v.id)
        })
      } else {
        ids = [row.id]
      }
      // 提交审核
      const data = {
        ...this.listQuery,
        auditStatus: 2,
        ids: ids,
        userName: this.name
      }
      await setAuditGoods(data)
      this.$message({
        message: '提交审核完成，可在【审核中】页面查看',
        type: 'success'
      })

      this.listQuery.auditStatus = 2
      this.getList()
    },
    getList() {
      this.loading = true
      const params = Object.assign({}, this.listQuery)
      if (this.listQuery.auditStatus === -1) {
        // 待完善
        params.auditStatus = ''
        params.infoFlag = false
        params.origin = 2
      } else if (this.listQuery.auditStatus === 3) {
        // 待提交审核
        params.infoFlag = true
        params.origin = 2
      } else {
        params.origin = 2
      }
      params.times = Date.parse(new Date())
      getNewGoodsRecord({ ...params, level: 3 })
        .then(res => {
          this.loading = false
          const { data, totalCount } = res.data
          if (data.length === 0 && this.listQuery.currentPage !== 1) {
            this.listQuery.currentPage = 1
            this.getList()
          }
          if (data) {
            this.tableData = data
            this.total = totalCount
          }
        })
        .catch(_ => {
          this.loading = false
        })
    },
    handleBatchDel() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择要删除的数据',
          type: 'warning'
        })
        return
      }
      const ids = []
      this.multipleSelection.map(v => {
        ids.push(v.id)
      })
      const data = {
        commIds: ids,
        modifyName: this.name
      }
      this._DelPost(data)
    },
    handleDel(row) {
      // 单个删除
      const data = {
        commIds: [row.id],
        modifyName: this.name
      }
      this._DelPost(data)
    },
    handleChangeGroup(val) {
      this.listQuery.groupId = val[val.length - 1]
      this.getList()
    },
    _DelPost(data) {
      this.$confirm('删除后该数据将无法恢复，确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteGoods(data).then(res => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getList()
          })
        })
        .catch(() => {})
    },
    _loadTypeList() {
      // 获取分组
      getTypeTree({ merCode: this.merCode, type: 2, use: true }).then(res => {
        this.groupData = res.data
        this.groupData.unshift({ name: '全部', id: '' })
      })
    }
  }
}
</script>
