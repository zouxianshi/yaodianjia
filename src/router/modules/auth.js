
export default [
  {
    path: '/auth',
    component: () => import('@/views/auth'),
    redirect: '/auth/auth-call-back',
    name: 'auth',
    meta: {
      title: '授权',
      auth: false
    },
    children: [
      {
        path: '/auth/auth-call-back',
        component: () => import('@/views/auth/wxCallBack'),
        name: 'authCallBack',
        meta: {
          title: '微信授权回调',
          auth: false,
          noCache: true
        },
        children: []
      }

    ]
  }
]
