<template>
  <!-- 新消息图标 暂时用定位放在这里 -->
  <el-badge class="msg-notice-btn" :is-dot="newMsgComing">
    <i class="el-icon-chat-dot-round" @click="msgBtnClick" />
  </el-badge>
</template>

<script>
import CustomerService from '@/api/customer-service'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Chat from '@/utils/chat'
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
    const _this = this
    this.createSocketConnection()
    this.querySupportStaffById()
      .then(() => {
        // 获取到融云token后 开始IMLib初始化
        Chat.init({
          ryToken: this.ryToken,
          onReceived: message => {
            this.newMsg = message
            // 通知在线咨询组件有新消息
            console.log('setHasNewMsg')
            this.setHasNewMsg(true)

            // 判断如果在聊天界面则直接改变数据 不再聊天界面则右上角弹出通知
            if (_this.$route.path === '/customerService/consultation') {
              console.log('curOnlineUserData', _this.curOnlineUserData)

              const { userId } = _this.curOnlineUserData

              // 判断接收的消息是否来自当前打开窗口的用户 是则直接追加消息 否则在左侧会话头像添加徽标
              if (userId === message.senderUserId) {
                _this.addMsgToOnlineCurUserMsgList({
                  merCode: _this.merCode,
                  msgResult: {
                    content: {
                      content: Chat.symbolToEmoji(message.content.content)
                    }, // 消息内容
                    senderUserId: message.senderUserId, // 发送用户id
                    objectName: message.objectName, // 消息类型 这里不能取messageType
                    messageUId: message.messageUId, // 消息id
                    sentTime: message.sentTime, // 时间戳
                    targetId: _this.userId // 接收用户id
                  }
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
                message: Chat.symbolToEmoji(message.content.content),
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
      setRyConnected: 'customerService/SET_RY_INIT_STATUS'
    }),
    // 通过token生成融云token
    querySupportStaffById() {
      return new Promise((resolve, reject) => {
        CustomerService.querySupportStaffById().then(res => {
          console.log('获取登录客服信息', res)
          if (res.data) {
            const result = res.data
            if (result.token) {
              this.ryToken = result.token
              resolve()
            } else {
              reject(res.data)
            }
          } else {
            // this.$message({
            //   message: '获取融云token失败',
            //   type: 'error'
            // })
            reject('获取融云token失败')
          }
        })
      })
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
