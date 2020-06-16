<template>
  <div class="app-container">
    <div>
      <el-link type="warning" @click="dialogVisible=true">从标库新建商品规范说明?</el-link>
      <section class="addition-wrapper">
        <p class="title">从商品库新建商品</p>
        <el-divider />
        <section @keydown.enter="getList">
          <div class="search-form" style="margin-top:20px;margin-bottom:10px">
            <div class="search-item">
              <span class="label-name">商品名称</span>
              <el-input
                v-model.trim="listQuery.name"
                size="small"
                style="width:200px"
                placeholder="商品名称"
              />
            </div>
            <div class="search-item">
              <span class="label-name">生产企业</span>
              <el-input
                v-model.trim="listQuery.manufacture"
                size="small"
                style="width:200px"
                placeholder="生产企业"
              />
            </div>
          </div>
          <div class="search-form">
            <div class="search-item">
              <span class="label-name">条形码</span>
              <el-input
                v-model.trim="listQuery.barCode"
                size="small"
                style="width:200px"
                placeholder="条形码"
              />
            </div>
            <div class="search-item">
              <span class="label-name">批准文号</span>
              <el-input
                v-model.trim="listQuery.approvalNumber"
                size="small"
                style="width:200px"
                placeholder="批准文号"
              />
            </div>
            <div class="search-item">
              <el-button type="primary" size="small" @click="getList">查询</el-button>
              <el-button type size="small" @click="resetQuery">重置</el-button>
            </div>
          </div>
        </section>
        <el-alert type="warning" style="margin-bottom:10px" :closable="false">
          <p slot="title" class="alret-title">
            没有想要商品，去
            <router-link tag="span" class="link" to="/goods-manage/apply">创建自有新品</router-link>
          </p>
        </el-alert>
        <el-table v-loading="loading" :data="tableData" stripe>
          <template slot="empty">
            <div v-show="!loading" class="table-nodata">
              <p class="text-center">搜索无结果</p>
              <p class="text-center">
                未找到您要创建的商品，您可尝试其他名称搜索，您也可以自行创建标库没有的新品
                <router-link tag="span" to="/goods-manage/apply" class="link">自建新品</router-link>
              </p>
              <p class="text-center">自主创建的商品由运营人员自行审核上架</p>
            </div>
          </template>
          <el-table-column label="序号" type="index" min-width="60" />
          <el-table-column
            prop="orCode"
            align="left"
            min-width="100"
            label="商品图片"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.mainPic">
                <el-image
                  style="width: 70px; height: 70px"
                  :src="showImg(scope.row.mainPic)+'?x-oss-process=style/w_80'"
                  lazy
                  fit="contain"
                  :preview-src-list="[`${showImg(scope.row.mainPic)}?x-oss-process=style/w_800`]"
                />
              </template>
              <template v-else>
                <p class>暂未上传</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="商品信息" min-width="120" show-overflow-tooltip>
            <template slot-scope="scope">
              <div>
                <p class="ellipsis" v-text="scope.row.name" />
                <p class="ellipsis">
                  <span
                    v-for="(item,index) in scope.row.specSkuList"
                    :key="index"
                  >{{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}</span>
                </p>
                <p class="ellipsis" v-text="scope.row.approvalNumber" />
              </div>
            </template>
          </el-table-column>
          <el-table-column label="条码" prop="barCode" />
          <el-table-column label="生产企业" prop="manufacture" show-overflow-tooltip />
          <el-table-column label="品牌" prop="brandName" />
          <el-table-column label="商品分类" min-width="140">
            <template slot-scope="scope">
              <span v-text="scope.row.multilevelType||'-'" />
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right">
            <template slot-scope="scope">
              <el-button
                type="primary"
                :loading="scope.row.loading"
                size="mini"
                @click="handleSetStore(scope.row)"
              >添加该商品</el-button>
            </template>
          </el-table-column>
        </el-table>
        <pagination
          :total="total"
          style="background:#f6f7fb"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="getList"
        />
      </section>
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        append-to-body
        width="30%"
        :show-close="false"
      >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" size="small" @click="dialogVisible = false">知道了</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import { getProductList, setComAddGoods } from '@/api/depot'
import { mapGetters } from 'vuex'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      keyword: '',
      tableData: [],
      dialogVisible: false,
      listQuery: {
        approvalNumber: '',
        barCode: '',
        manufacture: '',
        name: ''
      }
    }
  },
  computed: {
    ...mapGetters(['name', 'merCode'])
  },
  created() {
    this.getList()
  },
  methods: {
    resetQuery() {
      this.listQuery = {
        approvalNumber: '',
        barCode: '',
        manufacture: '',
        name: ''
      }
      this.getList(null)
    },
    getList(rowId) {
      this.loading = true
      getProductList(this.listQuery)
        .then(res => {
          this.loading = false
          const { data, totalCount } = res.data
          data.map(v => {
            v.loading = false
            if (v.multilevelTypeDTO) {
              v['multilevelType'] = v.multilevelTypeDTO.name
              if (v.multilevelTypeDTO.child) {
                v['multilevelType'] =
                  v['multilevelType'] + ' > ' + v.multilevelTypeDTO.child.name
                if (v.multilevelTypeDTO.child.child) {
                  v['multilevelType'] =
                    v['multilevelType'] +
                    ' > ' +
                    v.multilevelTypeDTO.child.child.name
                }
              }
            }
          })
          this.tableData = data
          this.total = totalCount
        })
        .catch(() => {
          this.loading = false
        })
    },
    handleSetStore(row) {
      row.loading = true
      setComAddGoods({ ids: [row.id], userName: this.name })
        .then(res => {
          this.$message({
            message:
              '添加商品成功，请至自建新品/新品申请记录/“待完善”页面补充商品信息',
            type: 'success',
            duration: 4000
          })

          this.getList(row.id)
          row.loading = false
        })
        .catch(() => {
          row.loading = false
        })
    }
  }
}
</script>
<style lang="scss">
.el-table__empty-text {
  width: 60%;
  padding: 20px 0;
  line-height: 35px;
}
</style>
<style lang="scss" scoped>
.addition-wrapper {
  background: #f6f7fb;
  padding: 15px;
  margin-top: 10px;
  .title {
    color: #333;
  }
}
</style>
