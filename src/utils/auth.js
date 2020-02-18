
import Cookies from 'js-cookie'
const TokenKey = 'Authorization'
const doMain = document.domain.split('.').slice(-2).join('.') === 'localhost' ? 'localhost' : '.' + document.domain.split('.').slice(-2).join('.')

import { MC } from '/Users/gongzijian/WebstormProjects/hydee-perject/merchant-commons/src'

export function getToken() {
  return MC.getAuth()
}

export function removeToken() {
  MC.cleanCookie()
}

export function setToken(token) {
  var inFifteenMinutes = new Date(new Date().getTime() + 4 * 60 * 60 * 1000)
  return Cookies.set(TokenKey, token, { expires: inFifteenMinutes, path: '/', domain: doMain })
}

export function setSystem(name, cvalue) {
  Cookies.set(name, cvalue, { path: '/', domain: document.domain.split('.').slice(-2).join('.') })
}
