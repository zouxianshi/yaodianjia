import store from '@/store'

export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    if (!store.getters.roles.includes('admin') && value !== 1) {
      el.parentNode && el.parentNode.removeChild(el)
    }
  }
}
