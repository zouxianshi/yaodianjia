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
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <cardItemBirth :item="birth" />
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
      <el-tab-pane label="海贝营销" name="haibeiActivity">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card-item-close ref="HB" :item="haibeiActivity[0]" @changeStatus="changeStatus" />
          </el-col>
          <el-col :xs="24" :sm="12" :md="8" :lg="6" :xl="4">
            <card-item-sign ref="sign" :item="haibeiActivity[1]" @changeStatus="changeStatusSign" />
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
import cardItemSign from '../components/card-item-sign' // 签到功能
import cardItemBirth from '../components/card-item-birth'
import reduceGift from '@/assets/image/acvity/reduce-gift.png'
import counpCenter from '@/assets/image/acvity/coup-center.png'
import limitSecKill from '@/assets/image/acvity/limit-seckill.png'
import groupGoods from '@/assets/image/acvity/group-goods.png'
import ps from '@/layout/psHandler'
import haibei from '@/assets/image/acvity/haibei.png'
import addPrice from '@/assets/image/acvity/add-price.png'
import limitPreferential from '@/assets/image/acvity/limit-preferential.png'
import spellGroup from '@/assets/image/acvity/spell-group.png'
import share from '@/assets/image/acvity/share.png'
import paymentCourtesy from '@/assets/image/marketings/pay.png'
import TurnTable from '@/assets/image/marketings/zhuan.png'
import SqueeGee from '@/assets/image/marketings/guagua.png'
import newComer from '@/assets/image/acvity/new-commer-gift.png' // 新人礼包封面
import signGift from '@/assets/image/acvity/sign-gift.png' // 签到封面
// import birthdayImg from '@/assets/image/marketings/birthdayGift.png'
// import memberVouch from '@/assets/image/marketings/memberVouch.png'
import birthdayCover from '@/assets/image/marketings/birthdayGift.png'
import memberVouchCover from '@/assets/image/marketings/memberVouch.png'
import { activityOpenOrClose, searchActivityStatus } from '@/api/exchangeMall'

import { _searchMemberSignIn, modifyStatus } from '@/api/marketing'// eslint-disable-line 

export default {
  components: { cardItem, cardItemClose, cardItemSign, cardItemBirth },
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
      birth: {
        lable: '生日礼包',
        img: birthdayCover,
        desc: '定向给会员用户生日当天发放优惠券、海贝礼包，精准营销，激励消费',
        listUrl: '',
        linkUrl: '/activity/birthday-gift'
      },
      members: [
        {
          value: 'counpCenter',
          listLabel: '领券中心列表',
          lable: '领券中心',
          img: counpCenter,
          createText: '新建优惠券',
          desc: '聚合多场优惠券领取活动，用户直达领券中心领取最劲爆的优惠券，消费购物更实惠',
          listUrl:
            '/marketings/activity-manage/coupons/list?code=TA001&name=领券中心',
          linkUrl:
            '/marketings/activity-manage/coupons/add?activityTemplateCode=TA001&activityTemplateName=领券中心'
        },
        {
          value: 'paymentCourtesy',
          lable: '支付有礼',
          listLabel: '支付有礼列表',
          img: paymentCourtesy,
          desc: '支付下单，满足一定条件门槛后，便可获得优惠券、海贝、抽奖活动等大礼包',
          listUrl:
            '/marketings/activity-manage/payment-gift/list?code=TC002&name=支付有礼',
          linkUrl: '/marketings/activity-manage/payment-gift/add'
        },
        {
          lable: '新人礼包',
          listLabel: '新人礼包列表',
          img: newComer,
          desc: '每个新注册微商城的用户都可以获取新人礼包一份，包含优惠券、海贝、抽奖福利等',
          listUrl:
            '/activity/newcomer-pack',
          linkUrl: '/activity/newcomer-create'
        }, {
          lable: '会员发券',
          listLabel: '会员发券记录',
          createText: '发放优惠券',
          img: memberVouchCover,
          desc: '发优惠券给到会员，可以精细化精准营销，满足会员购物需求，给到实际的优惠',
          listUrl: '/activity/member-voucher-list',
          linkUrl: '/activity/member-voucher'
        }
      ], // 会员营销
      goodsActivity: [
        {
          value: 'reduceGift',
          name: 'ReduceGift',
          lable: '满减满赠',
          listLabel: '满减满赠列表',
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
          listLabel: '加价购列表',
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
          listLabel: '限时特惠列表',
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
          listLabel: '拼团列表',
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
          listLabel: '限时秒杀列表',
          name: 'LimitEdit',
          img: limitSecKill,
          listUrl: '/marketing/activity/list/12',
          linkUrl: '/marketing/activity/limit-edit?l_type=12',
          desc:
            '单品秒杀强调高时效性的特价刺激，可设置独立库存，设置固定周期的限时活动，可提高顾客粘性。'
        },
        {
          value: 'constituteGoods',
          lable: '组合商品',
          listLabel: '组合商品列表',
          name: 'constituteGoods',
          img: groupGoods,
          pass: ps.showGroupGoods(), // 是否有权限
          listUrl: '/marketing/activity/constitute-goods',
          linkUrl: '/marketing/activity/constitute-goods/edit',
          desc:
            '组合商品可打包多件商品一起售卖，可以提供商品销售量，也可给到客户一定优惠.....'
        }
      ], // 商品促销
      gamesFun: [
        {
          value: 'Squeegee',
          name: 'SqueeGee',
          listLabel: '刮刮乐列表',
          desc: '刮刮刮，商户可以建立多场刮刮乐活动，用户满足一定条件门槛后便可参与刮奖活动，简单又好玩',
          listLabel: '刮刮乐列表',
          img: SqueeGee,
          listUrl: '/marketings/activity-manage/turntable/guaList?code=TA004&name=刮刮乐',
          linkUrl: '/marketings/activity-manage/turntable/add?code=TA004'
        },
        {
          value: 'turntable',
          name: 'TurnTable',
          lable: '大转盘',
          listLabel: '大转盘列表',
          desc:
            '转转转，商户可以建立多场大转盘活动，用户满足一定条件门槛后便可参与抽奖活动，奖品丰富新颖',
          img: TurnTable,
          listUrl: '/marketings/activity-manage/turntable/list?code=TA003&name=大转盘',
          linkUrl: '/marketings/activity-manage/turntable/add?code=TA003'
        }
      ],
      haibeiActivity: [
        {
          createText: '添加商品',
          name: 'ReduceGift',
          lable: '商品',
          desc: '用户在商城积累的海贝，可以在兑换商城兑换商品和购买商品',
          titles: '兑换商城',
          isclose: true,
          img: haibei,
          listUrl: '/activity/exchangeMallList',
          linkUrl: '/activity/exchangeMallAdd'
        },
        {
          createText: '',
          name: 'signGift',
          lable: '签到设置',
          desc: '设置不同模式签到奖励，激励用户每天签到，获取海贝，增加用户粘性，鼓励海贝兑换商品，增进销售。',
          titles: '签到奖励',
          isclose: true,
          img: signGift,
          listUrl: '/activity/sign-create',
          linkUrl: ''
        }
      ], // 积分营销
      activity: [], // 精彩活动
      singIsSet: false
    }
  },
  created() {
    this.activeName = this.$route.query.type || 'goodsActivity'
    searchActivityStatus({ pmtType: 20 }).then(res => { // 海贝营销开启还是关闭状态
      if (res.code === '10000') {
        this.haibeiActivity[0].isclose = res.data
      }
    })
    _searchMemberSignIn().then(res => { // 海贝签到开启还是关闭状态
      if (res.code === '10000' && !!res.data) {
        this.haibeiActivity[1].isclose = !!res.data.isValid
        this.singIsSet = true
      } else {
        this.haibeiActivity[1].isclose = false
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
        _self.$refs.HB.closeStatus(status)
      })
    },
    changeStatusSign(status) {
      if (!this.singIsSet) {
        this.$message.error('请完成签到设置后再操作')
        this.$refs.sign.closeStatus(status)
      } else {
        const params = {
          isValid: status ? 1 : 0,
          merCode: this.$store.state.user.merCode
        }
        modifyStatus(params).then(res => {
          if (res.code === '10000') {
            this.$message({
              type: 'success',
              message: '操作成功'
            })
          }
        })
      }
    }
  }
}
</script>

<style lang="scss">
  .app-container {
    .activity {
      padding: 0;
      .el-tabs__header {
        background: #fff;
      }
      .el-tabs__nav-wrap::after {
        height: 0;
      }
    }
  }

</style>
