import request from '@/utils/request'

// 获取商品库商品列表
export function getGoodsList(params) {
  return request({
    url: '/1.0/commodity/getCommodityList',
    method: 'get',
    params
  })
}

// 获取左侧商品分组树结构
export function goodsClass(params) {
  return request({
    url: '/1.0/org/' + params.id,
    method: 'get'
  })
}

// 获取标库商品列表
export function getProductList(params) {
  return request({
    url: '/product/getProductList',
    method: 'get',
    params
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
