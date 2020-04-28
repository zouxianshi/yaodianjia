import request from '@/utils/request'
import config from '@/utils/config'

/*
 优惠券管理
*/
// 查询当前商户
export function _searchByMercode(params) {
  return request({
    url: `${config.merGoods}/1.0/merchant/_searchByMercode/${params.merCode}`,
    method: 'post',
    data: {}
  })
}
// 查询机构
export function getOrganization(params) {
  return request({
    url: `${config.merGoods}/1.0/organization/${params.merCode}`,
    method: 'get'
  })
}
// 条件查询门店
export function queryStoreByOrgId(params) {
  return request({
    url: `${config.merGoods}/1.0/store/queryStoreByOrgId`,
    method: 'post',
    data: params
  })
}

// 查询优惠券列表
export function getCouponList(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/_search`,
    method: 'post',
    data: params
  })
}
// 查询优惠券详情
export function getCouponDetail(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/${params.id}`,
    method: 'get'
  })
}
// 新增优惠券
export function addCoupon(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/createCoupon`,
    method: 'post',
    data: params
  })
}
// 模块列表
export function moduleList(params) {
  console.log(params)
  return request({
    url: `${config.merGoods}/1.0/market/_searchTemplate/${params.id}/${params.type}`,
    method: 'get'
  })
}
// 查领券中心优惠券列表全部
export function searchActivities(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/_search`,
    method: 'post',
    data: params
  })
}
// 查领券中心优惠券列表活动
export function searchActivitie(params) {
  return request({
    url: `${config.merGoods}/1.0/market/_search`,
    method: 'post',
    data: params
  })
}
// 查询活动优惠券列表
export function getactivitList(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/_search`,
    method: 'post',
    data: params
  })
}

// 领券中心添加优惠券新增优惠券
export function marketaddCoupon(params) {
  return request({
    url: `${config.merGoods}/1.0/market/addCoupon`,
    method: 'post',
    data: params
  })
}
// 编辑优惠券
export function updateCoupon(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/updateCoupon`,
    method: 'post',
    data: params
  })
}
// (领券中心)失效优惠券
export function couponInvalid(params) {
  return request({
    url: `${config.merGoods}/1.0/market/unvalidCoupon`,
    method: 'post',
    data: params
  })
}
// 新增普通活动列表
export function updateActivity(params) {
  return request({
    url: `${config.merGoods}/1.0/market/updateActivity`,
    method: 'post',
    data: params
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
// 失效或删除普通活动(支付有礼)
export function setNormalActivity(params) {
  return request({
    url: `${config.merGoods}/1.0/market/setNormalActivity`,
    method: 'post',
    data: params
  })
}

