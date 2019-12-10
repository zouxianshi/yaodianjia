<template>
  <div :class="`user-comp ${selected?'selected':''}`">
    <img src alt class="user-avatar">
    <div class="user-chat-info">
      <!-- <div class="chat-info-top"> -->
      <!-- <span class="user-name">{{data.senderUserId}}</span>
        <span class="chat-time">{{sentTime}}</span>
      </div>
      <div class="user-chat-content">{{data.latestMessage.content.content}}</div> -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false
    },
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    sentTime() {
      return `${new Date(this.data.sentTime).getMonth() + 1}-${new Date(this.data.sentTime).getDate()}`
    }
  }
}
</script>

<style scoped lang="scss">
  .text-overflow-1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .text-overflow-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .user-comp {
    display: flex;
    align-items: center;
    overflow: hidden;
    padding: 10px 5%;

    &.selected {
      background-color: #ddd;
    }

    .user-avatar {
      max-width: 30%;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #45aafa;
    }
    .user-chat-info {
      flex: 1;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 8px;
      max-width: 65%;

      .chat-info-top {
        overflow: hidden;

        .user-name {
          float: left;
          font-size: 14px;
          // font-weight: 700;
        }
        .chat-time {
          float: right;
          font-size: 12px;
          color: #999;
        }
      }
      .user-chat-content {
        font-size: 12px;
        color: #999;
        @extend .text-overflow-1;
      }
    }
  }
</style>
