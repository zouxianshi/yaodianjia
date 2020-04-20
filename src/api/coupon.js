import request from '@/utils/request'
import config from '@/utils/config'

/*
 优惠券管理
*/

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
