import Layout from '@/layout'
const router = [
  {
    path: '/goods-manage',
    component: Layout,
    redirect: '/goods-manage/depot',
    name: 'goods-manage',
    meta: {
      title: '商品管理',
      icon: 'goods'
    },
    alwaysShow: true,
    children: [
      {
        path: 'depot',
        component: () => import('@/views/goods-manage/depot/list'),
        name: 'depot',
        meta: {
          title: '商品库',
          noCache: true // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
        }
      }, {
        path: 'addition',
        component: () => import('@/views/goods-manage/depot/addition'),
        name: 'addition',
        meta: {
          title: '标库添加商品',
          noCache: true,
          activeMenu: '/goods-manage/depot'
        }
      }, {
        path: 'import',
        component: () => import('@/views/goods-manage/depot/import'),
        name: 'import',
        meta: {
          title: '导入商品',
          noCache: true,
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
        path: 'apply',
        component: () => import('@/views/goods-manage/new-goods/apply'),
        name: 'apply',
        meta: {
          title: '新品申请',
          noCache: true
        }
      }, {
        path: 'single-create',
        component: () => import('@/views/goods-manage/new-goods/single'),
        name: 'single-create',
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
        name: 'goodsEdit',
        meta: {
          title: '商品信息编辑',
          noCache: true,
          activeMenu: '/goods-manage/apply'
        }
      }, {
        path: 'apply-record',
        component: () => import('@/views/goods-manage/new-goods/record'),
        name: 'goodsRecord',
        meta: {
          title: '新品申请记录',
          noCache: true,
          activeMenu: '/goods-manage/apply'
        }
      }, {
        path: 'group',
        component: () => import('@/views/goods-manage/group/list'),
        name: 'group',
        meta: {
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
          title: '新品审核',
          noCache: true
        }
      }, {
        path: 'mate',
        component: () => import('@/views/goods-manage/examine/mate'),
        name: 'mate',
        meta: {
          title: '重新匹配',
          activeMenu: '/goods-manage/examine',
          noCache: true
        }
      }, {
        path: 'store-goods',
        component: () => import('@/views/goods-manage/store-goods'),
        name: 'storeGoods',
        meta: {
          title: '门店商品管理',
          noCache: true
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
