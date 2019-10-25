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
export function getTypeTree(type) {
  return request({
    url: `${config.merGoods}/1.0/comm-type/getTypeTree/hydee/${type}`,
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

// 修改分类维度状态
export function setTypeDimensionStatus(id, merCode) {
  return request({
    url: `${config.merGoods}/1.0/comm-dimen/updateUseStatus/${id}/${merCode}`,
    method: 'put'
  })
}
