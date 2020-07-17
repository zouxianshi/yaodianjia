<template>
  <div class="app-cotainer factory-live-list">
    <div class="nav-toop">
      <el-button size="mini" type="primary" @click="$router.push('/factory-live/create')">
        <i class="el-icon-plus"></i>
        新建直播活动
      </el-button>
    </div>
    <el-table :data="liveData" border style="width: 100%" height="calc(100vh - 325px)">
      <el-table-column prop="id" label="序号" ></el-table-column>
      <el-table-column prop="name" label="主题" ></el-table-column>
      <el-table-column prop="coverPicUrl" label="封面">
        <template slot-scope="scope">
          <el-image style="width:80px;height:80px;margin: auto" :src="showImg(scope.row.coverPicUrl)"></el-image>
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="开播时间" ></el-table-column>
      <el-table-column prop="duration" label="时长" >
        <template slot-scope="scope">
          {{formartTime(scope.row.duration)}}
        </template>
      </el-table-column>
      <el-table-column prop="firstCommodityName" label="相关产品" ></el-table-column>
      <el-table-column prop="commodityNum" label="商品数" ></el-table-column>
      <el-table-column prop="commodityNum" label="订阅数" ></el-table-column>
      <el-table-column prop="commodityNum" label="视屏回放" ></el-table-column>
      <el-table-column prop="commodityNum" label="审核状态" ></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row)" type="text" size="small">
            <i class="el-icon-edit"></i>
          </el-button>
          <el-button @click="shareLive(scope.row.id)" type="text">
            <i class="el-icon-share"></i>
          </el-button>
          <el-button @click="startLive(scope.row.id)" type="text">
            <i class="el-icon-video-camera" />
          </el-button>
          <el-button type="text" size="small">
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
        :total="totalCount">
      </el-pagination>
    </div>
    <popShareLive ref="popShareLive" />
    <popStartLive ref="popStartLive" />
  </div>
</template>
<script>
import _ from 'lodash'
import { searchLiveData } from '@/api/factory-live'
import  LiveRequest  from '@/api/live'
import { formartTime } from './_utils'
import popShareLive from './_source/pop-share-live' // 分享直播
import popStartLive from './_source/pop-start-live'
export default {
  components: {
    popShareLive, popStartLive
  },
  data() {
    return {
      liveData: [],
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 100
    }
  },
  created() {
    this.getLiveData()
  },
  methods: {
    formartTime(time) {
      return formartTime(time)
    },
    // 获取列表数据
    getLiveData() {
      const params = _.cloneDeep(this.pageInfo)
      params.merType = 2
      LiveRequest.getLiveList(params).then(res => {
        console.log(res)
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
    // 编辑
    edit(row) {
      console.log(row)
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>
<style lang="scss">
.factory-live-list {
  .nav-toop {
    text-align: right;margin-bottom: 10px;
  }
  .page-box{
    text-align: right; margin-top: 10px;
  }
}
</style>