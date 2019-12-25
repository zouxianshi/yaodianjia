/* eslint-disable */

import _ from 'lodash'
import store from '@/store'
const ps = () => new InnerCtor()

class InnerCtor {
  constructor () {
    this.p = {}
  }
  // 客服消息按钮权限
  showMsgBtn() {
    return this.get('staff.online-ask')
  }
   // 订单立即发货按钮权限
  showSendGoodsBtn() { //立即发货鉴权
    return this.get('order.order-all.immediate-delivery')
    return this.get('order')
  }
  navList (){
    return [
      {
        name: '首页',
        icon: 'iconshouye2',
        path: '/home',
        disabled: true,
        children: []
      },
      {
        name: '订单管理',
        icon: 'icongoods',
        path: '',
        disabled: this.get('order'),
        children: [
          {
            name: `所有订单`,
            path: '/orders-manage/all-orders/list',
            disabled: true
          },
          {
            name: `订单设置`,
            path: '/orders-manage/settings',
            disabled: true
          }
        ]
      },{
        name: '商品管理',
        icon: 'icongoods',
        path: '',
        disabled: this.get('commodity'),
        children: [
          {
            name: '商品库',
            path: '/goods-manage/depot',
            disabled: this.get('commodity.commodity-lib'),
          },
          {
            name: `自建新品`,
            path: '/goods-manage/apply',
            disabled: this.get('commodity.commodity-self')
          },{
            name:'新品审核',
            path: '/goods-manage/examine',
            disabled: this.get('commodity.commodity-check')
          },
          {
            name:'新品申请记录',
            path: '/goods-manage/apply-record',
            disabled: this.get('commodity.commodity-new-record')
          }
          ,{
            name: `自定义分组`,
            path: '/goods-manage/group',
            disabled: this.get('commodity.commodity-group')
          },{
            name: `门店商品管理`,
            path: '/goods-manage/store-goods',
            disabled: this.get('commodity.commodity-store')
          },{
            name: `组合商品`,
            path: '/goods-manage/constitute-goods',
            disabled: this.get('commodity.commodity-combine')
          }
        ]
      },
      {
        name: '内容管理',
        icon: 'icongoods',
        path: '',
        disabled: this.get('yaodianjia-wxmall'),
        children: [
          {
            name: '首页轮播图',
            path: '/wxmall/banner',
            disabled: this.get('yaodianjia-wxmall.yaodianjia-wxmall-banner'),
          },
          {
            name: '公告',
            path: '/wxmall/notice',
            disabled: this.get('yaodianjia-wxmall.yaodianjia-wxmall-notice')
          },{
            name:'分类广告位',
            path: '/wxmall/ad-position',
            disabled: this.get('yaodianjia-wxmall.yaodianjia-wxmall-ad-position')
          },{
            name:'主页设置',
            path: '/wxmall/home-set',
            disabled: this.get('yaodianjia-wxmall.yaodianjia-wxmall-home-set')
          }
        ]
      },
      {
        name: '连锁设置',
        icon: 'icongoods',
        path: '/chainSetting',
        disabled: this.get('merchant'),
        children: []
      },
      {
        name: '门店设置',
        icon: 'icongoods',
        path: '',
        disabled: this.get('store'),
        children: [
          /*{
            name: '所有门店',
            path: '/storeSetting/index',
            disabled: this.get('merchant-org.merchant-org-org'),
          },*/
          {
            name: '上线门店设置',
            path: '/storeSetting/setting',
            disabled: this.get('store.store-up')
          },
          {
            name: '门店配送',
            path: '/storeSetting/deliverySetting',
            disabled: this.get('store.store-deliver')
          }
        ]
      },
      {
        name: '内部链接',
        icon: 'icongoods',
        path: '/internalLink',
        disabled: this.get('link'),
        children: []
      },
      {
        name: '营销活动',
        icon: 'icongoods',
        path: '/marketing/activity',
        disabled: this.get('marketing'),
        children: [
          {
            name: '新建活动',
            path: '/marketing/activity/create',
            disabled: this.get('marketing.marketing-create')
            // children: [
            //   {
            //     name: '新建限时优惠',
            //     path: '/marketing/activity/limit-edit',
            //     disabled: this.get('marketing.marketing-create'),
            //   }
            // ]
          },
          {
            name: '活动管理',
            path: '/marketing/activity',
            disabled: this.get('marketing.marketing-manager'),
          }
        ]
      },
      {
        name: '客服管理',
        icon: 'icongoods',
        path: '/customerService',
        disabled: this.get('staff'),
        children: [
          {
            name: '客服列表',
            path: '/customerService/list',
            disabled: this.get('staff.staff-list'),
          },
          {
            name: '快捷消息设置',
            path: '/customerService/msgSettings',
            disabled: this.get('staff.quick-message-set')
          },
          {
            name: '客服咨询',
            path: '/customerService/consultation',
            disabled: this.get('staff.online-ask')
          },
          {
            name: '历史消息',
            path: '/customerService/historyMsg',
            disabled: this.get('staff.message-record')
          },
        ]
      }
    ]
  }
  handlerPs() {
    let p = {}
    _.map(store.state.user.resList, v => {
      _.map(v.children, v1 => {
        p[v.rePath] = _.assign(p[v.rePath], {
          [v1.rePath]: _.map(v1.children, v2 => v2.rePath)
        })
      })
    })
    this.p = p
    return p
  }


  get (str) {
    let p = this.p;
    if (_.isEmpty(p)) {
      p = this.handlerPs()
    }
    const strArr = _.split(str, '.')
    const leven1Code = strArr[0]
    const leven2Code = strArr[1]
    const leven3Code = strArr[2] || ''
    switch (strArr.length) {
      case 1:
        return _.has(p, leven1Code)
      case 2:
        return _.has(p[leven1Code], leven2Code)
      default:
        return p[leven1Code][leven2Code].includes(leven3Code)
    }
  }
}

console.log('22222222222222222222',ps())

export default ps()
