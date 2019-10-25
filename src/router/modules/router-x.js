import Layout from '@/layout'
const router = [
  {
    path: '/wxmall',
    component: Layout,
    redirect: '/wxmall/banner',
    name: 'wxmall',
    meta: {
      title: '微商城',
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
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
