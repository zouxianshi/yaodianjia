<template>
  <div class="app-container">
    <div class="import-wrapper">
      <el-button
        type="primary"
        size="small"
      >批量导入</el-button>
      <el-divider />
      <div class="search-form">
        <div class="search-item">
          <span class="label-name">导入时间</span>
          <el-date-picker
            v-model="value1"
            size="small"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </div>
      </div>
      <div class="search-form">
        <div class="search-item">
          <span class="label-name">商品名称</span>
          <el-input
            v-model="value1"
            size="small"
            placeholder="商品名称"
          />
        </div>
        <div class="search-item">
          <span class="label-name">生产企业</span>
          <el-input
            v-model="value1"
            size="small"
            placeholder="生产企业"
          />
        </div>
        <div class="search-item">
          <span class="label-name">商品编码</span>
          <el-input
            v-model="value1"
            size="small"
            placeholder="商品编码"
          />
        </div>
      </div>
      <div class="search-form">
        <div class="search-item">
          <span class="label-name">条形码</span>
          <el-input
            v-model="value1"
            size="small"
            placeholder="商品名称"
          />
        </div>
        <div class="search-item">
          <span class="label-name">批准文号</span>
          <el-input
            v-model="value1"
            size="small"
            placeholder="生产企业"
          />
        </div>
      </div>
      <div class="between">
        <el-radio-group v-model="radio" size="small">
          <el-radio-button label="1">导入成功</el-radio-button>
          <el-radio-button label="0">导入失败</el-radio-button>
        </el-radio-group>
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
        >全部删除</el-button>
      </div>
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
            label="商品编码"
            show-overflow-tooltip
          />
          <el-table-column
            prop="orName"
            align="left"
            min-width="120"
            :show-overflow-tooltip="true"
            label="商品名称"
          />
          <el-table-column
            align="left"
            min-width="120"
            label="规格"
          />
          <el-table-column
            prop="orParentName"
            align="left"
            label="条形码"
            :show-overflow-tooltip="true"
            min-width="160"
          />
          <el-table-column
            prop="headPerson"
            align="left"
            label="生产企业"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="headPerson"
            align="left"
            label="批准文号"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="headPerson"
            align="left"
            label="导入状态"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="headPerson"
            align="left"
            label="失败原因"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="headPerson"
            align="left"
            label="操作人"
            :show-overflow-tooltip="true"
            min-width="120"
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
        <pagination
          :total="total"
          :page.sync="listQuery.page"
          :limit.sync="listQuery.limit"
          @pagination="getList"
        />
      </div>
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
      value1: '',
      radio: 1,
      tableData: [],
      loading: false,
      total: 0
    }
  },
  created() {

  },
  methods: {
    getList() {

    },
    handleSelectionChange(rows) {

    }
  }
}
</script>
<style lang="scss" scoped>
.search-form {
  margin-bottom: 10px;
  .el-input {
    width: 200px;
  }
  .search-item {
    .label-name {
      text-align: left;
      width: 60px;
    }
  }
}
.between{
    display: flex;
    justify-content: space-between
}
</style>
