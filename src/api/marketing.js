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
    url: `${config.merGoods}/1.0/admin/activityGroup/add`,
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

// 获取拼团活动单个信息
export function getAssembleAcInfo(activityId) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/getActivityInfo/${activityId}`,
    method: 'get'
  })
}

// 修改拼团活动基本信息
export function updateAssembleInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/modify`,
    method: 'post',
    data: params
  })
}

// 编辑修改拼团活动产品信息
export function updateAcAssmbleProductInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/modifyProduct`,
    method: 'post',
    data: params
  })
}

// 通过活动ID获取商品
export function getActivityGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/getProductsByActivityId`,
    method: 'post',
    data: params
  })
}

// 根据商品活动ID删除活动下的商品
export function deleteAcAssembleGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/deleteProductInfo`,
    method: 'post',
    data: params
  })
}

// 批量修改库存
export function setAssembleStock(params) {
  console.log(params)
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/updateStock`,
    method: 'post',
    data: params
  })
}
