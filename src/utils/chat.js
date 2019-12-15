/**
 * 融云消息类
 */

class Chat {
  // 获取表情列表
  getEmojiList() {
    return window.RongIMLib.RongIMEmoji.list
  }

  // 文字转换emoji显示
  symbolToEmoji(text) {
    return window.RongIMLib.RongIMEmoji.symbolToEmoji(text)
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
      if (messageType === 'image') {
        msg = new RongIMLib.ImageMessage(msgInfo)
      } else if (messageType === 'customize') {
        // 自定义消息(暂时只有商品)
        msg = new RongIMLib.TextMessage(msgInfo)
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
}

export default new Chat()
