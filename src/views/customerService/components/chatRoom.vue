<!-- 聊天室组件 -->

<template>
  <div class="chat-room-comp app-container">
    <div class="chat-list">
      <div class="search-box">
        <el-input id size="mini" class="search-input" type="search" name placeholder="请输入客户名称" />
      </div>
      <div class="user-list">
        <user v-for="(item,index) in userList" :key="index" />
      </div>
    </div>
    <div class="chat-window">
      <div class="cur-user-name">与{{ currentUser }}的聊天记录</div>
      <div class="chat-detail-list">
        <div class="view-more">查看更多消息</div>
        <div v-for="(item,index) in curUserChatRecord" :key="index" class="date-list">
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
    <div class="chat-info">
      <el-tabs v-model="activeName" @tab-click="handleRightTabClick">
        <el-tab-pane label="个人资料" name="first">
          <div class="cur-user-info">
            <list-item name="姓名" value="这是个姓名" />
            <list-item name="昵称" value="这是个姓名" />
            <list-item name="手机" value="这是个姓名" />
            <list-item name="会员卡号" value="这是个姓名" />
            <div class="divider" />
            <list-item name="购买次数" value="这是个姓名" />
            <list-item name="购买均价" value="这是个姓名" />
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
</template>

<script>
import user from './user'
import listItem from './listItem'
export default {
  name: 'ChatRoom',
  components: {
    user,
    listItem
  },
  props: {},
  data() {
    return {
      // 当前选中的标签页标识
      activeName: 'first',
      // 当前打开的聊天窗口用户名
      currentUser: '@用户名',
      // 左侧用户列表
      userList: new Array(10),
      // 当前用户聊天记录
      curUserChatRecord: [
        {
          date: '2019-06-07',
          list: [
            {
              from: 'user',
              text: 'hahhh',
              time: '10:23:00'
            },
            {
              from: 'merchant',
              text: 'bububu',
              time: '10:22:38'
            }
          ]
        },
        {
          date: '2019-06-06',
          list: [
            {
              from: 'user',
              text: 'hahhh',
              time: '10:23:00'
            },
            {
              from: 'merchant',
              text: 'bububu',
              time: '10:22:38'
            }
          ]
        }
      ],
      orderList: [
        {
          orderNo: 2012012001201212,
          time: '2018-05-02 19:23',
          goodsList: [
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            }
          ]
        },
        {
          orderNo: 2012012001201212,
          time: '2018-05-02 19:23',
          goodsList: [
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            },
            {
              manufacturer: '湖南九芝堂股份有限公司',
              weight: 0.25,
              size: 12,
              name: '阿莫西林胶囊',
              number: 2
            }
          ]
        }
      ]
    }
  },
  methods: {
    // 右侧标签页切换
    handleRightTabClick(tab, e) {
      console.log('tab', tab, 'e', e)
    }
  }
}
</script>

<style scoped lang="scss">
	.chat-room-comp {
		width: 100%;
		// height: 500px;
		background: #fff;

		.chat-list {
			max-height: 100%;
			overflow: auto;
			border-right: 1px solid #ddd;
			float: left;
			width: 20%;

			.search-box {
				width: 100%;
				height: 48px;
				padding: 10px;
				background-color: #ddd;

				.search-input {
					// margin-top: 10px;
					// input {
					//   height: 28px;
					//   line-height: 28px;
					//   font-size: 14px;
					// }
				}
			}
			.user-list {
			}
		}
		.chat-window {
			width: 55%;
			float: left;
			max-height: 100%;
			overflow: auto;

			.cur-user-name {
				height: 48px;
				border-bottom: 1px solid #ddd;
				padding: 0 20px;
				line-height: 48px;
				font-size: 14px;
			}
			.chat-detail-list {
				padding: 0 20px;

				.view-more {
					padding: 10px 0;
					text-align: center;
					font-size: 12px;
					color: #45aafa;
				}
				.date-list {
					text-align: center;
					.date {
						display: inline-block;
						margin: 10px auto 0;
						border-radius: 6px;
						background: #ccc;
						padding: 2px 40px;
						font-size: 12px;
						color: #fff;
					}
					.date-chat-record {
						text-align: left;
						.date-chat-item {
							margin-top: 10px;
							.chat-item-info {
								font-size: 12px;
								color: #45aafa;

								&.user {
									color: #45aafa;
								}
								&.self {
									color: green;
								}
							}
							.chat-item-text {
								margin-top: 10px;
								font-size: 12px;
								color: #222;
							}
						}
					}
				}
			}
		}
		.chat-info::-webkit-scrollbar, .chat-list::-webkit-scrollbar, .chat-window::-webkit-scrollbar {
			display: none; //Safari and Chrome
		}
		.chat-info {
			width: 25%;
			max-height: 100%;
			overflow: auto;
			float: right;
			padding: 0 10px;
			border-left: 1px solid #eff0f5;

			.el-tabs {
				// background: #45aafa;

				.el-tabs__header {
					// background: #ffe400;

					.el-tabs__nav-wrap {
						background: #000;
					}
				}
			}

			.el-tabs__item {
				height: 48px !important;
			}

			.cur-user-info {
				.divider {
					height: 20px;
					background: #eff0f5;
				}
			}
			.cur-user-orders {
				.order-item {
					margin-bottom: 20px;

					.order-item-top {
						overflow: hidden;
						border-bottom: 1px solid #eff0f5;
						font-size: 11px;
						padding: 5px 0;

						.order-no {
							float: left;
						}
						.order-time {
							float: right;
						}
					}
					.order-goods-list {
						.goods-item {
							padding: 5px 0;
							.goods-img {
								display: inline-block;
								width: 40px;
								height: 40px;
								background: #ddd;
							}
							.goods-info {
								display: inline-block;
								.goods-info-top {
									.goods-name {
										font-size: 11px;
									}
									.goods-no {
										font-size: 12px;
									}
								}
								.goods-size {
									margin-top: 5px;
									font-size: 10px;
								}
								.manufacturer {
									margin-top: 5px;
									font-size: 10px;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
