import { getActList } from '@/api/activity'

const state = {
  tablist: [],
  pager: {
    total: 0,
    current: 1,
    size: 20
  },
  tabloading: false,
  // 计算参考价格
  mprice: 0,
  // 计算售卖价
  soulePrice: 0,
  // 计算重量
  weight: 0
}

const mutations = {
  // 更新列表数据
  SET_TABLE_DATA: (state, data) => {
    state.tablist = Array.isArray(data) ? data : []
  },
  // 更新列表页码
  SET_TABLE_PAGATION: (state, data) => {
    console.log('SET_TABLE_PAGATION', state)
    state.pager = {
      ...state.pager,
      ...data
    }
  },
  // 更新tableListloading
  SET_TABLE_LOADING: (state, data) => {
    state.tabloading = data
  },
  // 更新组合商品的计算值
  SET_TABLE_FORM_VALUE: (state, data) => {
    console.log('SET_TABLE_FORM_VALUE-----', state, data)
    state.mprice = data.mprice
    state.soulePrice = data.soulePrice
    state.weight = data.weight
  }
}

const actions = {
  // 获取数据列表
  getTablist({ commit, state }, params) {
    commit('SET_TABLE_LOADING', true)
    getActList(params).then(res => {
      const { code, data } = res
      if (code === '10000') {
        const { totalCount } = data
        commit('SET_TABLE_DATA', data && data.data)
        commit('SET_TABLE_PAGATION', {
          total: totalCount || 0
        })
        commit('SET_TABLE_LOADING', false)
      }
    }).catch(err => {
      console.log(err)
      commit('SET_TABLE_LOADING', false)
    })
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
