/**
 * @author        quanquan
 * @dateTime      2020-06-19 12:30:12
 * @description   renovation
 */

import _ from 'lodash'
import store from '@/store'
import { uuid } from '@/utils' // eslint-disable-line
import RenovationService from '@/api/renovation'
import MarketingsService from '@/api/marketings'
import { bannerItem, handlerBackfill,items,defaultParams,agaSelectList } from '@/views/renovation/home/settings/_source/stepAssembly/default' // eslint-disable-line

const basics = {
  name: '', // 商家首页模板名称
  title: '', // 页面标题
  backgroundColor: '#FFFFFF', // 背景颜色
  borderFlag: 0, // 有无边框：0-无，1-有
  borderStyle: 0, // 边框样式：0-直角，1-圆角
  borderSize: 0, // 边框大小，单位px
  borderColor: '#FFFFFF', // 边框颜色，16进制值
  searchHint: '', // 搜索预显
  styleType: '', // 首页风格色系：custom-自定义，red-中国红，blue-气质蓝，gold-淡雅金
  shareDesc: '', // 分享描述
  shareImg: '', // 分享图片url
  recommendedData: []
}

const state = {
  stepVal: 1,
  homeLoading: false,
  basics: _.cloneDeep(basics),
  dragList: [],
  staticDragData: {
    banner: _.cloneDeep(bannerItem)
  },
  agaData: {},
  agaSelectList: _.cloneDeep(agaSelectList)
}

const mutations = {
  setAgaSelectList: (state, payload) => {
    state.agaSelectList = payload
  },
  setAgaData: (state, payload) => {
    state.agaData = _.assign(state.agaData, payload)
  },
  setRecommendedData: (state, payload) => {
    state.recommendedData = _.assign(state.recommendedData, payload)
  },
  setBasics: (state, payload) => {
    state.basics = _.assign(state.basics, payload)
  },
  setStepVal: (state, payload) => {
    state.stepVal = payload
  },
  saveAssembly: (state, payload) => {
    console.log(payload)
    // const { uuid, itemList } = payload
  },
  setStaticDragData: (state, payload) => {
    state.staticDragData = _.assign(state.staticDragData, payload)
  },
  setDragList: (state, payload) => {
    state.dragList = payload
  },
  setHomeLoading: (state, payload) => {
    state.homeLoading = payload
  },
  reset: (state, payload) => {
    state.stepVal = 1
    state.basics = _.cloneDeep(basics)
    state.dragList = []
    state.agaData = {}
    state.staticDragData.banner = _.cloneDeep(bannerItem)
    state.agaSelectList = _.cloneDeep(agaSelectList)
  }
}

const actions = {
  getAgaData({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      if (_.isEmpty(state.agaData)) {
        const p = {
          storeId: store.state.mall.centerStoreId,
          allFlag: true,
          actTypeList: [11, 12, 13, 14, 15]
        }
        RenovationService.getActivityCollection(p).then(res => {
          const { data } = res
          commit('setAgaData', data)

          state.agaSelectList = _.map(state.agaSelectList, v => {
            return {
              ...v,
              selected: !_.isEmpty(data[v.key]),
              disabled: _.isEmpty(data[v.key])
            }
          })
          resolve(data)
        }).catch(e => {
          reject(e)
        })
      } else {
        resolve(state.agaData)
      }
    })
  },
  getHomePage({ commit, state }, payload) {
    const { id } = payload
    RenovationService.getHomePage(id).then(res => {
      commit('setBasics', _.omit(res.data, ['list']))
      commit('setDragList', handlerBackfill(res.data))
      commit('setStaticDragData', {
        banner: {
          ..._.find(res.data.list, ['type', 'banner']),
          ..._.cloneDeep(defaultParams[`banner_first`])
        }
      })
    }).catch(() => {
    })
  },
  getDMPage({ commit, state }, payload) {
    const { id } = payload
    MarketingsService.getDMDetails(id).then(res => {
      commit('setBasics', _.omit(res.data, ['list']))
      commit('setDragList', handlerBackfill(res.data))
    }).catch(() => {
    })
  },
  saveHomeSetting({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const p = {
        list: [state.staticDragData.banner, ...state.dragList],
        ...state.basics
      }
      RenovationService.saveHomeSetting(p).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  updateHomeSetting({ commit, state }, payload) {
    const p = {
      list: [state.staticDragData.banner, ...state.dragList],
      ...state.basics,
      setIds: [state.staticDragData.banner.id, ..._.map(state.dragList, 'id')]
    }

    return new Promise((resolve, reject) => {
      RenovationService.updateHomeSetting(p).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  saveDMSetting({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const p = {
        list: [...state.dragList],
        ...state.basics
      }
      MarketingsService.saveDMSetting(p).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  updateDMSetting({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const p = {
        list: [...state.dragList],
        ...state.basics,
        setIds: [..._.map(state.dragList, 'id')]
      }
      MarketingsService.updateDMSetting(p).then(res => {
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
