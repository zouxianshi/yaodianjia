import request from '@/utils/request'

// 获取树结构
export function getTreeList(params) {
  return request({
    url: '/1.0/org/_searchByCondition',
    method: 'post',
    data: params
  })
}

// 获取组织机构
export function getOrgList(params) {
  return request({
    url: '/1.0/org/' + params.id,
    method: 'get'
  })
}

// 新增组织机构
export function setCreateOrg(params) {
  return request({
    url: '/1.0/org',
    method: 'post',
    data: params
  })
}

// 编辑组织机构
export function setEditOrg(params) {
  return request({
    url: '/1.0/org/_update',
    method: 'post',
    data: params
  })
}

// 删除
export function setDeleteOrg(params) {
  return request({
    url: `/1.0/org/${params.id}`,
    method: 'delete',
    data: params
  })
}

// 停用
export function setCheckStatus(params) {
  return request({
    url: '/1.0/org/disableEnable',
    method: 'post',
    data: params
  })
}

// 获取组织机构详情
export function getOrganizationInfo(id) {
  return request({
    url: `/1.0/org/${id}`,
    method: 'get'
  })
}
