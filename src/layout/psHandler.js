/* eslint-disable */

import _ from 'lodash'
import store from '@/store'
const ps = () => new InnerCtor()

class InnerCtor {
  constructor () {
    this.p = {}
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
        name: '商品管理',
        icon: 'icongoods',
        path: '',
        disabled: this.get('merchant-org'),
        children: [
          {
            name: '商品库',
            path: '/goods-manage/depot',
            disabled: this.get('merchant-org.merchant-org-org'),
          },
          {
            name: `自建新品`,
            path: '/goods-manage/apply',
            disabled: this.get('merchant-org.merchant-org-store')
          },{
            name:'新品审核',
            path: '/goods-manage/examine',
            disabled: this.get('merchant-org.merchant-org-store')
          },{
            name: `自定义分组`,
            path: '/goods-manage/group',
            disabled: this.get('merchant-org.merchant-org-store')
          },{
            name: `门店商品管理`,
            path: '/goods-manage/store-goods',
            disabled: this.get('merchant-org.merchant-org-store')
          }
        ]
      },
      {
        name: '微商城',
        icon: 'icongoods',
        path: '',
        disabled: this.get('merchant-org'),
        children: [
          {
            name: '首页轮播图',
            path: '/wxmall/banner',
            disabled: this.get('merchant-org.merchant-org-org'),
          },
          {
            name: '公告',
            path: '/wxmall/notice',
            disabled: this.get('merchant-org.merchant-org-store')
          },{
            name:'分类广告位',
            path: '/wxmall/ad-position',
            disabled: this.get('merchant-org.merchant-org-store')
          },{
            name:'主页设置',
            path: '/wxmall/home-set',
            disabled: this.get('merchant-org.merchant-org-store')
          }
        ]
      },
      {
        name: '连锁设置',
        icon: 'icongoods',
        path: '/chainSetting',
        disabled: true,
        children: []
      },
      {
        name: '门店设置',
        icon: 'icongoods',
        path: '',
        disabled: this.get('merchant-org'),
        children: [
          /*{
            name: '所有门店',
            path: '/storeSetting/index',
            disabled: this.get('merchant-org.merchant-org-org'),
          },*/
          {
            name: '上线门店设置',
            path: '/storeSetting/setting',
            disabled: this.get('merchant-org.merchant-org-store')
          },
          {
            name: '门店配送',
            path: '/storeSetting/deliverySetting',
            disabled: this.get('merchant-org.merchant-org-store')
          }
        ]
      },
      {
        name: '内部链接',
        icon: 'icongoods',
        path: '/internalLink',
        disabled: true,
        children: []
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
    return true
    // let p = this.p;
    // if (_.isEmpty(p)) {
    //   p = this.handlerPs()
    // }
    // const strArr = _.split(str, '.')
    // const leven1Code = strArr[0]
    // const leven2Code = strArr[1]
    // const leven3Code = strArr[2] || ''
    // switch (strArr.length) {
    //   case 1:
    //     return _.has(p, leven1Code)
    //   case 2:
    //     return _.has(p[leven1Code], leven2Code)
    //   default:
    //     return p[leven1Code][leven2Code].includes(leven3Code)
    // }
  }
}

export default ps()
