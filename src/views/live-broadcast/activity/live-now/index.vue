<template>
  <div class="app-container">
    <div class="live-now-wrapper">
      <div class="shopTop">
        <el-image class="shopTop_avatar" :src="LiveDetails.merLogoUrl" :fit="contain" />
        <p class="shopTitle">{{ LiveDetails.merName }}</p>
      </div>
      <div class="containerCenter">
        <div class="commentBox">
          <div class="flex-left coverbox">
            <el-image class="comment_avatar" :src="LiveDetails.coverPicUrl" :fit="contain" />
            <p class="comment_Title">{{ LiveDetails.name }}</p>
          </div>
          <div class="now-people">
            <span>在线人数:</span>
            <span>{{ liveNumber|| '0' }}人</span>
          </div>
          <p class="tips">
            平台公告：
            {{ LiveDetails.activityNotice }}
          </p>
          <div ref="box" class="discuss-plan">
            <div>
              <div v-for="items in chatList" :key="items.nick+1" class="flex-left discuss-box">
                <div class="flex-left userMsg">
                  <el-image class="discuss_avatar" :src="url" :fit="contain" />
                  <strong>
                    {{ items.nick }}
                    <span style="font-weight:700">:</span>
                  </strong>
                </div>
                <div class="discussConten" style="width:75%">{{ items.payload.text }}</div>
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
              <span class="courseAgreement">《海典软件主播协议》</span>
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
            <div class="shareIcon" @click="closeLive()">
              <i class="el-icon-switch-button" />
            </div>
          </div>
          <div v-if="goodsListflag" class="goodslistBox">
            <div class="goodsTop flex-between">
              <div>全部商品</div>
              <div @click="showIcon()">
                <i class="el-icon-close" style=" cursor: pointer;" />
              </div>
            </div>
            <div class="goodList">
              <div v-for="gitems in goodList" :key="gitems+21" class="flex-left goods">
                <el-image class="good_avatar" :src="gitems.commodityPic" :fit="contain" />
                <div class="c-flex-top goodsMsg">
                  <p>{{ gitems.commodityName }}</p>
                  <p>{{ gitems.specName }}</p>
                </div>
              </div>
            </div>
          </div>
          <div v-if="shareFlag" class="flex-between shareBox">
            <div class="share_colose" @click="closeShare">
              <i class="el-icon-close" />
            </div>
            <div
              v-for="(sitem,index) in shareList"
              :key="sitem.avatar+1"
              v-clipboard:copy="shareUrl"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              class="c-flex-center"
              :style="{'margin-right':index==shareList.length-1 ? '':'20px','cursor':'pointer'}"
              @click="shares(index)"
            >
              <el-image class="share_avatar" :src="sitem.avatar" :fit="contain" />
              <span style="margin-top:20px">{{ sitem.name }}</span>
            </div>
          </div>

          <el-dialog
            title="链接地址"
            :visible.sync="dialogVisible"
            width="25%"
            top="350px"
            append-to-body
            custom-class="sagoZindex"
            :before-close="handleClose"
          >
            <div>
              <div class="flex-left" style="margin-bottom:20px">
                <strong class="bold" style="margin-right:10px">服务地址:</strong>
                <el-input v-model="LiveDetails.serviceUrl" class="flex-1" placeholder="请输入内容">
                  <template slot="append" icon="el-icon-search">
                    <el-button
                      slot="append"
                      v-clipboard:copy="LiveDetails.serviceUrl"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      icon="el-icon-document-copy"
                    />
                  </template>
                </el-input>
              </div>
              <div class="flex-left">
                <strong class="bold" style="margin-right:10px">串流密钥:</strong>
                <el-input
                  v-model="LiveDetails.crossfireSecretKey"
                  class="flex-1"
                  placeholder="请输入内容"
                >
                  <template slot="append" icon="el-icon-search">
                    <el-button
                      slot="append"
                      v-clipboard:copy="LiveDetails.crossfireSecretKey"
                      v-clipboard:success="onCopy"
                      v-clipboard:error="onError"
                      icon="el-icon-document-copy"
                    />
                  </template>
                </el-input>
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
import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import { mapGetters } from 'vuex'
import liveRequest from '@/api/live'
import config from '@/utils/config'
import TIM from 'tim-js-sdk'
import COS from 'cos-js-sdk-v5'
Vue.use(VueClipboard)
// import storeGoods from '@/views/marketing/components/store-gods'
// import checkCoupon from '@/components/Marketings/checkCoupon'
export default {
  name: 'LiveActivityEdit',
  //   components:[ { storeGoods, checkCoupon }],
  data() {
    return {
      LiveDetails: {},
      goodList: [],
      chatList: [],
      url:
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      liveNumber: '',
      shareList: [
        {
          name: '微博',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_wb.png'
        },
        {
          name: 'QQ空间',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_QQko.png'
        },
        {
          name: 'QQ好友',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_QQ.png'
        },
        {
          name: '复制链接',
          avatar:
            'https://centermerchant-prod.oss-cn-shanghai.aliyuncs.com/ewx_hdsec/live_conyll.png'
        }
      ],
      goodsListflag: false,
      iconFlag: true,
      shareFlag: false,
      dialogVisible: false
    }
  },
  async created() {
    // 1获取IM密钥 2获取直播详情 拿到必要参数后 获取直播分享链接 和商品列表 还有打开tim流程
    await this.getTimgensing()
    await this.getLiveDetails()
    this.getLivegoods()
    this.getShareLivePage()
    this.timOpen()
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
    // 获取IM 密钥
    async getTimgensing() {
      try {
        const { data } = await liveRequest.getTimgensing({ name: this.name })
        console.log(data)
        this.gensing = data
      } catch (error) {
        console.log(error)
      }
    },
    // 打开IM 流程方法
    async timOpen() {
      console.log(this.name)
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
      tim.on(TIM.EVENT.SDK_READY, function(event) {
        // 收到离线消息和会话列表同步完毕通知，接入侧可以调用 sendMessage 等需要鉴权的接口
        // event.name - TIM.EVENT.SDK_READY
        console.log('event--------------', event)
      })
      // 登录
      const promise = await tim.login({
        userID: this.name,
        userSig: this.gensing
      })
      console.log('promise-------------', promise)
      // 接受消息
      const onMessageReceived = event => {
        // event.data - 存储 Message 对象的数组 - [Message]
        if (event.data[0].payload.text) {
          const { nick, payload, avatar } = event.data[0]
          this.chatList.push({ nick: nick, payload: payload, avatar: avatar })
          const box = this.$refs.box
          box.scrollTop = box.scrollHeight
        }
      }
      tim.on(TIM.EVENT.MESSAGE_RECEIVED, onMessageReceived)
      // 加入群聊天室
      const joinOptions = {
        groupID: this.LiveDetails.groupId,
        type: 'TIM.TYPES.GRP_PUBLIC'
      }
      const promise1 = await tim.joinGroup(joinOptions)
      if (promise1.data.status) {
        switch (promise1.data.status) {
          case TIM.TYPES.JOIN_STATUS_WAIT_APPROVAL:
            console.log('等待管理员同意')
            break // 等待管理员同意
          case TIM.TYPES.JOIN_STATUS_SUCCESS: // 加群成功
            // 加入的群组资料、
            console.log('成功')
            break
          default:
            break
        }
      }
      // 获取群成员人数
      const promise2 = await tim.getGroupProfile({
        groupID: this.LiveDetails.groupId
      })
      this.liveNumber = promise2.data.group.memberNum
      const as = this.LiveDetails.groupId
      console.log(as)
      const promise3 = tim.getMessageList({ conversationID: as, count: 30 })
      promise3.then(function(imResponse) {
        const messageList = imResponse.data.messageList // 消息列表。
        console.log('messageList-------------------', messageList)
        // const nextReqMessageID = imResponse.data.nextReqMessageID // 用于续拉，分页续拉时需传入该字段。
        // const isCompleted = imResponse.data.isCompleted // 表示是否已经拉完所有消息。
      })
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
    },
    // 获取直播商品列表
    async getLivegoods() {
      try {
        const { data } = await liveRequest.getLivegoods({
          liveId: this.$route.query.id
        })
        console.log(data)
        this.goodList = data
      } catch (error) {
        console.log(error)
      }
    },
    // 获取C端直播链接
    async getShareLivePage() {
      try {
        const { data } = await liveRequest.getShareLivePage(
          `${this.merCode}`,
          26
        )
        this.shareUrl = data
      } catch (error) {
        console.log(error)
      }
    },
    // 显示直播商品列表
    showGood() {
      this.goodsListflag = true
      this.iconFlag = false
    },
    // 显示分享 商品  等图标
    showIcon() {
      this.goodsListflag = false
      this.iconFlag = true
    },
    // 关闭分享列表
    closeShare() {
      this.shareFlag = false
      this.iconFlag = true
    },
    // 打开分享
    openShare() {
      this.shareFlag = true
      this.iconFlag = false
    },
    // 打开复制链接盒子
    handleClose(done) {
      done()
    },
    // 复制成功
    onCopy: function() {
      this.$message({
        message: '复制成功',
        type: 'success'
      })
    },
    // 复制失败
    onError: function() {
      this.$message({
        message: '复制失败,请手动复制',
        type: 'success'
      })
    },
    // 关闭直播
    async closeLive() {
      try {
        this.$confirm('是否确认下播?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(async() => {
            const { data } = await liveRequest.closeLive({
              liveId: this.$route.query.id
            })
            console.log(data)
            if (data.code !== '10000') {
              return
            }
            this.$router.push(`/live-manage/activity`)
          })
          .catch(() => {})
      } catch (error) {
        console.log(error)
      }
    },
    // 分享到各个平台
    shares(index) {
      let _shareUrl = ''
      switch (index) {
        case 0:
          // 真实的appkey，必选参数
          _shareUrl += 'http://v.t.sina.com.cn/share/share.php?title="123"'
          '&url=' + encodeURIComponent(this.shareUrl || document.location) // 参数url设置分享的内容链接|默认当前页location，可选参数
          _shareUrl +=
            '&title=' +
            encodeURIComponent(this.LiveDetails.name || document.title) // 参数title设置分享的标题|默认当前页标题，可选参数
          _shareUrl += '&content=' + 'utf-8' // 参数content设置页面编码gb2312|utf-8，可选参数
          _shareUrl +=
            '&pic=' + encodeURIComponent(this.LiveDetails.coverPicUrl || '') // 参数pic设置图片链接|默认为空，可选参数
          window.open(_shareUrl, '_blank')
          break
        case 1:
          _shareUrl =
            'http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?'
          _shareUrl +=
            'url=' + encodeURIComponent(this.shareUrl || document.location) // 参数url设置分享的内容链接|默认当前页location
          _shareUrl += '&showcount=' + '' || 0 // 参数showcount是否显示分享总数,显示：'1'，不显示：'0'，默认不显示
          _shareUrl +=
            '&desc=' +
            encodeURIComponent(
              '' || this.LiveDetails.merName + '正在直播中,速来围观'
            ) // 参数desc设置分享的描述，可选参数
          _shareUrl += '&summary=' + encodeURIComponent('') // 参数summary设置分享摘要，可选参数
          _shareUrl +=
            '&title=' +
            encodeURIComponent(this.LiveDetails.name || document.title) // 参数title设置分享标题，可选参数
          _shareUrl +=
            '&pics=' + encodeURIComponent(this.LiveDetails.coverPicUrl || '') // 参数pics设置分享图片的路径，多张图片以＂|＂隔开，可选参数
          window.open(_shareUrl, '_blank')
          break
        case 2:
          _shareUrl = 'https://connect.qq.com/widget/shareqq/iframe_index.html?'
          _shareUrl +=
            'url=' + encodeURIComponent(this.shareUrl || location.href) // 分享的链接
          _shareUrl +=
            '&title=' +
            encodeURIComponent(this.LiveDetails.name || document.title) // 分享的标题
          _shareUrl +=
            '&pics=' +
            encodeURIComponent(this.LiveDetails.coverPicUrl || document.title) // 分享的标题
          window.open(_shareUrl, '_blank')
          break
        case 3:
          console.log('复制')
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.bold {
  font-weight: 700;
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
      height: 450px;
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
      cursor: pointer;
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
      cursor: pointer;
    }
    .closeLiveIcon {
      position: absolute;
      top: 5px;
      right: 30px;
    }
  }
}
</style>
