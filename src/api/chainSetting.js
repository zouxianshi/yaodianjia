import request from '@/utils/request'
const api_wxmall = '/mer-manager'

// 查询旗舰店
export function getFlagship(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/store/queryCenterStore/${params.merCode}`,
    method: 'get',
    data: null
  })
}

// 查询门店
export function queryStore(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/store/queryStore`,
    method: 'post',
    data: params
  })
}
// 设置旗舰店
export function addCenter(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/store/addCenter`,
    method: 'post',
    data: params
  })
}
// 获取支付设置
export function getPayset(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/payset/_search`,
    method: 'post',
    data: params
  })
}
// 设置支付设置
export function setPayset(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/payset`,
    method: 'post',
    data: params
  })
}
// 获取订单支付方式
export function getOrderPayset(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/payset/${params}`,
    method: 'get',
    data: null
  })
}
// 设置订单支付方式
export function setOrderPayset(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/payset/order`,
    method: 'post',
    data: params
  })
}
// 获取省
export function getProvince() {
  return request({
    url: `${api_wxmall}/1.0/area/_search`,
    method: 'post',
    data: {
      areaType: 2,
      parentId: 1
    }
  })
}
// 保存快递区域信息
export function saveDelivery(params) {
  return request({
    url: `${api_wxmall}/1.0/delivery-set`,
    method: 'post',
    data: params
  })
}
// 获取快递区域信息
export function getDelivery(params) {
  return request({
    url: `${api_wxmall}/1.0/delivery-set/_search/${params}`,
    method: 'get',
    data: null
  })
}

// 导出商品
export function exportData(params) {
  return request({
    url: `${api_wxmall}/1.0/store/_export`,
    method: 'post',
    data: params,
    isExport: true,
    responseType: 'blob'
  })
}
// 获取商家资质
export function getMerCertificate(params) {
  return request({
    url: `${api_wxmall}/1.0/mer-certificate/${params}`,
    method: 'get',
    data: null
  })
}
// 新增商家资质
export function createMerCertificate(params) {
  return request({
    url: `${api_wxmall}/1.0/mer-certificate`,
    method: 'post',
    data: params
  })
}
// 修改商家资质
export function editMerCertificate(params) {
  return request({
    url: `${api_wxmall}/1.0/mer-certificate`,
    method: 'put',
    data: params
  })
}
// 删除商家资质
export function delMerCertificate(params) {
  return request({
    url: `${api_wxmall}/1.0/mer-certificate/${params.merCode}/${params.id}/`,
    method: 'delete',
    data: params
  })
}
// 上线或下线门店
export function onOffStore(params) {
  return request({
    url: `${api_wxmall}/1.0/store/onOffStore`,
    method: 'post',
    data: params
  })
}
// 上线或下线门店数量
export function queryStoreNum(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/store/queryStoreNum/${params.merCode}/medical`,
    method: 'get',
    data: null
  })
}
// 获取配送规则
export function getDeliverySettings(params) {
  return request({
    url: `${api_wxmall}/1.0/distribute-set/_search/${params}`,
    method: 'get',
    data: null
  })
}
// 保存配送规则
export function saveDeliverySettings(params) {
  return request({
    url: `${api_wxmall}/1.0/distribute-set`,
    method: 'post',
    data: params
  })
}
// 获取内部链接
export function getInternalLink(params) {
  return request({
    url: `${api_wxmall}/1.0/internal-link/${params}`,
    method: 'get',
    data: null
  })
}
