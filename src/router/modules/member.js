import Layout from '@/layout'

export default [
  {
    path: '/member',
    component: Layout,
    redirect: '/member/member-center',
    name: 'member',
    meta: {
      title: '会员管理',
      auth: false
    },
    children: [
      {
        path: '/member/member-center',
        component: () => import('@/views/member/memberCenter'),
        name: 'memberCenter',
        redirect: '/member/member-center/list',
        meta: {
          title: '会员中心',
          auth: false,
          noCache: true
        },
        children: [
          {
            path: '/member/member-center/list',
            component: () => import('@/views/member/memberCenter/list'),
            name: 'mc-list',
            meta: {
              title: '会员列表',
              auth: false,
              noCache: true,
              activeMenu: '/member/member-center'
            }
          },
          {
            path: '/member/member-center/details',
            component: () => import('@/views/member/memberCenter/details'),
            name: 'mc-list',
            meta: {
              title: '会员详情',
              auth: false,
              noCache: true,
              activeMenu: '/member/member-center'
            }
          }
        ]
      },
      {
        path: '/member/register-setting',
        component: () => import('@/views/member/registerSetting'),
        name: 'registerSetting',
        meta: {
          title: '会员注册设置',
          auth: false,
          noCache: true
        },
        children: []
      },
      {
        path: '/member/register-setting/editcard',
        component: () => import('@/views/member/registerSetting/_source/editCard'),
        name: 'EditCard',
        meta: {
          title: '编辑会员卡',
          noCache: true,
          activeMenu: '/member/register-setting'
        }
      },
      {
        path: '/member/member-feedback/FeedbackList',
        component: () => import('@/views/member/memberFeedback/list'),
        name: 'FeedbackList',
        meta: {
          title: '会员反馈',
          noCache: true,
          activeMenu: '/member/member-feedback'
        }
      }
    ]
  }
]
