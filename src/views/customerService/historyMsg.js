import user from './components/user'
import listItem from './components/listItem'
import userInfo from './components/userInfo'
import chatRoom from './components/chatRoom'
import viewMore from './components/viewMore'
import noData from '@/components/NoData'
import CustomerService from '@/api/customer-service'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import Chat from '@/utils/chat'
export default {
  components: {
    user,
    listItem,
    userInfo,
    noData,
    chatRoom,
    viewMore
  },
  data() {
    return {
      conversationList: [], // 当前客服历史会话列表
      historyMsgList: [], // 聊天历史记录
      supporterId: '', // 客服id
      currentUser: '', // 当前打开的聊天窗口用户名
      curChatUserId: '', // 当前打开的聊天窗口用户id
      orderList: [], // 订单列表
      searchText: '', // 搜索框文字
      memberInfo: null,
      boughtRecord: null,
      historyMsgPageSize: 20,
      historyMsgCurPage: 1, // 历史消息分页页码
      showViewMore: true
    }
  },
  computed: {
    ...mapGetters([
      'merCode',
      'userId'
    ]),
    ...mapGetters({
      historyConversationList: 'historyConversationList'
    })
  },
  methods: {
    ...mapActions({
      getSupportHistoryConversationList: 'customerService/querySupportHistoryConversationList',
      queryHistoryMsgListByUserId: 'customerService/queryHistoryMsgListByUserId'
    }),
    ...mapMutations({
      setCurUser: 'customerService/SET_HIS_CUR_USERID'
    }),
    symbolToEmoji: Chat.symbolToEmoji,
    // 搜索按钮点击
    searchBtnClick() {
      this.resetData()
      this.queryConversationList()
    },
    resetData() {
      this.currentUser = ''
      this.curChatUserId = ''
      this.historyMsgList = []
      this.historyMsgCurPage = 1
      this.memberInfo = null
      this.boughtRecord = null
      this.orderList = null
    },

    // 查询历史消息
    queryHistoryMessage() {
      const params = {
        merCode: this.merCode, // 商户编码
        userId: this.userId, // 用户编码
        currentPage: this.historyMsgCurPage, // 当前页码
        pageSize: this.historyMsgPageSize // 每页条数
      }

      CustomerService.queryHistoryMessage(params).then(res => {
        const { data, count } = res.data
        if (Array.isArray(data) && count > this.historyMsgList.length) {
          const historyList = this.historyMsgList
          data.forEach((item, index) => {
            historyList.unshift(JSON.parse(item))
          })
          this.historyMsgList = historyList
          this.$nextTick(() => {
            const msg = document.getElementById('chat-detail-list') // 获取对象
            msg.scrollTop = msg.scrollHeight // 滚动高度
          })
          setTimeout(() => {
            if (this.historyMsgCurPage === 1) {
              this.scrollToBottom()
            } else {
              this.scrolltoTop()
            }
            this.historyMsgCurPage++
          }, 100)
        } else {
          this.showViewMore = false
        }
      })
    },
    resetHistoryMsgList() {

    },
    // 刷新页面数据
    refreshPageData() {
      // 请求当前会话消息记录
      this.queryHistoryMessage()
      // 会员信息
      this.queryMemberInfo()
      // 购买记录
      this.queryUserBoughtRecord()
      // 订单列表
      this.queryUserOrderList()
    },
    // 查询会话列表
    queryConversationList() {
      this.getSupportHistoryConversationList({
        currentPage: 1,
        merCode: this.merCode,
        pageSize: 20,
        userId: this.supporterId,
        name: this.searchText // 搜索框中输入的用户名字
      }).then(res => {
        if (this.historyConversationList.length > 0) {
          this.curChatUserId = this.historyConversationList[0].userId
          this.currentUser = this.historyConversationList[0].nickName
          this.refreshPageData()
        }
      })
    },
    // 根据用户id查询用户信息
    queryMemberInfo() {
      CustomerService.queryUserInfoById({
        mercode: this.merCode,
        userIds: [this.curChatUserId]
      }).then(res => {
        this.memberInfo = res.data
      })
    },

    // 根据用户id查询用户购买记录
    queryUserBoughtRecord() {
      CustomerService.queryUserBoughtRecord({
        memberId: this.curChatUserId
      }).then((res) => {
        this.boughtRecord = res.data
      })
    },

    // 根据用户id获取订单列表
    queryUserOrderList() {
      CustomerService.queryUserOrderList({
        currentPage: 1, // 页码 从1开始
        memberId: this.curChatUserId, // 用户id
        merCode: this.merCode, // 商户编码
        pageSize: 20 // 每页条数
      }).then(res => {
        this.orderList = res.data.data
      })
    },
    // 会话列表输入框输入
    handleSearchInput(val) {
      this.searchText = val
    },
    // 查看更多消息按钮点击
    viewMoreClick() {
      this.queryHistoryMessage()
    },
    scrollToBottom: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#chat-detail-list')
        container.scrollTop = container.scrollHeight
      })
    },
    scrolltoTop: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#chat-detail-list')
        container.scrollTop = 0
      })
    },
    // 切换用户
    handleUserClick(item) {
      if (this.curChatUserId !== item.userId) {
        // 切换用户则重置数据 重新请求所有数据
        this.resetData()
        this.curChatUserId = item.userId
        this.currentUser = item.nickName
        this.refreshPageData()
      } else {
        console.warn('click current item, do nothing.')
      }
    }
  },
  created() {
    // 接收从客服列表跳转过来的客服id
    this.supporterId = this.$route.query.id || this.userId
    // 查询客服历史会话列表
    this.queryConversationList()
  }
}
