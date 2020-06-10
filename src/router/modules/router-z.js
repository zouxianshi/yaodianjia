import Layout from '@/layout'
const router = [
  {
    path: '/goods-manage',
    component: Layout,
    redirect: '/goods-manage/depot',
    name: 'goods-manage',
    meta: {
      title: '商品中心',
      icon: 'goods',
      auth: 'commodity'
    },
    alwaysShow: true,
    children: [
      {
        path: 'depot',
        component: () => import('@/views/goods-manage/depot/list'),
        name: 'depot',
        meta: {
          title: '商品库',
          auth: 'commodity.commodity-lib',
          noCache: false // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      },
      {
        path: 'depot-edit',
        component: () => import('@/views/goods-manage/depot/editDepot'),
        name: 'depotEdit',
        meta: {
          title: '商品信息编辑',
          auth: 'commodity.commodity-lib',
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          activeMenu: '/goods-manage/depot'
        }
      },
      {
        path: 'addition-edit',
        component: () => import('@/views/goods-manage/depot/editAddition'),
        name: 'additionEdit',
        meta: {
          title: '标库商品信息编辑',
          auth: 'commodity.commodity-lib',
          noCache: false, // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
          activeMenu: '/goods-manage/depot'
        }
      },
      {
        path: 'addition',
        component: () => import('@/views/goods-manage/depot/addition'),
        name: 'addition',
        meta: {
          title: '标库添加商品',
          noCache: false,
          activeMenu: '/goods-manage/depot'
        }
      }, {
        path: 'import',
        component: () => import('@/views/goods-manage/depot/import'),
        name: 'import',
        meta: {
          title: '导入商品',
          noCache: false,
          activeMenu: '/goods-manage/depot'
        }
      }, {
        path: 'importRecode',
        component: () => import('@/views/goods-manage/depot/importRecode'),
        name: 'importRecode',
        meta: {
          title: '导入历史',
          noCache: false,
          activeMenu: '/goods-manage/depot'
        }
      }, {
        path: 'paircode',
        component: () => import('@/views/goods-manage/depot/paircode'),
        name: 'paircode',
        meta: {
          title: '商品对码',
          noCache: true,
          activeMenu: '/goods-manage/depot'
        }
      }, {
        path: 'mate-details',
        component: () => import('@/views/goods-manage/depot/mate'),
        name: 'paircode',
        meta: {
          title: '重新匹配',
          noCache: true,
          activeMenu: '/goods-manage/depot'
        }
      }, {
        path: 'apply',
        component: () => import('@/views/goods-manage/new-goods/apply'),
        name: 'apply',
        meta: {
          auth: 'commodity.commodity-self',
          title: '自建新品',
          noCache: true
        }
      }, {
        path: 'single-create',
        component: () => import('@/views/goods-manage/new-goods/single'),
        name: 'SingleCreate',
        meta: {
          title: '单品创建',
          noCache: true,
          activeMenu: '/goods-manage/apply'
        }
      }, {
        path: 'batch-create',
        component: () => import('@/views/goods-manage/new-goods/batch'),
        name: 'batch-create',
        meta: {
          title: '批量创建商品',
          noCache: true,
          activeMenu: '/goods-manage/apply'
        }
      }, {
        path: 'edit',
        component: () => import('@/views/goods-manage/new-goods/edit'),
        name: 'GoodsEdit',
        meta: {
          title: '商品信息编辑',
          noCache: false,
          activeMenu: '/goods-manage/apply'
        }
      },
      {
        path: 'apply-record',
        component: () => import('@/views/goods-manage/new-goods/record'),
        name: 'GoodsRecord',
        meta: {
          auth: 'commodity.commodity-new-record',
          title: '新品申请记录',
          noCache: true
        },
        children: []
      },
      {
        path: 'apply-record-edit',
        component: () => import('@/views/goods-manage/new-goods/editRecord'),
        name: 'applyRecordEdit',
        meta: {
          auth: 'commodity.commodity-new-record',
          title: '编辑新品申请记录',
          noCache: false,
          activeMenu: '/goods-manage/apply-record'
        },
        children: []
      },
      {
        path: 'edit-apply',
        component: () => import('@/views/goods-manage/new-goods/editApply'),
        name: 'editApply',
        meta: {
          auth: 'commodity.commodity-new-record',
          title: '自建新品',
          noCache: false,
          activeMenu: '/goods-manage/apply'
        },
        children: []
      },
      {
        path: 'group',
        component: () => import('@/views/goods-manage/group/list'),
        name: 'group',
        meta: {
          auth: 'commodity.commodity-group',
          title: '自定义分组',
          noCache: true
        }
      },
      {
        path: 'group-create/:id',
        component: () => import('@/views/goods-manage/group/Create'),
        name: 'groupEdit',
        meta: {
          title: '编辑分组',
          noCache: true,
          activeMenu: '/goods-manage/group'
        }
      }, {
        path: 'examine',
        component: () => import('@/views/goods-manage/examine/list'),
        name: 'examine',
        meta: {
          auth: 'commodity.commodity-check',
          title: '新品审核',
          noCache: true
        }
      }, {
        path: 'mate',
        component: () => import('@/views/goods-manage/examine/mate'),
        name: 'mate',
        meta: {
          title: '匹配列表',
          activeMenu: '/goods-manage/apply-record',
          noCache: true
        }
      }, {
        path: 'store-goods',
        component: () => import('@/views/goods-manage/store-goods'),
        name: 'storeGoods',
        meta: {
          auth: 'commodity.commodity-store',
          title: '门店商品管理',
          noCache: true
        }
      }, {
        path: 'constitute-goods',
        component: () => import('@/views/goods-manage/constitute-goods/list'),
        name: 'constituteGoods-list',
        meta: {
          auth: 'commodity.commodity-combine',
          title: '组合商品',
          noCache: true
        }
      }, {
        path: 'constitute-goods/edit',
        component: () => import('@/views/goods-manage/constitute-goods/edit'),
        name: 'constituteGoods-edit',
        meta: {
          title: '组合商品',
          noCache: true,
          activeMenu: '/goods-manage/constitute-goods'
        }
      }
    ]
  },
  {
    path: '/live-manage',
    component: Layout,
    redirect: '/live-manage/activity',
    name: 'live-manage',
    meta: {
      title: '直播中心',
      icon: 'live',
      auth: 'live'
    },
    alwaysShow: true,
    children: [
      {
        path: 'activity',
        component: () => import('@/views/live-broadcast/activity/list'),
        name: 'live-activity',
        meta: {
          // auth: 'commodity.commodity-combine',
          title: '直播活动',
          noCache: true
        }
      },
      {
        path: 'activity-edit',
        component: () => import('@/views/live-broadcast/activity/edit'),
        name: 'live-activity-edit',
        meta: {
          // auth: 'commodity.commodity-combine',
          title: '直播活动',
          noCache: true
        }
      },
      {
        path: 'live-now',
        component: () => import('@/views/live-broadcast/activity/live-now/index'),
        name: 'live-now',
        meta: {
          title: '直播'
        }
      }, {
        path: 'introduce',
        component: () => import('@/views/live-broadcast/introduce'),
        name: 'introduce',
        meta: {
          title: '直播介绍',
          noCache: true
        }
      }, {
        path: 'datacenter',
        component: () => import('@/views/live-broadcast/datacenter'),
        name: 'datacenter',
        meta: {
          title: '数据中心',
          noCache: true
        }
      }, {
        path: 'data-details',
        component: () => import('@/views/live-broadcast/datacenter/detail'),
        name: 'data-details',
        meta: {
          title: '数据详情',
          noCache: true
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
