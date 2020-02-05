import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
class DistributionService {
  /**
   * 请求基类
   */
  service(method, url, params) {
    const _service = axios.create({
      baseURL: '/hss',
      withCredentials: true, // send cookies when cross-domain requests
      timeout: 20000 // request timeout
    })
    // request interceptor
    let isExport = false

    _service.interceptors.request.use(
      config => {
        if (store.getters.token) {
          config.headers['Authorization'] = getToken()
        }
        isExport = config.isExport || false
        const authParams = {
          // 公共参数
          merCode: store.state.user.merCode,
          // merCode: '888888',
          timestame: Date.parse(new Date())
        }
        if (config.method === 'get') {
          config.params = {
            ...config.params,
            ...authParams
          }
        } else {
          delete authParams.timestame
          if (config.noMerCode) {
            delete authParams.merCode
          }
          // 兼容请求参数为数组的情况
          if (typeof config.data === 'object' && config.data.length) {
            config.data = [...config.data]
          } else {
            // 判断如果是formData不做扩展操作
            if (config.headers['Content-Type'] !== 'multipart/form-data') {
              config.data = {
                ...config.data,
                ...authParams
              }
            }
          }
        }

        return config
      },
      error => {
        return Promise.reject(error)
      }
    )

    // response interceptor
    _service.interceptors.response.use(
      response => {
        const res = response.data
        if (isExport) {
          // 如果是数据导出，直接pass
          return res
        }
        // 10000为所有接口成功码
        if (res.code !== '10000') {
          Message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
          return Promise.reject(res || 'Error')
        }
        return res
      },
      error => {
        let msg = ''
        switch (error.response && error.response.status) {
          case 401:
            location.reload()
            break
          case 403:
            if (error.response.data.code === 40302) {
              msg = '无权限请求该资源'
            } else if (error.response.data.code === 40301) {
              // 40301
              // 登录失效
              msg = '登录失效，请重新登录'
              store.dispatch('user/resetToken').then(() => {
                setTimeout(() => {
                  location.reload()
                }, 1000)
              })
            } else {
              msg = '无权限请求该资源'
            }
            break
          case 404:
            msg = '请求地址未找到！'
            break
          case 405:
            msg = '请求方式错误！'
            break
          case 429:
            msg = '请求次数过多，请稍后重试！'
            break
          case 500:
            msg = '服务器错误，请稍后重试'
            break
          case 502:
            msg = '服务器暂不可用，请稍后重试！'
            break
          case 503:
            msg = '网关错误！'
            break
          case 200:
            // xhr.success(JSON.parse(xhr.responseText));
            break
          case 0:
            // 0可能是网络错误? 可能是连接超时
            if (error.code === 'ECONNABORTED') {
              // 超时
              msg = '请求超时，请稍后重试'
            } else {
              console.log(error)
              // 其他未知错误，通常为无网络
              msg = '请求资源失败，请检查网络状况，稍后重试'
            }
            break
          default:
            // 0可能是网络错误? 可能是连接超时
            if (error.code === 'ECONNABORTED') {
              // 超时
              msg = '请求超时，请稍后重试'
            } else {
              console.log(error)
              // 其他未知错误，通常为无网络
              msg = '请求资源失败，请检查网络状况，稍后重试'
            }
        }
        Message({
          message: msg,
          type: 'error',
          duration: 5 * 1000
        })
        return Promise.reject(error)
      }
    )
    return new Promise((resolve, reject) => {
      _service[method](url, method === 'get' ? { params } : params)
        .then(res => {
          resolve(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   * 查询门店列表数据
   * @param {object} data
   */
  queryStoreList(data) {
    return this.service('post', `/1.0/b/store/_query`, data)
  }
  /**
   *  查询预约单数据列表
   *  @param {object} data 请求参数
   */
  queryOrderListByType(data) {
    return this.service('post', `/1.0/b/order/list`, data)
  }
  /**
   * 获取预约单详细信息
   * @param {number} id
   */
  queryOrderById(id) {
    return this.service('get', `/1.0/b/order/_get/${id}`)
  }
  /**
   * 修改预约单详细信息
   * @param {number} id
   * @param {string} status
   */
  updateOrderStatus(data) {
    return this.service('post', `/1.0/b/order/updateStatusById`, data)
  }
}
export default new DistributionService()
