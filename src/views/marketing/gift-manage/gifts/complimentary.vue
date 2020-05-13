<template>
  <div class="app-container">
    <el-button class="btn btn-add" type="primary" size="small" @click="jumpeCreateUrl">新建赠品</el-button>
    <section style="margin-top: 10px">
      <el-form :inline="true" size="small" :model="form" class="demo-form-inline">
        <el-form-item label="赠品名称">
          <el-input v-model="form.name" clearable placeholder="赠品名称" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="_getTableData">查询</el-button>
        </el-form-item>
      </el-form>
    </section>
    <section class="table-box webkit-scroll" style="overflow: auto">
      <el-table v-loading="listLoading" :data="tableData" style="width: 100%; height: 100%">
        <el-table-column label="赠品名称" show-overflow-tooltip>
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="总库存" align="center">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.stock?scope.row.stock:0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="已发放" align="center">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.provideNum?scope.row.provideNum:0 }}</span>
          </template>
        </el-table-column>
        <el-table-column label="剩余库存" align="center">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.leaveStock }}</span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="每人限领" width="100">
          <template slot-scope="scope">
            <span size="small" type="info">{{ scope.row.limitCount===0?'不限次数':scope.row.limitCount }}</span>
          </template>
        </el-table-column>-->
        <el-table-column label="操作" width="200" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="toLook(scope.row)">查看</el-button>
            <el-divider direction="vertical" />
            <el-button type="text" @click="toAdd(scope.row)">增加库存</el-button>
            <!-- <el-divider direction="vertical" />
            <el-button disabled type="text" @click="toEdit(scope.row)">清空库存</el-button>-->
          </template>
        </el-table-column>
        <div slot="empty">
          <no-data />
        </div>
      </el-table>
    </section>
    <section class="c-footer">
      <el-pagination
        background
        :current-page="pager.current"
        :page-sizes="[10, 20, 30, 50]"
        :page-size="pager.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </section>
    <!-- 增加库存 -->
    <el-dialog title="增加赠品库存" :visible.sync="dialogFormVisible" append-to-body @close="reset">
      <el-form :model="form" label-width="120px">
        <el-form-item label="增加数量：">
          <el-input-number
            v-model="dialogForm.count"
            style="width: 150px; margin-right: 8px"
            :step="1"
            step-strictly
            :min="0"
            :max="9999999999"
            autocomplete="off"
          />个
        </el-form-item>
        <el-form-item label>
          <el-alert
            :closable="false"
            :title="`剩余活动库存（${dialogForm.leaveStock || 0 + dialogForm.count || 0}）个`"
            type="success"
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="toAddSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getActGiftList, ActGiftAddStock } from '@/api/activity'
import noData from '@/components/NoData'
export default {
  components: {
    noData
  },
  data() {
    return {
      tableData: [],
      pager: {
        current: 1,
        total: 0,
        size: 20
      },
      listLoading: false,
      form: {},
      dialogForm: {
        count: 0
      },
      dialogFormVisible: false
    }
  },
  created() {
    console.log('this.$route.params.id', this.$route.params.id)
    this.fetchData()
  },
  methods: {
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
      this.pager.current = val
      this.updatePager({
        current: val
      })
      this._getTableData()
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
      this.updatePager({
        size: val || 20
      })
      this._getTableData()
    },
    fetchData() {
      this._getTableData()
    },
    // 获取列表数据
    _getTableData() {
      this.listLoading = true
      const params = {
        currentPage: this.pager.current,
        pageSize: this.pager.size,
        name: this.form.name
      }
      getActGiftList(params)
        .then(res => {
          const { data } = res
          this.tableData = Array.isArray(data.data) ? data.data : []
          this.pager.current = data.currentPage
          this.pager.size = data.pageSize
          this.pager.total = data.totalCount
          this.listLoading = false
        })
        .catch(e => {
          this.listLoading = false
        })
    },
    toLook(row) {
      this.$store.dispatch('tagsView/delCachedView', {
        name: 'GiftsComplimentaryCreate'
      })
      setTimeout(() => {
        this.$router.push(
          `/marketing/gifts/complimentary-edit?id=${row.id}&_ck=1`
        )
      }, 0)
    },
    toEdit(row) {
      this.$store.dispatch('tagsView/delCachedView', {
        name: 'GiftsComplimentaryCreate'
      })
      setTimeout(() => {
        this.$router.push(`/marketing/gifts/complimentary-edit?id=${row.id}`)
      }, 0)
    },
    jumpeCreateUrl() {
      this.$store.dispatch('tagsView/delCachedView', {
        name: 'GiftsComplimentaryCreate'
      })
      setTimeout(() => {
        this.$router.push('/marketing/gifts/complimentary-edit')
      }, 0)
    },
    toAdd(row) {
      console.log('1111111', row)
      this.dialogFormVisible = true
      this.dialogForm = {
        ...row,
        ...this.dialogForm
      }
    },
    reset() {
      console.log('点击关闭了')
      this.dialogForm = {
        count: 0
      }
    },
    toAddSubmit() {
      ActGiftAddStock({
        count: this.dialogForm.count,
        id: this.dialogForm.id
      }).then(res => {
        console.log('1111111111111111111111', res)
        if (res.code === '10000') {
          this.dialogFormVisible = false
          this.reset()
          this.$message({
            type: 'success',
            message: '库存增加成功'
          })
          this._getTableData()
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-content {
  line-height: 30px;
  font-size: 14px;
}
.app-container {
  .el-table thead th {
    text-align: left;
  }
}
</style>
