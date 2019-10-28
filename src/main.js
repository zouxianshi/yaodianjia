import Vue from 'vue'

import Cookies from 'js-cookie'
import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './assets/scss/main.scss'
import App from './App'
import store from './store'
import router from './router'
import permission from './directive/permission' // permission control
import * as filters from './filters' // global filters
import './permission'
import { setSystem } from './utils/auth'
import utils from '@/utils/util'

Vue.use(permission)
Vue.use(utils)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online! ! !
 */

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

setSystem('mc-system', 'merchant')

import { MC } from '@merchant/commons'

// default config
MC.init({
  env: process.env.NODE_ENV === 'development' ? 'local' : process.env.VUE_APP_ENV,
  proxyTarget: 'middle.dev.yaodianjia.cn/businesses-gateway/merchant'
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false
Vue.prototype.uploadFileURL = process.env.VUE_APP_API_BASE || '/api'

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
