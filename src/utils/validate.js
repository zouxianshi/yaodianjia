/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}

// 校验手机号码
export function checkPhone(value) {
  const telreg = /^1[0-9]{10}$/
  if (!telreg.test(value)) {
    return false
  } else {
    return true
  }
}

export function checkPhoneAndNumber(value) {
  const isMobile = (/^[1]\d{10}$/).test(value) && (/^[1-9]\d*$/).test(value) && value.length === 11
  const isTel = (/^(0\d{2,3}-\d{7,8})$/).test(value)
  const isTel2 = (/^(0\d{2,3}-\d{7,8}-\d{3,4})$/).test(value)

  if (!isMobile && !isTel && !isTel2) {
    return false
  } else {
    return true
  }
}
// 邮箱校验
export function checkEmail(value) {
  const reg = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g
  if (!reg.test(value)) {
    return false
  } else {
    return true
  }
}

// 校验两位小数
export function checkNumberdouble(value) {
  // const reg = /(^([0-9]+|0)$)|(^(([0-9]+|0)\.([0-9]{1,2}))$)/
  const reg = /^([1-9]\d{0,9}|0)([.]?|(\.\d{1,2})?)$/
  return reg.test(value)
}
//  只能输入 字母数字 字符
export function checkZmSZ(value) {
  const reg = /^[0-9a-zA-Z]*$/g
  return reg.test(value)
}
