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
