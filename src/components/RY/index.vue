<template>
  <!-- 新消息图标 暂时用定位放在这里 -->
  <el-badge class="msg-notice-btn" :is-dot="hasNewMsg">
    <i :class="`el-icon-chat-dot-round ${hasNewMsg&&'shaking'}`" @click="msgBtnClick" />
  </el-badge>
</template>

<script>
import CustomerService from '@/api/customer-service'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Chat from '@/utils/chat'
import { getToken } from '@/utils/auth'
export default {
  data() {
    return {
      // 收到的新消息体
      newMsg: null
    }
  },
  computed: {
    ...mapGetters(['merCode', 'userId']),
    ...mapState('customerService', [
      'curOnlineUserData',
      'hasNewMsg'
    ])
  },
  created() {
    const _this = this
    this.querySupportStaffById()
      .then(() => {
        // 获取到融云token后 开始IMLib初始化
        Chat.init({
          ryToken: this.ryToken,
          // 收到消息监听
          onReceived: message => {
            this.newMsg = message
            // 通知在线咨询组件有新消息
            console.log('消息组件，收到消息', message)

            const { userId } = _this.curOnlineUserData

            // 判断如果在聊天界面则直接改变数据 不再聊天界面则右上角弹出通知
            if (_this.$route.path === '/customerService/consultation') {
              console.log('当前在咨询页面:curOnlineUserData', _this.curOnlineUserData, message.senderUserId)

              // 判断接收的消息是否来自当前打开窗口的用户 是则直接追加消息 否则在左侧会话头像添加徽标
              if (userId.toString() === message.content.extra.userId.toString()) {
                _this.addMsgToOnlineCurUserMsgList({
                  type: 'listener', // 类型 来自融云消息监听
                  merCode: _this.merCode,
                  msgResult: {
                    ...message,
                    content: {
                      ...message.content,
                      content: message.content.content ? Chat.symbolToEmoji(message.content.content) : ''
                    }
                  }
                })
                setTimeout(() => {
                  _this.scrollToBottom()
                }, 100)
              } else {
                console.log('不是来自当前窗口的用户', 'userId:', userId, 'messageUserId:', message.content.extra.userId)
                _this.addBadgeToOnlineUser({
                  userId: message.senderUserId,
                  message
                })
              }
            } else {
              console.log('当前不在咨询页面', message)
              if (message.messageDirection === 2) {
                this.setHasNewMsg(true)
              }
              console.log('goto addBadgeToOnlineUser')
              _this.addBadgeToOnlineUser({
                userId: message.senderUserId,
                message
              })
              console.log('goto setCurOnlineUserId')
              _this.setCurOnlineUserId({
                userId: message.senderUserId
              })
              _this.addMsgToOnlineCurUserMsgList({
                type: 'listener', // 类型 来自融云消息监听
                merCode: _this.merCode,
                msgResult: {
                  content: {
                    content: Chat.symbolToEmoji(message.content.content),
                    extra: message.content.extra
                  }, // 消息内容
                  senderUserId: message.senderUserId, // 发送用户id
                  objectName: message.objectName, // 消息类型 这里不能取messageType
                  messageUId: message.messageUId, // 消息id
                  sentTime: message.sentTime, // 时间戳
                  // targetId: _this.userId // 接收用户id
                  targetId: message.targetId // 接收用户id
                }
              })
              // 只有C端发送的消息才弹出通知
              if (message.messageDirection === 2) {
                _this.$notify({
                  type: 'info',
                  title: '您有新的消息',
                  message: Chat.symbolToEmoji(message.content.content),
                  duration: 5000,
                  onClick: e => {
                    console.log('click e', e)
                    _this.setHasNewMsg(false)
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
              // if
            }
          },
          // 状态监听
          onStatusChange: status => {
            const RongIMLib = window.RongIMLib
            console.warn('融云聊天服务: onStatusChange', status)
            // status 标识当前连接状态
            switch (status) {
              // CONNECTED: 0
              // CONNECTING: 1
              // DISCONNECTED: 2
              // KICKED_OFFLINE_BY_OTHER_CLIENT: 6
              // WEBSOCKET_UNAVAILABLE: 7
              // NETWORK_UNAVAILABLE: 3
              // DOMAIN_INCORRECT: 12
              // APPKEY_IS_FAKE: 20
              // CONNECTION_CLOSED: 4
              // ULTRALIMIT: 1101
              // REQUEST_NAVI: 201
              // RESPONSE_NAVI: 202
              // RESPONSE_NAVI_ERROR: 203
              // RESPONSE_NAVI_TIMEOUT: 204
              case RongIMLib.ConnectionStatus.CONNECTED:
                console.log('连接融云聊天服务器成功')
                this.$message({
                  type: 'success',
                  message: '聊天服务连接成功'
                })
                break
              case RongIMLib.ConnectionStatus.CONNECTING:
                console.log('正在连接融云聊天服务器')
                break
              case RongIMLib.ConnectionStatus.DISCONNECTED:
                this.$confirm('融云聊天服务断开连接，是否重新连接？', '提示', {
                  distinguishCancelAndClose: true,
                  confirmButtonText: '继续聊天',
                  cancelButtonText: '取消'
                })
                break
              case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
                console.error('融云聊天服务: 其他设备登录')
                this.$confirm(
                  '当前账号已在其他设备登录，是否切换至当前设备继续聊天？',
                  '提示',
                  {
                    distinguishCancelAndClose: true,
                    confirmButtonText: '继续聊天',
                    cancelButtonText: '取消'
                  }
                ).then(res => {
                  Chat.connect()
                })
                break
              case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
                console.error('融云聊天服务: 域名不正确')
                break
              case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
                console.error('融云聊天服务: 网络不可用')
                break
              case RongIMLib.ConnectionStatus.CONNECTION_CLOSED:
                console.error('融云聊天服务: 连接已关闭')
            }
          }
        }).then(res => {
          console.log('ry init 初始化成功')
          this.setRyConnected(true)
        })
      })
      .catch(err => {
        console.error('err', err)
      })
  },
  methods: {
    ...mapActions({}),
    ...mapMutations({
      addMsgToOnlineCurUserMsgList:
          'customerService/ADD_MSG_TO_ONLINE_MSG_LIST',
      addBadgeToOnlineUser: 'customerService/addBadgeToOnlineUser',
      setHasNewMsg: 'customerService/setHasNewMsg',
      setRyConnected: 'customerService/SET_RY_INIT_STATUS',
      setMerLogo: 'customerService/SET_MER_LOGO',
      setWebSocketConnectionStatus:
          'customerService/setWebSocketConnectionStatus',
      setCurOnlineUserId: 'customerService/SET_CUR_ONLINE_USERID'
    }),
    // 通过token生成融云token
    querySupportStaffById() {
      return new Promise((resolve, reject) => {
        CustomerService.querySupportStaffById().then(res => {
          console.log('获取登录客服信息', res)
          if (res.data) {
            const result = res.data
            this.setMerLogo(this.showImg(result.merLogo))
            if (result.token) {
              // 有token, 是客服才连接websocket
              this.ryToken = result.token
              this.createSocketConnection()
              resolve()
            } else {
              // 否则直接将websocket连接设置为true 用于在页面中控制需要websocket之后的请求
              this.setWebSocketConnectionStatus(true)
              reject(res.data)
            }
          } else {
            this.setWebSocketConnectionStatus(true)
            reject('获取融云token失败')
          }
        })
      })
    },
    // 消息按钮点击 跳转逻辑
    msgBtnClick() {
      if (!this.hasNewMsg) {
        this.$router.push({
          path: '/customerService/consultation'
        })
      } else {
        this.hasNewMsg = false
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
        var ws = CustomerService.connectToIMServer()

        console.warn('Websocket对象', ws)

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
          self.setWebSocketConnectionStatus(true)
          console.warn('websocket open', data)

          if (ws.readyState === window.WebSocket.OPEN) {
            console.warn('准备发送数据...')
            // Web Socket 已连接上，使用 send() 方法发送数据
            try {
              ws.send(JSON.stringify(data))
            } catch (error) {
              console.error('websocket发送消息失败', error)
            }
            console.warn('数据发送中...')
          } else {
            console.error('监听到webscoket状态改变')
          }

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
          var received_msg = evt.data
          console.log('接收消息', received_msg)
        }

        ws.onclose = function(e) {
          // 关闭 websocket
          console.error('连接已关闭', e)
          self.$confirm(
            '由于网络状况等原因，聊天连接已断开，是否重新连接？',
            '提示',
            {
              distinguishCancelAndClose: true,
              confirmButtonText: '重新连接',
              cancelButtonText: '取消'
            }
          ).then(res => {
            window.location.reload()
          })
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

    @keyframes fade {
      from {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }

    @-webkit-keyframes fade {
      from {
        opacity: 1;
      }
      50% {
        opacity: 0.4;
      }
      to {
        opacity: 1;
      }
    }
    i {
      &.shaking {
        animation: fade 1000ms infinite;
      }
    }
  }
</style>
