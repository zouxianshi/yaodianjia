import request from '@/utils/request'
import config from '@/utils/config'
// 单品创建 新建
export function setGoodsAdd(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/self`,
    method: 'post',
    data: params
  })
}

// 更新商品基本信息
export function updateBasicInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity`,
    method: 'put',
    data: params
  })
}

// 获取商品品牌
export function getBrandList(params) {
  return request({
    url: `${config.merGoods}/1.0/brand/_search`,
    method: 'post',
    data: params
  })
}

// 获取新品申请记录
export function getNewGoodsRecord(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/newRecord`,
    method: 'post',
    data: params
  })
}

// 删除新品申请
export function deleteGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity`,
    method: 'delete',
    data: params
  })
}

// 根据一级分类查询规格
export function getSpecs(categoryId) {
  return request({
    url: `${config.merGoods}/1.0/product-sku/${categoryId}`,
    method: 'get'
  })
}

// 保存规格
export function setSpecsData(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-spec`,
    method: 'post',
    data: params
  })
}

// 保存图片
export function saveImg(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-img`,
    method: 'post',
    data: params
  })
}

// 保存商品说明 或更新
export function saveGoodsDetails(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-intro`,
    method: 'post',
    data: params
  })
}

// 商品的基本信息
export function getBasicGoodsInfo(commodityId, merCode) {
  return request({
    url: `${config.merGoods}/1.0/commodity/${commodityId}/${merCode}`,
    method: 'get'
  })
}

// 获取海典标库sku规格管理
export function getSpecsProductSKU(productId) {
  return request({
    url: `${config.merGoods}/1.0/pro-spec/_search/${productId}`,
    method: 'get'
  })
}

// 获取商品图片
export function getGoodsImgAry(commodityId) {
  return request({
    url: `${config.merGoods}/1.0/comm-img/${commodityId}`,
    method: 'get'
  })
}

// 加载商品说明
export function getGoodsIntro(commodityId) {
  return request({
    url: `${config.merGoods}/1.0/comm-intro/${commodityId}`,
    method: 'get'
  })
}
