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
    url: `${config.merchandise}/1.0/store-spec/lock`,
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

// 根据按照门店-规格维度更新门店规格状态

export function setUpdateStoreData(data) {
  return request({
    url: `${config.merGoods}/1.0/store-spec/store-spec`,
    method: 'put',
    data: data,
    noMerCode: true
  })
}

// 获取当前账号下的门店
export function getMyStoreList(data) {
  return request({
    url: `${config.merchant}/1.0/store/my`,
    method: 'post',
    data: data
  })
}

// 同步价格
export function setSynchro(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-erp`,
    method: 'post',
    data: params
  })
}
