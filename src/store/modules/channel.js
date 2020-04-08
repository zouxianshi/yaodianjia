/**
 * @author        quanquan
 * @dateTime      2020-04-07 09:41:41
 * @description   渠道store
 */

import _ from 'lodash'

const state = {
  VUE_APP_MEMBER_CENTER: `https://www.google.com`,
  menuData: [
    {
      name: '菜单一',
      sub_button: [
      ],
      type: 'view',
      url: 'http://www.baidu.com',
      active: true
    }

  ]
  // menuData:[]
}
const mutations = {
  addMenuLevel1(state, payload) {
    state.menuData.push(payload)
  },
  editMenu(state, payload) {
    const { item, level1Index, level2Index } = payload
    if (level2Index === -1) {
      state.menuData[level1Index] = _.assign(state.menuData[level1Index], item)
    } else {
      state.menuData[level1Index].sub_button[level2Index] = _.assign(state.menuData[level1Index].sub_button[level2Index], item)
    }
    state.menuData = _.map(state.menuData, (v, i) => {
      v.active = i === level1Index
      return v
    })
  },
  delMenu(state, payload) {
    const { level1Index, level2Index } = payload
    const menuData = state.menuData
    if (level2Index === -1) {
      menuData.splice(level1Index, 1)
      state.menuData = menuData
    } else {
      const subButton = menuData[level1Index].sub_button
      subButton.splice(level2Index, 1)
      state.menuData[level1Index].sub_button = subButton
    }
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
