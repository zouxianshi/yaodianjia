<template>
  <div class="list-index-model">
    <div class="header-nav">
      <div class="item-box">
        <m-gift-card v-for="(item, index) in cardInfo" :key="index" :info="item" />
      </div>
    </div>
    <div class="list-box">
      <m-list />
    </div>
  </div>
</template>
<script>
import mGiftCard from '../../_source/giftCard'
import mList from './_source/list'
export default {
  name: 'ListIndex',
  components: {
    mGiftCard, mList
  },
  data() {
    return {
      cardInfo: [
        {
          imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '折扣券',
          url: '/marketings/gift-manage/discount'
        },
        {
          imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '满减券',
          url: '/marketings/gift-manage/full-reduction'
        },
        {
          imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '礼品券',
          url: '/marketings/gift-manage/gift'
        },
        {
          imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: '优惠码',
          url: ''
        }
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
        display: flex;width: 500px; justify-content: space-between;padding: 10px 0;cursor:pointer;
        .gift-card-modal{
          flex: 0 0 120px;text-align:center;
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
