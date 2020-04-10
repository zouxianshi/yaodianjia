import request from '@/utils/request'
import config from '@/utils/config'

export function getAssembleList(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup`,
    method: 'post',
    data: params
  })
}

