import request from '@/utils/request'
import config from '@/utils/config'

// 获取冲突列表
export function getConflict(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup`,
    method: 'post',
    data: params
  })
}

/**
 * 方法说明 活动商品查询
 * @method POST
 * @for 所属类名
 * @param {brandName} 参数名 商品品牌
 * @param {currentPage} 参数名 当前页，从第1页开始，不传默认为1
 * @param {groupType} 参数名 boolean 拼团、秒杀、特惠活动不查组合商品，true是，false其他活动
 * @param {merCode} 参数名 商家编码
 * @param {pageSize} 参数名 每页显示条数，不传默认20
 * @param {searchKeyWord} 参数名 搜索关键词，商品名称/商品编码
 * @param {firstTypeId} 参数名 一级分组ID
 * @param {secondTypeId} 参数名 二级分组ID
 * @param {threeTypeId} 参数名 三级分组ID
 * @param {skuIds} 参数名 sku集合
 * @param {storeIds} 参数名 门店ID集合[],为null查询所有
 * @return {返回值类型} 返回值说明
 */
export function queryActivityCommGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-spec/activityComm`,
    method: 'post',
    data: params
  })
}

/**
 * 创建活动推广配置
 * @param { activityId } 活动ID
 * @param { bannerUrl } 活动Banner图片地址
 * @param { id } 推广配置ID
 * @param { picUrl } 活动图片
 * @param { setDesc } 活动描述
 * @param { setName } 活动名称
 */
export function createActExtend(params) {
  return request({
    url: `${config.merGoods}/1.0/act-extend`,
    method: 'post',
    data: params
  })
}
/**
 * 更新活动推广配置
 * @param { activityId } 活动ID
 * @param { bannerUrl } 活动Banner图片地址
 * @param { id } 推广配置ID
 * @param { picUrl } 活动图片
 * @param { setDesc } 活动描述
 * @param { setName } 活动名称
 */
export function updateActExtend(params) {
  return request({
    url: `${config.merGoods}/1.0/act-extend`,
    method: 'put',
    data: params
  })
}
/**
 * 查询活动对应的推广配置，入参活动ID
 */
export function getActExtend(activityId) {
  return request({
    url: `${config.merGoods}/1.0/act-extend/${activityId}`,
    method: 'get'
  })
}

/**
 * 创建满减满赠
 */
export function createActFull(params) {
  return request({
    url: `${config.merGoods}/1.0/act-full`,
    method: 'post',
    data: params
  })
}
/**
 * 更新满减满赠
 */
export function updateActFull(params) {
  return request({
    url: `${config.merGoods}/1.0/act-full`,
    method: 'put',
    data: params
  })
}

/**
 * 查询满减满赠
 */
export function getActFull(id) {
  return request({
    url: `${config.merGoods}/1.0/act-full/${id}`,
    method: 'get'
  })
}

/**
 * 创建加价购活动
 */
export function createActAdd(params) {
  return request({
    url: `${config.merGoods}/1.0/act-add`,
    method: 'post',
    data: params
  })
}
/**
 * 更新加价购活动
 */
export function updateActAdd(params) {
  return request({
    url: `${config.merGoods}/1.0/act-add`,
    method: 'put',
    data: params
  })
}

/**
 * 查询加价购活动
 * @param {cha} id
 */
export function getActAddInfo(id) {
  return request({
    url: `${config.merGoods}/1.0/act-add/${id}`,
    method: 'get'
  })
}

/**
 * 查询加价购活动
 */
export function getActAdd(id) {
  return request({
    url: `${config.merGoods}/1.0/act-add/${id}`,
    method: 'get'
  })
}

/**
 * 查询活动列表
 * @param {*activityType} activityType
 * @param {*currentPage} currentPage
 * @param {*merCode} merCode
 * @param {*pageSize} pageSize
 * @param {*pmtName} pmtName  活动名称
 * @param {*promotionType} promotionType
 * @param {*status} integer  启用状态(1-启用,0-禁用)
 * @param {*string} storeId  活动门店ID
 * @param {*integer} validStatus  活动状态 0 未开始、1 正在进行、2已结束，根据时间判定
 *
 */
export function getActList(params) {
  return request({
    url: `${config.merGoods}/1.0/act-info/_search`,
    method: 'post',
    data: params
  })
}

/**
 * 创建限时活动
 */
export function createActLimit(params) {
  return request({
    url: `${config.merGoods}/1.0/act-limit`,
    method: 'post',
    data: params
  })
}

/**
 * 获取限时活动
 */
export function getActLimit(id) {
  return request({
    url: `${config.merGoods}/1.0/act-limit/${id}`,
    method: 'get'
  })
}
/**
 * 更新限时活动
 */
export function updateActLimit(params) {
  return request({
    url: `${config.merGoods}/1.0/act-limit`,
    method: 'put',
    data: params
  })
}
/**
 * 删除活动
 * @param {*} id
 */
export function delActInfo(id) {
  return request({
    url: `${config.merGoods}/1.0/act-info/${id}`,
    method: 'delete'
  })
}

/**
 * 失效活动
 * @param {*} id
 */
export function endActInfo(id) {
  return request({
    url: `${config.merGoods}/1.0/act-info/${id}`,
    method: 'post'
  })
}
/**
 * 保存赠品
 */
export function createActGift(params) {
  return request({
    url: `${config.merGoods}/1.0/act-gift`,
    method: 'post',
    data: params
  })
}

/**
 * 赠品列表查询
 * @param {*} params
 */
export function getActGiftList(params) {
  return request({
    url: `${config.merGoods}/1.0/act-gift/_search`,
    method: 'post',
    data: params
  })
}

/**
 * 清空活动下的商品库存
 * @param {*String} activityId
 * @param {*Array} specIds
 */
export function clearProductStock(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/clearProductStock`,
    method: 'post',
    data: params
  })
}
// 单独修改活动商品库存
export function setSingleAssembleStock(params) {
  console.log(params)
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/addStock`,
    method: 'put',
    data: params
  })
}
// 通过活动ID获取商品
export function getActivityGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/${params.activityId}`,
    method: 'post',
    data: params
  })
}

// 修改拼团活动基本信息
export function updateAssembleInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/updateInfo`,
    method: 'put',
    data: params
  })
}
// 获取拼团活动单个信息
export function getAssembleAcInfo(activityId) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/${activityId}`,
    method: 'get'
  })
}
/**
 * 拼团活动创建
 * @param {*} params
 */
export function assembleActivityAdd(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/create`,
    method: 'post',
    data: params
  })
}
/**
 * 编辑修改拼团活动产品信息
 * @param {*} params
 */
export function updateAcAssmbleProductInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/modifyProduct`,
    method: 'post',
    data: params
  })
}
/**
 * 进行中的活动排序商品
 * [{
    "activityId": 0,
    "sort": 0,
    "specId": 0
  }]
 */
export function sortAcAssmbleProductInfo(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup/_sort`,
    method: 'post',
    data: params
  })
}
