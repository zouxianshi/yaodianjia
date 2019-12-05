import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import _ from 'lodash'

/* Router Modules */
import routeZ from './modules/router-z'
import routeX from './modules/router-x'
import routeR from './modules/router-r'
import routeC from './modules/router-c'
import { mUsersModule } from '@merchant/commons'

// merge component layout module
const userModule = _.assign(mUsersModule, {
  component: Layout
})
/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   隐藏菜单
 * alwaysShow: true               是否一直显示跟路由
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           重定向地址，点击面包屑的时候
 * name:'router-name'             路由名称，必须
 * meta : {
    title: 'title'               显示面包屑的标题
    icon: 'svg-name'             左侧菜单的icon
    noCache: true                缓存
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  锁定菜单
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/403',
    component: () => import('@/views/error-page/403'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        component: () => import('@/views/home/index'),
        name: 'home',
        hidden: true,
        meta: { title: '首页', icon: 'home', affix: true }
      }
    ]
  },
  userModule
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  ...routeZ,
  ...routeX,
  ...routeR,
  ...routeC
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // base: process.env.VUE_ROUTE_BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: [...constantRoutes, ...asyncRoutes]
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
