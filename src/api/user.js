import request from '@/utils/request'
import config from '@/utils/config'
import Cookies from 'js-cookie'

// 校验当前登录手机号是否激活过
export function checkSignPhone(params) {
  return request({
    url: `/1.0/acc/_queryAccountStatus/${params}`,
    method: 'post'
  })
}

export function getInfo(token) {
  return request({
    url: `${config.merchant}/1.0/acc`,
    method: 'get',
    params: {
      sys: Cookies.get('mc-system')
    }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
