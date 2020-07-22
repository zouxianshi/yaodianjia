<template>
  <div class="app-cotainer factory-live-list">
    <div class="nav-toop">
      <el-button size="mini" type="primary" @click="$router.push('/factory-live/create')">
        <i class="el-icon-plus"></i>
        新建直播活动
      </el-button>
    </div>
    <el-table :data="liveData" border style="width: 100%" height="calc(100vh - 325px)">
      <el-table-column prop="id" label="序号"></el-table-column>
      <el-table-column prop="name" label="主题"></el-table-column>
      <el-table-column prop="coverPicUrl" label="封面">
        <template slot-scope="scope">
          <el-image
            style="width:80px;height:80px;margin: auto"
            :src="showImg(scope.row.coverPicUrl)"
          ></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="开播时间"></el-table-column>
      <el-table-column prop="duration" label="时长">
        <template slot-scope="scope">{{formartTime(scope.row.duration)}}</template>
      </el-table-column>
      <el-table-column prop="firstCommodityName" label="相关产品"></el-table-column>
      <el-table-column prop="commodityNum" label="商品数"></el-table-column>
      <el-table-column prop="subscriptionNum" label="订阅数"></el-table-column>
      <el-table-column prop="videoUrl" label="视屏回放" min-width="120" align="center">
        <template slot-scope="scope">
          <div style="display:flex;justify-content: center;" v-if = "scope.row.videoUrl">
            <div class="cover">
              <img :src="showImg(scope.row.coverPicUrl)" alt />
              <div class="play" @click="handlePlayVideo(scope.row)">
                <span class="play-btn el-icon-caret-right" />
              </div>
            </div>
          </div>
          <span v-else>{{ scope.row.status !== 2 ? '未开播' : '未录制' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="auditStatus" label="审核状态">
        <template slot-scope="scope">
          {{ formartStatus(scope.row.auditStatus) }}
          <el-tooltip
            class="item"
            effect="light"
            :content="scope.row.remark"
            placement="top-end"
            v-show="scope.row.auditStatus === 3"
          >
            <i class="el-icon-warning-outline" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button @click="startLive(scope.row.id)" type="text" v-if="scope.row.auditStatus === 2">
            <i class="el-icon-video-camera" />
          </el-button>
          <el-button @click="shareLive(scope.row.id)" type="text" v-if="scope.row.auditStatus === 2">
            <i class="el-icon-share"></i>
          </el-button>
          <el-button @click="check(scope.row.id)" type="text" v-if="scope.row.auditStatus === 0">
            <i class="el-icon-s-check" tag="审核" />
          </el-button>
          <el-button @click="edit(scope.row)" type="text" size="small" v-if="scope.row.auditStatus === 0">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button type="text" size="small" @click="_onDelete(scope.row.id)" v-if="scope.row.auditStatus === 0">
            <i class="el-icon-delete"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="page-box">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
      ></el-pagination>
    </div>
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
    <popShareLive ref="popShareLive" />
    <popStartLive ref="popStartLive" />
  </div>
</template>
<script>
import _ from 'lodash'
import { searchLiveData, deleteLive, submitAudit } from '@/api/factory-live'
import LiveRequest from '@/api/live'
import { formartTime, formartStatus } from './_utils'
import popShareLive from './_source/pop-share-live' // 分享直播
import popStartLive from './_source/pop-start-live'
export default {
  components: {
    popShareLive,
    popStartLive
  },
  data() {
    return {
      liveData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      videoVisible: false, // 视频回放
      aliPlay: null
    }
  },
  created() {
    this.getLiveData()
  },
  methods: {
    formartTime(time) {
      return formartTime(time)
    },
    // 格式化审核状态
    formartStatus(status) {
      return formartStatus(status)
    },
    // 获取列表数据
    getLiveData() {
      const params = _.cloneDeep(this.pageInfo)
      params.merType = 2
      LiveRequest.getLiveList(params).then(res => {
        if (res.code === '10000' && res.data) {
          this.liveData = res.data.data
          this.totalCount = res.data.totalCount
        }
      })
    },
    // 分享直播
    shareLive(id) {
      this.$refs.popShareLive.openShare(this.merCode, id)
    },
    // 获取开启直播二维码
    startLive(id) {
      this.$refs.popStartLive.openShare(this.merCode, id)
    },
    // 审核直播
    check(id) {
      const params = {
        "auditStatus": 1,
        "id": id
      }
      submitAudit(params).then(res => {
        console.log(res)
        if (res.code === '10000') {
          this.$message({
            type: 'success',
            message: '已提交审核！'
          })
          this.getLiveData()
        }
      })
    },
    // 编辑
    edit(row) {
      this.$router.push({
        path: '/factory-live/create',
        query: {
          id: row.id
        }
      })
    },
    // 删除
    _onDelete(id) {
      deleteLive(id).then(res => {
        if (res.code === '10000'){
          this.$message({
            type: 'success',
            message: '删除成功！'
          })
          this.getLiveData()
        }
      })
    },
    handleSizeChange(val) {
      this.pageInfo.currentPage = 1
      this.pageInfo.pageSize = val
      this.getLiveData()
    },
    handleCurrentChange(val) {
      this.pageInfo.currentPage = val
      this.getLiveData()
    },
    // 回放相关
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
      } else if (row.videoUrl === null) {
        this.$message({
          message: '未录制直播回放',
          type: 'warning'
        })
        return
      }
      this.videoVisible = true
      this.playVideo(row.videoUrl)
    },
    playVideo(videoUrl) {
      console.log('videoUrl...........', videoUrl)
      this.$nextTick(_ => {
        if (this.aliPlay) {
          // this.aliPlay.dispose()
          this.aliPlay.loadByUrl(videoUrl)
        } else {
          // eslint-disable-next-line no-undef
          this.aliPlay = new Aliplayer(
            {
              id: 'J_prismPlayer',
              width: '100%',
              source: videoUrl,
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
    handlePlayEnd() {
      console.log('播放结束-----')
    }
  }
}
</script>
<style lang="scss">
.factory-live-list {
  .nav-toop {
    text-align: right;
    margin-bottom: 10px;
  }
  .page-box {
    text-align: right;
    margin-top: 10px;
  }
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
}
</style>