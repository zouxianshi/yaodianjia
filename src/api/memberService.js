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
export function queryMembers(data) {
  return request({
    url: `${config.merGoods}/1.0/member/queryMembers`,
    method: 'post',
    data
  })
}
// 导出会员列表
export function exportMembers(data) {
  return request({
    url: `${config.merGoods}/1.0/member/export`,
    method: 'post',
    data
  })
}

// 查询会员基本信息
export function menberBaseInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/member-details/queryBasicInfo/${params.merCode}/${params.userId}`,
    method: 'get'
  })
}
// 查询会员海贝明细
export function queryOnlineIntegra(data) {
  return request({
    url: `${config.merGoods}/1.0/integral/query`,
    method: 'post',
    data
  })
}

// 编辑会员海贝
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

// 查询会员消费记录
export function queryOrderInfo(data) {
  return request({
    url: `${config.merGoods}/1.0/order-info/list`,
    method: 'post',
    data
  })
}

// 选择顾问前查询门店店员
export function queryEmployee(data) {
  return request({
    url: `${config.merGoods}/1.0/employee/_searchCondition`,
    method: 'post',
    data
  })
}
// 门店条件查询
export function queryStore(data) {
  return request({
    url: `${config.merGoods}/1.0/store/queryStore`,
    method: 'post',
    data
  })
}
// 会员反馈
export function queryMessageList(data) {
  return request({
    url: `${config.merGoods}/1.0/message/_search`,
    method: 'post',
    data
  })
}
