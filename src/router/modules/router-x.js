import Layout from '@/layout'
const router = [
  {
    path: '/wxmall',
    component: Layout,
    redirect: '/wxmall/banner',
    name: 'wxmall',
    meta: {
      title: '内容管理',
      icon: 'goods'
    },
    alwaysShow: true,
    children: [
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
          title: '公告',
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
      }, {
        path: 'home-set',
        component: () => import('@/views/wxmall/home-set'),
        name: 'home-set',
        meta: {
          title: '主页设置',
          noCache: true,
          activeMenu: '/wxmall/home-set'
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
      icon: 'goods'
    },
    alwaysShow: true,
    children: [
      {
        path: 'activity/create',
        component: () => import('@/views/marketing/activity/create'),
        name: 'create',
        meta: {
          title: '新建活动',
          noCache: true
        }
      },
      {
        path: 'activity/limit-edit',
        component: () => import('@/views/marketing/activity/limit-edit'),
        name: 'limitEdit',
        meta: {
          title: '限时优惠',
          noCache: true,
          activeMenu: '/marketing/activity'
        }
      },
      {
        path: 'activity',
        component: () => import('@/views/marketing/activity/index'),
        name: 'activity',
        meta: {
          title: '活动管理',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
