
import Chat from '@/utils/chat'
console.log('UserChat', Chat)
export default {
  props: {
    // 数据对象
    data: {
      type: Object,
      default: null
    },
    // 是否选中
    selected: {
      type: Boolean,
      default: false
    },
    // 消息类型
    messageType: {
      type: String,
      default: 'RC:TxtMsg'
    },
    // 头像
    avatar: {
      type: String,
      default: ''
    },
    // 用户名
    nickName: {
      type: String,
      default: ''
    },
    // 时间
    date: {
      type: String,
      default: ''
    },
    // 内容
    content: {
      type: String,
      default: ''
    },
    // 移入是否展示删除按钮
    showDelIcon: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    sentTime() {
      return this.data
        ? `${new Date(this.data.sentTime).getMonth() + 1}-${new Date(
          this.data.sentTime
        ).getDate()}`
        : ''
    },
    computedContent() {
      switch (this.messageType) {
        case Chat.MessageType.TextMessage:
          return Chat.symbolToEmoji(this.content)
        case Chat.MessageType.ImageMessage:
          return '[图片消息]'
        case Chat.MessageType.GoodsMessage:
          return '[商品消息]'
        default:
          return this.content
      }
    }
  },
  created() {
    console.log('user component this.data', this.data)
  },
  methods: {
    handleClick() {
      this.$emit('handleClick', this.data)
    },
    handleDel() {
      this.$emit('handleDel')
    }
  }
}
