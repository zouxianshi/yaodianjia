<template>
  <div class="app-container">
    <div class="details-wrapper">
      <div class="live-total">
        <!-- <el-card body-style="width:300px;height:130px">这是视频</el-card> -->
        <el-card class="box-card list-total">
          <div class="box-list">
            <p class="nums">{{ statistics.totalOrderNum || 0 }}</p>
            <p>成交订单</p>
          </div>
          <div class="box-list">
            <p class="nums">{{ statistics.totalVisitOrderRate || 0 }}</p>
            <p>用户成交率</p>
          </div>
          <div class="box-list">
            <p class="nums">{{ statistics.totalOrderAmount || 0 }}</p>
            <p>总金额金额</p>
          </div>
        </el-card>
        <el-card class="box-card flex-center " style="width: 300px; height: 130px;">
          <div class="box-list ">
            <p class="nums">
              {{ statistics.totalVisitNum || 0 }}
              <span>&nbsp;</span>
            </p>
            <p>累计观看人数</p>
          </div>
        </el-card>
      </div>
      <div style="margin-top:20px">
        <el-card body-style="padding:0 0 20px">
          <p class="title-line">基本信息</p>
          <el-divider />
          <div class="info-wrapper">
            <el-form>
              <el-form-item label="直播名称：">
                <span>{{ LiveDetails.name }}</span>
              </el-form-item>
              <el-form-item label="直播头像：">
                <img class="detail_avatar" :src="showImg(LiveDetails.merLogoUrl)" alt="">
                <!-- <el-avatar
                  size="medium"
                  :src="showImg(LiveDetails.merLogoUrl)"
                /> -->
              </el-form-item>
              <el-form-item label="直播主题：">
                <span>{{ statistics.name }}</span>
              </el-form-item>
              <el-form-item label="开播时间：">
                <span>{{ statistics.realBeginTime }}</span>
              </el-form-item>
              <el-form-item label="直播封面：">
                <img :src="showImg(LiveDetails.coverPicUrl)" class="detail_coverPicUrl">
                <!-- <el-image
                  style="width:100px;height:100px"
                  :src=""
                /> -->
              </el-form-item>
            </el-form>
          </div>
          <!-- <p class="title-line">关联商品</p> -->
          <el-divider />

        </el-card>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import liveRequest from '@/api/live'
import config from '@/utils/config'
export default {
  data() {
    return {
      goodsList: [],
      selectlist: [],
      statistics: '',
      LiveDetails: ''
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name', 'token']),
    upLoadUrl() {
      return `${this.uploadFileURL}${config.merGoods}/1.0/file/_uploadImgAny?merCode=${this.merCode}`
    },
    headers() {
      return { Authorization: this.token }
    }
  },
  created() {
    this.getStatistics()
    this.getLiveDetails()
  },
  methods: {
    async getStatistics() {
      try {
        const { data } = await liveRequest.getdataCenterStatistics({
          liveId: `${this.$route.query.id}`
        })
        this.statistics = data
        console.log(data)
        // this.totaldata = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取直播详情
    async getLiveDetails() {
      try {
        const { data } = await liveRequest.getLiveDetails({
          liveId: this.$route.query.id
        })
        this.LiveDetails = data
      } catch (error) {
        console.log(error)
      }
    }

  }
}
</script>
<style lang="scss">
.flex-between {
  display: flex;
  justify-content: space-between;
}
.live-total .el-card__body {
  @extend .flex-between;
  height: 130px;
  align-items: center;
}
</style>
<style lang="scss" scoped>
.flex-between {
  display: flex;
  justify-content: space-between;
  height: 130px;
  align-items: center;
}
.title-line {
  padding: 20px 23px 0;
}
.live-total {
  // padding:0 30px;
  @extend .flex-between;
  .nums {
    margin-bottom: 10px;
  }
  .flex-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .box-list {
    margin: 0 30px;
    text-align: center;
    p {
      &:first-child {
        font-size: 20px;
        font-weight: 600;
        span {
          font-size: 12px;
        }
      }
      &:last-child {
        color: #bebfc1;
        font-size: 14px;
      }
    }
  }
}
.info-wrapper {
  padding: 0 120px;
}
.detail_avatar{
  width: 60px;
  height: 60px;
  border-radius: 100%;
}
.detail_coverPicUrl{
  width: 100px;
  height: 100px;
}
</style>
