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

// 编辑活动
export function editExchange(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral`,
    method: 'put',
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
// 生效活动
export function sxExchange(params) {
  return request({
    url: `${config.merGoods}/1.0/act-info/effective/${params.id}`,
    method: 'post',
    data: {}
  })
}
// 删除活动
export function deleteExchange(params) {
  return request({
    url: `${config.merGoods}/1.0/act-info/${params.id}`,
    method: 'delete'
  })
}

// 查看活动
export function getExchangeInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral/${params.id}`,
    method: 'get'
  })
}

// 增加活动库存

export function addStock(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral/addStock`,
    method: 'post',
    data: params
  })
}

// 查询兑换商城是否开启
export function searchActivityStatus(params) {
  return request({
    url: `${config.merGoods}/1.0/pmtMerchantConfiguration/searchActivityStatus`,
    method: 'post',
    data: params
  })
}
// 修改兑换商城开启/关闭
export function activityOpenOrClose(params) {
  return request({
    url: `${config.merGoods}/1.0/pmtMerchantConfiguration/activityOpenOrClose`,
    method: 'post',
    data: params
  })
}

// 查询当前兑换比例
export function _searchBlByMerCode(params) {
  return request({
    url: `${config.merGoods}/1.0/merSet/_searchByMerCode?mercode=${params.merCode}&sysKey=integral_exchange_proportion`,
    method: 'post',
    data: {}
  })
}
