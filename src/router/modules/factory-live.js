import Layout from '@/layout'

export default [{
    path: '/factory-live',
    component: Layout,
    redirect: '/factory-live/list',
    name: 'factory-live',
    meta: {
        title: '厂家直播',
        auth: 'factory-live'
    },
    children: [
        {
            path: '/factory-live/list',
            component: () => import('@/views/factory-live/list'),
            name: 'factory-live-lis',
            meta: {
                title: '厂家直播列表',
                auth: '',
                noCache: true,
                activeMenu: '/factory-live/list'
            }
        }
    ]
}]
