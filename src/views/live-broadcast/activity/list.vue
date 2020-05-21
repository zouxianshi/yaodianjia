<template>
  <div class="app-container">
    <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd()">新建直播活动</el-button>
    <!-- <section @keydown.enter="search()">
      <div class="search-form" style="margin-top:20px;margin-bottom:10px">
        <div class="search-item">
          <span class="label-name">直播主题</span>
          <el-input v-model.trim="listQuery.keyword" size="small" style="width: 200px" />
        </div>
        <div class="search-item">
          <el-button size="small" @click="search()">查 询</el-button>
        </div>
      </div>
    </section> -->
    <section class="table-box webkit-scroll">
      <el-table v-loading="loading" :data="tableData" height="500" style="width: 100%">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="主播主题" min-width="180" align="center" />
        <el-table-column label="图片" min-width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.coverPicUrl && scope.row.coverPicUrl!==''" class="x-img-mini">
              <div class="x-image__preview">
                <el-image
                  style="width: 50px;height: 50px;"
                  fit="contain"
                  :src="showImg(scope.row.coverPicUrl)"
                  :preview-src-list="[showImg(scope.row.coverPicUrl)]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂未上传</div>
          </template>
        </el-table-column>
        <el-table-column prop="beginTime" label="开播时间" min-width="180" align="center" />
        <el-table-column prop="duration" label="时长" min-width="180" align="center" />
        <el-table-column prop="url" label="相关商品" min-width="240">
          <template slot-scope="scope">
            <el-button type="text">{{ scope.row.firstCommodityNum }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="数量" prop="commodityNum" min-width="80" align="center" />
        <el-table-column prop="remark" label="直播视频" min-width="120" align="center">
          <template slot-scope="scope">
            <div style="display:flex;justify-content: center;">
              <div class="cover">
                <img :src="showImg(scope.row.coverPicUrl)" alt="">
                <div class="play">
                  <span class="play-btn el-icon-caret-right" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" min-width="240">
          <template slot-scope="scope">
            <el-button size="mini" type="text" @click="handleEdit(scope.row)">开播</el-button>
            <el-button
              type="text"
              size="mini"
            >分享</el-button>
            <el-button
              type="text"
              size="mini"
            >分享</el-button>
          </template>
        </el-table-column>
      </el-table>
    </section>
    <section class="c-footer">
      <pagination
        :total="total"
        :page.sync="listQuery.currentPage"
        :limit.sync="listQuery.pageSize"
        @pagination="getList"
      />
    </section>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import liveRequest from '@/api/live'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      loading: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /**
     * 获取数据列表
     */
    async getList() {
      this.loading = true
      try {
        const { data } = await liveRequest.getLiveList(this.listQuery)
        this.tableData = data.data
        this.total = data.totalCount
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    handleAdd() {
      this.$router.push('/live-manage/activity-edit?id=')
    }
  }
}
</script>
<style lang="scss" scoped>
  .cover{
    position: relative;
    width: 70px;
    height: 40px;
    img{
      width: 100%;
      height: 100%;
    }
    .play{
      position: absolute;
      left: 50%;
      top:50%;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-top: -15px;
      margin-left: -15px;
      opacity: .5;
      background: #000;
      display: flex;
      justify-content: center;
      align-items: center;
      .play-btn{
        font-size: 20px;
        color: #fff;
      }
    }
  }
</style>
