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
        name: 'order-manage',
        meta: {
          title: '预约单管理'
        }
      },
      {
        path: 'order-details',
        component: () => import('@/views/distribution/order-manage/details.vue'),
        name: 'order-details',
        meta: {
          title: '预约单详情'
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
      },
      {
        path: 'reservation-product',
        component: () =>
          import('@/views/distribution/reservation-product/index.vue'),
        name: 'reservation-product',
        meta: {
          title: '预约商品管理'
        }
      },
      {
        path: 'add-product',
        component: () =>
          import(
            '@/views/distribution/reservation-product/add-reservation.vue'
          ),
        name: 'add-point',
        meta: {
          title: '添加预约商品'
        }
      },
      {
        path: 'updata-product',
        component: () =>
          import(
            '@/views/distribution/reservation-product/updata-reservation.vue'
          ),
        name: 'updata-point',
        meta: {
          title: '编辑预约商品'
        }
      },
      {
        path: 'pickup-point',
        component: () => import('@/views/distribution/pickup-point/index.vue'),
        name: 'pickup-point',
        meta: {
          title: '提货点管理'
        }
      },
      {
        path: 'add-point',
        component: () =>
          import('@/views/distribution/pickup-point/add-pickup.vue'),
        name: 'add-point',
        meta: {
          title: '添加提货门店'
        }
      },
      {
        path: 'updata-point',
        component: () =>
          import('@/views/distribution/pickup-point/updata-pickup.vue'),
        name: 'updata-point',
        meta: {
          title: '编辑提货门店'
        }
      }
    ]
  }
]

export default router