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
          <el-input v-model.trim="keyword" size="small" placeholder="商品名称" />
        </div>
        <div class="search-item">
          <el-button type="primary" size="small" @click="getList">查询</el-button>
        </div>
      </div>
      <div class="table-box">
        <el-table v-loading="loading" :data="tableData" stripe style="width: 100%">
          <el-table-column align="left" min-width="140" prop="erpCode" label="商品编码">
            <template slot-scope="scope">
              <div>
                <p :title="scope.row.erpCode">{{ scope.row.erpCode }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="70" label="商品图片">
            <template slot-scope="scope">
              <div v-if="scope.row.mainPic && scope.row.mainPic!==''" width="60" height="60">
                <div class="x-image__preview">
                  <el-image
                    fit="scale-down"
                    :src="showImg(scope.row.mainPic)"
                    :preview-src-list="[showImg(scope.row.mainPic)]"
                  />
                </div>
              </div>
              <div v-else style="line-height: 32px">暂未上传</div>
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            align="left"
            label="商品名称"
            :show-overflow-tooltip="true"
            min-width="110"
          >
            <template slot-scope="scope">
              <div>
                <p class="ellipsis" :title="scope.row.name">{{ scope.row.name }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="mprice"
            align="left"
            label="参考价(元)"
            :show-overflow-tooltip="true"
            min-width="80"
          />
          <el-table-column prop="price" label="售价(元)" align="left" min-width="80" />
          <el-table-column align="left" min-width="80" label="限购数量">
            <template slot-scope="scope">
              <div>{{ scope.row.limitNum?scope.row.limitNum:'不限购' }}</div>
            </template>
          </el-table-column>
          <el-table-column prop="modifyTime" align="left" min-width="110" label="修改时间" />
          <el-table-column align="left" min-width="150" label="操作">
            <template slot-scope="scope">
              <!-- <el-button type="primary" size="mini" @click.stop="toSelectShops">上下架</el-button> -->
              <el-button type="primary" size="mini" @click="handleUpDown(1,scope.row)">上架</el-button>
              <el-button type="info" size="mini" @click="handleUpDown(0,scope.row)">下架</el-button>
              <el-button type size="mini" @click="createSon(scope.row.id)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="searchParams.currentPage"
            :limit.sync="searchParams.pageSize"
            @pagination="getList"
          />
        </div>
      </div>
    </div>

    <!--弹窗--选择门店-->
    <dialog-shops ref="shopsDialog" :list="[]" @confirm="shopsSelectChange" />
    <!--弹窗--上下架-->
    <store :status="status" :choose-num="specData.length" :spec-data="specData" :is-show="dialogVisible" @close="dialogVisible=false" @complete="dialogVisible=false" />
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import { getConstituteGoodsList } from '@/api/constitute-goods'
import dialogShops from './components/dialog-shops'
import store from '../components/store'
export default {
  components: { Pagination, dialogShops, store },
  mixins: [mixins],
  data() {
    return {
      radio3: '1',
      keyword: '',
      tableData: [],
      loading: false,
      shopsData: [],
      searchParams: {
        merCode: null,
        currentPage: 1,
        pageSize: 20,
        name: null
      },
      specData: [],
      status: 0,
      dialogVisible: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.loading = true
      this.searchParams.merCode = this.merCode
      this.searchParams.name = this.keyword
      getConstituteGoodsList(this.searchParams)
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
    createSon(rowData) {
      this.$router.push({
        path: `/goods-manage/constitute-goods/edit`,
        query: { mercode: this.merCode, id: rowData }
      })
    },
    shopsSelectChange(list) {
      console.log('list', list)
      this.shopsData = list
      this.$refs.shopsDialog.close()
    },
    // 选取门店
    toSelectShops() {
      this.$refs.shopsDialog.open()
    },
    goodsSelectChange(list) {
      console.log('list', list)
      this.goodsData = list
      this.$refs.goodsDialog.close()
    },
    handleUpDown(status, row) { // 单个上下架
      this.specData = [`${row.specId}`]
      this.status = status
      this.dialogVisible = true
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
.ellipsis{ width:100%;overflow: hidden; text-overflow: ellipsis;white-space: nowrap}
.el-tag.el-tag--info {
    word-break: break-all;
    word-wrap: break-word;
    white-space: pre-wrap;
    height: inherit;
    margin-bottom: 5px;
}
.el-image img{
  width: 55px;
  height: 55px;
}
</style>
