<template>
  <div class="app-container">
    <div class="">
      <el-radio-group
        v-model="radio3"
        size="small"
      >
        <el-radio-button label="1">未对码</el-radio-button>
        <el-radio-button label="2">已对码</el-radio-button>
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
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品编码</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品编码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品名称"
            />
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品编码</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品编码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品名称"
            />
          </div>
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">导入时间</span>
            <el-date-picker
              v-model="listQuery.value"
              size="small"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            />
          </div>
          <div class="search-item">
            <el-button
              type=""
              size="small"
            >查询</el-button>
            <el-button type="danger" size="small">批量删除</el-button>
          </div>
        </div>
      </section>
      <div class="table-box">
        <el-table
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
        >
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商品编号"
          />
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商名称"
            show-overflow-tooltip
          />
          <el-table-column
            prop="orName"
            align="left"
            min-width="120"
            label="规格"
          />
          <el-table-column
            align="left"
            min-width="120"
            label="生产企业"
          />
          <el-table-column
            prop="orParentName"
            align="left"
            label="条形码"
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
            prop="createTime"
            align="left"
            min-width="105"
            label="导入状态"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="失败原因"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="105"
            label="操作人"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="105"
            label="操作"
          />
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
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      radio3: '1',
      listQuery: {
        name: ''
      },
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
