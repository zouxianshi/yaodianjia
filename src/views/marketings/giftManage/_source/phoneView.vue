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
          <img :src="data.logo">
          <div>{{ data.createName }}</div>
          <div class="quanName">{{ data.cname || '未命名' }}</div>
          <div><el-button type="success" size="mini" @click="check">立即使用</el-button></div>
        </div>
        <div class="algin-left">
          <div>使用条件：{{ useRules }}</div>
          <div>可用时间：{{ userTime }}</div>
          <div>可用门店：{{ data.store === '0' ? '全部门店':'部分门店' }}</div>
          <div style="white-space:normal;word-break:break-all;word-wrap:break-word">使用须知：{{ data.note }}</div>
        </div>
        <div class="p-bottom">
          <div class="codeImg">二维码</div>
          <div class="code">券码：12345678</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhoneView',
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
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
      if (this.data.timeRule === 1) { // 选择马上开始有效期
        str += '自领取起' + this.data.effectTime + '天内有效'
      } else if (this.data.timeRule === 2) {
        var arr = this.data.effectTime.split('-')
        str += '自领取' + arr[0] + '天后' + arr[1] + '天有效'
      } else { // 选择日期
        if (this.data.effectTime) {
          var arr2 = this.data.effectTime.split(',')
          str += this.formatDate(arr2[0]) + '到' + this.formatDate(arr2[1])
        }
      }
      return str
    }
  },
  methods: {
    check() {
      console.log(this.data)
    },
    formatDate(dates) {
      var date = new Date(dates)
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      var d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      return y + '年' + m + '月' + d
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
        img{
          height: 80px;width: 80px;border-radius: 50%;border:1px solid #eee;
        }
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
          height: 80px;border: 1px solid #eee;width: 80%;margin: 0 auto 15px;
        }
        .code{
          font-size: 12px;
        }
      }
    }
  }
}
</style>
