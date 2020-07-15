/**
 * @author        quanquan
 * @dateTime      2020-07-15 09:57:22
 * @description
 */

import request from '@/utils/request'
import config from '@/utils/config'

class MarketingsService {
  constructor() {
    this.serve = config.merGoods
  }

  getDMList() {
    return request({
      url: `${this.serve}/1.0/dm-dim/list`,
      method: 'get'
    })
  }

  getDMDetails(id) {
    return request({
      url: `${this.serve}/1.0/dm-dim/set/${id}`,
      method: 'get'
    })
  }

  /**
   *  @description 批量修改分享信息
   */
  updateShareInfo(params) {
    return request({
      url: `${this.serve}/1.0/dm-dim/setShareInfo`,
      method: 'post',
      data: params
    })
  }

  /**
   *
   */
  updateBaseInfo(params) {
    return request({
      url: `${this.serve}/1.0/dm-dim/updateBaseInfo`,
      method: 'post',
      data: params
    })
  }

  /**
   * 删除dm单
   */
  deleteDM(id) {
    return request({
      url: `${this.serve}/1.0/dm-dim/${id}`,
      method: 'delete'
    })
  }

  /**
   * 批量删除
   */
  batchDeleteDM(data) {
    return request({
      url: `${this.serve}/1.0/dm-dim/batchDelete`,
      method: 'post',
      data
    })
  }

  /**
   * 复制dm单
   */
  copyDM(data) {
    return request({
      url: `${this.serve}/1.0/dm-dim/copy`,
      method: 'post',
      data
    })
  }

  /**
   * 保存dm单
   */
  saveDMSetting(data) {
    return request({
      url: `${this.serve}/1.0/dm-dim/add`,
      method: 'post',
      data
    })
  }

  /**
   * 更新dm设置
   */
  updateDMSetting(data) {
    return request({
      url: `${this.serve}/1.0/dm-dim/updateSetInfo`,
      method: 'post',
      data
    })
  }
}

export default new MarketingsService()
