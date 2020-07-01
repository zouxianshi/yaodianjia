<template>
  <div class="chat-room-component app-container">
    <slot name="userList" />
    <!-- curUserName{{curUserName}} -->
    <div v-if="curUserName" class="chat-room-right-box">
      <div class="chat-window">
        <div class="chat-window-header">{{ curUserName }}</div>
        <div class="chat-window-main">
          <slot name="chat-window-main" />
        </div>
      </div>
      <slot name="chat-user-info" />
    </div>
    <no-data v-else class="chat-room-right-box" />
  </div>
</template>

<script>
import noData from '@/components/NoData'
export default {
  components: {
    noData
  },
  props: {
    curUserName: {
      type: String,
      default: '用户名'
    }
  }
}
</script>

<style lang="scss" scoped>
  .chat-room-component {
    padding: 0;
    width: 100%;
    background: #fff;
    display: flex;
    align-items: center;
    overflow: hidden;
    height: calc(100vh - 204px);

    .chat-list {
      height: 100%;
      overflow: auto;
      width: 220px;
      background-color: #f4f4f4;
    }
    .chat-room-right-box {
      height: 100%;
      flex: 1;
      overflow: hidden;
      display: flex;
      align-items: center;
        // box-shadow: inset 5px 2px 10px 1px #eee;

      .chat-window {
        display: flex;
        flex-direction: column;
        flex: 1;
        height: 100%;
        overflow: auto;
        box-shadow: inset -5px 2px 10px 1px #eee;

        .chat-window-header {
          height: 48px;
          border-bottom: 1px solid #eff0f5;
          padding: 0 20px;
          line-height: 48px;
          font-size: 16px;
        }
        .chat-window-main {
          flex: 1;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
      }
    }
  }
</style>
