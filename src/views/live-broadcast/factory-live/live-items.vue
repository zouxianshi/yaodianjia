<template>
  <div class="lives-items">
    <div class="live-items-left">
      <div class="subscriptionNum">{{ datas.subscriptionNum }}人已订阅</div>
      <el-image :src="showImg(datas.coverPicUrl)" style="width:100%;height:100%" />
      <div v-if="startData=== '已开播'" class="start-box">{{ startData }}</div>
      <div v-else class="start-box">距离开播还有{{ startData }}</div>
    </div>
    <div class="live-items-right">
      <div class="_title">{{ datas.name }}</div>
      <div class="beginTime">开播时间：{{ datas.beginTime }}</div>
      <div class="goodsNum">商品数量： {{ datas.commodityNum }}</div>
      <div class="detail">
        <el-image :src="showImg(datas.merLogoUrl)" />
        <span>{{ datas.merName }}</span>
        <el-button type="primary" size="mini" @click="ckDetail(datas.id)">详情</el-button>
      </div>
      <div class="sub-btn">
        <el-image v-if="datas.subscribeFlag === 0" :src="starPng" @click="dyLive(datas.id)" />
        <el-image v-else :src="staredPng" @click="unsubscribe(datas.id)" />
      </div>
    </div>
  </div>
</template>
<script>
import { subLive, unsubscribe } from '@/api/factory-live'
import starPng from '../asset/img/start.png'
import staredPng from '../asset/img/started.png'
export default {
  props: {
    datas: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    }
  },
  computed: {
    startData() {
      return this.formatStart(this.datas.beginTime)
    },
    starPng() {
      return starPng
    },
    staredPng() {
      return staredPng
    }
  },
  methods: {
    formatStart(time) {
      const times = (new Date(time).getTime() - new Date().getTime()) / 1000
      if (times > 86400) {
        return Math.floor(times/86400) + '天'
      } else if (times > 3600) {
        return Math.floor(times / 3600) + '小时'
      } else if (times < 0) {
        return '已开播'
      } else {
        return Math.floor(times / 60) + '分钟'
      }
    },
    // 订阅直播
    dyLive(id) {
      this.$confirm('确定订阅该直播?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          liveId: id,
          merCode: this.$store.state.user.merCode
        }
        subLive(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              type: "success",
              message: '订阅成功！'
            })
            this.$emit('freshDate')
          }
        })
      }) 
    },
    // 取消订阅
    unsubscribe(id) {
      this.$confirm('确定取消订阅该直播？稍后可重新订阅', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          liveId: id,
          merCode: this.$store.state.user.merCode
        }
        unsubscribe(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              type: "success",
              message: '已取消订阅！'
            })
            this.$emit('freshDate')
          }
        })
      })
    },
    // 查看详情
    ckDetail(id) {
      this.$router.push({
        path: '/live-manage/factory-live-details',
        query: {
          id: id
        }
      })
    }
  }
}
</script>
<style lang="scss">
  .lives-items{
    display: flex; justify-content: space-between;
    .live-items-left{
      flex: 0 0 45%;
      height: 220px;
      position: relative;
      .start-box{
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        background:rgba(0,0,0,1);
        opacity: 0.5;color:rgba(255,255,255,1);line-height: 30px;
        font-weight: 600;text-align: center;
      }
      .subscriptionNum{
        position: absolute;
        top: 0;
        z-index: 200;
        width: 40%;
        height: 30px;
        background:rgba(0,0,0,1);
        opacity: 0.5;color:rgba(255,255,255,1);line-height: 30px;text-align: center;
        border-radius: 0 20px 20px 0;
      }
    }
    .live-items-right{
      flex: 0 0 50%;position: relative;
      ._title{
        font-size: 16px;font-weight: 600;height: 40px;line-height: 40px;
      }
      .beginTime, .goodsNum{
        font-size: 14px;height: 20px;line-height: 20px;margin-top: 10px;
      }
      .detail{
        height: 50px;position: absolute; bottom: 0;display: flex; align-items: center; justify-content: space-between;
        width: 100%;
        .el-image{
          width: 50px;height: 50px;border-radius: 50%;vertical-align: baseline;
        }
      }
      .sub-btn{
        border: 1px dotted #eee;
        width: 28px;
        height: 31px;
        position: absolute;
        top: -20px;
        right: 0;
      }
    }
  }
</style>
