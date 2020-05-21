<template>
  <div class="app-container">
    <div class="live-now-wrapper">
      <div class="shopTop">
        <el-image class="shopTop_avatar" :src="url" :fit="contain" />
        <p class="shopTitle">老百姓大药房</p>
      </div>
      <div class="containerCenter">
        <div class="commentBox">
          <div class="flex-left coverbox">
            <el-image class="comment_avatar" :src="url" :fit="contain" />
            <p class="comment_Title">母亲节礼物促销</p>
          </div>
          <div class="now-people">
            <span>在线人数:</span>
            <span>50人</span>
          </div>
          <p class="tips">
            平台公告：
            欢迎来到主播间，海典软件倡导绿色直播，直播内容严禁违法违规、低俗色情、吸烟酗酒等不良内容，若有违反，将视情节严重对主播账号进行禁播处理。抵制不良内容，共建健康直播间。
          </p>
          <div class="discuss-plan">
            <div>
              <div v-for="items in discussList" :key="items+1" class="flex-left discuss-box">
                <div class="flex-left userMsg">
                  <el-image class="discuss_avatar" :src="url" :fit="contain" />
                  <strong>
                    张三
                    <span style="font-weight:700">:</span>
                  </strong>
                </div>
                <div class="discussConten" style="width:75%">药超级的便宜 药超级的便宜 药超级的便宜 药超级的便宜</div>
              </div>
            </div>
          </div>
        </div>
        <div class="courseBox">
          <div class="live-state">直播中 ● ● ●</div>
          <div class="courseCenter">
            <el-button round class="courseButtom">直播教程</el-button>
            <a
              href="https://obsproject.com/download?spm=a2c4g.11186623.2.15.6aac1445JPlKR8"
              target="_blank"
            >
              <el-button round class="courseButtom">下载链接</el-button>
            </a>
            <el-button round class="courseButtom" @click="dialogVisible = true">获取链接</el-button>
            <div class="courseTip">
              开播主播默认同意
              <a class="courseAgreement">
                《海典软件主播协议》
                <a />
              </a>
            </div>
          </div>
        </div>
        <div class="goodsBox">
          <div v-if="iconFlag" class="iconsBox">
            <div class="shareIcon" @click="showGood()">
              <i class="el-icon-s-goods" />
            </div>
            <div class="shareIcon" @click="openShare">
              <i class="el-icon-share" />
            </div>
          </div>
          <div v-if="goodsListflag" class="goodslistBox">
            <div class="goodsTop flex-between">
              <div>全部商品</div>
              <div @click="showIcon()">
                <i class="el-icon-close" />
              </div>
            </div>
            <div class="goodList">
              <div v-for="gitems in discussList" :key="gitems+21" class="flex-left goods">
                <el-image class="good_avatar" :src="url" :fit="contain" />
                <div class="c-flex-top goodsMsg">
                  <p>999超级感康感冒林</p>
                  <p>直播间销售数量:99999</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="shareFlag" class="flex-around shareBox">
            <div class="share_colose" @click="closeShare">
              <i class="el-icon-close" />
            </div>
            <div class="c-flex-center" style="margin-right:20px">
              <el-image class="share_avatar" :src="url" :fit="contain" />
              <span style="margin-top:20px">微博</span>
            </div>
            <div class="c-flex-center" style="margin-right:20px">
              <el-image class="share_avatar" :src="url" :fit="contain" />
              <span style="margin-top:20px">微博</span>
            </div>
            <div class="c-flex-center" style="margin-right:20px">
              <el-image class="share_avatar" :src="url" :fit="contain" />
              <span style="margin-top:20px">微博</span>
            </div>
            <div class="c-flex-center">
              <el-image class="share_avatar" :src="url" :fit="contain" />
              <span style="margin-top:20px">微博</span>
            </div>
          </div>

          <el-dialog
            title="直播地址"
            :visible.sync="dialogVisible"
            width="25%"
            top="350px"
            modal="false"
            custom-class="sagoZindex"
            :before-close="handleClose"
          >
            <div>
              <div class="flex-left" style="margin-bottom:20px">
                <span style="margin-right:10px">流地址：1111111111111111111111111</span>
                <span class="cloneButtom" @click="cloneUrl(0)">复制</span>
              </div>
              <div class="flex-left">
                <span style="margin-right:10px">流地址：111111</span>
                <span class="cloneButtom" @click="cloneUrl(1)">复制</span>
              </div>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
            </span>
          </el-dialog>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import config from '@/utils/config'
import TIM from 'tim-js-sdk'
import COS from 'cos-js-sdk-v5'
// import storeGoods from '@/views/marketing/components/store-gods'
// import checkCoupon from '@/components/Marketings/checkCoupon'
export default {
  name: 'LiveActivityEdit',
  //   components:[ { storeGoods, checkCoupon }],
  data() {
    return {
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      discussList: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      goodsListflag: false,
      iconFlag: true,
      shareFlag: false,
      dialogVisible: false
    }
  },
  created() {
    const options = {
      SDKAppID: 1400365628 // 接入时需要将0替换为您的即时通信 IM 应用的 SDKAppID
    }
    // 创建 SDK 实例，`TIM.create()`方法对于同一个 `SDKAppID` 只会返回同一份实例
    const tim = TIM.create(options) // SDK 实例通常用 tim 表示
    console.log(tim)
    // 设置 SDK 日志输出级别，详细分级请参见 setLogLevel 接口的说明
    tim.setLogLevel(0) // 普通级别，日志量较多，接入时建议使用
    // tim.setLogLevel(1); // release 级别，SDK 输出关键信息，生产环境时建议使用
    // 注册 COS SDK 插件
    tim.registerPlugin({ 'cos-js-sdk': COS })
    // 登录
    const promise = tim.login({ userID: 'your userID', userSig: 'your userSig' })
    promise
      .then(function(imResponse) {
        console.log(imResponse.data) // 登录成功
      })
      .catch(function(imError) {
        console.warn('login error:', imError) // 登录失败的相关信息
      })
    // 接受消息
    const onMessageReceived = function(event) {
      console.log(event.data)
      // event.data - 存储 Message 对象的数组 - [Message]
    }
    console.log(onMessageReceived)
    tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
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
  methods: {
    showGood() {
      this.goodsListflag = true
      this.iconFlag = false
    },
    showIcon() {
      this.goodsListflag = false
      this.iconFlag = true
    },
    closeShare() {
      this.shareFlag = false
      this.iconFlag = true
    },
    openShare() {
      this.shareFlag = true
      this.iconFlag = false
    },
    open() {
      this.$alert(`<strong>这是 <i>HTML</i> 片段</strong>`, '直播链接', {
        dangerouslyUseHTMLString: true
      })
    },
    handleClose(done) {
      done()
    },
    cloneUrl() {
      document.execCommand('Copy') // 执行浏览器复制命令
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.sagoZindex {
  z-index: 12004;
}
.flex-left {
  display: flex;
  justify-content: left;
  align-items: center;
}
.flex-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-around {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.c-flex-top {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: space-between;
}
.c-flex-center {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}
.flex-1 {
  flex: 1;
}
.flex-wrap {
  flex-wrap: wrap;
}
.cloneButtom {
  font-size: 12px;
  padding: 6px;
  border-radius: 5px;
  color: #fff;
  background: rgba(73, 127, 254, 1);
  cursor: pointer;
}
.live-now-wrapper {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .shopTop {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
    width: 100%;
    background: linear-gradient(
      180deg,
      rgba(0, 76, 255, 1) 0%,
      rgba(73, 127, 254, 1) 100%
    );
    .shopTop_avatar {
      margin-left: 20px;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      margin-right: 30px;
    }
    .shopTitle {
      font-size: 22px;
      font-weight: 700;
      color: #fff;
    }
  }
  .containerCenter {
    // background: #f5f5f5;
    background: rgba(0, 0, 0, 0.5);
    box-sizing: border-box;
    width: 100%;
    height: calc(100% - 40px);
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    .commentBox {
      width: 25%;
      height: 100%;
      padding: 20px;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
    }
    .coverbox {
      width: 100%;
      padding-bottom: 20px;
      border-bottom: 1px solid #fff;
    }
    .comment_avatar {
      width: 140px;
      height: 80px;
      background: chartreuse;
    }
    .comment_Title {
      font-size: 22px;
      font-weight: 700;
      margin-left: 20px;
    }
    .now-people {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .tips {
      margin-top: 10px;
      font-weight: 400;
      line-height: 25px;
    }
    .discuss-plan {
      width: 100%;
      margin-top: 20px;
      height: 350px;
      overflow-y: scroll;
    }
    ::-webkit-scrollbar {
      display: none;
    }
    .discuss-box {
      width: 100%;
      margin-bottom: 30px;
      overflow: hidden;
    }
    .userMsg {
      width: 25%;
    }
    .discussConten {
      margin-left: 10px;
      word-break: break-all;
      cursor: pointer;
    }
    .discuss_avatar {
      height: 30px;
      width: 30px;
      border-radius: 50%;
      margin-right: 10px;
    }
    .courseBox {
      width: 50%;
      height: 100%;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      align-items: center;
    }
    .courseButtom {
      display: block;
      width: 200px;
      background: #497ffe;
      color: #fff;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 20px;
    }
    .courseCenter {
      width: 100%;
    }
    .courseTip {
      text-align: center;
      font-weight: 600;
      color: #fff;
    }
    .courseAgreement {
      color: rgb(128, 159, 233);
      font-weight: 600;
    }
    .live-state {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 180px;
      color: #fff;
    }
    .goodsBox {
      width: 25%;
      height: 100%;

      position: relative;
      color: #fff;
    }
    .iconsBox {
      position: absolute;
      bottom: 30px;
      right: 30px;
    }
    .shareIcon {
      background: #f5f5f5;
      color: #000;
      font-size: 24px;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      margin-bottom: 20px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .goodsTop {
      height: 60px;
      width: 100%;
      padding: 0 20px;
      border-bottom: 1px solid #000;
    }
    .goodList {
      height: 600px;
      width: 100%;
      overflow: hidden;
      overflow-y: scroll;
    }
    .goodslistBox {
      background: rgba(0, 0, 0, 0.5);
    }
    .goods {
      padding: 20px;
      height: 100px;
    }
    .good_avatar {
      height: 70px;
      width: 120px;
    }
    .goodsMsg {
      margin-left: 30px;
      height: 100%;
    }
    .shareBox {
      padding: 20px;
      width: 100%;
      height: 200px;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .share_avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
    }
    .share_colose {
      position: absolute;
      top: 15px;
      right: 0px;
      width: 50px;
      height: 50px;
    }
  }
}
</style>
