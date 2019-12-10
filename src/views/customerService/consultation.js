// import chatRoom from './components/chatRoom'
import user from './components/user'
import listItem from './components/listItem'
import { getToken } from '@/utils/auth'
import { querySupportStaffById } from '@/api/customer-service'
import { mapGetters } from 'vuex'
export default {
  name: 'Consultation',
  components: {
    // chatRoom,
    user,
    listItem
  },
  data() {
    return {
      // 当前选中的标签页标识
      activeName: 'first',
      // 当前打开的聊天窗口用户名
      currentUser: '@用户名',
      // 左侧用户列表
      userList: new Array(10),
      // 当前用户聊天记录
      conversationList: [
        {
          date: '2019-06-07',
          list: [
            {
              from: 'user',
              text: 'hahhh',
              time: '10:23:00'
            },
            {
              from: 'merchant',
              text: 'bububu',
              time: '10:22:38'
            }
          ]
        },
        {
          date: '2019-06-06',
          list: [
            {
              from: 'user',
              text: 'hahhh',
              time: '10:23:00'
            },
            {
              from: 'merchant',
              text: 'bububu',
              time: '10:22:38'
            }
          ]
        }
      ],
      orderList: [
        {
          orderNo: 2012012001201212,
          time: '2018-05-02 19:23',
          goodsList: [
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            }
          ]
        },
        {
          orderNo: 2012012001201212,
          time: '2018-05-02 19:23',
          goodsList: [
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            }
          ]
        }
      ],
      textarea: ''
    }
  },
  computed: {
    ...mapGetters(['merCode', 'userId'])
  },
  created() {
    console.error(
      'this',
      this,
      'merCode',
      this.merCode,
      'account',
      this.account,
      'token',
      this.token,
      'userId',
      this.userId
    )

    // 创建客服在线状态长连接
    this.createSocketConnection()

    this.querySupportStaffById().then(() => {
      // 获取到融云token后 开始IMLib初始化 设置监听器 连接服务器
      const _this = this
      const RYAppKey = 'lmxuhwagl5sad'
      const RongIMClient = this.ryInit(RYAppKey)
      var RongIMLib = window.RongIMLib

      // 获取会话列表
      console.log('开始获取会话列表')
      // 获取的会话类型
      var conversationTypes = [RongIMLib.ConversationType.PRIVATE]
      // 获取的会话最大数量
      var count = 150
      RongIMClient.getInstance().getConversationList(
        {
          onSuccess: function(list) {
            console.log('获取会话列表成功', list)
            _this.conversationList = list
            // list => 会话列表集合
          },
          onError: function(error) {
            // do something
            console.log('获取会话列表失败', error)
          }
        },
        conversationTypes,
        count
      )
    })
  },
  methods: {

    // 融云IMLib初始化
    ryInit(RYAppKey) {
      var RongIMLib = window.RongIMLib
      var RongIMClient = RongIMLib.RongIMClient
      console.log('RongIMClient', RongIMClient)
      RongIMClient.init(RYAppKey)

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

    // 通过token生成融云token
    querySupportStaffById() {
      return new Promise((resolve, reject) => {
        querySupportStaffById().then(res => {
          console.log('获取登录客服信息', res)
          const result = res.data
          this.ryToken = result.token
          resolve()
        })
      })
    },
    textAreaChange(e) {
      console.log('e', e)
    },
    sendMsg() {
      var msgInfo = {
        content: this.textarea,
        extra: '附加信息'
      }
      var RongIMLib = window.RongIMLib
      console.log('msgInfo', msgInfo)
      var msg = new RongIMLib.TextMessage(msgInfo)
      var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊
      var targetId = '9509f1082bee4623b5b74e5c35fd0156' // 用户 B 的 userId
      this.RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
        onSuccess: function(message) {
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          console.log('Send successfully', message)
        },
        onError: function(errorCode, message) {
          console.log('send message error', errorCode, message)
        }
      })
    },

    // textarae change
    handleTextAreaChange(val) {
      console.log('val', val)
      this.textarea = val
    },

    // action click
    handleActionClick(type) {
      console.log('type', type)
    },

    // 新建客服状态websocket连接
    createSocketConnection() {
      const self = this
      if ('WebSocket' in window) {
        console.warn('您的浏览器支持 WebSocket!')

        // 打开一个 web socket
        var ws = new WebSocket('ws://middle.dev.ydjia.cn:5416/ws')

        var cToken = getToken()
        console.log('用户token', cToken)

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
          var received_msg = evt.data
          console.warn('客户端数据接收', received_msg)
        }

        ws.onclose = function() {
          // 关闭 websocket
          console.warn('连接已关闭')
        }
      } else {
        // 浏览器不支持 WebSocket
        console.error('您的浏览器不支持 WebSocket!')
      }
    },
    // 右侧标签页切换
    handleRightTabClick(tab, e) {
      console.log('tab', tab, 'e', e)
    }
  }
}
