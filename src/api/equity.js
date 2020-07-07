import request from '@/utils/request'
import config from '@/utils/config'
import store from '@/store'
// import qs from 'qs'
// 新增或修改商户配置信息
export function editMerChantsearch(params) {
  return request({
    url: `${config.merGoods}/1.0/merSet/_searchByMerCode?${params}`,
    method: 'post'
  })
}
// 新增或修改商户配置信息
export function editMerChantSet(params) {
  return request({
    url: `${config.merGoods}/1.0/merSet/editMerChantSet`,
    method: 'post',
    data: params
  })
}

// 新增或修改商户消费送海贝规则
export function saveExchangeHb(params) {
  return request({
    url: `${config.merGoods}/1.0/exchangeRuleSet`,
    method: 'post',
    data: params
  })
}

// 查询商户消费送海贝规则
export function queryExchangeHb() {
  const merCode = store.state.user.merCode
  return request({
    url: `${config.merGoods}/1.0/exchangeRuleSet/${merCode}`,
    method: 'get'
  })
}
