/**
 * @author        quanquan
 * @dateTime      2020-04-14 10:12:18
 * @description   mall
 */

// import _ from 'lodash'
// import { uuid } from '@/utils'
import { queryCenterStore } from '@/api/common'
import { saveStructure, saveAssembly } from '@/api/mallService'
import { noDragData, noDragGlobal } from '@/views/mall/homeSettings/_source/_source/default'

/* const testData = [
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'first',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
    name: '导航栏',
    type: 'second',
    code: 'navigation',
    data: navigation.second
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'four',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'third',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'second',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'first',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
    name: '导航栏',
    type: 'second',
    code: 'navigation',
    data: navigation.second
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '为你推荐',
    type: 'second',
    code: 'recommend',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '为你推荐',
    type: 'first',
    code: 'recommend',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'four',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'third',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'second',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'five',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
    name: '标题',
    type: 'first',
    code: 'title',
    data: ''
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'third',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'four',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'second',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'first',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
    name: '导航栏',
    type: 'second',
    code: 'navigation',
    data: navigation.second
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'four',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'third',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'second',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'first',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('navigation-')}${uuid()}${uuid()}${uuid()}`,
    name: '导航栏',
    type: 'second',
    code: 'navigation',
    data: navigation.second
  },
  {
    uuid: `${uuid('no-data-')}${uuid()}${uuid()}${uuid()}`,
    name: 'no-data',
    type: 'no-data',
    code: 'no-data',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '为你推荐',
    type: 'second',
    code: 'recommend',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '为你推荐',
    type: 'first',
    code: 'recommend',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'four',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'third',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'second',
    code: 'commodity',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'five',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('title-')}${uuid()}${uuid()}${uuid()}`,
    name: '标题',
    type: 'first',
    code: 'title',
    data: ''
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'third',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'four',
    code: 'advertise',
    data: []
  },
  {
    uuid: `${uuid('advertise-')}${uuid()}${uuid()}${uuid()}`,
    name: '广告图',
    type: 'second',
    code: 'advertise',
    data: []
  }
]*/

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
      const p = { ...state.dragGlobal, id: state.dragData[0].dimensionId, setIds: _.map(state.dragData, v => v.id) }
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
        const { dimensionId } = res.data
        if (!state.dragGlobal.id) {
          commit('setDragGlobal', { id: dimensionId })
        }
        commit('setUUidDragData', { uuid, ...searchParams, ...res.data, error: false })
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
