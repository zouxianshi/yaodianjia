import Layout from '@/layout'
const router = [
  {
    path: '/wxmall',
    component: Layout,
    redirect: '/wxmall/home-set',
    name: 'wxmall',
    meta: {
      title: '商城装修',
      icon: 'goods'
    },
    alwaysShow: true,
    children: [
      {
        path: 'home-set',
        component: () => import('@/views/wxmall/home-set'),
        name: 'home-set',
        meta: {
          title: '主页设置',
          noCache: true,
          activeMenu: '/wxmall/home-set'
        }
      },
      {
        path: 'banner',
        component: () => import('@/views/wxmall/banner'),
        name: 'banner',
        meta: {
          title: '首页轮播图',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      }, {
        path: 'notice',
        component: () => import('@/views/wxmall/notice'),
        name: 'notice',
        meta: {
          title: '首页公告栏',
          noCache: true,
          activeMenu: '/wxmall/notice'
        }
      }, {
        path: 'ad-position',
        component: () => import('@/views/wxmall/ad-position'),
        name: 'AdPosition',
        meta: {
          title: '分类广告位',
          noCache: true,
          activeMenu: '/wxmall/ad-position'
        }
      }
    ]
  },
  {
    path: '/marketing',
    component: Layout,
    redirect: '/marketing/activity',
    name: 'marketing',
    meta: {
      title: '营销中心',
      icon: 'goods'
    },
    alwaysShow: true,
    children: [
      {
        path: 'activity',
        component: () => import('@/views/marketing/activity/index'),
        name: 'activity',
        meta: {
          title: '精彩活动',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      // {
      //   path: 'activity/create',
      //   component: () => import('@/views/marketing/activity/create'),
      //   name: 'create',
      //   meta: {
      //     title: '新建活动',
      //     auth: 'marketing.marketing-manager',
      //     noCache: true
      //   }
      // },
      {
        path: 'activity/dm-template',
        component: () => import('@/views/marketing/activity/DM/template'),
        name: 'template',
        meta: {
          title: 'DM单模板',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/dm-edit',
        component: () => import('@/views/marketing/activity/DM/dm-edit'),
        name: 'dmEdit',
        meta: {
          title: 'DM单模板',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/list/:type',
        component: () => import('@/views/marketing/activity/list'),
        name: 'activityList',
        meta: {
          title: '精彩活动列表',
          activeMenu: '/marketing/activity',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      {
        path: 'activity/reduce-gift-list-edit',
        component: () => import('@/views/marketing/activity/reduce-gift'),
        name: 'ReduceGift',
        meta: {
          title: '创建满减满赠',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/aprice-edit',
        component: () => import('@/views/marketing/activity/addPrice'),
        name: 'AddPriceCreate',
        meta: {
          title: '创建加价购',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/conflict/:id',
        component: () => import('@/views/marketing/activity/errorlist'),
        name: 'conflictList',
        meta: {
          title: '冲突列表',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/assemble-edit',
        component: () => import('@/views/marketing/activity/assemble/edit'),
        name: 'AssembleEdit',
        meta: {
          title: '拼团活动',
          noCache: false,
          activeMenu: '/marketing/activity/assemble'
        }
      },
      {
        path: 'activity/limit-edit',
        component: () => import('@/views/marketing/activity/limit/limit-edit'),
        name: 'LimitEdit',
        meta: {
          title: '创建限时活动',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'gifts',
        component: () => import('@/views/marketing/gift-manage/index'),
        name: 'giftsManage',
        meta: {
          title: '礼品管理',
          auth: 'marketing.gift',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      {
        path: 'gifts/complimentary',
        component: () => import('@/views/marketing/gift-manage/gifts/complimentary'),
        name: 'giftsComplimentary',
        meta: {
          title: '赠品管理',
          auth: 'marketing.gift',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      {
        path: 'gifts/complimentary-edit',
        component: () => import('@/views/marketing/gift-manage/gifts/complimentary-create'),
        name: 'GiftsComplimentaryCreate',
        meta: {
          title: '创建赠品',
          noCache: false // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      {
        path: '/activity/birthday-gift',
        component: () => import('@/views/marketings/activitysManage/birthdayGift/index'),
        name: 'birthday-gift',
        meta: {
          title: '生日礼包',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: '/activity/member-voucher',
        component: () => import('@/views/marketings/activitysManage/member-voucher/index'),
        name: 'birthday-gift',
        meta: {
          title: '会员发券',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: '/activity/exchangeMallList',
        component: () => import('@/views/marketings/exchangeMall/exchange-list'),
        name: 'exchangeMallList',
        meta: {
          title: '兑换商城',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: '/activity/exchangeMallAdd',
        component: () => import('@/views/marketings/exchangeMall/exchange-add'),
        name: 'exchangeMallAdd',
        meta: {
          title: '兑换商城',
          noCache: false,
          activeMenu: '/marketing/activity'
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
