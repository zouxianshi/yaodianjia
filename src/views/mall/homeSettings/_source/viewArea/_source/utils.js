import _ from 'lodash'
import Vue from 'vue'
import { uuid } from '@/utils'
import { getRecommended } from '@/api/mallService'
import { findComponentsDownward } from '@/utils'
import { getPageSets } from '@/api/wxmall'
import { itemParams } from './../../_source/default'

export const jumpCurrentSet = ($root, item) => {
  const { type } = item
  const instance = findComponentsDownward($root, 'SettingsArea')[0]
  const setItem = item
  if (setItem.type === 'mall-title') {
    setItem.itemList = [itemParams]
  }
  // No caching update uuid.
  instance.setSelected(_.assign(setItem, {
    uuid: `${uuid(`${type}-`)}${uuid()}${uuid()}${uuid()}`
  }))
}

// verification rule
export const verifRequired = {
  title: itemList => _.some(itemList, { name: '' }),
  navigation: itemList => _.some(itemList, { img: '', url: '', name: '' }),
  advertise: itemList => _.some(itemList, { img: '', url: '' }),
  commodity: itemList => !_.isEmpty(itemList) ? _.some(itemList, { id: '' }) : true,
  recommend: () => false
}

export const toPosition = (uuid, n = 28) => {
  $('.hsm-hm').animate({ scrollTop: $(`#${uuid}`).position().top - n }, 400)
}

export const getRecommendedFormat = (that) => {
  return new Promise((resolve, reject) => {
    getRecommended().then(res => {
      const itemList = _.map(res.data.data, v => {
        const { centerStoreId, centerStoreName, h5Base, $store } = that
        const { commodityId, mainPic, mprice, name, lprice } = v
        return {
          id: commodityId,
          img: mainPic,
          mprice,
          name,
          price: lprice,
          productName: '',
          setId: '',
          sort: 0,
          specId: 0,
          typeId: '',
          url: `${h5Base}pages/details/index?productId=${commodityId}&storeId=${centerStoreId}&storeName=${centerStoreName}&merCode=${$store.state.user.merCode}`
        }
      })
      resolve(itemList)
    }).catch(e => {
      reject(e)
    })
  })
}

export const padNum = val => {
  if (val <= 9) {
    return '0' + val
  }
  return val
}

export const getNowFormatDate = () => {
  const date = new Date()
  const seperator1 = '-'
  const seperator2 = ':'
  let month = date.getMonth() + 1
  const strDate = date.getDate()
  if (month >= 1 && month <= 9) {
    month = '0' + month
  }
  const currentdate =
    date.getFullYear() +
    seperator1 +
    month +
    seperator1 +
    padNum(strDate) +
    ' ' +
    padNum(date.getHours()) +
    seperator2 +
    padNum(date.getMinutes()) +
    seperator2 +
    padNum(date.getSeconds())
  return currentdate
}

export const getBannerList = () => {
  return new Promise((resolve, reject) => {
    const p = {
      classId: '',
      displayTime: getNowFormatDate(),
      startTime: '',
      endTime: '',
      positionCode: 'I-03',
      remark: '',
      sortOrder: 1,
      status: 1
    }
    getPageSets(p).then(res => {
      resolve(_.map(res.data.data, v => {
        return {
          className: '',
          id: '',
          img: Vue.prototype.showImg(v.imageUrl),
          mprice: 0,
          name: '',
          price: 0,
          productName: '',
          setId: '',
          sort: 0,
          specId: 0,
          typeId: '',
          url: v.url
        }
      }))
    })
  })
}
