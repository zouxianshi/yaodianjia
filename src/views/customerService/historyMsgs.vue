<template>
  <div class="chat-room-comp app-container">
    <div class="chat-list">
      <div class="search-box">
        <el-input
          id
          v-model="searchText"
          size="mini"
          class="search-input"
          type="search"
          name
          placeholder="请输入客户名称"
          @input="handleSearchInput"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchBtnClick" />
        </el-input>
      </div>
      <div class="user-list">
        <div
          v-for="(item,index) in historyConversationList"
          :key="index"
          :class="`user-comp ${curChatUserId===item.userId?'selected':''}`"
          @click="handleUserClick(item)"
        >
          <div class="user-avatar">
            <img
              :src="item.headImgUrl"
            >
          </div>
          <div v-if="item" class="user-chat-info">
            <div class="chat-info-top">
              <span class="user-name">{{ item.nickName || '我是谁' }}</span>
              <span class="chat-time">
                {{
                  item
                    ? `${new Date(item.createTime).getMonth() + 1}-${new Date(
                      item.createTime
                    ).getDate()}`
                    : "" }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 有会话时展示会话窗口及用户信息 -->
    <div v-if="currentUser" class="right-box">
      <div class="chat-window">
        <div class="msg-box">
          <div class="cur-user-name">{{ currentUser }}</div>
          <div id="chat-detail-list" class="chat-detail-list">
            <template v-if="historyMsgList&&historyMsgList.length>0">
              <view-more v-if="showViewMore" @handleClick="viewMoreClick" />
              <div
                v-for="(msgItem,msgIndex) in historyMsgList"
                :key="msgIndex"
                :class="`chat-item ${msgItem.fromUserId===supporterId?'green':''}`"
              >
                <div class="chat-item-top">
                  <span class="chat-user-name">
                    {{ msgItem.fromUserId===supporterId?
                      `客服${msgItem.fromUserId}`
                      :`${currentUser||'暂无用户名'}`
                    }}
                  </span>
                  <span
                    class="chat-time"
                  >{{ `${new Date(msgItem.timeStamp).getHours()}:${new Date(msgItem.timeStamp).getMinutes()}:${new Date(msgItem.timeStamp).getSeconds()}` }}</span>
                </div>
                <div class="chat-item-content">
                  <div v-if="msgItem.messageType === 'RC:TxtMsg'" class="chat-text">
                    <!-- {{(symbolToEmoji(msgItem.content))}} -->
                    {{ msgItem.content.includes('[') ? symbolToEmoji(msgItem.content) : msgItem.content }}
                  </div>
                  <el-image
                    v-else-if="msgItem.messageType==='RC:ImgMsg'"
                    fit="scale-down"
                    :src="msgItem.content"
                    :preview-src-list="[msgItem.content]"
                  />
                  <div v-else-if="msgItem.messageType==='custom:commodity'" class="chat-goods">
                    <div class="chat-goods-inner">
                      <div class="chat-goods-img">
                        <el-image
                          fit="scale-down"
                          :src="JSON.parse(msgItem.content).imageUri"
                          :preview-src-list="[JSON.parse(msgItem.content).imageUri]"
                        />
                      </div>
                      <div class="chat-goods-info">
                        <div class="goods-name">{{ JSON.parse(msgItem.content).title }}</div>
                        <div class="goods-price">¥{{ JSON.parse(msgItem.content).price.toFixed(2) }}</div>
                      </div>
                    </div>
                  </div>
                  <div v-else class="chat-else">这是个没有判断到的消息类型</div>
                </div>
              </div>
            </template>
            <no-data v-else />
          </div>
        </div>
      </div>
      <user-info :member-info="memberInfo" :bought-record="boughtRecord" :order-list="orderList" />
    </div>
    <noData v-else class="chat-window" />
  </div>
</template>

<script>
import historyMsg from './historyMsg'
export default historyMsg
</script>

<style lang="scss" scoped>
  @import "./historyMsg.scss";
</style>
