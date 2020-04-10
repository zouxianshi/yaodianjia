import { getAssembleList } from '@/api/activity'

const state = {
  tablist: [],
  pager: {
    total: 0,
    current: 1,
    size: 10
  },
  tabloading: false
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
  }
}

const actions = {
  // 获取数据列表
  getTablist({ commit, state }, params) {
    commit('SET_TABLE_LOADING', true)
    getAssembleList(params).then(res => {
      const { code, data } = res
      if (code === '10000') {
        const { currentPage, totalCount, pageSize } = data
        commit('SET_TABLE_DATA', data && data.data)
        commit('SET_TABLE_PAGATION', {
          total: totalCount || 0,
          current: currentPage || 1,
          size: pageSize || 10
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
