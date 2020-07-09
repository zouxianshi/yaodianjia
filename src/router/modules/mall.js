import Layout from '@/layout'

export default [
  {
    path: '/mall',
    component: Layout,
    redirect: '/mall/home',
    name: 'mall',
    meta: {
      title: '商城装修'
    },
    children: [
      {
        path: '/mall/home',
        component: () => import('@/views/mall/list'),
        name: 'home-list',
        meta: {
          title: '主页设置',
          noCache: true
        },
        children: []
      },
      {
        path: '/mall/home-settings',
        component: () => import('@/views/mall/homeSettings'),
        name: 'home-settings',
        meta: {
          title: '首页设置',
          noCache: false,
          activeMenu: '/renovation/home/list'
        },
        children: []
      },
      {
        path: '/mall/home-settings/:id',
        component: () => import('@/views/mall/homeSettings'),
        name: 'home-settings',
        meta: {
          title: '首页设置',
          noCache: false,
          activeMenu: '/renovation/home/list'
        },
        children: []
      }
    ]
  }
]
