
import Cookies from 'js-cookie'
const TokenKey = 'Authorization'
const doMain = document.domain.split('.').slice(-2).join('.') === 'localhost' ? 'localhost' : '.' + document.domain.split('.').slice(-2).join('.')

export function getToken() {
  return Cookies.get(TokenKey, { domain: doMain })
}

export function removeToken() {
  Cookies.remove(TokenKey, { path: '/', domain: doMain })
}

export function setToken(token) {
  return Cookies.set(TokenKey, token, { expires: 7, path: '/', domain: doMain })
}

export function setSystem(name, cvalue) {
  Cookies.set(name, cvalue, { path: '/', domain: document.domain.split('.').slice(-2).join('.') })
}
