<template>
  <div class="list-index-model app-container">
    <div style="position: absolute;right:20px;top:25px;z-index:300">
      <el-input v-model="input1" style="width:200px" placeholder="请输入内容" prefix-icon="el-icon-search" />
    </div>
    <!-- <el-button type="primary" @click="() => $router.push({ path: '/marketings/activity-manage/coupons/list' })">领劵中心列表</el-button>
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/activity-manage/coupons/add' })">添加优惠券</el-button>-->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="会员营销" name="first">
        <div class="header-nav">
          <div class="item-box">
            <m-gift-card v-for="(item, index) in cardInfo" :key="index" :info="item" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="商品促销" name="second">
        <div class="header-nav">
          <div class="item-box">
            <m-gift-card v-for="(item, index) in cardInfo" :key="index" :info="item" />
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="精彩活动" name="third">
        <div class="header-nav">
          <div class="item-box">
            <m-gift-card v-for="(item, index) in cardInfo" :key="index" :info="item" />
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import mGiftCard from '../../_source/giftCard'
export default {
  name: 'ListIndex',
  components: {
    mGiftCard
  },
  props: {},
  data() {
    return {
      input1: '',
      activeName: 'first',
      cardInfo: [
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '折扣券',
          url: '/marketings/activity-manage/coupons/list'
        },
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '满减券',
          url: '/marketings/activity-manage/coupons/list'
        },
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '礼品券',
          url: '/marketings/activity-manage/coupons/list'
        },
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '优惠码',
          url: '/marketings/activity-manage/coupons/list'
        },
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '折扣券',
          url: '/marketings/activity-manage/coupons/list'
        },
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '满减券',
          url: '/marketings/activity-manage/coupons/list'
        },
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '礼品券',
          url: '/marketings/activity-manage/coupons/list'
        },
        {
          imgUrl:
            'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '优惠码',
          url: '/marketings/activity-manage/coupons/list'
        }
      ]
    }
  },
  computed: {},
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleClick() {}
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.list-index-model {
  position: relative;
  padding: 20 0px;
  .header-nav {
    .item-box {
      display: flex;
      // width: 900px;
      // justify-content: space-between;
      padding: 20px 0;
      flex-wrap: wrap;
      .gift-card-modal {
        flex: 0 0 150px;
        text-align: center;
        .el-card__body {
          img {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>
