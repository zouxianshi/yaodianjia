import request from '@/utils/request'
import config from '@/utils/config'

export function tablist(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/getGroupIngPage`,
    method: 'post',
    data: params
  })
}

/**
 * 一键成团
 * groupCode
 */
export function oneTimeGroupAction(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/oneTimeGroup?groupCode=${params.groupCode}`,
    method: 'post'
    // data: params
  })
}
