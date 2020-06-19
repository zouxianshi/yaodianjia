import { getInfo } from '@/api/user'
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
  resList: [],
  authResList: []
}

const mutations = {
  SET_AUTH_RESLIST: (state, authResList) => {
    state.authResList = authResList
  },
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
  }
  // SET_MERLOGO: (state, merLogo) => {
  //   state.merLogo = merLogo
  // }
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
        commit('SET_AUTH_RESLIST', resList)
        commit('SET_NAME', account)
        commit('SET_AVATAR', avatarPath)
        commit('SET_MERCODE', merCode)
        commit('SET_USERID', id)
        // commid('SET_MERLOGO', merLogo)
        MC.setConfig({
          userInfo: data || {},
          merCode
        })

        MC.directive()

        resolve(superAdmin ? { resList: ['admin'] } : { resList: resList })
      }).catch(error => {
        reject(error)
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
