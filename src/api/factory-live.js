import request from '@/utils/request'
import config from '@/utils/config'
import { param } from 'jquery'

/*
 优惠券管理
*/
// 查询当前直播
export function searchLiveData(params) {
  return request({
    url: `${config.merGoods}/1.0/statistics/history/list`,
    method: 'post',
    data: params
  })
}

// 删除直播
export function deleteLive(liveId) {
  return request({
    url: `${config.merGoods}/1.0/activity/delete?liveId=${liveId}`,
    method: 'get'
  })
}

export function getProduct(params) {
  return request({
    url: `${config.merchandise}/1.0/product/_search`,
    method: 'post',
    data: params
  })
}
export function factoryTotalData() {
  return request({
    url: `${config.merGoods}/1.0/statistics/factoryTotalData`,
    method: 'get'
  })
}
// 厂家历史直播场次列表
export function factoryList(params) {
  return request({
    url: `${config.merGoods}/1.0/statistics/history/factoryList`,
    method: 'post',
    data: params
  })
}

// 编辑厂家直播
export function updateLiveInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/activity/factoryEdit`,
    method: 'post',
    data: params
  })
}

// 单场直播订阅详情
export function subscriptionList(params) {
  return request({
    url: `${config.merGoods}/1.0/statistics/subscribe/list`,
    method: 'post',
    data: params,
    noMerCode: true
  })
}

// 厂家直播提交审核
export function submitAudit(params) {
  return request({
    url: `${config.merGoods}/1.0/activity/submitAudit`,
    method: 'post',
    data: params
  })
}

// 查询商户可订阅的所有厂家直播

export function subscribeableFactoryLive(params) {
  return request({
    url: `${config.merGoods}/1.0/factoryLive/list`,
    method: 'post',
    data: params
  })
}

// 订阅厂家直播
export function subLive(params) {
  return request({
    url: `${config.merGoods}/1.0/factoryLive/subscribe/${params.merCode}/${params.liveId}`,
    method: 'get',
    noMerCode: true
  })
}
// 取消订阅
export function unsubscribe(params) {
  return request({
    url: `${config.merGoods}/1.0/factoryLive/unsubscribe/${params.merCode}/${params.liveId}`,
    method: 'get',
    noMerCode: true
  })
}

// 生成二维i吗
export function getAppletsQrCode(params) {
  return request({
    url: `${config.merGoods}/1.0/activity/getAppletsQrCode`,
    method: 'post',
    data: params
  })
}

// 商户中心 已订阅  的 厂家直播相关

// 查询商户中心-厂家直播列表
export function yDyfactoryLive(params) {
  return request({
    url: `${config.merGoods}/1.0/activity/factoryLive/list`,
    method: 'post',
    data: params
  })
}

// 商户中心 - 厂家直播详情（分享、开播用）
export function yDyfactoryLiveDetail(params) {
  return request({
    url: `${config.merGoods}/1.0/activity/detail/${params.merCode}/${params.liveId}`,
    method: 'get',
    noMerCode: true
  })
}


// 商户中心 - 厂家直播详情 (编辑用)
export function yDyfactoryLiveDetailEdit(params) {
  return request({
    url: `${config.merGoods}/1.0/factoryLive/factoryDetail/${params.merCode}/${params.liveId}`,
    method: 'get',
    noMerCode: true
  })
}

// 编辑一订阅直播
export function editYDyfactoryLive(params) {
  return request({
    url: `${config.merGoods}/1.0/factoryLive/subscribe/edit`,
    method: 'post',
    data: params
  })
}