<template>
  <div class="chat-info-comp">
    <div class="tab-box">
      <div
        :class="`tab-item ${selectedTab==='info'?'selected':''}`"
        @click="handleTabClick('info')"
      >个人资料</div>
      <div
        :class="`tab-item ${selectedTab==='order'?'selected':''}`"
        @click="handleTabClick('order')"
      >订单信息</div>
    </div>
    <div class="tab-content">
      <div v-if="memberInfo && selectedTab==='info'" class="cur-user-info">
        <list-item name="昵称" :value="memberInfo.nickName" />
        <list-item name="手机" :value="memberInfo.memberPhone" />
        <list-item name="会员卡号" :value="memberInfo.cardNumber" />
        <div class="divider" />
        <template v-if="boughtRecord">
          <list-item name="购买次数" :value="`${boughtRecord.buyNum||0}`" />
          <list-item name="购买均价" :value="`${boughtRecord.buyAvg||0}`" />
        </template>
      </div>
      <div
        v-if="orderList && selectedTab === 'order'"
        v-infinite-scroll="loadOrderData"
        class="cur-user-orders"
        :infinite-scroll-disabled="!orderListHasMore||orderListLoading"
      >
        <div v-for="(item,index) in orderList" :key="index" class="order-item">
          <div class="order-item-top">
            <div class="order-item-top-status">{{ orderStatusMap[item.orderStatus] }}</div>
            <div class="order-item-top-right">
              <div class="order-no">单号：{{ item.id }}</div>
              <div class="order-time">{{ item.orderTime }}</div>
            </div>
          </div>
          <div class="order-goods-list">
            <div v-for="(gItem,gIndex) in item.detailList" :key="gIndex" class="goods-item">
              <img :src="showImg(gItem.mpic)" alt class="goods-img" @error="handleError">
              <div class="goods-info">
                <div class="goods-info-top">
                  <span class="goods-name">{{ gItem.commodityName }}</span>
                  <span class="goods-no">x {{ gItem.commodityNumber }}</span>
                </div>
                <div class="goods-size">{{ gItem.skuValue }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="no-more">
          <span v-if="orderListHasMore">
            加载中
            <i class="el-icon-loading" />
          </span>
          <span v-else>—— 没有更多了 ——</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import defaultImg from './../../../assets/image/h5/pic_b.png'
import listItem from './listItem'
console.log('defaultImg', defaultImg)
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
    // 订单列表
    orderList: {
      type: Array,
      default: null
    },
    // 订单列表是否加载更多
    orderListHasMore: {
      type: Boolean,
      default: true
    },
    // 订单列表是否正在加载
    orderListLoading: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      errorImg: defaultImg,
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
      loaderDisabled: false // 禁用订单滚动加载
    }
  },
  created() {
    console.log('this.boughtRecord', this.boughtRecord)
  },
  methods: {
    // tab click
    handleTabClick(type) {
      this.selectedTab = type
    },
    loadOrderData() {
      this.$emit('loadOrderData')
    },
    handleError(e) {
      console.log('eeeee', e)
      e.target.src = this.errorImg
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

  .text-overflow-2 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .chat-info-comp {
    display: flex;
    flex-direction: column;
    width: 300px;
    height: 100%;
    overflow: auto;
    border-left: 1px solid #eff0f5;

    .tab-box {
      border-bottom: 1px solid #eff0f5;
      height: 48px;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      .tab-item {
        position: relative;
        width: 50%;
        text-align: center;
        height: 48px;
        line-height: 48px;
        cursor: pointer;

        &.selected {
          // border-bottom: 2px solid #45aafa;
          &::before {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            height: 3px;
            width: 64px;
            background: #45aafa;
            display: block;
            content: "";
            border-radius: 50%;
          }
        }
      }
    }

    .tab-content {
      flex: 1;
      overflow: auto;
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
        border-bottom: 12px solid #eff0f5;

        .order-item-top {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          overflow: hidden;
          // border-bottom: 1px solid #eff0f5;
          font-size: 11px;
          // padding: 0 10px;

          .order-item-top-status {
            font-size: 16px;
            font-weight: 700;
            color: #45aafa;
          }

          .order-item-top-right {
            flex: 1;
            overflow: hidden;
            margin-left: 8px;
            text-align: right;

            .order-no {
              font-size: 14px;
              flex: 1;
              @extend .text-overflow-1;
            }

            .order-time {
              font-size: 14px;
              margin-top: 8px;
              color: #999;
            }
          }
        }

        .order-goods-list {
          .goods-item {
            display: flex;
            align-items: center;
            padding: 12px 0 0;

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
                  font-size: 14px;
                  @extend .text-overflow-1;
                  flex: 1;
                }

                .goods-no {
                  margin-left: 8px;
                  font-size: 14px;
                }
              }

              .goods-size {
                color: #666;
                font-size: 12px;
              }
            }
          }
        }
      }
      .no-more {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 14px;
        color: #999;
      }
    }
  }
  .chat-info::-webkit-scrollbar {
    display: none;
  }
</style>
