import Layout from '@/layout'
const router = [
  {
    path: '/',
    component: Layout,
    redirect: '/chainSetting',
    children: [
      {
        path: 'chainSetting',
        component: () => import('@/views/chainSetting/index'),
        name: 'chainSetting',
        hidden: true,
        meta: { title: '连锁设置', icon: 'chainSetting', affix: true }
      }
    ]
  },
  {
    path: '/storeSetting',
    component: Layout,
    redirect: '/storeSetting/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/storeSetting/index'),
        name: 'index',
        hidden: true,
        meta: { title: '所有门店', icon: 'storeSetting', affix: true }
      },
      {
        path: 'setting',
        component: () => import('@/views/storeSetting/setting'),
        name: 'setting',
        hidden: true,
        meta: { title: '门店设置', icon: 'storeSetting', affix: true }
      },
      {
        path: 'deliverySetting',
        component: () => import('@/views/storeSetting/deliverySetting'),
        name: 'deliverySetting',
        hidden: true,
        meta: { title: '门店配送', icon: 'storeSetting', affix: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
