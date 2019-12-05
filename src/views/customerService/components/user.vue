<template>
  <div class="user-comp">
    <img src="" alt="" class="user-avatar">
    <div class="user-chat-info">
      <div class="chat-info-top">
        <span class="user-name">
          海的味道
        </span>
        <span class="chat-time">
          9-10
        </span>
      </div>
      <div class="user-chat-content">
        我知道hhhhhhhhhhhhhhhhhhhhh
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
.user-comp {
  overflow: hidden;
  padding: 10px 5%;

  .user-avatar {
    float: left;
    max-width: 30%;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ddd;
  }
  .user-chat-info {
    float: left;
    margin-left: 5%;
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
      margin-top: 8px;
      font-size: 12px;
      color: #999;
      word-break: break-all;
    }
  }
}
</style>
