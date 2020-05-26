import request from '@/utils/request'
import config from '@/utils/config'
/** *
 * 营销活动 -- 活动管理
 */

// 查询活动列表
export function searchExchangeList(params) {
  return request({
    url: `${config.merGoods}/1.0/act-integral/_search`,
    method: 'post',
    data: params
  })
}
