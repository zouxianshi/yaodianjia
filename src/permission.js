import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import { MC } from '@merchant/commons'
const whiteList = ['/login', '/check'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = getToken()
  // const hasToken = true
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          // 获取用户信息
          // const { resList } = await store.dispatch('user/getInfo')
          await store.dispatch('user/getInfo')
          // if (to.path === '/403' || to.path === '/home') {
          //   if (resList.length !== 0) {
          //     const accessRoutes = await store.dispatch('permission/generateRoutes', resList)
          //     router.addRoutes(accessRoutes)
          //   }
          //   next()
          // } else if (resList.length === 0) {
          //   next('/home')
          // } else {
          //   const accessRoutes = await store.dispatch('permission/generateRoutes', resList)
          //   router.addRoutes(accessRoutes)
          next({ ...to, replace: true })
          // }
        } catch (error) {
          if (error.code && error.code === '50000') {
            setTimeout(() => {
              console.log(MC.merHomeAddr)
              window.location.href = MC.merHomeAddr
            }, 500)
          }
          NProgress.done()
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      console.log('MC.merHomeAddr', MC.merHomeAddr)
      setTimeout(() => {
        window.location.href = MC.merHomeAddr
      }, 500)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
