<template>
  <div class="consulting-page">
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
        <div v-if="hasNewMsg" class="no-content" />
        <div class="user-list">
          <div
            v-for="(item,index) in onlineConversationData.list"
            :key="index"
            :class="`user-comp ${curUserNameId=item.targetId?'selected':''}`"
            @click="handleUserClick(item)"
          >
            <el-badge :max="99" :hidden="item.newMsgNum<=0" :value="item.newMsgNum" class="item">
              <div class="user-avatar">
                <img :src="showImg(item.latestMessage.content.extra.headimgurl)">
              </div>
            </el-badge>
            <div v-if="item" class="user-chat-info">
              <div class="chat-info-top">
                <span class="user-name">{{ item.latestMessage.content.extra.nickName || '我是谁' }}</span>
                <span class="chat-time">
                  {{
                    item
                      ? `${new Date(item.sentTime).getMonth() + 1}-${new Date(
                        item.sentTime
                      ).getDate()}`
                      : "" }}
                </span>
              </div>
              <div v-if="item" class="user-chat-content">{{ item.latestMessage.content.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <template v-if="onlineConversationData.list&&onlineConversationData.list.length>0">
        <div class="chat-window">
          <div class="msg-box">
            <div class="cur-user-name">{{ curUserName }}</div>
            <div id="chat-detail-list" class="chat-detail-list">
              <view-more v-if="curOnlineUserData.hasMore" @handleClick="viewMoreClick" />
              <div
                v-for="(dItem,index) in curOnlineUserData.list"
                :key="index"
                :class="`date-list`"
              >
                <div :class="`date-chat-item ${dItem.fromUserId == targetId? '': 'right-align'}`">
                  <template v-if="dItem.fromUserId == targetId">
                    <div class="chat-dItem-avatar">
                      <el-image
                        fit="scale-down"
                        :src="showImg(dItem.img)"
                        :preview-src-list="[showImg(dItem.img)]"
                      />
                    </div>
                    <div class="chat-dItem-content">
                      <div
                        v-if="dItem.messageType==='RC:TxtMsg'"
                        class="chat-text"
                      >{{ dItem.content.includes('[') ? symbolToEmoji(dItem.content) : dItem.content }}</div>
                      <el-image
                        v-else-if="dItem.messageType==='RC:ImgMsg'"
                        fit="scale-down"
                        :src="dItem.content"
                        :preview-src-list="[dItem.content]"
                      />
                      <div v-else class="goods-card">
                        <div class="goods-card-header">为你推荐</div>
                        <div class="goods-card-main">
                          <div class="goods-img">
                            <el-image
                              fit="scale-down"
                              :src="showImg(dItem.content.img)"
                              :preview-src-list="[showImg(dItem.content.img)]"
                            />
                          </div>
                          <div class="goods-info">
                            <div class="goods-name">{{ dItem.content.name }}</div>
                            <div class="goods-price">¥{{ dItem.content.price }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div class="chat-dItem-content">
                      <!-- <template v-if="dItem.type==='text'"></template> -->
                      <div
                        v-if="dItem.messageType==='RC:TxtMsg'"
                        class="chat-text"
                      >{{ dItem.content }}</div>
                      <el-image
                        v-else-if="dItem.messageType==='RC:ImgMsg'"
                        fit="scale-down"
                        :src="dItem.content"
                        :preview-src-list="[dItem.content]"
                      />
                      <div v-else class="goods-card">
                        <div class="goods-card-header">为你推荐</div>
                        <div class="goods-card-main">
                          <div class="goods-img">
                            <el-image
                              fit="scale-down"
                              :src="showImg(dItem.content.img)"
                              :preview-src-list="[showImg(dItem.content.img)]"
                            />
                          </div>
                          <div class="goods-info">
                            <div class="goods-name">{{ dItem.content.name }}</div>
                            <div class="goods-price">{{ dItem.content.price }}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="chat-dItem-avatar">
                      <el-image
                        fit="scale-down"
                        :src="showImg(merLogo)"
                        :preview-src-list="[showImg(dItem.img)]"
                      />
                    </div>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <div class="send-msg-box">
            <div class="action-list">
              <el-popover
                v-model="emojiPopVisible"
                placement="top-start"
                width="350"
                trigger="click"
              >
                <div class="emoji-list">
                  <span
                    v-for="(item,index) in emojiList"
                    :key="index"
                    class="emoji-item"
                    @click="emojiItemClick(item)"
                  >{{ item.emoji }}</span>
                </div>
                <i slot="reference" class="el-icon-picture-outline-round action-item" />
              </el-popover>
              <input
                id="pic"
                type="file"
                name="pic"
                accept="image/gif, image/jpeg, image/png, image/webp"
                @change="handleChange"
              >
              <i class="el-icon-picture action-item" @click="handleActionClick('pic')" />

              <el-popover
                v-model="cannedRepliesVisible"
                placement="top"
                width="200"
                trigger="click"
              >
                <div class="canned-msg-list">
                  <div
                    v-for="(item,index) in cannedResList"
                    :key="index"
                    class="canned-msg-item"
                    @click="msgItemClick(item)"
                  >{{ item.msg }}</div>
                </div>
                <i slot="reference" class="el-icon-chat-square action-item" />
              </el-popover>
              <i class="el-icon-shopping-bag-2 action-item" @click="handleActionClick('goods')" />
              <el-dialog
                title="选择商品"
                append-to-body
                :visible="selectGoodsDialogVisible"
                width="600"
                :before-close="handleSelectGoodsDialogClose"
              >
                <el-table
                  ref="multipleTable"
                  height="400"
                  :data="goodsList"
                  tooltip-effect="dark"
                  style="width: 100%"
                >
                  <el-table-column prop="image" label="图片" width="150">
                    <template slot-scope="scope">
                      <el-image
                        fit="scale-down"
                        :src="showImg(scope.row.mainPic)"
                        :preview-src-list="[showImg(scope.row.mainPic)]"
                      />
                    </template>
                  </el-table-column>
                  <el-table-column prop="name" label="名称" width="150" />
                  <el-table-column prop="packStandard" label="规格" width="150" />
                  <el-table-column prop="action" label="操作" width="150">
                    <template slot-scope="scope">
                      <el-button
                        type="primary"
                        size="small"
                        @click="handleGoodsSelect(scope.row)"
                      >选择</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-dialog>
            </div>
            <div class="text-area">
              <el-input
                v-model="textMsgValue"
                class
                type="textarea"
                rows="5"
                placeholder="请输入内容"
                @input="handleTextAreaChange"
              />
            </div>
            <div class="send-msg-box-bottom">
              <el-button type="primary" size="mini" @click="sendMsg">发送</el-button>
            </div>
          </div>
        </div>
        <user-info :member-info="memberInfo" :bought-record="boughtRecord" :order-list="orderList" />
      </template>
      <no-data v-else />
    </div>
  </div>
</template>

<script>
import consultation from './consultation'
export default consultation
</script>

<style lang="scss">
  @import "./consultation.scss";
</style>
