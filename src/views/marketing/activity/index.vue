<template>
  <div class="app-container activity">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员营销" name="members">
        <el-row :gutter="20">
          <el-col v-for="o in members" :key="o.value" :xs="12" :sm="8" :md="6">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品促销" name="goodsActivity">
        <el-row :gutter="20">
          <el-col v-for="o in goodsActivity" :key="o.value" :xs="12" :sm="8" :md="6">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="精彩活动" name="activity">精彩活动</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cardItem from './components/card-item'
import reduceGift from '@/assets/image/acvity/reduce-gift.png'
import counpCenter from '@/assets/image/acvity/coup-center.png'
import limitSecKill from '@/assets/image/acvity/limit-seckill.png'
export default {
  components: { cardItem },
  data() {
    return {
      activeName: 'members',
      members: [
        {
          value: 'counpCenter',
          lable: '领券中心',
          img: counpCenter,
          desc: '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。'
        }
      ], // 会员营销
      goodsActivity: [
        {
          value: 'reduceGift',
          lable: '满减满赠',
          desc: '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。',
          img: reduceGift
        }, {
          value: 'addPrice',
          lable: '加价购',
          img: counpCenter,
          desc: '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。'
        }, {
          value: 'limitPreferential',
          lable: '限时特惠',
          img: limitSecKill,
          desc: '限时折扣则更侧重于优惠折扣。设置固定周期的限时活动，可提高顾客粘性。'
        }, {
          value: 'limitSecKill',
          lable: '限时秒杀',
          img: limitSecKill,
          desc: '限时秒杀更强调高时效性的低价刺激，可设置独立库存，限时折扣则更侧重于优惠折扣。'
        }
      ], // 商品促销
      activity: [] // 精彩活动
    }
  },
  methods: {
    handleClick(val) {
      console.log('点击tab切换', val)
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
