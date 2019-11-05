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
