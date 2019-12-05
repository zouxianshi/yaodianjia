<template>
  <div class="user-comp">
    <img src="" alt="" class="user-avatar">
    <div class="user-chat-info">
      <div class="chat-info-top">
        <div class="user-name">
          海的味道
        </div>
        <span class="chat-time">
          9-10
        </span>
      </div>
      <div class="user-chat-content">
        我知道
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

  .user-avatar {
    float: left;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ddd;
  }
  .user-chat-info {
    float: right;
    max-width: 65%;

    .chat-info-top {
      .user-name {
        font-size: 14px;
      }
      .chat-time {

      }
    }
    .user-chat-content {

      overflow: hidden;
    }
  }
}
</style>
