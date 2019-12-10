<template>
  <div class="container">
    <!-- <button @click="sendMsg">发送消息</button> -->
    <!-- <chat-room :conversationList="conversationList" /> -->
    <div class="chat-room-comp app-container">
      <div class="chat-list">
        <div class="search-box">
          <el-input id size="mini" class="search-input" type="search" name placeholder="请输入客户名称" />
        </div>
        <div class="user-list">
          <user v-for="(item,index) in conversationList" :key="index" :data="item" :selected="index===0" />
        </div>
      </div>
      <div class="chat-window">
        <div class="msg-box">
          <div class="cur-user-name">{{ currentUser }}</div>
          <div class="chat-detail-list">
            <!-- <div class="view-more">查看更多消息</div> -->
            <div v-for="(item,index) in conversationList" :key="index" class="date-list">
              <div class="date">2019-06-07</div>
              <div class="date-chat-record">
                <div v-for="(dItem,dIndex) in item.list" :key="dIndex" class="date-chat-item">
                  <div class="chat-item-info">@用户名 10:23:11</div>
                  <div class="chat-item-text">聊天内容</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="send-msg-box">
          <div class="action-list">
            <i class="el-icon-picture-outline-round action-item" @click="handleActionClick('emoji')" />
            <i class="el-icon-picture action-item" @click="handleActionClick('pic')" />
            <i class="el-icon-chat-square action-item" @click="handleActionClick('answer')" />
            <i class="el-icon-shopping-bag-2 action-item" @click="handleActionClick('mall')" />
          </div>
          <div class="text-area">
            <el-input v-model="textarea" class="" type="textarea" rows="5" placeholder="请输入内容" @input="handleTextAreaChange" />
            <!--  -->
            <!-- <textarea placeholder="请输入文本内容" name="" id="" @input="textAreaChange"></textarea> -->
          </div>
          <div class="send-msg-box-bottom">
            <el-button type="primary" size="mini" @click="sendMsg">发送</el-button>
          </div>
        </div>
      </div>
      <div class="chat-info">
        <el-tabs v-model="activeName" @tab-click="handleRightTabClick">
          <el-tab-pane label="个人资料" name="first">
            <div class="cur-user-info">
              <list-item name="姓名" value="翁师" />
              <list-item name="昵称" value="翁小茉" />
              <list-item name="手机" value="18676878776" />
              <list-item name="会员卡号" value="20178799927" />
              <div class="divider" />
              <list-item name="购买次数" value="2" />
              <list-item name="购买均价" value="10" />
            </div>
          </el-tab-pane>
          <el-tab-pane label="订单信息" name="second">
            <div class="cur-user-orders">
              <div v-for="(item,index) in orderList" :key="index" class="order-item">
                <div class="order-item-top">
                  <div class="order-no">单号：{{ item.orderNo }}</div>
                  <div class="order-time">{{ item.time }}</div>
                </div>
                <div class="order-goods-list">
                  <div v-for="(gItem,gIndex) in item.goodsList" :key="gIndex" class="goods-item">
                    <img src alt class="goods-img">
                    <div class="goods-info">
                      <div class="goods-info-top">
                        <span class="goods-name">{{ gItem.name }}</span>
                        <span class="goods-no">x{{ gItem.number }}</span>
                      </div>
                      <div class="goods-size">{{ gItem.weight }}克✖{{ gItem.size }}粒</div>
                      <div class="manufacturer">{{ gItem.manufacturer }}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import consultation from './consultation'
export default consultation
</script>

<style  lang="scss">
  @import "./consultation.scss";
</style>
