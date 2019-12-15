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
  hasNewMsg: false
}

const mutations = {
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
      tempList.unshift(JSON.parse(element))
    })
    state.curOnlineUserData.curPageNo++
    state.curOnlineUserData.list = tempList
    state.curOnlineUserData.hasMore = list.length > 0
  },
  // push一条消息到在线咨询当前用户消息列表
  ADD_MSG_TO_ONLINE_MSG_LIST(state, payload) {
    console.log('into ADD_MSG_TO_ONLINE_MSG_LIST')
    state.curOnlineUserData.list.push(payload)
  },
  // 添加未读消息徽标至会话列表item头像
  addBadgeToOnlineUser(state, payload) {
    const { userId } = payload
    const tempList = state.onlineConversationData.list
    tempList.forEach(element => {
      if (element.targetId === userId) {
        element.newMsgNum++
      }
    })
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
    state.onlineConversationData.list = payload
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
            console.log('element.latestMessage.content.extra.nickName.', element.latestMessage.content.extra.nickName)
            console.log('payload.searchText', payload.searchText, element.latestMessage.content.extra.nickName.indexOf(payload.searchText))
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
