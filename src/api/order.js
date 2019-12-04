import request from '@/utils/request'
import config from '@/utils/config'
// import qs from 'qs'
// 获取订单列表数据
export function getOrderList(params) {
  return request({
    url: `${config.merGoods}/1.0/order-info`,
    method: 'post',
    data: params
  })
}

// 获取商家订单配置
export function getOrderSetUp(mercode) {
  return request({
    url: `${config.merGoods}/1.0/order-setup/${mercode}`,
    method: 'get'
  })
}

// 获取商家订单配置
export function getGoodsDetail(mercode) {
  return request({
    url: `${config.merGoods}/1.0/comm-detail/${mercode}`,
    method: 'get'
  })
}
