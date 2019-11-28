import Layout from '@/layout'
const router = [
  {
    path: '/orders-manage',
    component: Layout,
    redirect: '/orders-manage/all-orders',
    name: 'orders-manage',
    meta: {
      title: '订单管理',
      icon: 'goods'
    },
    alwaysShow: true,
    children: [
      {
        path: 'all-orders/list',
        component: () => import('@/views/orders-manage/all-orders/list'),
        name: 'orders-manage',
        meta: {
          title: '所有订单',
          noCache: true
        }
      }, {
        path: 'all-orders/details',
        component: () => import('@/views/orders-manage/all-orders/details'),
        name: 'orders-manage',
        meta: {
          title: '订单详情',
          noCache: true,
          activeMenu: '/orders-manage/all-orders/list'
        }
      }, {
        path: 'settings',
        component: () => import('@/views/orders-manage/settings'),
        name: 'orders-manage',
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
