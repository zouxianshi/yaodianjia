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

