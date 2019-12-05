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

// 新增客服
export function addStaff(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-staff`,
    method: 'post',
    data: params
  })
}

// 根据条件查询门店员工列表
export function queryMerStaffList(params) {

}
