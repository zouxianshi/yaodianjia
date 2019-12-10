<template>
  <div>
    <chat-room />
  </div>
</template>

<script>
import chatRoom from './components/chatRoom'
export default {
  components: {
    chatRoom
  },
  data() {
    return {}
  },
  created() {
    var RongIMLib = window.RongIMLib
    // var RongIMClient = RongIMLib.RongIMClient;
    //     console.log("RongIMClient", RongIMClient);
    //     RongIMClient.init(RYAppKey);
    var conversationType = RongIMLib.ConversationType.PRIVATE // 单聊, 其他会话选择相应的消息类型即可
    var targetId = 'a28e7d0cb7d14acfa0084f011ea29034' // 想获取自己和谁的历史消息，targetId 赋值为对方的 userId。类型： string
    var timestrap = null // 默认传 null，若从头开始获取历史消息，请赋值为 0, timestrap = 0;
    var count = 20 // 每次获取的历史消息条数，范围 0-20 条，可以多次获取
    RongIMLib.RongIMClient.getInstance().getHistoryMessages(conversationType, targetId, timestrap, count, {
      onSuccess: function(list, hasMsg) {
        // list => Message 数组。
        // hasMsg => 是否还有历史消息可以获取。
      },
      onError: function(error) {
        console.log('GetHistoryMessages, errorcode:' + error)
      }
    })
  }
}
</script>

<style>
</style>
