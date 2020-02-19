/**
 *  节流函数
 * @param {function} 回调方法
 * @param {number} 等待时间
 */
function throttle(fn, wait) {
  let timer
  return function() {
    if (timer != null) return
    const context = this
    const args = arguments
    fn.apply(context, args)
    timer = setTimeout(() => {
      timer = null
    }, wait)
  }
}
export { throttle }
