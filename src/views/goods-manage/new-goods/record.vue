<template>
  <div class="app-container">
    <div class="record-wrapper">
      <el-radio-group
        v-model="listQuquery.auditStatus"
        size="small"
      >
        <el-radio-button label="">全部</el-radio-button>
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
              v-model.trim="listQuquery.name"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="listQuquery.manufacture"
              size="small"
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuquery.barCode"
              size="small"
              placeholder="商品编码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="listQuquery.approvalNumber"
              size="small"
              placeholder="商品编码"
            />
          </div>
          <div class="search-item">
            <el-button type="" size="small">查询</el-button>
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
            min-width="120"
            label="商品/规格"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              >
              <span>{{ scope.row.name }}{{ scope.row.packStandard }}</span>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            min-width="120"
            prop="manufacture"
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
            label="批准的文号"
            :show-overflow-tooltip="true"
            min-width="160"
          />
          <el-table-column
            prop="platformCode"
            align="left"
            label="商品编码"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="申请时间"
          />
          <el-table-column
            prop="address"
            align="left"
            fixed="right"
            label="操作"
            min-width="100"
          >
            <template slot-scope="scope">
              <el-button type="" size="mini">查看</el-button>
              <el-button
                type="danger"
                size="mini"
                @click="handleDel(scope.row)"
              >删除</el-button>
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
      listQuquery: {
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
    handleSelectionChange(rows) {
      this.multipleSelection = rows
    },
    getList() {
      this.loading = true
      getNewGoodsRecord(this.listQuquery).then(res => {
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
        })
      }).catch(() => {})
    }
  }
}
</script>
