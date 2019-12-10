import request from '@/utils/request'
import config from '@/utils/config'

// 查询商家客服列表
export function queryMerSupportStaffList(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-staff/_search`,
    method: 'post',
    data: params
  })
}

// 查询商家员工列表
export function queryMerStaffList(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-staff/emp`,
    method: 'post',
    data: params
  })
}

// 新增客服
export function addSupportStaff(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-staff`,
    method: 'post',
    data: params
  })
}

// 根据id查询客服人员信息
export function querySupportStaffById(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-staff`,
    method: 'get',
    data: params
  })
}

// 更新客服人员信息
export function updateSupportStaff(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-staff`,
    method: 'put',
    data: params
  })
}

// 查询客服消息列表
export function querySupportMsgList(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-msg/_search`,
    method: 'post',
    data: params
  })
}

// 新增客服消息
export function addSupportMsg(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-msg`,
    method: 'post',
    data: params
  })
}

// 更新客服消息
export function updateSupportMsg(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-msg`,
    method: 'put',
    data: params
  })
}

// 删除客服消息
export function delSupportMsg(params) {
  return request({
    url: `${config.merGoods}/1.0/csd-msg/${params.id}`,
    method: 'delete',
    data: params
  })
}
