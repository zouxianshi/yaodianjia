import Layout from '@/layout'

export default [
  {
    path: '/marketings',
    component: Layout,
    redirect: '/marketings/gift-manage',
    name: 'marketings',
    meta: {
      title: '营销中心',
      auth: false
    },
    children: [
      {
        path: '/marketings/gift-manage',
        component: () => import('@/views/marketings/giftManage'),
        redirect: '/marketings/gift-manage/list',
        name: 'gift-manage',
        meta: {
          title: '礼品管理',
          auth: false,
          noCache: true
        },
        children: [
          {
            path: '/marketings/gift-manage/list',
            component: () => import('@/views/marketings/giftManage/list'),
            name: 'gift-manage-list',
            meta: {
              title: '礼品管理列表',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/gift-manage'
            }
          },
          {
            path: '/marketings/gift-manage/discount',
            component: () => import('@/views/marketings/giftManage/discount'),
            name: 'discount',
            meta: {
              title: '折扣券',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/gift-manage'
            }
          },
          {
            path: '/marketings/gift-manage/full-reduction',
            component: () => import('@/views/marketings/giftManage/fullReduction'),
            name: 'discount',
            meta: {
              title: '满减券',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/gift-manage'
            }
          },
          {
            path: '/marketings/gift-manage/gift',
            component: () => import('@/views/marketings/giftManage/gift'),
            name: 'gift',
            meta: {
              title: '礼品券',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/gift-manage'
            }
          }
        ]
      },
      {
        path: '/marketings/activity-manage',
        component: () => import('@/views/marketings/activitysManage'),
        redirect: '/marketings/activity-manage/list',
        name: 'activitys-manage',
        meta: {
          title: '活动管理',
          auth: false,
          noCache: true
        },
        children: [
          {
            path: '/marketings/activity-manage/list',
            component: () => import('@/views/marketings/activitysManage/list'),
            name: 'activitys-manage-list',
            meta: {
              title: '活动管理列表',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          },
          {
            path: '/marketings/activity-manage/coupons/list',
            component: () => import('@/views/marketings/activitysManage/coupons/list'),
            name: 'activitys-manage-coupons-list',
            meta: {
              title: '领劵中心',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          },
          {
            path: '/marketings/activity-manage/coupons/add',
            component: () => import('@/views/marketings/activitysManage/coupons/add'),
            name: 'activitys-manage-coupons-add',
            meta: {
              title: '添加优惠券',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          },
          {
            path: '/marketings/activity-manage/payment-gift/list',
            component: () => import('@/views/marketings/activitysManage/paymentGift/list'),
            name: 'activitys-manage-payment-gift-list',
            meta: {
              title: '支付有礼',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          },
          {
            path: '/marketings/activity-manage/payment-gift/add',
            component: () => import('@/views/marketings/activitysManage/paymentGift/add'),
            name: 'activitys-manage-payment-gift-add',
            meta: {
              title: '新增-支付有礼',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          },
          {
            path: '/marketings/activity-manage/turntable/list',
            component: () => import('@/views/marketings/activitysManage/turntable/list'),
            name: 'activitys-manage-turntable-list',
            meta: {
              title: '大转盘',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          },
          {
            path: '/marketings/activity-manage/turntable/guaList',
            component: () => import('@/views/marketings/activitysManage/turntable/guaList'),
            name: 'activitys-manage-turntable-guaList',
            meta: {
              title: '刮刮乐',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          },
          {
            path: '/marketings/activity-manage/turntable/add',
            component: () => import('@/views/marketings/activitysManage/turntable/add'),
            name: 'activitys-manage-turntable-add',
            meta: {
              title: '活动',
              auth: false,
              noCache: true,
              activeMenu: '/marketings/activity-manage'
            }
          }
        ]
      }
    ]
  }
]
