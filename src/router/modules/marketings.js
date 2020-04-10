import Layout from '@/layout'

export default [
  {
    path: '/marketings',
    component: Layout,
    redirect: '/marketings/wx-official-account',
    name: 'marketings',
    meta: {
      title: '营销中心',
      auth: false
    },
    children: [
      {
        path: '/marketings/gift-manage',
        component: () => import('@/views/marketings/giftManage'),
        name: 'giftManage',
        meta: {
          title: '礼品管理',
          auth: false,
          noCache: true
        },
        children: [
          {
            path: '/marketings/gift-manage/discount',
            component: () => import('@/views/marketings/giftManage/discount'),
            name: 'discount',
            meta: {
              title: '折扣券',
              auth: false,
              noCache: true
            }
          },
          {
            path: '/marketings/gift-manage/full-reduction',
            component: () => import('@/views/marketings/giftManage/fullReduction'),
            name: 'discount',
            meta: {
              title: '满减券',
              auth: false,
              noCache: true
            }
          },
          {
            path: '/marketings/gift-manage/gift',
            component: () => import('@/views/marketings/giftManage/gift'),
            name: 'gift',
            meta: {
              title: '礼品券',
              auth: false,
              noCache: true
            }
          }
        ]
      }
    ]
  }
]
