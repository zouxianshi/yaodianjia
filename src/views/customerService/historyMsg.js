import dayjs from 'dayjs'
import user from './components/user'
import listItem from './components/listItem'
import userInfo from './components/userInfo'
import chatRoom from './components/chatRoom'
import viewMore from './components/viewMore'
import noData from '@/components/NoData'
import CustomerService from '@/api/customer-service'
import { mapGetters, mapActions, mapMutations, mapState } from 'vuex'
import Chat from '@/utils/chat'
console.log('Chat', Chat)
export default {
  components: {
    user,
    listItem,
    userInfo,
    chatRoom,
    viewMore,
    noData
  },
  data() {
    return {
      orderListLoading: false, // 订单列表正在加载
      orderListHasMore: true, // 订单是否加载更多数据
      orderListCurPageNo: 1, // 订单当前页码
      orderListPageSize: 10, // 订单列表pageSize
      MessageType: Chat.MessageType, // 消息类型枚举
      messageLoading: false, // 正在加载消息列表
      curConversationPageNo: 1, // 会话列表页码
      curConversationPageSize: 1000, // 会话列表pageSize
      conversationList: [], // 当前客服历史会话列表
      historyMsgList: [], // 聊天历史记录
      supporterId: '', // 客服id
      currentUser: '', // 当前打开的聊天窗口用户名
      curChatUserId: '', // 当前打开的聊天窗口用户id
      searchText: '', // 搜索框文字
      orderList: [], // 订单列表
      memberInfo: null, // 会员信息
      boughtRecord: null, // 会员购买记录
      historyMsgPageSize: 20, // 消息记录每页条数
      historyMsgCurPage: 1, // 消息记录分页页码
      showViewMore: true // 是否展示查看更多消息按钮
    }
  },
  computed: {
    ...mapGetters([
      'merCode',
      'userId'
    ]),
    ...mapState('customerService', [
      'historyCSList'
    ])
  },
  methods: {
    ...mapActions({
      getSupportHistoryCSList: 'customerService/querySupportHistoryCSList',
      queryHistoryMsgListByUserId: 'customerService/queryHistoryMsgListByUserId'
    }),
    ...mapMutations({
      setCurUser: 'customerService/SET_HIS_CUR_USERID'
    }),
    ...Chat.mapChat(),
    formatTime(time, format) {
      return dayjs(time).format(format)
    },
    // 搜索按钮点击
    searchBtnClick() {
      this.resetData()
      this.queryCSList()
    },
    // 计算日期
    showDate(curTime, lastTime) {
      return this.formatTime(curTime, 'YYYY-MM-DD') === this.formatTime(lastTime, 'YYYY-MM-DD')
    },
    resetData() {
      this.showViewMore = true
      this.currentUser = ''
      this.curChatUserId = ''
      this.curConversationPageNo = 1
      this.historyMsgList = []
      this.historyMsgCurPage = 1
      this.memberInfo = null
      this.boughtRecord = null
      // 重置订单数据
      this.orderListHasMore = true
      this.orderList = []
      this.orderListCurPageNo = 1
    },

    // 查询消息记录
    queryHistoryMessage() {
      const params = {
        merCode: this.merCode, // 商户编码
        userId: this.curChatUserId, // 用户编码
        currentPage: this.historyMsgCurPage, // 当前页码
        pageSize: this.historyMsgPageSize // 每页条数
      }

      this.messageLoading = true

      CustomerService.queryHistoryMessage(params).then(res => {
        this.messageLoading = false
        const { data, count } = res.data
        if (Array.isArray(data) && count > this.historyMsgList.length) {
          const historyList = this.historyMsgList
          data.forEach((item, index) => {
            const parsedItem = item
            historyList.unshift(parsedItem)
          })
          this.historyMsgList = historyList
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
      }).catch(err => {
        console.error(err)
        this.messageLoading = false
      })
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
    queryCSList() {
      this.getSupportHistoryCSList({
        currentPage: this.curConversationPageNo,
        merCode: this.merCode,
        pageSize: this.curConversationPageSize,
        userId: this.supporterId,
        name: this.searchText.replace(/\s*/g, '') // 搜索框中输入的用户名字
      }).then(res => {
        if (this.historyCSList.length > 0) {
          this.curChatUserId = this.historyCSList[0].userId
          this.currentUser = this.historyCSList[0].nickName
          // 如果是第一页则默认请求第一个用户的信息
          if (this.curConversationPageNo === 1) {
            this.refreshPageData()
          }
          this.curConversationPageNo++
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
      console.log('into queryUserOrderList')
      this.orderListLoading = true
      CustomerService.queryUserOrderList({
        currentPage: this.orderListCurPageNo, // 页码 从1开始
        memberId: this.curChatUserId, // 用户id
        merCode: this.merCode, // 商户编码
        pageSize: this.orderListPageSize // 每页条数
      }).then(res => {
        this.orderListLoading = false
        console.log('into queryUserOrderList success11111', res)
        const { data, totalCount } = res.data
        if (data && data.length > 0) {
          console.log('data', data, totalCount)
          console.log('合并', this.orderList, data)
          this.orderList = [
            ...this.orderList,
            ...data
          ]
          if (this.orderList.length >= totalCount) {
            this.orderListHasMore = false
          }
          console.log('this.orderList', this.orderList)
          this.orderListCurPageNo = this.orderListCurPageNo + 1
        } else {
          this.orderListHasMore = false
        }
        console.log('queryUserOrderList this.orderList', this.orderList)
      }).catch(() => {
        this.orderListLoading = false
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
    },
    // 会话列表触发加载
    load() {
      console.log('load')
      if (this.curConversationPageNo > 1) {
        this.queryCSList()
      }
    },
    handleGoodsClick(item) {
      console.log('goods item', item)
      const itemData = JSON.parse(item.content)
      if (itemData.url) {
        window.open(itemData.url)
      }
    }
  },
  created() {
    // 接收从客服列表跳转过来的客服id
    this.supporterId = this.$route.query.id || this.userId
    // 查询客服历史会话列表
    this.queryCSList()
  }
}
