import Layout from '@/layout'
const router = [
  {
    path: '/wxmall',
    component: Layout,
    redirect: '/wxmall/home-set',
    name: 'wxmall',
    meta: {
      title: '商城装修',
      icon: 'goods',
      auth: 'yaodianjia-wxmall'
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
          activeMenu: '/wxmall/home-set',
          auth: 'yaodianjia-wxmall.yaodianjia-wxmall-home-set'
        }
      },
      {
        path: 'banner',
        component: () => import('@/views/wxmall/banner'),
        name: 'banner',
        meta: {
          title: '首页轮播图',
          noCache: true, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          auth: 'yaodianjia-wxmall.yaodianjia-wxmall-banner'
        }
      }, {
        path: 'notice',
        component: () => import('@/views/wxmall/notice'),
        name: 'notice',
        meta: {
          title: '首页公告栏',
          noCache: true,
          activeMenu: '/wxmall/notice',
          auth: 'yaodianjia-wxmall.yaodianjia-wxmall-notice'
        }
      }, {
        path: 'ad-position',
        component: () => import('@/views/wxmall/ad-position'),
        name: 'AdPosition',
        meta: {
          title: '分类广告位',
          noCache: true,
          activeMenu: '/wxmall/ad-position',
          auth: 'yaodianjia-wxmall.yaodianjia-wxmall-ad-position'
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
      title: '营销活动',
      icon: 'goods',
      auth: 'marketing'
    },
    alwaysShow: true,
    children: [
      {
        path: 'activity',
        component: () => import('@/views/marketing/activity/index'),
        name: 'activity',
        meta: {
          title: '活动管理',
          auth: 'marketing.marketing-manager',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      {
        path: 'activity/create',
        component: () => import('@/views/marketing/activity/create'),
        name: 'create',
        meta: {
          title: '新建活动',
          auth: 'marketing.marketing-manager',
          noCache: true
        }
      },
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
        path: 'activity/list',
        component: () => import('@/views/marketing/activity/list'),
        name: 'activityList',
        meta: {
          title: '活动管理列表',
          activeMenu: '/marketing/activity',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      {
        path: 'activity/reduce-gift-list',
        component: () => import('@/views/marketing/activity/reduce-gift/list'),
        name: 'reduceGiftList',
        meta: {
          title: '满减满赠列表',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/reduce-gift-list-edit',
        component: () => import('@/views/marketing/activity/reduce-gift'),
        name: 'reduceGift',
        meta: {
          title: '创建满减满赠',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/aprice',
        component: () => import('@/views/marketing/activity/addPrice/list'),
        name: 'addPriceList',
        meta: {
          title: '加价购列表',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/aprice-edit',
        component: () => import('@/views/marketing/activity/addPrice'),
        name: 'addPriceCreate',
        meta: {
          title: '创建加价购',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/conflict/:id',
        component: () => import('@/views/marketing/activity/errorlist'),
        name: 'conflictList',
        meta: {
          title: '冲突列表',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      }, {
        path: 'activity/assemble',
        component: () => import('@/views/marketing/activity/assemble/list'),
        name: 'assembleList',
        meta: {
          title: '拼团活动',
          noCache: true,
          activeMenu: '/marketing/activity/assemble'
        }
      },
      {
        path: 'activity/assemble-edit',
        component: () => import('@/views/marketing/activity/assemble/edit'),
        name: 'assembleEdit',
        meta: {
          title: '拼团活动',
          noCache: true,
          activeMenu: '/marketing/activity/assemble'
        }
      },
      {
        path: 'activity/limit',
        component: () => import('@/views/marketing/activity/limit/list'),
        name: 'limitList',
        meta: {
          title: '限时特惠',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/limit-edit',
        component: () => import('@/views/marketing/activity/limit/limit-edit'),
        name: 'limitEdit',
        meta: {
          title: '创建限时特惠',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/limit-sec',
        component: () => import('@/views/marketing/activity/limit/list_seckill'),
        name: 'limitSecList',
        meta: {
          title: '限时秒杀',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity/limit-sec-edit',
        component: () => import('@/views/marketing/activity/limit/limit_seckill_edit'),
        name: 'limitSecEdit',
        meta: {
          title: '创建限时秒杀',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      // 礼品管理模块
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
        name: 'giftsComplimentaryCreate',
        meta: {
          title: '创建赠品',
          auth: 'marketing.gift',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
