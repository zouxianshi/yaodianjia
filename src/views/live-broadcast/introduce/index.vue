<template>
  <div class="app-container">
    <el-card :body-style="{ padding: '0px' }">
      <el-image style="width:100%;height:300px" src="https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_banner.png" class="image" />
      <div style="padding: 20px;">
        <h4>直播介绍</h4>
        <p class="desc">
          海典直播是海典软件专门为商户打造的直播功能，支持商户在线直播，平台提供高清、快捷、流畅的视频直播和服务，且支持直播卖货服务，为商户更好服务我们的消费者。前期我们的直播的服务为免费功能，各大商户朋友需要开通的可以联系我们的相关人员开通即可。后续操作有任何问题都可以联系我们的相关人员服务。
        </p>
      </div>
    </el-card>
    <div class="live-titles">
      <h1> 套餐介绍</h1>
      <p> <span class="el-icon-phone-outline" /> 咨询电话：13107318388 </p>
    </div>
    <div class="live-package clearfix">
      <el-col v-for="(o, index) in 1" :key="o" :xs="1" :sm="5" :md="7" :lg="6" :xl="4" :offset="index > 0 ? 1 : 0">
        <el-card>
          <p class="text-center" style="margin-top:30px">套餐一</p>
          <p class="text-center" style="font-size:20px;margin-top:20px;font-weight:600">免费<span style="font-size:12px">/半年</span></p>
          <el-divider />
          <div class="card-footer">
            <span>每月直播次数</span>
            <span>无限</span>
          </div>
          <div class="card-footer">
            <span>每次直播时长</span>
            <span>无限</span>
          </div>
        </el-card>
      </el-col>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.desc{
    color: #bebfc1;
    margin-top:20px;
    font-size: 14px;
}
.live-titles{
    margin-top: 20px;
    text-align: center;
    h1{
        font-size: 28px;
        margin-bottom: 12px;
    }
    p{
         color: #bebfc1;
    }
}
.live-package{
    margin-top: 30px
}
.card-footer{
  display: flex;
  justify-content: space-between;
  margin-bottom: 12px;
  color: #bebfc1;
}

 .clearfix:after {
      clear: both
  }

</style>
