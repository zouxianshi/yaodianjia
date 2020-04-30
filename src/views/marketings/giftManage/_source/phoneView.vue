<template>
  <div class="phone-view-modal">
    <div class="header">
      <span> &emsp;‹ 返回 </span>
      <span class="title">优惠券</span>
      <span class="title">...&emsp;</span>
    </div>
    <div class="body">
      <div class="content">
        <div class="algin-center">
          <el-image
            style="width: 80px; height: 80px; border-radius:50%"
            :src="showImg(data.logo)+'?x-oss-process=style/w_80'"
            lazy
            fit="contain"
            :preview-src-list="[`${showImg(data.logo)}?x-oss-process=style/w_800`]"
          />
          <div>{{ otherData.merName }}</div>
          <div class="quanName">{{ data.cname || '未命名' }}</div>
          <div><el-button type="success" size="mini" @click="check">立即使用</el-button></div>
        </div>
        <div class="algin-left">
          <div>使用条件：{{ useRules }}</div>
          <div>可用时间：{{ userTime }}</div>
          <div>可用门店：{{ data.shopRule === 1 ? '全部门店':'部分门店' }}</div>
          <div style="white-space:normal;word-break:break-all;word-wrap:break-word">使用须知：{{ data.note }}</div>
        </div>
        <div class="p-bottom">
          <div class="codeImg">
            <el-image :src="imgSrc" style="width: 100%; height: 80px;" />
          </div>
          <div class="code">券码：XXXXXXXX</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import eCode from '@/assets/image/marketings/ecode.png'
import { formatDate } from '@/utils/timer'
export default {
  name: 'PhoneView',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    },
    otherData: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      imgSrc: eCode
    }
  },
  computed: {
    useRules() {
      var str = ''
      str += this.data.sceneRule === 3 ? '线上线下通用,' : this.data.sceneRule === 1 ? '微商城使用,' : '线下门店使用,'
      str += this.data.useRule === 0 ? '订单金额无门槛' : '订单金额满' + this.data.useRule + '元可使用'
      return str
    },
    userTime() {
      var str = ''
      var times = this.data.effectTime
      if (this.data.timeRule === 1) { // 选择马上开始有效期
        str += '自领取起' + times + '天内有效'
      } else if (this.data.timeRule === 2) {
        str += '自领取' + times.split(',')[0] + '天后' + times.split(',')[1] + '天有效'
      } else { // 选择日期
        str += formatDate(times.split(',')[0]) + '到' + formatDate(times.split(',')[1])
      }
      return str
    }
  },
  methods: {
    check() {
      console.log(this.data)
    }
  }
}
</script>
<style lang="scss" scoped>
.phone-view-modal {
  border: 1px solid #aaa;box-sizing:border-box;
  .header {
    background-color: #333;
    color: #fff;
    display: flex;
    justify-content: space-between;
    height: 40px;line-height:40px;
    .title{
      font-weight: bold;font-size: 16px;
    }
  }
  .body{
    padding: 20px;box-sizing:border-box;
    .content{
      border: 1px solid #aaa;position:relative;
      .algin-center{
        text-align: center;width: 100%;padding-top:5%;margin-bottom: 20px;
        div{
          margin-top: 10px;
        }
        .quanName{
          font-size: 16px;font-weight: bold;
        }
      }
      .algin-left{
        padding: 0 10%;
        line-height: 24px;
      }
      .p-bottom{
        text-align: center;height: 130px;width: 100%;margin-top: 20px;
        padding-top: 10px;border-top: 2px dotted #999;
        .codeImg{
          height: 80px;width: 80%;margin: 0 auto 15px;
        }
        .code{
          font-size: 12px;
        }
      }
    }
  }
}
</style>
