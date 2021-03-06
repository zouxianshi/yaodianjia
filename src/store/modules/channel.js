/**
 * @author        quanquan
 * @dateTime      2020-04-07 09:41:41
 * @description   渠道store
 */

import _ from 'lodash'
import store from '@/store'
// import { MC } from '@merchant/commons'
import { setMenuData } from '@/api/channelService'

const handlerActive = (data, index) => {
  const d = data
  _.map(d, (v, i) => {
    v.active = false
    if (i === index) v.active = true
  })
  return d
}

const state = {
  VUE_APP_MEMBER_CENTER: process.env.VUE_APP_ENV ? `${process.env.VUE_APP_MEMBER_CENTER}?mercode=` : `https://mall.hydee.cn/h5/pages/user/index?mercode=`,
  loading: false,
  menuData: []
  /* menuData: [
    {
      name: '菜单一',
      sub_button: [
        {
          name: '二级菜单',
          type: 'view',
          url: 'http://www.baidu.com',
          active: true
        }
      ],
      type: 'view',
      url: 'http://www.baidu.com',
      active: true
    }
  ]*/
}
const mutations = {
  setMenuData(state, payload) {
    state.menuData = payload
  },
  setLoading(state, payload) {
    state.loading = payload
  },
  addMenuLevel1(state, payload) {
    console.log(payload)
    const { item } = payload
    state.menuData.push(item)
  },
  addMenuLevel2(state, payload) {
    const { item, level1Index } = payload
    state.menuData = handlerActive(state.menuData, level1Index)
    state.menuData[level1Index].sub_button.push(item)
  },
  editMenu(state, payload) {
    const { item, level1Index, level2Index } = payload
    if (level2Index === -1) {
      state.menuData[level1Index] = _.assign(state.menuData[level1Index], item)
      console.log(state.menuData)
    } else {
      state.menuData[level1Index].sub_button[level2Index] = _.assign(state.menuData[level1Index].sub_button[level2Index], item)
    }
    state.menuData = _.map(state.menuData, (v, i) => {
      v.active = i === level1Index
      return v
    })
    console.log(state.menuData)
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
const actions = {
  saveCustomMenu({ commit, state }) {
    commit('setLoading', true)
    // handler available back-end data structures
    const { VUE_APP_MEMBER_CENTER, menuData } = state
    console.log(state.menuData)
    const button = _.cloneDeep(menuData)
    // handler request data
    _.map(button, v => {
      delete v.active
      if (v.type === 'memberCard') {
        v.url = VUE_APP_MEMBER_CENTER
        v.type = 'view'
      }
      if (v.sub_button.length) {
        v.url = ''
        v.type = ''
        _.map(v.sub_button, v1 => {
          if (v1.type === 'memberCard') {
            v1.url = VUE_APP_MEMBER_CENTER
            v1.type = 'view'
          }
        })
      }
    })

    return new Promise((resolve, reject) => {
      setMenuData({ button }, store.state.user.merCode).then((res) => {
        setTimeout(() => {
          commit('setLoading', false)
          resolve()
        }, 800)
      }).catch((err) => {
        reject(err)
        commit('setLoading', false)
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
