import dayjs from 'dayjs'
import user from './components/user'
import listItem from './components/listItem'
import userInfo from './components/userInfo'
import viewMore from './components/viewMore'
import chatRoom from './components/chatRoom'
import noData from '@/components/NoData'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import CustomerService from '@/api/customer-service'
import {
  queryGoods
} from '@/api/common'
import Chat from '@/utils/chat'
console.log('consultation', Chat)
export default {
  name: 'Consultation',
  components: {
    user,
    listItem,
    userInfo,
    viewMore,
    noData,
    chatRoom
  },
  data() {
    return {
      delUserRow: null, // 要删除的数据item
      delUserDialogVisible: false, // 删除确认弹窗是否展示
      consultingLoading: true, // 整页loading
      messageLoading: false, // 消息记录是否正在加载
      orderListLoading: false, // 订单列表是否正在加载
      orderListHasMore: true, // 订单是否加载更多数据
      orderListCurPageNo: 1, // 订单当前页码
      orderListPageSize: 10, // 订单列表pageSize
      curUserAvatar: '', // 聊天框中显示的用户logo
      MessageType: Chat.MessageType, // 消息类型枚举
      isFirstQueryFinished: false, // 第一次融云会话请求是否已经完成 不要去改这个变量
      // merLogo: '', // 商户头像 用作聊天窗口的客服头像展示
      searchText: '', // 搜索框文字
      boughtRecord: null, // 用户购买记录
      orderList: [], // 订单列表
      memberInfo: null, // 会员个人资料
      targetId: '', // 当前会话用户id
      selectGoodsDialogVisible: false, // 选择商品对话框是否展示
      goodsList: [], // 选择商品弹窗商品列表
      listQuery: { // 快捷回复列表请求参数
        currentPage: 1, // 当前页
        isAll: true, // 是否全选
        merCode: this.merCode, // 商户编码
        pageSize: 20, // 每页条数
        status: 1, // 消息状态，0-未开启，1-已开启
        type: 3 // 客服消息类型，1-不在线推送，2-首次进入推送，3-快捷回复
      },
      curUserName: '', // 当前打开的聊天窗口用户名
      textMsgValue: '', // 消息发送框中输入的文本值
      cannedRepliesVisible: false, // 快捷回复弹窗是否展示
      cannedResList: [], // 快捷回复列表
      emojiPopVisible: false, // 表情弹窗是否展示
      emojiList: [], // emoji表情列表
      fileList: [], // 图片input文件列表
      curLatestMessageInfo: null, // 最近一条消息对象
      goodsQuery: { // 商品查询分页参数
        initialPageSize: 10,
        currentPage: 1,
        pageSize: 10,
        name: '' // 商品名称
      }
    }
  },
  computed: {
    ...mapGetters(['merCode', 'userId', 'name', 'curOnlineUserData', 'onlineConversationData', 'hasNewMsg', 'ryConnected', 'merLogo']),
    goodsPagination() {
      return {
        pageSizes: [
          this.goodsQuery.initialPageSize,
          this.goodsQuery.initialPageSize * 2,
          this.goodsQuery.initialPageSize * 3,
          this.goodsQuery.initialPageSize * 5
        ],
        total: 100
      }
    },
    extra() {
      console.log('compute extra', this.curLatestMessageInfo)
      return {
        merCode: this.merCode, // 商户编码
        userAccount: this.name, // 如果是客服，对应中台sys_user.account
        userId: this.userId, // 用户id 这里是自己的id 不是目标用户的id
        userName: this.curLatestMessageInfo.content.extra ? this.curLatestMessageInfo.content.extra.userName : '暂无用户昵称', // 用户姓名
        nickName: this.curLatestMessageInfo.content.extra ? this.curLatestMessageInfo.content.extra.nickName : '', // 昵称
        age: this.curLatestMessageInfo.content.extra.age, // 年龄
        sex: this.curLatestMessageInfo.content.extra.sex, // 性别（男，女，未知）
        userLogo: this.curUserAvatar,
        platform: 1, // 平台 Number 0-app 1-web端
        staffName: this.name
      }
    }
  },
  watch: {
    'onlineConversationData.list': {
      handler(list) {
        console.log('into value', list)
        if (list.length === 1) {
          this.curLatestMessageInfo = list[0].latestMessage
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    ...mapActions({
      querySupportHistoryRecord: 'customerService/querySupportHistoryRecord',
      queryOnlineCurUserMsgList: 'customerService/queryOnlineCurUserMsgList',
      queryOnlineConversationList: 'customerService/queryOnlineConversationList'
    }),
    ...mapMutations({
      addMsgToOnlineCurUserMsgList: 'customerService/ADD_MSG_TO_ONLINE_MSG_LIST',
      resetCurOnlineUserData: 'customerService/resetOnlineUserMsgData',
      setCurOnlineUserId: 'customerService/SET_CUR_ONLINE_USERID',
      setHasNewMsg: 'customerService/setHasNewMsg',
      delOnlineConversation: 'customerService/DEL_ONLINE_CONVERSATOIN',
      setOnlineConversationList: 'customerService/SET_ONLINE_CONVERSATIONLIST',
      forceChangeConversationList: 'customerService/FORCE_CHANGE_CONVERSATION_LIST'
    }),
    ...Chat.mapChat(),
    formatTime(time, format) {
      return dayjs(time).format(format)
    },
    // 计算日期
    showDate(curTime, lastTime) {
      if (dayjs(curTime).subtract(5, 'minutes').isBefore(dayjs(lastTime))) {
        return false
      } else {
        return true
      }
    },
    // 根据消息类型返回对应类名
    computeChatItemType(messageType) {
      if (messageType === this.MessageType.ImageMessage) {
        return 'image'
      } else if (messageType === this.MessageType.GoodsMessage) {
        return 'goods'
      } else {
        return 'text'
      }
    },
    queryRYConversationList(searchParam) {
      this.isFirstQueryFinished = true
      // 获取会话列表
      this.queryOnlineConversationList(searchParam).then(() => {
        this.consultingLoading = false
        const list = this.onlineConversationData.list
        console.log('获取融云会话列表成功：', list)
        if (this.curOnlineUserData.userId) {
          const userItem = list.find(element => element.targetId === this.curOnlineUserData.userId)
          if (userItem) {
            this.curLatestMessageInfo = userItem.latestMessage
            this.targetId = userItem.targetId
            this.curUserName = userItem.latestMessage.content.extra ? userItem.latestMessage.content.extra.nickName : '暂无用户名称'
            this.curUserAvatar = userItem.latestMessage.content.extra ? userItem.latestMessage.content.extra.userLogo : ''
            // 查询会话列表中第一个用户的消息记录、个人资料、订单信息等
            // 消息记录
            this.queryHistoryMessage()
            // 会员信息
            this.queryMemberInfo()
            // 购买记录
            this.queryUserBoughtRecord()
            // 订单列表
            this.queryUserOrderList()
          }
        } else if (list.length > 0) {
          this.setCurOnlineUserId({
            userId: list[0].targetId
          })
          this.curLatestMessageInfo = list[0].latestMessage
          this.targetId = list[0].targetId
          this.curUserName = list[0].latestMessage.content.extra ? list[0].latestMessage.content.extra.nickName : '暂无用户昵称'
          this.curUserAvatar = list[0].latestMessage.content.extra ? list[0].latestMessage.content.extra.userLogo : ''
          // 查询会话列表中第一个用户的消息记录、个人资料、订单信息等
          // 消息记录
          this.queryHistoryMessage()
          // 会员信息
          this.queryMemberInfo()
          // 购买记录
          this.queryUserBoughtRecord()
          // 订单列表
          this.queryUserOrderList()
        }
      }).catch((err) => {
        console.error('获取融云会话列表失败', err)
        this.consultingLoading = false
      })
    },

    // 根据用户id查询用户信息
    queryMemberInfo() {
      CustomerService.queryUserInfoById({
        mercode: this.merCode,
        userIds: [this.targetId]
      }).then(res => {
        this.memberInfo = res.data
      })
    },

    // 根据用户id查询用户购买记录
    queryUserBoughtRecord() {
      CustomerService.queryUserBoughtRecord({
        memberId: this.targetId
      }).then((res) => {
        this.boughtRecord = res.data
      })
    },

    // 根据用户id获取订单列表
    queryUserOrderList() {
      this.orderListLoading = true
      CustomerService.queryUserOrderList({
        currentPage: this.orderListCurPageNo, // 页码 从1开始
        memberId: this.targetId, // 用户id
        merCode: this.merCode, // 商户编码
        pageSize: this.orderListPageSize // 每页条数
      }).then(res => {
        this.orderListLoading = false
        const { data, totalCount } = res.data
        if (data && data.length > 0) {
          this.orderListCurPageNo = this.orderListCurPageNo + 1
          this.orderList = [
            ...this.orderList,
            ...data
          ]
          if (this.orderList.length >= totalCount) {
            this.orderListHasMore = false
          }
        } else {
          this.orderListHasMore = false
        }
        console.log('queryUserOrderList this.orderList', this.orderList)
      }).catch(() => {
        this.orderListLoading = false
      })
    },

    // 发送消息按钮点击
    sendMsg() {
      if (!this.textMsgValue.trim()) {
        this.$message({
          type: 'warning',
          message: '请先输入消息内容'
        })
        return
      }
      console.log('sendMsg')
      var msgInfo = {
        content: this.textMsgValue,
        extra: this.extra
      }
      console.log('msgInfo', msgInfo)
      Chat.sendMessage({
        targetId: this.targetId, // 目标用户id,
        msgInfo: {
          content: Chat.emojiToSymbol(msgInfo.content),
          extra: this.extra
        }
      }).then(res => {
        console.log('发送消息成功', res)
        // 发送成功清空消息内容
        this.textMsgValue = ''
        this.addMsgToOnlineCurUserMsgList({
          merCode: this.merCode,
          msgInfo: {
            ...msgInfo,
            content: Chat.symbolToEmoji(msgInfo.content)
          },
          msgResult: res
        })
        console.log('after addMsgToOnlineCurUserMsgList')
        this.scrollToBottom()
      }).catch((err, msg) => {
        console.error('send message error', err, msg)
      })
    },

    /**
     * 聊天框相关
     */

    // textarea change
    handleTextAreaChange(val) {
      this.textMsgValue = val
    },

    // action click
    handleActionClick(type) {
      if (type === 'answer') {
        // 获取快捷消息列表并弹出
        this.queryCannedRepliesList()
        this.cannedRepliesVisible = true
      } else if (type === 'goods') {
        const loading = this.$loading({
          lock: true,
          text: '加载中...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        this.queryGoods().then(() => {
          loading.close()
          this.selectGoodsDialogVisible = true
        }).catch(() => {
          loading.close()
          this.$message({
            message: '获取商品数据失败',
            type: 'error'
          })
        })
      } else if (type === 'emoji') {
        this.emojiPopVisible = true
      } else if (type === 'pic') {
        document.getElementById('pic').click()
      } else {
        console.error('handleActionClick: 不支持的类型')
      }
    },

    // 商品搜索按钮点击
    goodsSearchBtnClick() {
      this.goodsQuery.currentPage = 1
      this.goodsList = []
      this.queryGoods()
    },

    // 获取快捷回复列表
    queryCannedRepliesList() {
      CustomerService.querySupportMsgList(this.listQuery).then(res => {
        const result = res.data
        this.cannedResList = result.data
      })
    },
    // 快捷回复点击
    msgItemClick(item) {
      this.textMsgValue = item.msg
      this.cannedRepliesVisible = false
    },
    // 商品名称输入框
    handleGoodsNameInput(val) {
      console.log('val', val)
      this.goodsQuery.name = val
    },
    queryGoods() {
      return new Promise((resolve, reject) => {
        queryGoods({
          approvalNumber: '', // 批准文号
          auditStatus: 1, // 审核状态，0-审核不通过，1-审核通过，2-待审,3-未提交审核
          barCode: '', // 条形码
          commodityIds: [], // 商品id数组
          commodityType: 1, // 商品类型（1：普通商品， 2：组合商品）
          currentPage: this.goodsQuery.currentPage, // 页码
          erpCode: '', // 商品编码
          groupId: '', // 分组id,如果是1，2级分组时，请与level字段共用
          infoFlag: true, // 消息完善标志,true-已完善商品，false-未完善商品，不传未所有商品
          level: 0, // 分组或分类level,1-一级，2-二级，3-三级，为null和0时不做处理
          manufacture: '', // 生产企业
          merCode: this.merCode, // 商家编码
          name: this.goodsQuery.name.replace(/\s*/g, ''), // 商品名称
          onlyCom: '', // 商品查询标志,true-只查商品信息，其他包括规格信息
          origin: 0, // 商品来源，1-海典，2-商家
          pageSize: this.goodsQuery.pageSize, // 每页显示条数，不传默认20
          typeId: '' // 分类id,如果是1，2级分类时，请与level字段共用
        }).then(res => {
          if (res.data) {
            resolve(res.data)
            console.log('商品数据', res.data)
            const {
              totalCount,
              data
            } = res.data
            this.goodsPagination.total = totalCount
            // this.goodsQuery.currentPage = this.goodsQuery.curPage + 1
            this.goodsList = data
            console.log('goodsList', this.goodsList)
          } else {
            reject('获取商品数据失败')
          }
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 商品pagesizechange
    handleGoodsDialogSizeChange(val) {
      this.goodsQuery.pageSize = val
      this.queryGoods()
    },
    // 商品curPage change
    handleGoodsDialogCurPageChange(val) {
      this.goodsQuery.currentPage = val
      this.$refs.multipleTable.bodyWrapper.scrollTop = 0
      this.queryGoods()
    },
    handleSelectGoodsDialogClose() {
      this.selectGoodsDialogVisible = false
      this.goodsQuery.currentPage = 1
      this.goodsQuery.name = ''
      this.goodsList = []
    },
    // 商品选择按钮点击
    handleGoodsSelect(row) {
      this.selectedGoods = row
      this.selectGoodsDialogVisible = false
      this.goodsQuery.currentPage = 1
      this.goodsQuery.name = ''
      this.goodsList = []

      console.log('选中的商品row', row)

      const msgInfo = {
        content: {
          title: row.name,
          desc: row.keyWord,
          imageUri: this.showImg(row.mainPic),
          url: `${this.h5Base}pages/details/index?productId=${row.id}`,
          price: row.mprice.toFixed(2)
        },
        extra: this.extra
      }

      console.warn('即将发送消息', msgInfo)

      Chat.sendMessage({
        targetId: this.targetId,
        msgInfo,
        messageType: Chat.MessageType.GoodsMessage
      }).then(res => {
        console.log('h5Base', this.h5Base)
        console.log('sendMessage successfully', res)
        this.addMsgToOnlineCurUserMsgList({
          merCode: this.merCode,
          msgInfo: msgInfo,
          msgResult: res
        })
        // 这里追加当前消息到消息列表
      }).catch((errCode, errMessage) => {
        console.error('商品消息发送失败，errCode：', errCode, '\nerrMessage：', errMessage)
      })
    },

    // 点击左边用户列表切换
    handleUserClick(data) {
      console.log('handleUserClick', data)
      if (data.targetId === this.targetId) {
        this.setCurOnlineUserId({
          userId: data.targetId
        })
      } else {
        // 重置所有数据并重新请求
        this.targetId = data.targetId
        this.curLatestMessageInfo = data.latestMessage
        this.curUserAvatar = data.latestMessage.content.extra ? data.latestMessage.content.extra.userLogo : ''
        this.curUserName = data.latestMessage.content.extra ? data.latestMessage.content.extra.nickName : '暂无用户昵称'
        this.setCurOnlineUserId({
          userId: data.targetId
        })
        this.resetRightData()
      }
    },

    // 删除确认弹窗确认按钮点击
    delDialogConfirmBtnClick() {
      this.delUserDialogVisible = false
      this.delOnlineConversation(this.delUserRow.targetId)
      console.log('after delOnlineConversation', this.onlineConversationData.list)
      if (this.onlineConversationData.list.length > 0) {
        const firstConversation = this.onlineConversationData.list[0]
        this.setCurOnlineUserId({
          userId: firstConversation.targetId
        })
        this.targetId = firstConversation.targetId
        this.curUserAvatar = firstConversation.latestMessage.content.extra ? firstConversation.latestMessage.content.extra.userLogo : ''
        this.curUserName = firstConversation.latestMessage.content.extra ? firstConversation.latestMessage.content.extra.nickName : '暂无用户昵称'
        this.resetRightData()
      } else {
        this.targetId = ''
        this.curUserAvatar = ''
        this.curUserName = ''
        this.setCurOnlineUserId({
          userId: ''
        })
      }
    },

    // 删除会话
    handleUserDel(data) {
      console.log('data', data)
      this.delUserRow = data
      this.delUserDialogVisible = true
    },

    // 查询消息记录
    queryHistoryMessage() {
      const {
        curPageNo,
        curPageSize
      } = this.curOnlineUserData
      const params = {
        merCode: this.merCode, // 商户编码
        userId: this.targetId, // 用户编码 如果有传入参数则使用参数 否则使用组件实例中的属性
        currentPage: curPageNo, // 当前页码
        pageSize: curPageSize // 每页条数
      }
      this.messageLoading = true
      this.queryOnlineCurUserMsgList(params).then(res => {
        this.messageLoading = false
        console.log('curOnlineUserData: 消息记录列表等', this.curOnlineUserData)
        setTimeout(() => {
          if (curPageNo === 1) {
            this.scrollToBottom()
          } else {
            this.scrolltoTop()
          }
        }, 50)
      }).catch(() => {
        this.messageLoading = false
      })
    },
    scrollToBottom: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#chat-detail-list')
        if (container) {
          container.scrollTop = container.scrollHeight
        } else {
          console.error(`找不到元素：#chat-detail-list`)
        }
      })
    },
    scrolltoTop: function() {
      this.$nextTick(() => {
        var container = this.$el.querySelector('#chat-detail-list')
        container.scrollTop = 0
      })
    },
    // emoji item点击
    emojiItemClick(emoji) {
      this.textMsgValue = `${this.textMsgValue}${emoji.emoji}`
      this.emojiPopVisible = false
    },
    submitUpload() {
      this.$refs.upload.submit()
    },
    // 图片选择
    handleChange(e) {
      const file = e.target.files
      console.error('file', file)
      if (!file || (file && file.length <= 0)) {
        return
      }
      const loading = this.$loading({
        lock: true,
        text: '正在上传图片...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })

      // 图片转base64作为缩略图
      let base64Url = ''
      var reader = new FileReader()
      reader.readAsDataURL(file[0]) // 读取图片输入为base64
      reader.onloadend = function() {
        base64Url = reader.result
        console.log('base64图片', base64Url)
      }

      const formData = new FormData()
      formData.append('file', file[0])

      // 上传图片
      CustomerService.fileUpload(formData).then(res => {
        const image = res.data

        const msgInfo = {
          content: this.showImg(image),
          extra: this.extra,
          imageUri: this.showImg(image)
        }
        Chat.sendMessage({
          targetId: this.targetId,
          msgInfo,
          messageType: Chat.MessageType.ImageMessage
        }).then(res => {
          loading.close()
          this.addMsgToOnlineCurUserMsgList({
            merCode: this.merCode,
            msgInfo: msgInfo,
            msgResult: res
          })
          // 这里
        }).catch((errCode, errMessage) => {
          loading.close()
          console.error('err', errCode, errMessage)
        })
      }).catch(_ => {
        this.$message({
          message: '图片上传失败',
          type: 'error'
        })
      })
    },
    blobToDataURL(blob, callback) {
      const a = new FileReader()
      a.onload = function(e) { callback(e.target.result) }
      a.readAsDataURL(blob)
    },
    // 搜索按钮点击
    searchBtnClick() {
      console.log('searchtext', this.searchText)
      if (!localStorage.getItem('ryConversationList')) {
        return
      }
      console.log('有缓存')
      const list = [...JSON.parse(localStorage.getItem('ryConversationList'))]
      if (!this.searchText.replace(/\s*/g, '')) {
        console.log('!ssearchtext')
        this.forceChangeConversationList(list)
        return
      }
      console.log('有搜索关键字')
      const tempList = []
      list.forEach((element) => {
        console.log('element.latestMessage.content.extra', element.latestMessage.content.extra)
        console.log('searchtext', this.searchText.replace(/\s*/g, ''))
        if (element.latestMessage.content.extra.nickName ? element.latestMessage.content.extra.nickName.toLowerCase().indexOf(this.searchText.toLowerCase().replace(/\s*/g, '')) > -1 : false) {
          tempList.push({
            ...element,
            newMsgNum: 0
          })
        }
      })
      this.forceChangeConversationList(tempList)
      console.log('changed this.onlineConversationData', this.onlineConversationData)
      if (this.onlineConversationData.list && this.onlineConversationData.list.length > 0) {
        console.log('hass this.onlineConversationData.list')
        const firstConversation = this.onlineConversationData.list[0]
        this.setCurOnlineUserId({
          userId: firstConversation.targetId
        })
        this.targetId = firstConversation.targetId
        this.curUserAvatar = firstConversation.latestMessage.content.extra ? firstConversation.latestMessage.content.extra.userLogo : ''
        this.curUserName = firstConversation.latestMessage.content.extra ? firstConversation.latestMessage.content.extra.nickName : '暂无用户昵称'
        this.resetRightData()
      } else {
        console.log('localstorage', localStorage.getItem('ryConversationList'))
        console.log('no this.onlineConversationData.list')
        this.targetId = ''
        this.curUserAvatar = ''
        this.curUserName = ''
        this.setCurOnlineUserId({
          userId: '',
          setStorage: false
        })
        console.log('localstorage after setCurOnlineUserId', localStorage.getItem('ryConversationList'))
      }
    },
    resetData() {
      this.conversationList = []
    },
    // 重置聊天记录及右侧个人资料
    resetRightData() {
      this.orderListCurPageNo = 1
      this.orderListHasMore = true
      this.orderListLoading = false
      this.orderList = []
      console.log('into resetrightdata ', this.targetId)
      if (this.targetId) {
        // 重置vuex中的聊天相关数据
        this.resetCurOnlineUserData()
        // 查询会话列表中第一个用户的消息记录、个人资料、订单信息等
        // 消息记录
        this.queryHistoryMessage()
        // 会员信息
        this.queryMemberInfo()
        // 购买记录
        this.queryUserBoughtRecord()
        // 订单列表
        this.queryUserOrderList()
      } else {
        this.resetCurOnlineUserData()
      }
    },
    handleSearchInput(val) {
      this.searchText = val
    },
    // 查看更多消息按钮
    viewMoreClick() {
      this.queryHistoryMessage()
    },
    handleGoodsClick(item) {
      console.log('item', item)
      const itemData = JSON.parse(item.content)
      if (itemData && itemData.url) {
        window.open(itemData.url)
      } else {
        console.log('no url')
      }
    },
    // 添加快捷回复
    addCannedReply() {
      this.$router.push({
        path: '/customerService/msgSettings'
      })
    }
  },
  created() {
    this.emojiList = Chat.getEmojiList()

    // // 获取商品列表
    // this.queryGoods()
    // 获取快捷回复列表
    this.queryCannedRepliesList()
    // 获取融云会话列表
    this.resetCurOnlineUserData()

    setTimeout(() => {
      this.consultingLoading = false
    }, 3000)
  },
  onShow() {
    this.setHasNewMsg(false)
  },
  updated() {
    // 打开了在线咨询页面且当前没有会话列表 收到新消息时重新请求会话列表
    if (this.hasNewMsg) {
      console.warn('new msg coming')
      if (this.onlineConversationData && this.onlineConversationData.list.length === 0) {
        this.setHasNewMsg(false)
        this.queryRYConversationList()
      }
    }
    if (this.ryConnected && !this.isFirstQueryFinished) {
      console.log('进了ryConnected')
      this.queryRYConversationList()
    }
  }
}
