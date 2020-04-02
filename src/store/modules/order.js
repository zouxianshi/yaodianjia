import { getExpressCompany } from '@/api/order'
const state = {
  expressData: [] // 快递数据源
}

const mutations = {
  SET_EXPRESSDATA(state, payload) {
    // console.log('SET_EXPRESSDATA data', payload)
    state.expressData = payload.data
  }
}

const actions = {
  getExpressData({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      getExpressCompany(payload).then(res => {
        const { data } = res.data
        // console.log('getExpressCompany data', data)
        commit('SET_EXPRESSDATA', {
          data
        })
        resolve(data)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
