import Layout from '@/layout'

export default [
  {
    path: '/mall',
    component: Layout,
    redirect: '/mall/home-settings',
    name: 'mall',
    meta: {
      title: '商城',
      auth: false
    },
    children: [
      {
        path: '/mall/home-settings',
        component: () => import('@/views/mall/homeSettings'),
        name: 'home-settings',
        meta: {
          title: '首页设置',
          auth: false,
          noCache: true
        },
        children: []
      }
    ]
  }
]
