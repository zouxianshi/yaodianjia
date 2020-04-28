import request from '@/utils/request'
import config from '@/utils/config'

/** *
 * 营销活动 -- 活动管理
 */

// 查询活动列表
export function getActivityList(params) {
  return request({
    // url: `${config.merPromote}/1.0/activities/_search`,
    url: `${config.merGoods}/1.0/promote/_search`,
    method: 'post',
    data: params
  })
}

// 查询活动详情（限时优惠）
export function getActivityDetail(params) {
  return request({
    url: `${config.merPromote}/1.0/activities/${params.id}`,
    method: 'get'
  })
}

// 添加活动信息（限时优惠）
export function addActivity(params) {
  return request({
    url: `${config.merPromote}/1.0/admin/activities`,
    method: 'post',
    data: params
  })
}

// 更新活动信息（限时优惠）
export function updateActivity(params) {
  return request({
    url: `${config.merPromote}/1.0/admin/activities`,
    method: 'put',
    data: params
  })
}

// 删除活动（限时优惠）
export function delActivity(params) {
  return request({
    url: `${config.merPromote}/1.0/admin/activities/${params.id}`,
    method: 'delete',
    data: params
  })
}

// 失效活动（限时优惠）
export function disableActivity(params) {
  return request({
    url: `${config.merPromote}/1.0/admin/activities/_invalid/${params.id}`,
    method: 'put'
  })
}
// 普通活动列表
export function normalActivityList(params) {
  return request({
    url: `${config.merGoods}/1.0/market/ActivityList`,
    method: 'post',
    data: params
  })
}
// 新增普通活动列表
export function createActivity(params) {
  return request({
    url: `${config.merGoods}/1.0/market/createActivity`,
    method: 'post',
    data: params
  })
}
// 支付有礼可被添加的活动列表
export function normalAddActivityList(params) {
  return request({
    url: `${config.merGoods}/1.0/market/normalAddActivityList`,
    method: 'post',
    data: params
  })
}
// 普通活动详情
export function ActivityDetail(params) {
  return request({
    url: `${config.merGoods}/1.0/market/ActivityDetail/${params.id}`,
    method: 'get'
  })
}
