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
        meta: {
          title: '连锁设置',
          icon: 'chainSetting',
          auth: 'set.merchant-set'
        }
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
        meta: {
          title: '门店配送',
          icon: 'storeSetting',
          auth: 'set.store-deliver'
        }
      },
      {
        path: 'internalLink',
        component: () => import('@/views/internalLink/index'),
        name: 'internalLink',
        hidden: true,
        meta: {
          title: '内部链接',
          icon: 'internalLink',
          auth: 'set.inner-link'
        }
      },
      {
        path: 'weapp',
        component: () => import('@/views/storeSetting/weapp'),
        name: 'weapp',
        hidden: true,
        meta: {
          title: '微信小程序',
          icon: 'internalLink',
          auth: 'set.inner-link'
        }
      },
      {
        path: 'comment-settings',
        component: () => import('@/views/comment-settings/index'),
        name: 'commentSettings',
        hidden: true,
        meta: {
          title: '评论设置',
          icon: 'commentSettings'
          // auth: 'set.comment-settings'
        },
        children: [
          {
            path: 'manager',
            component: () => import('@/views/comment-settings/manager'),
            name: 'manager',
            hidden: true,
            meta: {
              title: '评论管理',
              icon: 'manager'
              // auth: 'set.comment-settings'
            }
          },
          {
            path: 'import',
            component: () => import('@/views/comment-settings/import'),
            name: 'import',
            hidden: true,
            meta: {
              title: '导入评论',
              icon: 'import'
              // auth: 'set.comment-settings'
            }
          }
        ]
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true, meta: { title: '404' }}
]

export default router
