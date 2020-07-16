import request from '@/utils/request'
import config from '@/utils/config'

// 获取生日礼包活动
export function queryBirthday(params) {
  return request({
    url: `${config.merGoods}/1.0/birthdayGiftBag/queryBirthday?templateCode=TC006`,
    method: 'get'
  })
}

// 编辑活动
export function updateNormalActivityNoTime(params) {
  return request({
    url: `${config.merGoods}/1.0/market/updateNormalActivityNoTime`,
    method: 'post',
    data: params
  })
}
// 开启关闭生日礼包
export function birthdayOperate(params) {
  return request({
    url: `${config.merGoods}/1.0/birthdayGiftBag/birthdayOperate?status=${params.status}&templateCode=TC006&merCode=${params.merCode}`,
    method: 'post',
    data: {}
  })
}
// 查询所有会员（会员发券
export function queryMembersNew(params) {
  return request({
    url: `${config.merGoods}/1.0/member/queryMembersNew`,
    method: 'post',
    data: params
  })
}

// 批量发券
export function batchSendCoupon(params) {
  return request({
    url: `${config.merGoods}/1.0/market/batchSendCoupon`,
    method: 'post',
    data: params
  })
}

// 批量发券新接口
export function batchSendCouponNew(params) {
  return request({
    url: `${config.merGoods}/1.0/market/batchSendCouponNew`,
    method: 'post',
    data: params
  })
}

// 获取发券记录
export function couponHistoryList(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/couponHistoryList`,
    method: 'post',
    data: params
  })
}
// 删除发券记录
export function deleteSendHistory(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/deleteSendHistory`,
    method: 'post',
    data: params.ids
  })
}
// 发券详情
export function listCouponHistoryDetail(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/listCouponHistoryDetail`,
    method: 'post',
    data: params
  })
}

// 发券详情接口2
export function getCouponHistoryInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/coupon/getCouponHistoryInfo?id=${params.id}`,
    method: 'post',
    data: {}
  })
}
