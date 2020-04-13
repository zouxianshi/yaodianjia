<template>
  <div class="list-index-model">
    <m-gift-card />
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/gift-manage/discount' })">创建折扣券</el-button>
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/gift-manage/full-reduction' })">创建满减券</el-button>
    <el-button type="primary" @click="() => $router.push({ path: '/marketings/gift-manage/gift' })">创建礼品券</el-button>

  </div>
</template>
<script>
import mGiftCard from '../_source/giftCard'
export default {
  name: 'ListIndex',
  components: {
    mGiftCard
  },
  data() {
    return {
      cardInfo: [
        {
          imgUrl: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png',
          name: ''
        }
      ]
    }
  },
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .list-index-model {

  }
</style>
