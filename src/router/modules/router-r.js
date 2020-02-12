import Layout from '@/layout'
const router = [
  {
    path: '/storeSetting',
    component: Layout,
    redirect: '/chainSetting',
    meta: {
      title: '设置中心',
      icon: 'goods',
      auth: 'set'
    },
    children: [
      {
        path: 'chainSetting',
        component: () => import('@/views/chainSetting/index'),
        name: 'chainSetting',
        hidden: true,
        meta: { title: '连锁设置', icon: 'chainSetting', auth: 'set.merchant-set' }
      },
      {
        path: 'setting',
        component: () => import('@/views/storeSetting/setting'),
        name: 'setting',
        hidden: true,
        meta: { title: '上线门店', icon: 'storeSetting', auth: 'set.store-up' }
      },
      {
        path: 'deliverySetting',
        component: () => import('@/views/storeSetting/deliverySetting'),
        name: 'deliverySetting',
        hidden: true,
        meta: { title: '门店配送', icon: 'storeSetting', auth: 'set.store-deliver' }
      },
      {
        path: 'internalLink',
        component: () => import('@/views/internalLink/index'),
        name: 'internalLink',
        hidden: true,
        meta: { title: '内部链接', icon: 'internalLink', auth: 'set.inner-link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
