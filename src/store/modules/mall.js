/**
 * @author        quanquan
 * @dateTime      2020-04-14 10:12:18
 * @description   mall
 */

import _ from 'lodash'
import { queryCenterStore } from '@/api/common'
import { saveStructure, saveAssembly } from '@/api/mallService'
import { noDragData, noDragGlobal } from '@/views/mall/homeSettings/_source/_source/default'

const state = {
  centerStoreId: '',
  centerStoreName: '',
  dragGlobal: { ...noDragGlobal },
  dragData: [...noDragData],
  vaLoading: false,
  saLoading: false
}

const mutations = {
  setCenterStore: (state, payload) => {
    const { id, stName } = payload
    state.centerStoreId = id
    state.centerStoreName = stName
  },
  setDragGlobal: (state, payload) => {
    state.dragGlobal = { ...state.dragGlobal, ...payload }
  },
  setUUidDragData: (state, payload) => {
    const { uuid } = payload
    const i = _.findIndex(state.dragData, ['uuid', uuid])
    state.dragData[i] = _.assign(state.dragData[i], payload)
  },
  setDragData: (state, payload) => {
    state.dragData = payload
  },
  setItemDragData: (state, payload) => {
    const { itemList, $index } = payload
    state.dragData[$index].itemList = itemList
  },
  delDragData: (state, payload) => {
    const { $index } = payload
    state.dragData.splice($index, 1)
    if (!state.dragData.length) {
      state.dragData.push(...noDragData)
    }
  },
  setHomeName: (state, payload) => {
    state.dragGlobal.title = payload
  },
  setLoading: (state, payload) => {
    const { is, type } = payload
    if (type === 'sa') {
      state.saLoading = is
    } else {
      state.vaLoading = is
    }
  }
}

const actions = {
  getCenterStoreId({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      queryCenterStore(payload).then(res => {
        const { id, stName } = res.data
        commit('setCenterStore', { id, stName })
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  saveStructure({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      // console.log(JSON.stringify({...state.dragGlobal,id: state.dragData[0].dimensionId}))
      // return
      console.log(state.dragData)
      const p = { ...state.dragGlobal, setIds: _.compact(_.map(state.dragData, v => v.id)) }
      saveStructure(p).then(() => {
        resolve()
      }).catch(() => {
        reject()
      })
    })
  },
  saveAssembly({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const { searchParams, uuid } = payload
      saveAssembly(searchParams).then(res => {
        const { dimensionId, id } = res.data
        if (!state.dragGlobal.id) {
          commit('setDragGlobal', { id: dimensionId })
        }
        commit('setUUidDragData', { uuid, ...searchParams, ...res.data, error: false, id })
        resolve(res)
      }).catch(e => {
        reject(e)
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
