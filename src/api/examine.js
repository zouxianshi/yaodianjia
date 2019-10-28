import request from '@/utils/request'
import config from '@/utils/config'

export function getAuditList(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/newAudit`,
    method: 'post',
    data: params
  })
}
