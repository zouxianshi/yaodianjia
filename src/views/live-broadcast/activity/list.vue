<template>
  <div class="app-container">
    <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd('')">新建直播活动</el-button>
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
    <!-- <div id="qrcode" /> -->
    <section class="table-box webkit-scroll">
      <el-table v-loading="loading" :data="tableData" height="calc(100vh - 350px)" size="small" style="width: 100%">
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
        <el-table-column prop="url" label="相关商品" min-width="200">
          <template slot-scope="scope">
            <el-button type="text" @click="handleShowGoods(scope.row)">{{ scope.row.firstCommodityNum }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="数量" prop="commodityNum" min-width="80" align="center" />
        <el-table-column prop="remark" label="直播视频" min-width="120" align="center">
          <template slot-scope="scope">
            <div style="display:flex;justify-content: center;">
              <div class="cover">
                <img :src="showImg(scope.row.coverPicUrl)" alt="">
                <div class="play" @click="handlePlayVideo(scope.row)">
                  <span class="play-btn el-icon-caret-right" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" min-width="150">
          <template slot-scope="scope">
            <template v-if="scope.row.status!==2">
              <el-button v-if="scope.row.status===0" size="mini" type="text" @click="handleStartLive(scope.row.id)">发起直播</el-button>
              <el-button
                slot="reference"
                type="text"
                size="mini"
                @click="handleShareCode(scope.row)"
              >分享</el-button>
              <el-button
                v-if="scope.row.status===0"
                type="text"
                size="mini"
                @click="handleAdd(scope.row.id)"
              >编辑</el-button>
            </template>

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
    <el-dialog
      title="直播回放"
      :visible.sync="videoVisible"
      width="50%"
      append-to-body=""
      :before-close="handleColseVideo"
    >
      <div id="J_prismPlayer" class="prism-player" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleColseVideo">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="商品列表"
      :visible.sync="goodsVisible"
      width="700px"
      append-to-body=""
    >
      <el-table :data="goodsList" height="350">
        <el-table-column label="商品图片">
          <template slot-scope="scope">
            <div v-if="scope.row.commodityPic && scope.row.commodityPic!==''" class="x-img-mini">
              <div class="x-image__preview">
                <el-image
                  style="width: 50px;height: 50px;"
                  fit="contain"
                  :src="showImg(scope.row.commodityPic)"
                  :preview-src-list="[showImg(scope.row.commodityPic)]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂未上传</div>
          </template>
        </el-table-column>
        <el-table-column label="商品名称" prop="" />
        <el-table-column label="商品编码" prop="" />
        <el-table-column label="规格" prop="specName" />
        <el-table-column label="参考价格" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="goodsVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog title="扫码分享" :visible.sync="shareVisible" append-to-body="" width="30%">
      <preview v-if="shareVisible" :link="pageLink" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="shareVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import liveRequest from '@/api/live'
import QRCode from 'qrcodejs2'
import { mapGetters } from 'vuex'
import preview from './_source/perview'
export default {
  name: 'Live',
  components: { Pagination, preview },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      qrcode: null,
      codeVisible: false,
      loading: false,
      videoVisible: false,
      aliPlay: null,
      goodsVisible: false,
      goodsList: [],
      shareVisible: false,
      pageLink: ''
    }
  },
  computed: {
    ...mapGetters(['merCode'])
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
        data.data.map(v => {
          v.codeVisible = false
        })
        this.tableData = data.data
        this.total = data.totalCount
        this.loading = false
      } catch (error) {
        console.log(error)
        this.loading = false
      }
    },
    /**
     * 发起直播
     */
    async handleStartLive(id) {
      try {
        await liveRequest.startLive(id)
        this.$router.push('/live-manage/live-now')
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 获取该条数据的商品数据
     */
    async _loadLiveGoods(row) {
      try {
        const { data } = await liveRequest.getLiveGoods(row.id)
        this.goodsList = data
      } catch (error) {
        console.log(error)
      }
    },
    /**
     * 分享二维码
     */
    handleShareCode(row) {
      liveRequest.getShareLivePage(this.merCode, row.id).then(res => {
        this.pageLink = res.data
        this.shareVisible = true
      })
    },
    createQrCode(data) {
      if (this.qrcode) {
        this.qrcode.makeCode(data)
      } else {
        this.qrcode = new QRCode('qrcode', {
          width: 132,
          height: 132,
          text: data, // 二维码地址
          colorDark: '#000',
          colorLight: '#fff',
          correctLevel: QRCode.CorrectLevel.L // 设置二维码容错率
        })
      }
    },
    handleColseVideo() {
      this.aliPlay.pause()
      this.videoVisible = false
    },
    handlePlayVideo(row) {
      if (!row.videoUrl) {
        this.$message({
          message: '直播未完成',
          type: 'warning'
        })
        return
      }
      this.videoVisible = true
      this.$nextTick(_ => {
        if (this.aliPlay) {
          this.aliPlay.dispose()
        }
        // eslint-disable-next-line no-undef
        this.aliPlay = new Aliplayer({
          id: 'J_prismPlayer',
          width: '100%',
          source: row.videoUrl,
          'autoplay': true,
          'isLive': false,
          'rePlay': false,
          'playsinline': true,
          'preload': true,
          'controlBarVisibility': 'hover',
          'useH5Prism': true
        }, function(player) {
          console.log('播放器创建好了。')
        })
      })
    },
    handleAdd(id) {
      this.$router.push(`/live-manage/activity-edit?id=${id}`)
    },
    handleShowGoods(row) {
      this._loadLiveGoods(row)
      this.goodsVisible = true
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
      cursor: pointer;
      .play-btn{
        font-size: 20px;
        color: #fff;
      }
    }
  }
</style>
