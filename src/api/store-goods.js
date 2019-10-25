import request from '@/utils/request'
import config from '@/utils/config'
// import qs from 'qs'
// 获取门店商品数据
export function getStoreGoodsList(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-spec/_search`,
    method: 'post',
    data: params
  })
}

// 锁定价格
export function setLockPrice(params) {
  return request({
    url: `${config.merGoods}/1.0/store-spec/lock`,
    method: 'put',
    data: params
  })
}

// 批量修改库存和价格
export function setUpdatePriceStock(data) {
  return request({
    url: `${config.merGoods}/1.0/store-spec`,
    method: 'put',
    data: data,
    noMerCode: true
  })
}
