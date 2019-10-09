import request from '@/utils/request'

// 获取门店列表
export function getStoreList(params) {
  return request({
    url: '/1.0/store/_search',
    method: 'post',
    data: params
  })
}

// 获取门店信息
export function getStoreInfo(params) {
  return request({
    url: `/1.0/store/${params.id}`,
    method: 'get'
  })
}

// 获取门店服务
export function getStoreService(params) {
  return request({
    url: `/1.0/code/_search`,
    method: 'post',
    data: params
  })
}

// 修改门店信息
export function setModifyStore(params) {
  return request({
    url: '/1.0/store',
    method: 'put',
    data: params
  })
}

// 获取区域信息
export function getAreaData(params) {
  return request({
    url: '/1.0/area/_search',
    method: 'post',
    data: params
  })
}

// 导出门店数据
export function exportData(params) {
  return request({
    url: '/1.0/store/_export',
    method: 'post',
    data: params,
    isExport: true,
    responseType: 'blob'
  })
}
