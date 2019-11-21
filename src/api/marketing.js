import request from '@/utils/request'
import config from '@/utils/config'

/** *
 * 营销活动 -- 活动管理
 */

// 查询活动列表
export function getActivityList(params) {
  return request({
    url: `${config.merPromote}/1.0/admin/activities/_search`,
    method: 'post',
    data: params
  })
}
