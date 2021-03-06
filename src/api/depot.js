import request from '@/utils/request'
import config from '@/utils/config'
// 获取商品库商品列表
export function getGoodsList(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/list`,
    method: 'post',
    data: params
  })
}

// 获取左侧商品分组树结构
export function goodsClass(params) {
  return request({
    url: '/1.0/org/' + params.id,
    method: 'get'
  })
}

// 导出商品
export function exportData(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/export`,
    method: 'post',
    data: params,
    isExport: true,
    responseType: 'blob'
  })
}

// 导出商品--新
export function exportDataNew(params) {
  return request({
    url: `${config.merchandise}/1.0/ds/op/file/template/product/export`,
    method: 'post',
    data: params,
    isExport: true,
    responseType: 'blob'
  })
}
// 获取标库商品列表
export function getProductList(params) {
  return request({
    url: `${config.merGoods}/product/list`,
    method: 'post',
    data: params
  })
}

// 从标库中添加商品
export function setComAddGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity`,
    method: 'post',
    data: params
  })
}

// 校验海典标库商品是否已导入
export function checkComGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/check`,
    method: 'post',
    data: params
  })
}

// 获取门店列表
export function getStoreList(params) {
  return request({
    url: `${config.merchant}/1.0/store/_search`,
    method: 'post',
    data: params
  })
}
// 单个商品的所有门店上架状态查询
export function getStoreOnlineList(params) {
  return request({
    url: `${config.merGoods}/1.0/store-spec/online-status`,
    method: 'post',
    data: params
  })
}
// 批量上下架商品
export function setBatchUpdown(params) {
  return request({
    url: `${config.merGoods}/1.0/store-spec/storeStatus`,
    method: 'put',
    data: params
  })
}

// 批量修改分组
export function setBatchGroup(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-relate/_group`,
    method: 'post',
    data: params
  })
}

// 批量设置限购
export function setLimitBuyNum(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/_limit`,
    method: 'post',
    data: params
  })
}

// 导入历史
export function getImportList(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-match/_search`,
    method: 'post',
    data: params
  })
}
// 导入历史
export function getImportRecode(params) {
  return request({
    url: `${config.merGoods}/1.0/excel/_search`,
    method: 'post',
    data: params
  })
}
// 删除匹配
export function deletePair(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-match/_delete`,
    method: 'post',
    data: params,
    noMerCode: true
  })
}

// 获取对码重新匹配数据
export function getMatchList(id) {
  return request({
    url: `${config.merGoods}/product/getMatchList/${id}`,
    method: 'get'
  })
}

// 重新匹配(重新对码)
export function mateAgain(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-match/again`,
    method: 'post',
    data: params
  })
}

// 确认对码
export function setMateCode(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-match/confirm`,
    method: 'post',
    data: params
  })
}

// 解除对码关系
export function removeMateCode(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-match`,
    method: 'put',
    data: params
  })
}

// 对码失败商品信息全量导出
export function exportNotMatch(merCode) {
  return request({
    url: `${config.merGoods}/1.0/comm-match/exportNotMatch/${merCode}`,
    method: 'post',
    isExport: true,
    responseType: 'blob'
  })
}

// 删除商品
export function delGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-spec/_delete`,
    method: 'post',
    data: params
  })
}
