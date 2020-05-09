import Layout from '@/layout'

export default [
  {
    path: '/channel',
    component: Layout,
    redirect: '/channel/wx-official-account',
    name: 'channel',
    meta: {
      title: '渠道管理',
      auth: false
    },
    children: [
      {
        path: '/channel/wx-official-account',
        component: () => import('@/views/channel/wxOffAccount'),
        name: 'wxOffAccount',
        meta: {
          title: '微信公众号',
          auth: false,
          noCache: true
        },
        children: []
      }
    ]
  }
]
