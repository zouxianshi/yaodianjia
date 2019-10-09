import request from '@/utils/request'

export function getRoles(params) {
  return request({
    url: '/1.0/authority/_query',
    method: 'post',
    data: params
  })
}

// 根据id查询角色详情
export function getRoleInfo(params) {
  return request({
    url: `/1.0/authority/${params.id}`,
    method: 'get'
  })
}

// 查询用户所有资源
export function getResource(id) {
  return request({
    url: `/1.0/res/tree`,
    method: 'get'
  })
}

export function addRole(pramas) {
  return request({
    url: '/1.0/authority',
    method: 'post',
    data: pramas
  })
}

export function updateRole(pramas) {
  return request({
    url: `/1.0/authority`,
    method: 'put',
    data: pramas
  })
}

export function deleteRole(id) {
  return request({
    url: `/1.0/authority/${id}`,
    method: 'delete'
  })
}

// 角色授权
export function roleAuthor(params) {
  return request({
    url: '/1.0/acc/_addRoleToAcc',
    method: 'post',
    data: params
  })
}

// 查询员工的角色
export function getUserRoles(id) {
  return request({
    url: `/1.0/acc/_queryAccRoles/${id}`,
    method: 'get'
  })
}
