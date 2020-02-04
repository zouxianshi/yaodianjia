import Layout from '@/layout'

const router = [
  {
    path: '/distribution',
    component: Layout,
    redirect: '/distribution/order-manage',
    name: 'distribution',
    meta: {
      title: '预约商品',
      icon: 'goods'
    },
    // alwaysShow: true,
    children: [
    //   {
    //     path: 'order-manage',
    //     component: () => import('@/views/distribution/order-manage/index.vue'),
    //     name: 'order-manage',
    //     meta: {
    //       title: '疫情商品管理',
    //       noCache: true
    //     }
    //   },
      {
        path: 'order-manage',
        component: () => import('@/views/distribution/order-manage/index.vue'),
        name: 'consultation',
        meta: {
          title: '预约单管理'
        }
      },
      {
        path: 'write-off',
        component: () => import('@/views/distribution/write-off/index.vue'),
        name: 'write-off',
        meta: {
          title: '核销管理'
        }
      },
      {
        path: 'weapp-setting',
        component: () => import('@/views/distribution/weapp-setting/index.vue'),
        name: 'weapp-setting',
        meta: {
          title: '小程序设置'
        }
      }
    ]
  }
]

export default router
