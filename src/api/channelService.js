import request from '@/utils/request'
import config from '@/utils/config'
import { MC } from '@merchant/commons'

const merCode = MC.getCookie('mc-mercode')

export function jumpAuthUrl() {
  return request({
    url: `${config.merGoods}/1.0/weeChatOpen/jumpAuthUrl/${merCode}`,
    method: 'get'
  })
}

export function checkAuthInfo() {
  return request({
    url: `${config.merGoods}/1.0/weeChatOpen/checkAuth/${merCode}`,
    method: 'get'
  })
}

export function getMenuData() {
  return request({
    url: `${config.merGoods}/1.0/weeChatMp/menu/get/${merCode}`,
    method: 'get'
  })
}

export function setMenuData(params) {
  return request({
    url: `${config.merGoods}/1.0/weeChatMp/menu/create/${merCode}`,
    method: 'post',
    data: params
  })
}
