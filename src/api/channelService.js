
import request from '@/utils/request'
import config from '@/utils/config'

//  获取内部链接
export function getSelfUrl(merCode) {
  return request({
    url: `${config.merGoods}/1.0/internal-link/${merCode}`,
    method: 'get'
  })
}

export function jumpAuthUrl(merCode) {
  return request({
    url: `${config.merGoods}/1.0/weeChatOpen/jumpAuthUrl/${merCode}`,
    method: 'get'
  })
}

export function checkAuthInfo(merCode) {
  return request({
    url: `${config.merGoods}/1.0/weeChatOpen/checkAuth/${merCode}`,
    method: 'get'
  })
}

export function getMenuData(merCode) {
  return request({
    url: `${config.merGoods}/1.0/weeChatMp/menu/get/${merCode}`,
    method: 'get'
  })
}

export function setMenuData(params, merCode) {
  return request({
    url: `${config.merGoods}/1.0/weeChatMp/menu/create/${merCode}`,
    method: 'post',
    data: params
  })
}
// 查询微信模板列表
export function searchWxTemp(merCode) {
  return request({
    url: `${config.merGoods}/1.0/wxTemplate/_searchWxTemp?${merCode}`,
    method: 'get'
  })
}
// 查询微信模板列表
export function setTemplate(params) {
  return request({
    url: `${config.merGoods}/1.0/wxTemplate/setTemplate`,
    method: 'post',
    data: params
  })
}

// 修改微信模板消息
export function setMerchantHN(params) {
  return request({
    url: `${config.merGoods}/1.0/wxTemplate/setMerchantHN?merCode=${params.merCode}&modelCode=${params.modelCode}&modelHead=${params.modelHead}&modelNote=${params.modelNote}`,
    method: 'post',
    data: {}
  })
}
