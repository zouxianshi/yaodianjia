import Chat from '@/utils/chat'
import CustomerService from '@/api/customer-service'
const state = {
  // 历史会话列表
  historyConversationList: [],
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
  ryConnected: false // 融云连接服务器成功
}

const mutations = {

  /**
   * 融云相关
   */
  SET_RY_INIT_STATUS(state, payload) {
    console.log('into SET_RY_INIT_STATUS')
    state.ryConnected = true
  },

  /**
   * 历史消息相关
   */

  // 设置客服历史会话列表
  SET_HISTORY_CONVERSATIONLIST: (state, payload) => {
    console.log('mutations payload', payload)
    state.historyConversationList = payload.conversationList
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
    console.log('into mutation')
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
      }
    })
    localStorage.setItem('ryConversationList', JSON.stringify(onlineUserList))
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
    console.log('payload', payload)
    // 删除localStorage 中的item
    let localConversationList = null
    if (localStorage.getItem('ryConversationList')) {
      localConversationList = JSON.parse(localStorage.getItem('ryConversationList'))
      localConversationList.forEach((element, index) => {
        if (element.targetId === payload) {
          console.log('处理前的localConversationList', localConversationList)
          localConversationList.splice(index, 1)
        }
      })
      console.log('处理后的localConversationList', localConversationList)
      if (Array.isArray(localConversationList)) {
        localStorage.setItem('ryConversationList', JSON.stringify(localConversationList))
      }
    }
    // 删除vuex中的item
    const { list } = state.onlineConversationData
    list.forEach((element, index) => {
      if (element.targetId === payload) {
        list.splice(index, 1)
      }
    })
  },

  // push一条消息到在线咨询当前用户消息列表
  ADD_MSG_TO_ONLINE_MSG_LIST(state, payload) {
    console.log('into ADD_MSG_TO_ONLINE_MSG_LIST', payload)

    const {
      merCode,
      // msgInfo,
      msgResult,
      type
    } = payload
    // 组装历史消息数据
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
    console.log('更新当前窗口最近消息', state.onlineConversationData.list)
    const tempOnlineConversationList = state.onlineConversationData.list
    tempOnlineConversationList.forEach((item, index) => {
      if (item.targetId === msgResult.targetId || (item.targetId === msgResult.senderUserId && type === 'listener')) {
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
    if (localStorage.getItem('ryConversationList')) {
      const localConversationList = JSON.parse(localStorage.getItem('ryConversationList'))
      localConversationList.forEach((element) => {
        if (element.targetId === msgResult.targetId || (element.targetId === msgResult.senderUserId && type === 'listener')) {
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
      localStorage.setItem('ryConversationList', JSON.stringify(localConversationList))
    }
  },
  // 添加未读消息徽标至会话列表item头像
  addBadgeToOnlineUser(state, payload) {
    const { userId, message } = payload
    console.log('addBadgeToOnlineUser', message)
    const tempList = state.onlineConversationData.list
    let hasItem = false
    tempList.forEach(element => {
      if (element.targetId === userId) {
        hasItem = true
        element.newMsgNum++
      }
    })
    // 如果是新来的用户 则往会话列表中添加一条数据
    if (!hasItem) {
      tempList.push({
        conversationTitle: '',
        conversationType: message.conversationType,
        latestMessage: {
          content: {
            messageName: message.content.messageName,
            content: message.content.content,
            extra: message.content.extra
          },
          conversationType: message.conversationType,
          objectName: message.objectName
        },
        latestMessageId: message.messageId,
        sentTime: message.sentTime,
        targetId: message.targetId,
        newMsgNum: 1
      })
    }
    localStorage.setItem('ryConversationList', JSON.stringify(tempList))
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
  // 获取在线咨询会话列表
  SET_ONLINE_CONVERSATIONLIST(state, payload) {
    // 这里对比本地缓存中的数据并合并 完成之后更新本地存储
    // localStorage.setItem('ryConversationList', JSON.stringify(payload))
    let localConversationList = []
    // 如果有本地缓存 对比本地缓存并合并数据
    if (localStorage.getItem('ryConversationList')) {
      localConversationList = JSON.parse(localStorage.getItem('ryConversationList'))
      if (typeof localConversationList !== 'object') {
        return
      }
      console.log('localConversationList', localConversationList)
      payload.forEach((item, index) => {
        console.log('item', item)
        const existedIndex = localConversationList.findIndex(element => {
          return item.targetId === element.targetId
        })
        console.log('existedIndex', existedIndex)
        if (existedIndex >= 0) {
          console.log(`${item.targetId}存在本地了`, '替换')
          localConversationList[existedIndex] = item
        } else {
          localConversationList.push(item)
        }
      })
      localStorage.setItem('ryConversationList', JSON.stringify(localConversationList))
      state.onlineConversationData.list = localConversationList
    } else {
      state.onlineConversationData.list = payload
      localStorage.setItem('ryConversationList', JSON.stringify(payload))
    }

    console.log('通过vuex获取并添加字段的会话列表', state.onlineConversationData)
  }
}

const actions = {
  // 获取客服历史会话列表
  querySupportHistoryConversationList({ commit, state }, payload) {
    console.log('querySupportHistoryRecord action state', state, payload)
    return new Promise((resolve, reject) => {
      CustomerService.querySupportHistoryConversationList(payload).then(res => {
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
            if (element.latestMessage.content.extra.nickName.indexOf(payload.searchText) > -1) {
              tempList.push({
                ...element,
                newMsgNum: 0
              })
            }
          } else {
            tempList.push({
              ...element,
              newMsgNum: 0
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
