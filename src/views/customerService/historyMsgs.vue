<template>
  <chat-room :cur-user-name="currentUser">
    <template slot="userList">
      <div class="chat-list">
        <div class="search-box">
          <el-input
            id
            v-model="searchText"
            size="mini"
            class="search-input"
            type="search"
            name
            maxlength="30"
            placeholder="请输入客户名称"
            @input="handleSearchInput"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchBtnClick" />
          </el-input>
        </div>
        <div class="user-list">
          <user
            v-for="(item,index) in historyConversationList"
            :key="index"
            :data="item"
            :selected="curChatUserId===item.userId"
            :avatar="item.headImgUrl"
            :nick-name="item.nickName"
            :date="`${formatTime(item.createTime, 'MM-DD')}`"
            @handleClick="handleUserClick(item)"
          />
        </div>
      </div>
    </template>
    <template slot="chat-window-main">
      <div id="chat-detail-list" v-loading="messageLoading" class="chat-detail-list">
        <template v-if="historyMsgList&&historyMsgList.length>0">
          <view-more v-if="showViewMore" @handleClick="viewMoreClick" />
          <div
            v-for="(msgItem,msgIndex) in historyMsgList"
            :key="msgIndex"
            :class="`chat-item ${msgItem.toUserId===curChatUserId?'green':''}`"
          >
            <div v-if="msgIndex===0 || msgIndex > 0 && !showDate(msgItem.timeStamp, historyMsgList[msgIndex-1].timeStamp)" class="date-item">
              <div class="date-item-inner">{{ formatTime(msgItem.timeStamp, 'YYYY-MM-DD') }}</div>
            </div>
            <div class="chat-item-top">
              <span class="chat-user-name">
                {{ msgItem.toUserId===curChatUserId?
                  `客服${msgItem.fromUserId}`
                  :`${currentUser||'暂无用户名'}`
                }}
              </span>
              <span class="chat-time">{{ formatTime(msgItem.timeStamp, 'HH:mm:ss') }}</span>
            </div>
            <div class="chat-item-content">
              <div
                v-if="msgItem.messageType === MessageType.TextMessage"
                class="chat-text"
              >{{ msgItem.content.includes('[') ? symbolToEmoji(msgItem.content) : msgItem.content }}</div>
              <el-image
                v-else-if="msgItem.messageType===MessageType.ImageMessage"
                fit="scale-down"
                :src="msgItem.content"
                :preview-src-list="[msgItem.content]"
              />
              <div
                v-else-if="msgItem.messageType===MessageType.GoodsMessage"
                class="chat-goods"
                @click="handleGoodsClick(msgItem)"
              >
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
                    <div
                      class="goods-price"
                    >¥{{ Number(JSON.parse(msgItem.content).price).toFixed(2) }}</div>
                  </div>
                </div>
              </div>
              <div v-else class="chat-else">这是个没有判断到的消息类型</div>
            </div>
          </div>
        </template>
        <no-data v-else />
      </div>
    </template>
    <template slot="chat-user-info">
      <user-info
        :member-info="memberInfo"
        :bought-record="boughtRecord"
        :order-list="orderList"
        :order-list-has-more="orderListHasMore"
        :order-list-loading="orderListLoading"
        @loadOrderData="queryUserOrderList"
      />
    </template>
  </chat-room>
</template>

<script>
import historyMsg from './historyMsg'
export default historyMsg
</script>

<style lang="scss">
  @import "./historyMsg.scss";
</style>
