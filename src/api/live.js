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
}

export default new LiveRequest()
