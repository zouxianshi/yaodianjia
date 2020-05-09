
import request from '@/utils/request'
import config from '@/utils/config'

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
