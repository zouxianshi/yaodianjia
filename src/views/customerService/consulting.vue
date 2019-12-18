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
            :avatar="item.latestMessage.content.extra.userLogo"
            :nick-name="item.latestMessage.content.extra.nickName"
            :date="`${new Date(item.sentTime).getMonth() + 1}-${new Date(
              item.sentTime
            ).getDate()}`"
            :content="item.latestMessage.content.content"
            @handleClick="handleUserClick(item)"
          />
        </div>
      </div>
    </template>
    <template slot="chat-window-main">
      <div id="chat-detail-list" v-loading="messageLoading" class="chat-detail-list">
        <!-- curOnlineUserData.list.length{{curOnlineUserData.list.length}} -->
        <template v-if="curOnlineUserData.list.length>0">
          <view-more v-if="curOnlineUserData.hasMore" @handleClick="viewMoreClick" />
          <div v-for="(dItem,index) in curOnlineUserData.list" :key="index" :class="`date-list`">
            <div :class="`date-chat-item ${dItem.fromUserId == targetId? '': 'right-align'}`">
              <template v-if="dItem.fromUserId == targetId">
                <div class="chat-dItem-avatar">
                  <el-image
                    fit="scale-down"
                    :src="curUserAvatar"
                    :preview-src-list="[curUserAvatar]"
                  />
                </div>
                <div class="chat-dItem-content">
                  <div
                    v-if="dItem.messageType===MessageType.TextMessage"
                    class="chat-text"
                  >{{ symbolToEmoji(dItem.content) }}</div>
                  <div
                    v-else-if="dItem.messageType===MessageType.ImageMessage"
                    class="image-message"
                  >
                    <el-image
                      fit="scale-down"
                      :src="dItem.content"
                      :preview-src-list="[dItem.content]"
                    />
                  </div>
                  <div
                    v-else-if="dItem.messageType===MessageType.GoodsMessage"
                    class="goods-card"
                    @click="handleGoodsClick(dItem)"
                  >
                    <div class="goods-card-header">商品消息</div>
                    <div
                      class="chat-goods-inner"
                    >
                      <div class="chat-goods-img">
                        <el-image
                          fit="scale-down"
                          :src="JSON.parse(dItem.content).imageUri"
                          :preview-src-list="[JSON.parse(dItem.content).imageUri]"
                        />
                      </div>
                      <div class="chat-goods-info">
                        <div class="goods-name">{{ JSON.parse(dItem.content).title }}</div>
                        <div
                          class="goods-price"
                        >¥{{ Number(JSON.parse(dItem.content).price).toFixed(2) }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="chat-dItem-content">
                  <div
                    v-if="dItem.messageType===MessageType.TextMessage"
                    class="chat-text"
                  >{{ symbolToEmoji(dItem.content) }}</div>
                  <div
                    v-else-if="dItem.messageType===MessageType.ImageMessage"
                    class="image-message"
                  >
                    <el-image
                      fit="scale-down"
                      :src="dItem.content"
                      :preview-src-list="[dItem.content]"
                    />
                  </div>
                  <div
                    v-else-if="dItem.messageType===MessageType.GoodsMessage"
                    class="goods-card"
                    @click="handleGoodsClick(dItem)"
                  >
                    <div class="goods-card-header">为你推荐</div>
                    <div class="chat-goods-inner">
                      <div class="chat-goods-img">
                        <el-image
                          fit="scale-down"
                          :src="JSON.parse(dItem.content).imageUri"
                          :preview-src-list="[JSON.parse(dItem.content).imageUri]"
                        />
                      </div>
                      <div class="chat-goods-info">
                        <div class="goods-name">{{ JSON.parse(dItem.content).title }}</div>
                        <div
                          class="goods-price"
                        >¥{{ Number(JSON.parse(dItem.content).price).toFixed(2) }}</div>
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
            <i slot="reference" class="el-icon-chat-square action-item" />
          </el-popover>
          <i class="el-icon-shopping-bag-2 action-item" @click="handleActionClick('goods')" />
          <el-dialog
            title="选择商品"
            :visible.sync="selectGoodsDialogVisible"
            append-to-body
            width="60%"
            :close-on-click-modal="false"
            :before-close="handleSelectGoodsDialogClose"
          >
            <div class="search-filter-item">
              <el-input
                v-model="goodsQuery.name"
                class="search-filter-item-input"
                type="text"
                placeholder="请输入关键字搜索"
                @input="handleGoodsNameInput"
              />
              <el-button class="search-filter-btn" type="primary" size="small" @click="queryGoods">
                搜索
              </el-button>
            </div>
            <el-table ref="multipleTable" width="100%" height="400" :data="goodsList" tooltip-effect="dark">
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
              <el-table-column prop="action" label="操作">
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
            @input="handleTextAreaChange"
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
