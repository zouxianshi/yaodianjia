<template>
  <div class="app-container">
    <div class="examine-wrapper">
      <el-radio-group
        v-model="radio3"
        size="small"
      >
        <el-radio-button label="1">中西医药新品审核</el-radio-button>
        <el-radio-button label="2">营养保健新品审核</el-radio-button>
        <el-radio-button label="3">医疗器械新品审核</el-radio-button>
      </el-radio-group>
      <div
        class="search-form"
        style="margin-top:20px;margin-bottom:10px"
      >
        <div class="search-item">
          <span class="label-name">连锁信息</span>
          <el-input
            v-model.trim="keyword"
            size="small"
            placeholder="商品名称"
          />
        </div>
        <div class="search-item">
          <span class="label-name">商品信息</span>
          <el-input
            v-model.trim="keyword"
            size="small"
            placeholder="生产企业"
          />
        </div>
        <div class="search-item">
          <span class="label-name">生产企业</span>
          <el-input
            v-model.trim="keyword"
            size="small"
            placeholder="商品编码"
          />
        </div>
        <div class="search-item">
          <span class="label-name">条形码</span>
          <el-input
            v-model.trim="keyword"
            size="small"
            placeholder="商品编码"
          />
        </div>
      </div>
      <div class="search-form">
        <div class="search-item">
          <span class="label-name">批准文号</span>
          <el-input
            v-model.trim="keyword"
            size="small"
            placeholder="商品名称"
          />
        </div>
        <div class="search-item">
          <el-button
            type=""
            size="small"
          >查询</el-button>
        </div>
      </div>
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
            label="商品图片"
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
            prop="orName"
            align="left"
            min-width="120"
            :show-overflow-tooltip="true"
            label="商品信息"
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
            prop="address"
            label="商品编码"
            align="left"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="申请时间"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="155"
            label="申请人"
          />
          <el-table-column
            prop="address"
            align="left"
            fixed="right"
            label="操作"
            min-width="100"
          >
            <template>
              <!-- <el-button type="" size="mini" @click="handleListEdit(scope.row)">编辑</el-button> -->
              <el-button
                type="primary"
                size="small"
                @click="handleClick"
              >查看</el-button>
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
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      radio3: '1',
      keyword: '',
      tableData: [{

      }],
      loading: false
    }
  },
  created() {

  },
  methods: {
    getList() {

    },
    handleClick() {
      this.$router.push('/goods-manage/mate')
    }
  }
}
</script>
    <style lang="scss">
.examine-wrapper {
  .search-form {
    .search-item {
      .label-name {
        width: 60px;
      }
      .el-input {
        width: 180px;
      }
    }
  }
}
</style>
