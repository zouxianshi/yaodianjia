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
            name: 'factory-live-list',
            meta: {
                title: '厂家直播列表',
                auth: '',
                noCache: true,
                activeMenu: '/factory-live/list'
            }
        },
        {
            path: '/factory-live/create',
            component: () => import('@/views/factory-live/create'),
            name: 'factory-live-create',
            meta: {
                title: '厂家直播',
                auth: '',
                noCache: true,
                activeMenu: '/factory-live/create'
            }
        },
        {
            path: '/factory-live/dataCenter',
            component: () => import('@/views/factory-live/dataCenter/index'),
            name: 'factory-live-dataCenter',
            meta: {
                title: '数据中心',
                auth: '',
                noCache: true,
                activeMenu: '/factory-live/dataCenter'
            }
        }
    ]
}]
