import request from '@/utils/request'

// 校验当前登录手机号是否激活过
export function checkSignPhone(params) {
  return request({
    url: `/1.0/acc/_queryAccountStatus/${params}`,
    method: 'post'
  })
}

// 获取登录二维码
export function getLoginQrCode(data) {
  return request({
    url: '/v1/scanLogin/getScanElement',
    method: 'get'
  })
}

// 获取app是否扫码登录了
export function getAppLogin(params) {
  return request({
    url: '/v1/scanLogin/isAppLoginCompleted',
    method: 'get',
    params
  })
}

export function getInfo(token) {
  return request({
    url: '/1.0/acc',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

// 账号密码登录
export function login(params) {
  return request({
    url: '/1.0/acc/_login',
    method: 'post',
    data: params
  })
}

// 校验图形验证码
export function sendMsgCode(params) {
  return request({
    url: '/1.0/verification/_sendCode',
    method: 'post',
    data: params
  })
}

// 校验短信校验码
export function checkMsgCode(params) {
  return request({
    url: '/1.0/verification/_checkVerificationCode',
    method: 'post',
    data: params
  })
}

// 设置密码并激活
export function setPassword(params) {
  return request({
    url: '/1.0/acc/_activateAccount',
    method: 'post',
    data: params
  })
}
