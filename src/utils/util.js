const API_BASE =
  process.env.VUE_APP_IMG_BASE ||
  'https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/'
const API_IMG_BASE =
  process.env.VUE_APP_IMG_BASE_HSS ||
  'https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/'
const API_OSS_BASE =
  process.env.VUE_APP_OSS_BASE ||
  'https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/'
export default {
  install(Vue, options) {
    Vue.prototype.showImg = function(url) {
      return `${API_BASE}${url}`
    }
    /**
     * 预发项目单独处理img url
     */
    Vue.prototype.showImgHandler = function(url) {
      return `${API_IMG_BASE}${url}`
    }
    Vue.prototype.configOss = function(url) {
      return `${API_OSS_BASE}${url}`
    }
  }
}
