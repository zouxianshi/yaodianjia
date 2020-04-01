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

