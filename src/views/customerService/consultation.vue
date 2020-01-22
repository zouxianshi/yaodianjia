<template>
  <chat-room v-loading="consultingLoading" :cur-user-name="curUserName">
    <template slot="userList">
      <div class="chat-list">
        <div class="search-box">
          <el-input
            id
            v-model="searchText"
            size="mini"
            class="search-input"
            type="search"
            maxlength="30"
            name
            placeholder="请输入客户名称"
            @input="handleSearchInput"
          >
            <el-button slot="append" icon="el-icon-search" @click="searchBtnClick" />
          </el-input>
        </div>
        <div v-if="hasNewMsg" class="no-content" />
        <div v-if="ryConnected" class="no-content" />
        <div v-if="onlineConversationData.list.length>0" class="user-list">
          <user
            v-for="(item,index) in onlineConversationData.list"
            :key="index"
            :data="item"
            :selected="targetId===item.targetId"
            :message-type="item.latestMessage.objectName"
            :avatar="item.latestMessage.content.extra ? item.latestMessage.content.extra.userLogo: ''"
            :nick-name="item.latestMessage.content.extra ? item.latestMessage.content.extra.nickName : '暂无用户昵称'"
            :date="`${formatTime(item.latestMessage.sentTime, 'MM-DD')}`"
            :content="item.latestMessage.content.content"
            :show-del-icon="true"
            @handleClick="handleUserClick(item)"
            @handleDel="handleUserDel(item)"
          >
            <el-dialog :show-close="false" append-to-body title="提示" :visible="delUserDialogVisible" width="30%">
              <span>确认删除当前会话吗？</span>
              <span slot="footer" class="dialog-footer">
                <el-button @click="delUserDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="delDialogConfirmBtnClick(item)">确 定</el-button>
              </span>
            </el-dialog>
          </user>
        </div>
      </div>
    </template>
    <template slot="chat-window-main">
      <div id="chat-detail-list" v-loading="messageLoading" class="chat-detail-list">
        <!-- curOnlineUserData.list.length{{curOnlineUserData.list.length}} -->
        <template v-if="curOnlineUserData.list.length>0">
          <view-more v-if="curOnlineUserData.hasMore" @handleClick="viewMoreClick" />
          <div
            v-for="(dItem,index) in curOnlineUserData.list"
            :key="index"
            :class="`chat-item-box`"
          >
            <div v-if="index===0 || index>0 && showDate(dItem.timeStamp, curOnlineUserData.list[index-1].timeStamp)" class="date-item">
              <div class="date-item-inner">{{ formatTime(dItem.timeStamp, 'YYYY-MM-DD HH:mm:ss') }}</div>
            </div>
            <div :class="`chat-item-inner ${dItem.fromUserId == targetId? '': 'right-align'}`">
              <!-- 用户发的头像靠左 -->
              <!-- <div v-if="dItem.toUserId !== targetId" class="chat-item-avatar"> -->
              <div v-if="dItem.fromUserId === targetId" class="chat-item-avatar">
                <el-image
                  fit="scale-down"
                  :src="curUserAvatar"
                  :preview-src-list="[curUserAvatar]"
                />
              </div>
              <!-- 聊天内容 -->
              <div :class="`chat-item-content ${computeChatItemType(dItem.messageType)}`">
                <div
                  v-if="dItem.messageType===MessageType.TextMessage"
                  class="text-message"
                >{{ symbolToEmoji(dItem.content) }}</div>
                <div v-else-if="dItem.messageType===MessageType.ImageMessage" class="image-message">
                  <el-image
                    fit="scale-down"
                    :src="dItem.content"
                    :preview-src-list="[dItem.content]"
                  />
                </div>
                <div
                  v-else-if="dItem.messageType===MessageType.GoodsMessage"
                  class="goods-message"
                  @click="handleGoodsClick(dItem)"
                >
                  <div v-if="targetId===dItem.toUserId" class="goods-message-header">为你推荐</div>
                  <div class="goods-message-inner">
                    <div class="goods-message-img">
                      <el-image fit="scale-down" :src="JSON.parse(dItem.content).imageUri" />
                    </div>
                    <div class="goods-message-info">
                      <div class="goods-name">{{ JSON.parse(dItem.content).title }}</div>
                      <div
                        class="goods-price"
                      >¥{{ Number(JSON.parse(dItem.content).price).toFixed(2) }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- 客服发的头像靠右 -->
              <div v-if="dItem.fromUserId !== targetId" class="chat-item-avatar">
                <el-image
                  fit="scale-down"
                  :src="merLogo"
                />
              </div>
            </div>
          </div>
        </template>
        <no-data v-else :text="'暂无聊天记录'" />
      </div>
      <div class="send-msg-box">
        <div class="action-list">
          <el-popover v-model="emojiPopVisible" placement="top-start" width="350" trigger="click">
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

          <el-popover v-model="cannedRepliesVisible" placement="top" width="200" trigger="click">
            <div class="canned-msg-list">
              <div
                v-for="(item,index) in cannedResList"
                :key="index"
                class="canned-msg-item"
                @click="msgItemClick(item)"
              >{{ item.msg }}</div>
            </div>
            <!-- <div class="add-reply-btn" type="text" @click="addCannedReply">新增快捷回复</div> -->
            <i slot="reference" class="el-icon-chat-square action-item" />
          </el-popover>
          <i class="el-icon-shopping-bag-2 action-item" @click="handleActionClick('goods')" />
          <el-dialog
            title="选择商品"
            :visible.sync="selectGoodsDialogVisible"
            append-to-body
            :close-on-click-modal="false"
            :before-close="handleSelectGoodsDialogClose"
          >
            <div class="search-filter-item">
              <el-input
                v-model="goodsQuery.name"
                class="search-filter-item-input"
                type="text"
                placeholder="请输入关键字搜索"
                maxlength="30"
                @input="handleGoodsNameInput"
              />
              <el-button
                class="search-filter-btn"
                type="primary"
                size="small"
                @click="goodsSearchBtnClick"
              >搜索</el-button>
            </div>
            <el-table
              ref="multipleTable"
              fit
              :data="goodsList"
              tooltip-effect="dark"
              height="300"
            >
              <el-table-column fixed="left" prop="image" label="图片" width="150">
                <template slot-scope="scope">
                  <el-image
                    fit="scale-down"
                    :src="showImg(scope.row.mainPic)"
                    :preview-src-list="[showImg(scope.row.mainPic)]"
                  />
                </template>
              </el-table-column>
              <el-table-column prop="name" label="名称" width="150" />
              <el-table-column prop="packStandard" label="规格" width="150">
                <template slot-scope="scope">
                  <div v-if="scope.row.specSkuList && scope.row.specSkuList.length > 0">
                    <div v-for="(item,index) in scope.row.specSkuList" :key="index" class="inner">
                      {{ item.skuKeyName }}:{{ item.skuValue }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column fixed="right" prop="action" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="small" @click="handleGoodsSelect(scope.row)">选择</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination
              class="pagination"
              :current-page="goodsQuery.currentPage"
              :page-sizes="goodsPagination.pageSizes"
              :page-size="goodsQuery.pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="goodsPagination.total"
              @size-change="handleGoodsDialogSizeChange"
              @current-change="handleGoodsDialogCurPageChange"
            />
          </el-dialog>
        </div>
        <div class="text-area">
          <el-input
            v-model="textMsgValue"
            class
            type="textarea"
            rows="5"
            placeholder="请输入内容"
            maxlength="512"
            @input="handleTextAreaChange"
            @keyup.enter.native="handleTextAreaKeyup"
          />
        </div>
        <div class="send-msg-box-bottom">
          <el-button type="primary" size="mini" @click="sendMsg">发送</el-button>
        </div>
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
import consultation from './consultation'
export default consultation
</script>

<style lang="scss">
  @import "./consultation.scss";
</style>
