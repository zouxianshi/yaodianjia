/** *
 *
 * @author Lynn-张麟
 * @module renovation/home/list  商城首页设置列表
 *
 */

import request from '@/utils/request'
import config from '@/utils/config'

class RenovationService {
  constructor() {
    this.serve = config.merGoods
  }

  homePageAdd(data) {
    return request({
      url: `${this.serve}/1.0/homepage/add`,
      method: 'post',
      data
    })
  }

  getHomePageAct(data) {
    return request({
      url: `${this.serve}/1.0/homepage-act/time-limited/list`,
      method: 'post',
      data
    })
  }

  getHomepageActItemList(data) {
    return request({
      url: `${this.serve}/1.0/homepage-act/time-limited/queryItemList`,
      method: 'post',
      data
    })
  }

  getHomeCoupon(data) {
    return request({
      url: `${this.serve}/1.0/home-coupon/_search`,
      method: 'post',
      data
    })
  }

  /**
     *
     * @description  获取首页商城设置的列表
     */
  getHomeList() {
    return request({
      url: `${this.serve}/1.0/homepage/list`,
      method: 'get'
    })
  }

  /**
   *
   *  @description  修改基本信息
   */
  updateBaseInfo(params) {
    return request({
      url: `${this.serve}/1.0/homepage/updateBaseInfo`,
      method: 'post',
      data: params
    })
  }

  /**
   *
   * @param {Array} params 要删除的id
   * @description  批量删除模板
   */
  batchDelete(params) {
    return request({
      url: `${this.serve}/1.0/homepage/batchDelete`,
      method: 'post',
      data: params
    })
  }

  /** *
   *
   * @param {String} params.id  首页维度ID
   * @param {Number} params.isNew 是否新模板 0-否 1-是
   * @description 设置当前模板为首页模板
   *
   */
  setHomeTem(params) {
    return request({
      url: `${this.serve}/1.0/homepage/use`,
      method: 'put',
      data: params
    })
  }
}

export default new RenovationService()
