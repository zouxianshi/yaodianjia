import request from '@/utils/request'
import config from '@/utils/config'
/** *
 * 营销活动 -- 兑换商城
 */

// 查询活动列表
export function searchExchangeList(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral/_search`,
    method: 'post',
    data: params
  })
}

// 新建兑换商城活动
export function cerateExchange(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral`,
    method: 'post',
    data: params
  })
}

// 失效活动
export function failureExchange(params) {
  return request({
    url: `${config.merGoods}/1.0/act-info/${params.id}`,
    method: 'post',
    data: {}
  })
}
// 删除活动
export function deleteExchange(params) {
  return request({
    url: `${config.merGoods}/1.0/act-info/${params.id}`,
    expmethod: 'delete'
  })
}

// 查看活动
export function getExchangeInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral/${params.id}`,
    expmethod: 'get'
  })
}

// 增加活动库存

export function addStock(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral/addStock`,
    expmethod: 'post',
    data: params
  })
}
