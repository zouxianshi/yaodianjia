import request from '@/utils/request'
import config from '@/utils/config'

/**
 * 获取大json
 */
export function getStructure(payload) {
  return request({
    url: `${config.merGoods}/1.0/cms-set/${payload.dimensionId}`,
    method: 'get'
  })
}

/**
 * 保存大json
 */
export function saveStructure(data) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim`,
    method: 'post',
    data
  })
}

/**
 * 保存组件
 */
export function saveAssembly(data) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim/_create`,
    method: 'post',
    data
  })
}

/**
 * 内部链接
 */
export function getInternalLink(data) {
  return request({
    url: `${config.merGoods}/1.0/internal-link/_search`,
    method: 'post',
    data
  })
}

/**
 * 获取列表
 */
export function getMallList() {
  return request({
    url: `${config.merGoods}/1.0/cms-dim/list`,
    method: 'get'
  })
}

/**
 * 删除纬度
 */
export function delMallHome(id) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim/${id}`,
    method: 'delete'
  })
}

/**
 * 设置发布状态
 */
export function setStatus(data) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim/status`,
    method: 'put',
    data
  })
}

/**
 * 设为首页
 */
export function setHome(data) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim/use`,
    method: 'put',
    data
  })
}

/**
 * 复制纬度
 */

export function copyHome(data) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim/copy`,
    method: 'post',
    data
  })
}

/**
 * 为你推荐
 */
export function getRecommended() {
  const data = {
    asc: false,
    currentPage: 1,
    pageSize: 6,
    storeId: '053f891c1a524336a93695290d623a8a',
    sortField: 'newTime'
  }
  return request({
    url: `${config.customer}/1.0/commodity-search/_search`,
    method: 'post',
    data
  })
}

/**
 * 获取商品
 */
export function getActivityComm(data) {
  return request({
    url: `${config.merGoods}/1.0/comm-spec/activityComm`,
    method: 'post',
    data
  })
}
