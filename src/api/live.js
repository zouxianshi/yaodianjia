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
   * 发起直播
   */
  startLive(id) {
    return request({
      url: `${config.live}/1.0/live/sponsor?liveId=${id}`,
      method: 'post'
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
   * 更新直播数据
   */
  updateLiveInfo(params) {
    return request({
      url: `${config.live}/1.0/activity/edit`,
      method: 'post',
      data: params
    })
  }
  /**
   * 获取直播详情
   */
  getLiveInfo(liveId) {
    return request({
      url: `${config.live}/1.0/activity/editDetail/${liveId}`
    })
  }
  /*
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
   * 获取直播商品数据
   */
  getLiveGoods(liveId) {
    return request({
      url: `${config.live}/1.0/activity/commodity/list`,
      method: 'get',
      params: { liveId: liveId }
    })
  }
  /**
   * 获取分享地址
   */
  getShareLivePage(merCode, liveId) {
    return request({
      url: `${config.live}/1.0/activity/getPlayUrl/${merCode}/${liveId}`,
      method: 'post'
    })
  }
  /*
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
