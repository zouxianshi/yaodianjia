/**
 * @author        quanquan
 * @dateTime      2020-04-14 10:12:18
 * @description   mall
 */

// import _ from 'lodash'
import { uuid } from '@/utils'
import navigation from '@/views/mall/homeSettings/_source/viewArea/navigation/default'

/**
 * 默认无数据状态
 */
const noData = [
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
    uuid: `${uuid('commodity-')}${uuid()}${uuid()}${uuid()}`,
    name: '商品',
    type: 'first',
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
    type: 'first',
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
  }
]

const state = {
  dragData: [...noData]
}

const mutations = {
  setDragData: (state, payload) => {
    state.dragData = payload
  },
  setItemDragData: (state, payload) => {
    const { data, $index } = payload
    state.dragData[$index].data = data
  },
  delDragData: (state, payload) => {
    const { $index } = payload
    state.dragData.splice($index, 1)
  }
}

const actions = {
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
