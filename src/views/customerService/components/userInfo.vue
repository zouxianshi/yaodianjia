<template>
  <div class="chat-info-comp">
    <el-tabs v-model="activeName" @tab-click="handleRightTabClick">
      <div class="tab-box">
        <div :class="`tab-item ${selectedTab==='info'?'selected':''}`" @click="handleTabClick('info')">
          个人资料
        </div>
        <div :class="`tab-item ${selectedTab==='order'?'selected':''}`" @click="handleTabClick('order')">
          订单信息
        </div>
      </div>
      <div v-if="memberInfo && selectedTab==='info'" class="cur-user-info">
        <list-item name="昵称" :value="memberInfo.nickName" />
        <list-item name="手机" :value="memberInfo.memberPhone" />
        <list-item name="会员卡号" :value="memberInfo.cardNumber" />
        <div class="divider" />
        <template v-if="boughtRecord">
          <list-item name="购买次数" :value="boughtRecord.buyAvg" />
          <list-item name="购买均价" :value="boughtRecord.buyNum" />
        </template>
      </div>
      <div v-if="orderList && selectedTab === 'order'" class="cur-user-orders">
        <div v-for="(item,index) in orderList" :key="index" class="order-item">
          <div class="order-item-top">
            <div class="order-item-top-status">
              {{ orderStatusMap[item.orderStatus] }}
            </div>
            <div class="order-item-top-right">
              <div class="order-no">单号：{{ item.id }}</div>
              <div class="order-time">{{ item.orderTime }}</div>
            </div>
          </div>
          <div class="order-goods-list">
            <div v-for="(gItem,gIndex) in item.detailList" :key="gIndex" class="goods-item">
              <img :src="showImg(gItem.mpic)" alt class="goods-img">
              <div class="goods-info">
                <div class="goods-info-top">
                  <span class="goods-name">{{ gItem.commodityName }}</span>
                  <span class="goods-no">x {{ gItem.commodityNumber }}</span>
                </div>
                <div class="goods-size">{{ gItem.skuValue }}123</div>
                <!-- <div class="manufacturer">{{ item.storeName }}</div> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-tabs>
  </div>
</template>

<script>
import listItem from './listItem'
export default {
  components: {
    listItem
  },
  props: {
    memberInfo: {
      type: Object,
      default: null
    },
    boughtRecord: {
      type: Object,
      default: null
    },
    orderList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      // 选中的tab标识
      selectedTab: 'info',
      // 订单状态 2.待付款 4.待发货 6.待收货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
      orderStatusMap: {
        2: '待付款',
        4: '待发货',
        6: '待收货',
        8: '待退货',
        10: '待退款',
        12: '已完成',
        20: '已取消',
        30: '退款完成'
      },
      // 当前选中的标签页标识
      activeName: 'first'
    }
  },
  created() {
    console.log('this.boughtRecord', this.boughtRecord)
  },
  methods: {
    // 右侧标签页切换
    handleRightTabClick(tab, e) {
      console.log('tab', tab, 'e', e)
    },
    // tab click
    handleTabClick(type) {
      this.selectedTab = type
    }
  }
}
</script>

<style lang="scss">
  .text-overflow-1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .tab-box {
    border-bottom: 1px solid #ddd;
    width: 100%;
    display: flex;
    align-items: center;
    .tab-item {
      width: 50%;
      text-align: center;
      height: 48px;
      line-height: 48px;
      cursor: pointer;

      &.selected {
        border-bottom: 2px solid #45aafa;
      }
    }
  }

  .text-overflow-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .chat-info-comp {
    width: 280px;
    height: 100%;
    overflow: auto;
    float: right;
    border-left: 1px solid #eff0f5;

    .el-tabs {
      // background: #45aafa;

      .el-tabs__header {
        margin-bottom: 0;
        // background: #ffe400;

        .el-tabs__nav-wrap {
          background: #000;

          .el-tabs__nav-scroll {
            background: #ffe400;

            .el-tabs__nav {
              background: blue;
            }
          }
        }
      }
    }

    .el-tabs__item {
      // width: 50%;
      height: 48px !important;
    }

    .cur-user-info {
      .divider {
        height: 12px;
        background: #eff0f5;
      }
    }

    .cur-user-orders {
      .order-item {
        padding: 16px 12px;
        border-bottom: 1px dashed #ddd;

        .order-item-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          overflow: hidden;
          // border-bottom: 1px solid #eff0f5;
          font-size: 11px;
          // padding: 0 10px;

          .order-item-top-status {
            font-size: 14px;
            color: #45aafa;
          }

          .order-item-top-right {
            text-align: right;
            .order-no {
              flex: 1;
              @extend .text-overflow-1;
            }

            .order-time {
              margin-top: 8px;
              color: #999;
            }
          }
        }

        .order-goods-list {
          .goods-item {
            display: flex;
            align-items: center;
            padding: 10px 0 0;

            .goods-img {
              display: inline-block;
              width: 60px;
              height: 60px;
              background: #ddd;
            }

            .goods-info {
              overflow: hidden;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              flex: 1;
              height: 60px;
              margin-left: 8px;

              .goods-info-top {
                display: flex;
                align-items: center;
                .goods-name {
                  @extend .text-overflow-1;
                  flex: 1;
                  font-size: 11px;
                }

                .goods-no {
                  margin-left: 8px;
                  font-size: 12px;
                }
              }

              .goods-size {
                color: #666;
                // margin-top: 5px;
                font-size: 10px;
              }

              .manufacturer {
                color: #999;
                // margin-top: 5px;
                font-size: 10px;
              }
            }
          }
        }
      }
    }
  }
  .chat-info::-webkit-scrollbar {
    display: none;
  }
</style>
