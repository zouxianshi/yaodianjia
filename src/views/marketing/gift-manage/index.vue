<template>
  <div class="app-container activity">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="赠品" name="complimentary">
        <el-row :gutter="20">
          <el-col v-for="o in complimentary" :key="o.value" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="优惠券" name="coupons">
        <el-row :gutter="20">
          <el-col v-for="o in coupons" :key="o.value" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import discountCoupons from '@/assets/image/acvity/discount-coupons.png'
// import fullCutCoupons from '@/assets/image/acvity/full-cut-coupons.png'
// import giftCertificate from '@/assets/image/acvity/gift-certificate.png'
import complimentary from '@/assets/image/acvity/complimentary.png'
import cardItem from '../components/card-item'
import discountImg from '@/assets/image/marketings/discount.png'
import fullReductionImg from '@/assets/image/marketings/fullReduction.png'
import giftImg from '@/assets/image/marketings/gift.png'
import zengpinImg from '@/assets/image/marketings/zengpin.png'
export default {
  components: { cardItem },
  data() {
    return {
      activeName: 'complimentary',
      // 结构解释
      // 约定大于配置
      // linkUrl: '/marketing/gifts/complimentary',
      // 在cardItem列表实际使用列表路径为/marketing/gifts/complimentary
      // 创建为/marketing/gifts/complimentary-create
      coupons: [
        {
          value: 'discount-coupons',
          lable: '折扣券',
          img: discountImg,
          desc:
            '',
          listUrl: '/marketings/gift-manage/list?id=1',
          linkUrl: '/marketings/gift-manage/discount'
        },
        {
          value: 'full-cut-coupons',
          lable: '满减券',
          img: fullReductionImg,
          desc:
            '',
          listUrl: '/marketings/gift-manage/list?id=2',
          linkUrl: '/marketings/gift-manage/full-reduction'
        },
        {
          value: 'gift-certificate',
          lable: '礼品券',
          img: giftImg,
          desc:
            '',
          listUrl: '/marketings/gift-manage/list?id=3',
          linkUrl: '/marketings/gift-manage/gift'
        },
        {
          value: 'discount-code',
          lable: '优惠码',
          img: zengpinImg,
          desc:
            '',
          listUrl: '',
          linkUrl: ''
        }
      ],
      complimentary: [
        {
          value: 'complimentary',
          lable: '赠品',
          name: 'GiftsComplimentaryCreate',
          img: complimentary,
          createText: '新增赠品',
          listUrl: '/marketing/gifts/complimentary',
          linkUrl: '/marketing/gifts/complimentary-edit',
          desc:
            '设置赠品，可达到回馈客户，提升客单价，清空滞销商品库存的作用。'
        }
      ]
    }
  },
  created() {
    this.activeName = this.$route.query.type || 'complimentary'
  },
  methods: {
    handleClick(val) {
      console.log('点击tab切换', val)
      this.$router.replace(`/marketing/gifts?type=${val.name}`)
    }
  }
}
</script>
<style lang="scss">
.app-container.activity {
  background: #f7f7f7;
  padding: 0;
  .el-tabs__header {
    background: #fff;
    padding: 0 20px;
    padding-top: 40px;
  }
  .el-tabs__nav-wrap::after {
    height: 0;
  }
  .el-tabs__content {
    padding: 0 20px;
  }
}
</style>
