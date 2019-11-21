<template>
  <div class="app-container">
    <div class="examine-wrapper">
      <el-radio-group
        v-model="listQuery.typeId"
        size="small"
        @change="getList"
      >
        <el-radio-button label="1065279ca65a4a529109f82472f11053">中西医药新品审核</el-radio-button>
        <el-radio-button label="fb5e6c99d2a24eb79dae4350d9bfa837">营养保健新品审核</el-radio-button>
        <el-radio-button label="a99917a7c7254ac281e844acf1610657">医疗器械新品审核</el-radio-button>
      </el-radio-group>
      <div
        class="search-form"
        style="margin-top:20px;margin-bottom:10px"
        @keydown.enter="getList"
      >
        <div class="search-item">
          <span class="label-name">商品编码</span>
          <el-input
            v-model.trim="listQuery.erpCode"
            size="small"
            placeholder="商品编码"
          />
        </div>
        <div class="search-item">
          <span class="label-name">商品名称</span>
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
      </div>
      <div class="search-form">
        <div class="search-item">
          <span class="label-name">批准文号</span>
          <el-input
            v-model.trim="listQuery.approvalNumber"
            size="small"
            placeholder="批准文号"
          />
        </div>
        <div class="search-item">
          <el-button
            type="primary"
            size="small"
            @click="getList"
          >查询</el-button>
          <el-button type="" size="small" @click="resetQuery">重置</el-button>
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
            align="left"
            min-width="160"
            show-overflow-tooltip
            label="商品信息"
          >
            <template slot-scope="scope">
              <span> {{ scope.row.name }}</span>
              <span v-for="(item,index) in scope.row.specSkuList" :key="index">
                {{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}
              </span>
            </template></el-table-column>
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
            min-width="120"
          />
          <el-table-column
            prop="approvalNumber"
            align="left"
            label="批准文号"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="erpCode"
            label="商品编码"
            align="left"
            min-width="130"
          />
          <el-table-column
            prop="auditTime"
            align="left"
            min-width="155"
            label="申请时间"
          />
          <el-table-column
            prop="createName"
            align="left"
            min-width="155"
            label="申请人"
          />
          <el-table-column
            prop="createName"
            align="left"
            label="操作"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button size="mini" @click="handleCurrentChange(scope.row)">查看</el-button>
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
      tableData: [{

      }],
      loading: false,
      listQuery: {
        'approvalNumber': '',
        'barCode': '',
        'erpCode': '',
        'manufacture': '',
        'name': '',
        'typeId': '1065279ca65a4a529109f82472f11053'
      }
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
        'erpCode': '',
        'manufacture': '',
        'name': '',
        'typeId': this.listQuery.typeId
      }
      this.getList()
    },
    getList() {
      this.loading = true
      getAuditList(this.listQuery).then(res => {
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
