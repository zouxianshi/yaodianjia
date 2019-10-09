<template>
  <div class="app-container">
    <el-link type="warning" @click="dialogVisible=true">从标库新建商品规范说明?</el-link>
    <section class="addition-wrapper">
      <p class="title">
        从商品库新建商品
      </p>
      <el-divider />
      <div class="search-form" style="margin-top:20px;margin-bottom:10px">
        <div class="search-item">
          <span class="label-name">商品名称</span>
          <el-input v-model.trim="keyword" size="small" style="width:200px" placeholder="商品名称" />
        </div>
        <div class="search-item">
          <span class="label-name">生产企业</span>
          <el-input v-model.trim="keyword" size="small" style="width:200px" placeholder="生产企业" />
        </div>
      </div>
      <div class="search-form">
        <div class="search-item">
          <span class="label-name">条形码</span>
          <el-input v-model.trim="keyword" size="small" style="width:200px" placeholder="商品名称" />
        </div>
        <div class="search-item">
          <span class="label-name">批准文号</span>
          <el-input v-model.trim="keyword" size="small" style="width:200px" placeholder="批准文号" />
        </div>
        <div class="search-item">
          <el-button type="primary" size="small">查询</el-button>
        </div>
      </div>
      <el-alert
        type="warning"
        style="margin-bottom:10px"
        :closable="false"
      >
        <p slot="title" class="alret-title">
          没有想要商品，去创建<router-link tag="span" class="link" to="/home">自有新品</router-link>
        </p>
      </el-alert>
      <el-table :data="tableData" stripe>
        <template slot="empty">
          <div class="table-nodata">
            <p class="text-center">搜索无结果</p>
            <p class="text-center">未找到您要创建的商品，您可尝试其他名称搜索，您也可以自行创建标库没有的新品 <span class="link">自建新品</span></p>
            <p class="text-center">自主创建的商品由运营人员自行审核上架</p>
          </div>
        </template>
        <el-table-column label="序号" />
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
        <el-table-column label="商品信息" />
        <el-table-column label="条码" />
        <el-table-column label="生产企业" />
        <el-table-column label="品牌" />
        <el-table-column label="商品分类" />
        <el-table-column label="操作" />
      </el-table>
      <pagination
        :total="total"
        style="background:#f6f7fb"
        :page.sync="listQuery.page"
        :limit.sync="listQuery.limit"
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
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      keyword: '',
      total: 0,
      tableData: [],
      dialogVisible: false
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
<style lang="scss">
.el-table__empty-text{
    width: 60%;
    padding: 20px 0 ;
    line-height: 35px;
}
</style>
<style lang="scss" scoped>
.app-container {
    padding-bottom: 50px;
}
.addition-wrapper{
  background: #f6f7fb;
  padding: 15px;
  margin-top: 10px;
  .title{
      color: #333;
  }
}
</style>
