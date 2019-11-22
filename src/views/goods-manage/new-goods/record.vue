<template>
  <div class="app-container">
    <div class="record-wrapper">
      <el-radio-group
        v-model="listQuery.auditStatus"
        size="small"
        @change="getList"
      >
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="-1">待完善</el-radio-button>
        <el-radio-button label="3">待提交审核</el-radio-button>
        <el-radio-button label="2">待审核</el-radio-button>
        <el-radio-button label="1">已通过</el-radio-button>
        <el-radio-button label="0">已拒绝</el-radio-button>
      </el-radio-group>
      <section @keydown.enter="getList">
        <div
          class="search-form"
          style="margin-top:20px;margin-bottom:10px"
        >
          <div class="search-item">
            <span class="label-name">商品信息</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="listQuery.manufacture"
              size="small"
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuery.barCode"
              size="small"
              placeholder="条形码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="listQuery.approvalNumber"
              size="small"
              placeholder="批准文号"
            />
          </div>
          <div class="search-item">
            <el-button type="primary" size="small" @click="getList">查询</el-button>
            <el-button type="" size="small" @click="resetQuery">重置</el-button>
            <el-button type="danger" size="small" @click="handleBatchDel">删除</el-button>
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
          <el-table-column
            type="selection"
            width="55"
          />
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
                  :src="showImg(scope.row.mainPic)"
                  lazy
                  fit="contain"
                  :preview-src-list="[`${showImg(scope.row.mainPic)}`]"
                />
              </template>
              <template v-else>
                <p class="">暂未上传</p>
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
                <span v-for="(item,index) in scope.row.specSkuList" :key="index">
                  {{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}
                </span>
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
            min-width="250"
          >
            <template slot-scope="scope">
              <template v-if="scope.row.infoStatus===15&&scope.row.auditStatus!==2&&scope.row.auditStatus!==1&&scope.row.auditStatus!==0">
                <el-button type="primary" size="mini" @click="handleSendCheck(scope.row)">提交审核</el-button>
              </template>
              <template v-else-if="scope.row.infoStatus===15&&scope.row.auditStatus==0">
                <el-button type="primary" size="mini" @click="handleSendCheck(scope.row)">重新申请</el-button>
              </template>
              <template v-else>
                <a :href="`#/goods-manage/edit?id=${scope.row.id}&type=query`">
                  <el-button type="" size="mini">查看</el-button>
                </a>
              </template>
              <template v-if="scope.row.origin===1||listQuery.auditStatus==='-1'||((scope.row.infoStatus<=15)&&(scope.row.auditStatus!==1&&scope.row.auditStatus!==2&&scope.row.auditStatus!==0))">
                <a :href="`#/goods-manage/edit?id=${scope.row.id}`">
                  <el-button type="" size="mini">完善信息</el-button>
                </a>
              </template>
              <template v-if="scope.row.auditStatus===0">
                <a :href="`#/goods-manage/edit?id=${scope.row.id}`">
                  <el-button type="" size="mini">编辑</el-button>
                </a>
              </template>
              <el-button v-if="scope.row.auditStatus!==1" type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import { getNewGoodsRecord, deleteGoods } from '@/api/new-goods'
import { setAuditGoods } from '@/api/examine'
import { mapGetters } from 'vuex'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      radio3: '',
      tableData: [],
      total: 0,
      loading: false,
      listQuery: {
        'approvalNumber': '',
        'auditStatus': '',
        'barCode': '',
        'erpCode': '',
        'manufacture': '',
        'merCode': '',
        'name': '',
        'origin': 0
      },
      multipleSelection: []
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this.getList()
  },
  methods: {
    resetQuery() {
      this.listQuery = {
        'approvalNumber': '',
        'auditStatus': this.listQuery.auditStatus,
        'barCode': '',
        'erpCode': '',
        'manufacture': '',
        'merCode': '',
        'name': '',
        'origin': this.listQuery.origin
      }
      this.getList()
    },
    handleSelectionChange(rows) {
      this.multipleSelection = rows
    },
    handleSendCheck(row, status) { // 提交审核
      const data = {
        'auditStatus': '2',
        'ids': [
          row.id
        ],
        'userName': this.name
      }
      setAuditGoods(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        if (this.listQuery.auditStatus === '0') {
          this.$router.push(`/goods-manage/edit?id=${row.id}`)
        }
        this.getList()
      })
    },
    getList() {
      this.loading = true
      const data = JSON.parse(JSON.stringify(this.listQuery))
      if (this.listQuery.auditStatus === '-1') { // 待完善
        data.auditStatus = ''
        data.infoFlag = false
        data.origin = 1
      } else if (this.listQuery.auditStatus === '3') { // 待提交审核
        data.infoFlag = true
        data.origin = 0
      } else {
        data.origin = 0
      }
      getNewGoodsRecord(data).then(res => {
        this.loading = false
        const { data, totalCount } = res.data
        if (data) {
          this.tableData = data
          this.total = totalCount
        }
      }).catch(_ => {
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
        ids: ids,
        modifyName: this.name
      }
      this._DelPost(data)
    },
    handleDel(row) { // 单个删除
      const data = {
        ids: [row.id],
        modifyName: this.name
      }
      this._DelPost(data)
    },
    _DelPost(data) {
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGoods(data).then(res => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        })
      }).catch(() => {})
    }
  }
}
</script>
