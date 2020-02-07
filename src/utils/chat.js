/**
 * 融云聊天/消息类
 */
import store from './../store'

const RongIMClient = window.RongIMClient
const RongIMLib = window.RongIMLib

class Chat {
  RYAppKey = process.env.VUE_APP_RY_KEY || 'lmxuhwagl5sad'
  RongIMLib = window.RongIMLib
  RongIMClient = window.RongIMClient

  /**
   * 消息类型
   */
  MessageType = {
    TextMessage: 'RC:TxtMsg', // 文本消息
    ImageMessage: 'RC:ImgMsg', // 图片消息
    GoodsMessage: 'custom:commodity' // 商品消息
    // RC:ReadNtf  // 已读通知
  }

  // 判断两条消息是不是来自一个用户
  isUserEqual(msg1, msg2) {
    if (msg1.content.extra.userId.toString() === msg2.content.extra.userId.toString()) {
      return true
    }
    return false
  }

  // 初始化融云 IMLib
  init({ ryToken, onReceived, onStatusChange }) {
    return new Promise((resolve, reject) => {
      this.ryToken = ryToken
      var RongIMLib = window.RongIMLib
      var RongIMClient = RongIMLib.RongIMClient
      RongIMClient.init(this.RYAppKey)
      RongIMLib.RongIMEmoji.init()

      // 设置监听器
      this.setConnectionStatusListener(onStatusChange)
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
  setConnectionStatusListener(statusChangeCb) {
    console.log('RongIMLib.ConnectionStatus', RongIMLib.ConnectionStatus)
    RongIMClient.setConnectionStatusListener({
      onChanged: function(status) {
        console.log('触发融云连接状态监听器，状态码：', status)
        statusChangeCb(status)
      }
    })
  }

  /**
   * 验证消息类型
   */
  validateMessageType(message) {
    if ([this.MessageType.TextMessage, this.MessageType.ImageMessage, this.MessageType.GoodsMessage].indexOf(message.objectName) > -1) {
      return true
    } else {
      return false
    }
  }

  // 设置消息监听器
  setOnReceiveMessageListener(receivedCb) {
    var _this = this
    console.log('设置消息监听器')
    RongIMClient.setOnReceiveMessageListener({
      // 接收到的消息
      onReceived: function(message) {
        console.warn('融云消息监听, 收到消息：', message)

        // 验证消息类型 只接收文本/图片/商品消息
        if (!_this.validateMessageType(message)) {
          console.log('不用于展示的消息', message)
          if (message.objectName === 'RC:ReadNtf') {
            // 已读通知则前往会话列表中减少一条消息数量
            console.log('这是一条已读消息回执')
            store.commit('customerService/readMessage', message)
          }
          if (message.objectName === 'RC:SRSMsg') {
            store.commit('customerService/syncReadStatus', message)
          }
          return
        }

        if (message.objectName === _this.MessageType.ImageMessage) {
          console.log('图片消息', message)
          message.content.content = message.content.imageUri
        }

        if (message.content) {
          message.content.content = message.content.content || ''
          if (typeof message.content.extra === 'string') {
            message.content.extra = JSON.parse(message.content.extra)
          }
        }

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
    const _self = this
    return new Promise((resolve, reject) => {
      window.RongIMClient.getInstance().getConversationList(
        {
          onSuccess: function(list) {
            console.warn('融云初始化的会话列表', list)
            const tempList = []
            list.forEach(element => {
              if (element.latestMessage) {
                if (element.latestMessage.content) {
                  if (element.latestMessage.content.extra && typeof element.latestMessage.content.extra === 'string') {
                    element.latestMessage.content.extra = JSON.parse(element.latestMessage.content.extra)
                  }
                }
              }
              // 验证消息类型
              if (_self.validateMessageType(element.latestMessage)) {
                tempList.push(element)
              }
            })
            console.error('Chat.getConversationList返回的会话列表', tempList)
            resolve(tempList)
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

  // 发送已读通知
  sendReceiptMessage(message) {
    console.log('进入sendReceiptMessage', message)
    var messageUId = message.messageUId // '1301-NBJQ-MK31-3417';  // 消息唯一 Id, message 中的 messageUid
    var lastMessageSendTime = message.sentTime //  1550719033312;  // 最后一条消息的发送时间
    var type = '1' // 备用，默认赋值 1 即可
    // 以上 3 个属性在会话的最后一条消息中可以获得

    var msg = new RongIMLib.ReadReceiptMessage({ messageUId: messageUId, lastMessageSendTime: lastMessageSendTime, type: type })
    var conversationType = RongIMLib.ConversationType.PRIVATE
    var targetId = message.content.extra.userId // 目标 Id

    RongIMClient.getInstance().sendMessage(conversationType, targetId, msg, {
      onSuccess: function(message) {
        console.log('发送已读通知成功', message)
      },
      onError: function(errorCode) {
        console.log('发送已读通知失败', errorCode)
      }
    })
  }

  // 清除指定会话未读数
  clearUserUnreadMessage(data) {
    console.log('into 清除指定会话未读数', data)
    var conversationType = RongIMLib.ConversationType.PRIVATE
    var targetId = data.targetId
    RongIMClient.getInstance().clearUnreadCount(conversationType, targetId, {
      onSuccess: function() {
        console.log('清除指定会话未读消息数成功')
      },
      onError: function(error) {
        console.log('清除指定会话未读消息数失败', error)
      }
    })
  }

  // 同步消息状态到其他端
  syncReadStatus(data) {
    console.log('into 同步消息状态到其他端')
    // 从消息里获取服务器端时间，以最近一条已读 message 为准
    var msg = {
      lastMessageSendTime: data.sentTime
    }
    var conversationType = RongIMLib.ConversationType.PRIVATE
    msg = new RongIMLib.SyncReadStatusMessage(msg)
    var sendSyncStutus = RongIMClient.getInstance().sendMessage
    sendSyncStutus(conversationType, data.targetId, msg, {
      onSuccess: function(e) {
        console.log('同步消息状态成功', e)
      },
      onError: function(e) {
        console.error('同步消息状态失败', e)
      }
    })
  }
}

export default new Chat()
