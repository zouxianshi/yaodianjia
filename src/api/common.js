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

// 查询门店列表
export function queryStores(params) {
  console.log('params', params)
  return request({
    url: `${config.merGoods}/1.0/store/queryStore`,
    method: 'post',
    data: params
  })
}

