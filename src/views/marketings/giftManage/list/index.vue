<template>
  <div class="list-index-model app-container">
    <div class="header-nav">
      <div class="item-box">
        <!-- <m-gift-card v-for="(item, index) in cardInfo" :key="index" :info="item" /> -->
      </div>
    </div>
    <div class="list-box">
      <m-list />
    </div>
  </div>
</template>
<script>
// import mGiftCard from '../../_source/giftCard'
import mList from './_source/list'
import discountImg from '@/assets/image/marketings/discount.png'
import fullReductionImg from '@/assets/image/marketings/fullReduction.png'
import giftImg from '@/assets/image/marketings/gift.png'
// import zengpinImg from '@/assets/image/marketings/zengpin.png'
export default {
  name: 'ListIndex',
  components: {
    mList
  },
  data() {
    return {
      cardInfo: [
        {
          imgUrl: discountImg,
          activityTemplateName: '折扣券',
          url: '/marketings/gift-manage/discount'
        },
        {
          imgUrl: fullReductionImg,
          activityTemplateName: '满减券',
          url: '/marketings/gift-manage/full-reduction'
        },
        {
          imgUrl: giftImg,
          activityTemplateName: '礼品券',
          url: '/marketings/gift-manage/gift'
        }
        // ,
        // {
        //   imgUrl: zengpinImg,
        //   activityTemplateName: '优惠码',
        //   url: ''
        // }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-index-model {
    padding: 0 20px;
    .header-nav{
      .item-box{
        display: flex;width: 495px; justify-content: space-between;padding: 10px 0;cursor:pointer;
        .gift-card-modal{
          flex: 0 0 150px;
          .el-card__body{
            img{
              width: 100%;
            }
          }
        }
      }
    }
  }
</style>
