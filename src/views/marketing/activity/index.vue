<template>
  <div class="app-container activity">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="会员营销" name="members">
        <el-row :gutter="20">
          <el-col v-for="o in members" :key="o.value" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="商品促销" name="goodsActivity">
        <el-row :gutter="20">
          <el-col
            v-for="o in goodsActivity"
            :key="o.value"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="精彩活动" :disabled="true" name="activity">精彩活动</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import cardItem from '../components/card-item'
import reduceGift from '@/assets/image/acvity/reduce-gift.png'
import counpCenter from '@/assets/image/acvity/coup-center.png'
import limitSecKill from '@/assets/image/acvity/limit-seckill.png'
import addPrice from '@/assets/image/acvity/add-price.png'
import limitPreferential from '@/assets/image/acvity/limit-preferential.png'
import spellGroup from '@/assets/image/acvity/spell-group.png'
import share from '@/assets/image/acvity/share.png'

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
          desc:
            '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。'
        }
      ], // 会员营销
      goodsActivity: [
        {
          value: 'reduceGift',
          lable: '满减满赠',
          desc:
            '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。',
          img: reduceGift,
          linkUrl: '/marketing/activity/reduce-gift-list',
          extra: share
        },
        {
          value: 'addPrice',
          lable: '加价购',
          img: addPrice,
          linkUrl: '/marketing/activity/aprice',
          desc:
            '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。'
        },
        {
          value: 'limitPreferential',
          lable: '限时特惠',
          img: limitPreferential,
          linkUrl: '/marketing/activity/limit',
          desc:
            '限时折扣则更侧重于优惠折扣。设置固定周期的限时活动，可提高顾客粘性。'
        },
        {
          value: 'spellGroup',
          lable: '拼团',
          img: spellGroup,
          linkUrl: '/marketing/activity/assemble',
          desc:
            '拼团活动可以为商家做拉新引流计划提供高效的途径，同事拼团活动也是最流行的社群运营活动之一。用户可通过拼团活动购买到划算的商品，同时分享给好友参团，从而实现用户裂变增长'
        },
        {
          value: 'limitSecKill',
          lable: '限时秒杀',
          img: limitSecKill,
          linkUrl: '/marketing/activity/limit-sec',
          desc:
            '限时秒杀更强调高时效性的低价刺激，可设置独立库存，限时折扣则更侧重于优惠折扣。'
        }
      ], // 商品促销
      activity: [] // 精彩活动
    }
  },
  created() {
    this.activeName = this.$route.query.type || 'members'
  },
  methods: {
    handleClick(val) {
      console.log('点击tab切换', val)
      this.$router.replace(`/marketing/activity?type=${val.name}`)
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
