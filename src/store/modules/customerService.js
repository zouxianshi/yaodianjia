import Chat from '@/utils/chat'
import CustomerService from '@/api/customer-service'
const state = {
  // 历史会话列表
  historyCSList: [],
  // 当前历史会话消息记录
  curHistoryMsgList: [],
  // 在线咨询当前用户数据
  curOnlineUserData: {
    userId: '', // 当前打开聊天窗口的用户id
    list: [], // 列表
    count: 0, // 数量
    curPageNo: 1, // 当前页码
    curPageSize: 20, // 每页条数
    hasMore: true // 是否有更多数据
  },
  // 在线咨询会话列表相关
  onlineConversationData: {
    list: [], // 会话列表
    hasNewMsg: false // 是否有新消息
  },
  hasNewMsg: false,
  ryConnected: false, // 融云连接服务器成功
  webSocketConnected: false, // websocket是否连接成功
  merLogo: '123' // 商家头像 用于客服头像展示
}

const mutations = {

  // 同步阅读状态
  syncReadStatus(state, payload) {
    console.log('接收到已读回执处理', payload)
    const tempList = [...state.onlineConversationData.list]
    const curItem = tempList.find(item => {
      if (item.latestMessage.content.extra.userId.toString() === payload.targetId.toString() && payload.messageDirection === 1) {
        return true
      } return false
    })
    if (curItem) {
      if (curItem.newMsgNum > 0) {
        curItem.unreadMessageCount = 0
        curItem.newMsgNum = 0
      }
    }
    // 清除未读消息数
    Chat.clearUserUnreadMessage(payload)
    state.onlineConversationData.list = tempList
    localStorage.setItem('ryCSList', JSON.stringify(tempList))
  },

  // 接收到已读回执的处理
  readMessage(state, payload) {
    console.log('接收到已读回执处理', payload)
    const tempList = [...state.onlineConversationData.list]
    const curItem = tempList.find(item => {
      if (item.latestMessage.content.extra.userId.toString() === payload.targetId.toString() && payload.messageDirection === 1) {
        return true
      } return false
    })
    if (curItem) {
      if (curItem.newMsgNum > 0) {
        curItem.unreadMessageCount = 0
        curItem.newMsgNum = 0
      }
    }
    state.onlineConversationData.list = tempList
    localStorage.setItem('ryCSList', JSON.stringify(tempList))
  },

  // 设置缓存中的会话列表
  setConversationListToLocalStorage(state, payload) {

  },

  /**
   * 设置websocket连接状态
   */
  setWebSocketConnectionStatus(state, payload) {
    state.webSocketConnected = payload
  },

  /**
   * 设置客服头像
   */
  SET_MER_LOGO(state, payload) {
    state.merLogo = payload
    console.error('state', state)
  },

  /**
   * 融云相关
   */
  SET_RY_INIT_STATUS(state, payload) {
    console.log('into SET_RY_INIT_STATUS')
    state.ryConnected = true
  },

  /**
   * 消息记录相关
   */

  // 设置客服历史会话列表
  SET_HISTORY_CONVERSATIONLIST: (state, payload) => {
    console.log('mutations payload', payload)
    state.historyCSList = payload.conversationList
  },
  // 设置当前选中的会话用户ID
  SET_HIS_CUR_USERID(state, payload) {
    // state.s
    console.log('SET_HIS_CUR_USERID payload', payload)
  },
  // 设置消息记录列表
  SET_HISTORY_MSG_LIST(state, payload) {
    console.log('SET_HISTORY_MSG_LIST payload', payload)
  },

  /**
   * 在线咨询相关
   */

  // 设置是否有新消息
  setHasNewMsg(state, payload) {
    console.log('设置是否有新消息', payload)
    state.onlineConversationData.hasNewMsg = payload
    state.hasNewMsg = payload
  },

  // 设置在线咨询当前选中用户id
  SET_CUR_ONLINE_USERID(state, payload) {
    const { userId } = payload
    state.curOnlineUserData.userId = userId

    // 清空未读badge
    const onlineUserList = state.onlineConversationData.list
    onlineUserList.forEach((element) => {
      if (element.targetId === userId) {
        element.newMsgNum = 0
        element.unreadMessageCount = 0
      }
    })
    // setStorage为false则不设置localStorage
    if (payload.setStorage !== false) {
      console.log('setStorage不为false, 设置缓存', payload.setStorage)
      console.log(' SET_CUR_ONLINE_USERID 的localStorage设置')
      localStorage.setItem('ryCSList', JSON.stringify(onlineUserList))
    }
    state.onlineConversationData.list = onlineUserList
  },

  // 设置在线咨询当前用户消息列表
  SET_ONLINE_CURUSER_LIST(state, payload) {
    console.log('SET_ONLINE_CURUSER_LIST payload', payload)
    console.log('state', state)
    // state.onlineCurUserMsgList = payload.
    const {
      data: list
    } = payload
    const tempList = state.curOnlineUserData.list
    list.forEach(element => {
      const parsedData = element
      tempList.unshift(parsedData)
    })
    state.curOnlineUserData.curPageNo++
    state.curOnlineUserData.list = tempList
    state.curOnlineUserData.hasMore = list.length > 0
  },

  // 删除在线咨询会话item
  DEL_ONLINE_CONVERSATOIN(state, payload) {
    // 删除localStorage 中的item
    let localConversationList = null
    if (localStorage.getItem('ryCSList')) {
      localConversationList = JSON.parse(localStorage.getItem('ryCSList'))
      const tempList = []
      localConversationList.forEach((element, index) => {
        if (element.latestMessage.content.extra.userId.toString() !== payload.toString()) {
          tempList.push(element)
        }
      })
      if (Array.isArray(tempList)) {
        console.log('DEL_ONLINE_CONVERSATOIN 的locaStorage设置')
        state.onlineConversationData.list = tempList
        localStorage.setItem('ryCSList', JSON.stringify(tempList))
      } else {
        state.onlineConversationData.list = []
        localStorage.setItem('ryCSList', JSON.stringify([]))
      }
    }
  },

  // push一条消息到在线咨询当前用户消息列表
  ADD_MSG_TO_ONLINE_MSG_LIST(state, payload) {
    console.log('into ADD_MSG_TO_ONLINE_MSG_LIST', payload)

    const {
      merCode,
      // msgInfo,
      msgResult
      // type
    } = payload
    // 组装消息记录数据
    const curWindowPush = {
      content: Chat.symbolToEmoji(msgResult.content.content), // 消息内容
      coversionType: 'PERSON', // 消息类型
      fromUserId: msgResult.senderUserId, // 发送用户id
      merCode: merCode, // 商户编码
      messageType: msgResult.objectName, // 消息类型
      msgUid: msgResult.messageUId, // 消息id
      timeStamp: msgResult.sentTime, // 时间戳
      toUserId: msgResult.targetId, // 接收用户id
      userId: msgResult.targetId // 接收用户id
    }
    // push消息到当前聊天框
    state.curOnlineUserData.list.push(curWindowPush)

    // 组装会话item最近一条消息数据
    // 向localStorage中push一条latestMessage数据 并push到当前会话的最近消息
    const curLocalPush = {
      latestMessage: {
        content: msgResult.content,
        conversationType: 1,
        objectName: msgResult.objectName,
        senderUserId: msgResult.senderUserId,
        messageUId: msgResult.messageUId,
        targetId: msgResult.targetId
      }
    }

    // 更新当前窗口最近消息
    const tempOnlineConversationList = state.onlineConversationData.list
    tempOnlineConversationList.forEach((item, index) => {
      if (Chat.isUserEqual(item.latestMessage, msgResult)) {
      // if (item.targetId === msgResult.targetId || (item.targetId === msgResult.senderUserId && type === 'listener')) {
        item.latestMessage = {
          ...item.latestMessage,
          ...curLocalPush.latestMessage,
          content: {
            ...item.latestMessage.content,
            ...curLocalPush.latestMessage.content
          }
        }
      }
    })

    // 更新localStorage会话列表数据
    if (localStorage.getItem('ryCSList')) {
      const localConversationList = JSON.parse(localStorage.getItem('ryCSList'))
      localConversationList.forEach((element) => {
        if (Chat.isUserEqual(element.latestMessage, msgResult)) {
          element.latestMessage = {
            ...element.latestMessage,
            ...curLocalPush.latestMessage,
            content: {
              ...element.latestMessage.content,
              ...curLocalPush.latestMessage.content
            }
          }
        }
      })
      console.log('ADD_MSG_TO_ONLINE_MSG_LIST 的locaStorage设置')
      localStorage.setItem('ryCSList', JSON.stringify(localConversationList))
    }
  },
  // 添加未读消息徽标至会话列表item头像
  addBadgeToOnlineUser(state, payload) {
    const { userId, message } = payload
    console.log('addBadgeToOnlineUser', message)
    // const tempList = state.onlineConversationData.list
    let tempList = []
    const storageList = localStorage.getItem('ryCSList')
    console.log('缓存中的数据', storageList)
    if (storageList) {
      tempList = JSON.parse(storageList)
    }
    console.log('tempList', tempList)
    let hasItem = false
    tempList.forEach(element => {
      console.log('element.targetid', element.targetId, userId)
      if (Chat.isUserEqual(element.latestMessage, message)) {
      // if (element.latestMessage.content.extra.userId === message.latestMessage.content.extra.userId) {
        hasItem = true
        element.latestMessage = message
        // 如果是已经存在的用户 则直接徽标加1
        if (message.messageDirection === 2) {
          element.newMsgNum = element.newMsgNum + 1
          element.unreadMessageCount = element.unreadMessageCount + 1
        }
      }
    })
    // 如果是新来的用户 则往会话列表中添加一条数据
    if (!hasItem) {
      console.error('新来的用户 则往会话列表中添加一条数据')
      tempList.push({
        conversationTitle: '',
        conversationType: message.conversationType,
        latestMessage: {
          ...message
          // content: {
          //   messageName: message.content.messageName,
          //   content: message.content.content,
          //   extra: message.content.extra
          // },
          // conversationType: message.conversationType,
          // objectName: message.objectName
        },
        latestMessageId: message.messageId,
        sentTime: message.sentTime,
        targetId: message.targetId,
        newMsgNum: message.messageDirection === 2 ? 1 : 0,
        unreadMessageCount: message.messageDirection === 2 ? 1 : 0
      })
    }
    console.log('addBadgeToOnlineUser 的localStorage设置')
    localStorage.setItem('ryCSList', JSON.stringify(tempList))
    state.onlineConversationData.list = tempList
  },

  // 重置在线咨询数据
  resetOnlineUserMsgData(state) {
    state.curOnlineUserData.list = []
    state.curOnlineUserData.count = 0
    state.curOnlineUserData.curPageNo = 1
    state.curOnlineUserData.curPageSize = 20
    state.curOnlineUserData.hasMore = true
  },
  // 强制更改store中的数据 不更改localStorage
  FORCE_CHANGE_CONVERSATION_LIST(state, payload) {
    state.onlineConversationData.list = payload
  },
  // 获取在线咨询会话列表
  SET_ONLINE_CONVERSATIONLIST(state, payload) {
    console.log('into SET_ONLINE_CONVERSATIONLIST', '对比本地缓存中的数据并合并 完成之后更新本地存储')
    // 这里对比本地缓存中的数据并合并 完成之后更新本地存储
    // localStorage.setItem('ryCSList', JSON.stringify(payload))
    let localConversationList = []
    // 如果有本地缓存 对比本地缓存并合并数据
    if (localStorage.getItem('ryCSList')) {
      localConversationList = JSON.parse(localStorage.getItem('ryCSList'))
      if (typeof localConversationList !== 'object') {
        return
      }

      // localstorage数据去重
      console.warn('开始缓存数据去重', localConversationList)
      const tempLocalList = []
      const forEachLocalList = [...localConversationList]
      for (let i = 0; i < forEachLocalList.length; i++) {
        const outerItem = forEachLocalList[i]
        if (!tempLocalList.find(ele => {
          return Chat.isUserEqual(outerItem.latestMessage, ele.latestMessage)
          // outerItem.latestMessage.content.extra.userId === ele.latestMessage.content.extra.userId
        })) {
          tempLocalList.push(outerItem)
        }
      }
      console.log('去重后的缓存聊天列表', tempLocalList)

      localConversationList = tempLocalList

      console.log('缓存中的会话列表', localConversationList)
      payload.forEach((item, index) => {
        console.log('item', item)
        const existedIndex = localConversationList.findIndex(element => {
          // element.targetId === message.senderUserId || element.targetId === message.targetId
          let flag = false
          // 客服发送给用户 则判断targetId
          if (Chat.isUserEqual(item.latestMessage, element.latestMessage)) {
          // if (item.latestMessage.content.extra.userId === element.latestMessage.content.extra.userId) {
            flag = true
          }
          if (flag === false) {
            console.log('item', item)
            console.log('element', element)
          }
          return flag
        })
        console.log('existedIndex', existedIndex)
        if (existedIndex >= 0) {
          console.log(`${item.targetId}存在本地了`, '替换')
          localConversationList[existedIndex] = item
        } else {
          localConversationList.push(item)
        }
      })
      console.log('SET_ONLINE_CONVERSATIONLIST 的localStorage设置1')
      localStorage.setItem('ryCSList', JSON.stringify(localConversationList))
      state.onlineConversationData.list = localConversationList
    } else {
      state.onlineConversationData.list = payload
      console.log('SET_ONLINE_CONVERSATIONLIST 的localStorage设置2')
      localStorage.setItem('ryCSList', JSON.stringify(payload))
    }

    console.log('通过vuex获取并添加字段的会话列表', state.onlineConversationData)
  }
}

const actions = {
  // 获取客服历史会话列表
  querySupportHistoryCSList({ commit, state }, payload) {
    console.log('querySupportHistoryRecord action state', state, payload)
    return new Promise((resolve, reject) => {
      CustomerService.querySupportHistoryCSList(payload).then(res => {
        const { data } = res
        console.log('querySupportHistoryRecord data', data)
        commit('SET_HISTORY_CONVERSATIONLIST', {
          conversationList: data
        })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  },
  // 获取消息记录列表
  queryHistoryMsgListByUserId({ commit, state }, payload) {
    console.log('queryHistoryMsgListByUserId action', state, payload)
    return new Promise((resolve, reject) => {
      CustomerService.queryHistoryMessage(payload).then(res => {
        const { data } = res
        commit('SET_ONLINE_CURUSER_MSGLIST', data)
      })
    })
  },

  // 获取在线咨询会话列表
  queryOnlineConversationList({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      Chat.getConversationList().then(list => {
        const tempList = []
        console.log('list', list)
        console.log('searchText', payload)
        list.forEach(element => {
          // 添加新消息数量字段 用于徽标显示
          if (payload && payload.searchText) {
            if (element.latestMessage.content.extra ? element.latestMessage.content.extra.nickName.indexOf(payload.searchText) > -1 : false) {
              tempList.push({
                ...element,
                newMsgNum: 0,
                unreadMessageCount: 0
              })
            }
          } else {
            tempList.push({
              ...element,
              newMsgNum: 0,
              unreadMessageCount: 0
            })
          }
        })
        commit('SET_ONLINE_CONVERSATIONLIST', tempList)
        resolve(tempList)
      }).catch((error) => {
        reject(error)
      })
    })
  },
  // 获取在线咨询当前用户消息列表
  queryOnlineCurUserMsgList({ commit, state }, payload) {
    // console.log('queryOnlineCurUserMsgList', state, payload)
    return new Promise((resolve, reject) => {
      CustomerService.queryHistoryMessage(payload).then(res => {
        const { data } = res
        commit('SET_ONLINE_CURUSER_LIST', data)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
