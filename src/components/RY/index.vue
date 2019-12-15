<template>
  <!-- 新消息图标 暂时用定位放在这里 -->
  <el-badge class="msg-notice-btn" :is-dot="newMsgComing">
    <i class="el-icon-chat-dot-round" @click="msgBtnClick" />
  </el-badge>
</template>

<script>
import CustomerService from '@/api/customer-service'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      // 是否有新消息 有则展示红点
      newMsgComing: false,
      // 收到的新消息体
      newMsg: null
    }
  },
  computed: {
    ...mapGetters(['merCode', 'userId', 'curOnlineUserData'])
  },
  created() {
    this.createSocketConnection()
    this.querySupportStaffById()
      .then(() => {
        // 获取到融云token后 开始IMLib初始化 设置监听器 连接服务器
        const RYAppKey = 'lmxuhwagl5sad'
        this.ryInit(RYAppKey)
      })
      .catch(err => {
        console.error('err', err)
      })
  },
  methods: {
    ...mapActions({
    }),
    ...mapMutations({
      addMsgToOnlineCurUserMsgList: 'customerService/ADD_MSG_TO_ONLINE_MSG_LIST',
      addBadgeToOnlineUser: 'customerService/addBadgeToOnlineUser',
      setHasNewMsg: 'customerService/setHasNewMsg'
    }),
    // 通过token生成融云token
    querySupportStaffById() {
      return new Promise((resolve, reject) => {
        CustomerService.querySupportStaffById().then(res => {
          console.log('获取登录客服信息', res)
          const result = res.data
          if (result.token) {
            this.ryToken = result.token
            resolve()
          } else {
            reject(res.data)
          }
        })
      })
    },
    // 融云IMLib初始化
    ryInit(RYAppKey) {
      const _this = this
      var RongIMLib = window.RongIMLib
      var RongIMClient = RongIMLib.RongIMClient
      console.log('RongIMClient', RongIMClient)
      RongIMClient.init(RYAppKey)
      RongIMLib.RongIMEmoji.init()

      // 连接状态监听器
      console.log('设置连接状态监听器')
      RongIMClient.setConnectionStatusListener({
        onChanged: function(status) {
          console.log('连接状态监听器触发, status: ', status)
          // status 标识当前连接状态
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              console.log('链接成功')
              break
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log('正在链接')
              break
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              console.log('断开连接')
              break
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              console.log('其他设备登录')
              break
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
              console.log('域名不正确')
              break
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.log('网络不可用')
              break
          }
        }
      })

      // 消息监听器
      console.log('设置消息监听器')
      RongIMClient.setOnReceiveMessageListener({
        // 接收到的消息
        onReceived: function(message) {
          console.error('融云消息监听, 收到消息：', message)
          _this.newMsg = message

          // 通知在线咨询组件有新消息
          _this.setHasNewMsg(true)

          // 判断消息类型
          switch (message.messageType) {
            case RongIMClient.MessageType.TextMessage:
              // message.content.content => 文字内容
              break
            case RongIMClient.MessageType.VoiceMessage:
              // message.content.content => 格式为 AMR 的音频 base64
              break
            case RongIMClient.MessageType.ImageMessage:
              // message.content.content => 图片缩略图 base64
              // message.content.imageUri => 原图 URL
              break
            case RongIMClient.MessageType.LocationMessage:
              // message.content.latiude => 纬度
              // message.content.longitude => 经度
              // message.content.content => 位置图片 base64
              break
            case RongIMClient.MessageType.RichContentMessage:
              // message.content.content => 文本消息内容
              // message.content.imageUri => 图片 base64
              // message.content.url => 原图 URL
              break
            case RongIMClient.MessageType.InformationNotificationMessage:
              // do something
              break
            case RongIMClient.MessageType.ContactNotificationMessage:
              // do something
              break
            case RongIMClient.MessageType.ProfileNotificationMessage:
              // do something
              break
            case RongIMClient.MessageType.CommandNotificationMessage:
              // do something
              break
            case RongIMClient.MessageType.CommandMessage:
              // do something
              break
            case RongIMClient.MessageType.UnknownMessage:
              // do something
              break
            default:
              // do something
          }

          // 判断如果在聊天界面则直接改变数据 不再聊天界面则右上角弹出通知
          if (_this.$route.path === '/customerService/consultation') {
            console.log('curOnlineUserData', _this.curOnlineUserData)

            const { userId } = _this.curOnlineUserData

            // 判断接收的消息是否来自当前打开窗口的用户 是则直接追加消息 否则在左侧会话头像添加徽标
            if (userId === message.senderUserId) {
              _this.addMsgToOnlineCurUserMsgList({
                content: message.content.content, // 消息内容
                coversionType: 'PERSON', // 消息类型
                fromUserId: message.senderUserId, // 发送用户id
                merCode: _this.merCode, // 商户编码
                messageType: 'RC:TxtMsg', // 消息类型
                msgUid: message.messageUId, // 消息id
                timeStamp: message.sentTime, // 时间戳
                toUserId: _this.userId, // 接收用户id
                userId: message.targetId // 用户id
              })
              setTimeout(() => {
                _this.scrollToBottom()
              }, 100)
            } else {
              _this.addBadgeToOnlineUser({
                userId: message.senderUserId
              })
            }
          } else {
            _this.newMsgComing = true
            _this.$notify({
              type: 'info',
              title: '您有新的消息',
              message: message.content.content,
              duration: 5000,
              onClick: e => {
                console.log('click e', e)
                _this.newMsgComing = false
                console.log('newMsgComing', _this.newMsg)
                _this.$notify.close()
                _this.$router.push({
                  path: '/customerService/consultation',
                  query: {
                    targetId: _this.newMsg.targetId,
                    msgInfo: JSON.stringify(_this.newMsg)
                  }
                })
              }
            })
          }
        }
      })

      // 连接融云服务器
      console.log('连接融云服务器')
      RongIMClient.connect(this.ryToken, {
        onSuccess: function(userId) {
          console.log('Connect successfully. ' + userId)
        },
        onTokenIncorrect: function() {
          console.log('token 无效')
        },
        onError: function(errorCode) {
          console.log('connect errorCode', errorCode)
          var info = ''
          switch (errorCode) {
            case RongIMLib.ErrorCode.TIMEOUT:
              info = '超时'
              break
            case RongIMLib.ConnectionState.UNACCEPTABLE_PAROTOCOL_VERSION:
              info = '不可接受的协议版本'
              break
            case RongIMLib.ConnectionState.IDENTIFIER_REJECTED:
              info = 'appkey不正确'
              break
            case RongIMLib.ConnectionState.SERVER_UNAVAILABLE:
              info = '服务器不可用'
              break
          }
          console.log('info', info)
        }
      })
      this.RongIMClient = RongIMClient
      return RongIMClient
    },
    // 消息按钮点击 跳转逻辑
    msgBtnClick() {
      // 如果没有新消息则跳转历史消息 否则跳转在线咨询
      if (!this.newMsgComing) {
        this.$router.push({
          path: '/customerService/historyMsg'
        })
      } else {
        this.newMsgComing = false
        this.$router.push({
          path: '/customerService/consultation',
          query: {
            targetId: this.newMsg.targetId,
            msgInfo: JSON.stringify(this.newMsg)
          }
        })
      }
    },
    scrollToBottom: function() {
      this.$nextTick(() => {
        var container = document.getElementById('chat-detail-list')
        container.scrollTop = container.scrollHeight
      })
    },
    // 新建客服状态websocket连接
    createSocketConnection() {
      const self = this
      if ('WebSocket' in window) {
        var ws = new WebSocket('ws://middle.dev.ydjia.cn:5416/ws')

        var cToken = getToken()

        ws.onopen = function() {
          const data = {
            account: self.userId, // 账号
            accountType: 1, // 	账号类型，1-客服，2-非客服
            cmd: 1, // 命令,1-连接，2-心跳，3-关闭连接
            deviceId: '1111', // 设备ID
            merCode: self.merCode, // 商户编号
            msgtype: 1, // 消息类型,1-请求，2-应答
            platform: 3, // 平台,1-android,2-ios,3-web
            platformVersion: 'v1', // 平台版本
            systemType: 2, //  1-小蜜，2-药店加
            token: cToken, // 	中台用户登录的token
            version: 1 // 协议版本
          }
          console.log('连接data', data)

          // Web Socket 已连接上，使用 send() 方法发送数据
          ws.send(JSON.stringify(data))
          console.warn('数据发送中...')

          // 设置心跳
          setInterval(() => {
            // 设置心跳
            const heartBeatData = {
              cmd: 2,
              deviceId: '1111',
              merCode: self.merCode,
              msgtype: 1,
              platform: 3,
              platformVersion: 'v1',
              systemType: 2,
              token: cToken,
              version: 1
            }
            console.log('设置心跳, 参数：', heartBeatData)
            ws.send(JSON.stringify(heartBeatData))
          }, 60000)
        }

        ws.onmessage = function(evt) {
          // var received_msg = evt.data
        }

        ws.onclose = function() {
          // 关闭 websocket
          console.error('连接已关闭')
        }
      } else {
        // 浏览器不支持 WebSocket
        console.error('您的浏览器不支持 WebSocket!')
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .msg-notice-btn {
    position: fixed;
    top: 16px;
    right: 330px;
    z-index: 200;
    color: #fff;
  }
</style>
