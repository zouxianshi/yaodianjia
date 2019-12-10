import Layout from '@/layout'

const router = [
  {
    path: '/customerService',
    component: Layout,
    redirect: '/customerService/msgSettings',
    name: 'customerService',
    meta: {
      title: '客服管理',
      icon: 'goods'
    },
    // alwaysShow: true,
    children: [
      {
        path: 'msgSettings',
        component: () => import('@/views/customerService/msgConfig'),
        name: 'msgSettings',
        meta: {
          title: '快捷消息设置',
          noCache: true
        }
      },
      {
        path: 'consultation',
        component: () => import('@/views/customerService/consulting'),
        name: 'consultation',
        meta: {
          title: '客服咨询',
          noCache: true
        }
      },
      {
        path: 'list',
        component: () => import('@/views/customerService/supportList'),
        name: 'list',
        meta: {
          title: '客服列表',
          noCache: true
        }
      },
      {
        path: 'historyMsg',
        component: () => import('@/views/customerService/historyMsg'),
        name: 'historyMsg',
        meta: {
          title: '历史消息',
          noCache: true
        }
      }
    ]
  }
]

export default router
