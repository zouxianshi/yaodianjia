import request from '@/utils/request'
import config from '@/utils/config'
// import qs from 'qs'
// 获取组合商品列表数据
export function getConstituteGoodsList(params) {
  return request({
    url: `${config.merGoods}/1.0/assemble-comm/search`,
    method: 'post',
    data: params
  })
}
// 新增组合商品
export function addConstituteGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/assemble-comm`,
    method: 'post',
    data: params
  })
}

// 查询单个组合商品的基本信息
export function getConstituteGoodsInfo(commodityId, merCode) {
  return request({
    url: `${config.merGoods}/1.0/assemble-comm/${merCode}/${commodityId}`,
    method: 'get'
  })
}
// 修改组合商品
export function updateConstituteGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/assemble-comm`,
    method: 'put',
    data: params
  })
}

// 查询商品
export function getcommSpecGoodsList(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-spec/_searchSku`,
    method: 'post',
    data: params
  })
}
