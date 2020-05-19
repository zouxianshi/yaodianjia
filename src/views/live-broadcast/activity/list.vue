<template>
  <div class="app-container">
    <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd()">新建直播活动</el-button>
    <section @keydown.enter="search()">
      <div class="search-form" style="margin-top:20px;margin-bottom:10px">
        <div class="search-item">
          <span class="label-name">直播主题</span>
          <el-input v-model.trim="listQuery.keyword" size="small" style="width: 200px" />
        </div>
        <div class="search-item">
          <el-button size="small" @click="search()">查 询</el-button>
        </div>
      </div>
    </section>
    <section class="table-box webkit-scroll">
      <el-table :data="tableData" style="width: 100%" height="calc(100% - 180px)">
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.row.sortNumber || '' }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="startTime" label="主播主题" min-width="180" align="center" />
        <el-table-column prop="img" label="图片" min-width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.imageUrl && scope.row.imageUrl!==''" class="x-img-mini">
              <div class="x-image__preview">
                <el-image
                  style="width: 50px;height: 50px;"
                  fit="contain"
                  :src="showImg(scope.row.imageUrl)"
                  :preview-src-list="[showImg(scope.row.imageUrl)]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂未上传</div>
          </template>
        </el-table-column>
        <el-table-column prop="endTime" label="开播时间" min-width="180" align="center" />
        <el-table-column prop="endTime" label="时长" min-width="180" align="center" />
        <el-table-column prop="url" label="相关商品" min-width="240">
          <template v-if="scope.row.url && scope.row.url!==''" slot-scope="scope">
            <a
              class="x-a-text"
              title="跳转链接"
              :href="scope.row.url || ''"
              target="_blank"
              v-text="scope.row.url || ''"
            />
          </template>
        </el-table-column>

        <el-table-column label="数量" min-width="80" align="center"> >
        </el-table-column>
        <el-table-column prop="remark" label="直播视频" min-width="120" align="center" />
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
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      listQuery: {
        keyword: ''
      }
    }
  },
  created() {

  },
  methods: {
    getList() {

    },
    search() {

    },
    handleAdd() {
      this.$router.push('/live-manage/activity-edit?id=')
    }
  }
}
</script>
