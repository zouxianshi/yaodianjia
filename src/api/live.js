import request from '@/utils/request'
import config from '@/utils/config'

class LiveRequest {
  /**
   * @param {number} params.pageSize 一页多少条
   * @param {number} params.currentPage 当前页
   * @description 获取直播活动列表数据
   */
  getLiveList(params) {
    return request({
      url: `${config.live}/1.0/activity/list`,
      method: 'post',
      data: params
    })
  }
  /**
   *
   * @param {string} params.adLinkUrl  广告位Ulr
   * @description 创建直播
   */
  createLive(params) {
    return request({
      url: `${config.live}/1.0/activity/add`,
      method: 'post',
      data: params
    })
  }
  /**
   *
   * @param {string} params.liveId  直播iD
   * @description 获取直播详情
   */
  getLiveDetails(params) {
    return request({
      url: `${config.live}/1.0/activity/detail/${params.liveId}`,
      method: 'get'
    })
  }
  /**
   *
   * @param {string} params.liveId  直播iD
   * @description 获取直播商品列表
   */
  getLivegoods(params) {
    return request({
      url: `${config.live}/1.0/activity/commodity/list?liveId=${params.liveId}`,
      method: 'get'
    })
  }
  /**
   *
   * @param {string} params.name  用户名
   * @description 获取IM签名密码
   */
  getTimgensing(params) {
    return request({
      url: `${config.live}/1.0/im/genSig/${params.name}`,
      method: 'get'
    })
  }
  /**
   *
   * @param {string} params.liveId  直播ID
   * @description 关闭直播
   */
  closeLive(params) {
    return request({
      url: `${config.live}/1.0/live/close?liveId=${params.liveId}`,
      method: 'post'
    })
  }
}

export default new LiveRequest()
