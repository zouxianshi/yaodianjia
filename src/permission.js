import router from './router'
// import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
import { MC } from '@merchant/commons'
const whiteList = ['/login', '/check'] // no redirect whitelist
router.beforeEach(async(to, from, next) => {
  // 加入百度统计
  if (to.path) {
    if (window._hmt) {
      window._hmt.push(['_trackPageview', '/#' + to.fullPath])
    }
  }
  const hasToken = getToken()
  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      setTimeout(() => {
        window.location.href = MC.merHomeAddr
      }, 500)
      NProgress.done()
    }
  }
  if (whiteList.indexOf(to.path) !== -1) {
    // in the free login whitelist, go directly
    next()
  } else {
    next()
  }
})

// router.beforeEach(async(to, from, next) => {
//   // start progress bar
//   NProgress.start()

//   // set page title
//   document.title = getPageTitle(to.meta.title)
//   const hasToken = getToken()

//   // const hasToken = true
//   if (hasToken) {
//     if (to.path === '/login') {
//       next({ path: '/' })
//       NProgress.done()
//     } else {
//       next()
//     }
//   } else {
//     if (whiteList.indexOf(to.path) !== -1) {
//       next()
//     } else {
//       setTimeout(() => {
//         window.location.href = MC.merHomeAddr
//       }, 500)
//       NProgress.done()
//     }
//   }
// })

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
