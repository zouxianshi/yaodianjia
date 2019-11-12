import request from '@/utils/request'
import config from '@/utils/config'

// 获取一级分组维度
export function getTypeDimension(merCode) {
  return request({
    url: `${config.merGoods}/1.0/comm-dimen/list/${merCode}`,
    method: 'get'
  })
}

// 获取分类维度列表 数结构
export function getTypeDimensionList(merCode) {
  return request({
    url: `${config.merGoods}/1.0/comm-dimen/get/${merCode}`,
    method: 'get'
  })
}

// 获取分类或分组树结构
export function getTypeTree(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/getTypeTree`,
    method: 'post',
    data: params,
    noMerCode: true
  })
}

// 获取分类维度树
export function getTypeTreeDimension(merCode, id) {
  return request({
    url: `${config.merGoods}/1.0/comm-dimen/getTree/${merCode}/${id}`,
    method: 'get'
  })
}

// 新增分组维度
export function setAddTypeDimension(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-dimen/add`,
    method: 'post',
    data: params
  })
}

// 修改分类维度
export function setUpdateTypeDimension(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-dimen/update`,
    method: 'put',
    data: params
  })
}

// 修改分组维度状态
export function setTypeDimensionStatus(id, merCode) {
  return request({
    url: `${config.merGoods}/1.0/comm-dimen/updateUseStatus/${id}/${merCode}`,
    method: 'put'
  })
}

// 新增分组
export function setAddGroup(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/addType`,
    method: 'post',
    data: params
  })
}

// 删除分组
export function delGroup(id) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/${id}`,
    method: 'delete'
  })
}

// 修改分组
export function updateGroup(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/updateType`,
    method: 'put',
    data: params
  })
}

// 修改排序
export function updateSort(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/sort`,
    method: 'post',
    data: params
  })
}

// 绑定商品
export function bandGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-relate/_group`,
    method: 'post',
    data: params
  })
}

// 根据id集合获取分类列表
export function getPreGroupList(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/parent`,
    method: 'post',
    data: params,
    noMerCode: true
  })
}
