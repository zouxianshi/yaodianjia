<template>
  <div class="app-container">
    <div class="examine-wrapper">
      <div style="margin-bottom:20px">
        <a href="#/goods-manage/constitute-goods/edit">
          <el-button type="primary" size="small" icon="el-icon-circle-plus-outline">新增组合商品</el-button>
        </a>
      </div>

      <div class="search-form">
        <div class="search-item">
          <span class="label-name" style="width:80px">商品名称：</span>
          <el-input v-model.trim="listQuery.approvalNumber" size="small" placeholder="商品名称" />
        </div>
        <div class="search-item">
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </div>
      </div>
      <div class="table-box">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column align="left" min-width="150" label="商品编码">
            <template slot-scope="scope">
              <div>
                <p>{{ scope.row.name }}{{ scope.row.packStandard }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="120" prop="manufacture" label="商品图片" />
          <el-table-column
            prop="barCode"
            align="left"
            label="商品名称"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="approvalNumber"
            align="left"
            label="参考价(元)"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column prop="platformCode" label="售价(元)" align="left" />
          <el-table-column prop="createName" align="left" min-width="120" label="限购数量" />
          <el-table-column prop="createTime" align="left" min-width="120" label="修改时间" />
          <el-table-column prop="createTime" align="left" min-width="130" label="操作">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleUpDown(1,scope.row)">上下架</el-button>
              <a :href="`#/goods-manage/edit?id=${scope.row.id}`">
                <el-button type size="mini">编辑</el-button>
              </a>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.page"
            :limit.sync="listQuery.limit"
            @pagination="getList"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import { getAuditList } from '@/api/examine'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      radio3: '1',
      keyword: '',
      tableData: [{}],
      loading: false,
      listQuery: {
        approvalNumber: '',
        barCode: '',
        erpCode: '',
        manufacture: '',
        name: '',
        typeId: '1065279ca65a4a529109f82472f11053'
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      getAuditList(this.listQuery)
        .then(res => {
          this.loading = false
          const { data, totalCount } = res.data
          if (data) {
            this.tableData = data
            this.total = totalCount
          }
        })
        .catch(_ => {
          this.loading = false
        })
    },
    handleClick(row) {
      sessionStorage.setItem('mate', JSON.stringify(row))
      this.$router.push('/goods-manage/mate?id=' + row.id)
    },
    handleCurrentChange(row) {
      sessionStorage.setItem('mate', JSON.stringify(row))
      this.$router.push('/goods-manage/mate?id=' + row.id)
    }
  }
}
</script>
    <style lang="scss">
.examine-wrapper {
  .search-form {
    .search-item {
      .el-input {
        width: 180px;
      }
    }
  }
}
</style>
