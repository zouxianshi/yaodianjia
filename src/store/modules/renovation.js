/**
 * @author        quanquan
 * @dateTime      2020-06-19 12:30:12
 * @description   renovation
 */

import _ from 'lodash'
import renovationService from '@/api/renovation'
import { bannerItem } from '@/views/renovation/home/settings/_source/stepAssembly/default'

const state = {
  stepVal: 2,
  basicsBAK: {
    name: 'name', // 商家首页模板名称
    title: 'title', // 页面标题
    backgroundColor: '#FFFFFF', // 背景颜色
    borderFlag: 0, // 有无边框：0-无，1-有
    borderStyle: 0, // 边框样式：0-直角，1-圆角
    borderSize: 0, // 边框大小，单位px
    borderColor: '#FFFFFF', // 边框颜色，16进制值
    searchHint: '', // 搜索预显
    styleType: 'custome', // 首页风格色系：custome-自定义，red-中国红，blue-气质蓝，gold-淡雅金
    shareDesc: '', // 分享描述
    shareImg: '' // 分享图片url
  },
  basics: {
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
  },
  dragList: [],
  staticDragData: {
    banner: bannerItem
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
  }
}

const actions = {
  saveHomeSetting({ commit, state }, payload) {
    console.log(state.dragList)
    const p = {
      list: [state.staticDragData.banner, ...state.dragList],
      ...state.basics
    }

    console.log(p)

    renovationService.homePageAdd(p).then(() => {

    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
