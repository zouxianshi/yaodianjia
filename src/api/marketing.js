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

export function getActivityDetailPromote(params) {
  return request({
    url: `${config.merGoods}/1.0/promote/${params.id}`,
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

// 拼团活动 活动新建

export function assembleActivityAdd(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/create`,
    method: 'post',
    data: params
  })
}

// 获取拼团活动列表
export function getAssembleList(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup`,
    method: 'post',
    data: params
  })
}

// 删除拼团活动
export function delAssembleActivity(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/deleteByIds`,
    method: 'post',
    data: params,
    noMerCode: true
  })
}

// 新人礼包 && 签到奖励相关接口

// 创建新人礼包/
export function createNewGiftBag(params) {
  return request({
    url: `${config.merGoods}/1.0/market/createNewGiftBag`,
    method: 'post',
    data: params
  })
}

// 修改新人礼包/
export function updateGiftBag(params) {
  return request({
    url: `${config.merGoods}/1.0/market/updateActivity`,
    method: 'post',
    data: params
  })
}

// 查询海贝签到
export function _searchMemberSignIn(params) {
  return request({
    url: `${config.merGoods}/1.0/signIn/_searchMemberSignIn`,
    method: 'get'
  })
}
// 海贝签到规则设置
export function sigenInSavaAndEdit(params) {
  return request({
    url: `${config.merGoods}/1.0/signIn/sigenInSavaAndEdit`,
    method: 'post',
    data: params
  })
}
// 海贝签到活动开关
export function modifyStatus(params) {
  return request({
    url: `${config.merGoods}/1.0/signIn/modifyStatus?isValid=${params.isValid}&merCode=${params.merCode}`,
    method: 'post',
    data: {}
  })
}
