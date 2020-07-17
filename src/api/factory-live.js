import request from '@/utils/request'
import config from '@/utils/config'

/*
 优惠券管理
*/
// 查询当前直播
export function searchLiveData(params) {
  return request({
    url: `${config.merGoods}/1.0/statistics/history/list`,
    method: 'post',
    data: params
  })
}
export function getProduct(params) {
  return request({
    url: `${config.merchandise}/1.0/product/_search`,
    method: 'post',
    data: params
  })
}
