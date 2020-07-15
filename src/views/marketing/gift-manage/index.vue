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
// import zengpinImg from '@/assets/image/marketings/zengpin.png'
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
          listLabel: '折扣券列表',
          img: discountImg,
          desc:
            '建立直接打折的优惠券，直观优惠',
          listUrl: '/marketings/gift-manage/list?id=1',
          linkUrl: '/marketings/gift-manage/discount',
          createText: '新建折扣券'
        },
        {
          value: 'full-cut-coupons',
          lable: '满减券',
          listLabel: '满减券列表',
          img: fullReductionImg,
          desc:
            '建立满多少直接减优惠的券，冲击力强',
          listUrl: '/marketings/gift-manage/list?id=2',
          linkUrl: '/marketings/gift-manage/full-reduction',
          createText: '新建满减券'
        },
        {
          value: 'gift-certificate',
          lable: '礼品券',
          listLabel: '礼品券列表',
          img: giftImg,
          desc:
            '建立礼品券，给用户直接发放礼品',
          listUrl: '/marketings/gift-manage/list?id=3',
          linkUrl: '/marketings/gift-manage/gift',
          createText: '新建礼品券'
        }
      ],
      complimentary: [
        {
          value: 'complimentary',
          lable: '赠品',
          listLabel: '赠品列表',
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
  watch: {
    '$route': {
      deep: true,
      immediate: true,
      handler(newRoute) {
        this.activeName = newRoute.query.type // 这里就是新的query
      }
    }
  },
  created() {
    this.activeName = this.$route.query.type || 'complimentary'
  },
  methods: {
    handleClick(val) {
      this.$router.replace(`/marketing/gifts?type=${val.name}`)
    }
  }
}
</script>
<style lang="scss">
  .app-container {
    .activity {
      padding: 0;
      .el-tabs__nav-wrap::after {
        height: 0;
      }
    }
  }

</style>
