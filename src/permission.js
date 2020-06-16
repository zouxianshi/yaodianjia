import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
// import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import { MC } from '@merchant/commons'
const whiteList = ['/login', '/check'] // no redirect whitelist
// import ps from '@/layout/psHandler'

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // set page title
  document.title = getPageTitle(to.meta.title)
  const hasToken = MC.getAuth()

  // 加入百度统计
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }

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
          const { resList } = await store.dispatch('user/getInfo')
          if (resList.length) {
            if (to.path) {
              if (MC.isAuth(to.path, resList)) {
                next({ ...to, replace: true })
              } else {
                next('/403')
              }
            } else {
              next({ ...to, replace: true })
            }
          } else {
            next('/home')
          }
        } catch (error) {
          console.log(error)
          if (error.code === '30007') {
            setTimeout(() => {
              console.log(MC.merHomeAddr)
              window.location.href = MC.merHomeAddr
            }, 500)
          }
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
