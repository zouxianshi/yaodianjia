import { getInfo } from '@/api/user'

// 获取商户新、旧类型
import { queryPlatformType } from '@/api/common'

import { setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'
import { MC } from '@merchant/commons'
const state = {
  token: MC.getAuth(),
  name: '',
  avatar: '',
  userId: '',
  merCode: '',
  introduction: '',
  roles: [],
  resList: []
}
// H5地址
const h5Base = process.env.VUE_APP_H5_BASE || 'http://m.dev.ydjia.cn/h5/'
const healthBase = process.env.VUE_APP_HEALTH_BASE || 'https://m.dev.ydjia.cn/health/'
// 支付地址
const payH5Base = process.env.VUE_APP_PAY_H5_BASE || 'm.dev.ydjia.cn/h5/pages/order/'
const payHealthBase = process.env.VUE_APP_PAY_HEALTH_BASE || 'm.dev.ydjia.cn/health/pages/order/'

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERID: (state, id) => {
    state.userId = id
  },
  SET_MERCODE: (state, code) => {
    state.merCode = code
  },
  SET_RESLIST: (state, resList) => {
    state.resList = resList
  },
  SET_ACCOUNT: (state, id) => {
    state.account = id
  },
  // SET_MERLOGO: (state, merLogo) => {
  //   state.merLogo = merLogo
  // }
  SET_H5URL: (state, url) => {
    state.h5Url = url
  },
  SET_PAYURL: (state, url) => {
    state.payH5Url = url
  }
}

const actions = {
  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response
        const { account, avatarPath, merCode, resList, superAdmin, id } = data
        commit('SET_ROLES', superAdmin ? ['admin'] : resList)
        commit('SET_RESLIST', resList)
        commit('SET_NAME', account)
        commit('SET_AVATAR', avatarPath)
        commit('SET_MERCODE', merCode)
        commit('SET_USERID', id)
        // commid('SET_MERLOGO', merLogo)
        MC.setConfig({
          userInfo: data || {},
          merCode
        })
        resolve(superAdmin ? { resList: ['admin'] } : { resList: resList })
      }).catch(error => {
        reject(error)
      })
    })
  },
  getH5({ commit, state }) {
    return new Promise((resolve, reject) => {
      queryPlatformType({ merCode: state.merCode }).then(res => {
        const { data } = res
        const url = data === 1 ? h5Base : healthBase
        commit('SET_H5URL', url)
        resolve('111')
      }).catch(() => {
        reject('111')
      })
    })
  },
  getPayH5({ commit, state }) {
    return new Promise((resolve, reject) => {
      queryPlatformType({ merCode: state.merCode }).then(res => {
        const { data } = res
        const url = data === 1 ? payH5Base : payHealthBase
        commit('SET_PAYURL', url)
        resolve('111')
      }).catch(() => {
        reject('111')
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
