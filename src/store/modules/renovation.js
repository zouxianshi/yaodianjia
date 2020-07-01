/**
 * @author        quanquan
 * @dateTime      2020-06-19 12:30:12
 * @description   renovation
 */

import _ from 'lodash'
import renovationService from '@/api/renovation'
import { bannerItem, handlerBackfill } from '@/views/renovation/home/settings/_source/stepAssembly/default'

const basics = {
  name: '', // 商家首页模板名称
  title: '', // 页面标题
  backgroundColor: '#FFFFFF', // 背景颜色
  borderFlag: 0, // 有无边框：0-无，1-有
  borderStyle: 0, // 边框样式：0-直角，1-圆角
  borderSize: 0, // 边框大小，单位px
  borderColor: '#FFFFFF', // 边框颜色，16进制值
  searchHint: '', // 搜索预显
  styleType: 'blue', // 首页风格色系：custome-自定义，red-中国红，blue-气质蓝，gold-淡雅金
  shareDesc: '', // 分享描述
  shareImg: '' // 分享图片url
}

const state = {
  stepVal: 2,
  homeLoading: false,
  basics: _.cloneDeep(basics),
  /* basics: {
    'name': 'name',
    'title': 'title',
    'backgroundColor': '#ffffff',
    'borderFlag': 1,
    'borderStyle': 1,
    'borderSize': 4,
    'borderColor': '#06B54A',
    'searchHint': '',
    'styleType': 'custome',
    'shareDesc': '分享描述',
    'shareImg': 'https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/ydjia-merchant-manager/666666/20200628/31c8d2d82575494ca2d88348c68e9785.png'
  },*/
  dragList: [],
  staticDragData: {
    banner: _.cloneDeep(bannerItem)
  }
}

const mutations = {
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
    state.staticDragData.banner = _.cloneDeep(bannerItem)
  }
}

const actions = {
  saveHomeSetting({ commit, state }, payload) {
    return new Promise((resolve, reject) => {
      const p = {
        list: [state.staticDragData.banner, ...state.dragList],
        ...state.basics
      }
      renovationService.homePageAdd(p).then(res => {
        resolve(res)
      }).catch(e => {
        reject(e)
      })
    })
  },
  getHomePage({ commit, state }, payload) {
    const { id } = payload
    renovationService.getHomePage(id).then(res => {
      commit('setBasics', _.omit(res.data, ['list']))
      commit('setDragList', handlerBackfill(res.data))
      commit('setStaticDragData', {
        banner: _.find(res.data.list, ['type', 'banner'])
      })
    }).catch(() => {
    })
  },
  saveHomePage({ commit, state }, payload) {
    console.log([state.staticDragData.banner.id, ..._.map(state.dragList, 'id')])
    const p = {
      list: [state.staticDragData.banner, ...state.dragList],
      ...state.basics,
      setIds: [state.staticDragData.banner.id, ..._.map(state.dragList, 'id')]
    }

    return new Promise((resolve, reject) => {
      renovationService.updateSetInfo(p).then(res => {
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
