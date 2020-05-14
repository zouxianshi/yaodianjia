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
        component: () => import('@/views/customerService/msgSettings.vue'),
        name: 'msgSettings',
        meta: {
          title: '快捷消息设置',
          noCache: true
        }
      },
      {
        path: 'consultation',
        component: () => import('@/views/customerService/consultation.vue'),
        name: 'consultation',
        meta: {
          title: '在线咨询',
          noCache: true
        }
      },
      {
        path: 'list',
        component: () => import('@/views/customerService/list.vue'),
        name: 'list',
        meta: {
          title: '客服列表',
          noCache: true
        }
      },
      {
        path: 'historyMsg',
        component: () => import('@/views/customerService/historyMsg.vue'),
        name: 'historyMsg',
        meta: {
          title: '消息记录',
          noCache: false
        }
      }
    ]
  }
]

export default router
