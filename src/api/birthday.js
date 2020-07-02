import request from '@/utils/request'
import config from '@/utils/config'
// 开启关闭生日礼包
export function birthdayOperate(params) {
  return request({
    url: `${config.merGoods}/1.0/market/birthdayOperate?status=${params.status}&templateCode=TC006&merCode=${params.merCode}`,
    method: 'post',
    data: {}
  })
}
// 查询所有会员（会员发券
export function queryMembersNew(params) {
  return request({
    url: `${config.merGoods}/1.0/member/queryMembersNew`,
    method: 'post',
    data: params
  })
}

// 批量发券
export function batchSendCoupon(params) {
  return request({
    url: `${config.merGoods}/1.0/market/batchSendCoupon`,
    method: 'post',
    data: params
  })
}
