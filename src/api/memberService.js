import request from '@/utils/request'
import config from '@/utils/config'

/**
 * 检查会员卡开通状态
 */
export function checkMemberCard(params) {
  return request({
    url: `${config.merGoods}/1.0/memberCard/check/${params.merCode}`,
    method: 'get'
  })
}
// 编辑会员卡
export function editMemberInfo(data) {
  return request({
    url: `${config.merGoods}/1.0/memberCard/edit`,
    method: 'post',
    data
  })
}
// 查询会员卡信息
export function getMemberInfo(merCode) {
  return request({
    url: `${config.merGoods}/1.0/memberCard/query/${merCode}`,
    method: 'get'
  })
}
// 小程序二维码
export function getQrcode(params) {
  return request({
    url: `${config.merGoods}/1.0/weeChatMa/queryUrl/${params.merCode}`,
    method: 'get'
  })
}
// 获取颜色
export function getColor(params) {
  return request({
    url: `${config.merGoods}/1.0/weeChatMp/cardColor`,
    method: 'get'
  })
}

// 查询会员列表
export function queryMembers(merCode) {
  return request({
    url: `${config.merGoods}/1.0/member/queryMembers`,
    method: 'post'
  })
}

// 查询会员健康豆明细
export function queryOnlineIntegra(data) {
  return request({
    url: `${config.merGoods}/1.0/integral/query`,
    method: 'post',
    data
  })
}

// 编辑会员健康豆
export function beanManagement(data) {
  return request({
    url: `${config.merGoods}/1.0/integral/manage`,
    method: 'post',
    data
  })
}

// 会员详情查询健康顾问
export function queryHealthConsultants(data) {
  return request({
    url: `${config.merGoods}/1.0/member/queryHealthConsultants`,
    method: 'post',
    data
  })
}
