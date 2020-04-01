/* eslint-disable */

import _ from 'lodash'
import store from '@/store'
const ps = () => new InnerCtor()

class InnerCtor {
  constructor() {
    this.p = {}
  }
  // 客服消息按钮权限
  showMsgBtn() {
    return this.get('staff.online-ask')
  }
  // 订单立即发货按钮权限
  showSendGoodsBtn() {
    //立即发货鉴权
    return this.get('order.order-all.immediate-delivery')
  }
  navList() {
    return [
      {
        name: '首页',
        icon: 'iconshouye2',
        path: '/home',
        disabled: true,
        children: []
      },
      {
        name: '会员管理',
        icon: 'icongoods',
        path: '',
        disabled: true,
        children: [
          {
            name: '会员中心',
            path: '/member/member-center',
            disabled: true
          },
          {
            name: '会员注册设置',
            path: '/member/register-setting',
            disabled: true
          },
        ]
      },
      {
        name: '渠道管理',
        icon: 'icongoods',
        path: '',
        disabled: true,
        children: [
          {
            name: '微信公众号',
            path: '/channel/wx-official-account',
            disabled: true
          },
        ]
      },
      {
        name: '商品中心',
        icon: 'icongoods',
        path: '',
        disabled: this.get('commodity'),
        children: [
          {
            name: '商品库',
            path: '/goods-manage/depot',
            disabled: this.get('commodity.commodity-lib')
          },
          {
            name: `自建新品`,
            path: '/goods-manage/apply',
            disabled: this.get('commodity.commodity-self')
          },
          {
            name: '新品申请记录',
            path: '/goods-manage/apply-record',
            disabled: this.get('commodity.commodity-new-record')
          },
          {
            name: '新品审核',
            path: '/goods-manage/examine',
            disabled: this.get('commodity.commodity-check')
          },
          {
            name: `自定义分组`,
            path: '/goods-manage/group',
            disabled: this.get('commodity.commodity-group')
          },
          {
            name: `门店商品管理`,
            path: '/goods-manage/store-goods',
            disabled: this.get('commodity.commodity-store')
          },
          {
            name: `组合商品`,
            path: '/goods-manage/constitute-goods',
            disabled: this.get('commodity.commodity-combine')
          }
        ]
      },
      {
        name: '商城装修',
        icon: 'icongoods',
        path: '',
        disabled: this.get('yaodianjia-wxmall'),
        children: [
          {
            name: '主页设置',
            path: '/wxmall/home-set',
            disabled: this.get('yaodianjia-wxmall.yaodianjia-wxmall-home-set')
          },
          {
            name: '首页轮播图',
            path: '/wxmall/banner',
            disabled: this.get('yaodianjia-wxmall.yaodianjia-wxmall-banner')
          },
          {
            name: '首页公告栏',
            path: '/wxmall/notice',
            disabled: this.get('yaodianjia-wxmall.yaodianjia-wxmall-notice')
          },
          {
            name: '分类广告位',
            path: '/wxmall/ad-position',
            disabled: this.get(
              'yaodianjia-wxmall.yaodianjia-wxmall-ad-position'
            )
          }
        ]
      },
      {
        name: '订单中心',
        icon: 'icongoods',
        path: '/orders-manage',
        disabled: this.get('order'),
        children: [
          {
            name: `所有订单`,
            path: '/orders-manage/list',
            disabled: this.get('order.order-all')
          },
          // {
          //   name: `订单详情`,
          //   path: '/orders-manage/all-orders/details',
          //   disabled: this.get('order.order-all'),
          // },
          {
            name: `订单设置`,
            path: '/orders-manage/settings',
            disabled: this.get('order.order-set')
          }
        ]
      },

      {
        name: '营销中心',
        icon: 'icongoods',
        path: '',
        disabled: this.get('marketing'),
        children: [
          {
            name: '新建活动',
            path: '/marketing/activity/create',
            disabled: this.get('marketing.marketing-create')
          },
          {
            name: '活动管理',
            path: '/marketing/activity',
            disabled: this.get('marketing.marketing-manager')
          }
        ]
      },
      {
        name: '客服中心',
        icon: 'icongoods',
        path: '/customerService',
        disabled: this.get('staff'),
        children: [
          {
            name: '客服列表',
            path: '/customerService/list',
            disabled: this.get('staff.staff-list')
          },
          {
            name: '快捷消息',
            path: '/customerService/msgSettings',
            disabled: this.get('staff.quick-message-set')
          },
          {
            name: '在线咨询',
            path: '/customerService/consultation',
            disabled: this.get('staff.online-ask')
          },
          {
            name: '消息记录',
            path: '/customerService/historyMsg',
            disabled: this.get('staff.message-record')
          }
        ]
      },
      {
        name: '设置中心',
        icon: 'icongoods',
        path: '',
        disabled: this.get('set'),
        children: [
          /*{
            name: '所有门店',
            path: '/storeSetting/index',
            disabled: this.get('merchant-org.merchant-org-org'),
          },*/
          {
            name: '连锁设置',
            path: '/storeSetting/chainSetting',
            disabled: this.get('set.merchant-set'),
            children: []
          },
          {
            name: '上线门店',
            path: '/storeSetting/setting',
            disabled: this.get('set.store-up')
          },
          {
            name: '门店配送',
            path: '/storeSetting/deliverySetting',
            disabled: this.get('set.store-deliver')
          },
          {
            name: '内部链接',
            path: '/storeSetting/internalLink',
            disabled: this.get('set.inner-link'),
            children: []
          }
        ]
      },

      {
        name: '预约商品',
        icon: 'icongoods',
        path: '',
        // disabled: this.get("distribution"),
        disabled: this.get('appointment'),
        children: [
          /*{
            name: '所有门店',
            path: '/storeSetting/index',
            disabled: this.get('merchant-org.merchant-org-org'),
          },*/
          // {
          //   name: "疫情商品管理",
          //   path: "/distribution",
          //   disabled: this.get("set.merchant-set"),
          //   children: []
          // },

          {
            name: '预约商品管理',
            path: '/distribution/reservation-product',
            disabled: this.get('appointment.epidemic'),
            children: []
          },
          {
            name: '门店需求商品统计',
            path: '/distribution/store-statistics',
            disabled: this.get('appointment.need-statistic'),
            children: []
          },
          {
            name: '预约单管理',
            path: '/distribution/order-manage',
            disabled: this.get('appointment.order'),
            children: [
              {
                name: '预约单详情',
                path: '/distribution/order-details',
                disabled: this.get('appointment.order')
              }
            ]
          },

          // {
          //   name: "核销管理",
          //   path: "/distribution/write-off",
          //   disabled: true
          // },
          {
            name: '小程序设置',
            path: '/distribution/weapp-setting',
            disabled: this.get('appointment.mini'),
            children: []
          },

          {
            name: '提货点管理',
            path: '/distribution/pickup-point',
            disabled: this.get('appointment.pick-set'),
            children: []
          }
          // {
          //   name: "核销管理",
          //   path: "/distribution/write-off",
          //   disabled: true
          // },
          // {
          //   name: "小程序设置",
          //   path: "/distribution/weapp-setting",
          //   disabled: true,
          //   children: []
          // }
        ]
      }
    ]
  }
  handlerPs() {
    let p = {}
    console.warn('resList _____________________ : ', store.state.user.resList)
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

  get(str) {
    let p = this.p
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

export default ps()
