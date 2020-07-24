<template>
  <div class="app-container">
    <el-button class="btn btn-add" type="primary" size="small" @click.stop="handleAdd('')">新建直播活动</el-button>
    <section class="table-box webkit-scroll">
      <el-table
        v-loading="loading"
        :data="tableData"
        height="calc(100vh - 400px)"
        size="small"
        style="width: 100%"
      >
        <el-table-column label="序号" width="60" align="center">
          <template slot-scope="scope">
            <span>{{ scope.$index+1 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="主题" min-width="180" align="center" />
        <el-table-column label="封面" min-width="100" align="center">
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
        <el-table-column label="时长" min-width="180" align="center">
          <template slot-scope="scope">
            <span>{{ ChangeHourMinutestr(scope.row.duration) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="url" align="center" label="相关商品" min-width="200">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="handleShowGoods(scope.row)"
            >{{ scope.row.firstCommodityName }}</el-button>
          </template>
        </el-table-column>

        <el-table-column label="商品数" prop="commodityNum" min-width="80" align="center" />
        <el-table-column label="直播回放" min-width="120" align="center">
          <template slot-scope="scope">
            <div style="display:flex;justify-content: center;">
              <div class="cover">
                <img :src="showImg(scope.row.coverPicUrl)" alt>
                <div class="play" @click="handlePlayVideo(scope.row)">
                  <span class="play-btn el-icon-caret-right" />
                </div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" min-width="150">
          <template slot-scope="scope">
            <template>
              <el-button
                v-if="scope.row.status===0||scope.row.status===1||scope.row.status===3"
                size="mini"
                type="text"
                @click="handleStartLive(scope.row.id)"
              >开播</el-button>
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
              <el-button type="text" size="small" @click="_onDelete(scope.row.id)">
                <i class="el-icon-delete" />
              </el-button>
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
      width="600px"
      append-to-body
      :before-close="handleColseVideo"
    >
      <div class="play-box">
        <div id="J_prismPlayer" class="prism-player" />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="handleColseVideo">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="商品列表"
      :visible.sync="goodsVisible"
      width="700px"
      append-to-body
      :close-on-click-modal="false"
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
        <el-table-column label="商品名称" prop="commodityName" />
        <el-table-column label="商品编码" prop="erpCode" />
        <el-table-column label="规格" prop="specName" />
        <el-table-column label="参考价格" prop="mprice" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="small" @click="goodsVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <popShareLive ref="popShareLive" />
    <popStartLive ref="popStartLive" />
  </div>
</template>
<script>
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import liveRequest from '@/api/live'
import { mapGetters } from 'vuex'
import { deleteLive } from '@/api/factory-live'
// 开启直播以及分享弹窗
import popShareLive from '../../factory-live/_source/pop-share-live' // 分享直播
import popStartLive from '../../factory-live/_source/pop-start-live'
export default {
  name: 'Live',
  components: { Pagination, popShareLive, popStartLive },
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      codeVisible: false,
      loading: false,
      videoVisible: false,
      aliPlay: null,
      goodsVisible: false,
      goodsList: [],
      playList: [],
      playIndex: 0,
      playUrl: ''
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
      this.listQuery.merType = 1
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
      this.$refs.popStartLive.openShare(this.merCode, id)
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
      this.$refs.popShareLive.openShare(this.merCode, row.id)
    },
    // 删除直播
    _onDelete(id) {
      deleteLive(id).then(res => {
        if (res.code === '10000') {
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getList()
        }
      })
    },

    handleColseVideo() {
      this.aliPlay.pause()
      this.videoVisible = false
    },
    handlePlayVideo(row) {
      if (row.status !== 2) {
        this.$message({
          message: '直播未完成',
          type: 'warning'
        })
        return
      }
      this._loadPlayList(row.id)
      // this.videoVisible = true
    },
    async _loadPlayList(id) {
      try {
        const { data } = await liveRequest.getPlayList(id)
        data.map(v => {
          if (v.videoUrl) {
            v.videoUrl = v.videoUrl.replace('http', 'https')
          }
        })
        this.playList = data
        this.playUrl = this.playList[0].videoUrl
        this.videoVisible = true
        this.playVideo()
      } catch (error) {
        console.log(error)
      }
    },
    playVideo() {
      this.$nextTick(_ => {
        if (this.aliPlay) {
          // this.aliPlay.dispose()
          this.aliPlay.loadByUrl(this.playUrl)
        } else {
          // eslint-disable-next-line no-undef
          this.aliPlay = new Aliplayer(
            {
              id: 'J_prismPlayer',
              width: '100%',
              source: this.playUrl,
              autoplay: true,
              isLive: false,
              rePlay: false,
              playsinline: true,
              preload: true,
              controlBarVisibility: 'hover',
              useH5Prism: true
            },
            function(player) {
              console.log('播放器创建好了。')
            }
          )
          this.aliPlay.on('ended', this.handlePlayEnd)
        }
      })
    },
    handleTogglePlay(row, index) {
      this.playIndex = index
      this.playUrl = row.videoUrl
      this.playVideo()
    },
    handlePlayEnd() {
      console.log('播放结束-----')
      // 播放结束自动切换到下一个
      if (this.playIndex !== this.playList.length - 1) {
        this.playIndex = this.playIndex + 1
        this.playUrl = this.playList[this.playIndex].videoUrl
        console.log('playIndex', this.playIndex)
        this.playVideo()
      }
    },
    handleAdd(id) {
      this.$router.push(`/live-manage/activity-edit?id=${id}`)
    },
    handleShowGoods(row) {
      this._loadLiveGoods(row)
      this.goodsVisible = true
    },
    ChangeHourMinutestr(str) {
      console.log(str)
      if (str !== '0' && str !== '' && str !== null) {
        return (
          (Math.floor(str / 60).toString().length < 2
            ? '0' + Math.floor(str / 60).toString()
            : Math.floor(str / 60).toString()) +
          ':' +
          ((str % 60).toString().length < 2
            ? '0' + (str % 60).toString()
            : (str % 60).toString())
        )
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.cover {
  position: relative;
  width: 70px;
  height: 40px;
  img {
    width: 100%;
    height: 100%;
  }
  .play {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-top: -15px;
    margin-left: -15px;
    opacity: 0.5;
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .play-btn {
      font-size: 20px;
      color: #fff;
    }
  }
}
.play-box {
  display: flex;
}
</style>
