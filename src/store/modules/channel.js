/**
 * @author        quanquan
 * @dateTime      2020-04-07 09:41:41
 * @description   渠道store
 */

import _ from 'lodash'

const state = {
  VUE_APP_MEMBER_CENTER: `https://www.baidu.com`,
  menuData: [
    {
      name: '菜单一',
      sub_button: [
        {
          'name': '二级菜单1',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单2',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单3',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单4',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单5',
          'type': 'string',
          'url': 'string'
        }
      ],
      type: 'view',
      url: 'http://www.baidu.com',
      active: true
    },
    {
      name: '菜单二',
      'sub_button': [
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        }
      ],
      type: 'view',
      url: 'http://www.baidu.com',
      active: false
    },
    {
      name: '菜单三',
      'sub_button': [
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        },
        {
          'name': '二级菜单',
          'type': 'string',
          'url': 'string'
        }
      ],
      type: 'view',
      url: 'http://www.baidu.com',
      active: false
    }
  ]
}
const mutations = {
  editMenu(state, payload) {
    const { name, level1Index, level2Index } = payload
    if (level2Index === -1) {
      state.menuData[level1Index].name = name
    } else {
      console.log(state.menuData[level1Index])
      state.menuData[level1Index].sub_button[level2Index].name = name
    }
    state.menuData = _.map(state.menuData, (v, i) => {
      v.active = i === level1Index
      return v
    })
  },
  delMenu(state, payload) {
    const { level1Index, level2Index } = payload
    if (level2Index === -1) {
      _.drop(state.menuData, level1Index)
    } else {
      _.drop(state.menuData[level1Index].sub_button, level2Index)
    }
    console.log(state.menuData)
  }
}
const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
