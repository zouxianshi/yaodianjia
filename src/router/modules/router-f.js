import Layout from '@/layout'
const router = [
  {
    path: '/orders-manage',
    component: Layout,
    redirect: '/orders-manage/list',
    name: 'orders-manage',
    meta: {
      title: '订单中心',
      icon: 'goods'
    },
    alwaysShow: true,
    children: [
      {
        path: 'list',
        component: () => import('@/views/orders-manage/list'),
        name: 'orders-manage-list',
        meta: {
          title: '所有订单',
          noCache: true
        }
      }, {
        path: `details`,
        component: () => import('@/views/orders-manage/details'),
        name: 'orders-manage-details',
        meta: {
          title: '订单详情',
          // noCache: true,
          activeMenu: '/orders-manage/list'
        }
      }, {
        path: 'settings',
        component: () => import('@/views/orders-manage/settings'),
        name: 'orders-manage-settings',
        meta: {
          title: '订单设置',
          noCache: true
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
