<template>
  <div :class="`user-comp ${selected?'selected':''}`" @click="handleUserClick">
    <div class="user-avatar">
      <img :src="data.latestMessage.content.extra.headimgurl" alt>
      <!-- <el-image
        fit="scale-down"
        :src="showImg(data.latestMessage.content.extra.headimgurl)"
        :preview-src-list="[showImg(data.latestMessage.content.extra.headimgurl)]"
      /> -->
    </div>
    <div v-if="data" class="user-chat-info">
      <div class="chat-info-top">
        <span class="user-name">{{ data.latestMessage.content.extra.nickName }}</span>
        <span class="chat-time">{{ sentTime }}</span>
      </div>
      <div v-if="data" class="user-chat-content">{{ data.latestMessage.content.content }}</div>
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
      return this.data
        ? `${new Date(this.data.sentTime).getMonth() + 1}-${new Date(
          this.data.sentTime
        ).getDate()}`
        : ''
    }
  },
  created() {
    console.log('this', this.data)
  },
  methods: {
    handleUserClick() {
      this.$emit('handleUserClick', this.data)
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
    justify-content: space-between;
    overflow: hidden;
    padding: 10px;

    &.selected {
      background-color: #ddd;
    }

    .user-avatar {
      max-width: 30%;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: #45aafa;

      img {
        width: 100%;
        height: 100%;
      }
    }
    .user-chat-info {
      overflow: hidden;
      flex: 1;
      height: 40px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-left: 8px;

      .chat-info-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        overflow: hidden;

        .user-name {
          @extend .text-overflow-1;
          font-size: 14px;
          // font-weight: 700;
        }
        .chat-time {
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
