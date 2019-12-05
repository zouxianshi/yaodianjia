import request from '@/utils/request'
import config from '@/utils/config'

// 查询客服列表
export function queryStaffList(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-staff/emp`,
    method: 'post',
    data: params
  })
}
