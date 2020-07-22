import Layout from '@/layout'

export default [
  {
    path: '/renovation',
    component: Layout,
    redirect: '/renovation/home',
    name: 'renovation',
    meta: {
      title: '商城装修',
      auth: false
    },
    children: [
      {
        path: '/renovation/home',
        component: () => import('@/views/renovation/home'),
        name: 'renovation-home',
        redirect: '/renovation/home/list',
        meta: {
          title: '新主页设置',
          auth: false,
          noCache: true
        },
        children: [
          {
            path: '/renovation/home/list',
            component: () => import('@/views/renovation/home/list'),
            name: 'renovation-home-list',
            meta: {
              title: '主页列表',
              auth: false,
              noCache: true
            },
            children: []
          },
          {
            path: '/renovation/home/settings',
            component: () => import('@/views/renovation/home/settings'),
            name: 'renovation-home-settings',
            meta: {
              title: '主页设置',
              auth: false,
              noCache: true,
              activeMenu: '/renovation/home/list'
            },
            children: []
          }
        ]
      }

    ]
  }
]
