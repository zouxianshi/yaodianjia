<template>
  <div class="app-container">
    <div class="group-wrapper">
      <el-alert title="商家可根据自身要求，自定义多个分组，适用于不同节日的营销设置不同的商城分组导航分组" type="warning" :closable="false" />
      <div style="margin-top:10px">
        <el-button type="primary" size="small">新建分组</el-button>
      </div>
      <div class="table-box">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            prop="date"
            label="序号"
            width="60"
          />
          <el-table-column
            prop="name"
            label="姓名"
            width="分组标题"
          />
          <el-table-column
            prop="address"
            label="子分类数"
          />
          <el-table-column
            prop="address"
            label="商品数"
          />
          <el-table-column
            prop="address"
            label="创建人"
          />
          <el-table-column
            prop="address"
            label="创建时间"
          />
          <el-table-column
            prop="address"
            label="修改人"
          />
          <el-table-column
            prop="address"
            label="修改时间"
          />
          <el-table-column
            prop="address"
            label="状态"
          />
          <el-table-column
            label="操作"
          >
            <template>
              <el-button type="" size="small">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <pagination
        :total="total"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
        @pagination="getList"
      />
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      total: 0,
      tableData: []
    }
  },
  created() {

  },
  methods: {
    getList() {

    }
  }
}
</script>

