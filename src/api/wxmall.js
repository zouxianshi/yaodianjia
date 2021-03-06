import request from '@/utils/request'
import config from '@/utils/config'

// 查询中心店
export function queryCenterStore(params) {
  console.log('params', params)
  return request({
    url: `${config.merGoods}/1.0/store/queryCenterStore/${params.merCode}`,
    method: 'get'
  })
}

// 查询（综合条件）轮播,公告,分类广告列表数据, 单个查询 pisitionCode 首页设置信息
export function getPageSets(params) {
  console.log('params', params)
  return request({
    url: `${config.merGoods}/1.0/pageset/_search`,
    method: 'post',
    data: params
  })
}

// 查询单个轮播,公告,分类广告详情
export function getPageSetDetail(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset/${params.id}`,
    method: 'get'
  })
}

// 新增轮播,公告,分类广告
export function addPageSet(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset`,
    method: 'post',
    data: params
  })
}

// 批量新增轮播,公告,分类广告
export function mutilAddPageSet(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset/_batch`,
    method: 'post',
    data: params
  })
}

// 修改轮播,公告,分类广告
export function editPageSet(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset`,
    method: 'put',
    data: params
  })
}

// 修改轮播,公告,分类广告状态
export function updatePageSetStatus(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset/_updateStatus`,
    method: 'put',
    data: params
  })
}

// 删除轮播,公告,分类广告
export function delPageSet(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset/${params.id}`,
    method: 'delete'
  })
}

// 广告分类
export function getADClass(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/getTypeTree`,
    method: 'post',
    data: params
  })
}

// 商品查询
export function getProductList(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset/queryMinProductList`,
    method: 'post',
    data: params
  })
}

// 商品查询
export function delProductList(params) {
  return request({
    url: `${config.merGoods}/1.0/pageset/codes`,
    method: 'post',
    data: params
  })
}
