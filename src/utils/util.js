
const API_BASE = process.env.VUE_APP_IMG_BASE || 'https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/'
export default {
  install(Vue, options) {
    Vue.prototype.showImg = function(url) {
      return `${API_BASE}${url}`
    }
  }
}
