<template>
  <div class="app-container">
    <div class="record-wrapper">
      <el-radio-group
        v-model="radio3"
        size="small"
      >
        <el-radio-button label="">未提交审核</el-radio-button>
        <el-radio-button label="2">待审核</el-radio-button>
        <el-radio-button label="3">已通过</el-radio-button>
        <el-radio-button label="3">已拒绝</el-radio-button>
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
              v-model.trim="listQuquery.name"
              size="small"
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuquery.name"
              size="small"
              placeholder="商品编码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="listQuquery.name"
              size="small"
              placeholder="商品编码"
            />
          </div>
          <div class="search-item">
            <el-button type="" size="small">查询</el-button>
            <el-button type="danger" size="small">删除</el-button>
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
            align="left"
            min-width="120"
            label="生产企业"
          />
          <el-table-column
            prop="orParentName"
            align="left"
            label="条形码"
            :show-overflow-tooltip="true"
            min-width="160"
          />
          <el-table-column
            prop="orParentName"
            align="left"
            label="批准的文号"
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
              <!-- <el-button type="" size="mini" @click="handleListEdit(scope.row)">编辑</el-button> -->
              <el-button
                size="mini"
                @click="handleCommand(1,scope.row)"
              >完善信息</el-button>
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

      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    handleSelectionChange(rows) {

    },
    getList() {

    }
  }
}
</script>
