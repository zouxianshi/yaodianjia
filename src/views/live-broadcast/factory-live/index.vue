<template>
  <div class="app-container factory-live-modal">
    <el-date-picker
      v-model="timers"
      size="mini"
      type="datetimerange"
      range-separator="至"
      start-placeholder="不限制"
      end-placeholder="不限制"
    />
    <el-button size="mini" style="float:right" @click="getData()">查询</el-button>
    <div v-if="liveData.length > 0" class="live-content">
      <el-card v-for="(liveItem, index) in liveData" :key="index" class="box-card" style="padding: 10px">
        <liveItems :datas="liveItem" @freshDate="getData" />
      </el-card>
    </div>
    <div v-else class="live-content">
      <div style="color: rgb(187, 187, 187); width: 100%; text-align: center; padding-top: 30vh; font-size: 16px;">暂无直播场次！</div>
    </div>
    <div class="page-box">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { subscribeableFactoryLive } from '@/api/factory-live'
import liveItems from './live-items'
import { formatDate } from '@/utils/timer'
export default {
  components: {
    liveItems
  },
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      timers: [],
      liveData: [],
      totalCount: 0
    }
  },
  created() {
    this.getData()
  },
  methods: {
    // 获取可订阅的所有厂家直播
    getData() {
      const params = {
        'currentPage': this.pageInfo.currentPage,
        'pageSize': this.pageInfo.pageSize
      }
      console.log(this.timers)
      if (this.timers && this.timers.length > 0) {
        params.beginTime = formatDate(this.timers[0])
        params.endTime = formatDate(this.timers[1])
      }
      subscribeableFactoryLive(params).then(res => {
        console.log(res)
        if (res.code === '10000') {
          this.liveData = res.data.data || []
          this.totalCount = res.data.totalCount
        }
      })
    },
    handleSizeChange(val) {
      this.pageInfo.pageSize = val
      this.currentPage = 1
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    }
  }
}
</script>
<style lang="scss">
.factory-live-modal{
  .live-content{
    display: flex;justify-content: space-between; flex-wrap: wrap;
    height: calc(100vh - 340px);overflow: auto;margin-top: 10px;
    .box-card{
      flex: 0 0 49%;margin-top: 20px;height: 280px;
    }
  }
  .page-box{
    text-align: right;margin-top: 20px;
  }
}
</style>
