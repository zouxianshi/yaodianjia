import { getTypeTree, setAddGroup, delGroup, updateGroup } from '@/api/group'

function mapData(data) {
  data.map(v => {
    if (!v.children) {
      v.children = []
    }
    if (v.children) {
      mapData(v.children)
    }
    v.show = false
  })
  return data
}

const state = {
  list: []
}

const mutations = {
  SET_GROUP: (state, row) => {
    state.list = row
  },
  UPDATE_GROUP: (state, row) => {
    state.list = row
  },
  RESET_GROUP: (state, row) => {
    state.list = row
  }
}

const actions = {
  getGroupList({ commit, state }, { merCode, id }) {
    // 根据分组维度获取该维度下的所有分类
    getTypeTree({ merCode: merCode, type: 2, dimensionId: id }).then(res => {
      const { data } = res
      commit('SET_GROUP', mapData(data))
    })
  },
  updateGroup({ commit, state }, data) {
    commit('UPDATE_GROUP', data)
  },
  createGroup({ commit, state }, data) { // 新建分组
    return new Promise((resolve, reject) => {
      setAddGroup(data).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  removeGroup({ commit }, id) { // 删除分组
    return new Promise((resolve, reject) => {
      delGroup(id).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  modifyGroup({ commit }, data) { // 修改分组
    return new Promise((reslove, reject) => {
      updateGroup(data).then(res => {
        reslove(res)
      }).catch(err => {
        reject(err)
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
