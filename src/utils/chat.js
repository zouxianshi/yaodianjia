/**
 * 融云聊天/消息类
 */

import { Message } from 'element-ui'

const RongIMClient = window.RongIMClient
const RongIMLib = window.RongIMLib

class Chat {
  RYAppKey = 'lmxuhwagl5sad'
  RongIMLib = window.RongIMLib
  RongIMClient = window.RongIMClient

  ConversationType = {

  }

  /**
   * 消息类型
   */
  MessageType = {
    TextMessage: 'RC:TxtMsg', // 文本消息
    ImageMessage: 'RC:ImgMsg', // 图片消息
    GoodsMessage: 'custom:commodity' // 商品消息
  }

  // 初始化融云 IMLib
  init({ ryToken, onReceived }) {
    return new Promise((resolve, reject) => {
      this.ryToken = ryToken
      var RongIMLib = window.RongIMLib
      var RongIMClient = RongIMLib.RongIMClient
      RongIMClient.init(this.RYAppKey)
      RongIMLib.RongIMEmoji.init()

      // 设置监听器
      this.setConnectionStatusListener()
      this.setOnReceiveMessageListener(onReceived)

      // 注册自定义消息类
      this.registerCustomizeMsgType()

      // 连接融云服务器
      this.connect().then((res) => {
        resolve()
      })
    })
  }

  // 注册自定义消息类(商品消息)
  registerCustomizeMsgType() {
    var messageName = 'GoodsMessage' // 消息名称
    var objectName = 'custom:commodity' // 消息内置名称，请按照此格式命名
    var isCounted = true // 消息计数
    var isPersited = true // 消息保存
    var mesasgeTag = new RongIMLib.MessageTag(isCounted, isPersited)
    var prototypes = ['content', 'extra'] // 消息类中的属性名
    RongIMClient.registerMessageType(messageName, objectName, mesasgeTag, prototypes)
  }

  // 设置连接状态监听器
  setConnectionStatusListener() {
    return new Promise((resolve, reject) => {
      RongIMClient.setConnectionStatusListener({
        onChanged: function(status) {
          console.log('触发融云连接状态监听器，状态码：', status)
          // status 标识当前连接状态
          switch (status) {
            case RongIMLib.ConnectionStatus.CONNECTED:
              console.log('链接成功')
              resolve()
              break
            case RongIMLib.ConnectionStatus.CONNECTING:
              console.log('正在链接')
              break
            case RongIMLib.ConnectionStatus.DISCONNECTED:
              Message({
                type: 'error',
                message: '断开连接'
              })
              break
            case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
              Message({
                type: 'error',
                message: '其他设备登录'
              })
              break
            case RongIMLib.ConnectionStatus.DOMAIN_INCORRECT:
              console.error('域名不正确')
              reject('域名不正确')
              break
            case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
              console.error('网络不可用')
              reject('网络不可用')
              break
          }
        }
      })
    })
  }

  // 设置消息监听器
  setOnReceiveMessageListener(receivedCb) {
    // var _this = this
    console.log('设置消息监听器')
    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function(message) {
        console.warn('融云消息监听, 收到消息：', message)

        // 调用消息监听回调
        receivedCb(message)

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
  }

  // 连接融云服务器
  connect() {
    console.log('连接融云服务器')
    return new Promise((resolve, reject) => {
      RongIMClient.connect(this.ryToken, {
        onSuccess: function(userId) {
          console.log('Connect successfully. ' + userId)
          resolve()
        },
        onTokenIncorrect: function() {
          console.log('token 无效')
          reject('errorCode')
        },
        onError: function(errorCode) {
          console.log('connect errorCode', errorCode)
          reject(errorCode)
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
    })
  }

  // 获取表情列表
  getEmojiList() {
    return window.RongIMLib.RongIMEmoji.list
  }

  // 文字转换emoji显示
  symbolToEmoji(text) {
    return window.RongIMLib.RongIMEmoji.symbolToEmoji(text)
  }

  // emoji转文字
  emojiToSymbol(text) {
    return window.RongIMLib.RongIMEmoji.emojiToSymbol(text)
  }

  // 获取会话列表
  getConversationList() {
    const conversationTypes = [window.RongIMLib.ConversationType.PRIVATE]
    const count = 150
    return new Promise((resolve, reject) => {
      window.RongIMClient.getInstance().getConversationList(
        {
          onSuccess: function(list) {
            resolve(list)
          },
          onError: function(error) {
            reject(error)
          }
        },
        conversationTypes,
        count
      )
    })
  }

  // 发送消息
  sendMessage({
    targetId, // 接收者的id
    msgInfo, // 融云消息体
    messageType // 消息类型
  }) {
    const RongIMLib = window.RongIMLib
    const RongIMClient = window.RongIMClient
    return new Promise((resolve, reject) => {
      var msg = ''
      // 图片消息
      if (messageType === this.MessageType.ImageMessage) {
        msg = new RongIMLib.ImageMessage(msgInfo)
      } else if (messageType === this.MessageType.GoodsMessage) {
        // 自定义消息(暂时只有商品)
        msg = new RongIMClient.RegisterMessage.GoodsMessage({
          content: JSON.stringify(msgInfo.content),
          extra: msgInfo.extra
        })
      } else {
        // 其他默认文本消息
        msg = new RongIMLib.TextMessage(msgInfo)
      }
      var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊
      // targetId 需要转成字符串 不然收不到
      RongIMClient.getInstance().sendMessage(conversationType, targetId.toString(), msg, {
        onSuccess: function(message) {
          console.log('发送成功：message', message, targetId)
          // message 为发送的消息对象并且包含服务器返回的消息唯一 Id 和发送消息时间戳
          resolve(message)
        },
        onError: function(errorCode, message) {
          console.error('err', errorCode)
          reject(errorCode, message)
        }
      })
    })
  }

  // 扩展方法到vue组件
  // 使用：直接在methods中写 ...Chat.mapChat() 即可  类似vuex的mapActions
  mapChat() {
    return {
      getEmojiList: this.getEmojiList,
      symbolToEmoji: this.symbolToEmoji,
      getConversationList: this.getConversationList,
      sendMessage: this.sendMessage
    }
  }
}

export default new Chat()
