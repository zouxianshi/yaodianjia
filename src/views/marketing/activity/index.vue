<template>
  <div class="app-container activity">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!-- <el-tab-pane label="会员营销" name="members">
        <el-row :gutter="20">
          <el-col v-for="o in members" :key="o.value" :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card-item :item="o" />
          </el-col>
        </el-row>
      </el-tab-pane>-->
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
      <el-tab-pane label="海贝营销" name="haibeiActivity">
        <el-row :gutter="20">
          <el-col
            v-for="(o, index) in haibeiActivity"
            :key="index"
            :xs="24"
            :sm="12"
            :md="8"
            :lg="6"
            :xl="4"
          >
            <card-item-close ref="HB" :item="o" @changeStatus="changeStatus" />
          </el-col>
        </el-row>
      </el-tab-pane>
      <!-- <el-tab-pane label="精彩活动" :disabled="true" name="activity">精彩活动</el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script>
import cardItem from '../components/card-item'
import cardItemClose from '../components/card-item-close'
import reduceGift from '@/assets/image/acvity/reduce-gift.png'
import counpCenter from '@/assets/image/acvity/coup-center.png'
import limitSecKill from '@/assets/image/acvity/limit-seckill.png'
import haibei from '@/assets/image/acvity/haibei.png'
import addPrice from '@/assets/image/acvity/add-price.png'
import limitPreferential from '@/assets/image/acvity/limit-preferential.png'
import spellGroup from '@/assets/image/acvity/spell-group.png'
import share from '@/assets/image/acvity/share.png'
import { activityOpenOrClose, searchActivityStatus } from '@/api/exchangeMall'

export default {
  components: { cardItem, cardItemClose },
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
          desc:
            '满减送促销是在一定范围内的商品中选择某几个商品，当这些商品价格总值达到某一条件后可以享受一定的优惠，或由商品赠送某些赠品的促销手段。'
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
      haibeiActivity: [
        {
          createText: '添加商品',
          name: 'ReduceGift',
          lable: '商品',
          desc: '',
          titles: '兑换商城',
          isclose: true,
          img: haibei,
          listUrl: '/activity/exchangeMallList',
          linkUrl: '/activity/exchangeMallAdd'
        }
      ], // 积分营销
      activity: [] // 精彩活动
    }
  },
  created() {
    this.activeName = this.$route.query.type || 'goodsActivity'
    searchActivityStatus({ pmtType: 20 }).then(res => {
      if (res.code === '10000') {
        this.haibeiActivity[0].isclose = res.data
      }
    })
  },
  methods: {
    handleClick(val) {
      this.$router.replace(`/marketing/activity?type=${val.name}`)
    },
    changeStatus(status) {
      const params = {
        'pmtType': 20,
        'status': status ? 1 : 0
      }
      var _self = this
      activityOpenOrClose(params).then(res => {
        if (res.code === '10000') {
          this.$message({
            message: res.msg,
            type: 'success'
          })
        } else {
          _self.$refs.HB.closeStatus(status)
        }
      }).catch(() => {
        _self.$refs.HB[0].closeStatus(status)
      })
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
