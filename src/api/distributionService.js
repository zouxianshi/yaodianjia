import axios from 'axios'
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
    _service[method](url, method === 'get' ? { params } : params)
  }
  /**
   *  查询预约单数据列表
   *  @param {object} data 请求参数
   */
  queryOrderListByType(data) {
    console.log('say Hello ')
    return this.service('post', `/1.0/b/order/list`, data)
  }
}
export default new DistributionService()
