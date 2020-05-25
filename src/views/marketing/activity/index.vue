<template>
  <div class="app-container activity">
    <el-tabs v-model="activeName" @tab-click="handleClick">
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
      <el-tab-pane label="会员营销" name="members">
        <el-row :gutter="20">
          <el-col v-for="o in members" :key="o.value" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <el-tab-pane label="趣味游戏" name="gamesfun">
        <el-row :gutter="20">
          <el-col
            v-for="o in gamesFun"
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
      <!-- <el-tab-pane label="精彩活动" :disabled="true" name="activity">精彩活动</el-tab-pane> -->
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
import paymentCourtesy from '@/assets/image/marketings/pay.png'
// import payImage from '@/assets/image/marketings/pay.png'
// import getcoupon from '@/assets/image/marketings/getcoupon.png'
import TurnTable from '@/assets/image/marketings/zhuan.png'
import SqueeGee from '@/assets/image/marketings/guagua.png'
export default {
  components: { cardItem },
  /**
   * value => key 这里建议跟后端的key保持一致
   * lable: '活动标题
   * img -> 活动图片
   * desc -> 相关描述
   * linkUrl -> 跳转详情连接
   * extra -> 额为的事件
   */
  data() {
    return {
      activeName: 'goodsActivity',
      members: [
        {
          value: 'counpCenter',
          lable: '领券中心',
          img: counpCenter,
          createText: '新建优惠券',
          desc: '',
          listUrl:
            '/marketings/activity-manage/coupons/list?code=TA001&name=领券中心',
          linkUrl:
            '/marketings/activity-manage/coupons/add?activityTemplateCode=TA001&activityTemplateName=领券中心'
        },
        {
          value: 'paymentCourtesy',
          lable: '支付有礼',
          img: paymentCourtesy,
          desc: '',
          listUrl:
            '/marketings/activity-manage/payment-gift/list?code=TC002&name=支付有礼',
          linkUrl: '/marketings/activity-manage/payment-gift/add'
        }
      ], // 会员营销
      goodsActivity: [
        {
          value: 'reduceGift',
          name: 'ReduceGift',
          lable: '满减满赠',
          desc:
            '会员消费达到某一条件后可以享受减价或折扣优惠，也可以通过添加赠送赠品的促销手段来提高客单价，提高销售额。',
          img: reduceGift,
          listUrl: '/marketing/activity/list/14',
          linkUrl: '/marketing/activity/reduce-gift-list-edit',
          extra: share
        },
        {
          value: 'addPrice',
          name: 'AddPriceCreate',
          lable: '加价购',
          img: addPrice,
          listUrl: '/marketing/activity/list/15',
          linkUrl: '/marketing/activity/aprice-edit',
          desc:
            '会员消费满足一定的金额后，可以通过添加低价换购商品的促销手段，来提升客单价，激活积压库存。'
        },
        {
          value: 'limitPreferential',
          name: 'LimitEdit',
          lable: '限时特惠',
          img: limitPreferential,
          listUrl: '/marketing/activity/list/11',
          linkUrl: '/marketing/activity/limit-edit?l_type=11',
          desc:
            '商品直接减价或打折的促销方法，设置商品在某个时间段有优惠，到期恢复原价，刺激会员消费。'
        },
        {
          value: 'spellGroup',
          name: 'AssembleEdit',
          lable: '拼团',
          img: spellGroup,
          listUrl: '/marketing/activity/list/13',
          linkUrl: '/marketing/activity/assemble-edit',
          desc:
            '为商家做拉新引流计划提供高效的途径，也是最流行的社群运营活动之一。用户可通过拼团活动购买到划算的商品，同时分享给好友参团，从而实现用户裂变增长。',
          extra: share
        },
        {
          value: 'limitSecKill',
          lable: '限时秒杀',
          name: 'LimitEdit',
          img: limitSecKill,
          listUrl: '/marketing/activity/list/12',
          linkUrl: '/marketing/activity/limit-edit?l_type=12',
          desc:
            '单品秒杀强调高时效性的特价刺激，可设置独立库存，设置固定周期的限时活动，可提高顾客粘性。'
        }
      ], // 商品促销
      gamesFun: [
        {
          value: 'Squeegee',
          name: 'SqueeGee',
          lable: '刮刮乐',
          desc:
            '',
          img: SqueeGee,
          listUrl: '/marketings/activity-manage/turntable/guaList?code=TA004&name=刮刮乐',
          linkUrl: '/marketings/activity-manage/turntable/add?code=TA004'
        },
        {
          value: 'turntable',
          name: 'TurnTable',
          lable: '大转盘',
          desc:
            '',
          img: TurnTable,
          listUrl: '/marketings/activity-manage/turntable/list?code=TA003&name=大转盘',
          linkUrl: '/marketings/activity-manage/turntable/add?code=TA003'
        }
      ],
      activity: [] // 精彩活动
    }
  },
  created() {
    this.activeName = this.$route.query.type || 'goodsActivity'
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
