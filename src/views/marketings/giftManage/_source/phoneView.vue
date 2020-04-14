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
          <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png">
          <div>中智大药房</div>
          <div class="quanName">双十一阿胶9折优惠券</div>
          <div><el-button type="success" size="mini">立即使用</el-button></div>
        </div>
        <div class="algin-left">
          <div>使用条件：订单金额不限制，全场通用</div>
          <div>可用时间：自领取1天后3天有效</div>
          <div>可用门店：部分门店</div>
          <div>使用须知：</div>
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
  name: 'PhoneView'
}
</script>
<style lang="scss" scoped>
.phone-view-modal {
  border: 1px solid #aaa;height:80%;box-sizing:border-box;
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
    height: calc(100% - 40px);padding: 20px;box-sizing:border-box;
    .content{
      border: 1px solid #aaa;height: 100%;position:relative;
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
        position: absolute;bottom: 0;text-align: center;height: 130px;width: 100%;
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
