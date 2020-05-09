import request from '@/utils/request'
import config from '@/utils/config'

export function updateRole(id, data) {
  return request({
    url: `/role/${id}`,
    method: 'put',
    data
  })
}

// 创建员工
export function createEmployee(data) {
  return request({
    url: '/1.0/employee',
    method: 'post',
    data
  })
}

// 修改员工资料
export function modifyEmployeeData(data) {
  return request({
    url: '/1.0/employee',
    method: 'put',
    data
  })
}

// 多条件查询
export function employeeSearch(data) {
  return request({
    url: '/1.0/employee/_search',
    method: 'post',
    data
  })
}

// 员工删除
export function employeeDelete(id) {
  return request({
    url: `/1.0/employee/${id}`,
    method: 'delete'
  })
}

// export function employeeDelete() {
//   return request({
//     url: `/1.0/employee`,
//     method: 'delete'
//   })
// }

// 员工停用启用
export function employeeDisableEnable(data) {
  return request({
    url: `/1.0/employee/disableEnable`,
    method: 'post',
    // headers: { 'userName': 'uaua' },
    data
  })
}

// 重置密码
export function employResetPWD(data) {
  return request({
    url: `/1.0/acc/_reset`,
    method: 'post',
    // headers: { 'userName': 'uaua' },
    data
  })
}

// 员工重置密码
export function employResetPassWD(id) {
  return request({
    url: `/1.0/acc/_resetPassword?id=${id}`,
    method: 'get',
    id
  })
}
// export function employResetPassWD() {
//   return request({
//     url: `/1.0/acc/_resetPassword`,
//     method: 'post',
//     id
//   })
// }

// 查询商家信息
export function merchantDetail() {
  return request({
    url: `${config.merchant}/1.0/mer/_queryMerchantByUser`,
    method: 'post'
    // headers: { 'id': `${id}`,
    //   'userName': 'uaua'
    // }
  })
}
// export function merchantDetail() {
//   return request({
//     url: `/1.0/mer`,
//     method: 'get'
//   })
// }
// 更新商户信息
export function updateMerchant(data) {
  return request({
    url: '/1.0/mer/',
    method: 'put',
    data
  })
}

// // 查询个人中心数据
// export function checkPersonCenter(id) {
//   return request({
//     url: `/1.0/acc/_queryUserInfo?id=${id}`,
//     // url: `/1.0/acc/`,
//     // headers: { 'userName': 'uaua' },
//     method: 'post'
//   })
// }

export function checkPersonCenter() {
  return request({
    url: `/1.0/acc/_queryUserInfo`,
    method: 'post'
  })
}

export function updatePersonCenterData(data) {
  return request({
    url: `/1.0/acc`,
    method: 'put',
    data
  })
}

export function resetPWDPersonCenter(data) {
  return request({
    url: `/1.0/acc/_chgPwd`,
    method: 'post',
    data
  })
}

