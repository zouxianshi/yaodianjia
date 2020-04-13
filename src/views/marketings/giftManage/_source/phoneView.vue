<template>
  <div class="phone-view-modal">
    <div class="header">
      <span> &emsp;‹返回 </span>
      <span class="title">优惠券</span>
      <span class="title">...&emsp;</span>
    </div>
    <div class="body">
      <div class="content">
        <div class="algin-center">
          <img src="">
          <div>中智大药房</div>
          <div>双十一阿胶9折优惠券</div>
          <div><el-button type="success" size="nimi">立即使用</el-button></div>
        </div>
        <div class="algin-left">
          <div>使用条件：订单金额不限制，全场通用</div>
          <div>可用时间：自领取1天后3天有效</div>
          <div>可用门店：部分门店</div>
          <div>使用须知：</div>
          <div class="codeImg">二维码</div>
          <div class="code">券码：12345678</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PhoneView'
}
</script>
<style lang="scss" scoped>
.phone-view-modal {
  border: 1px solid #aaa;
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
    height: 400px;padding: 20px;
    .content{
      border: 1px solid #aaa;height: 100%;
      .algin-center{
        text-align: center;width: 100%;
        img{
          height: 80px;width: 80px;border-radius: 50%;border:1px solid #eee;
        }
      }
    }
  }
}
</style>
