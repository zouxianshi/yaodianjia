<template>
  <div class="app-container">
    <div class="">
      <div style="margin-bottom:10px">
        <a href="#/goods-manage/import">
          <el-button type="primary" size="small">批量导入</el-button>
        </a>
      </div>
      <el-radio-group
        v-model="listQuery.status"
        size="small"
        @change="getList"
      >
        <el-radio-button :label="0">未对码</el-radio-button>
        <el-radio-button :label="1">已对码</el-radio-button>
      </el-radio-group>
      <section @keydown.enter="getList">
        <div
          class="search-form"
          style="margin-top:20px;margin-bottom:10px"
        >
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品编码</span>
            <el-input
              v-model.trim="listQuery.erpCode"
              size="small"
              placeholder="商品编码"
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
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuery.barCode"
              size="small"
              placeholder="条形码"
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
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">导入时间</span>
            <el-date-picker
              v-model="time"
              size="small"
              type="daterange"
              value-format="yyyy-MM-dd HH:mm:ss"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              @change="handleTimeChange"
            />
          </div>
          <div class="search-item">
            <el-button type="primary" size="small" @click="getList">查询</el-button>
            <el-button type="" size="small" @click="resetQuery">重置</el-button>
            <el-button type="danger" size="small" @click="handleBatchDel">批量删除</el-button>
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
            prop="erpCode"
            align="left"
            min-width="120"
            label="商品编码"
          />
          <el-table-column
            align="left"
            min-width="120"
            label="商品名称"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <p class="ellipsis" v-text="scope.row.name" />
                <p v-if="listQuery.status===1&&scope.row.product" class="product ellipsis" v-text="scope.row.product.name" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            min-width="180"
            label="生产企业"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div>
                <p class="ellipsis" v-text="scope.row.manufacture" />
                <p v-if="listQuery.status===1&&scope.row.product" class="product ellipsis" v-text="scope.row.product.manufacture" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="条形码"
            :show-overflow-tooltip="true"
            min-width="120"
          >
            <template slot-scope="scope">
              <div>
                <p v-text="scope.row.barCode" />
                <p v-if="listQuery.status===1&&scope.row.product" class="product" v-text="scope.row.product.barCode" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            label="批准文号"
            :show-overflow-tooltip="true"
            min-width="130"
          >
            <template slot-scope="scope">
              <div class="ellipsis">
                <p class="ellipsis" v-text="scope.row.approvalNumber" />
                <p v-if="listQuery.status===1&&scope.row.product" class="product ellipsis" v-text="scope.row.product.approvalNumber" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            v-if="listQuery.status===0"
            prop="reason"
            align="left"
            show-overflow-tooltip=""
            min-width="120"
            label="失败原因"
          />
          <el-table-column
            v-if="listQuery.status===0"
            prop="modifyTime"
            align="left"
            min-width="155"
            label="导入时间"
          />
          <el-table-column
            prop="modifyName"
            align="left"
            min-width="120"
            label="操作人"
          />
          <el-table-column
            v-if="listQuery.status===1"
            prop="modifyTime"
            align="left"
            min-width="155"
            label="对码时间"
          />
          <el-table-column
            align="left"
            min-width="180"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <template v-if="listQuery.status===0">
                <el-button type="primary" size="mini" @click="handleMate(scope.row)">重新匹配</el-button>
                <el-button type="danger" size="mini" @click="handleDel(scope.row)">删除</el-button>
              </template>
              <template v-else>
                <el-button size="mini" @click="handleMate(scope.row)">查看</el-button>
              </template>
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
import { getImportList, deletePair } from '@/api/depot'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      time: '',
      listQuery: {
        'approvalNumber': '',
        'barCode': '',
        'endTime': '',
        'erpCode': '',
        'manufacture': '',
        'merCode': '',
        'name': '',
        'startTime': '',
        'status': 0
      },
      tableData: [],
      multipleSelection: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    resetQuery() {
      this.listQuery = {
        'approvalNumber': '',
        'barCode': '',
        'endTime': '',
        'erpCode': '',
        'manufacture': '',
        'merCode': '',
        'name': '',
        'startTime': '',
        'status': this.listQuery.status
      }
      this.getList()
    },
    getList() {
      this.loading = true
      this.tableData = []
      getImportList(this.listQuery).then(res => {
        const { data, totalCount } = res.data
        if (data) {
          this.tableData = data
          this.total = totalCount
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    handleBatchDel() { // 批量删除
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择你要删除的数据',
          type: 'warning'
        })
        return
      }
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = []
        this.multipleSelection.map(v => {
          data.push(v.id)
        })
        this._requestDel(data)
      }).catch(() => {})
    },
    handleDel(row) { // 删除数据
      this.$confirm('是否确认删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._requestDel([row.id])
      }).catch(() => {})
    },
    _requestDel(data) { // 执行删除请求
      deletePair({ ids: data }).then(res => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    handleSelectionChange(row) {
      this.multipleSelection = row
    },
    handleMate(row) {
      sessionStorage.setItem('mateList', JSON.stringify(this.tableData))
      sessionStorage.setItem('mate', JSON.stringify(row))
      this.$router.push(`/goods-manage/mate-details?id=${row.id}&from=${this.listQuery.status === 1 ? 'is_pair' : 'pair'}`)
    },
    handleTimeChange(val) {
      if (val) {
        this.listQuery.startTime = val[0]
        this.listQuery.endTime = val[1]
      } else {
        this.listQuery.startTime = ''
        this.listQuery.endTime = ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.product{
  color: #9999
}
</style>
