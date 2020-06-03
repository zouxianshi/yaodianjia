import request from '@/utils/request'
import config from '@/utils/config'

// 查询商户营销平台类型,type=1 进入老微商城,type=2 进入新药店加
export function queryPlatformType(params) {
  return request({
    url: `${config.merGoods}/1.0/merPlatformInfo/queryPlatformType/${params.merCode}`,
    method: 'post',
    data: {}
  })
}

// 查询中心店
export function queryCenterStore(params) {
  return request({
    url: `${config.merGoods}/1.0/store/queryCenterStore/${params.merCode}`,
    method: 'get'
  })
}

// 查询门店列表
export function queryStores(params) {
  return request({
    url: `${config.merGoods}/1.0/store/queryStore`,
    method: 'post',
    data: params
  })
}

// 查询门店列表-2(带权限)
export function queryMyStore(params) {
  return request({
    url: `${config.merGoods}/1.0/store/queryMyStore`,
    method: 'post',
    data: params
  })
}

// 查询商品列表 1
export function queryGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/list`,
    method: 'post',
    data: params
  })
}

// 获取商品分类树(	integer(类型，1-分类，2-分组)
export function getTypeTree(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/getTypeTree`,
    method: 'post',
    data: params,
    noMerCode: true
  })
}

// 获取所有门店
export function getAllStore(merCode) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/getAllStores/${merCode}`,
    method: 'get'
  })
}
