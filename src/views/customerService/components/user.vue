<template>
  <div :class="`user-comp ${selected?'selected':''}`" @click="handleClick">
    <el-badge :max="99" :hidden="data.newMsgNum<=0" :value="data.newMsgNum" class="item">
      <div class="user-avatar">
        <el-image fit="cover" :src="avatar" />
      </div>
    </el-badge>
    <div v-if="data" class="user-chat-info">
      <div class="chat-info-top">
        <span class="user-name">{{ nickName || '暂无用户名' }}</span>
        <span class="chat-time">{{ date }}</span>
      </div>
      <div v-if="data" class="user-chat-content">
        <div class="content-preview">
          {{
            computedContent
          }}
        </div>
        <i v-if="showDelIcon" class="el-icon-delete" @click="handleDel" />
      </div>
    </div>
    <slot />
  </div>
</template>

<script>
import User from './user'
export default User
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
    padding: 14px 10px;
    width: 100%;

    &.selected {
      background-color: #dbdbdb;
    }

    .user-avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background-color: #45aafa;
      overflow: hidden;

      .el-image {
        width: 100%;
        height: 100%;
      }

      img {
        width: 100%;
        height: 100%;
      }
    }

    .user-chat-info {
      overflow: hidden;
      flex: 1;
      height: 48px;
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
          font-size: 16px;
          // font-weight: 700;
        }

        .chat-time {
          width: 40px;
          font-size: 14px;
          color: #999;
        }
      }

      .user-chat-content {
        display: flex;
        justify-content: space-between;

        .content-preview {
          font-size: 14px;
          color: #999;
          @extend .text-overflow-1;
        }
      }
    }
  }
</style>
