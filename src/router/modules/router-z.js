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
        path: 'import-history',
        component: () => import('@/views/goods-manage/depot/import-history'),
        name: 'import-history',
        meta: {
          title: '导入商品',
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
        component: () => import('@/views/goods-manage/new-goods/single-create'),
        name: 'single-create',
        meta: {
          title: '单品创建',
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
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
